const canvas = document.getElementById('fiberCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resize();
window.addEventListener('resize', resize);

function getSize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  return { w: rect.width, h: rect.height };
}

const strands = Array.from({ length: 90 }, () => ({
  x: Math.random(),
  y: Math.random(),
  angle: (Math.random() - 0.15) * 0.4,
  length: Math.random() * 0.25 + 0.1,
  hue: Math.random() < 0.6 ? Math.random() * 25 + 340 : Math.random() * 30 + 15,
  brightness: Math.random() * 0.7 + 0.2,
  pulse: Math.random() * Math.PI * 2,
  pulseSpeed: Math.random() * 0.025 + 0.008,
  speed: Math.random() * 0.0008 + 0.0003,
  width: Math.random() * 1.2 + 0.2,
}));

const bokeh = Array.from({ length: 16 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 0.06 + 0.015,
  hue: Math.random() < 0.5 ? Math.random() * 30 + 10 : Math.random() * 25 + 340,
  opacity: Math.random() * 0.35 + 0.08,
  pulse: Math.random() * Math.PI * 2,
}));

function draw() {
  const { w, h } = getSize();
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#160610';
  ctx.fillRect(0, 0, w, h);

  bokeh.forEach(b => {
    b.pulse += 0.012;
    const alpha = b.opacity * (0.7 + 0.3 * Math.sin(b.pulse));
    const bx = b.x * w, by = b.y * h, br = b.r * w;
    const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    grad.addColorStop(0, `hsla(${b.hue}, 80%, 65%, ${alpha})`);
    grad.addColorStop(1, `hsla(${b.hue}, 80%, 65%, 0)`);
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  });

  strands.forEach(s => {
    s.pulse += s.pulseSpeed;
    s.x += s.speed;
    if (s.x > 1.15) s.x = -0.15;

    const alpha = s.brightness * (0.55 + 0.45 * Math.sin(s.pulse));
    const sx = s.x * w, sy = s.y * h;
    const len = s.length * w;
    const ex = sx + Math.cos(s.angle) * len;
    const ey = sy + Math.sin(s.angle) * len;

    const grad = ctx.createLinearGradient(sx, sy, ex, ey);
    grad.addColorStop(0, `hsla(${s.hue}, 95%, 72%, 0)`);
    grad.addColorStop(0.35, `hsla(${s.hue}, 95%, 72%, ${alpha})`);
    grad.addColorStop(0.7, `hsla(${s.hue}, 95%, 65%, ${alpha * 0.5})`);
    grad.addColorStop(1, `hsla(${s.hue}, 95%, 65%, 0)`);

    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = grad;
    ctx.lineWidth = s.width;
    ctx.stroke();
  });

  requestAnimationFrame(draw);
}

draw();
