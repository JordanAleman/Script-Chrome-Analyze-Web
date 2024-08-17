// color.js
import { rgbStringToArray, rgbArrayToHex } from '../../assets/utils';

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

export const colorStructure = () => {
    let resultsShow = document.querySelector('#resultsShow');
    resultsShow.innerHTML = `
        <div id="textColorSection" class="resultsContainer">
            <div class="containerResult">
                <h2>Used Colors (HEX)</h2>
                <div class="summary"></div>
            </div>
            <div class="tableContainer">
                <table id="textColorsTable">
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>HEX</th>
                            <th>Skapa name</th>
                        </tr>
                    </thead>
                    <tbody id="resultTextColors"></tbody>
                </table>
            </div>
        </div>
    `;
    return document.getElementById("resultTextColors");
};