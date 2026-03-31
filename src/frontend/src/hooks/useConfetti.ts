/**
 * Lightweight confetti implementation — no external package needed.
 * Fires gold + crimson particles from a canvas overlay.
 */
export function fireConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;

  const colors = [
    "#C9A84C",
    "#FFD700",
    "#B8860B",
    "#DC143C",
    "#8B0000",
    "#ffffff",
  ];

  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    w: number;
    h: number;
    angle: number;
    spin: number;
    opacity: number;
  };

  const particles: Particle[] = [];

  // Burst from center-top
  for (let i = 0; i < 180; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: canvas.width * (0.2 + Math.random() * 0.6),
      y: canvas.height * 0.35,
      vx: Math.cos(angle) * speed,
      vy: -Math.abs(Math.sin(angle) * speed) - 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: 6 + Math.random() * 8,
      h: 3 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      opacity: 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.vy += 0.25; // gravity
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      p.opacity -= 0.008;
      if (p.opacity <= 0) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (alive) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  animate();
}
