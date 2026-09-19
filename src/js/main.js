import './input.css';          // Fixed path: input.css is in the same folder
import { createApp } from 'vue'; // Import Vue's application factory
import App from './App.vue';     // Import your root Vue component

document.addEventListener('DOMContentLoaded', () => {
  // Initialize target interactive elements
  initApp();
  
  // Initialize and mount the Vue application to the element with id="app"
  initVueApp();
});

/**
 * Initializes legacy vanilla components if present on the DOM.
 */
function initApp() {
  const actionButton = document.getElementById('action-btn');
  
  if (actionButton) {
    actionButton.addEventListener('click', () => {
      // Simple interaction test to verify script execution
      alert('Your modern JavaScript application is successfully linked!');
    });
  }
}

/**
 * Initializes the Vue application instance.
 */
function initVueApp() {
  const vueRoot = document.getElementById('app');
  
  if (vueRoot) {
    createApp(App).mount('#app');
  }
}