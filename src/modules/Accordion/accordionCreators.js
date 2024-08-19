// src/modules/accordionCreators.js

import * as dataProcessing from './dataProcessing.js';
import { formatString } from '../../assets/utils.js';
import { updateSummary } from '../summary.js';

const processingFunctions = {
    'Background Colors': dataProcessing.processColorItem,
    'Text Colors': dataProcessing.processColorItem,
    'Font Sizes': dataProcessing.processFontSizeItem,
    'Image Alt': dataProcessing.processImageItem,
    'Anchor Aria Labels': dataProcessing.processAArialItem
};

const verificationFunctions = {
    'Background Colors': dataProcessing.isColorMatched,
    'Text Colors': dataProcessing.isColorMatched,
    'Font Sizes': dataProcessing.isFontSizeMatched,
    'Image Alt': dataProcessing.isImageMatched,
    'Anchor Aria Labels': dataProcessing.isAArialMatched
};

// Función para crear el contenido del acordeón
export const createAccordionContent = (...accordionItems) => {
    const accordionContainer = document.getElementById('accordionResults');
    accordionContainer.innerHTML = ''; // Limpiar contenido existente

    const createAccordionItem = (title, matchedItems, unmatchedItems) => {
        const itemHtml = `
            <div id="${formatString(title, 'Accordion')}" class="accordion-item">
                <button class="accordion">${title}</button>
                <div class="panel">
                    <div class="summary summaryAccordion"></div>
                    <ul class="panelContentMatched">
                        ${matchedItems.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                    <ul class="panelContentUnmatched">
                        ${unmatchedItems.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        return itemHtml;
    };

    const accordionHtml = accordionItems.map(([title, items]) => {
        const matchedItems = [];
        const unmatchedItems = [];

        const processItem = processingFunctions[title];

        if (processItem) {
            items.forEach(item => {
                let result = processItem(item);
                if (result.isMatched) {
                    matchedItems.push(result.processedItem);
                } else {
                    unmatchedItems.push(result.processedItem);
                }
            });
        }

        // Ordenar los matchedItems
        const byName = title.includes("Color");
        const byJson = title.includes("Image Alt");
        const sortedMatchedItems = dataProcessing.sortMatchedItems(matchedItems, byName, byJson);

        // Crear el HTML para el acordeón con las dos listas separadas
        return createAccordionItem(title, sortedMatchedItems, unmatchedItems);
    }).join('');

    accordionContainer.innerHTML = accordionHtml;

    // Ejecutar la funcionalidad del acordeón
    requestAnimationFrame(() => {
        document.querySelectorAll('.accordion').forEach(header => {
            const panel = header.nextElementSibling;
            panel.style.maxHeight = panel.scrollHeight + "px";

            header.addEventListener('click', () => {
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    });

    // Actualizar el resumen después de crear el acordeón
    accordionItems.forEach(([title, items]) => {
        let matchedCount = 0;
        let unmatchedCount = 0;
        let id = formatString(title, 'Accordion');

        items.forEach(item => {
            const verifyItem = verificationFunctions[title];
            let isMatched = false;

            if (verifyItem) {
                isMatched = verifyItem(item);
            }

            if (isMatched) {
                matchedCount++;
            } else {
                unmatchedCount++;
            }
        });

        updateSummary(id, items.length, matchedCount, unmatchedCount, false);
    });
};