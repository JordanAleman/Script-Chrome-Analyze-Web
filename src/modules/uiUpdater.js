// src/modules/uiUpdater.js
import colorsJson from '../assets/skapa.json';

// Mostrar el mensaje de "Sin Resultados" y ocultar el contenido
export const showNoResultsMessage = (message) => {
    const noResults = document.getElementById('noResults');
    noResults.innerText = message;
    noResults.style.display = 'block';
    document.getElementById('results').style.display = 'none'; // Ocultar tabla si hay mensaje de sin resultados
    document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón si hay mensaje de sin resultados
};

// Función para mostrar resultados en modo acordeón o tabla según el estado del switch
export const showResults = () => {
    const isAccordionView = document.querySelector('.switch input').checked;

    if (isAccordionView) {
        document.getElementById('accordionResults').style.display = 'block';
        document.getElementById('results').style.display = 'none'; // Ocultar tabla
    } else {
        document.getElementById('results').style.display = 'block';
        document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón
    }

    document.getElementById('noResults').style.display = 'none'; // Ocultar mensaje de sin resultados
};

export const createColorRows = (colors, tableBody, maxColumns = 3) => {
    // Limpia el contenido existente en la tabla antes de agregar nuevas filas
    tableBody.innerHTML = '';

    const matchedColors = [];
    const unmatchedColors = [];

    // Separar los colores en coincidentes y no coincidentes
    colors.forEach(color => {
        const match = Object.entries(colorsJson.colors).find(([name, value]) => value.toLowerCase() === color.toLowerCase());
        if (match) {
            matchedColors.push({ color, name: match[0] });
        } else {
            unmatchedColors.push({ color });
        }
    });

    const addColorRow = (colors, isMatched) => {
        let rowHtml = `<tr>`;
        colors.forEach(item => {
            const matchName = item.name ? item.name : '<span style="color:red;">X</span>';
            const cellStyle = isMatched ? 'class="tableSuccess"' : '';
            rowHtml += `
                <td class="color-box" style="background-color: ${item.color};"></td>
                <td>${item.color}</td>
                <td ${cellStyle}>${matchName}</td>
            `;
        });
        rowHtml += `</tr>`;
        tableBody.innerHTML += rowHtml;
    };

    const fillTable = (colorList, isMatched) => {
        let colorRow = [];
        let colorCount = 0;
    
        colorList.forEach(item => {
            colorRow.push(item);
            colorCount++;
    
            if (colorCount === maxColumns) {
                addColorRow(colorRow, isMatched);
                colorRow = [];
                colorCount = 0;
            }
        });
    
        if (colorRow.length > 0) addColorRow(colorRow, isMatched);
    };

    // Crear tabla para colores coincidentes
    fillTable(matchedColors, true);

    // Añadir un margen entre tablas
    if (unmatchedColors.length > 0) {
        tableBody.innerHTML += `<tr><td class="tableSeparator" colspan="${maxColumns * 3}">.·´¯\`(&gt;▂&lt;)´¯\`·.</td></tr>`;
    }

    // Crear tabla para colores no coincidentes
    fillTable(unmatchedColors, false);
};

// Función para crear la tabla con elementos
export const createTable = (items, tableBody, headerId, maxColumns = 5, maxRows = 2) => {
    // Limpia el contenido existente en la tabla antes de agregar nuevas filas
    tableBody.innerHTML = '';

    const totalItems = items.length;
    const columns = Math.min(maxColumns, totalItems);
    const rows = Math.min(maxRows, Math.ceil(totalItems / columns));

    const tableHeader = document.getElementById(headerId);
    tableHeader.setAttribute('colspan', columns);

    let itemIndex = 0;
    let rowsHtml = '';
    for (let row = 0; row < rows; row++) {
        let rowHtml = `<tr>`;
        for (let col = 0; col < columns; col++) {
            if (itemIndex < totalItems) {
                const itemContent = items[itemIndex].split(' ');
                rowHtml += `<td>${itemContent.join(' | ')}</td>`;
                itemIndex++;
            } else {
                rowHtml += `<td></td>`; // Rellenar con celdas vacías si es necesario
            }
        }
        rowHtml += `</tr>`;
        rowsHtml += rowHtml;
    }
    tableBody.innerHTML = rowsHtml; // Limpia y añade todas las filas a la vez
};

// Función para crear el contenido del acordeón
export const createAccordionContent = (bgColors, textColors, fontSizes) => {
    const accordionContainer = document.getElementById('accordionResults');
    accordionContainer.innerHTML = ''; // Limpiar contenido existente

    const createAccordionItem = (title, items) => {
        const itemHtml = `
            <div class="accordion-item">
                <button class="accordion">${title}</button>
                <div class="panel">
                    <ul class="panelContent">
                        ${items.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        return itemHtml;
    };

    const accordionHtml = `
        ${createAccordionItem('Background Colors', bgColors)}
        ${createAccordionItem('Text Colors', textColors)}
        ${createAccordionItem('Font Sizes', fontSizes)}
    `;
    
    accordionContainer.innerHTML = accordionHtml;

    // Ejecutar la funcionalidad del acordeón
    requestAnimationFrame(() => {
        document.querySelectorAll('.accordion').forEach(header => {
            const panel = header.nextElementSibling;
            // Inicialmente, establece max-height para que esté desplegado
            panel.style.maxHeight = panel.scrollHeight + "px";
            
            header.addEventListener('click', () => {
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    });

    accordionContainer.style.display = 'block';
};

// Hacer que la vista de acordeón sea la predeterminada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const switchInput = document.querySelector('.switch input');
    switchInput.checked = true; 
    showResults(); 
});
