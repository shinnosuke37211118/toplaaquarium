export function setupHero() {
  const heroSection = document.createElement('section')
  heroSection.className = 'hero-section'

  const heroContent = document.createElement('div')
  heroContent.className = 'hero-content'

  const heroOverlay = document.createElement('div')
  heroOverlay.className = 'hero-overlay'
  heroOverlay.innerHTML = `
    <div class="hero-text">
      <h1>Topla Aquarium</h1>
      <p>Based in Nonthaburi, Thailand</p>
      <p>Inspiring care for the ocean ecosystem</p>
    </div>
  `
  heroContent.appendChild(heroOverlay)

  // スライド画像
  const images = [
    'https://i.ibb.co/TxnxqPDV/MG-1666.jpg',
    'https://i.ibb.co/pBgRpNst/MG-1618.jpg',
    'https://i.ibb.co/vCbFY3jV/IMG-1542.jpg',
    'https://images.pexels.com/photos/1125979/pexels-photo-1125979.jpeg'
  ]

  let currentIndex = 0
  const bgDiv = document.createElement('div')
  bgDiv.className = 'hero-bg'
  bgDiv.style.backgroundImage = `url('${images[currentIndex]}')`
  heroContent.appendChild(bgDiv)
  heroContent.appendChild(heroOverlay)

  // ナビゲーション UI
  const nav = document.createElement('div')
  nav.className = 'hero-nav'

  const prevBtn = document.createElement('button')
  prevBtn.className = 'hero-arrow left'
  prevBtn.textContent = '←'

  const nextBtn = document.createElement('button')
  nextBtn.className = 'hero-arrow right'
  nextBtn.textContent = '→'

  const dots = document.createElement('div')
  dots.className = 'hero-dots'

  images.forEach((_, i) => {
    const dot = document.createElement('span')
    dot.className = 'dot'
    if (i === 0) dot.classList.add('active')
    dot.addEventListener('click', () => {
      currentIndex = i
      updateSlide()
      resetInterval()
    })
    dots.appendChild(dot)
  })

  nav.appendChild(prevBtn)
  nav.appendChild(dots)
  nav.appendChild(nextBtn)
  heroContent.appendChild(nav)

  // スライド更新
  function updateSlide() {
    bgDiv.classList.remove('zooming')
    bgDiv.style.opacity = 0

    setTimeout(() => {
      bgDiv.style.backgroundImage = `url('${images[currentIndex]}')`
      bgDiv.style.opacity = 1
      bgDiv.classList.add('zooming')
    }, 300)

    dots.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex)
    })
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length
    updateSlide()
    resetInterval()
  })

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length
    updateSlide()
    resetInterval()
  })

  let interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length
    updateSlide()
  }, 5000)

  function resetInterval() {
    clearInterval(interval)
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length
      updateSlide()
    }, 5000)
  }

  heroSection.appendChild(heroContent)
  return heroSection
}
