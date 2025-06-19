import './style.css';
import page from 'page';
import { setupHeader } from './components/header.js';
import { setupHero } from './components/hero.js';
import { setupProducts } from './components/products.js';
import { setupProductsPage } from './pages/products.js';
import { setupCareGuideRoutes } from './care-guide/router.js';
import { setupSpeciesBook } from './pages/species-book.js';
import { initLanguage } from './utils/languageStore.js';
import { setupFooter } from './components/footer.js';

// Initialize the application
const initApp = () => {
  const app = document.querySelector('#app');
  
  // Initialize language
  initLanguage();
  
  // Setup routing
  page('/products', (ctx) => {
    app.innerHTML = '';
    const header = setupHeader();
    const content = setupProductsPage(ctx);
    const footer = setupFooter();
    app.appendChild(header);
    app.appendChild(content);
    app.appendChild(footer);
  });

  // Setup Care Guide routes
  setupCareGuideRoutes(app);

  page('/species-book', () => {
    app.innerHTML = '';
    const header = setupHeader();
    const content = setupSpeciesBook();
    const footer = setupFooter();
    app.appendChild(header);
    app.appendChild(content);
    app.appendChild(footer);
  });

  page('/cart', () => {
    app.innerHTML = '';
    const header = setupHeader();
    const cartPage = document.createElement('section');
    cartPage.className = 'cart-page';
    cartPage.innerHTML = `
      <div class="cart-container">
        <h1 class="cart-title">🛒 Your Cart</h1>
        <p class="cart-empty">Your cart is currently empty.</p>
      </div>
    `;
    const footer = setupFooter();
    app.appendChild(header);
    app.appendChild(cartPage);
    app.appendChild(footer);
  });
  
  page('*', () => {
    app.innerHTML = '';
    const header = setupHeader();
    const hero = setupHero();
    const products = setupProducts();
    const footer = setupFooter();
    
    app.appendChild(header);
    app.appendChild(hero);
    app.appendChild(products);
    app.appendChild(footer);
  });
  
  // Initialize routing
  page();
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);