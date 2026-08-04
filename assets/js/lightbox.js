(function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.screenshot-img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLB = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (lbClose) lbClose.addEventListener('click', closeLB);
  lb.addEventListener('click', e => {
    if (e.target === lb) closeLB();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLB();
  });
})();
