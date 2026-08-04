(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById('form-success') ||
                      form.previousElementSibling;

    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success === 'true' || data.success === true) {
          form.reset();
          form.style.display = 'none';
          if (successEl) {
            successEl.style.display = 'block';
            successEl.classList.add('show');
          }
        } else {
          throw new Error('server error');
        }
      })
      .catch(() => {
        btn.disabled = false;
        btn.textContent = 'Envoyer le message';
        alert('Une erreur est survenue, veuillez réessayer.');
      });
  });
})();
