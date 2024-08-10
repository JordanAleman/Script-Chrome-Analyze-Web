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
const pxToRem = (px, base = 16) => (parseFloat(px) / base).toFixed(2) + ' rem';

// Función optimizada para obtener hasta 10 colores de fondo, colores de texto y tamaños de fuente
const analyzePageStyles = (elements) => {
    let bgColors = new Set();
    let textColors = new Set();
    let fontSizes = new Set();
    const maxResults = 10;

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        
        // Procesar colores de fondo
        if (bgColors.size < maxResults) {
            let bgColor = window.getComputedStyle(element).backgroundColor;
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                let rgbArray = rgbStringToArray(bgColor);
                if (rgbArray) { // Verifica que rgbArray no sea null
                    let hexColor = rgbArrayToHex(rgbArray);
                    bgColors.add(hexColor);
                }
            }
        }

        // Procesar colores de texto
        if (textColors.size < maxResults) {
            let color = window.getComputedStyle(element).color;
            if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
                let rgbArray = rgbStringToArray(color);
                if (rgbArray) { // Verifica que rgbArray no sea null
                    let hexColor = rgbArrayToHex(rgbArray);
                    textColors.add(hexColor);
                }
            }
        }

        // Procesar tamaños de fuente
        if (fontSizes.size < maxResults) {
            let fontSize = window.getComputedStyle(element).fontSize;
            if (fontSize && fontSize !== '0px') {
                let remSize = pxToRem(fontSize);
                fontSizes.add(`${fontSize} ${remSize}`);
            }
        }

        // Si ya tenemos el número máximo de resultados en todas las categorías, salimos del bucle
        if (bgColors.size >= maxResults && textColors.size >= maxResults && fontSizes.size >= maxResults) {
            break;
        }
    }

    return {
        bgColors: Array.from(bgColors),
        textColors: Array.from(textColors),
        fontSizes: Array.from(fontSizes)
    };
};

// Listener para recibir mensajes del popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analyzePage") {
        const result = analyzePageStyles(document.querySelectorAll('*'));
        sendResponse(result);
    }

    if (message.action === "analyzeElementAndChildren") {
        const element = document.querySelector(message.selector);
        if (element) {
            const elements = element.querySelectorAll('*');
            const allElements = [element, ...elements]; // Incluir el elemento en sí y todos sus hijos
            const result = analyzePageStyles(allElements);
            result.elementFound = true;
            sendResponse(result);
        } else {
            sendResponse({ elementFound: false });
        }
    }
    
    if (message.action === "analyzeElement") {
        const elements = document.querySelectorAll(message.selector);
        if (elements.length > 0) {
            const result = analyzePageStyles(elements);
            result.elementFound = true;
            sendResponse(result);
        } else {
            sendResponse({ elementFound: false });
        }
    }


    
    return true;
});
