import page from 'page';
import { setupCareGuidePage, setupArticlePage } from './page.js';
import { setupNavigation } from '../components/navigation.js';
import { setupFooter } from '../components/footer.js';

export function setupCareGuideRoutes(app) {
  page('/care-guide', () => {
    app.innerHTML = '';
    const navigation = setupNavigation();
    const content = setupCareGuidePage();
    const footer = setupFooter();
    app.appendChild(navigation);
    app.appendChild(content);
    app.appendChild(footer);
  });

  page('/care-guide/:id', (ctx) => {
    app.innerHTML = '';
    const navigation = setupNavigation();
    const content = setupArticlePage(ctx);
    const footer = setupFooter();
    app.appendChild(navigation);
    app.appendChild(content);
    app.appendChild(footer);
  });
}