// src/modules/contentController.js

import { bgColorStructure } from '../components/Styles/bgColor.js';
import { colorStructure } from '../components/Styles/color.js';
import { fontSizeStructure } from '../components/Styles/fontSize.js';
import { imageAltStructure } from '../components/Accessibility/imageAlt.js';
import { aArialStructure } from '../components/Accessibility/aArial.js';

import * as domUtils from './domUtils.js';
import * as uiUpdater from './uiUpdater.js';
import { updateSummary, updateImageSummary } from './summary.js';
import * as tableCreators from './tableCreators.js';
import * as accordionCreators from './Accordion/accordionCreators.js';

let cachedResults = null;

const toggleViewButton = document.querySelector('.switch input');

const toggleView = () => {
    const analyzeContent = document.querySelector('#analyzeContent');

    if (analyzeContent.style.display != 'none') analyzeContent.style.display = 'none';

    const selectedRadio = document.querySelector('.resultsChooseShow input[type="radio"]:checked');
    if (!selectedRadio) return;

    const selectedValue = selectedRadio.parentElement.textContent.trim();

    const isAccordionView = toggleViewButton.checked;

    if (cachedResults) {
        if (isAccordionView) {
            accordionCreators.createAccordionContent(
                ['Background Colors', cachedResults.bgColors],
                ['Text Colors', cachedResults.textColors],
                ['Font Sizes', cachedResults.fontSizes],
                ['Image Alt', cachedResults.imageAlt],
            );
        } else {
            updateTableAndSummary(selectedValue, cachedResults);
        }

        uiUpdater.showResults();
    }
};


toggleViewButton.addEventListener('change', toggleView);

const updateRadioButtonSelection = () => {
    const radioButtons = document.querySelectorAll('.resultsChooseShow input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', toggleView);
    });
};

updateRadioButtonSelection();

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
                const { bgColors, textColors, fontSizes, imageAlt, aArials, elementFound } = response;

                if (elementFound === false) {
                    uiUpdater.showNoResultsMessage(`Element "${selector}" not found!`);
                } else {
                    // Guardar resultados en caché
                    cachedResults = { bgColors, textColors, fontSizes, imageAlt, aArials };

                    toggleView();
                }
            }
        });
    });
};

const updateTableAndSummary = (selectedValue, cachedResults) => {
    let tableBody;
    let counts;

    switch (selectedValue) {
        case 'bgColor':
            tableBody = bgColorStructure();
            counts = tableCreators.createColorRows(cachedResults.bgColors, tableBody);
            updateSummary("backgroundColorSection", counts.totalCount, counts.matchedCount, counts.unmatchedCount);
            break;

        case 'color':
            tableBody = colorStructure();
            counts = tableCreators.createColorRows(cachedResults.textColors, tableBody);
            updateSummary("textColorSection", counts.totalCount, counts.matchedCount, counts.unmatchedCount);
            break;

        case 'fontSize':
            tableBody = fontSizeStructure();
            counts = tableCreators.createTableSizes(cachedResults.fontSizes, tableBody);
            updateSummary("fontSizeSection", counts.totalCount, counts.matchedCount, counts.unmatchedCount);
            break;

        case 'imageAlt':
            tableBody = imageAltStructure();
            counts = tableCreators.createImageAltTable(cachedResults.imageAlt, tableBody);
            updateImageSummary("imageAltSection", counts.totalImages, counts.imagesWithAlt, counts.imagesWithoutAlt);
            break;

        case 'aArial':
            tableBody = aArialStructure();
            counts = tableCreators.createAArialsTable(cachedResults.aArials, tableBody);
            updateImageSummary("aArialSection", counts.totalAArials, counts.withAriaLabel, counts.withoutAriaLabel);
            break;

        default:
            console.warn(`Unknown selection: ${selectedValue}`);
            break;
    }
}
