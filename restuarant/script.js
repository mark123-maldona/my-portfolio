// Enhanced Restaurant Website JavaScript

// Dynamic greeting based on time with enhanced animation
function initializeGreeting() {
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero p');
  
  if (heroTitle) {
    const date = new Date();
    const hours = date.getHours();
    
    let greeting = "Welcome to ToTu International Services";
    let subtitle = "Experience authentic flavors and exceptional dining";
    
    if (hours < 12) {
      greeting = "Good Morning! Welcome to ToTu";
      subtitle = "Start your day with our delicious breakfast menu";
    } else if (hours < 17) {
      greeting = "Good Afternoon! Welcome to ToTu";
      subtitle = "Enjoy our lunch specials and fresh cuisine";
    } else {
      greeting = "Good Evening! Welcome to ToTu";
      subtitle = "Discover our dinner menu and evening ambiance";
    }
    
    // Typewriter effect for greeting
    heroTitle.style.opacity = '0';
    setTimeout(() => {
      typeWriter(heroTitle, greeting, 100);
    }, 500);
    
    if (heroSubtitle) {
      heroSubtitle.style.opacity = '0';
      setTimeout(() => {
        fadeInText(heroSubtitle, subtitle);
      }, 2000);
    }
  }
}

// Typewriter effect function
function typeWriter(element, text, speed = 100) {
  element.innerHTML = '';
  element.style.opacity = '1';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Fade in text function
function fadeInText(element, text) {
  element.innerHTML = text;
  element.style.transition = 'opacity 1.5s ease-in-out';
  element.style.opacity = '1';
}

// Enhanced back to top button
function initializeBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.style.display = "block";
      btn.style.opacity = "1";
    } else {
      btn.style.opacity = "0";
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          btn.style.display = "none";
        }
      }, 300);
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Enhanced auto-slide logic for all sliders
function initializeSliders() {
  document.querySelectorAll('.slider-container').forEach(container => {
    const track = container.querySelector('.slider-track');
    const items = track.querySelectorAll('.item');
    let index = 0;
    let autoScroll;
    
    if (items.length === 0) return;
    
    // Show only one item at a time using transform
    function slideTo(newIndex) {
      index = newIndex;
      track.style.transform = `translateX(-${index * 100}%)`;
      track.style.transition = 'transform 0.5s ease-in-out';
    }
    
    // Start auto-slide
    function startAutoSlide() {
      autoScroll = setInterval(() => {
        index = (index + 1) % items.length;
        slideTo(index);
      }, 4000);
    }
    
    // Stop auto-slide
    function stopAutoSlide() {
      clearInterval(autoScroll);
    }
    
    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    items.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'slider-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        slideTo(i);
        updateDots(i);
      });
      dotsContainer.appendChild(dot);
    });
    container.appendChild(dotsContainer);
    
    // Update dots
    function updateDots(activeIndex) {
      const dots = container.querySelectorAll('.slider-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }
    
    // Event listeners
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    slideTo(0);
    startAutoSlide();
  });
}

// Menu item interactions
function initializeMenuInteractions() {
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => {
    // Add click animation
    item.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
    
    // Add favorite functionality
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = '♡';
    favoriteBtn.title = 'Add to favorites';
    
    favoriteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('favorited');
      this.innerHTML = this.classList.contains('favorited') ? '❤️' : '♡';
      this.title = this.classList.contains('favorited') ? 'Remove from favorites' : 'Add to favorites';
    });
    
    item.appendChild(favoriteBtn);
  });
}

// Smooth scroll for navigation links
function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Loading animations
function initializeLoadingAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe menu sections
  const menuSections = document.querySelectorAll('.menu-section, .menu-item');
  menuSections.forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
  });
}

// Form enhancements
function initializeFormEnhancements() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearErrors);
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField.call(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        showSuccessMessage(form);
      }
    });
  });
}

function validateField() {
  const value = this.value.trim();
  const type = this.type;
  let isValid = true;
  
  // Remove existing error
  this.classList.remove('error');
  const existingError = this.parentNode.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Validate based on type
  if (this.required && !value) {
    showFieldError(this, 'This field is required');
    isValid = false;
  } else if (type === 'email' && value && !isValidEmail(value)) {
    showFieldError(this, 'Please enter a valid email address');
    isValid = false;
  } else if (type === 'tel' && value && !isValidPhone(value)) {
    showFieldError(this, 'Please enter a valid phone number');
    isValid = false;
  }
  
  return isValid;
}

function clearErrors() {
  this.classList.remove('error');
  const errorMessage = this.parentNode.querySelector('.error-message');
  if (errorMessage) errorMessage.remove();
}

function showFieldError(field, message) {
  field.classList.add('error');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = 'Thank you! Your message has been sent successfully.';
  
  form.insertBefore(successDiv, form.firstChild);
  
  // Reset form
  form.reset();
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
}

// Mobile menu toggle
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('mobile-open');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }
}

