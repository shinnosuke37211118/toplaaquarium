import page from 'page';
import { getTranslation } from '../../utils/languageStore.js';

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} was added to your cart.`);
}

export function setupOurItems() {
  const section = document.createElement('section');
  section.className = 'our-items-section';

  // Section data
  const sections = [
    {
      title: 'Marine Fish',
      emoji: '🐠',
      tag: 'marine-fish',
      items: [
        {
          name: 'Yellow Tang',
          label: 'Zebrasoma flavescens',
          price: 89.99,
          image: 'https://images.pexels.com/photos/8964015/pexels-photo-8964015.jpeg',
          tag: 'New'
        },
        {
          name: 'Clownfish Pair',
          label: 'Amphiprion ocellaris',
          price: 79.99,
          image: 'https://images.pexels.com/photos/1125979/pexels-photo-1125979.jpeg'
        },
        {
          name: 'Royal Gramma',
          label: 'Gramma loreto',
          price: 49.99,
          image: 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg'
        },
        {
          name: 'Mandarin Fish',
          label: 'Synchiropus splendidus',
          price: 129.99,
          image: 'https://images.pexels.com/photos/8964276/pexels-photo-8964276.jpeg'
        }
      ]
    },
    {
      title: 'Coral',
      emoji: '🪸',
      tag: 'coral',
      items: [
        {
          name: 'Green Star Polyps',
          label: 'Pachyclavularia violacea',
          price: 39.99,
          image: 'https://images.pexels.com/photos/3157890/pexels-photo-3157890.jpeg'
        },
        {
          name: 'Torch Coral',
          label: 'Euphyllia glabrescens',
          price: 149.99,
          originalPrice: 179.99,
          image: 'https://images.pexels.com/photos/3157884/pexels-photo-3157884.jpeg',
          tag: 'Sale'
        },
        {
          name: 'Bubble Coral',
          label: 'Plerogyra sinuosa',
          price: 89.99,
          image: 'https://images.pexels.com/photos/3157897/pexels-photo-3157897.jpeg'
        },
        {
          name: 'Zoanthids Colony',
          label: 'Zoanthus sp.',
          price: 59.99,
          image: 'https://images.pexels.com/photos/3157886/pexels-photo-3157886.jpeg'
        }
      ]
    },
    {
      title: 'Topla Rock',
      emoji: '🪨',
      tag: 'rock',
      isComingSoon: true,
      items: [
        {
          name: 'Coming Soon',
          label: 'Premium Reef Structures',
          description: 'A revolutionary approach to reef aquascaping. Engineered for perfect water flow and coral growth.'
        }
      ]
    },
    {
      title: 'Topla 30 Cube Nano Set',
      emoji: '🐚',
      tag: 'nano-set',
      isComingSoon: true,
      items: [
        {
          name: 'Coming Soon',
          label: 'Professional Nano System',
          description: 'The perfect fusion of design and functionality. A complete ecosystem in a compact form.'
        }
      ]
    }
  ];

  // Create product sections
  sections.forEach(sectionData => {
    const productSection = createProductSection(sectionData);
    section.appendChild(productSection);
  });

  return section;
}

function createProductSection({ title, emoji, items, tag, isComingSoon = false }) {
  const section = document.createElement('div');
  section.className = `product-category-section${isComingSoon ? ' coming-soon' : ''}`;
  
  const header = document.createElement('div');
  header.className = 'category-header';
  header.innerHTML = `
    <h2 class="section-title">${title} ${emoji}</h2>
    ${isComingSoon ? `<p class="coming-soon-message">${items[0].description}</p>` : ''}
  `;
  
  const carousel = document.createElement('div');
  carousel.className = 'product-carousel';
  
  const grid = document.createElement('div');
  grid.className = 'product-grid';
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';

    if (!isComingSoon) {
      card.innerHTML = `
        <div class="product-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          ${item.tag ? `<span class="product-tag ${item.tag.toLowerCase()}">${item.tag}</span>` : ''}
        </div>
        <div class="product-info">
          <h3>${item.name}</h3>
          <p class="species-name">${item.label}</p>
          <div class="product-price">
            ${item.originalPrice ? `<span class="original-price">$${item.originalPrice}</span>` : ''}
            <span class="current-price">$${item.price}</span>
          </div>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      `;

      const button = card.querySelector('.add-to-cart-btn');
      button.addEventListener('click', () => {
        addToCart(item);
      });
    } else {
      card.innerHTML = `
        <div class="product-info">
          <h3>${item.name}</h3>
          <p class="species-name">${item.label}</p>
        </div>
      `;
    }

    grid.appendChild(card);
  });
  
  carousel.appendChild(grid);
  section.appendChild(header);
  section.appendChild(carousel);
  
  if (!isComingSoon) {
    const viewAllButton = document.createElement('a');
    viewAllButton.href = `/products?tag=${encodeURIComponent(tag)}`;
    viewAllButton.className = 'view-all-button';
    viewAllButton.textContent = getTranslation('product.view_all');
    viewAllButton.addEventListener('click', (e) => {
      e.preventDefault();
      page(`/products?tag=${encodeURIComponent(tag)}`);
    });
    section.appendChild(viewAllButton);
  }
  
  return section;
}