// src/modules/dataProcessing.js

import skapaJson from '../../assets/skapa.json';

export const processColorItem = (item) => {
    const lowerCaseItem = item.toLowerCase();
    const colorsLowerCase = Object.values(skapaJson.colors).map(color => color.toLowerCase());
    let matchName = '❌';
    let processedItem;

    if (colorsLowerCase.includes(lowerCaseItem)) {
        matchName = Object.keys(skapaJson.colors).find(key => skapaJson.colors[key].toLowerCase() === lowerCaseItem);
        processedItem = `${item} | ${matchName}`;
    } else {
        processedItem = `${item} | ❌`;
    }

    return { processedItem, isMatched: matchName !== '❌' };
};

export const processFontSizeItem = (item) => {
    const [, remValue] = item.split(' | ');
    const match = Object.entries(skapaJson['font-sizes']).find(([, value]) => `${value}rem` === remValue);
    let matchName = '❌';
    let processedItem;

    if (match) {
        matchName = match[0];
        processedItem = padItem(item, matchName);
    } else {
        processedItem = `${item} | ❌`;
    }

    return { processedItem, isMatched: matchName !== '❌' };
};

export const processImageItem = (item) => {
    let processedItem = `${item.name} | ${item.alt}`;
    let isMatched = item.alt !== '❌';

    return { processedItem, isMatched };
};

// Función padItem para rellenar y alinear elementos acorde al tamaño del mayor
export const padItem = (item, matchName) => {
    const [pxValue, remValue] = item.split(' | ');

    // Formatear remValue para que tenga tres decimales
    const remNumber = parseFloat(remValue); // Convierte a número flotante
    const formattedRem = remNumber.toFixed(3); // Asegura tres decimales

    const paddedPx = pxValue.padStart(2, '0');

    return `${paddedPx} | ${formattedRem}rem | ${matchName}`;
};


export const sortMatchedItems = (items, isColor) => {
    if (isColor) {
        return items.sort((a, b) => {
            const aName = a.split(' | ')[1];
            const bName = b.split(' | ')[1];
            return aName.localeCompare(bName);
        });
    } else if (isImage) {
        return items.sort((a, b) => a.localeCompare(b));
    } else {
        return items.sort((a, b) => {
            const aName = a.split(' | ')[2];
            const bName = b.split(' | ')[2];
            const fontSizeOrder = Object.keys(skapaJson['font-sizes']);

            // Ordenar de menor a mayor
            return fontSizeOrder.indexOf(aName) - fontSizeOrder.indexOf(bName);
        });

    }
};
