/**
 * Confetti that bursts from the top corners and rains down.
 * Gold, crimson, and white — no external package needed.
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
    "#FF4444",
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
  const count = 250;

  // Burst from two points at top of screen
  const origins = [
    { x: canvas.width * 0.25, y: -10 },
    { x: canvas.width * 0.75, y: -10 },
    { x: canvas.width * 0.5, y: -10 },
  ];

  for (let i = 0; i < count; i++) {
    const origin = origins[i % origins.length];
    const angle = Math.random() * Math.PI; // downward hemisphere
    const speed = 6 + Math.random() * 10;
    particles.push({
      x: origin.x + (Math.random() - 0.5) * 80,
      y: origin.y,
      vx:
        Math.cos(angle - Math.PI / 2) * speed * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.abs(Math.sin(angle) * speed) + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: 7 + Math.random() * 10,
      h: 4 + Math.random() * 5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.25,
      opacity: 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.vy += 0.18; // gentle gravity
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      // Only start fading after halfway down
      if (p.y > canvas.height * 0.4) {
        p.opacity -= 0.006;
      }
      if (p.opacity <= 0 || p.y > canvas.height + 20) continue;
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
