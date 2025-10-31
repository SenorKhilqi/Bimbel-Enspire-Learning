// ============================================
// Enspire Learning - Main JavaScript
// ============================================

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburger && navbarMenu) {
    if (!hamburger.contains(e.target) && !navbarMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
  }
});

// Close menu on link click
const navLinks = document.querySelectorAll('.navbar-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navbarMenu?.classList.remove('active');
  });
});

// Active link highlighting
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveLink);

// Handle window resize to close menu on larger screens
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger?.classList.remove('active');
    navbarMenu?.classList.remove('active');
  }
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    // Close other accordions
    accordionHeaders.forEach(otherHeader => {
      if (otherHeader !== header && otherHeader.classList.contains('active')) {
        otherHeader.classList.remove('active');
        otherHeader.nextElementSibling.classList.remove('active');
      }
    });

    // Toggle current accordion
    header.classList.toggle('active');
    header.nextElementSibling.classList.toggle('active');
  });
});

// WhatsApp Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const pesan = document.getElementById('pesan').value;

    if (!nama || !email || !whatsapp || !pesan) {
      alert('Mohon lengkapi semua field');
      return;
    }

    const message = `Halo, saya ${nama}\n\nEmail: ${email}\nNo. WA: ${whatsapp}\n\nPesan:\n${pesan}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6287789475324';

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    // Reset form
    contactForm.reset();
    alert('Terima kasih! Kami akan segera menghubungi Anda.');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Trigger counter animation when visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains('counter')) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      if (!entry.target.classList.contains('animated')) {
        animateCounter(entry.target, target);
        entry.target.classList.add('animated');
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
  observer.observe(counter);
});

// Mobile navbar responsive
function updateNavbar() {
  if (window.innerWidth <= 768) {
    if (!navbarMenu.classList.contains('mobile-nav-style')) {
      navbarMenu.classList.add('mobile-nav-style');
    }
  } else {
    navbarMenu.classList.remove('mobile-nav-style');
    navbarMenu.classList.remove('active');
    hamburger?.classList.remove('active');
  }
}

window.addEventListener('resize', updateNavbar);
document.addEventListener('DOMContentLoaded', updateNavbar);
