(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class SakuraPetal {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * -H;
      this.vx = (Math.random() - 0.5) * 0.6 + 0.3;
      this.vy = Math.random() * 0.7 + 0.5;
      this.r  = Math.random() * 2.8 + 1.2;
      this.a  = Math.random() * 0.45 + 0.2;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - 0.5) * 0.025;
      this.color = Math.random() > 0.45 
        ? `rgba(217, 4, 41, ${this.a})` 
        : `rgba(239, 35, 60, ${this.a * 0.85})`;
    }
    update() {
      this.x += this.vx + Math.sin(this.angle) * 0.35;
      this.y += this.vy;
      this.angle += this.spin;
      if (this.y > H + 15 || this.x > W + 20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.r * 1.7, this.r * 0.9, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new SakuraPetal());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();
