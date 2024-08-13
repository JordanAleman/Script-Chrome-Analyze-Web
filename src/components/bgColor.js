// bgColor.js
import { rgbStringToArray, rgbArrayToHex } from '../assets/utils.js';

export const processBackgroundColor = (element) => {
    let bgColor = window.getComputedStyle(element).backgroundColor;
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        let rgbArray = rgbStringToArray(bgColor);
        if (rgbArray) {
            return rgbArrayToHex(rgbArray);
        }
    }
    return null;
};
