// src/modules/accordionCreators.js

import skapaJson from '../../assets/skapa.json';
import { formatString } from '../../assets/utils.js';
import { processColorItem, processFontSizeItem, processImageItem, sortMatchedItems } from './dataProcessing.js';
import { updateSummary } from '../summary.js';

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

        // Separar ítems en matched y unmatched
        items.forEach(item => {
            let result;
            if (title.includes("Color")) {
                result = processColorItem(item);
            } else if (title.includes("Size")) {
                result = processFontSizeItem(item);
            } else if (title.includes("Image Alt")) { // Comprobación para imágenes
                result = processImageItem(item);
            }

            if (result.isMatched)
                matchedItems.push(result.processedItem);
            else
                unmatchedItems.push(result.processedItem);
        });

        // Ordenar los matchedItems
        const isColor = title.includes("Color");
        const isImage = title.includes("Image Alt");
        const sortedMatchedItems = sortMatchedItems(matchedItems, isColor, isImage);

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
            const isColor = id.includes("Color");
            const isFontSize = id.includes("Size");
            const isImage = id.includes("imageAlt");
            let isMatched = false;

            if (isColor) {
                const lowerCaseItem = item.toLowerCase();
                const colorsLowerCase = Object.values(skapaJson.colors).map(color => color.toLowerCase());
                isMatched = colorsLowerCase.includes(lowerCaseItem);
            } else if (isFontSize) {
                const [, remValue] = item.split(' | ');
                const remValueLowerCase = remValue.toLowerCase();
                isMatched = Object.values(skapaJson['font-sizes']).some(value => `${value}rem`.toLowerCase() === remValueLowerCase);
            } else if (isImage) {
                isMatched = item.alt !== '❌'; // Comprobación directa del alt
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