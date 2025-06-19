import { articles } from '../../data/articles.js';
import page from 'page';

export function setupCareGuide() {
  const section = document.createElement('div');
  section.className = 'care-guide-section';

  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `
    <h2 class="section-title">Care Guide 📘</h2>
    <p class="section-subtitle">Helpful tips and knowledge for your marine aquarium.</p>
  `;

  const grid = document.createElement('div');
  grid.className = 'care-guide-grid';

  // Show first 3 articles
  const featuredArticles = articles.slice(0, 3);

  featuredArticles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="article-image">
        <img src="${article.image}" alt="${article.title}" loading="lazy" />
      </div>
      <div class="article-content">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="/care-guide/${article.id}" class="read-more-link">Read More →</a>
      </div>
    `;
    grid.appendChild(card);
  });

  const viewAllButton = document.createElement('a');
  viewAllButton.href = '/care-guide';
  viewAllButton.className = 'view-all-button';
  viewAllButton.textContent = 'View All Articles';
  viewAllButton.addEventListener('click', (e) => {
    e.preventDefault();
    page('/care-guide');
  });

  section.appendChild(header);
  section.appendChild(grid);
  section.appendChild(viewAllButton);
  return section;
}