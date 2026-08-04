(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const links = navbar.querySelectorAll('.nav-link');
  const path  = window.location.pathname;
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHomePath = path.endsWith('index.html') ||
                       path === '/' ||
                       path.endsWith('/portfolio/');
    const isHomeHref = href === 'index.html' ||
                       href === '../index.html' ||
                       href === '../../index.html' ||
                       href === '#';
    if (isHomePath && isHomeHref) {
      link.classList.add('active');
    } else if (href) {
      const cleanHref = href.replace('../', '').replace('../../', '');
      if (path.includes(cleanHref)) {
        link.classList.add('active');
      }
    }
  });

  const hamburger  = navbar.querySelector('.hamburger');
  const mobileMenu = navbar.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('.nav-link').forEach(l =>
      l.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      })
    );
  }
})();
