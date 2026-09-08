/* Home hero — title wave.
   A click or tap on the heading sends a weight/width wave down the line
   (Archivo VF axes). The hover-tracking bloom that shipped first was pulled
   the same day at Piyush's request — it read as distracting. The letter
   split happens at runtime so the markup stays plain text for no-JS
   visitors and crawlers. */
(function () {
  'use strict';
  var title = document.querySelector('.hero-title');
  if (!title) return;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return; // plain heading, no tracking, no wave

  // The h1 keeps its full text for assistive tech; the letter spans are
  // presentational.
  title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());
  var chars = [];
  title.querySelectorAll('.hl').forEach(function (line) {
    var text = line.textContent;
    line.textContent = '';
    line.setAttribute('aria-hidden', 'true');
    text.split('').forEach(function (c) {
      if (c === ' ') { line.appendChild(document.createTextNode(' ')); return; }
      var s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c;
      line.appendChild(s);
      chars.push(s);
    });
  });
  title.classList.add('is-kinetic');

  /* ---------- Wave on click / tap ---------- */
  var waving = false;
  title.addEventListener('click', function () {
    if (waving) return;
    waving = true;
    chars.forEach(function (s, i) {
      setTimeout(function () {
        s.classList.remove('wave');
        void s.offsetWidth;
        s.classList.add('wave');
      }, i * 22);
    });
    setTimeout(function () { waving = false; }, chars.length * 22 + 700);
  });
  chars.forEach(function (s) {
    s.addEventListener('animationend', function () { s.classList.remove('wave'); });
  });
})();
