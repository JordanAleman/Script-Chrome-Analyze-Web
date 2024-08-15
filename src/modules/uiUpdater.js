// src/modules/uiUpdater.js

import skapaJson from '../assets/skapa.json';
import { formatString } from '../assets/utils';
import { processColorItem, processFontSizeItem, sortMatchedItems } from './dataProcessing';
import { updateSummary } from './summary.js';

// Mostrar el mensaje de "Sin Resultados" y ocultar el contenido
export const showNoResultsMessage = (message) => {
    const noResults = document.getElementById('noResults');
    noResults.innerText = message;
    noResults.style.display = 'flex';
    document.getElementById('results').style.display = 'none'; // Ocultar tabla si hay mensaje de sin resultados
    document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón si hay mensaje de sin resultados
};

// Función para mostrar resultados en modo acordeón o tabla según el estado del switch
export const showResults = () => {
    const isAccordionView = document.querySelector('.switch input').checked;

    if (isAccordionView) {
        document.getElementById('accordionResults').style.display = 'grid';
        document.getElementById('results').style.display = 'none'; // Ocultar tabla
    } else {
        document.getElementById('results').style.display = 'flex';
        document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón
    }

    document.getElementById('noResults').style.display = 'none'; // Ocultar mensaje de sin resultados
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

        // Separar ítems en matched y unmatched
        items.forEach(item => {
            let result;
            if (title.includes("Color"))
                result = processColorItem(item);
            else if (title.includes("Size"))
                result = processFontSizeItem(item);

            if (result.isMatched)
                matchedItems.push(result.processedItem);
            else
                unmatchedItems.push(result.processedItem);
        });

        // Ordenar los matchedItems
        const isColor = title.includes("Color");
        const sortedMatchedItems = sortMatchedItems(matchedItems, isColor);

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
            let isMatched = false;

            if (isColor) {
                const lowerCaseItem = item.toLowerCase();
                const colorsLowerCase = Object.values(skapaJson.colors).map(color => color.toLowerCase());
                isMatched = colorsLowerCase.includes(lowerCaseItem);
            } else if (isFontSize) {
                const [, remValue] = item.split(' | ');
                const remValueLowerCase = remValue.toLowerCase();
                isMatched = Object.values(skapaJson['font-sizes']).some(value => `${value}rem`.toLowerCase() === remValueLowerCase);
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

/**
 * Crear contenido del acordeón para los resultados de imágenes.
 * @param {Array} images Array de objetos con {name, alt} de las imágenes.
 * @param {HTMLElement} accordionElement Elemento donde se agregará el contenido.
 */
export const createAccordionImagesContent = (images, accordionElement) => {
    accordionElement.innerHTML = ''; // Limpiar contenido previo

    images.forEach(image => {
        const item = document.createElement('div');
        item.classList.add('accordion-item');

        const title = document.createElement('h3');
        title.textContent = image.name;
        title.classList.add('accordion-title');

        const content = document.createElement('div');
        content.textContent = `Alt text: ${image.alt}`;
        content.classList.add('accordion-content');

        item.appendChild(title);
        item.appendChild(content);
        accordionElement.appendChild(item);
    });
};

// Hacer que la vista de acordeón sea la predeterminada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const switchInput = document.querySelector('.switch input');
    switchInput.checked = true; // Establece la vista acordeón como predeterminada
    showResults(); // Muestra los resultados en el modo acordeón
});


