// Urban Street Culture JavaScript Loader
// Handles dynamic content loading and component initialization

// Urban-themed variable names for street culture vibe
let trickSequence = [];
let urbanFlowState = "loading";
let grindZoneElements = [];

// Initialize urban components when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Urban street culture website loading...");

  // Load header and footer components
  loadUrbanComponents();

  // Set current year in footer
  updateCopyrightYear();

  // Load dynamic content based on current page
  loadPageSpecificContent();

  // Initialize form handlers
  initializeFormHandlers();
});

// Load header and footer components dynamically
async function loadUrbanComponents() {
  try {
    // Load header
    const headerResponse = await fetch("header-scooter.html");
    const headerContent = await headerResponse.text();
    document.getElementById("header-placeholder").innerHTML = headerContent;

    // Load footer
    const footerResponse = await fetch("footer-scooter.html");
    const footerContent = await footerResponse.text();
    document.getElementById("footer-placeholder").innerHTML = footerContent;

    // Initialize mobile menu AFTER header is loaded
    initializeBurgerMenu();

    console.log("✅ Urban components loaded successfully");
  } catch (error) {
    console.error("❌ Error loading urban components:", error);
    // Fallback: try to initialize burger menu anyway
    setTimeout(initializeBurgerMenu, 100);
  }
}

// Initialize mobile burger menu functionality
function initializeBurgerMenu() {
  const burgerButton = document.getElementById("burgerButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burgerButton && mobileMenu) {
    burgerButton.addEventListener("click", function () {
      burgerButton.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        burgerButton.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !burgerButton.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        burgerButton.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });
  }
}

// Update copyright year dynamically
function updateCopyrightYear() {
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
}

// Load page-specific content from JSON files
async function loadPageSpecificContent() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  try {
    switch (currentPage) {
      case "index.html":
        await loadHomePageContent();
        break;
      case "urban-updates.html":
        await loadUpdatesPageContent();
        break;
      case "support-contact.html":
        await loadContactPageContent();
        break;
    }
  } catch (error) {
    console.error("❌ Error loading page content:", error);
  }
}

// Load content for homepage
async function loadHomePageContent() {
  try {
    // Load tutorial content
    const tutorialResponse = await fetch("data/tutorial-data.json");
    const tutorialData = await tutorialResponse.json();
    renderTutorialContent(tutorialData);

    // Load shoutouts content
    const shoutoutsResponse = await fetch("data/shoutouts-data.json");
    const shoutoutsData = await shoutoutsResponse.json();
    renderShoutoutsContent(shoutoutsData);
  } catch (error) {
    console.error("❌ Error loading homepage content:", error);
    showLoadingError();
  }
}

// Load content for updates page
async function loadUpdatesPageContent() {
  try {
    // Load game updates
    const updatesResponse = await fetch("data/updates-data.json");
    const updatesData = await updatesResponse.json();
    renderUpdatesContent(updatesData);

    // Load freestyle feed
    const feedResponse = await fetch("data/feed-data.json");
    const feedData = await feedResponse.json();
    renderFeedContent(feedData);
  } catch (error) {
    console.error("❌ Error loading updates content:", error);
    showLoadingError();
  }
}

// Load content for contact page
async function loadContactPageContent() {
  try {
    const contactResponse = await fetch("data/contact-data.json");
    const contactData = await contactResponse.json();
    renderContactContent(contactData);
  } catch (error) {
    console.error("❌ Error loading contact content:", error);
    showLoadingError();
  }
}

// Render tutorial content with urban styling
function renderTutorialContent(data) {
  const container = document.getElementById("tutorial-content");
  if (!container) return;

  // Array of trick icons for different tutorials
  const trickIcons = ["🎯", "⚡", "🏆", "🔥", "🎮", "💪"];

  container.innerHTML = data.tutorials
    .map(
      (tutorial, index) => `
        <div class="tutorial-card">
          <div class="tutorial-icon">${
            trickIcons[index % trickIcons.length]
          }</div>
          <h3>${tutorial.title}</h3>
          <p>${tutorial.description}</p>
          <div class="trick-difficulty">
            <span class="difficulty-badge">${tutorial.difficulty}</span>
          </div>
        </div>
    `
    )
    .join("");
}

// Render shoutouts content with street style
function renderShoutoutsContent(data) {
  const container = document.getElementById("shoutouts-content");
  if (!container) return;

  // Limit to only 3 reviews as requested
  const limitedShoutouts = data.shoutouts.slice(0, 3);

  container.innerHTML = limitedShoutouts
    .map(
      (shoutout) => `
        <div class="shoutout-card">
          <div class="shoutout-background">
            <img src="assets/scooter-section.jpg" alt="Scooter Background" />
          </div>
          <div class="shoutout-overlay"></div>
          <div class="shoutout-content">
            <div class="shoutout-header">
              <div class="shoutout-name">${shoutout.author}</div>
              <div class="shoutout-title">Pro Rider</div>
            </div>
            <div class="shoutout-text">"${shoutout.message}"</div>
            <div class="shoutout-rating">
              <span class="star">⭐</span>
              <span class="star">⭐</span>
              <span class="star">⭐</span>
              <span class="star">⭐</span>
              <span class="star">⭐</span>
            </div>
          </div>
        </div>
    `
    )
    .join("");
}

