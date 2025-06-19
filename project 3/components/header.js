import { getCurrentLanguage, getTranslation, switchLanguage, subscribe, getLanguageName } from '../utils/languageStore.js';
import page from 'page';

export function setupHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  
  const nav = document.createElement('nav');
  nav.className = 'main-nav';
  
  // Create logo
  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.innerHTML = `
    <h1><a href="/" class="nav-logo-link">Topla Aquarium</a></h1>
  `;
  
  // Add click handler for logo to always return to top of homepage
  const logoLink = logo.querySelector('.nav-logo-link');
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Navigate to home page
    page('/');
    // Scroll to top immediately
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  });
  
  // Create menu
  const menu = document.createElement('ul');
  menu.className = 'nav-menu';
  
  const menuItems = [
    { key: 'menu.home', href: '/' },
    { key: 'menu.care', href: '/care-guide' },
    { key: 'menu.species', href: '#species-info' },
    { key: 'menu.new', href: '/products' },
    { key: 'menu.contact', href: '#contact-form' }
  ];
  
  function updateMenuItems() {
    menu.innerHTML = '';
    menuItems.forEach(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.href;
      link.className = 'nav-link';
      link.textContent = getTranslation(item.key);
      
      // Handle navigation
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Special handling for Home button
        if (item.href === '/') {
          page('/');
          // Always scroll to top for home page
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }, 0);
        } else if (item.href === '#species-info') {
          const isOnHomePage = window.location.pathname === '/';
          if (!isOnHomePage) {
            // Navigate to home page first
            page('/');
            // Wait for page load and DOM update
            setTimeout(() => {
              const speciesSection = document.getElementById('species-info');
              if (speciesSection) {
                speciesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          } else {
            // Already on home page, just scroll
            const speciesSection = document.getElementById('species-info');
            if (speciesSection) {
              speciesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        } else if (item.href === '/products') {
          page('/products');
        } else if (item.href.startsWith('#')) {
          // Handle other anchor links
          const targetId = item.href.substring(1);
          const isOnHomePage = window.location.pathname === '/';
          
          if (!isOnHomePage) {
            page('/');
            setTimeout(() => {
              const target = document.getElementById(targetId);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          } else {
            const target = document.getElementById(targetId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        } else {
          // Regular page navigation
          page(item.href);
        }
      });
      
      li.appendChild(link);
      menu.appendChild(li);
    });
  }

  // Create right side elements container
  const rightElements = document.createElement('div');
  rightElements.className = 'nav-right';
  
  // Create language switcher
  const langSwitcher = document.createElement('div');
  langSwitcher.className = 'lang-switcher';
  
  function updateLangSwitcher() {
    const currentLang = getCurrentLanguage();
    langSwitcher.innerHTML = `
      <button class="lang-dropdown-btn">
        <span>${getLanguageName(currentLang)}</span>
        <svg class="dropdown-icon" width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="lang-dropdown">
        <button class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
          English
        </button>
        <button class="lang-option ${currentLang === 'th' ? 'active' : ''}" data-lang="th">
          ภาษาไทย
        </button>
      </div>
    `;
    
    const dropdownBtn = langSwitcher.querySelector('.lang-dropdown-btn');
    const dropdown = langSwitcher.querySelector('.lang-dropdown');
    
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
    
    const options = langSwitcher.querySelectorAll('.lang-option');
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        switchLanguage(option.dataset.lang);
        dropdown.classList.remove('show');
      });
    });
  }

  // Create search icon
  const searchIcon = document.createElement('button');
  searchIcon.className = 'nav-icon search-icon';
  searchIcon.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19 19L14.7 14.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Create search bar
  const searchBar = document.createElement('div');
  searchBar.className = 'search-bar-container';
  searchBar.style.display = 'none';
  searchBar.innerHTML = `
    <input type="text" placeholder="Search..." class="search-input">
    <button class="search-submit">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 19L14.7 14.7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;
  document.body.appendChild(searchBar);

  searchIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    searchBar.style.display = searchBar.style.display === 'none' ? 'flex' : 'none';
    const rect = searchIcon.getBoundingClientRect();
    searchBar.style.position = 'absolute';
    searchBar.style.top = `${rect.bottom + 10}px`;
    searchBar.style.right = '2rem';
  });

  document.addEventListener('click', () => {
    searchBar.style.display = 'none';
  });

  searchBar.addEventListener('click', (e) => e.stopPropagation());

  // Create shopping bag icon
  const bagIcon = document.createElement('button');
  bagIcon.className = 'nav-icon bag-icon';
  bagIcon.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 1L2 5V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V5L15 1H5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 5H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  bagIcon.addEventListener('click', () => {
    page('/cart');
  });

  // Create mobile menu
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger-menu';
  hamburger.innerHTML = `
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  `;

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    rightElements.classList.toggle('show');
  });

  // Add all elements to the navigation
  rightElements.appendChild(langSwitcher);
  rightElements.appendChild(searchIcon);
  rightElements.appendChild(bagIcon);

  nav.appendChild(logo);
  nav.appendChild(menu);
  nav.appendChild(rightElements);
  nav.appendChild(hamburger);
  header.appendChild(nav);

  // Initialize menu and language switcher
  updateMenuItems();
  updateLangSwitcher();

  // Subscribe to language changes
  subscribe(() => {
    updateMenuItems();
    updateLangSwitcher();
  });

  return header;
}