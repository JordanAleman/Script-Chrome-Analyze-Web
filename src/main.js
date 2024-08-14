// src/main.js

import { initializeListeners } from './modules/eventListeners.js';
import './styles/main.scss';

// Inicializar todos los listeners cuando se carga el documento
document.addEventListener('DOMContentLoaded', initializeListeners);
