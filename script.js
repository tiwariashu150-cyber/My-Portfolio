// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initCountUp();
  initCopyEmail();
  initSmoothScroll();
  initActiveNavLink();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ===== Mobile Navigation =====
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const overlay = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('mobileNavClose');
  const mobileLinks = overlay.querySelectorAll('.mobile-nav-link');

  toggle.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeNav() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ===== Counter Animation =====
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCount(el, target) {
  const duration = 1500;
  const startTime = performance.now();
  const suffix = target >= 100 ? '+' : '';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString() + (progress >= 1 ? suffix : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ===== Copy Email to Clipboard =====
function initCopyEmail() {
  const emailEl = document.getElementById('copyEmail');
  if (!emailEl) return;

  emailEl.addEventListener('click', async () => {
    const email = 'officialashuishere@gmail.com';
    const copyText = emailEl.querySelector('.copy-text');

    try {
      await navigator.clipboard.writeText(email);
      copyText.textContent = '(copied!)';
      copyText.style.color = 'var(--green)';

      setTimeout(() => {
        copyText.textContent = '(click to copy)';
        copyText.style.color = '';
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      copyText.textContent = '(copied!)';
      copyText.style.color = 'var(--green)';

      setTimeout(() => {
        copyText.textContent = '(click to copy)';
        copyText.style.color = '';
      }, 2000);
    }
  });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== Active Nav Link on Scroll =====
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ===== Parallax Glow Effect on Mouse Move =====
document.addEventListener('mousemove', (e) => {
  const glows = document.querySelectorAll('.hero-bg-glow');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  glows.forEach((glow, i) => {
    const factor = (i + 1) * 15;
    glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
