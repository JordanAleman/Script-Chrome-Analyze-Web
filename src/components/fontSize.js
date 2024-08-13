// fontSize.js
import { pxToRem } from '../assets/utils.js';

export const processFontSize = (element) => {
    let fontSize = window.getComputedStyle(element).fontSize;
    if (fontSize && fontSize !== '0px') {
        return `${fontSize} ${pxToRem(fontSize)}`;
    }
    return null;
};
