// Mobilní menu
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Zavření menu při kliknutí na odkaz
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }
  
  // Plynulé scrollování pro všechny odkazy
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Offset pro fixed navigaci
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Změna pozadí navigace při scrollování
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.15)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
      }
    });
  }
  
  // Animace při scrollování (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Pozorování sekcí pro animace
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Lazy loading pro obrázky
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.onload = function() {
          img.style.opacity = '1';
        };
        
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
});

// Funkce pro kontaktní formulář (pro budoucí rozšíření)
function scrollToContact() {
  const contactSection = document.getElementById('kontakt');
  if (contactSection) {
    const offsetTop = contactSection.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Funkce pro zobrazení většího obrázku v galerii (pro budoucí rozšíření)
function openGalleryImage(src, alt) {
  // Zde by mohla být implementace lightboxu
  console.log('Otevírám obrázek:', src, alt);
}

// Optimalizace výkonu - debounce pro scroll události
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplikace debounce na scroll události
const debouncedScrollHandler = debounce(function() {
  // Zde by mohly být další scroll-based animace
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);