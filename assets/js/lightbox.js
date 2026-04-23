(function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var lbImg = document.getElementById('lightbox-img');
    var lbClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.screenshot-img').forEach(function (img) {
        img.addEventListener('click', function () {
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLB() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLB);
    lb.addEventListener('click', function (e) {
        if (e.target === lb) closeLB();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLB();
    });
})();
