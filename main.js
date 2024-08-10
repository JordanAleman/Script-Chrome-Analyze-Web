/* -------------------------------------------------------------------------- */
/*                            Funciones principales                           */
/* -------------------------------------------------------------------------- */
const updatePopup = (selector, context) => {
    cleanContent(); // Limpiar contenido previo

    const selectorType = document.getElementById('selectorType').value; // Obtener el tipo de selector seleccionado

    // Ajustar el selector basado en el contexto
    if (context === 'searchById') {
        // Para búsqueda por ID, asegurar que el selector es un ID y comienza con '#'
        if (!selector.startsWith('#')) {
            selector = `#${selector}`;
        }
    } else if (context === 'searchElement') {
        // Para búsqueda general de elementos, aplicar `getSelector`
        selector = getSelector(selectorType, selector);
    } else if (context === 'analyzePage') {
        // Para analizar la página, el selector siempre es '*'
        selector = '*';
    }

    // Validar si el selector es válido
    if (!isValidSelector(selector)) {
        document.getElementById('noResults').innerText = `Invalid selector "${selector}". Please enter a valid selector!`;
        document.getElementById('noResults').style.display = 'block';
        return;
    }

    // Determinar la acción a enviar al script de contenido
    let action = selector === '*'
        ? 'analyzePage'
        : (context === 'searchById'
            ? 'analyzeElementAndChildren'
            : 'analyzeElement');

    // Enviar mensaje al script de contenido para analizar la página
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action, selector }, response => {
            if (chrome.runtime.lastError) {
                console.error('Error al recibir respuesta (っ °Д °;)っ:', chrome.runtime.lastError.message);
            } else if (response) {
                const { bgColors, textColors, fontSizes, elementFound } = response;

                if (elementFound === false) {
                    // Mostrar mensaje si no se encuentra el elemento
                    document.getElementById('results').style.display = 'none';
                    document.getElementById('noResults').innerText = `Element "${selector}" not found!`;
                    document.getElementById('noResults').style.display = 'block';
                    return;
                }

                const tableBodyColors = document.getElementById("resultBackgroundColors");
                const tableBodyTextColors = document.getElementById("resultTextColors");
                const tableBodySizes = document.getElementById("resultFontSizes");
                const fontSizeHeader = document.getElementById("fontSizeHeader");

                const maxColumns = 5; // Número máximo de columnas
                const maxRows = 2;    // Número máximo de filas

                // Helper functions
                const addColorRow = (colors, tableBody) => {
                    let rowHtml = `<tr>`;
                    colors.forEach(color => {
                        rowHtml += `
                            <td class="color-box" style="background-color: ${color};"></td>
                            <td>${color}</td>
                        `;
                    });
                    rowHtml += `</tr>`;
                    tableBody.innerHTML += rowHtml;
                };

                const createColorRows = (colors, tableBody) => {
                    let colorRow = [];
                    let colorCount = 0;

                    colors.forEach(color => {
                        colorRow.push(color);
                        colorCount++;

                        if (colorCount === maxColumns) {
                            addColorRow(colorRow, tableBody);
                            colorRow = [];
                            colorCount = 0;
                        }
                    });

                    if (colorRow.length > 0) addColorRow(colorRow, tableBody);
                };

                createColorRows(bgColors, tableBodyColors);
                createColorRows(textColors, tableBodyTextColors);

                // Organizar los tamaños de fuente en 5 columnas y 2 filas
                const createFontSizeTable = (sizes, tableBody) => {
                    const totalSizes = sizes.length;
                    const columns = Math.min(maxColumns, totalSizes);
                    const rows = Math.min(maxRows, Math.ceil(totalSizes / columns));

                    fontSizeHeader.setAttribute('colspan', columns); // Ajustar el colspan de la cabecera

                    let sizeIndex = 0;
                    for (let row = 0; row < rows; row++) {
                        let rowHtml = `<tr>`;
                        for (let col = 0; col < columns; col++) {
                            if (sizeIndex < totalSizes) {
                                const [pxSize, remSize] = sizes[sizeIndex].split(' ');
                                rowHtml += `<td>${remSize}rem | ${pxSize}</td>`;
                                sizeIndex++;
                            } else {
                                rowHtml += `<td></td>`; // Rellenar con celdas vacías si es necesario
                            }
                        }
                        rowHtml += `</tr>`;
                        tableBody.innerHTML += rowHtml;
                    }
                };

                // Limpiar el contenido actual de la tabla de tamaños de fuente antes de añadir nuevas filas
                tableBodySizes.innerHTML = '';

                // Crear la tabla de tamaños de fuente
                createFontSizeTable(fontSizes, tableBodySizes);

                document.getElementById('results').style.display = 'block';
                document.getElementById('noResults').style.display = 'none';
            }
        });
    });
};

/* -------------------------------------------------------------------------- */
/*                            Funciones auxiliares                            */
/* -------------------------------------------------------------------------- */
const cleanContent = () => {
    // Limpiar los resultados actuales y ocultar secciones
    document.getElementById("resultBackgroundColors").innerHTML = '';
    document.getElementById("resultTextColors").innerHTML = '';
    document.getElementById("resultFontSizes").innerHTML = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('noResults').style.display = 'none';
};

const getSelector = (selectorType, selector) => {
    switch (selectorType.toLowerCase()) {
        case 'custom':
            // No añadir prefijo para 'custom'
            return selector;
        case 'id':
            return `#${selector}`;
        case 'class':
            return `.${selector}`;
        case 'name':
            return `[name="${selector}"]`;
        case 'tag':
            return `${selector}`;
        default:
            // Manejo de caso por defecto si es necesario
            return selector;
    }
};

// Función para validar si un selector es válido
const isValidSelector = (selector) => {
    try {
        document.createDocumentFragment().querySelector(selector);
    } catch (error) {
        return false;
    }
    return true;
};

/* -------------------------------------------------------------------------- */
/*                       Construcción de los resultados                       */
/* -------------------------------------------------------------------------- */
// Listener para el botón de Analyze Page
document.getElementById('analyzeButton').addEventListener('click', () => {
    updatePopup('*', 'analyzePage'); // Analizar toda la página
});

// Listener para el botón de Search by ID
document.getElementById('searchByIdButton').addEventListener('click', () => {
    cleanContent(); // Limpiar contenido previo
    const id = document.getElementById('idSelector').value.trim();
    if (id) {
        updatePopup(id, 'searchById'); // Buscar y analizar el elemento por ID y sus hijos
    } else {
        document.getElementById('noResults').innerText = `Please enter a valid ID!`;
        document.getElementById('noResults').style.display = 'block';
    }
});

// Listener para el botón de Search Element
document.getElementById('searchButton').addEventListener('click', () => {
    cleanContent(); // Limpiar contenido previo
    const selector = document.getElementById('elementSelector').value.trim();
    if (selector) {
        updatePopup(selector, 'searchElement'); // Buscar elementos basados en el selector ingresado
    } else {
        document.getElementById('noResults').innerText = `Please enter a valid selector!`;
        document.getElementById('noResults').style.display = 'block';
    }
});

/* -------------------------------------------------------------------------- */
/*                             Eventos de teclado                             */
/* -------------------------------------------------------------------------- */
// Listener para detectar "Enter" en el campo de búsqueda por ID
document.getElementById('idSelector').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevenir la acción por defecto del Enter (como enviar formularios)
        document.getElementById('searchByIdButton').click();
    }
});

// Listener para detectar "Enter" en el campo de búsqueda por selector general
document.getElementById('elementSelector').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchButton').click();
    }
});
