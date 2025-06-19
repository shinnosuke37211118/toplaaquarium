import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export function setupSlider() {
  const sliderSection = document.createElement('section')
  sliderSection.className = 'slider-section'
  
  const sliderContainer = document.createElement('div')
  sliderContainer.className = 'swiper'
  
  const swiperWrapper = document.createElement('div')
  swiperWrapper.className = 'swiper-wrapper'
  
  // Slider images
  const images = [
    'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png',
    'https://images.pexels.com/photos/1125979/pexels-photo-1125979.jpeg',
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
  ]
  
  images.forEach(image => {
    const slide = document.createElement('div')
    slide.className = 'swiper-slide'
    slide.innerHTML = `<img src="${image}" alt="Aquarium scene">`
    swiperWrapper.appendChild(slide)
  })
  
  // Add navigation elements
  const prevButton = document.createElement('div')
  prevButton.className = 'swiper-button-prev'
  
  const nextButton = document.createElement('div')
  nextButton.className = 'swiper-button-next'
  
  const pagination = document.createElement('div')
  pagination.className = 'swiper-pagination'
  
  // Assemble slider
  sliderContainer.appendChild(swiperWrapper)
  sliderContainer.appendChild(prevButton)
  sliderContainer.appendChild(nextButton)
  sliderContainer.appendChild(pagination)
  sliderSection.appendChild(sliderContainer)
  
  // Initialize Swiper
  setTimeout(() => {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
  }, 0)
  
  return sliderSection
}