const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu a");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}

const slides = document.querySelectorAll(".slide");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("sliderDots");
const currentSlideText = document.getElementById("currentSlide");
const totalSlidesText = document.getElementById("totalSlides");
const slideTitle = document.getElementById("slideTitle");
const slideText = document.getElementById("slideText");
const sliderStage = document.querySelector(".slider-stage");

let currentIndex = 0;
let autoPlay;

function formatNumber(number) {
  return String(number + 1).padStart(2, "0");
}

function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    dot.setAttribute("aria-label", `Ir para o slide ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateSliderContent() {
  const activeSlide = slides[currentIndex];
  const title = activeSlide.dataset.title || "";
  const text = activeSlide.dataset.text || "";

  if (slideTitle) slideTitle.textContent = title;
  if (slideText) slideText.textContent = text;
  if (currentSlideText) currentSlideText.textContent = formatNumber(currentIndex);
}

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  updateSliderContent();
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  updateSlider();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function startAutoPlay() {
  autoPlay = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
}

function restartAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

if (slides.length > 0) {
  if (totalSlidesText) {
    totalSlidesText.textContent = String(slides.length).padStart(2, "0");
  }

  createDots();
  updateSlider();
  startAutoPlay();

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoPlay();
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoPlay();
    });
  }

  if (sliderStage) {
    sliderStage.addEventListener("mouseenter", stopAutoPlay);
    sliderStage.addEventListener("mouseleave", startAutoPlay);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
      restartAutoPlay();
    }

    if (event.key === "ArrowLeft") {
      prevSlide();
      restartAutoPlay();
    }
  });
}