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
            src,
            name,
            alt: hasAlt ? alt : '❌'
        });
    });

    return results;
};

// src/components/imageAlt.js

/**
 * Procesa todas las imágenes en la página y devuelve un resumen de las imágenes
 * con y sin atributo alt.
 */
export const processImagesAlt2 = () => {
    const images = document.querySelectorAll('img');
    const results = {
        totalImages: 0,
        imagesWithAlt: 0,
        imagesWithoutAlt: 0,
        images: []
    };

    images.forEach(img => {
        results.totalImages++;
        const src = img.src;
        const alt = img.alt.trim();
        const name = src.substring(src.lastIndexOf('/') + 1);
        const hasAlt = alt.length > 0;
        
        if (hasAlt) {
            results.imagesWithAlt++;
            results.images.push({ name, alt });
        } else {
            results.imagesWithoutAlt++;
            results.images.push({ name, alt: '❌' });
        }
    });

    return results;
};
