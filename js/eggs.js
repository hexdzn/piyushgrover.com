/* Easter eggs: konami confetti, the loving heart, a note for the curious. */
(function () {
  'use strict';
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Confetti (canvas, theme-aware glyphs) ---------- */
  function confetti(burstX, burstY, count) {
    if (prefersReduced) return;
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:300;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);

    var styles = getComputedStyle(document.documentElement);
    var accent = styles.getPropertyValue('--accent').trim() || '#6c92ff';
    var text = styles.getPropertyValue('--text').trim() || '#e9e7e2';
    var glyphs = ['♥', '✳', '▪', '●']; // ♥ ✳ ▪ ●
    var parts = [];
    for (var i = 0; i < (count || 90); i++) {
      var a = Math.random() * Math.PI * 2;
      var v = 5 + Math.random() * 9;
      parts.push({
        x: burstX, y: burstY,
        vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        size: 9 + Math.random() * 12,
        glyph: glyphs[(Math.random() * glyphs.length) | 0],
        color: Math.random() < 0.55 ? accent : text,
        life: 1
      });
    }
    var start = performance.now();
    (function frame(now) {
      var t = (now - start) / 1600;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.28;           // gravity
        p.vx *= 0.99;
        p.rot += p.vr;
        p.life = Math.max(0, 1 - t);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.font = p.size + 'px sans-serif';
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      });
      if (t < 1) requestAnimationFrame(frame);
      else canvas.remove();
    })(start);
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function toast(msg) {
    var el = document.querySelector('.egg-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'egg-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 3200);
  }

  /* ---------- Egg 1: Konami code ---------- */
  var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var kPos = 0;
  document.addEventListener('keydown', function (e) {
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kPos = (key === KONAMI[kPos]) ? kPos + 1 : (key === KONAMI[0] ? 1 : 0);
    if (kPos === KONAMI.length) {
      kPos = 0;
      confetti(innerWidth / 2, innerHeight * 0.4, 140);
      toast('↑↑↓↓←→←→BA — a designer who respects the classics.');
    }
  });

  /* ---------- Egg 2: the loving heart ---------- */
  var heart = document.querySelector('.foot-made .heart');
  if (heart) {
    var taps = 0, tapTimer = null;
    heart.classList.add('egg-heart');
    heart.addEventListener('click', function () {
      taps++;
      heart.classList.remove('beat');
      void heart.offsetWidth; // restart animation
      heart.classList.add('beat');
      clearTimeout(tapTimer);
      tapTimer = setTimeout(function () { taps = 0; }, 1500);
      if (taps >= 3) {
        taps = 0;
        var r = heart.getBoundingClientRect();
        confetti(r.left + r.width / 2, r.top + r.height / 2, 90);
      }
    });
  }

  /* ---------- Egg 3: memoji rain (triple-click the brand) ---------- */
  var brand = document.querySelector('.brand img');
  if (brand) {
    var bTaps = 0, bTimer = null;
    brand.parentElement.addEventListener('click', function (e) {
      bTaps++;
      clearTimeout(bTimer);
      bTimer = setTimeout(function () { bTaps = 0; }, 900);
      if (bTaps >= 3) {
        bTaps = 0;
        e.preventDefault();
        brand.classList.remove('egg-spin');
        void brand.offsetWidth;
        brand.classList.add('egg-spin');
        memojiRain(brand.src);
      }
    });
  }
  function memojiRain(src) {
    if (prefersReduced) return;
    var img = new Image();
    img.src = src;
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:300;';
      document.body.appendChild(canvas);
      var ctx = canvas.getContext('2d');
      var dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.scale(dpr, dpr);
      var drops = [];
      for (var i = 0; i < 26; i++) {
        drops.push({
          x: Math.random() * innerWidth,
          y: -40 - Math.random() * innerHeight * 0.6,
          v: 3.5 + Math.random() * 5,
          size: 22 + Math.random() * 26,
          rot: (Math.random() - 0.5) * 0.6,
          spin: (Math.random() - 0.5) * 0.08
        });
      }
      var start = performance.now();
      (function frame(now) {
        var t = (now - start) / 2600;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        drops.forEach(function (d) {
          d.y += d.v;
          d.rot += d.spin;
          ctx.save();
          ctx.translate(d.x, d.y);
          ctx.rotate(d.rot);
          ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - 0.72) * 3.5);
          ctx.drawImage(img, -d.size / 2, -d.size / 2, d.size, d.size);
          ctx.restore();
        });
        if (t < 1) requestAnimationFrame(frame);
        else canvas.remove();
      })(start);
    };
  }

  /* ---------- Egg 4: theme-toggle enthusiasm ---------- */
  var toggles = document.querySelectorAll('.theme-toggle');
  var tCount = 0, tTimer = null;
  toggles.forEach(function (tg) {
    tg.addEventListener('click', function () {
      tCount++;
      clearTimeout(tTimer);
      tTimer = setTimeout(function () { tCount = 0; }, 2200);
      if (tCount >= 5) {
        tCount = 0;
        tg.classList.remove('egg-spin');
        void tg.offsetWidth;
        tg.classList.add('egg-spin');
        var r = tg.getBoundingClientRect();
        confetti(r.left + r.width / 2, r.top + r.height / 2, 50);
        toast('Both modes are hand-tuned. Pick your fighter.');
      }
    });
  });

  /* ---------- Egg 5: type "piyush" anywhere ---------- */
  var NAME = 'piyush';
  var nPos = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key.length !== 1) return;
    var c = e.key.toLowerCase();
    nPos = (c === NAME[nPos]) ? nPos + 1 : (c === NAME[0] ? 1 : 0);
    if (nPos === NAME.length) {
      nPos = 0;
      confetti(innerWidth / 2, innerHeight * 0.35, 110);
      toast('You rang? → piyushggrover@gmail.com');
      // marquee asterisks turn to hearts for a moment
      document.querySelectorAll('.marquee-track span').forEach(function (s) { s.classList.add('egg-hearts'); });
      setTimeout(function () {
        document.querySelectorAll('.marquee-track span').forEach(function (s) { s.classList.remove('egg-hearts'); });
      }, 8000);
    }
  });

  /* ---------- Egg 6: for the ones who open the console ---------- */
  try {
    console.log(
      '%c PIYUSH GROVER %c Designing fluid & functional interfaces ',
      'background:#6c92ff;color:#0b0c0e;font-weight:700;padding:4px 8px;border-radius:3px 0 0 3px;font-family:monospace;',
      'background:#15171c;color:#e9e7e2;padding:4px 8px;border-radius:0 3px 3px 0;font-family:monospace;'
    );
    console.log('%cInspecting the craft? Good instinct. There\'s a Konami surprise on the keyboard, and the footer ♥ likes attention. → piyushggrover@gmail.com',
      'color:#91959d;font-family:monospace;');
    // (no other secrets here — keep looking)
  } catch (e) {}
})();
