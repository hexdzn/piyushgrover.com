/* Home hero — Three.js galaxy.
   A tilted spiral of stars that turns very slowly on its own, over a sparse
   field of background stars that fade in and out. Nothing reacts to the
   pointer: the motion is ambient, slow enough to read as stillness at a
   glance. Theme-aware, lighter on mobile (fewer stars), renders a single
   static frame under prefers-reduced-motion, and leaves the CSS gradient
   fallback when WebGL is unavailable. */
import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas');
if (canvas) init(canvas);

function cssColor(name) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v);
}

// Roughly normal-distributed random number in about [-1, 1]
function gauss() {
  return (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
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

  const sprite = makeSprite();
  const makeMat = (size) => new THREE.PointsMaterial({
    size, map: sprite, transparent: true, depthWrite: false, sizeAttenuation: true
  });

  /* ---- The galaxy: a three-armed spiral disc, seen at an angle ---- */
  const GALAXY_COUNT = isMobile ? 900 : 2600;
  const RADIUS = 10.5;
  const ARMS = 3;
  const gPos = new Float32Array(GALAXY_COUNT * 3);
  for (let i = 0; i < GALAXY_COUNT; i++) {
    const r = Math.pow(Math.random(), 0.62) * RADIUS;      // denser toward the core
    const arm = (i % ARMS) * (Math.PI * 2 / ARMS);
    const wind = r * 0.42;                                  // arms trail as they go out
    const scatter = gauss() * (0.55 + r * 0.035);           // loose, not drawn-on, arms
    const a = arm + wind + scatter;
    gPos[i * 3] = Math.cos(a) * r;
    gPos[i * 3 + 1] = gauss() * 0.32 * (1 - 0.6 * r / RADIUS); // thin disc, thicker at core
    gPos[i * 3 + 2] = Math.sin(a) * r;
  }
  const gGeo = new THREE.BufferGeometry();
  gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
  const gMat = makeMat(isMobile ? 0.06 : 0.05);
  const galaxy = new THREE.Points(gGeo, gMat);

  // A few larger accent-coloured stars riding the same disc
  const ACCENT_COUNT = Math.floor(GALAXY_COUNT * 0.04);
  const aGeo = new THREE.BufferGeometry();
  aGeo.setAttribute('position', new THREE.BufferAttribute(gPos.slice(0, ACCENT_COUNT * 3), 3));
  const aMat = makeMat(0.085);
  const accents = new THREE.Points(aGeo, aMat);

  // spin = turns about the disc's own axis; tilt = how we look at it
  const spin = new THREE.Group();
  spin.add(galaxy, accents);
  const tilt = new THREE.Group();
  tilt.add(spin);
  tilt.rotation.set(1.02, 0, 0.32);
  tilt.position.set(isMobile ? 0.6 : 2.4, isMobile ? 1.2 : 0.4, -3);
  scene.add(tilt);

  /* ---- Background stars: three layers that fade on different beats ---- */
  const FIELD_PER_LAYER = isMobile ? 110 : 260;
  const fieldMats = [];
  const field = new THREE.Group();
  for (let l = 0; l < 3; l++) {
    const fp = new Float32Array(FIELD_PER_LAYER * 3);
    for (let i = 0; i < FIELD_PER_LAYER; i++) {
      fp[i * 3] = (Math.random() - 0.5) * 30;
      fp[i * 3 + 1] = (Math.random() - 0.5) * 16;
      fp[i * 3 + 2] = -2 - Math.random() * 6;
    }
    const fg = new THREE.BufferGeometry();
    fg.setAttribute('position', new THREE.BufferAttribute(fp, 3));
    const fm = makeMat(0.05);
    fieldMats.push(fm);
    field.add(new THREE.Points(fg, fm));
  }
  scene.add(field);

  let baseOpacity = 0.7;
  applyTheme();

  function applyTheme() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    const base = cssColor('--text-muted');
    const blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    baseOpacity = light ? 0.6 : 0.7;
    gMat.color = base; gMat.opacity = baseOpacity; gMat.blending = blending;
    aMat.color = cssColor('--accent'); aMat.opacity = light ? 0.9 : 0.9; aMat.blending = blending;
    fieldMats.forEach((m) => { m.color = base; m.blending = blending; });
  }
  window.addEventListener('themechange', () => { applyTheme(); if (reduced) renderOnce(); });

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

  // One full turn takes about five and a half minutes.
  const SPIN_SPEED = 0.019;
  let t = 0;
  let last = performance.now();
  let raf = null;
  let visible = true;

  function render() {
    spin.rotation.y = t * SPIN_SPEED;
    field.rotation.z = t * 0.0025;
    // slow, shallow breathing of the viewpoint so the scene never sits dead still
    camera.position.x = Math.sin(t * 0.045) * 0.25;
    camera.position.y = Math.cos(t * 0.037) * 0.15;
    camera.lookAt(0, 0, 0);
    // background stars fade between roughly 45% and 100% of base, out of step
    fieldMats.forEach((m, l) => {
      m.opacity = baseOpacity * (0.72 + 0.28 * Math.sin(t * (0.35 + l * 0.11) + l * 2.1));
    });
    renderer.render(scene, camera);
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    render();
  }
  function start() { last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = null; }

  function renderOnce() {
    t = 40; // a settled angle, so the still frame is not the construction pose
    render();
  }

  if (reduced) {
    renderOnce();
  } else {
    // pause when tab hidden or hero scrolled away
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && raf === null) start();
      else if (!visible && raf !== null) stop();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && raf !== null) stop();
      else if (!document.hidden && visible && raf === null) start();
    });
    render();
    start();
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
