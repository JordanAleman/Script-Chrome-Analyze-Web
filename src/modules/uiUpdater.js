// src/modules/uiUpdater.js

// Mostrar el mensaje de "Sin Resultados" y ocultar el contenido
export const showNoResultsMessage = (message) => {
    const noResults = document.getElementById('noResults');
    noResults.innerText = message;
    noResults.style.display = 'flex';
    document.getElementById('results').style.display = 'none'; // Ocultar tabla si hay mensaje de sin resultados
    document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón si hay mensaje de sin resultados
};

// Función para mostrar resultados en modo acordeón o tabla según el estado del switch
export const showResults = () => {
    const isAccordionView = document.querySelector('.switch input').checked;

    if (isAccordionView) {
        document.getElementById('accordionResults').style.display = 'grid';
        document.getElementById('results').style.display = 'none'; // Ocultar tabla
    } else {
        document.getElementById('results').style.display = 'flex';
        document.getElementById('accordionResults').style.display = 'none'; // Ocultar acordeón
    }

    document.getElementById('noResults').style.display = 'none'; // Ocultar mensaje de sin resultados
};

// Hacer que la vista de acordeón sea la predeterminada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const switchInput = document.querySelector('.switch input');
    switchInput.checked = true; // Establece la vista acordeón como predeterminada
    showResults(); // Muestra los resultados en el modo acordeón
});


