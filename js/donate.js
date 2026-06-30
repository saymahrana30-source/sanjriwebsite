/* ===================================================
   SANJRI YOUTH FOUNDATION — DONATE PAGE SCRIPT
   (amount selector buttons, used only on donate.html)
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var amountButtons = document.querySelectorAll('.syf-amount-btn');
  var amountInput = document.getElementById('donAmount');

  if (!amountButtons.length || !amountInput) return;

  amountButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var amount = btn.getAttribute('data-amount');

      amountButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      amountInput.value = amount;
      amountInput.dispatchEvent(new Event('input'));
    });
  });

  /* If the person types a custom amount manually, deselect the preset buttons */
  amountInput.addEventListener('input', function () {
    var matched = false;
    amountButtons.forEach(function (b) {
      if (b.getAttribute('data-amount') === amountInput.value) {
        matched = true;
      }
    });
    if (!matched) {
      amountButtons.forEach(function (b) { b.classList.remove('active'); });
    }
  });

});
