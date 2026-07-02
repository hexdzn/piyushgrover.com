/* piyushgrover.com — shared behaviour (theme, cursor, nav, reveals) */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Theme ---------- */
  // Initial theme is set inline in <head> to avoid a flash; this wires the toggle.
  function setTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
  }
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(cur === 'light' ? 'dark' : 'light', true);
    });
  });

  /* ---------- Header: shrink on scroll, hide on scroll-down ---------- */
  var head = document.querySelector('.site-head');
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    if (head) {
      head.classList.toggle('scrolled', y > 30);
      if (y > 400 && y > lastY + 6 && !document.body.classList.contains('menu-open')) {
        head.classList.add('hidden');
      } else if (y < lastY - 6 || y < 400) {
        head.classList.remove('hidden');
      }
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.menu-overlay a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
    });
  }

  /* ---------- Custom cursor ---------- */
  if (finePointer && !prefersReduced) {
    var dot = document.createElement('div');
    dot.className = 'cursor-dot is-hidden';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring is-hidden';
    var label = document.createElement('span');
    label.className = 'cursor-label';
    ring.appendChild(label);
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add('has-cursor');

    var mx = -100, my = -100, rx = -100, ry = -100, shown = false;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); rx = mx; ry = my; }
    });
    document.addEventListener('mouseleave', function () {
      shown = false; dot.classList.add('is-hidden'); ring.classList.add('is-hidden');
    });
    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
      ring.style.transform = 'translate(' + (rx - ring.offsetWidth / 2) + 'px,' + (ry - ring.offsetHeight / 2) + 'px)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var view = e.target.closest('[data-cursor="view"]');
      var link = e.target.closest('a, button');
      if (view) {
        ring.classList.add('is-view');
        ring.classList.remove('is-link');
        label.textContent = view.getAttribute('data-cursor-label') || 'View →';
      } else if (link) {
        ring.classList.add('is-link');
        ring.classList.remove('is-view');
        label.textContent = '';
      } else {
        ring.classList.remove('is-view', 'is-link');
        label.textContent = '';
      }
    });
  }

  /* ---------- GSAP scroll reveals ---------- */
  if (window.gsap && window.ScrollTrigger && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: parseFloat(el.getAttribute('data-reveal-delay') || 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onComplete: function () { el.classList.add('revealed'); }
      });
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- Preloader (home only) ---------- */
  var pre = document.querySelector('.preloader');
  if (pre) {
    var already = false;
    try { already = sessionStorage.getItem('seen-intro') === '1'; } catch (e) {}
    if (already || prefersReduced || !window.gsap) {
      pre.remove();
    } else {
      document.body.style.overflow = 'hidden';
      var count = pre.querySelector('.pre-count');
      var n = { v: 0 };
      gsap.timeline({
        onComplete: function () {
          pre.remove();
          document.body.style.overflow = '';
          try { sessionStorage.setItem('seen-intro', '1'); } catch (e) {}
        }
      })
        .to(n, {
          v: 100, duration: 1.6, ease: 'power2.inOut',
          onUpdate: function () { if (count) count.textContent = Math.round(n.v) + '%'; }
        })
        .to(pre.querySelector('.pre-name'), { yPercent: -20, opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.15')
        .to(pre, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.25');
    }
  }

  /* ---------- Page curtain transition on internal links ---------- */
  var curtain = document.querySelector('.page-curtain');
  if (curtain && window.gsap && !prefersReduced) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0 || href.indexOf('mailto:') === 0) return;
      if (a.hasAttribute('data-lightbox') || a.getAttribute('target') === '_blank') return;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        gsap.to(curtain, {
          scaleY: 1, duration: 0.45, ease: 'power4.inOut',
          onComplete: function () { window.location.href = href; }
        });
      });
    });
  }

  /* ---------- Project hover preview (home) ---------- */
  var preview = document.querySelector('.project-preview');
  if (preview && finePointer) {
    var imgs = preview.querySelectorAll('img');
    var rows = document.querySelectorAll('.project-row[data-preview]');
    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        imgs.forEach(function (im) { im.classList.toggle('active', im.getAttribute('data-key') === row.getAttribute('data-preview')); });
        preview.classList.add('visible');
      });
      row.addEventListener('mouseleave', function () { preview.classList.remove('visible'); });
    });
    document.addEventListener('mousemove', function (e) {
      preview.style.left = Math.min(e.clientX + 28, window.innerWidth - preview.offsetWidth - 20) + 'px';
      preview.style.top = Math.min(e.clientY - preview.offsetHeight / 2, window.innerHeight - preview.offsetHeight - 20) + 'px';
    });
  }

  /* ---------- Lightbox (galleries) ---------- */
  var lbLinks = document.querySelectorAll('[data-lightbox]');
  if (lbLinks.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-close" aria-label="Close">×</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    lbLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        lbImg.src = a.getAttribute('href');
        lbImg.alt = (a.querySelector('img') || {}).alt || '';
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('open'); lbImg.src = ''; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  /* ---------- Footer year ---------- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
