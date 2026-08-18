const menu=document.querySelector('.menu'),links=document.querySelector('.nav-links');menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'×':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;document.querySelectorAll('.counter').forEach(el=>{const target=+el.dataset.target,duration=1300,start=performance.now();const tick=now=>{const value=Math.min(target,Math.floor((now-start)/duration*target));el.textContent=value+(target===100?'%':target===24?'/7':'+');if(value<target)requestAnimationFrame(tick)};requestAnimationFrame(tick)});countObserver.disconnect()}),{threshold:.5});const stat=document.querySelector('.network-stat');if(stat)countObserver.observe(stat);document.getElementById('year').textContent=new Date().getFullYear();

    // slide

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

// CONTACT US FORM POP UP
// const modal=document.getElementById('contactModal'),dialog=modal.querySelector('.contact-dialog'),closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};document.querySelectorAll('.open-contact').forEach(button=>button.addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('input').focus()}));modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.querySelector('.form-success').classList.add('show');e.currentTarget.reset()});

// CONTACT US FORM POP UP
const modal = document.getElementById('contactModal');
const dialog = modal.querySelector('.contact-dialog');

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Open modal on trigger button click
document.querySelectorAll('.open-contact').forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('input')?.focus();
  });
});

// Close modal on close button click
modal.querySelector('.modal-close').addEventListener('click', closeModal);

// Close modal on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  e.currentTarget.querySelector('.form-success').classList.add('show');
  e.currentTarget.reset();
});