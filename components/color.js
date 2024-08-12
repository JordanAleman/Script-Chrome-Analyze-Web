// color.js
import { rgbStringToArray, rgbArrayToHex } from '../assets/utils.js';

export const processTextColor = (element) => {
    let color = window.getComputedStyle(element).color;
    if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
        let rgbArray = rgbStringToArray(color);
        if (rgbArray) {
            return rgbArrayToHex(rgbArray);
        }
    }
    return null;
};
