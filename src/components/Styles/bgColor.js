// bgColor.js
import { rgbStringToArray, rgbArrayToHex } from '../../assets/utils.js';

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

export const bgColorStructure = () => {
    let resultsShow = document.querySelector('#resultsShow');
    resultsShow.innerHTML = `
        <div id="backgroundColorSection" class="resultsContainer">
            <div class="containerResult" >
                <h2>Used Background Colors (HEX)</h2>
                <div class="summary"></div>
            </div>
            <div class="tableContainer">
                <table id="bgColorsTable">
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>HEX</th>
                            <th>Skapa name</th>
                        </tr>
                    </thead>
                    <tbody id="resultBackgroundColors"></tbody>
                </table>
            </div>
        </div>
    `;
    return document.getElementById("resultBackgroundColors");
};