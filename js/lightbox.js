// Lightbox functionality for image galleries

// Create lightbox container if it doesn't exist
function createLightboxContainer() {
  if (!document.getElementById("lightboxContainer")) {
    const lightboxContainer = document.createElement("div");
    lightboxContainer.id = "lightboxContainer";
    lightboxContainer.className = "lightbox-container";
    lightboxContainer.innerHTML = `
              <div class="lightbox-content">
                  <span class="lightbox-close">&times;</span>
                  <img class="lightbox-image" src="/placeholder.svg" alt="">
                  <div class="lightbox-caption"></div>
                  <button class="lightbox-prev">&lt;</button>
                  <button class="lightbox-next">&gt;</button>
              </div>
          `;
    document.body.appendChild(lightboxContainer);

    // Add event listeners
    const closeBtn = lightboxContainer.querySelector(".lightbox-close");
    closeBtn.addEventListener("click", closeLightbox);

    lightboxContainer.addEventListener("click", function (e) {
      if (e.target === this) {
        closeLightbox();
      }
    });

    const prevBtn = lightboxContainer.querySelector(".lightbox-prev");
    const nextBtn = lightboxContainer.querySelector(".lightbox-next");

    prevBtn.addEventListener("click", showPrevImage);
    nextBtn.addEventListener("click", showNextImage);

    // Keyboard navigation
    document.addEventListener("keydown", handleKeyDown);
  }

  return document.getElementById("lightboxContainer");
}

// Current gallery and index
let currentGallery = [];
let currentIndex = 0;

// Open lightbox
function openLightbox(gallery, index) {
  const lightbox = createLightboxContainer();
  currentGallery = gallery;
  currentIndex = index;

  // Show lightbox
  lightbox.style.display = "flex";
  setTimeout(() => {
    lightbox.classList.add("active");
  }, 10);

  // Prevent scrolling
  document.body.style.overflow = "hidden";

  // Show image
  showImage(index);
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightboxContainer");
  lightbox.classList.remove("active");

  setTimeout(() => {
    lightbox.style.display = "none";
    // Enable scrolling
    document.body.style.overflow = "";
  }, 300);
}

// Show image
function showImage(index) {
  const lightbox = document.getElementById("lightboxContainer");
  const image = lightbox.querySelector(".lightbox-image");
  const caption = lightbox.querySelector(".lightbox-caption");

  const item = currentGallery[index];

  image.src = item.src;
  image.alt = item.alt || "";
  caption.textContent = item.alt || "";
}

// Show previous image
function showPrevImage() {
  currentIndex =
    (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showImage(currentIndex);
}

// Show next image
function showNextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showImage(currentIndex);
}

// Handle keyboard navigation
function handleKeyDown(e) {
  if (
    !document.getElementById("lightboxContainer").classList.contains("active")
  ) {
    return;
  }

  switch (e.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      showPrevImage();
      break;
    case "ArrowRight":
      showNextImage();
      break;
  }
}

// Initialize lightbox for a gallery
function initLightbox(gallerySelector) {
  const galleryItems = document.querySelectorAll(gallerySelector);

  if (!galleryItems.length) return;

  // Create gallery array
  const gallery = Array.from(galleryItems).map((item) => {
    const img = item.querySelector("img");
    return {
      src: img.src,
      alt: img.alt,
    };
  });

  // Add click event to each item
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openLightbox(gallery, index);
    });
  });
}
