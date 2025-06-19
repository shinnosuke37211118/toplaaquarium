import { articles, categories } from '../data/articles.js';
import { marked } from 'marked';

export function setupCareGuidePage() {
  const page = document.createElement('div');
  page.className = 'care-guide-page';

  // ヘッダー
  const header = document.createElement('header');
  header.className = 'page-header';
  header.innerHTML = `
    <div class="container">
      <h1>Care Guide 📘</h1>
      <p>Comprehensive guides for your marine aquarium success</p>
    </div>
  `;

  // メインコンテンツラッパー
  const mainContent = document.createElement('main');
  mainContent.className = 'container care-guide-layout';

  // サイドバー
  const sidebar = document.createElement('aside');
  sidebar.className = 'care-guide-sidebar';

  const categoryList = document.createElement('div');
  categoryList.className = 'category-list';

  Object.entries(categories).forEach(([categoryId, category]) => {
    const button = document.createElement('button');
    button.className = 'category-button';
    button.dataset.category = categoryId;
    button.innerHTML = `
      <span class="category-emoji">${category.emoji}</span>
      <span class="category-name">${category.name}</span>
      <span class="category-count">${articles.filter(a => a.category === categoryId).length}</span>
    `;
    categoryList.appendChild(button);
  });

  sidebar.appendChild(categoryList);

  // 記事リスト表示エリア
  const articlesContainer = document.createElement('div');
  articlesContainer.className = 'articles-container';

  function renderArticles(categoryId = null) {
    const filteredArticles = categoryId
      ? articles.filter(article => article.category === categoryId)
      : articles;

    articlesContainer.innerHTML = `
      <div class="articles-grid">
        ${filteredArticles.map(article => `
          <article class="article-card">
            <div class="article-image">
              <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="article-content">
              <span class="article-category" style="background: var(--color-${article.category})">
                ${categories[article.category].emoji} ${categories[article.category].name}
              </span>
              <h3>${article.title}</h3>
              <p>${article.description}</p>
              <a href="/care-guide/${article.id}" class="read-more-link">Read More →</a>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  // ボタンクリック時のフィルタ切替
  categoryList.addEventListener('click', (e) => {
    const button = e.target.closest('.category-button');
    if (!button) return;

    categoryList.querySelectorAll('.category-button').forEach(btn => 
      btn.classList.remove('active')
    );
    button.classList.add('active');

    renderArticles(button.dataset.category);
  });

  renderArticles(); // 最初は全記事表示

  // 組み立て
  mainContent.appendChild(sidebar);
  mainContent.appendChild(articlesContainer);
  page.appendChild(header);
  page.appendChild(mainContent);

  return page;
}

export function setupArticlePage(ctx) {
  const articleId = ctx.params.id;
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    const errorPage = document.createElement('div');
    errorPage.className = 'container';
    errorPage.innerHTML = `
      <h1>Article Not Found</h1>
      <p>Sorry, the requested article could not be found.</p>
      <a href="/care-guide" class="back-link">← Back to Care Guide</a>
    `;
    return errorPage;
  }

  const page = document.createElement('div');
  page.className = 'article-page';

  const category = categories[article.category];

  page.innerHTML = `
    <header class="page-header">
      <div class="container">
        <a href="/care-guide" class="back-link">← Back to Care Guide</a>
        <span class="article-category" style="background: var(--color-${article.category})">
          ${category.emoji} ${category.name}
        </span>
        <h1>${article.title}</h1>
      </div>
    </header>
    <main class="container article-content">
      <div class="article-image-full">
        <img src="${article.image}" alt="${article.title}">
      </div>
      ${marked.parse(article.content)}
    </main>
  `;

  return page;
}