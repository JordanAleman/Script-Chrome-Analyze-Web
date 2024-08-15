// src/modules/contentController.js

import * as domUtils from './domUtils.js';
import * as uiUpdater from './uiUpdater.js';
import { updateSummary, updateImageSummary } from './summary.js';
import * as tableCreators from './tableCreators.js';
import * as accordionCreators from './Accordion/accordionCreators.js';

let cachedResults = null;

const toggleViewButton = document.querySelector('.switch input');

const toggleView = () => {
    const isAccordionView = toggleViewButton.checked;

    if (cachedResults) {
        if (isAccordionView) {
            accordionCreators.createAccordionContent(
                ['Background Colors', cachedResults.bgColors],
                ['Text Colors', cachedResults.textColors],
                ['Font Sizes', cachedResults.fontSizes],
            );
        } else {
            const tableBodyColors = document.getElementById("resultBackgroundColors");
            const tableBodyTextColors = document.getElementById("resultTextColors");
            const tableBodySizes = document.getElementById("resultFontSizes");
            const tableBodyImages = document.getElementById("resultImagesAlt");

            // Crear filas de color y obtener conteos
            const colorCounts = tableCreators.createColorRows(cachedResults.bgColors, tableBodyColors);
            const textColorCounts = tableCreators.createColorRows(cachedResults.textColors, tableBodyTextColors);
            const fontSizeCounts = tableCreators.createTableSizes(cachedResults.fontSizes, tableBodySizes);

            // Crear tabla para imágenes
            const imageCounts = tableCreators.createImageAltTable(cachedResults.images, tableBodyImages);

            // Actualizar resúmenes después de crear las filas
            updateSummary("backgroundColorSection", colorCounts.totalCount, colorCounts.matchedCount, colorCounts.unmatchedCount);
            updateSummary("textColorSection", textColorCounts.totalCount, textColorCounts.matchedCount, textColorCounts.unmatchedCount);
            updateSummary("fontSizeSection", fontSizeCounts.totalCount, fontSizeCounts.matchedCount, fontSizeCounts.unmatchedCount);

            // Actualizar resumen de imágenes
            updateImageSummary("imageAltSection", imageCounts.totalImages, imageCounts.imagesWithAlt, imageCounts.imagesWithoutAlt);
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
                const { bgColors, textColors, fontSizes, images, elementFound } = response;

                if (elementFound === false) {
                    uiUpdater.showNoResultsMessage(`Element "${selector}" not found!`);
                } else {
                    // Guardar resultados en caché
                    cachedResults = { bgColors, textColors, fontSizes, images };

                    toggleView();
                }
            }
        });
    });
};
