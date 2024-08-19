# Guía para Añadir un Nuevo Componente en la Aplicación de Análisis de Estilos

Este documento describe paso a paso cómo añadir un nuevo componente de análisis en la aplicación. El objetivo es poder realizar un análisis específico de un nuevo tipo de elemento o propiedad en la página web y mostrar los resultados en la interfaz, tanto en una tabla como en un acordeón.

## Paso 1: Crear el Nuevo Componente

### Crear el Archivo del Componente

1. Navega a la carpeta `src/components` y selecciona la subcarpeta adecuada (`Styles` o `Accessibility`) dependiendo del tipo de análisis que deseas realizar.
2. Crea un nuevo archivo `.js` en la subcarpeta seleccionada. Por ejemplo, si deseas analizar los elementos `<a>` para verificar la existencia de `aria-label`, crea `aArial.js` en `src/components/Accessibility`.

### Escribir la Lógica de Análisis

Dentro del archivo del nuevo componente, escribe las funciones necesarias para realizar el análisis. Utiliza como referencia otros componentes existentes como `imageAlt.js`.

```javascript
export const processAArials = () => {
    const anchors = document.querySelectorAll('a');
    const results = [];

    anchors.forEach(anchor => {
        const href = anchor.href;
        const ariaLabel = anchor.getAttribute('aria-label');
        const hasAriaLabel = ariaLabel && ariaLabel.trim().length > 0;

        results.push({
            href,
            ariaLabel: hasAriaLabel ? ariaLabel : '❌'
        });
    });

    return results;
};

export const aArialStructure = () => {
    let resultsShow = document.querySelector('#resultsShow');
    resultsShow.innerHTML = `
        <div id="aArialSection" class="resultsContainer">
            <div class="containerResult">
                <h2>Anchor Aria Labels</h2>
                <div class="summary"></div>
            </div>
            <div class="tableContainer">
                <table id="aArialTable">
                    <thead>
                        <tr>
                            <th>Href</th>
                            <th>Aria Label</th>
                        </tr>
                    </thead>
                    <tbody id="resultAArials"></tbody>
                </table>
            </div>
        </div>
    `;
    return document.getElementById("resultAArials");
};
```

## Paso 2: Modificar `content.js`

### Importar la Función de Análisis

1. Abre el archivo `src/content.js`.
2. Importa la función de análisis desde el nuevo componente.

    ```javascript
    import { processAArials } from './components/Accessibility/aArial.js';
    ```

### Añadir la Función de Análisis

1. Añade una nueva función para procesar los elementos que estás analizando en el nuevo componente.

        ```javascript
        const analyzePageAArials = () => processAArials();
        ```

### Integrar el Nuevo Componente en la Lógica

1. En el listener `chrome.runtime.onMessage.addListener`, modifica las funciones para incluir los resultados de tu nuevo análisis.

    ```javascript
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "analyzePage") {
            const styleResults = analyzePageStyles(document.querySelectorAll('*'));
            const imageAltResults = analyzePageImagesAlt();
            const aArialsResults = analyzePageAArials(); // Añadir esta línea
            sendResponse({
                ...styleResults,
                imageAlt: imageAltResults,
                aArials: aArialsResults // Añadir esta línea
            });
        }
        // Otros casos similares...
    });
    ```

## Paso 3: Modificar `contentController.js`

### Importar el Nuevo Componente

1. Abre el archivo `src/modules/contentController.js`.
2. Importa la estructura de tu nuevo componente:

    ```javascript
    import { aArialStructure } from '../components/Accessibility/aArial.js';
    ```

### Actualizar la Función `toggleView`

1. Modifica la función `toggleView` para incluir el nuevo análisis.

    ```javascript
    const toggleView = () => {
        const analyzeContent = document.querySelector('#analyzeContent');

        if (analyzeContent.style.display !== 'none') analyzeContent.style.display = 'none';

        const selectedRadio = document.querySelector('.resultsChooseShow input[type="radio"]:checked');
        if (!selectedRadio) return;

        const selectedValue = selectedRadio.parentElement.textContent.trim();
        const isAccordionView = toggleViewButton.checked;

        if (cachedResults) {
            if (isAccordionView) {
                accordionCreators.createAccordionContent(
                    ['Background Colors', cachedResults.bgColors],
                    ['Text Colors', cachedResults.textColors],
                    ['Font Sizes', cachedResults.fontSizes],
                    ['Image Alt', cachedResults.imageAlt],
                    ['Anchor Aria Labels', cachedResults.aArials] // Añadido aquí
                );
            } else {
                updateTableAndSummary(selectedValue, cachedResults);
            }

            uiUpdater.showResults();
        }
    };
    ```

