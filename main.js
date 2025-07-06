// Language toggle functionality
const langToggle = document.getElementById('lang-toggle');
const html = document.documentElement;
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  // Update all elements with data-en/data-ar
  document.querySelectorAll('[data-en], [data-ar]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  // Update nav links and card titles
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.textContent = link.getAttribute(`data-${lang}`);
  });
  // Update card titles
  document.querySelectorAll('.card').forEach(card => {
    const title = card.getAttribute(`data-${lang}-title`);
    if (title) card.querySelector('h3').textContent = title;
  });
  // Update lang toggle button
  langToggle.querySelector('span').textContent = lang === 'en' ? 'AR' : 'EN';
}

langToggle.addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
});

// Initial language
setLanguage('en');

// Scroll-based animations
function revealOnScroll() {
  const cards = document.querySelectorAll('.card');
  const about = document.querySelector('.about');
  const trigger = window.innerHeight * 0.85;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < trigger) {
      card.classList.add('visible');
    }
  });
  if (about) {
    const rect = about.getBoundingClientRect();
    if (rect.top < trigger) {
      about.classList.add('visible');
    }
  }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// WhatsApp button interaction
const waBtn = document.querySelector('.whatsapp-float');
if (waBtn) {
  waBtn.addEventListener('mousedown', () => {
    waBtn.style.boxShadow = '0 0 64px 0 #25d366, 0 0 32px var(--accent)';
  });
  waBtn.addEventListener('mouseup', () => {
    waBtn.style.boxShadow = '';
  });
  waBtn.addEventListener('mouseleave', () => {
    waBtn.style.boxShadow = '';
  });
}

// Optional: Responsive menu (not implemented, but placeholder for future)
// // ...

// Image preview modal logic
function createImgModal(src) {
  // Remove any existing modal
  const oldModal = document.querySelector('.img-modal');
  if (oldModal) oldModal.remove();
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'img-modal';
  modal.innerHTML = `
    <button class="img-modal-close" aria-label="Close">&times;</button>
    <img src="${src}" alt="Preview" />
  `;
  document.body.appendChild(modal);
  // Close logic
  modal.querySelector('.img-modal-close').onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  // ESC key closes modal
  document.addEventListener('keydown', function escListener(ev) {
    if (ev.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escListener);
    }
  });
}

document.querySelectorAll('.preview-btn').forEach(btn => {
  btn.onclick = (e) => {
    const src = btn.getAttribute('data-img');
    createImgModal(src);
  };
});

// Hamburger menu for mobile
const hamburger = document.getElementById('hamburger-menu');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav ul li a');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    header.classList.toggle('nav-open');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      header.classList.remove('nav-open');
    });
  });
} 
