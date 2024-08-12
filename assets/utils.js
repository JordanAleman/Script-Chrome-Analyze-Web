// Función auxiliar para convertir RGB a HEX
const rgbArrayToHex = rgb => `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;

// Función auxiliar para convertir un string RGB a array de valores
const rgbStringToArray = rgb => {
    if (typeof rgb !== 'string') {
        return null; // Si no es una cadena, devolver null
    }
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
        return null; // Si no coincide con el formato RGB, devolver null
    }
    return match.slice(1, 4).map(v => Number(v)); // Extraer y convertir los valores a números
};

// Función auxiliar para convertir píxeles a rem
const pxToRem = (px, base = 16) => (parseFloat(px) / base).toFixed(2) + 'rem';