### Actualizar la Lógica para Manejar el Nuevo Componente

1. Actualizar la Función `updatePopup`

    ```javascript
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action, selector }, response => {
            if (chrome.runtime.lastError) {
                console.error('Error al recibir respuesta (っ °Д °;)っ:', chrome.runtime.lastError.message);
            } else if (response) {
                // Creamos el nuevo elemento "aArials"
                const { bgColors, textColors, fontSizes, imageAlt, aArials, elementFound } = response;

                if (elementFound === false) {
                    uiUpdater.showNoResultsMessage(`Element "${selector}" not found!`);
                } else {
                    // Guardar resultados en caché
                    cachedResults = { bgColors, textColors, fontSizes, imageAlt, aArials };

                    toggleView();
                }
            }
        });
    });
    ```

2. Dentro de la función `updateTableAndSummary`, añade un nuevo caso para manejar tu nuevo componente.

    ```javascript
    const updateTableAndSummary = (selectedValue, cachedResults) => {
        let tableBody;
        let counts;

        switch (selectedValue) {
            case 'bgColor':
                tableBody = bgColorStructure();
                counts = tableCreators.createColorRows(cachedResults.bgColors, tableBody);
                updateSummary("backgroundColorSection", counts.totalCount, counts.matchedCount, counts.unmatchedCount);
                break;

            case 'color':
                tableBody = colorStructure();
                counts = tableCreators.createColorRows(cachedResults.textColors, tableBody);
                updateSummary("textColorSection", counts.totalCount, counts.matchedCount, counts.unmatchedCount);
                break;

            case 'fontSize':
                tableBody = fontSizeStructure();
                counts = tableCreators.createTableSizes(cachedResults.fontSizes, tableBody);
                updateSummary("fontSizeSection", counts.totalCount, counts.matchedCount, counts.unmatchedCount);
                break;

            case 'imageAlt':
                tableBody = imageAltStructure();
                counts = tableCreators.createImageAltTable(cachedResults.imageAlt, tableBody);
                updateImageSummary("imageAltSection", counts.totalImages, counts.imagesWithAlt, counts.imagesWithoutAlt);
                break;

            case 'aArial': // Añadido aquí
                tableBody = aArialStructure();
                counts = tableCreators.createAArialsTable(cachedResults.aArials, tableBody);
                updateImageSummary("aArialSection", counts.totalAArials, counts.withAriaLabel, counts.withoutAriaLabel);
                break;

            default:
                console.warn(`Unknown selection: ${selectedValue}`);
                break;
        }
    }
    ```

## Paso 4: Modificar `accordionCreators.js`

### Actualizar `processingFunctions` y `verificationFunctions`

1. Abre el archivo `src/modules/accordionCreators.js`.

2. Añade el nuevo componente a `processingFunctions` y `verificationFunctions`. Por ejemplo:

    ```javascript
    const processingFunctions = {
        'Background Colors': dataProcessing.processColorItem,
        'Text Colors': dataProcessing.processColorItem,
        'Font Sizes': dataProcessing.processFontSizeItem,
        'Image Alt': dataProcessing.processImageItem,
        'Anchor Aria Labels': dataProcessing.processAArialItem // Añadido aquí
    };

    const verificationFunctions = {
        'Background Colors': dataProcessing.isColorMatched,
        'Text Colors': dataProcessing.isColorMatched,
        'Font Sizes': dataProcessing.isFontSizeMatched,
        'Image Alt': dataProcessing.isImageMatched,
        'Anchor Aria Labels': dataProcessing.isAArialMatched // Añadido aquí
    };
    ```

## Paso 5: Modificar `dataProcessing.js`

### Incluir la Información Requerida

1. Abre el archivo `src/modules/dataProcessing.js`.