// Render updates content with urban flow
function renderUpdatesContent(data) {
  const container = document.getElementById("updates-content");
  if (!container) return;

  container.innerHTML = data.updates
    .map(
      (update) => `
        <div class="update-card">
            <div class="date-badge">${update.date}</div>
            <h3>${update.title}</h3>
            <p>${update.description}</p>
            <div class="update-type">${update.type}</div>
        </div>
    `
    )
    .join("");
}

// Render feed content with street culture
function renderFeedContent(data) {
  const container = document.getElementById("feed-content");
  if (!container) return;

  container.innerHTML = data.feeds
    .map(
      (feed) => `
        <div class="feed-card">
            <div class="author-name">${feed.author}</div>
            <h3>${feed.title}</h3>
            <p>${feed.content}</p>
            <div class="date-badge">${feed.date}</div>
        </div>
    `
    )
    .join("");
}

// Render contact content
function renderContactContent(data) {
  const emailElement = document.getElementById("contact-email");
  const phoneElement = document.getElementById("contact-phone");
  const locationElement = document.getElementById("contact-location");

  if (emailElement) emailElement.textContent = data.email;
  if (phoneElement) phoneElement.textContent = data.phone;
  if (locationElement) locationElement.textContent = data.location;
}

// Initialize form handlers with urban validation
function initializeFormHandlers() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmission);

    // Add input event listeners to clear validation errors
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("input", function () {
        const formGroup = this.closest(".form-group");
        if (formGroup.classList.contains("error")) {
          formGroup.classList.remove("error");
        }
      });
    });
  }
}

// Handle contact form submission with street style
async function handleContactSubmission(event) {
  event.preventDefault();

  // Clear previous validation errors
  clearValidationErrors();

  const formData = new FormData(event.target);
  const submissionData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  // Validate form fields
  if (!validateFormFields(submissionData)) {
    return;
  }

  // Show processing overlay
  showProcessingOverlay();

  // Simulate processing delay
  await simulateProcessing();

  // Hide processing overlay
  hideProcessingOverlay();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Show success notification
  showNotification(
    "Message sent successfully! We'll get back to you soon.",
    "success"
  );

  // Reset form
  event.target.reset();
}

// Validate form fields with detailed error messages
function validateFormFields(data) {
  let isValid = true;

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    showFieldError("name", "Please enter your name");
    isValid = false;
  }

  // Validate phone
  if (!data.phone || data.phone.trim().length === 0) {
    showFieldError("phone", "Please enter your phone number");
    isValid = false;
  }

  // Validate message
  if (!data.message || data.message.trim().length === 0) {
    showFieldError("message", "Please enter your message");
    isValid = false;
  }

  return isValid;
}

// Show field-specific error
function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const formGroup = field.closest(".form-group");
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  errorMessage.textContent = message;
}

// Clear all validation errors
function clearValidationErrors() {
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    group.classList.remove("error");
  });
}

// Show processing overlay
function showProcessingOverlay() {
  const overlay = document.getElementById("processingOverlay");
  overlay.classList.add("active");
}

// Hide processing overlay
function hideProcessingOverlay() {
  const overlay = document.getElementById("processingOverlay");
  overlay.classList.remove("active");
}

// Simulate processing delay
function simulateProcessing() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000); // 2 second delay
  });
}

// Show notification
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");

  notification.textContent = message;
  notification.className = `notification ${type}`;

  // Make visible and trigger reflow to ensure transition works
  notification.style.visibility = "visible";
  notification.offsetHeight;

  // Show notification
  notification.classList.add("show");

  // Hide notification after 4 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    // Hide completely after transition
    setTimeout(() => {
      notification.style.visibility = "hidden";
    }, 500);
  }, 4000);
}

// Show loading error with urban style
function showLoadingError() {
  const containers = [
    "tutorial-content",
    "shoutouts-content",
    "updates-content",
    "feed-content",
  ];

  containers.forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
                <div class="error-message">
                    Failed to load content. Please refresh the page.
                </div>
            `;
    }
  });
}

// Urban utility functions
function launchRampBoost() {
  console.log("🚀 Launching ramp boost...");
  // Add urban bounce animation to play button
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.classList.add("urban-bounce");
    setTimeout(() => {
      playButton.classList.remove("urban-bounce");
    }, 1000);
  }

  // In real app, this would launch the game
  alert("Game launching... Get ready for some sick tricks!");
}

// Export functions for use in other scripts
window.urbanLoader = {
  loadUrbanComponents,
  initializeBurgerMenu,
  loadPageSpecificContent,
  launchRampBoost,
};
