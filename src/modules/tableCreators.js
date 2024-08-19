// src/modules/tableCreators.js

import skapaJson from '../assets/skapa.json';

/**
 * Crea las filas de la tabla para colores.
 */
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
        tableBody.innerHTML += `<tr><td class="tableSeparator" colspan="${maxColumns * 3}"></td></tr>`;
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

/**
 * Crear filas en la tabla para los resultados de tamaños de fuente.
 */
export const createTableSizes = (items, tableBody, maxColumns = 5) => {
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
        tableBody.innerHTML += `<tr><td class="tableSeparator" colspan="${maxColumns}"></td></tr>`;
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

/**
 * Crear filas en la tabla para los resultados de imágenes con y sin alt.
 * @param {Array} images Array de objetos con {name, alt, src} de las imágenes.
 * @param {HTMLElement} tableBody Elemento tbody donde se agregarán las filas.
 * @returns {Object} Resumen de imágenes procesadas.
 */
export const createImageAltTable = (images, tableBody) => {
    let totalImages = images.length;
    let imagesWithAlt = 0;
    let imagesWithoutAlt = 0;

    // Limpiar contenido previo
    tableBody.innerHTML = '';

    // Construir las filas de la tabla usando innerHTML
    let tableRows = '';

    images.forEach(image => {
        const altText = image.alt === '❌' ? '<span class="tableSuccessFailedText">❌</span>' : image.alt;
        // <td><img src="${image.src}" alt="${image.alt}" style="max-width: 100px; height: auto;"></td>

        tableRows += `
            <tr>
                <td><img src="${image.src}" alt="${image.alt}" style="max-width: 100px; height: auto;"></td>
                <td>${image.name}</td>
                <td>${altText}</td>
            </tr>
        `;

        if (image.alt === '❌') {
            imagesWithoutAlt++;
        } else {
            imagesWithAlt++;
        }
    });

    // Insertar las filas en la tabla
    tableBody.innerHTML = tableRows;

    return {
        totalImages,
        imagesWithAlt,
        imagesWithoutAlt
    };
};

export const createAArialsTable = (aArials, tableBody) => {
    let totalAArials = 0;
    let withAriaLabel = 0;
    let withoutAriaLabel = 0;

    aArials.forEach(a => {
        totalAArials++;
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = a.href;
        row.insertCell(1).textContent = a.ariaLabel;

        if (a.ariaLabel !== '❌') {
            withAriaLabel++;
        } else {
            withoutAriaLabel++;
        }
    });

    return { totalAArials, withAriaLabel, withoutAriaLabel };
};
