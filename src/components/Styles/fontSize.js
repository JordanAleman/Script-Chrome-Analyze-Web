// src/components/fontSize.js
import { pxToRem } from '../../assets/utils.js';

export const processFontSize = (element) => {
    let fontSize = window.getComputedStyle(element).fontSize;
    if (fontSize && fontSize !== '0px') {
        // Convertir el tamaño de fuente en píxeles a un número
        const pxValue = parseFloat(fontSize);

        // Redondear el valor de píxeles a un número entero
        const roundedPxValue = Math.round(pxValue);

        // Convertir el tamaño de fuente redondeado a rem
        const remValue = pxToRem(`${roundedPxValue}px`);

        // Retornar el tamaño de fuente redondeado en píxeles y en rem
        return `${roundedPxValue}px | ${remValue}`;
    }
    return null;
};

export const fontSizeStructure = () => {
    let resultsShow = document.querySelector('#resultsShow');
    resultsShow.innerHTML = `
        <div id="fontSizeSection" class="resultsContainer">
            <div class="containerResult">
                <h2>Used Font Sizes</h2>
                <div class="summary"></div>
            </div>
            <div class="tableContainer">
                <table id="fontSizesTable">
                    <thead>
                        <tr>
                            <th id="fontSizeHeader" colspan="1">
                                Font Size
                            </th>
                        </tr>
                    </thead>
                    <tbody id="resultFontSizes"></tbody>
                </table>
            </div>
        </div>
    `;
    return document.getElementById("resultFontSizes");
};