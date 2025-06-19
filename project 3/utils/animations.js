export function setupAnimations() {
  // Create intersection observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)
  
  // Observe all section headers, product cards, and category cards
  const animatedElements = document.querySelectorAll('.section-header, .product-card, .category-card, .hero-text, .hero-image')
  
  animatedElements.forEach(element => {
    // Add animation-ready class for initial state
    element.classList.add('animation-ready')
    // Observe element
    observer.observe(element)
  })
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link')
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      
      // Smooth scroll to section (placeholder functionality)
      const targetId = link.getAttribute('href')
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          })
        }
      }
      
      // Close mobile menu if open
      const menu = document.querySelector('.nav-menu')
      const hamburger = document.querySelector('.hamburger-menu')
      
      if (menu.classList.contains('active')) {
        menu.classList.remove('active')
        hamburger.classList.remove('active')
      }
    })
  })
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('button')
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      
      button.appendChild(ripple)
      
      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}