// Price toggle functionality
function initializePriceToggle() {
  const priceToggleBtn = document.createElement('button');
  priceToggleBtn.className = 'price-toggle-btn';
  priceToggleBtn.textContent = 'Hide Prices';
  priceToggleBtn.title = 'Toggle price visibility';
  
  const menuContainer = document.querySelector('.menu-container');
  if (menuContainer) {
    menuContainer.insertBefore(priceToggleBtn, menuContainer.firstChild);
    
    priceToggleBtn.addEventListener('click', () => {
      const prices = document.querySelectorAll('.price');
      const isHidden = priceToggleBtn.textContent === 'Show Prices';
      
      prices.forEach(price => {
        price.style.display = isHidden ? 'block' : 'none';
      });
      
      priceToggleBtn.textContent = isHidden ? 'Hide Prices' : 'Show Prices';
    });
  }
}

// Initialize specific page enhancements
function initializePageSpecific() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  switch(currentPage) {
    case 'index.html':
    case '':
      initializeHomePage();
      break;
    case 'about.html':
      initializeAboutPage();
      break;
    case 'contact.html':
      initializeContactPage();
      break;
    case 'menu.html':
      initializeMenuPage();
      break;
  }
}

// Home page specific functionality
function initializeHomePage() {
  // Enhanced hero section parallax effect
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    });
  }
  
  // Animate CTA button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
      this.style.animation = 'pulse 1s infinite';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
      this.style.animation = 'none';
    });
  }
  
  // Add floating elements animation
  createFloatingElements();
}

// About page specific functionality
function initializeAboutPage() {
  // Animate story cards on scroll
  const storyCards = document.querySelectorAll('.story-card');
  const featureItems = document.querySelectorAll('.feature-item');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = 'slideInUp 0.8s ease-out';
          entry.target.style.opacity = '1';
        }, index * 200);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  [...storyCards, ...featureItems].forEach(card => {
    card.style.opacity = '0';
    cardObserver.observe(card);
  });
  
  // Add counter animation for statistics
  initializeCounters();
  
  // Interactive mission/vision cards
  const missionVision = document.querySelectorAll('.mission, .vision');
  missionVision.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02) translateY(-5px)';
      this.style.boxShadow = '0 20px 40px rgba(245,158,11,0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

// Contact page specific functionality
function initializeContactPage() {
  // Enhanced form interactions
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  formInputs.forEach(input => {
    // Add floating label effect
    const label = input.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
      input.addEventListener('focus', () => {
        label.style.transform = 'translateY(-25px) scale(0.8)';
        label.style.color = '#f59e0b';
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.style.transform = 'translateY(0) scale(1)';
          label.style.color = '#d1d5db';
        }
      });
    }
    
    // Add character counter for textarea
    if (input.tagName === 'TEXTAREA') {
      const maxLength = input.getAttribute('maxlength') || 500;
      const counter = document.createElement('div');
      counter.className = 'char-counter';
      counter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #9ca3af; margin-top: 0.5rem;';
      
      input.addEventListener('input', () => {
        const remaining = maxLength - input.value.length;
        counter.textContent = `${remaining} characters remaining`;
        counter.style.color = remaining < 50 ? '#ef4444' : '#9ca3af';
      });
      
      input.parentNode.appendChild(counter);
      input.dispatchEvent(new Event('input')); // Initialize counter
    }
  });
  
  // Animate contact info cards
  const contactCards = document.querySelectorAll('.contact-info, .info-card');
  contactCards.forEach((card, index) => {
    card.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
  });
  
  // Add interactive map placeholder
  const mapPlaceholder = document.querySelector('.map-placeholder');
  if (mapPlaceholder) {
    mapPlaceholder.addEventListener('click', () => {
      // Simulate loading a real map
      mapPlaceholder.innerHTML = '<p>Loading interactive map...</p>';
      setTimeout(() => {
        mapPlaceholder.innerHTML = '<p>🗺️ Interactive Map Would Load Here</p><p>Click to open in Google Maps</p>';
      }, 1500);
    });
  }
}

// Menu page specific functionality
function initializeMenuPage() {
  // Enhanced menu item hover effects
  const menuItems = document.querySelectorAll('.item');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Counter animation for statistics
function initializeCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.counter);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          entry.target.textContent = Math.floor(current);
          
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
          }
        }, 20);
        
        counterObserver.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Create floating background elements
function createFloatingElements() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  for (let i = 0; i < 5; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.cssText = `
      position: absolute;
      width: ${Math.random() * 100 + 50}px;
      height: ${Math.random() * 100 + 50}px;
      background: rgba(245,158,11,0.1);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 10 + 10}s infinite linear;
      pointer-events: none;
    `;
    hero.appendChild(element);
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeGreeting();
  initializeBackToTop();
  initializeSliders();
  initializeMenuInteractions();
  initializeSmoothScroll();
  initializeLoadingAnimations();
  initializeFormEnhancements();
  initializeMobileMenu();
  initializePriceToggle();
  initializePageSpecific();
  
  // Add a subtle entrance animation to the page
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
});
