/* Shagunly playable demo — simplified Home, People and New Shagun screens.
   Sample names only; everything lives in memory and nothing is stored or sent. */
(function () {
  var root = document.querySelector('[data-sg-demo]');
  if (!root) return;

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var COLORS = ['#B48CF2', '#EC6A7C', '#E8B04B', '#F08A4B', '#7C8CF8', '#40C486'];
  var PEOPLE = ['Meera', 'Kavita Rao', 'Arjun Malhotra', 'Rohan', 'Neha Joshi'];
  var PRESETS = [501, 1100, 2100, 5100];
  var DAY = 86400000;

  function dayLabel(ts) { var d = new Date(ts); return pad(d.getDate()) + ' ' + MONTHS[d.getMonth()]; }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function inr(n) { return '₹' + Math.abs(n).toLocaleString('en-IN'); }
  function colorFor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
    return COLORS[h % COLORS.length];
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var now = Date.now();
  var occasion = { name: 'Meera’s Sangeet', person: 'Meera', at: now + 56 * DAY, planned: 0 };
  // dir: +1 received, -1 given
  var entries = [
    { who: 'Rohan', note: 'Housewarming', amt: 5100, dir: -1, at: now - 12 * DAY },
    { who: 'Arjun Malhotra', note: '', amt: 1100, dir: 1, at: now - 45 * DAY },
    { who: 'Meera', note: '', amt: 2100, dir: -1, at: now - 97 * DAY },
    { who: 'Kavita Rao', note: 'Birthday', amt: 501, dir: 1, at: now - 118 * DAY },
    { who: 'Arjun Malhotra', note: 'Birthday', amt: 1100, dir: 1, at: now - 118 * DAY },
    { who: 'Neha Joshi', note: 'Wedding', amt: 2100, dir: 1, at: now - 150 * DAY },
    { who: 'Sunita Verma', note: 'Anniversary', amt: 5100, dir: 1, at: now - 210 * DAY },
    { who: 'Kavita Rao', note: 'Diwali', amt: 501, dir: -1, at: now - 380 * DAY }
  ];
  var form = { dir: 1, amt: 0, who: '', occasion: false };
  var view = 'home';

  var hour = new Date().getHours();
  var greeting = hour < 5 ? 'Good evening,' : hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';

  var TAB_ICON = {
    home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.200 3 10.500V20a1 1 0 0 0 1 1h5.500v-6h5v6H20a1 1 0 0 0 1-1v-9.500L12 3.200Z"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="8.500" cy="8" r="3.500"/><circle cx="16.500" cy="9" r="2.800"/><path d="M2 19c0-3.300 2.900-5.500 6.500-5.500S15 15.700 15 19v1H2v-1Zm14.500-4.800c3 0 5.500 1.800 5.500 4.600V20h-5v-1c0-1.800-.7-3.400-1.900-4.600.5-.1.900-.2 1.400-.2Z"/></svg>',
    occasions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800"><rect x="3.500" y="5" width="17" height="15" rx="2.500"/><path d="M3.500 9.500h17M8 3v4M16 3v4" stroke-linecap="round"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100" stroke-linecap="round"/></svg>'
  };

  root.innerHTML =
    '<div class="sg-phone">' +
      '<div class="sg-bar"><span data-clock></span><span class="sg-island"></span><span>5G</span></div>' +
      '<div class="sg-view" data-view="home">' +
        '<p class="sg-hello">' + greeting + '</p><h4 class="sg-name">Rahul</h4><p class="sg-balance" data-balance></p>' +
        '<div class="sg-upcoming">' +
          '<div class="sg-up-top"><span>Coming up</span><b>in 56 days</b></div>' +
          '<h4 class="sg-up-title">' + occasion.name + '</h4>' +
          '<p class="sg-up-meta">' + occasion.person + ' · ' + dayLabel(occasion.at) + '</p>' +
          '<p class="sg-up-state" data-up-state>No gift yet</p>' +
          '<button type="button" class="sg-plan" data-plan>Plan a gift</button>' +
        '</div>' +
        '<div class="sg-section-head"><span>Recent</span></div>' +
        '<ul class="sg-list" data-recent></ul>' +
      '</div>' +
      '<div class="sg-view" data-view="people" hidden>' +
        '<h4 class="sg-title">People</h4><p class="sg-sub" data-people-count></p>' +
        '<ul class="sg-people" data-people></ul>' +
      '</div>' +
      '<button type="button" class="sg-fab" data-add aria-label="New shagun">+</button>' +
      '<div class="sg-tabs" role="group" aria-label="App sections">' +
        tab('home', 'Home') + tab('people', 'People') + tab('occasions', 'Occasions') + tab('settings', 'Settings') +
      '</div>' +
      '<div class="sg-toast" role="status" aria-live="polite"></div>' +
      '<div class="sg-sheet-wrap" data-sheet><div class="sg-sheet">' +
        '<div class="sg-sheet-head"><div><h4>New Shagun</h4><p>Record a gift given or received</p></div><button type="button" class="sg-close" data-close aria-label="Close">✕</button></div>' +
        '<span class="sg-prefill" data-prefill hidden>✦ Planning a gift — details pre-filled</span>' +
        '<div class="sg-dir"><button type="button" data-dir="received" aria-pressed="true">Received</button><button type="button" data-dir="given" aria-pressed="false">Given</button></div>' +
        '<label class="sg-label" for="sg-amount">Amount</label>' +
        '<div class="sg-amount"><span>₹</span><input id="sg-amount" type="number" inputmode="numeric" min="0" placeholder="0" data-amount></div>' +
        '<div class="sg-chips" data-presets>' + PRESETS.map(function (p) { return '<button type="button" data-preset="' + p + '" aria-pressed="false">' + inr(p) + '</button>'; }).join('') + '</div>' +
        '<span class="sg-label">Person</span>' +
        '<div class="sg-chips sg-persons" data-persons>' + PEOPLE.map(function (p) { return '<button type="button" data-person="' + esc(p) + '" aria-pressed="false">' + esc(p) + '</button>'; }).join('') + '</div>' +
        '<button type="button" class="sg-save" data-save disabled>Save Shagun</button>' +
      '</div></div>' +
    '</div>';

  function tab(key, label) {
    return '<button type="button" data-tab="' + key + '"' + (key === 'home' ? ' class="sg-active"' : '') + '>' + TAB_ICON[key] + '<span>' + label + '</span></button>';
  }
  function $(s) { return root.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(root.querySelectorAll(s)); }

  var el = {
    clock: $('[data-clock]'), balance: $('[data-balance]'), recent: $('[data-recent]'), people: $('[data-people]'), peopleCount: $('[data-people-count]'),
    upState: $('[data-up-state]'), plan: $('[data-plan]'), sheet: $('[data-sheet]'), prefill: $('[data-prefill]'), amount: $('[data-amount]'),
    save: $('[data-save]'), toast: $('.sg-toast'), fab: $('[data-add]')
  };

  function row(e, isNew) {
    var sub = (e.note ? esc(e.note) + ' · ' : '') + dayLabel(e.at);
    return '<li' + (isNew ? ' class="sg-new"' : '') + '><span class="sg-av" style="--av:' + colorFor(e.who) + '">' + esc(e.who.charAt(0)) + '</span>' +
      '<span class="sg-who"><strong>' + esc(e.who) + '</strong><small>' + sub + '</small></span>' +
      '<span class="sg-amt' + (e.dir < 0 ? ' sg-neg' : '') + '"><strong>' + (e.dir < 0 ? '− ' : '+ ') + inr(e.amt) + '</strong><small>' + (e.dir < 0 ? 'Given' : 'Received') + '</small></span></li>';
  }
  function render(flashFirst) {
    var net = entries.reduce(function (s, e) { return s + e.dir * e.amt; }, 0);
    el.balance.className = 'sg-balance' + (net < 0 ? ' sg-neg' : net === 0 ? ' sg-even' : '');
    el.balance.textContent = net > 0 ? 'You’ve received ' + inr(net) + ' more than you’ve given'
      : net < 0 ? 'You’ve given ' + inr(net) + ' more than you’ve received' : 'You’re even: given and received match';
    el.recent.innerHTML = entries.slice(0, 6).map(function (e, i) { return row(e, flashFirst && i === 0); }).join('');

    var byPerson = {}, order = [];
    entries.forEach(function (e) {
      if (!byPerson[e.who]) { byPerson[e.who] = { net: 0, n: 0 }; order.push(e.who); }
      byPerson[e.who].net += e.dir * e.amt; byPerson[e.who].n++;
    });
    order.sort();
    el.peopleCount.textContent = order.length + ' relationships';
    el.people.innerHTML = order.map(function (name) {
      var p = byPerson[name];
      var turn = p.net > 0 ? 'Your turn' : p.net < 0 ? 'Their turn' : 'Even';
      return '<li><span class="sg-av" style="--av:' + colorFor(name) + '">' + esc(name.charAt(0)) + '</span>' +
        '<span class="sg-who"><strong>' + esc(name) + '</strong><small>' + p.n + (p.n === 1 ? ' entry' : ' entries') + '</small></span>' +
        '<span class="sg-amt' + (p.net < 0 ? ' sg-neg' : '') + '"><strong>' + (p.net < 0 ? '− ' : '+ ') + inr(p.net) + '</strong><small>' + turn + '</small></span></li>';
    }).join('');

    if (occasion.planned) {
      el.upState.textContent = 'Gift logged · ' + inr(occasion.planned);
      el.upState.classList.add('sg-planned');
      el.plan.hidden = true;
    }
  }
  function tick() {
    var d = new Date(), h = d.getHours() % 12 || 12;
    el.clock.textContent = h + ':' + pad(d.getMinutes());
  }

  var toastTimer = null;
  function toast(text) {
    el.toast.textContent = text;
    el.toast.classList.add('sg-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.toast.classList.remove('sg-show'); }, 3200);
  }
  function show(name) {
    view = name;
    $$('.sg-view').forEach(function (v) { v.hidden = v.getAttribute('data-view') !== name; });
    $$('[data-tab]').forEach(function (b) { b.classList.toggle('sg-active', b.getAttribute('data-tab') === name); });
  }

  /* ---------- the New Shagun sheet ---------- */
  function syncForm() {
    $$('[data-dir]').forEach(function (b) { b.setAttribute('aria-pressed', (b.getAttribute('data-dir') === 'received') === (form.dir > 0) ? 'true' : 'false'); });
    $$('[data-preset]').forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-preset') === form.amt ? 'true' : 'false'); });
    $$('[data-person]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-person') === form.who ? 'true' : 'false'); });
    el.prefill.hidden = !form.occasion;
    el.save.disabled = !(form.amt > 0 && form.who);
  }
  function openSheet(prefill) {
    form = prefill ? { dir: -1, amt: 0, who: occasion.person, occasion: true } : { dir: 1, amt: 0, who: '', occasion: false };
    el.amount.value = '';
    syncForm();
    el.sheet.classList.add('sg-show');
  }
  function closeSheet() { el.sheet.classList.remove('sg-show'); }
  function save() {
    if (el.save.disabled) return;
    entries.unshift({ who: form.who, note: form.occasion ? 'Sangeet' : '', amt: form.amt, dir: form.dir, at: Date.now() });
    if (form.occasion) occasion.planned = form.amt;
    closeSheet();
    show('home');
    render(true);
    $('[data-view="home"]').scrollTop = form.occasion ? 0 : 150;
    toast((form.dir > 0 ? 'Received ' : 'Given ') + inr(form.amt) + ' · ' + form.who + ' saved');
  }

  el.amount.addEventListener('input', function () {
    form.amt = Math.max(0, Math.min(9999999, Math.floor(+el.amount.value || 0)));
    syncForm();
  });
  root.addEventListener('click', function (e) {
    if (e.target === el.sheet) { closeSheet(); return; }
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-add')) openSheet(false);
    else if (b.hasAttribute('data-plan')) openSheet(true);
    else if (b.hasAttribute('data-close')) closeSheet();
    else if (b.hasAttribute('data-save')) save();
    else if (b.hasAttribute('data-dir')) { form.dir = b.getAttribute('data-dir') === 'received' ? 1 : -1; syncForm(); }
    else if (b.hasAttribute('data-preset')) { form.amt = +b.getAttribute('data-preset'); el.amount.value = form.amt; syncForm(); }
    else if (b.hasAttribute('data-person')) { form.who = b.getAttribute('data-person'); syncForm(); }
    else if (b.hasAttribute('data-tab')) {
      var t = b.getAttribute('data-tab');
      if (t === 'home' || t === 'people') show(t);
      else toast((t === 'occasions' ? 'Occasions' : 'Settings') + ' is in the full app');
    }
  });

  render();
  tick();
  setInterval(tick, 20000);
})();
