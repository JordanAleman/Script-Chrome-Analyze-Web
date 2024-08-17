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

export const imageAltStructure = () => {
    let resultsShow = document.querySelector('#resultsShow');
    resultsShow.innerHTML = `
        <div id="imageAltSection" class="resultsContainer">
            <div class="containerResult">
                <h2>Image Alt Attributes</h2>
                <div class="summary"></div>
            </div>
            <div class="tableContainer">
                <table id="imageAltTable">
                    <thead>
                        <tr>
                            <th>Src</th>
                            <th>Name</th>
                            <th>Alt</th>
                        </tr>
                    </thead>
                    <tbody id="resultImageAlts"></tbody>
                </table>
            </div>
        </div>
    `;
    return document.getElementById("resultImageAlts");
};