/* ===================================================
   SANJRI YOUTH FOUNDATION — FORM VALIDATION SCRIPT
   (shared across volunteer.html, donate.html, contact.html)
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var forms = document.querySelectorAll('.syf-form');

  forms.forEach(function (form) {
    var successAlert = document.getElementById(form.getAttribute('data-success-target'));

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (form.checkValidity() === false) {
        form.classList.add('syf-form-validated');
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      form.classList.add('syf-form-validated');

      if (successAlert) {
        successAlert.classList.add('syf-alert-visible');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      form.reset();
      form.classList.remove('syf-form-validated');
    });
  });

  var closeButtons = document.querySelectorAll('.syf-alert-close');
  closeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var alertBox = btn.closest('.syf-alert-success');
      if (alertBox) {
        alertBox.classList.remove('syf-alert-visible');
      }
    });
  });

});
