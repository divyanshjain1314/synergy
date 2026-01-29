document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".navbar-toggle");
  const navCollapse = document.querySelector(".navbar-collapse");

  if (navToggle && navCollapse) {
    navToggle.addEventListener("click", function () {
      navCollapse.classList.toggle("in");
    });
  }
  const form = document.querySelector(".banking-form");
  const logonInput = document.getElementById("logonId");
  const securityInput = document.getElementById("securityCode");
  const errorAlert = document.querySelector(".error-alert");

  const togglePassword = document.querySelector(".toggle-password");
  togglePassword.addEventListener("click", function () {
    const type =
      securityInput.getAttribute("type") === "password" ? "text" : "password";
    securityInput.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

  [logonInput, securityInput].forEach((input) => {
    input.addEventListener("focus", function () {
      resetValidation(this);

      const errorsVisible = document.querySelectorAll(
        ".error-text:not(.hidden)",
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
      showError(logonInput);
      isValid = false;
    }

    if (securityInput.value.trim() === "") {
      showError(securityInput);
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      errorAlert.style.display = "block";
    }
  });

  function showError(input) {
    const group = input.closest(".form-group");
    const errorText = group.querySelector(".error-text");

    group.classList.add("has-error");
    input.classList.add("error-input");
    if (errorText) {
      errorText.classList.remove("hidden");
    }
  }

  function resetValidation(input) {
    const group = input.closest(".form-group");
    const errorText = group.querySelector(".error-text");

    group.classList.remove("has-error");
    input.classList.remove("error-input");
    if (errorText) {
      errorText.classList.add("hidden");
    }
  }
});
