function handleDestinationChange() {
  const destinationSelect = document.getElementById("destinationSelect");
  const defaultPageCheckbox = document.getElementById("makeDefaultCheckbox");

  if (!destinationSelect || !defaultPageCheckbox) return;

  const isFirstOptionSelected = destinationSelect.selectedIndex === 0;

  defaultPageCheckbox.disabled = isFirstOptionSelected;
  defaultPageCheckbox.checked = false;
}

const hideError = () => {
  const errorContainer = document.getElementById("serverSideError");
  if (errorContainer && errorContainer.style.display === "block") {
    errorContainer.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const mainForm = document.getElementById("mainForm");
  const userIdInput = document.getElementById("userIdInput");
  const passwordInput = document.getElementById("passwordInput");
  const loginButton = document.getElementById("loginBtn");
  const revealPasswordIcon = document.querySelector(".iconReveal");
  const destinationSelect = document.getElementById("destinationSelect");
  const defaultPageCheckbox = document.getElementById("makeDefaultCheckbox");

  if (destinationSelect) {
    destinationSelect.addEventListener("change", handleDestinationChange);
  }

  const toggleButtonState = () => {
    const isUserIdValid = userIdInput.value.trim().length > 0;
    const isPasswordValid = passwordInput.value.trim().length > 0;

    loginButton.disabled = !(isUserIdValid && isPasswordValid);
  };

  userIdInput.addEventListener("input", toggleButtonState);
  passwordInput.addEventListener("input", toggleButtonState);

  if (revealPasswordIcon) {
    revealPasswordIcon.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      revealPasswordIcon.classList.toggle("isVisible");
    });
  }

  destinationSelect.addEventListener("change", function () {
    const isDefaultSelected = this.selectedIndex === 0;

    defaultPageCheckbox.disabled = isDefaultSelected;

    if (isDefaultSelected) {
      defaultPageCheckbox.checked = false;
    }
  });

  mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (loginButton.disabled) return;
    const saveIdCheckbox = document.getElementById("saveUserIdCheckbox");
    const loginData = {
      userId: userIdInput.value,
      password: passwordInput.value,
      saveId: document.getElementById("saveUserIdCheckbox").checked,
      destination: destinationSelect.value,
      makeDefault: defaultPageCheckbox.checked,
    };

    console.log("Attempting Login with:", loginData);
    // if getting error
    const errorContainer = document.getElementById("serverSideError");
    if (errorContainer) {
      errorContainer.style.display = "block";
    }
    userIdInput.value = "";
    passwordInput.value = "";
    if (saveIdCheckbox) {
      saveIdCheckbox.checked = false;
    }

    if (destinationSelect) {
      destinationSelect.selectedIndex = 0;
    }
    if (defaultPageCheckbox) {
      defaultPageCheckbox.checked = false;

      handleDestinationChange();
    }
    toggleButtonState();
  });

  userIdInput.addEventListener("input", hideError);
  passwordInput.addEventListener("input", hideError);
});
