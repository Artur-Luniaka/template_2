// Cookie Bar Management
document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.getElementById("cookie-bar");
  const acceptButton = document.getElementById("accept-cookies");

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted && cookieBar) {
    // Show cookie bar after a short delay
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1000);

    // Handle accept button click
    acceptButton.addEventListener("click", function () {
      // Save to localStorage
      localStorage.setItem("cookiesAccepted", "true");

      // Hide cookie bar with animation
      cookieBar.classList.remove("show");

      // Remove from DOM after animation
      setTimeout(() => {
        if (cookieBar.parentNode) {
          cookieBar.parentNode.removeChild(cookieBar);
        }
      }, 300);
    });
  } else if (cookieBar) {
    // Remove cookie bar if already accepted
    cookieBar.parentNode.removeChild(cookieBar);
  }
});
