import page from 'page';

export function setupProductsPage(ctx) {
  const productsPage = document.createElement('div');
  productsPage.className = 'products-page';

  // Create layout structure
  const pageLayout = document.createElement('div');
  pageLayout.className = 'page-layout';

  // Create sidebar filters
  const sidebar = document.createElement('aside');
  sidebar.className = 'filters-sidebar';
  
  const filtersHeader = document.createElement('div');
  filtersHeader.className = 'filters-header';
  filtersHeader.innerHTML = '<h2>Filters</h2>';

  const tagFilters = createFilterSection('Tags', [
    { id: 'marine-fish', label: 'Marine Fish 🐠', count: 12 },
    { id: 'coral', label: 'Coral 🪸', count: 24 },
    { id: 'rock', label: 'Topla Rock 🪨', count: 8 },
    { id: 'nano-set', label: 'Topla 30 Cube Nano Set 🐚', count: 4 }
  ]);

  const availabilityFilters = createFilterSection('Availability', [
    { id: 'in-stock', label: 'In stock', count: 42 },
    { id: 'out-of-stock', label: 'Out of stock', count: 25 }
  ]);

  sidebar.appendChild(filtersHeader);
  sidebar.appendChild(tagFilters);
  sidebar.appendChild(availabilityFilters);

  // Create main content area
  const mainContent = document.createElement('main');
  mainContent.className = 'products-main';

  const topBar = document.createElement('div');
  topBar.className = 'products-topbar';

  const sortDropdown = document.createElement('select');
  sortDropdown.className = 'sort-dropdown';
  
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'best-selling', label: 'Best sellers' },
    { value: 'alpha-asc', label: 'Alphabetical A-Z' },
    { value: 'alpha-desc', label: 'Alphabetical Z-A' },
    { value: 'price-asc', label: 'Price (low to high)' },
    { value: 'price-desc', label: 'Price (high to low)' },
    { value: 'date-desc', label: 'Date (newest first)' },
    { value: 'date-asc', label: 'Date (oldest first)' }
  ];

  sortOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    sortDropdown.appendChild(optionElement);
  });

  const productCount = document.createElement('span');
  productCount.className = 'product-count';
  productCount.textContent = '67 items';

  topBar.appendChild(sortDropdown);
  topBar.appendChild(productCount);

  const productsGrid = document.createElement('div');
  productsGrid.className = 'products-grid';

  // Sample products data
  const products = [
    {
      name: 'Yellow Tang',
      species: 'Zebrasoma flavescens',
      price: 89.99,
      image: 'https://images.pexels.com/photos/8964015/pexels-photo-8964015.jpeg',
      tag: 'New',
      category: 'marine-fish'
    },
    {
      name: 'Torch Coral',
      species: 'Euphyllia glabrescens',
      price: 149.99,
      originalPrice: 179.99,
      image: 'https://images.pexels.com/photos/3157884/pexels-photo-3157884.jpeg',
      tag: 'Sale',
      category: 'coral'
    },
    {
      name: 'Green Star Polyps',
      species: 'Pachyclavularia violacea',
      price: 49.99,
      image: 'https://images.pexels.com/photos/3157890/pexels-photo-3157890.jpeg',
      category: 'coral'
    },
    {
      name: 'Clownfish Pair',
      species: 'Amphiprion ocellaris',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1125979/pexels-photo-1125979.jpeg',
      tag: 'New',
      category: 'marine-fish'
    }
  ];

  // Filter products based on tag if provided
  const selectedTag = ctx?.query?.tag;
  const filteredProducts = selectedTag
    ? products.filter(product => product.category === selectedTag)
    : products;

  // Update product count
  productCount.textContent = `${filteredProducts.length} items`;

  // Create product cards
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });

  mainContent.appendChild(topBar);
  mainContent.appendChild(productsGrid);

  // Assemble the page
  pageLayout.appendChild(sidebar);
  pageLayout.appendChild(mainContent);
  productsPage.appendChild(pageLayout);

  // Pre-select filter based on route
  if (selectedTag) {
    const checkbox = sidebar.querySelector(`#${selectedTag}`);
    if (checkbox) {
      checkbox.checked = true;
      const optionContainer = checkbox.closest('.filter-option');
      if (optionContainer) {
        optionContainer.classList.add('active');
      }
    }
  }

  // Scroll to top
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, 0);

  return productsPage;
}

function createFilterSection(title, options) {
  const section = document.createElement('div');
  section.className = 'filter-section';
  
  const sectionTitle = document.createElement('h3');
  sectionTitle.textContent = title;
  
  const optionsList = document.createElement('div');
  optionsList.className = 'filter-options';
  
  options.forEach(option => {
    const label = document.createElement('label');
    label.className = 'filter-option';
    label.setAttribute('for', option.id);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = option.id;
    checkbox.className = 'filter-checkbox';
    
    checkbox.addEventListener('change', (e) => {
      console.log(`Checkbox ${option.id} changed. Checked: ${e.target.checked}`);
      
      if (e.target.checked) {
        page(`/products?tag=${option.id}`);
      } else {
        page('/products');
      }
    });
    
    const checkboxWrapper = document.createElement('span');
    checkboxWrapper.className = 'checkbox-wrapper';
    checkboxWrapper.appendChild(checkbox);
    
    const text = document.createElement('span');
    text.className = 'filter-text';
    text.textContent = `${option.label} (${option.count})`;
    
    label.appendChild(checkboxWrapper);
    label.appendChild(text);
    optionsList.appendChild(label);
  });
  
  section.appendChild(sectionTitle);
  section.appendChild(optionsList);
  
  return section;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      ${product.tag ? `<span class="product-tag ${product.tag.toLowerCase()}">${product.tag}</span>` : ''}
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p class="species-name">${product.species}</p>
      <div class="product-price">
        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
        <span class="current-price">$${product.price}</span>
      </div>
      <button class="add-to-cart-btn">Add to Cart</button>
    </div>
  `;

  const addToCartBtn = card.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} was added to your cart.`);
  });
  
  return card;
}