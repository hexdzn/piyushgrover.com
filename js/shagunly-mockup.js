/* Shagunly case study — interactive device/screen viewer */
(function () {
  var mockup = document.querySelector('.device-mockup');
  if (!mockup) return;

  var deviceBtns = mockup.querySelectorAll('[data-device-btn]');
  var screenBtns = mockup.querySelectorAll('[data-screen-btn]');
  var images = mockup.querySelectorAll('.device-screen img');
  var captions = mockup.querySelectorAll('.mockup-caption span');

  function setDevice(device) {
    mockup.setAttribute('data-device', device);
    deviceBtns.forEach(function (b) {
      var active = b.getAttribute('data-device-btn') === device;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setScreen(screen) {
    mockup.setAttribute('data-screen', screen);
    screenBtns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-screen-btn') === screen);
    });
    images.forEach(function (img) {
      img.classList.toggle('is-active', img.getAttribute('data-screen') === screen);
    });
    captions.forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-caption') === screen);
    });
  }

  deviceBtns.forEach(function (b) {
    b.addEventListener('click', function () { setDevice(b.getAttribute('data-device-btn')); });
  });
  screenBtns.forEach(function (b) {
    b.addEventListener('click', function () { setScreen(b.getAttribute('data-screen-btn')); });
  });
})();
