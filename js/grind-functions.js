// Urban Street Culture Grind Functions
// Additional JavaScript functionality with street culture theme

// Urban-themed variables for street culture vibe
let streetFlowVelocity = 0;
let trickComboCounter = 0;
let urbanVibeLevel = 100;
let railGrindProgress = 0;

// Initialize urban street functions
document.addEventListener("DOMContentLoaded", function () {
  console.log("🛴 Grind functions loading...");

  // Initialize urban interactions
  initializeStreetInteractions();

  // Set up urban scroll effects
  setupUrbanScrollEffects();

  // Initialize trick animations
  initializeTrickAnimations();

  console.log("✅ Grind functions loaded successfully");
});

// Initialize street culture interactions
function initializeStreetInteractions() {
  // Add hover effects to urban elements
  const urbanElements = document.querySelectorAll(
    ".feature-card, .challenge-card, .mod-card"
  );

  urbanElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
      addGrindSparkEffect(this);
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      removeGrindSparkEffect(this);
    });
  });

  // Add click effects to urban buttons
  const urbanButtons = document.querySelectorAll(
    ".play-button, .submit-button"
  );

  urbanButtons.forEach((button) => {
    button.addEventListener("click", function () {
      executeTrickCombo(this);
    });
  });
}

// Add grind spark effect to elements
function addGrindSparkEffect(element) {
  const spark = document.createElement("div");
  spark.className = "grind-spark";
  spark.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, rgba(241, 196, 15, 0.3), transparent);
        pointer-events: none;
        z-index: 1;
        animation: grindSpark 0.6s ease-out;
    `;

  element.style.position = "relative";
  element.appendChild(spark);

  setTimeout(() => {
    if (spark.parentNode) {
      spark.parentNode.removeChild(spark);
    }
  }, 600);
}

// Remove grind spark effect
function removeGrindSparkEffect(element) {
  const spark = element.querySelector(".grind-spark");
  if (spark) {
    spark.remove();
  }
}

// Execute trick combo animation
function executeTrickCombo(element) {
  trickComboCounter++;

  // Add urban bounce effect
  element.classList.add("urban-bounce");

  // Create trick particles
  createTrickParticles(element);

  // Update urban vibe level
  updateUrbanVibeLevel(10);

  setTimeout(() => {
    element.classList.remove("urban-bounce");
  }, 1000);
}

// Create trick particles for visual effect
function createTrickParticles(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "trick-particle";
    particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 4px;
            height: 4px;
            background: var(--speed-rush);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleExplosion 1s ease-out forwards;
        `;

    document.body.appendChild(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1000);
  }
}

// Update urban vibe level
function updateUrbanVibeLevel(increment) {
  urbanVibeLevel = Math.min(100, urbanVibeLevel + increment);

  // Update visual feedback
  const vibeIndicator = document.querySelector(".urban-vibe-indicator");
  if (vibeIndicator) {
    vibeIndicator.style.width = `${urbanVibeLevel}%`;
    vibeIndicator.style.background = `hsl(${urbanVibeLevel * 1.2}, 70%, 50%)`;
  }
}

// Setup urban scroll effects
function setupUrbanScrollEffects() {
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";

    // Update street flow velocity
    streetFlowVelocity = Math.abs(scrollTop - lastScrollTop);

    // Add urban parallax effect
    applyUrbanParallax(scrollTop);

    // Update rail grind progress
    updateRailGrindProgress(scrollTop);

    lastScrollTop = scrollTop;
  });
}

// Apply urban parallax effect
function applyUrbanParallax(scrollTop) {
  const parallaxElements = document.querySelectorAll(
    ".hero-background, .trick-overlay"
  );

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    const yPos = -(scrollTop * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// Update rail grind progress
function updateRailGrindProgress(scrollTop) {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const maxScroll = documentHeight - windowHeight;

  railGrindProgress = (scrollTop / maxScroll) * 100;

  // Update progress indicator if exists
  const progressBar = document.querySelector(".rail-grind-progress");
  if (progressBar) {
    progressBar.style.width = `${railGrindProgress}%`;
  }
}

// Initialize trick animations
function initializeTrickAnimations() {
  // Add intersection observer for trick animations
  const trickObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("trick-animate");
          trickObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe trick elements
  const trickElements = document.querySelectorAll(
    ".tutorial-card, .shoutout-card, .update-card, .feed-card"
  );
  trickElements.forEach((element) => {
    trickObserver.observe(element);
  });
}

// Urban utility functions
// performStreetFlip function removed

function activateGrindMode() {
  console.log("⚡ Activating grind mode...");

  // Add grind mode visual effect
  document.body.classList.add("grind-mode");

  setTimeout(() => {
    document.body.classList.remove("grind-mode");
  }, 3000);
}

function executeUrbanCombo() {
  console.log("🎯 Executing urban combo...");

  // Chain multiple urban effects
  // performStreetFlip() removed

  setTimeout(() => {
    activateGrindMode();
  }, 300);

  setTimeout(() => {
    launchRampBoost();
  }, 600);
}

// Urban performance monitoring
function monitorUrbanPerformance() {
  const performanceData = {
    trickComboCounter,
    urbanVibeLevel,
    streetFlowVelocity,
    railGrindProgress,
  };

  console.log("📊 Urban Performance Stats:", performanceData);
  return performanceData;
}

// Urban event handlers
function handleUrbanClick(event) {
  const element = event.target;

  // Add urban ripple effect
  createUrbanRipple(event);

  // Update trick combo
  trickComboCounter++;

  // Log urban interaction
  console.log(`🎮 Urban click on: ${element.tagName}`);
}

// Create urban ripple effect
function createUrbanRipple(event) {
  const ripple = document.createElement("div");
  ripple.className = "urban-ripple";

  const rect = event.target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: urbanRipple 0.6s ease-out;
    `;

  event.target.style.position = "relative";
  event.target.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Urban keyboard shortcuts
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "g":
    case "G":
      activateGrindMode();
      break;
    case "f":
    case "F":
      // performStreetFlip() removed
      break;
    case "c":
    case "C":
      executeUrbanCombo();
      break;
    case "p":
    case "P":
      monitorUrbanPerformance();
      break;
  }
});

// Add CSS animations dynamically
const urbanStyles = `
    @keyframes particleExplosion {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(360deg);
            opacity: 0;
        }
    }
    
    // streetFlip animation removed
    
    @keyframes urbanRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .grind-mode {
        filter: hue-rotate(90deg) saturate(1.5);
        transition: filter 0.3s ease;
    }
    
    .trick-animate {
        animation: trickEntrance 0.8s ease-out;
    }
    
    @keyframes trickEntrance {
        0% {
            opacity: 0;
            transform: translateY(50px) rotateX(20deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
`;

// Inject urban styles
const styleSheet = document.createElement("style");
styleSheet.textContent = urbanStyles;
document.head.appendChild(styleSheet);

// Export urban functions
window.urbanGrind = {
  // performStreetFlip removed
  activateGrindMode,
  executeUrbanCombo,
  monitorUrbanPerformance,
  handleUrbanClick,
  updateUrbanVibeLevel,
};
