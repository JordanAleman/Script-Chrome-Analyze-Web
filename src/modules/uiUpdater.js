// src/modules/uiUpdater.js
import skapaJson from '../assets/skapa.json';
import { formatString } from '../assets/utils';

// Mostrar el mensaje de "Sin Resultados" y ocultar el contenido
export const showNoResultsMessage = (message) => {
    const noResults = document.getElementById('noResults');
    noResults.innerText = message;
    noResults.style.display = 'flex';
    document.getElementById('results').style.display = 'none'; // Ocultar tabla si hay mensaje de sin resultados
    document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón si hay mensaje de sin resultados
};

// Función para mostrar resultados en modo acordeón o tabla según el estado del switch
export const showResults = () => {
    const isAccordionView = document.querySelector('.switch input').checked;

    if (isAccordionView) {
        document.getElementById('accordionResults').style.display = 'grid';
        document.getElementById('results').style.display = 'none'; // Ocultar tabla
    } else {
        document.getElementById('results').style.display = 'flex';
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
        const match = Object.entries(skapaJson.colors).find(([name, value]) => value.toLowerCase() === color.toLowerCase());
        if (match) {
            matchedColors.push({ color, name: match[0] });
        } else {
            unmatchedColors.push({ color });
        }
    });

    // Ordenar colores coincidentes por el nombre del JSON
    matchedColors.sort((a, b) => a.name.localeCompare(b.name));

    const addColorRow = (colors, isMatched) => {
        let rowHtml = `<tr>`;
        colors.forEach(item => {
            const matchName = item.name ? item.name : '<span class="tableSuccessFailedText">❌</span>';
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

    // Devolver conteos para resumen
    return {
        matchedCount: matchedColors.length,
        unmatchedCount: unmatchedColors.length,
        totalCount: colors.length
    };
};

// Función para crear la tabla con elementos de tamaños de fuente
export const createTable = (items, tableBody, headerId, maxColumns = 5) => {
    // Limpia el contenido existente en la tabla antes de agregar nuevas filas
    tableBody.innerHTML = '';

    const matchedSizes = [];
    const unmatchedSizes = [];

    // Separar los tamaños de fuente en coincidentes y no coincidentes
    items.forEach(item => {
        const [pxValue, remValue] = item.split(' | ');
        const match = Object.entries(skapaJson['font-sizes']).find(([name, value]) => `${value}rem` === remValue);
        if (match) {
            matchedSizes.push({ pxValue, remValue, name: match[0] });
        } else {
            unmatchedSizes.push({ pxValue, remValue });
        }
    });

    // Ordenar tamaños coincidentes por el nombre del JSON
    matchedSizes.sort((a, b) => a.name.localeCompare(b.name));

    const addSizeRow = (sizes, isMatched) => {
        let rowHtml = '<tr>';
        sizes.forEach(item => {
            const matchName = item.name ? `<span class="tableSuccessFailedText">${item.name}</span>` : `<span class="tableSuccessFailedText">❌</span>`;
            const cellStyle = isMatched ? 'class="tableSuccessFont"' : 'class="tableFailedFont"';
            rowHtml += `
                <td ${cellStyle}>${item.pxValue} | ${item.remValue} | ${matchName}</td>
            `;
        });
        rowHtml += '</tr>';
        tableBody.innerHTML += rowHtml;
    };

    const fillTable = (sizeList, isMatched) => {
        let sizeRow = [];
        let sizeCount = 0;

        sizeList.forEach(item => {
            sizeRow.push(item);
            sizeCount++;

            if (sizeCount === maxColumns) {
                addSizeRow(sizeRow, isMatched);
                sizeRow = [];
                sizeCount = 0;
            }
        });

        if (sizeRow.length > 0) addSizeRow(sizeRow, isMatched);
    };

    // Crear tabla para tamaños coincidentes
    fillTable(matchedSizes, true);

    // Añadir un margen entre tablas
    if (unmatchedSizes.length > 0) {
        tableBody.innerHTML += `<tr><td class="tableSeparator" colspan="${maxColumns}">.·´¯\`(&gt;▂&lt;)´¯\`·.</td></tr>`;
    }

    // Crear tabla para tamaños no coincidentes
    fillTable(unmatchedSizes, false);

    // Devolver conteos para resumen
    return {
        matchedCount: matchedSizes.length,
        unmatchedCount: unmatchedSizes.length,
        totalCount: items.length
    };
};


// Función para crear el contenido del acordeón
export const createAccordionContent = (...accordionItems) => {
    const accordionContainer = document.getElementById('accordionResults');
    accordionContainer.innerHTML = ''; // Limpiar contenido existente

    const createAccordionItem = (title, items) => {
        const itemHtml = `
            <div id="${formatString(title, 'Accordion')}" class="accordion-item">
                <button class="accordion">${title}</button>
                <div class="panel">
                    <div class="summary summaryAccordion"></div>
                    <ul class="panelContent">
                        ${items.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        return itemHtml;
    };

    const accordionHtml = accordionItems.map(([title, items]) => createAccordionItem(title, items)).join('');

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

    // Actualizar el resumen después de crear el acordeón
    accordionItems.forEach(([title, items]) => {
        let matchedCount = 0;
        let unmatchedCount = 0;
        let id = formatString(title, 'Accordion');
        console.log(`Processing: ${id}`); // Verifica el ID generado


        items.forEach(item => {
            const isColor = id.includes("Color");
            const isFontSize = id.includes("Size");
            let isMatched = false;

            if (isColor) {
                // Convertir item a minúsculas y comparar con colores en minúsculas
                const lowerCaseItem = item.toLowerCase();
                const colorsLowerCase = Object.values(skapaJson.colors).map(color => color.toLowerCase());
                isMatched = colorsLowerCase.includes(lowerCaseItem);
            } else if (isFontSize) {
                // Comparar tamaños de fuente
                const [, remValue] = item.split(' | '); // Extraer solo remValue
                const remValueLowerCase = remValue.toLowerCase();
                isMatched = Object.values(skapaJson['font-sizes']).some(value => `${value}rem`.toLowerCase() === remValueLowerCase);
            }

            console.log(`Item: ${item}, Matched: ${isMatched}`); // Verifica el resultado de cada comparación

            if (isMatched) {
                matchedCount++;
            } else {
                unmatchedCount++;
            }
        });


        console.log(`Summary for ${id}: Total: ${items.length}, Matched: ${matchedCount}, Unmatched: ${unmatchedCount}`);
        updateSummary(id, items.length, matchedCount, unmatchedCount, false);
    });

};

export const updateSummary = (sectionId, totalCount, matchedCount, unmatchedCount, isTable = true) => {
    const summaryElement = document.querySelector(`#${sectionId} .summary`);

    // Determina los textos y símbolos a mostrar basado en el parámetro isTable
    const matchedText = isTable ? `Skapa: ${matchedCount}` : `✔: ${matchedCount}`;
    const unmatchedText = isTable ? `No Skapa: ${unmatchedCount}` : `❌: ${unmatchedCount}`;

    // Actualiza el contenido del elemento summary
    summaryElement.innerHTML = `
        <span class="summaryInfo">Nº: ${totalCount}</span>
        <span class="summarySkapa">${matchedText}</span>  
        <span class="summaryNoSkapa">${unmatchedText}</span>
    `;
};

// Hacer que la vista de acordeón sea la predeterminada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const switchInput = document.querySelector('.switch input');
    switchInput.checked = true; // Establece la vista acordeón como predeterminada
    showResults(); // Muestra los resultados en el modo acordeón
});


