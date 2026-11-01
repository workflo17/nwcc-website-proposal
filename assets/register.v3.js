// Turns the class registration form into an email or a text to the office, so several classes fit on one form with no server or account.
// A link ending in ?class=stem ticks the STEM Club box.
(function () {
  var form = document.getElementById('reg');
  if (!form) return;
  var err = document.getElementById('reg-err');
  var sent = document.getElementById('reg-sent');
  if (/[?&]class=stem(&|$)/.test(window.location.search)) {
    var box = form.querySelector('[data-preset=stem]');
    if (box) box.checked = true;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var boxes = form.querySelectorAll('input[type=checkbox]:checked');
    if (!boxes.length) {
      err.hidden = false;
      sent.hidden = true;
      return;
    }
    err.hidden = true;
    var classes = [].map.call(boxes, function (b) { return b.value; });
    var lines = [boxes[0].name + ': ' + classes.join(', ')];
    [].forEach.call(form.querySelectorAll('input:not([type=checkbox]), textarea'), function (f) {
      if (f.value) lines.push(f.name + ': ' + f.value);
    });
    sent.hidden = false;
    if (e.submitter && e.submitter.dataset.via === 'sms') {
      window.location.href = 'sms:' + form.dataset.text + '?&body=' + encodeURIComponent([form.dataset.subject].concat(lines).join('\n'));
      return;
    }
    window.location.href = 'mailto:' + form.dataset.to + '?subject=' + encodeURIComponent(form.dataset.subject) +
      '&body=' + encodeURIComponent(lines.join('\r\n'));
  });
})();
