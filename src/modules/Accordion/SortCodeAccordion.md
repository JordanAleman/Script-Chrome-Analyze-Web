# Función `sortMatchedItems`

La función `sortMatchedItems` se encarga de ordenar una lista de elementos procesados en función de distintos criterios, permitiendo que los elementos sean presentados de manera organizada en la interfaz.

## Código de la Función

Aquí está el código para la función `sortMatchedItems`:

```javascript
/**
 * Ordena los elementos procesados basándose en criterios específicos.
 *
 * @param {Array<string>} items - La lista de elementos a ordenar.
 * @param {boolean} byName - Si true, ordena por nombre; si false, por JSON.
 * @param {boolean} byJson - Si true, usa un criterio de ordenación basado en JSON.
 * @returns {Array<string>} - La lista de elementos ordenada.
 */
export const sortMatchedItems = (items, byName, byJson) => {
    if (byName) {
        return items.sort((a, b) => {
            const aName = a.split(' | ')[1];
            const bName = b.split(' | ')[1];
            return aName.localeCompare(bName);
        });
    } else if (byJson) {
        return items.sort((a, b) => a.localeCompare(b));
    } else {
        return items.sort((a, b) => {
            const aName = a.split(' | ')[2];
            const bName = b.split(' | ')[2];
            const fontSizeOrder = Object.keys(skapaJson['font-sizes']);

            // Ordenar de menor a mayor
            return fontSizeOrder.indexOf(aName) - fontSizeOrder.indexOf(bName);
        });
    }
};
```
## Criterios de Ordenación

La función permite tres tipos de ordenación:

### Ordenar por Nombre (`byName`)

- **Cuando `byName` es `true`**: La función ordena los elementos alfabéticamente basándose en el nombre del ítem.
- **Cómo funciona**: La función extrae el nombre del ítem desde una posición específica en la cadena, que se obtiene después de dividir el ítem con `' | '`. Luego, usa `localeCompare` para comparar y ordenar estos nombres.

### Ordenar por JSON (`byJson`)

- **Cuando `byJson` es `true`**: La función ordena los elementos basándose en la cadena completa del ítem.
- **Cómo funciona**: En este caso, la ordenación se realiza directamente sobre la cadena completa del ítem, usando `localeCompare`. Esto puede ser útil si los ítems tienen una representación textual adecuada en el formato JSON.

### Ordenar por Orden Predefinido (`else`)

- **Si ni `byName` ni `byJson` son `true`**: La función asume que se debe ordenar por un criterio específico predefinido, como el orden de tamaños de fuente.
- **Cómo funciona**: La función compara los elementos basándose en un orden predefinido extraído de `skapaJson['font-sizes']`. El índice del nombre en este orden predefinido se usa para ordenar los ítems de menor a mayor.

## Integración en el Código del Acordeón

Aquí está el fragmento relevante del código que utiliza `sortMatchedItems`:

```javascript
const accordionHtml = accordionItems.map(([title, items]) => {
    const matchedItems = [];
    const unmatchedItems = [];

    const processItem = processingFunctions[title];

    if (processItem) {
        items.forEach(item => {
            let result = processItem(item);
            if (result.isMatched) {
                matchedItems.push(result.processedItem);
            } else {
                unmatchedItems.push(result.processedItem);
            }
        });
    }

    // Ordenar los matchedItems
    const byName = title.includes("Color");
    const byJson = title.includes("Image Alt");
    const sortedMatchedItems = dataProcessing.sortMatchedItems(matchedItems, byName, byJson);

    // Crear el HTML para el acordeón con las dos listas separadas
    return createAccordionItem(title, sortedMatchedItems, unmatchedItems);
}).join('');
```

## Explicación de la Integración

### Determinación del Criterio de Ordenación

- **`byName`** se establece en `true` si el título del acordeón incluye la palabra "Color". Esto indica que los elementos relacionados con colores deben ser ordenados por su nombre.

- **`byJson`** se establece en `true` si el título incluye "Image Alt". Esto sugiere que estos elementos se ordenen basándose en el JSON, posiblemente por una representación textual completa.

### Aplicación del Criterio

- `dataProcessing.sortMatchedItems` es llamada con `matchedItems` y los criterios `byName` y `byJson`. La función `sortMatchedItems` aplica el criterio adecuado para ordenar los ítems y devuelve una lista ordenada.

### Generación del HTML

- El HTML del acordeón se crea usando `createAccordionItem`, que toma los ítems ordenados y los ítems no coincidentes para formar el contenido del acordeón.