import page from 'page';
import { getTranslation } from '../utils/languageStore.js';
import { setupSpeciesInfo } from './species-info/index.js';
import { setupCareGuide } from './care-guide/section.js';
import { setupOurItems } from './our-items/index.js';

export function setupProducts() {
  const productsSection = document.createElement('section');
  productsSection.className = 'products-section';

  // Create section header
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';
  sectionHeader.innerHTML = `
    <h2 class="section-title">${getTranslation('product.new')}</h2>
  `;

  // Create product sections
  const ourItems = setupOurItems();
  const careGuide = setupCareGuide();
  const speciesInfo = setupSpeciesInfo();

  // Append all sections in the correct order
  productsSection.appendChild(sectionHeader);
  productsSection.appendChild(ourItems);
  productsSection.appendChild(careGuide);
  productsSection.appendChild(speciesInfo);

  return productsSection;
}