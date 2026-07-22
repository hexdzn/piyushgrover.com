/* Design kit — copy each artifact's SVG source to the clipboard for Figma paste */
(function () {
  'use strict';

  function toast(msg) {
    var t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // Serialize an SVG node to a clean, standalone string
  function svgSource(svg) {
    var clone = svg.cloneNode(true);
    if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    var s = new XMLSerializer().serializeToString(clone);
    // tidy: ensure xml prolog-free, single spaces
    return s;
  }

  document.querySelectorAll('.kit').forEach(function (fig) {
    var btn = fig.querySelector('[data-copy]');
    var svg = fig.querySelector('.kit-canvas svg');
    if (!btn || !svg) return;
    btn.addEventListener('click', function () {
      var src = svgSource(svg);
      var done = function () {
        btn.classList.add('done');
        var label = btn.textContent;
        btn.textContent = 'Copied ✓';
        toast('SVG copied — paste into Figma (⌘V)');
        setTimeout(function () { btn.classList.remove('done'); btn.textContent = label; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(src).then(done, function () { fallback(src); done(); });
      } else { fallback(src); done(); }
    });
  });

  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  // "Copy all" per section
  document.querySelectorAll('[data-copy-all]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.closest('.kit-section');
      var parts = [];
      section.querySelectorAll('.kit-canvas svg').forEach(function (svg) { parts.push(svgSource(svg)); });
      var joined = parts.join('\n\n');
      if (navigator.clipboard) navigator.clipboard.writeText(joined); else fallback(joined);
      toast(parts.length + ' SVGs copied');
    });
  });
})();