2. Añade el bloque para el nuevo análisis de `aria-label`. Por ejemplo:

    ```javascript
    /* -------------------------------------------------------------------------- */
    /*                              Bloque de aArial                              */
    /* -------------------------------------------------------------------------- */

    /**
    * Procesa un elemento de etiqueta aria para verificar si la etiqueta aria es válida
    * y formatea la salida con el href y ariaLabel o un símbolo de error.
    *
    * @param {Object} item - El objeto con propiedades `href` y `ariaLabel`.
    * @returns {Object} - Un objeto que contiene el item procesado y un indicador de si hay coincidencia.
    */
    export const processAArialItem = (item) => {
        let isMatched = item.ariaLabel !== '❌';
        let processedItem =
            isMatched
                ? `<strong>Href:</strong> ${item.href} <br><strong>Aria Label:</strong> ${item.ariaLabel}`
                : `${item.href} | ${item.ariaLabel}`;

        return { processedItem, isMatched };
    };

    /**
    * Verifica si la etiqueta aria de un elemento es válida.
    *
    * @param {Object} item - El objeto con una propiedad `ariaLabel`.
    * @returns {boolean} - True si la etiqueta aria no es el símbolo de error, de lo contrario, false.
    */
    export const isAArialMatched = (item) => item.ariaLabel !== '❌';

    /* ------------------------------- Fin aArial ------------------------------- */
    ```




## Paso 6: Modificar `tableCreators.js` (si es necesario)

### Crear una Función para Construir la Tabla

1. Abre el archivo `src/modules/tableCreators.js`.
2. Crea una función que genere las filas de la tabla usando los datos obtenidos en tu nuevo análisis. Por ejemplo:

    ```javascript
    export const createAArialsTable = (aArials, tableBody) => {
        let totalAArials = aArials.length;
        let withAriaLabel = 0;
        let withoutAriaLabel = 0;

        aArials.forEach(aArial => {
            const row = document.createElement('tr');
            const ariaLabel = aArial.ariaLabel;

            row.innerHTML = `
                <td>${aArial.href}</td>
                <td>${ariaLabel}</td>
            `;
            
            if (ariaLabel !== '❌') withAriaLabel++;
            else withoutAriaLabel++;

            tableBody.appendChild(row);
        });

        return { totalAArials, withAriaLabel, withoutAriaLabel };
    };
    ```

## Paso 7: Modificar la Interfaz de Usuario (HTML)

### Actualizar el Archivo HTML

1. Abre el archivo HTML principal donde se muestran los resultados de análisis.
2. Añade un nuevo `input` de tipo `radio` para que el usuario pueda seleccionar la nueva opción de análisis. Por ejemplo:

    ```html
    <div class="resultsChooseShow">
        <h2>Choose to show</h2>
        <h3>Styles</h3>
        <div class="radioButtonContainer">
            <label class="container">
                bgColor
                <input type="radio" value="bgColor" name="radio" checked="checked" />
                <span class="checkmark"></span>
            </label>
            <label class="container">
                color
                <input type="radio" value="color" name="radio" />
                <span class="checkmark"></span>
            </label>
            <label class="container">
                fontSize
                <input type="radio" value="fontSize" name="radio" />
                <span class="checkmark"></span>
            </label>
        </div>
    
        <h3>Accessibility</h3>
        <div class="radioButtonContainer">
            <label class="container">
                imageAlt
                <input type="radio" value="imageAlt" name="radio" />
                <span class="checkmark"></span>
            </label>
            <label class="container"> <!-- Nuevo input radio -->
                aArial
                <input type="radio" value="aArial" name="radio" />
                <span class="checkmark"></span>
            </label>
        </div>
    </div>
    ```

## Paso 8: Validar la Integración

### Probar el Nuevo Componente

1. Realiza una prueba completa del nuevo componente tanto en la vista de tabla como en la vista de acordeón para asegurarte de que todo funcione como se espera.
2. Verifica que la selección del nuevo componente en la interfaz de usuario (UI) funcione correctamente y que los datos se presenten bien.

### Depuración

1. Si encuentras errores, utiliza la consola para depurar y corregir cualquier problema. Asegúrate de revisar los mensajes de error y advertencia para identificar la causa de los problemas.
