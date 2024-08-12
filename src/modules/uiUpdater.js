// src/modules/uiUpdater.js

export const showNoResultsMessage = (message) => {
    const noResults = document.getElementById('noResults');
    noResults.innerText = message;
    noResults.style.display = 'block';
    document.getElementById('results').style.display = 'none';
};

export const showResults = () => {
    document.getElementById('results').style.display = 'block';
    document.getElementById('noResults').style.display = 'none';
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

