/* Micro-interactions: tilt specimens, before/after slider, live toggle demo */
(function () {
  'use strict';
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 3D tilt on component specimens ---------- */
  if (finePointer && !prefersReduced) {
    document.querySelectorAll('.fx-tilt').forEach(function (fig) {
      var img = fig.querySelector('img');
      if (!img) return;
      var raf = null;
      fig.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = fig.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          fig.classList.add('is-live');
          img.style.transform =
            'rotateY(' + (px * 10).toFixed(2) + 'deg) rotateX(' + (-py * 8).toFixed(2) + 'deg) scale(1.02)';
        });
      });
      fig.addEventListener('pointerleave', function () {
        fig.classList.remove('is-live');
        img.style.transform = '';
      });
    });
  }

  /* ---------- Before/after slider ---------- */
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var range = slider.querySelector('.ba-range');
    if (!range) return;
    var set = function (v) { slider.style.setProperty('--pos', v + '%'); };
    set(range.value || 50);
    range.addEventListener('input', function () { set(range.value); });
  });

  /* ---------- Show/Hide live toggle demo ---------- */
  document.querySelectorAll('.fx-swap').forEach(function (swap) {
    var btn = swap.querySelector('.ui-toggle');
    var labels = swap.querySelectorAll('.swap-bar .lbl');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var on = swap.classList.toggle('on');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      labels.forEach(function (l, i) { l.classList.toggle('active', on ? i === 1 : i === 0); });
    });
  });
})();
