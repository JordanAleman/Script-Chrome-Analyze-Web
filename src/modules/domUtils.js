// src/modules/domUtils.js

export const cleanContent = () => {
    document.getElementById("resultBackgroundColors").innerHTML = '';
    document.getElementById("resultTextColors").innerHTML = '';
    document.getElementById("resultFontSizes").innerHTML = '';
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
