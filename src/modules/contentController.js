// src/modules/contentController.js

import * as domUtils from './domUtils.js';
import * as uiUpdater from './uiUpdater.js';

let cachedResults = null;

const toggleViewButton = document.querySelector('.switch input');

const toggleView = () => {
    const isAccordionView = toggleViewButton.checked;

    if (cachedResults) {
        if (isAccordionView) {
            uiUpdater.createAccordionContent(
                cachedResults.bgColors,
                cachedResults.textColors,
                cachedResults.fontSizes
            );
        } else {
            const tableBodyColors = document.getElementById("resultBackgroundColors");
            const tableBodyTextColors = document.getElementById("resultTextColors");
            const tableBodySizes = document.getElementById("resultFontSizes");

            uiUpdater.createColorRows(cachedResults.bgColors, tableBodyColors);
            uiUpdater.createColorRows(cachedResults.textColors, tableBodyTextColors);
            uiUpdater.createTable(cachedResults.fontSizes, tableBodySizes, "fontSizeHeader");
        }

        uiUpdater.showResults();
    }
};

toggleViewButton.addEventListener('change', toggleView);

export const updatePopup = (selector, context) => {
    domUtils.cleanContent();

    const selectorType = document.getElementById('selectorType').value;

    if (context === 'searchById') {
        if (!selector.startsWith('#')) {
            selector = `#${selector}`;
        }
    } else if (context === 'searchElement') {
        selector = domUtils.getSelector(selectorType, selector);
    } else if (context === 'analyzePage') {
        selector = '*';
    }

    if (!domUtils.isValidSelector(selector)) {
        uiUpdater.showNoResultsMessage(`Invalid selector "${selector}". Please enter a valid selector!`);
        return;
    }

    let action;

    if (selector === '*') {
        action = 'analyzePage';
    } else {
        const isSearchById = context === 'searchById';
        action = isSearchById ? 'analyzeElementAndChildren' : 'analyzeElement';
    }


    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action, selector }, response => {
            if (chrome.runtime.lastError) {
                console.error('Error al recibir respuesta (っ °Д °;)っ:', chrome.runtime.lastError.message);
            } else if (response) {
                const { bgColors, textColors, fontSizes, elementFound } = response;

                if (elementFound === false) {
                    uiUpdater.showNoResultsMessage(`Element "${selector}" not found!`);
                } else {
                    // Guardar resultados en caché
                    cachedResults = { bgColors, textColors, fontSizes };

                    toggleView(); // Actualizar vista actual (ya sea tabla o acordeón)
                }
            }
        });
    });
};
