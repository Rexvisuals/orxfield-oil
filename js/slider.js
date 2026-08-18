const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let currentIndex = 0;
let slideInterval;

// 1. Generate dots dynamically based on slide count
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// 2. Core function to update slide position and dot status
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetTimer();
}

// 3. Auto-slide timer management
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3000);
}

function resetTimer() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// 4. Event Listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetTimer();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetTimer();
});

// Initialize
startAutoSlide();