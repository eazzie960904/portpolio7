let nav = document.querySelector("header nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});

const button = document.querySelector("button");
const dialog = document.querySelector("dialog");

button.addEventListener("click", () => {
  dialog.showModal();
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const originalSlides = document.querySelectorAll(".slides li");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  const slideWidth = 240;
  const slideGap = 20;
  const slideSize = slideWidth + slideGap;
  const slideCount = originalSlides.length;
  const slidePadding = 120; // wrapper 좌우 패딩

  let currentIdx = 0;
  let isAnimating = false;

  // 1. 앞뒤 클론 만들기
  function makeClones() {
    for (let i = 0; i < slideCount; i++) {
      const clone = originalSlides[i].cloneNode(true);
      clone.classList.add("clone");
      slides.appendChild(clone);
    }
    for (let i = slideCount - 1; i >= 0; i--) {
      const clone = originalSlides[i].cloneNode(true);
      clone.classList.add("clone");
      slides.prepend(clone);
    }
  }

  // 2. 슬라이드 전체 너비 설정
  function updateWidth() {
    const totalSlides = slides.querySelectorAll("li").length;
    const newWidth = slideWidth * totalSlides + slideGap * (totalSlides - 1);
    slides.style.width = `${newWidth}px`;
  }

  // 3. 초기 위치 세팅 (패딩 보정)
  function setInitialPos() {
    const offset = slideCount * slideSize - slidePadding;
    slides.style.transform = `translateX(-${offset}px)`;
  }

  // 4. 슬라이드 이동 함수 (패딩 보정)
  function moveSlide(idx) {
    if (isAnimating) return;
    isAnimating = true;
    currentIdx = idx;

    const offset = (slideCount + currentIdx) * slideSize - slidePadding;
    slides.style.transition = "transform 0.5s ease";
    slides.style.transform = `translateX(-${offset}px)`;
  }

  // 5. transition 끝나면 무한루프 위치 보정
  slides.addEventListener("transitionend", () => {
    if (currentIdx >= slideCount) {
      slides.style.transition = "none";
      currentIdx = 0;
      const offset = slideCount * slideSize - slidePadding;
      slides.style.transform = `translateX(-${offset}px)`;
    } else if (currentIdx < 0) {
      slides.style.transition = "none";
      currentIdx = slideCount - 1;
      const offset = (slideCount * 2 - 1) * slideSize - slidePadding;
      slides.style.transform = `translateX(-${offset}px)`;
    }
    isAnimating = false;
  });

  // 6. 버튼 이벤트
  prevBtn.addEventListener("click", () => moveSlide(currentIdx - 1));
  nextBtn.addEventListener("click", () => moveSlide(currentIdx + 1));

  // 초기 실행
  makeClones();
  updateWidth();
  setInitialPos();
});
