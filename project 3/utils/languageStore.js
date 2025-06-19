import i18next from 'i18next';

// Language state management
let currentLanguage = 'en';
const listeners = new Set();

// Language translations
const translations = {
  en: {
    menu: {
      home: "Home",
      care: "Care Guide",
      species: "Species Info",
      new: "New Items",
      contact: "Contact Us"
    },
    filters: {
      tags: "Tags",
      availability: "Availability",
      in_stock: "In stock",
      out_of_stock: "Out of stock",
      sort_by: "Sort by",
      items: "{{count}} items"
    },
    sort_options: {
      featured: "Featured",
      bestseller: "Best Sellers",
      az: "Alphabetical (A-Z)",
      za: "Alphabetical (Z-A)",
      low_high: "Price (Low to High)",
      high_low: "Price (High to Low)",
      newest: "Date (Newest)",
      oldest: "Date (Oldest)"
    },
    product: {
      new: "NEW",
      sale: "SALE",
      view_all: "View All",
      coming_soon: "Coming Soon"
    },
    hero: {
      title: "Topla Aquarium",
      subtitle: "Based in Nonthaburi, Thailand",
      tagline: "Inspiring care for the ocean ecosystem"
    }
  },
  th: {
    menu: {
      home: "หน้าหลัก",
      care: "คู่มือการดูแล",
      species: "สารานุกรม",
      new: "สินค้าใหม่",
      contact: "ติดต่อเรา"
    },
    filters: {
      tags: "แท็ก",
      availability: "สถานะสินค้า",
      in_stock: "มีสินค้า",
      out_of_stock: "สินค้าหมด",
      sort_by: "เรียงตาม",
      items: "{{count}} รายการ"
    },
    sort_options: {
      featured: "แนะนำ",
      bestseller: "ขายดี",
      az: "เรียง A ถึง Z",
      za: "เรียง Z ถึง A",
      low_high: "ราคาต่ำไปสูง",
      high_low: "ราคาสูงไปต่ำ",
      newest: "ใหม่ล่าสุด",
      oldest: "เก่าที่สุด"
    },
    product: {
      new: "ใหม่",
      sale: "ลดราคา",
      view_all: "ดูทั้งหมด",
      coming_soon: "เร็วๆ นี้"
    },
    hero: {
      title: "ท็อปล่า อะควาเรียม",
      subtitle: "ตั้งอยู่ที่นนทบุรี ประเทศไทย",
      tagline: "สร้างแรงบันดาลใจในการดูแลระบบนิเวศทางทะเล"
    }
  }
};


// Initialize i18next
i18next.init({
  lng: 'en',
  resources: {
    en: { translation: translations.en },
    th: { translation: translations.th }
  },
  interpolation: {
    escapeValue: false
  }
});

// Get translation for a specific key
export function getTranslation(key, options = {}) {
  return i18next.t(key, options);
}

// Switch language
export function switchLanguage(lang) {
  if (lang === currentLanguage) return;
  
  currentLanguage = lang;
  i18next.changeLanguage(lang);
  localStorage.setItem('language', lang);
  notifyListeners();
}

// Initialize language from localStorage
export function initLanguage() {
  const savedLang = localStorage.getItem('language');
  if (savedLang && (savedLang === 'en' || savedLang === 'th')) {
    currentLanguage = savedLang;
    i18next.changeLanguage(savedLang);
  }
}

// Subscribe to language changes
export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// Notify all listeners of language change
function notifyListeners() {
  listeners.forEach(listener => listener(currentLanguage));
}

// Get current language
export function getCurrentLanguage() {
  return currentLanguage;
}

// Get language name
export function getLanguageName(code) {
  const names = {
    en: 'English',
    th: 'ภาษาไทย'
  };
  return names[code] || code;
}