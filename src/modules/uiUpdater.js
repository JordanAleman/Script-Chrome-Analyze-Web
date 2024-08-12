// src/modules/uiUpdater.js

export const showNoResultsMessage = (message) => {
    const noResults = document.getElementById('noResults');
    noResults.innerText = message;
    noResults.style.display = 'block';
    document.getElementById('results').style.display = 'none'; // Ocultar tabla si hay mensaje de sin resultados
    document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón si hay mensaje de sin resultados
};

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

export const createColorRows = (colors, tableBody, maxColumns = 5) => {
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

export const createTable = (items, tableBody, headerId, maxColumns = 5, maxRows = 2) => {
    const totalItems = items.length;
    const columns = Math.min(maxColumns, totalItems);
    const rows = Math.min(maxRows, Math.ceil(totalItems / columns));

    const tableHeader = document.getElementById(headerId);
    tableHeader.setAttribute('colspan', columns);

    let itemIndex = 0;
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
        tableBody.innerHTML += rowHtml;
    }
};

export const createAccordionContent = (bgColors, textColors, fontSizes) => {
    const accordionContainer = document.getElementById('accordionResults');
    accordionContainer.innerHTML = ''; // Limpiar contenido existente

    const createAccordionItem = (title, items) => {
        const item = document.createElement('div');
        item.classList.add('accordion-item');
        
        const header = document.createElement('div');
        header.classList.add('accordion-header');
        header.textContent = title;
        header.addEventListener('click', () => {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
        
        const content = document.createElement('div');
        content.classList.add('accordion-content');
        content.style.display = 'block'
        content.innerHTML = items.map(item => `<div>${item}</div>`).join('');
        
        item.appendChild(header);
        item.appendChild(content);
        accordionContainer.appendChild(item);
    };

    createAccordionItem('Background Colors', bgColors);
    createAccordionItem('Text Colors', textColors);
    createAccordionItem('Font Sizes', fontSizes);

    accordionContainer.style.display = 'block';
};
