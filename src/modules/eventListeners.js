// src/modules/eventListeners.js

import { updatePopup } from './contentController.js';
import { cleanContent } from './domUtils.js';
import { showNoResultsMessage } from './uiUpdater.js';

export const initializeListeners = () => {
    document.getElementById('analyzeButton').addEventListener('click', () => {
        updatePopup('*', 'analyzePage');
    });

    document.getElementById('searchByIdButton').addEventListener('click', () => {
        cleanContent();
        const id = document.getElementById('idSelector').value.trim();
        if (id) {
            updatePopup(id, 'searchById');
        } else {
            showNoResultsMessage(`Please enter a valid ID!`);
        }
    });

    document.getElementById('searchButton').addEventListener('click', () => {
        cleanContent();
        const selector = document.getElementById('elementSelector').value.trim();
        if (selector) {
            updatePopup(selector, 'searchElement');
        } else {
            showNoResultsMessage(`Please enter a valid selector!`);
        }
    });

    document.getElementById('idSelector').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('searchByIdButton').click();
        }
    });

    document.getElementById('elementSelector').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('searchButton').click();
        }
    });
};
