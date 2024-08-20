// src/components/Accessibility/aArial.js

/**
 * Procesa todos los elementos <a> en la página y devuelve un resumen de los enlaces
 * con y sin atributo aria-label.
 */
export const processAElements = () => {
    const anchors = document.querySelectorAll('a');
    const results = [];

    anchors.forEach(anchor => {
        let href = anchor.href.trim();
        const ariaLabel = anchor.getAttribute('aria-label');
        const hasAriaLabel = ariaLabel && ariaLabel.length > 0;

        // Eliminar la query string (línea completa después del '?')
        const queryIndex = href.indexOf('?');
        if (queryIndex !== -1) {
            href = href.substring(0, queryIndex);
        }

        // Controlar el tamaño de la URL
        if (href.length >= 70) {
            const lastSlashIndex = href.lastIndexOf('/');
            if (lastSlashIndex !== -1 && lastSlashIndex < href.length - 1) {
                const firstPart = href.slice(0, lastSlashIndex + 1);
                const secondPart = href.slice(lastSlashIndex + 1);
                href = `
                    <span>${firstPart}</span><br><span>${secondPart}</span>
                `;
            } else {
                href = `
                    <span>${href}</span>
                `;
            }
        } else {
            href = `
                <span>${href}</span>
            `;
        }



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
                <h2>Aria-label in Anchor Tags</h2>
                <div class="summary"></div>
            </div>
            <div class="tableContainer">
                <table id="aArialTable">
                    <thead>
                        <tr>
                            <th>Href</th>
                            <th>Aria-label</th>
                        </tr>
                    </thead>
                    <tbody id="resultAArials"></tbody>
                </table>
            </div>
        </div>
    `;
    return document.getElementById("resultAArials");
};
