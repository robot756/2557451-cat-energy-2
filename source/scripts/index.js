document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.header__toggle');
  const navigation = document.querySelector('.navigation');
  const iconClosed = navToggle.querySelector('.header__icon--closed');
  const iconOpened = navToggle.querySelector('.header__icon--opened');

  const originalWidth = '24px';
  const originalHeight = '24px';

  navToggle.addEventListener('click', () => {
    const isOpened = navigation.classList.toggle('opened');
    navToggle.setAttribute('aria-expanded', isOpened);
    navToggle.querySelector('span.visually-hidden').textContent = isOpened ? 'Закрыть меню' : 'Открыть меню';

    if (isOpened) {
      navToggle.style.width = '18px';
      navToggle.style.height = '18px';
    } else {
      navToggle.style.width = originalWidth;
      navToggle.style.height = originalHeight;
    }

    iconClosed.style.display = isOpened ? 'none' : 'block';
    iconOpened.style.display = isOpened ? 'block' : 'none';
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !navToggle.contains(event.target) && navigation.classList.contains('opened')) {
      navigation.classList.remove('opened');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.style.width = originalWidth;
      navToggle.style.height = originalHeight;
      iconClosed.style.display = 'block';
      iconOpened.style.display = 'none';
      navToggle.querySelector('span.visually-hidden').textContent = 'Открыть меню';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('opened')) {
      navigation.classList.remove('opened');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.style.width = originalWidth;
      navToggle.style.height = originalHeight;
      iconClosed.style.display = 'block';
      iconOpened.style.display = 'none';
      navToggle.querySelector('span.visually-hidden').textContent = 'Открыть меню';
    }
  });
});

const sliderContainer = document.querySelector('.example__container-slider');
const slider = sliderContainer.querySelector('.example__slider');
const imageLeft = sliderContainer.querySelector('.example__slider-image--left');
const imageRight = sliderContainer.querySelector('.example__slider-image--right');

let isDragging = false;
let sliderLeft = 0;

function setSliderPosition(clientX) {
  const containerRect = sliderContainer.getBoundingClientRect();
  let sliderPosition = clientX - containerRect.left;
  if (sliderPosition < 0) {
    sliderPosition = 0;
  }
  if (sliderPosition > containerRect.width) {
    sliderPosition = containerRect.width;
  }
  sliderLeft = sliderPosition;

  const percentage = (sliderLeft / containerRect.width) * 100;

  slider.style.left = `${percentage}%`;
  imageLeft.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  imageRight.style.clipPath = `inset(0 0 0 ${percentage}%)`;
}

slider.addEventListener('mousedown', () => {
  isDragging = true;
  sliderLeft = slider.offsetLeft;
});

document.addEventListener('mousemove', (event) => {
  if (!isDragging) {
    return;
  }
  setSliderPosition(event.clientX);
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

slider.addEventListener('touchstart', () => {
  isDragging = true;
  sliderLeft = slider.offsetLeft;
});

document.addEventListener('touchmove', (event) => {
  if (!isDragging) {
    return;
  }
  setSliderPosition(event.touches[0].clientX);
});

document.addEventListener('touchend', () => {
  isDragging = false;
});
