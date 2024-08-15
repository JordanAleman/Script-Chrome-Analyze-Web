// src/components/fontSize.js
import { pxToRem } from '../assets/utils.js';

export const processFontSize = (element) => {
    let fontSize = window.getComputedStyle(element).fontSize;
    if (fontSize && fontSize !== '0px') {
        // Convertir el tamaño de fuente en píxeles a un número
        const pxValue = parseFloat(fontSize);

        // Redondear el valor de píxeles a un número entero
        const roundedPxValue = Math.round(pxValue);

        // Convertir el tamaño de fuente redondeado a rem
        const remValue = pxToRem(`${roundedPxValue}px`);

        // Retornar el tamaño de fuente redondeado en píxeles y en rem
        return `${roundedPxValue}px | ${remValue}`;
    }
    return null;
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
