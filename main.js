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
                const fontSizeHeader = document.getElementById("fontSizeHeader");

                const maxColumns = 5; // Número máximo de columnas
                const maxRows = 2;    // Número máximo de filas

                // Helper functions
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

                        if (colorCount === maxColumns) {
                            addColorRow(colorRow, tableBody);
                            colorRow = [];
                            colorCount = 0;
                        }
                    });

                    if (colorRow.length > 0) addColorRow(colorRow, tableBody);
                };

                createColorRows(bgColors, tableBodyColors);
                createColorRows(textColors, tableBodyTextColors);

                // Organizar los tamaños de fuente en 5 columnas y 2 filas
                const createFontSizeTable = (sizes, tableBody) => {
                    const totalSizes = sizes.length;
                    const columns = Math.min(maxColumns, totalSizes);
                    const rows = Math.min(maxRows, Math.ceil(totalSizes / columns));

                    fontSizeHeader.setAttribute('colspan', columns); // Ajustar el colspan de la cabecera

                    let sizeIndex = 0;
                    for (let row = 0; row < rows; row++) {
                        let rowHtml = `<tr>`;
                        for (let col = 0; col < columns; col++) {
                            if (sizeIndex < totalSizes) {
                                const [pxSize, remSize] = sizes[sizeIndex].split(' ');
                                rowHtml += `<td>${remSize}rem | ${pxSize}</td>`;
                                sizeIndex++;
                            } else {
                                rowHtml += `<td></td>`; // Rellenar con celdas vacías si es necesario
                            }
                        }
                        rowHtml += `</tr>`;
                        tableBody.innerHTML += rowHtml;
                    }
                };

                // Limpiar el contenido actual de la tabla de tamaños de fuente antes de añadir nuevas filas
                tableBodySizes.innerHTML = '';

                // Crear la tabla de tamaños de fuente
                createFontSizeTable(fontSizes, tableBodySizes);

                document.getElementById('results').style.display = 'block';
            }
        });
    });
};

document.getElementById('analyzeButton').addEventListener('click', updatePopup);