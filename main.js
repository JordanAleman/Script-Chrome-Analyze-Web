const updatePopup = () => {
    // Limpiar los resultados actuales
    document.getElementById("resultBackgroundColors").innerHTML = '';
    document.getElementById("resultTextColors").innerHTML = '';
    document.getElementById("resultFontSizes").innerHTML = '';

    // Enviar mensaje al script de contenido para analizar la página
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "analyzePage" }, response => {
            if (chrome.runtime.lastError) {
                console.error('Error al recibir respuesta:', chrome.runtime.lastError.message);
            } else if (response) {
                const { bgColors, textColors, fontSizes } = response;

                const tableBodyColors = document.getElementById("resultBackgroundColors");
                const tableBodyTextColors = document.getElementById("resultTextColors");
                const tableBodySizes = document.getElementById("resultFontSizes");

                const maxColorsPerRow = 5;

                const addColorRow = (colors, tableBody) => {
                    let rowHtml = `<tr>`;
                    colors.forEach(color => {
                        rowHtml += `
                            <td class="color-box" style="background-color: ${color};"></td>
                            <td>${color}</td>
                        `;
                    });
                    rowHtml += `</tr>`;
                    tableBody.innerHTML += rowHtml;
                };

                const createColorRows = (colors, tableBody) => {
                    let colorRow = [];
                    let colorCount = 0;

                    colors.forEach(color => {
                        colorRow.push(color);
                        colorCount++;

                        if (colorCount === maxColorsPerRow) {
                            addColorRow(colorRow, tableBody);
                            colorRow = [];
                            colorCount = 0;
                        }
                    });

                    if (colorRow.length > 0) addColorRow(colorRow, tableBody);
                };

                createColorRows(bgColors, tableBodyColors);
                createColorRows(textColors, tableBodyTextColors);

                // Modificar addFontSizeRow para mostrar tamaños en rem y píxeles
                const addFontSizeRow = (sizeString) => {
                    const [pxSize, remSize] = sizeString.split(' ');
                    const rowHtml = `
                        <tr>
                            <td>${remSize}rem | ${pxSize}</td>
                        </tr>
                    `;
                    tableBodySizes.innerHTML += rowHtml;
                };

                // Limpiar el contenido actual de la tabla de tamaños de fuente antes de añadir nuevas filas
                tableBodySizes.innerHTML = '';

                fontSizes.forEach(size => {
                    addFontSizeRow(size);
                });

                document.getElementById('results').style.display = 'block';
            }
        });
    });
};

document.getElementById('analyzeButton').addEventListener('click', updatePopup);