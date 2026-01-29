document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".banking-form");
  const logonInput = document.querySelector('input[name="Username"]');
  const securityInput = document.querySelector('input[name="Password"]');
  const errorAlert = document.querySelector(".validation-summary-errors");

  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.querySelector('input[name="Password"]');

  togglePassword.addEventListener("click", function () {
    const icon = this.querySelector(".fa");
    const isPassword = passwordInput.getAttribute("type") === "password";

    if (isPassword) {
      passwordInput.setAttribute("type", "text");
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    } else {
      passwordInput.setAttribute("type", "password");
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    }
  });

  [logonInput, securityInput].forEach((input) => {
    input.addEventListener("focus", function () {
      resetValidation(this);

      const errorsVisible = document.querySelectorAll(
        ".field-validation-error[style*='display: block']",
      ).length;

      if (errorsVisible === 0) {
        errorAlert.style.display = "none";
      }
    });
  });

  form.addEventListener("submit", function (e) {
    let isValid = true;

    resetValidation(logonInput);
    resetValidation(securityInput);
    errorAlert.style.display = "none";

    if (logonInput.value.trim() === "") {
      showError(logonInput, "Logon ID field is required.");
      isValid = false;
    }

    if (securityInput.value.trim() === "") {
      showError(securityInput, "Security Code field is required.");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      errorAlert.style.display = "block";
    }
  });

  function showError(input, message) {
    const errorSpan = document.getElementById(
      input.getAttribute("aria-describedby"),
    );

    input.classList.add("input-validation-error");
    input.setAttribute("aria-invalid", "true");

    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
    }
  }

  function resetValidation(input) {
    const errorSpan = document.getElementById(
      input.getAttribute("aria-describedby"),
    );

    input.classList.remove("input-validation-error");
    input.setAttribute("aria-invalid", "false");

    if (errorSpan) {
      errorSpan.style.display = "none";
      errorSpan.textContent = "";
    }
  }
});
