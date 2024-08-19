// src/components/Accessibility/aArial.js

/**
 * Procesa todos los elementos <a> en la página y devuelve un resumen de los enlaces
 * con y sin atributo aria-label.
 */
export const processAElements = () => {
    const anchors = document.querySelectorAll('a');
    const results = [];

    anchors.forEach(anchor => {
        const href = anchor.href.trim();
        const ariaLabel = anchor.getAttribute('aria-label');
        const hasAriaLabel = ariaLabel && ariaLabel.length > 0;

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
