// src/components/imageAlt.js

/**
 * Procesa todas las imágenes en la página y devuelve un resumen de las imágenes
 * con y sin atributo alt.
 */
export const processImagesAlt = () => {
    const images = document.querySelectorAll('img');
    const results = [];

    images.forEach(img => {
        const src = img.src;
        const alt = img.alt.trim();
        const name = src.substring(src.lastIndexOf('/') + 1);
        const hasAlt = alt.length > 0;
        
        results.push({
            name,
            alt: hasAlt ? alt : '❌'
        });
    });

    return results;
};
