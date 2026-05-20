/* ═══════════════════════════════════════════════
   PLAZA SKY TRAVELS – Main JavaScript
═══════════════════════════════════════════════ */

// ─── NAVBAR SCROLL ───────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Back to top button
  const btn = document.getElementById('backTop');
  if (window.scrollY > 400) btn.classList.add('visible');
  else btn.classList.remove('visible');
});

// ─── HAMBURGER MENU ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobile() { mobileMenu.classList.remove('open'); }

// ─── HERO SLIDESHOW ──────────────────────────────────────────
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let slideInterval;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startSlideshow() {
  slideInterval = setInterval(() => goToSlide(current + 1), 3000);
}

startSlideshow();
dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(slideInterval); goToSlide(i); startSlideshow(); }));

// ─── STATS COUNTER ───────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let count = 0;
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = Math.floor(count).toLocaleString();
    if (count >= target) clearInterval(timer);
  }, 16);
}

const statsSection = document.querySelector('.stats');
let statsAnimated = false;
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    document.querySelectorAll('.stat-num').forEach(animateCounter);
  }
}, { threshold: 0.5 });
if (statsSection) statsObserver.observe(statsSection);

// ─── PACKAGE FILTER ──────────────────────────────────────────
function filterPackages(cat, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.pkg-card').forEach(card => {
    const cats = card.dataset.cat || '';
    if (cat === 'all' || cats.includes(cat)) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}

// ─── TESTIMONIAL SLIDER ──────────────────────────────────────
const track = document.getElementById('testimonialTrack');
const tdots  = document.querySelectorAll('.tdot');
let tCurrent = 0;
let tPerView = 3;

function updatePerView() {
  if (window.innerWidth < 768) tPerView = 1;
  else if (window.innerWidth < 1024) tPerView = 2;
  else tPerView = 3;
}

function goToTestimonial(n) {
  const cards = track.querySelectorAll('.testimonial-card');
  const max   = cards.length - tPerView;
  tCurrent    = Math.max(0, Math.min(n, max));
  const cardW = cards[0].offsetWidth + 24; // gap
  track.style.transform = `translateX(-${tCurrent * cardW}px)`;
  tdots.forEach((d, i) => d.classList.toggle('active', i === tCurrent));
}

updatePerView();
window.addEventListener('resize', () => { updatePerView(); goToTestimonial(tCurrent); });

// Auto-advance testimonials
let tInterval = setInterval(() => {
  const max = document.querySelectorAll('.testimonial-card').length - tPerView;
  goToTestimonial(tCurrent < max ? tCurrent + 1 : 0);
}, 4500);

tdots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(tInterval); goToTestimonial(i); }));

// ─── DESTINATION MODAL DATA ──────────────────────────────────
const destinations = {
  maldives: {
    name: 'Maldives', flag: '🌴',
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&q=80',
    price: 'From QAR 8,500',
    description: 'The Maldives is the ultimate luxury escape — turquoise lagoons, pristine white-sand beaches, and overwater bungalows set above the clearest ocean on Earth. Ideal for couples, honeymooners, and those seeking total serenity.',
    highlights: ['Overwater villa resorts', 'World-class snorkeling & diving', 'Sunset dolphin cruises', 'Spa & wellness retreats', 'Fresh seafood dining'],
    best: 'November – April'
  },
  paris: {
    name: 'Paris, France', flag: '🗼',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=700&q=80',
    price: 'From QAR 5,200',
    description: 'The City of Light dazzles with its iconic landmarks, world-class cuisine, art, and romance. From the Eiffel Tower to the Louvre, Versailles to Montmartre — Paris never fails to enchant.',
    highlights: ['Eiffel Tower & Champs-Élysées', 'Louvre & Musée d\'Orsay', 'Versailles Palace day trip', 'Seine River dinner cruise', 'French Riviera extension'],
    best: 'April – June, September – October'
  },
  bali: {
    name: 'Bali, Indonesia', flag: '🌺',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80',
    price: 'From QAR 4,800',
    description: 'Bali is the island of the gods — a magical blend of lush rice terraces, ancient temples, vibrant arts, surf beaches, and world-renowned wellness retreats. A destination that speaks to the soul.',
    highlights: ['Ubud rice terrace treks', 'Tanah Lot temple sunset', 'Mount Batur volcano sunrise', 'Traditional Kecak dance', 'Seminyak beach clubs'],
    best: 'April – October'
  },
  switzerland: {
    name: 'Switzerland', flag: '🏔',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    price: 'From QAR 7,100',
    description: 'Switzerland is Europe\'s crown jewel — snow-capped Alps, crystal-clear lakes, charming villages, and some of the finest chocolate and cheese in the world. A year-round destination for adventure and luxury alike.',
    highlights: ['Interlaken adventure sports', 'Zermatt & the Matterhorn', 'Lake Lucerne cruises', 'Glacier Express train', 'Zurich & Geneva city tours'],
    best: 'June – September (summer), December – March (ski)'
  },
  japan: {
    name: 'Japan', flag: '⛩',
    img: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=700&q=80',
    price: 'From QAR 6,300',
    description: 'Japan is a land of breathtaking contrasts — ancient temples alongside neon-lit skyscrapers, serene tea ceremonies beside bullet trains. A journey through Japan is unlike any other travel experience.',
    highlights: ['Tokyo skyline & Shibuya crossing', 'Kyoto geisha district', 'Mount Fuji view', 'Shinkansen bullet train', 'Ryokan & onsen experience'],
    best: 'March – May (cherry blossom), October – November (autumn)'
  }
};

