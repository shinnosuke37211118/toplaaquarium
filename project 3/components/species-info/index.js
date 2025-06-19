import { species } from '../../data/species.js';
import page from 'page';

export function setupSpeciesInfo() {
  const section = document.createElement('div');
  section.className = 'care-guide-section';
  section.id = 'species-info'; // Add ID for scroll targeting

  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `
    <h2 class="section-title">Species Info 📚</h2>
    <p class="section-subtitle">Comprehensive guides about marine life species.</p>
  `;

  const grid = document.createElement('div');
  grid.className = 'care-guide-grid';

  // Show first 3 species from each category
  const previewSpecies = [
    species.fish[0],
    species.coral[0],
    species.seaweed[0]
  ];

  previewSpecies.forEach(item => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="article-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="article-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a href="/species-book" class="view-species-btn">View Species →</a>
      </div>
    `;
    grid.appendChild(card);
  });

  const viewAllButton = document.createElement('a');
  viewAllButton.href = '/species-book';
  viewAllButton.className = 'view-all-button';
  viewAllButton.textContent = 'View All Species';
  viewAllButton.addEventListener('click', (e) => {
    e.preventDefault();
    page('/species-book');
  });

  section.appendChild(header);
  section.appendChild(grid);
  section.appendChild(viewAllButton);

  return section;
}