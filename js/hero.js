/* Home hero — Three.js particle flow field.
   An abstract "data-flow" motif: particles drifting along a curl-like noise
   field, a quiet nod to transaction flows / systems work. Theme-aware,
   degrades on mobile (fewer particles), renders a single static frame under
   prefers-reduced-motion, and leaves the CSS gradient fallback when WebGL
   is unavailable. */
import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas');
if (canvas) init(canvas);

function cssColor(name) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v);
}

function init(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch (e) {
    return; // CSS fallback stays visible
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = matchMedia('(max-width: 760px)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(DPR);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 7;

  const COUNT = isMobile ? 900 : 3200;
  const BOUND = 9;

  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  const phases = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * BOUND * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * BOUND;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    speeds[i] = 0.3 + Math.random() * 0.9;
    phases[i] = Math.random() * Math.PI * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Soft round sprite so points don't render as squares
  const sprite = makeSprite();

  const mat = new THREE.PointsMaterial({
    size: isMobile ? 0.065 : 0.055,
    map: sprite,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // A few accent particles, slightly larger
  const ACCENT_COUNT = Math.floor(COUNT * 0.04);
  const aPos = new Float32Array(ACCENT_COUNT * 3);
  for (let i = 0; i < ACCENT_COUNT * 3; i++) aPos[i] = positions[i];
  const aGeo = new THREE.BufferGeometry();
  aGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3));
  const aMat = new THREE.PointsMaterial({
    size: 0.09, map: sprite, transparent: true, depthWrite: false, sizeAttenuation: true
  });
  const aPoints = new THREE.Points(aGeo, aMat);
  scene.add(aPoints);
  applyTheme();

  function applyTheme() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    const accent = cssColor('--accent');
    const base = cssColor('--text-muted');
    mat.color = base;
    mat.opacity = light ? 0.55 : 0.7;
    mat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    aMat.color = accent;
    aMat.opacity = light ? 0.8 : 0.9;
    aMat.blending = mat.blending;
  }
  window.addEventListener('themechange', () => { applyTheme(); if (reduced) renderOnce(); });

  // Pseudo curl-noise flow field (cheap, no lib)
  function flow(x, y, z, t) {
    const s = 0.22;
    const fx = Math.sin(y * s + t * 0.25) + 0.5 * Math.cos(z * s * 1.7 + t * 0.15);
    const fy = Math.sin(z * s * 1.3 + t * 0.2) * 0.45 + 0.2 * Math.sin(x * s * 0.8 + t * 0.1);
    const fz = Math.cos(x * s + t * 0.12) * 0.3;
    return [fx, fy, fz];
  }

  let mouseX = 0, mouseY = 0;
  if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', () => { resize(); if (reduced) renderOnce(); });
  // ResizeObserver catches layout-driven size changes the window event misses
  // (e.g. canvas measured before stylesheets applied).
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => { resize(); if (reduced) renderOnce(); }).observe(canvas.parentElement);
  }
  resize();

  const clock = new THREE.Clock();
  let raf = null;
  let visible = true;

  function step(dtFixed) {
    const t = clock.getElapsedTime();
    const dt = dtFixed !== undefined ? dtFixed : Math.min(clock.getDelta(), 0.05);
    const p = geo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const [fx, fy, fz] = flow(p[ix], p[ix + 1], p[ix + 2], t);
      const sp = speeds[i] * dt * 0.55;
      p[ix] += fx * sp + 0.12 * sp;          // slight constant drift to the right
      p[ix + 1] += fy * sp;
      p[ix + 2] += fz * sp;
      // wrap around bounds
      if (p[ix] > BOUND) p[ix] = -BOUND;
      if (p[ix] < -BOUND) p[ix] = BOUND;
      if (p[ix + 1] > BOUND * 0.6) p[ix + 1] = -BOUND * 0.6;
      if (p[ix + 1] < -BOUND * 0.6) p[ix + 1] = BOUND * 0.6;
      if (p[ix + 2] > 2.5) p[ix + 2] = -2.5;
      if (p[ix + 2] < -2.5) p[ix + 2] = 2.5;
    }
    geo.attributes.position.needsUpdate = true;

    const ap = aGeo.attributes.position.array;
    for (let i = 0; i < ACCENT_COUNT * 3; i += 3) {
      ap[i] = p[i]; ap[i + 1] = p[i + 1]; ap[i + 2] = p[i + 2];
    }
    aGeo.attributes.position.needsUpdate = true;

    // gentle mouse parallax
    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.35 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    step();
  }

  function renderOnce() {
    // advance a few fixed steps so the static frame doesn't look like a fresh grid
    for (let i = 0; i < 30; i++) step(0.05);
  }

  if (reduced) {
    renderOnce();
  } else {
    // pause when tab hidden or hero scrolled away
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && raf === null) { clock.getDelta(); loop(); }
      else if (!visible && raf !== null) { cancelAnimationFrame(raf); raf = null; }
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && raf !== null) { cancelAnimationFrame(raf); raf = null; }
      else if (!document.hidden && visible && raf === null) { clock.getDelta(); loop(); }
    });
    loop();
  }

  function makeSprite() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }
}
