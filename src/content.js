// src/content.js

import { processBackgroundColor } from '../components/bgColor.js';
import { processTextColor } from '../components/color.js';
import { processFontSize } from '../components/fontSize.js';

// Función auxiliar para procesar los estilos de un solo elemento
const processElementStyles = (element, sets, maxResults) => {
    const [bgColors, textColors, fontSizes] = sets;

    // Procesar colores de fondo
    if (bgColors.size < maxResults) {
        let hexColor = processBackgroundColor(element);
        if (hexColor) {
            bgColors.add(hexColor);
        }
    }

    // Procesar colores de texto
    if (textColors.size < maxResults) {
        let hexColor = processTextColor(element);
        if (hexColor) {
            textColors.add(hexColor);
        }
    }

    // Procesar tamaños de fuente
    if (fontSizes.size < maxResults) {
        let size = processFontSize(element);
        if (size) {
            fontSizes.add(size);
        }
    }
};

// Función optimizada para obtener hasta 10 colores de fondo, colores de texto y tamaños de fuente
const analyzePageStyles = (elements) => {
    let bgColors = new Set();
    let textColors = new Set();
    let fontSizes = new Set();
    const maxResults = 100;
    const sets = [bgColors, textColors, fontSizes];

    for (const element of elements) {
        processElementStyles(element, sets, maxResults);

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
