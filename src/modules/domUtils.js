// src/modules/domUtils.js

export const cleanContent = () => {
    // Limpiar todo el contenido de cada tbody dentro de la sección de resultados
    const resultTables = document.querySelectorAll("#results tbody");
    resultTables.forEach(tbody => {
        tbody.innerHTML = '';
    });

    // Ocultar la sección de resultados y el mensaje de "no results"
    document.getElementById('results').style.display = 'none';
    document.getElementById('noResults').style.display = 'none';
};


export const getSelector = (selectorType, selector) => {
    switch (selectorType.toLowerCase()) {
        case 'custom':
            return selector;
        case 'id':
            return `#${selector}`;
        case 'class':
            return `.${selector}`;
        case 'name':
            return `[name="${selector}"]`;
        case 'tag':
            return `${selector}`;
        default:
            return selector;
    }
};

export const isValidSelector = (selector) => {
    try {
        document.createDocumentFragment().querySelector(selector);
    } catch (error) {
        return false;
    }
    return true;
};
