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

  // Initial State: Button ko disable rakhein
  loginButton.disabled = true;

  const toggleButtonState = () => {
    const userIdValue = userIdInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Agar dono mein text hai to disabled = false, warna true
    loginButton.disabled = !(userIdValue && passwordValue);
  };

  if (userIdInput && passwordInput) {
    userIdInput.addEventListener("input", () => {
      toggleButtonState();
      hideError();
    });

    passwordInput.addEventListener("input", () => {
      toggleButtonState();
      hideError();
    });
  }

  if (destinationSelect) {
    destinationSelect.addEventListener("change", handleDestinationChange);
  }

  if (revealPasswordIcon) {
    revealPasswordIcon.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      revealPasswordIcon.classList.toggle("isVisible");
    });
  }

  mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (loginButton.disabled) return;

    const saveIdCheckbox = document.getElementById("saveUserIdCheckbox");
    const loginData = {
      userId: userIdInput.value,
      password: passwordInput.value,
      saveId: saveIdCheckbox ? saveIdCheckbox.checked : false,
      destination: destinationSelect ? destinationSelect.value : "",
      makeDefault: defaultPageCheckbox ? defaultPageCheckbox.checked : false,
    };

    console.log("Attempting Login with:", loginData);

    const errorContainer = document.getElementById("serverSideError");
    if (errorContainer) {
      errorContainer.style.display = "block";
    }

    // Reset Form
    userIdInput.value = "";
    passwordInput.value = "";

    if (saveIdCheckbox) saveIdCheckbox.checked = false;
    if (destinationSelect) destinationSelect.selectedIndex = 0;
    if (defaultPageCheckbox) {
      defaultPageCheckbox.checked = false;
      handleDestinationChange();
    }

    // Submit ke baad button wapas disable karein
    toggleButtonState();
  });
});
