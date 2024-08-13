// utils.js
export const rgbArrayToHex = rgb => `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;

export const rgbStringToArray = rgb => {
    if (typeof rgb !== 'string') {
        return null; // Si no es una cadena, devolver null
    }
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        return null; // Si no coincide con el formato RGB, devolver null
    }
    return match.slice(1, 4).map(v => Number(v)); // Extraer y convertir los valores a números
};

export const pxToRem = (px, base = 16) => {
    const remValue = parseFloat(px) / base;
    return parseFloat(remValue.toFixed(2)) + 'rem';
};

