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
      var dismissPre = function () {
        if (!pre.parentNode) return;
        pre.remove();
        document.body.style.overflow = '';
        try { sessionStorage.setItem('seen-intro', '1'); } catch (e) {}
      };
      // Safety net: this overlay covers the whole page until the timeline
      // finishes, so anything that stalls it (a tab opened in the background
      // never advances rAF) would otherwise leave the site blank. The intro
      // runs ~2.6s; clear it unconditionally well after that.
      setTimeout(dismissPre, 6000);
      gsap.timeline({ onComplete: dismissPre })
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

  /* ---------- Case-study video: honour reduced motion ---------- */
  // autoplay is set in the markup so the clips still play without JS; if the
  // user has asked for less motion we stop them and hand over the controls.
  if (prefersReduced) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
      v.controls = true;
    });
  }

  /* ---------- Lightbox (galleries + case-study figures) ---------- */
  var lbLinks = document.querySelectorAll('[data-lightbox]');
  // Case-study images are stored at 1600px wide but displayed in a ~940px
  // column, so there is real detail to reveal on click. Filmstrip duplicates
  // (aria-hidden, present only to seam the loop) stay out of the tab order.
  var lbImgs = document.querySelectorAll('.fig img, .persona-avatar, .filmstrip-track img:not([aria-hidden="true"])');

  if (lbLinks.length || lbImgs.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-close" aria-label="Close expanded image">×</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbClose = lb.querySelector('.lb-close');
    var lbReturn = null;

    // Tall images (long boards, full-page captures) would collapse to an
    // unreadable sliver inside max-height:86vh — let those overflow and scroll.
    lbImg.addEventListener('load', function () {
      if (lbImg.naturalWidth && lbImg.naturalHeight / lbImg.naturalWidth > 1.6) lb.classList.add('tall');
    });

    function lbOpen(src, alt, trigger) {
      if (!src) return;
      lbReturn = trigger || null;
      lb.classList.remove('tall');
      lbImg.alt = alt || '';
      lbImg.src = src;
      lb.classList.add('mounted');
      // flush style so .mounted has taken effect before .open starts the fade
      // and before we move focus — a hidden button can't take focus
      void lb.offsetWidth;
      lb.classList.add('open');
      document.documentElement.classList.add('lb-open');
      lb.scrollTop = 0;
      lbClose.focus();
    }
    function lbHide() {
      if (!lb.classList.contains('open')) return;
      lb.classList.remove('open');
      document.documentElement.classList.remove('lb-open');
      if (lbReturn && lbReturn.focus) lbReturn.focus();
      lbReturn = null;
      // unmount once the fade has run. setTimeout still fires in a
      // backgrounded tab, so the overlay can never be left stranded.
      setTimeout(function () {
        if (lb.classList.contains('open')) return; // reopened in the meantime
        lb.classList.remove('mounted', 'tall');
        lbImg.src = '';
      }, 320);
    }

    lbLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        lbOpen(a.getAttribute('href'), (a.querySelector('img') || {}).alt, a);
      });
    });

    lbImgs.forEach(function (im) {
      im.classList.add('is-zoomable');
      im.setAttribute('role', 'button');
      im.setAttribute('tabindex', '0');
      im.setAttribute('data-cursor', 'view');
      im.setAttribute('data-cursor-label', 'Expand');
      im.addEventListener('click', function () { lbOpen(im.getAttribute('data-full') || im.currentSrc || im.src, im.alt, im); });
      im.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbOpen(im.getAttribute('data-full') || im.currentSrc || im.src, im.alt, im); }
      });
    });

    // Close on the backdrop or the button only — clicking the image itself
    // must not close it, or tall images can't be scrolled through.
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.closest('.lb-close')) lbHide();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lbHide(); });
  }

  /* ---------- Case-study chapter rail ---------- */
  var rail = document.querySelector('.cs-rail');
  var HEAD_OFFSET = 95; // keep in sync with scroll-margin-top in css

  function scrollToSection(target, instant) {
    // compute at click time — immune to any earlier layout shifts
    var y = target.getBoundingClientRect().top + window.scrollY - HEAD_OFFSET;
    window.scrollTo({ top: y, behavior: (instant || prefersReduced) ? 'auto' : 'smooth' });
  }

  if (rail) {
    var railLinks = rail.querySelectorAll('a[href^="#"]');

    // JS-driven navigation: precise landing regardless of image loading state
    railLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        scrollToSection(target);
        history.replaceState(null, '', a.getAttribute('href'));
        railLinks.forEach(function (x) { x.classList.remove('active'); });
        a.classList.add('active');
      });
    });

    if (window.gsap && window.ScrollTrigger) {
      railLinks.forEach(function (a) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        ScrollTrigger.create({
          trigger: target,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: function (self) {
            if (self.isActive) {
              railLinks.forEach(function (x) { x.classList.remove('active'); });
              a.classList.add('active');
            }
          }
        });
      });
      // Hide the fixed rail only when the prev/next nav is actually entering
      // the viewport, so it never disappears mid-article.
      var railEnd = document.querySelector('.pn-nav') || document.querySelector('.site-foot');
      if (railEnd) {
        ScrollTrigger.create({
          trigger: railEnd,
          start: 'top 95%',
          onEnter: function () { rail.classList.add('is-hidden'); },
          onLeaveBack: function () { rail.classList.remove('is-hidden'); }
        });
      }
    }
  }

  /* Recompute all scroll-trigger positions once every asset has loaded.
     Re-land the hash ONLY for true deep links (hash present at page open,
     user hasn't interacted yet) — never after in-page rail clicks, which
     used to cause an abrupt jump when late-loading images fired 'load'. */
  var initialHash = location.hash;
  var userInteracted = false;
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (ev) {
    window.addEventListener(ev, function () { userInteracted = true; }, { passive: true, once: true });
  });
  window.addEventListener('load', function () {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    if (initialHash && !userInteracted) {
      var t = document.querySelector(initialHash);
      if (t) setTimeout(function () {
        if (!userInteracted) scrollToSection(t, true);
      }, 60);
    }
  });

  /* ---------- Footer year ---------- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