function openModal(key) {
  const d = destinations[key];
  if (!d) return;
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <img src="${d.img}" alt="${d.name}" style="width:100%;height:220px;object-fit:cover;border-radius:12px;margin-bottom:24px;" />
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <h2 style="font-family:'Playfair Display',serif;color:#5C1233;font-size:1.6rem;">${d.flag} ${d.name}</h2>
      <span style="color:#C9A84C;font-weight:700;font-size:1.05rem;">${d.price}</span>
    </div>
    <p style="color:#666;line-height:1.7;margin-bottom:20px;">${d.description}</p>
    <h4 style="color:#5C1233;margin-bottom:10px;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px;">Highlights</h4>
    <ul style="list-style:none;margin-bottom:20px;">
      ${d.highlights.map(h => `<li style="color:#555;font-size:0.875rem;padding:4px 0;">✦ ${h}</li>`).join('')}
    </ul>
    <p style="color:#888;font-size:0.82rem;margin-bottom:24px;">🌤 Best time to visit: <strong>${d.best}</strong></p>
    <a href="#contact" onclick="closeModal()" style="display:block;text-align:center;background:#C9A84C;color:#5C1233;padding:14px;border-radius:50px;font-weight:700;font-size:0.95rem;">
      Enquire About This Destination
    </a>
  `;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function openVideo() {
  document.getElementById('videoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  document.getElementById('videoModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal with ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeVideo(); }
});

// ─── CONTACT FORM ────────────────────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type=submit]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const payload = {
    access_key:  'e1499d00-a488-4cb7-9f6c-647ce445e6cf',
    subject:     'New Travel Enquiry – Plaza Sky Travel',
    from_name:   'Plaza Sky Website',
    name:        form.querySelector('[name=name]').value,
    email:       form.querySelector('[name=email]').value,
    phone:       form.querySelector('[name=phone]').value,
    travel_type: form.querySelector('[name=travel_type]').value,
    destination: form.querySelector('[name=destination]').value,
    message:     form.querySelector('[name=message]').value,
  };

  fetch('https://api.web3forms.com/submit', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body:    JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(json => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    if (json.success) {
      const success = document.getElementById('formSuccess');
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    } else {
      console.error('Web3Forms error:', json);
      alert('Error: ' + (json.message || 'Please try again.'));
    }
  })
  .catch(err => {
    console.error('Fetch error:', err);
    btn.textContent = 'Send Message';
    btn.disabled = false;
    alert('Network error. Please try again or call us directly at +974 6000 3625.');
  });
}

// ─── SMOOTH SCROLL FOR NAV LINKS ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── REVIEWS CAROUSEL ────────────────────────────────────────
function initReviewsCarousel() {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;

  // Clone all cards and append for seamless loop
  const cards = Array.from(track.children);
  cards.forEach(function(card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  var pos    = 0;
  var paused = false;
  var halfW  = 0;
  var SPEED  = 0.4;

  function calcHalf() {
    var w = 0;
    for (var i = 0; i < cards.length; i++) {
      w += cards[i].offsetWidth + 24; // 24 = gap
    }
    halfW = w;
  }

  // Recalculate on resize
  window.addEventListener('resize', calcHalf);

  // Pause / resume on hover
  track.addEventListener('mouseenter', function() { paused = true;  });
  track.addEventListener('mouseleave', function() { paused = false; });

  function tick() {
    if (!paused && halfW > 0) {
      pos += SPEED;
      if (pos >= halfW) pos -= halfW;
      track.style.transform = 'translateX(-' + pos + 'px)';
    }
    requestAnimationFrame(tick);
  }

  // Start after layout is fully painted
  calcHalf();
  tick();
}

// Run on load to ensure all elements are sized
if (document.readyState === 'complete') {
  initReviewsCarousel();
} else {
  window.addEventListener('load', initReviewsCarousel);
}

// ─── LOGO CAROUSEL ───────────────────────────────────────────
function initLogoCarousel() {
  const track = document.querySelector('.logo-carousel-track');
  if (!track) return;

  // Remove any HTML-side clones, let JS handle duplication
  track.querySelectorAll('[aria-hidden="true"]').forEach(function(el) { el.remove(); });

  const originals = Array.from(track.children);
  originals.forEach(function(slide) {
    var clone = slide.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  var pos    = 0;
  var paused = false;
  var halfW  = 0;
  var SPEED  = 0.6;

  function calcHalf() {
    var w = 0;
    for (var i = 0; i < originals.length; i++) {
      w += originals[i].offsetWidth + 20; // 20 = gap
    }
    halfW = w;
  }

  window.addEventListener('resize', calcHalf);
  track.addEventListener('mouseenter', function() { paused = true;  });
  track.addEventListener('mouseleave', function() { paused = false; });

  function tick() {
    if (!paused && halfW > 0) {
      pos += SPEED;
      if (pos >= halfW) pos -= halfW;
      track.style.transform = 'translateX(-' + pos + 'px)';
    }
    requestAnimationFrame(tick);
  }

  calcHalf();
  tick();
}

if (document.readyState === 'complete') {
  initLogoCarousel();
} else {
  window.addEventListener('load', initLogoCarousel);
}

// ─── CSS ANIMATION ───────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
