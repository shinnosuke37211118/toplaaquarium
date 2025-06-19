export function setupCategories() {
  const categoriesSection = document.createElement('section')
  categoriesSection.className = 'categories-section'
  
  // Create section header
  const sectionHeader = document.createElement('div')
  sectionHeader.className = 'section-header'
  sectionHeader.innerHTML = `
    <h2 class="section-title">人気カテゴリー</h2>
    <p class="section-subtitle">Popular Categories</p>
  `
  
  // Create categories grid
  const categoriesGrid = document.createElement('div')
  categoriesGrid.className = 'categories-grid'
  
  // Category data
  const categories = [
    {
      name: '熱帯魚',
      englishName: 'Tropical Fish',
      image: 'https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name: 'サンゴ',
      englishName: 'Corals',
      image: 'https://images.pexels.com/photos/11721757/pexels-photo-11721757.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name: '水草',
      englishName: 'Aquatic Plants',
      image: 'https://images.pexels.com/photos/866032/pexels-photo-866032.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name: '機材',
      englishName: 'Equipment',
      image: 'https://images.pexels.com/photos/13290553/pexels-photo-13290553.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]
  
  // Create category cards
  categories.forEach(category => {
    const categoryCard = document.createElement('div')
    categoryCard.className = 'category-card'
    categoryCard.style.backgroundImage = `url(${category.image})`
    
    const cardContent = document.createElement('div')
    cardContent.className = 'card-content'
    cardContent.innerHTML = `
      <h3 class="card-title">${category.name}</h3>
      <p class="card-subtitle">${category.englishName}</p>
    `
    
    categoryCard.appendChild(cardContent)
    categoriesGrid.appendChild(categoryCard)
    
    // Add hover effect
    categoryCard.addEventListener('mouseenter', () => {
      cardContent.classList.add('hover')
    })
    
    categoryCard.addEventListener('mouseleave', () => {
      cardContent.classList.remove('hover')
    })
  })
  
  // Append elements to categories section
  categoriesSection.appendChild(sectionHeader)
  categoriesSection.appendChild(categoriesGrid)
  
  return categoriesSection
}