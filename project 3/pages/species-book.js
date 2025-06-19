import { species, oceans } from '../data/species.js';
import { setupSpeciesMap } from '../components/species-map/index.js';

export function setupSpeciesBook() {
  const page = document.createElement('div');
  page.className = 'species-book-page';

  // Create hero section with world map
  const hero = document.createElement('div');
  hero.className = 'species-hero';
  hero.innerHTML = `
    <div class="container">
      <h1>Species Book 📚</h1>
      <p>Discover marine life from around the world</p>
    </div>
  `;

  // Add interactive map
  const mapSection = document.createElement('section');
  mapSection.className = 'species-map-section';
  mapSection.appendChild(setupSpeciesMap());

  // Create content section
  const content = document.createElement('main');
  content.className = 'species-content container';

  // Create category switcher
  const categorySwitcher = document.createElement('div');
  categorySwitcher.className = 'category-switcher';
  categorySwitcher.innerHTML = `
    <button class="category-btn active" data-category="fish">🐠 Fish</button>
    <button class="category-btn" data-category="coral">🪸 Coral</button>
    <button class="category-btn" data-category="seaweed">🌿 Seaweed</button>
  `;

  // Create species grid
  const speciesGrid = document.createElement('div');
  speciesGrid.className = 'species-grid';

  // Function to update species grid
  function updateSpeciesGrid(category) {
    speciesGrid.innerHTML = species[category]
      .map(item => `
        <div class="species-card" data-habitat="${item.habitat}">
          <div class="species-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="species-info">
            <h3>${item.name}</h3>
            <p class="scientific-name">${item.scientificName}</p>
            <p class="description">${item.description}</p>
            <div class="habitat-tag" style="background: ${oceans[item.habitat].color}">
              ${oceans[item.habitat].name}
            </div>
            <a href="/species/${category}/${item.id}" class="view-species-btn">View Details</a>
          </div>
        </div>
      `)
      .join('');
  }

  // Initialize with fish category
  updateSpeciesGrid('fish');

  // Add event listeners to category buttons
  categorySwitcher.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      categorySwitcher.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update grid
      updateSpeciesGrid(btn.dataset.category);
    });
  });

  // Assemble page
  content.appendChild(categorySwitcher);
  content.appendChild(speciesGrid);
  page.appendChild(hero);
  page.appendChild(mapSection);
  page.appendChild(content);

  return page;
}

