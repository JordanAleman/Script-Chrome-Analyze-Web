// src/modules/dataProcessing.js

import skapaJson from '../../assets/skapa.json';

/**
 * Procesa un elemento de color para verificar si coincide con los colores predefinidos
 * y formatea la salida con el nombre del color coincidente o un símbolo de error.
 *
 * @param {string} item - El nombre del color a procesar.
 * @returns {Object} - Un objeto que contiene el item procesado y un indicador de si hay coincidencia.
 */
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

// Crear un conjunto de colores en minúsculas para una verificación eficiente.
const colorSet = new Set(Object.values(skapaJson.colors).map(color => color.toLowerCase()));

/**
 * Verifica si un color coincide con los colores predefinidos.
 *
 * @param {string} item - El nombre del color a verificar.
 * @returns {boolean} - True si el color está en el conjunto predefinido, de lo contrario, false.
 */
export const isColorMatched = (item) => {
    const lowerCaseItem = item.toLowerCase();
    return colorSet.has(lowerCaseItem);
};

/* -------------------------------------------------------------------------- */
/*                             Bloque de fontSize                             */
/* -------------------------------------------------------------------------- */

/**
 * Procesa un elemento de tamaño de fuente para verificar si coincide con los tamaños de fuente predefinidos
 * y formatea la salida con el nombre del tamaño de fuente coincidente o un símbolo de error.
 *
 * @param {string} item - El tamaño de fuente a procesar, en formato "px | rem".
 * @returns {Object} - Un objeto que contiene el item procesado y un indicador de si hay coincidencia.
 */
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

/**
 * Formatea un elemento de tamaño de fuente para que tenga tres decimales en rem y alinea el valor en px.
 *
 * @param {string} item - El tamaño de fuente a formatear.
 * @param {string} matchName - El nombre del tamaño de fuente coincidente.
 * @returns {string} - El tamaño de fuente formateado.
 */
export const padItem = (item, matchName) => {
    const [pxValue, remValue] = item.split(' | ');

    // Formatear remValue para que tenga tres decimales
    const remNumber = parseFloat(remValue); // Convierte a número flotante
    const formattedRem = remNumber.toFixed(3); // Asegura tres decimales

    const paddedPx = pxValue.padStart(2, '0');

    return `${paddedPx} | ${formattedRem}rem | ${matchName}`;
};

/**
 * Verifica si un tamaño de fuente coincide con los tamaños de fuente predefinidos.
 *
 * @param {string} item - El tamaño de fuente a verificar, en formato "px | rem".
 * @returns {boolean} - True si el tamaño de fuente está en la lista predefinida, de lo contrario, false.
 */
export const isFontSizeMatched = (item) => {
    const [, remValue] = item.split(' | ');
    const remValueLowerCase = remValue.toLowerCase();
    return Object.values(skapaJson['font-sizes']).some(value => `${value}rem`.toLowerCase() === remValueLowerCase);
};

/* ------------------------------ Fin fontSize ------------------------------ */

/* -------------------------------------------------------------------------- */
/*                             Bloque de imageAlt                             */
/* -------------------------------------------------------------------------- */

/**
 * Procesa un elemento de imagen para verificar si el texto alternativo es válido
 * y formatea la salida con el nombre y alt de la imagen o un símbolo de error.
 *
 * @param {Object} item - El objeto de imagen con propiedades `name` y `alt`.
 * @returns {Object} - Un objeto que contiene el item procesado y un indicador de si hay coincidencia.
 */
export const processImageItem = (item) => {
    let isMatched = item.alt !== '❌';
    let processedItem =
        isMatched
            ? `<strong>Name:</strong> ${item.name} <br><strong>Alt:</strong> ${item.alt}`
            : `${item.name} | ${item.alt}`;

    return { processedItem, isMatched };
};

/**
 * Verifica si el texto alternativo de una imagen es válido.
 *
 * @param {Object} item - El objeto de imagen con una propiedad `alt`.
 * @returns {boolean} - True si el texto alternativo no es el símbolo de error, de lo contrario, false.
 */
export const isImageMatched = (item) => item.alt !== '❌';

/* ------------------------------ Fin imageAlt ------------------------------ */

/* -------------------------------------------------------------------------- */
/*                              Bloque de aArial                              */
/* -------------------------------------------------------------------------- */

/**
 * Procesa un elemento de etiqueta aria para verificar si la etiqueta aria es válida
 * y formatea la salida con el href y ariaLabel o un símbolo de error.
 *
 * @param {Object} item - El objeto con propiedades `href` y `ariaLabel`.
 * @returns {Object} - Un objeto que contiene el item procesado y un indicador de si hay coincidencia.
 */
export const processAArialItem = (item) => {
    let isMatched = item.ariaLabel !== '❌';
    let processedItem =
        isMatched
            ? `<strong>Href:</strong> ${item.href} <br><strong>Aria Label:</strong> ${item.ariaLabel}`
            : `${item.href} | ${item.ariaLabel}`;

    return { processedItem, isMatched };
};

/**
 * Verifica si la etiqueta aria de un elemento es válida.
 *
 * @param {Object} item - El objeto con una propiedad `ariaLabel`.
 * @returns {boolean} - True si la etiqueta aria no es el símbolo de error, de lo contrario, false.
 */
export const isAArialMatched = (item) => item.ariaLabel !== '❌';

/* ------------------------------- Fin aArial ------------------------------- */

/**
 * Ordena los elementos procesados basándose en criterios específicos.
 *
 * @param {Array<string>} items - La lista de elementos a ordenar.
 * @param {boolean} byName - Si true, ordena por nombre; si false, por JSON.
 * @param {boolean} byJson - Si true, usa un criterio de ordenación basado en JSON.
 * @returns {Array<string>} - La lista de elementos ordenada.
 */
export const sortMatchedItems = (items, byName, byJson) => {
    if (byName) {
        return items.sort((a, b) => {
            const aName = a.split(' | ')[1];
            const bName = b.split(' | ')[1];
            return aName.localeCompare(bName);
        });
    } else if (byJson) {
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
