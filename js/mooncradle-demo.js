/* Mooncradle playable demo — a simplified web version of the app's home screen.
   Everything lives in memory: nothing is stored or sent anywhere. */
(function () {
  var root = document.querySelector('[data-mc-demo]');
  if (!root) return;

  var MIN = 60000;
  var ICON = {
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M10 8v8h5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9.5 16V8h3a2.4 2.4 0 0 1 0 4.8h-3m3 0 2.3 3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bottle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M10 3h4v3l2 2.5V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.500L10 6V3Z"/><path d="M8 12h8"/></svg>',
    wet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.500c3 3.800 5 6.600 5 9.500a5 5 0 0 1-10 0c0-2.900 2-5.700 5-9.500Z"/></svg>',
    dirty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10M8 4v4h8V4M6 11h12a6 6 0 0 1-3 5.200V20H9v-3.800A6 6 0 0 1 6 11Z"/></svg>',
    both: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7.500c1.700 2.200 2.800 3.700 2.800 5.300a2.800 2.800 0 0 1-5.600 0c0-1.600 1.100-3.100 2.800-5.300Z" fill="currentColor" stroke="none"/></svg>',
    sleep: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 15.500A7 7 0 0 1 8.500 7a7 7 0 1 0 8.500 8.500Z"/><path d="M15 4h4l-4 4h4"/></svg>',
    pump: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.500c3 3.800 5 6.600 5 9.500a5 5 0 0 1-10 0c0-2.900 2-5.700 5-9.500Z"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="1.700"/><circle cx="12" cy="12" r="1.700"/><circle cx="18" cy="12" r="1.700"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20s-7-4.300-7-9.500A4 4 0 0 1 12 8a4 4 0 0 1 7 2.500C19 15.700 12 20 12 20Z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="4" y="10" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="13" rx="1"/><rect x="16" y="8" width="4" height="11" rx="1"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 15.500A8 8 0 0 1 8.500 5a8 8 0 1 0 10.500 10.500Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.600 5.600 7 7M17 17l1.400 1.400M5.600 18.400 7 17M17 7l1.400-1.400"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6v12M15 6v12"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.500v13l11-6.500-11-6.500Z"/></svg>'
  };
  var DOT = { feed: 'var(--feed-strong)', diaper: 'var(--diaper-fg)', sleep: 'var(--sleep-strong)', pump: 'var(--pump-strong)' };

  var now = Date.now();
  var state = {
    night: false,
    lastFed: now - 130 * MIN,
    lastDiaper: now - 45 * MIN,
    awakeSince: now - 65 * MIN,
    timer: null,
    entries: [
      { cat: 'diaper', text: 'Wet diaper', at: now - 45 * MIN },
      { cat: 'sleep', text: 'Sleep · 35m', at: now - 65 * MIN },
      { cat: 'feed', text: 'Feed · L 9m · R 14m', at: now - 130 * MIN }
    ]
  };

  root.innerHTML =
    '<div class="mc-phone">' +
      '<div class="mc-bar"><span data-clock></span><span class="mc-island"></span><span>5G</span></div>' +
      '<div class="mc-head">' +
        '<div class="mc-child"><strong>Mia</strong><small>6 weeks old</small></div>' +
        '<div class="mc-head-actions">' +
          '<button type="button" data-info="Memories" aria-label="Memories">' + ICON.heart + '</button>' +
          '<button type="button" data-info="Summary charts" aria-label="Summary">' + ICON.chart + '</button>' +
          '<button type="button" data-night aria-label="Switch night mode" aria-pressed="false">' + ICON.moon + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="mc-status">' +
        '<div><small>Fed</small><strong data-fed></strong></div>' +
        '<div><small>Diaper</small><strong data-diaper></strong></div>' +
        '<div><small data-awake-label>Awake</small><strong data-awake></strong></div>' +
      '</div>' +
      '<div class="mc-timer" hidden>' +
        '<div class="mc-timer-top"><span data-timer-label></span><button type="button" data-pause aria-label="Pause timer">' + ICON.pause + '</button></div>' +
        '<div class="mc-clock" data-timer-clock>00:00</div>' +
        '<div class="mc-timer-actions"><button type="button" class="mc-switch" data-switch></button><button type="button" class="mc-done" data-done>Done</button></div>' +
      '</div>' +
      '<div class="mc-today"><h4>Today</h4><ul data-list></ul></div>' +
      '<div class="mc-grid">' +
        tile('left', 'feed', 'Left') + tile('right', 'feed', 'Right') + tile('bottle', 'feed', 'Bottle') +
        tile('wet', 'diaper', 'Wet') + tile('dirty', 'diaper', 'Dirty') + tile('both', 'diaper', 'Both') +
        tile('sleep', 'sleep', 'Sleep') + tile('pump', 'pump', 'Pump') + tile('more', 'neutral', 'More') +
      '</div>' +
      '<div class="mc-toast" role="status" aria-live="polite"><span data-toast-text></span><button type="button" data-undo>Undo</button></div>' +
      '<div class="mc-sheet-wrap" data-sheet><div class="mc-sheet"><h4>Bottle</h4><p>How much? One tap logs it.</p>' +
        '<div class="mc-chips"><button type="button" data-ml="60">60 mL</button><button type="button" data-ml="90">90 mL</button><button type="button" data-ml="120">120 mL</button><button type="button" data-ml="150">150 mL</button></div>' +
      '</div></div>' +
    '</div>';

  function tile(key, cat, label) {
    return '<button type="button" class="mc-tile" data-tile="' + key + '" data-cat="' + cat + '">' + ICON[key] + '<span>' + label + '</span></button>';
  }
  function $(sel) { return root.querySelector(sel); }

  var el = {
    clock: $('[data-clock]'), fed: $('[data-fed]'), diaper: $('[data-diaper]'), awake: $('[data-awake]'), awakeLabel: $('[data-awake-label]'),
    timer: $('.mc-timer'), tLabel: $('[data-timer-label]'), tClock: $('[data-timer-clock]'), tSwitch: $('[data-switch]'), tPause: $('[data-pause]'),
    list: $('[data-list]'), toast: $('.mc-toast'), toastText: $('[data-toast-text]'), undo: $('[data-undo]'), sheet: $('[data-sheet]'), night: $('[data-night]')
  };

  /* ---------- formatting ---------- */
  function ago(ts) {
    var m = Math.floor((Date.now() - ts) / MIN);
    if (m < 1) return 'Just now';
    if (m < 60) return m + 'm ago';
    return Math.floor(m / 60) + 'h ' + pad(m % 60) + 'm ago';
  }
  function span(ms) {
    var m = Math.floor(ms / MIN);
    if (m < 60) return m + 'm';
    return Math.floor(m / 60) + 'h ' + pad(m % 60) + 'm';
  }
  // Short durations are shown in seconds so a ten-second try still reads sensibly
  function dur(ms) {
    var s = Math.round(ms / 1000);
    return s < 60 ? s + 's' : Math.round(s / 60) + 'm';
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function clockTime(ts) {
    var d = new Date(ts), h = d.getHours(), ap = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return h + ':' + pad(d.getMinutes()) + ' ' + ap;
  }
  function elapsed(t) {
    return t.acc + (t.paused ? 0 : Date.now() - t.since);
  }

  /* ---------- rendering ---------- */
  function renderList(flashFirst) {
    el.list.innerHTML = state.entries.map(function (e, i) {
      return '<li' + (flashFirst && i === 0 ? ' class="mc-new"' : '') + ' style="--dot:' + DOT[e.cat] + '"><span>' + e.text + '</span><time>' + clockTime(e.at) + '</time></li>';
    }).join('');
    if (flashFirst) root.querySelector('.mc-today').scrollTop = 0;
  }
  function renderTick() {
    var t = state.timer;
    el.clock.textContent = clockTime(Date.now()).replace(/ (am|pm)/, '');
    el.fed.textContent = t && t.kind === 'feed' ? 'Feeding now' : ago(state.lastFed);
    el.diaper.textContent = ago(state.lastDiaper);
    if (t && t.kind === 'sleep') { el.awakeLabel.textContent = 'Asleep'; el.awake.textContent = dur(elapsed(t)); }
    else { el.awakeLabel.textContent = 'Awake'; el.awake.textContent = span(Date.now() - state.awakeSince); }
    if (t) {
      var s = Math.floor(elapsed(t) / 1000);
      el.tClock.textContent = pad(Math.floor(s / 60)) + ':' + pad(s % 60);
    }
  }
  function renderTimer() {
    var t = state.timer;
    el.timer.hidden = !t;
    root.querySelectorAll('.mc-tile').forEach(function (b) { b.classList.remove('mc-on'); });
    setLabel('left', 'Left'); setLabel('right', 'Right'); setLabel('sleep', 'Sleep'); setLabel('pump', 'Pump');
    if (!t) return;
    el.timer.setAttribute('data-kind', t.kind);
    el.tPause.innerHTML = t.paused ? ICON.play : ICON.pause;
    el.tPause.setAttribute('aria-label', t.paused ? 'Resume timer' : 'Pause timer');
    if (t.kind === 'feed') {
      var side = t.side === 'L' ? 'Left' : 'Right', other = t.side === 'L' ? 'Right' : 'Left';
      el.tLabel.innerHTML = 'Feeding · <b>' + side + '</b>';
      el.tSwitch.hidden = false;
      el.tSwitch.textContent = 'Switch to ' + other;
      var key = t.side === 'L' ? 'left' : 'right';
      $('[data-tile="' + key + '"]').classList.add('mc-on');
      setLabel(key, 'On now');
    } else {
      el.tLabel.innerHTML = t.kind === 'sleep' ? '<b>Sleeping</b>' : '<b>Pumping</b>';
      el.tSwitch.hidden = true;
      $('[data-tile="' + t.kind + '"]').classList.add('mc-on');
      setLabel(t.kind, 'On now');
    }
  }
  function setLabel(key, text) { $('[data-tile="' + key + '"] span').textContent = text; }
  function render(flash) { renderTimer(); renderList(flash); renderTick(); }

  /* ---------- toast + undo ---------- */
  var toastTimer = null, undoFn = null;
  function toast(text, undo) {
    el.toastText.textContent = text;
    undoFn = undo || null;
    el.undo.hidden = !undo;
    el.toast.classList.add('mc-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 4500);
  }
  function hideToast() { el.toast.classList.remove('mc-show'); undoFn = null; }
  el.undo.addEventListener('click', function () {
    if (undoFn) undoFn();
    hideToast();
    render();
  });

  /* ---------- actions ---------- */
  function snapshot() {
    return { lastFed: state.lastFed, lastDiaper: state.lastDiaper, awakeSince: state.awakeSince, timer: state.timer, entries: state.entries.slice() };
  }
  function restore(s) {
    state.lastFed = s.lastFed; state.lastDiaper = s.lastDiaper; state.awakeSince = s.awakeSince;
    state.timer = s.timer; state.entries = s.entries;
    // a timer brought back by Undo carries on counting from its saved total
    if (state.timer && state.timer.resume) {
      state.timer.resume = false; state.timer.paused = false;
      state.timer.since = Date.now(); state.timer.sideSince = Date.now();
    }
  }
  function log(cat, text, message) {
    var before = snapshot();
    state.entries.unshift({ cat: cat, text: text, at: Date.now() });
    if (cat === 'feed') state.lastFed = Date.now();
    if (cat === 'diaper') state.lastDiaper = Date.now();
    render(true);
    toast(message, function () { restore(before); });
  }
  function startTimer(kind, side) {
    if (state.timer) {
      if (state.timer.kind === 'feed' && kind === 'feed') { if (state.timer.side !== side) switchSide(); return; }
      toast('One timer at a time in this demo');
      return;
    }
    state.timer = { kind: kind, side: side, since: Date.now(), acc: 0, paused: false, sides: { L: 0, R: 0 }, sideSince: Date.now() };
    render();
  }
  function bankSide(t) {
    if (!t.paused) t.sides[t.side] += Date.now() - t.sideSince;
    t.sideSince = Date.now();
  }
  function switchSide() {
    var t = state.timer;
    bankSide(t);
    t.side = t.side === 'L' ? 'R' : 'L';
    render();
  }
  function togglePause() {
    var t = state.timer;
    if (t.paused) { t.paused = false; t.since = Date.now(); t.sideSince = Date.now(); }
    else { bankSide(t); t.acc += Date.now() - t.since; t.paused = true; }
    render();
  }
  function finishTimer() {
    var t = state.timer, before = snapshot();
    // keep an untouched copy of the running timer so Undo can put it back
    before.timer = { kind: t.kind, side: t.side, since: Date.now(), acc: elapsed(t), paused: true, resume: true, sides: { L: t.sides.L, R: t.sides.R }, sideSince: Date.now() };
    if (!t.paused) before.timer.sides[t.side] += Date.now() - t.sideSince;
    var total = elapsed(t), text;
    if (t.kind === 'feed') {
      bankSide(t);
      var parts = [];
      if (t.sides.L > 500) parts.push('L ' + dur(t.sides.L));
      if (t.sides.R > 500) parts.push('R ' + dur(t.sides.R));
      text = 'Feed · ' + (parts.join(' · ') || dur(total));
      state.lastFed = Date.now();
    } else if (t.kind === 'sleep') {
      text = 'Sleep · ' + dur(total);
      state.awakeSince = Date.now();
    } else {
      text = 'Pump · ' + dur(total);
    }
    state.timer = null;
    state.entries.unshift({ cat: t.kind, text: text, at: Date.now() });
    render(true);
    toast(text.split(' · ')[0] + ' logged', function () { restore(before); });
  }

  root.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) {
      if (e.target === el.sheet) el.sheet.classList.remove('mc-show');
      return;
    }
    var key = b.getAttribute('data-tile');
    if (key === 'left') startTimer('feed', 'L');
    else if (key === 'right') startTimer('feed', 'R');
    else if (key === 'sleep') { if (state.timer && state.timer.kind === 'sleep') finishTimer(); else startTimer('sleep'); }
    else if (key === 'pump') { if (state.timer && state.timer.kind === 'pump') finishTimer(); else startTimer('pump'); }
    else if (key === 'bottle') el.sheet.classList.add('mc-show');
    else if (key === 'wet') log('diaper', 'Wet diaper', 'Wet diaper logged');
    else if (key === 'dirty') log('diaper', 'Dirty diaper', 'Dirty diaper logged');
    else if (key === 'both') log('diaper', 'Wet + dirty diaper', 'Diaper logged');
    else if (key === 'more') toast('Medicines, growth and notes are in the full app');
    else if (b.hasAttribute('data-ml')) { el.sheet.classList.remove('mc-show'); log('feed', 'Bottle · ' + b.getAttribute('data-ml') + ' mL', 'Bottle logged'); }
    else if (b.hasAttribute('data-switch')) switchSide();
    else if (b.hasAttribute('data-done')) finishTimer();
    else if (b.hasAttribute('data-pause')) togglePause();
    else if (b.hasAttribute('data-info')) toast(b.getAttribute('data-info') + ' is in the full app');
    else if (b.hasAttribute('data-night')) {
      state.night = !state.night;
      root.setAttribute('data-mode', state.night ? 'night' : 'day');
      b.innerHTML = state.night ? ICON.sun : ICON.moon;
      b.setAttribute('aria-pressed', state.night ? 'true' : 'false');
    }
  });

  root.setAttribute('data-mode', 'day');
  render();
  setInterval(renderTick, 1000);
})();
