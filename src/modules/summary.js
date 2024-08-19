// src/modules/summary.js

export const updateSummary = (sectionId, totalCount, matchedCount, unmatchedCount, isTable = true) => {
    const summaryElement = document.querySelector(`#${sectionId} .summary`);

    // Determina los textos y símbolos a mostrar basado en el parámetro isTable
    const matchedText = isTable ? `Skapa: ${matchedCount}` : `✔: ${matchedCount}`;
    const unmatchedText = isTable ? `No Skapa: ${unmatchedCount}` : `❌: ${unmatchedCount}`;

    // Actualiza el contenido del elemento summary
    summaryElement.innerHTML = `
        <span class="summaryInfo">Nº: ${totalCount}</span>
        <span class="summaryMatch">${matchedText}</span>  
        <span class="summaryNoMatch">${unmatchedText}</span>
    `;
};

/**
 * Actualizar resumen de resultados para imágenes.
 * @param {string} sectionId ID del contenedor del resumen.
 * @param {number} totalImages Total de imágenes procesadas.
 * @param {number} imagesWithAlt Total de imágenes con atributo alt.
 * @param {number} imagesWithoutAlt Total de imágenes sin atributo alt.
 */
export const updateImageSummary = (sectionId, totalImages, imagesWithAlt, imagesWithoutAlt, isTable = true) => {
    const summaryElement = document.getElementById(sectionId).querySelector('.summary');

    // Determina los textos y símbolos a mostrar basado en el parámetro isTable
    const matchedText = isTable ? `With Alt: ${imagesWithAlt}` : `✔: ${matchedCount}`;
    const unmatchedText = isTable ? `Without Alt: ${imagesWithoutAlt}` : `❌: ${unmatchedCount}`;

    // Actualiza el contenido del elemento summary
    summaryElement.innerHTML = `
        <span class="summaryInfo">Total Images: ${totalImages}</span>
        <span class="summaryMatch">${matchedText}</span>  
        <span class="summaryNoMatch">${unmatchedText}</span>
    `;
};