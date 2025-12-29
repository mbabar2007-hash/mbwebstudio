// ================= Splash Screen =================
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const logo = splash?.querySelector('img');
  const mainContent = document.getElementById('main-content');
  const navbar = document.getElementById('navbar');

  if (!splash) return;

  // Hide page scroll
  document.body.style.overflow = 'hidden';

  if (mainContent) mainContent.style.display = 'none';
  if (navbar) navbar.style.display = 'none';

  setTimeout(() => {
    if (logo) {
      logo.style.transform = 'scale(2)';
      logo.style.opacity = '0';
    }

    setTimeout(() => {
      splash.style.display = 'none';
      document.body.style.overflow = 'auto';

      if (mainContent) mainContent.style.display = 'block';
      if (navbar) navbar.style.display = 'flex';

      showCardsOnScroll();
    }, 1000);
  }, 1000);
});


// ================= Service Card Scroll Animation =================
const serviceCards = document.querySelectorAll('.service-card');

function showCardsOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;

  serviceCards.forEach((card, index) => {
    if (card.classList.contains('show')) return;

    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      setTimeout(() => {
        card.classList.add('show');
      }, index * 200); // stagger animation
    }
  });
}

// Add scroll and resize listeners
window.addEventListener('scroll', showCardsOnScroll, { passive: true });
window.addEventListener('resize', showCardsOnScroll);
window.addEventListener('load', showCardsOnScroll);


// ================= Hamburger Menu =================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// ================= Intersection Observer for Service Cards =================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
  observer.observe(card);
});
