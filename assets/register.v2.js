// Turns the class registration form into an email to the office, so several classes fit on one form with no server or account.
// A link ending in ?class=stem ticks the STEM Club box.
(function () {
  var form = document.getElementById('reg');
  if (!form) return;
  var err = document.getElementById('reg-err');
  if (/[?&]class=stem(&|$)/.test(window.location.search)) {
    var box = form.querySelector('[data-preset=stem]');
    if (box) box.checked = true;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var boxes = form.querySelectorAll('input[type=checkbox]:checked');
    if (!boxes.length) {
      err.hidden = false;
      return;
    }
    err.hidden = true;
    var classes = [].map.call(boxes, function (b) { return b.value; });
    var lines = [boxes[0].name + ': ' + classes.join(', ')];
    [].forEach.call(form.querySelectorAll('input:not([type=checkbox]), textarea'), function (f) {
      if (f.value) lines.push(f.name + ': ' + f.value);
    });
    window.location.href = 'mailto:' + form.dataset.to + '?subject=' + encodeURIComponent(form.dataset.subject) +
      '&body=' + encodeURIComponent(lines.join('\r\n'));
  });
})();
