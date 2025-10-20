// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" }, delay: 1.2 });

  tl.from(".row", { x: -100, opacity: 0 }, "-=0.6");
  tl.from("button", { x: -100, opacity: 0 }, "-=0.6");
  tl.from(".banner-left .inside", { x: -100, opacity: 0 }, "-=0.6");
  tl.from(".banner-right img", { x: -100, opacity: 0 }, "-=0.6");

  tl.from(".stats .ingredients", { x: -100, opacity: 0 }, "-=0.6");
});

// SCROLL

gsap.from(".monster-swiper h1", {
  scrollTrigger: {
    trigger: ".monster-swiper",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});

gsap.from(".nutrition", {
  scrollTrigger: {
    trigger: ".nutrition",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.2,
});

gsap.from(".monster-swiper .swiper-slide", {
  scrollTrigger: {
    trigger: ".swiper-slide",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
});

// MONSTER SWIPER
document.addEventListener("DOMContentLoaded", function () {
  const monsterSwiper = new Swiper(".monster-swiper", {
    slidesPerGroup: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: false,
    breakpoints: {
      1600: { slidesPerView: 8 },
      1400: { slidesPerView: 6 },
      1200: { slidesPerView: 4 },
      992: { slidesPerView: 4 },
      768: { slidesPerView: 3 },
      576: { slidesPerView: 2 },
      476: { slidesPerView: 2 },
      376: { slidesPerView: 1 },
      276: { slidesPerView: 1 },
      176: { slidesPerView: 1 },
    },
  });
});

//FIX BUTTON LINKS
document.querySelectorAll(".butt[data-href]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = button.getAttribute("data-href");
  });
});
