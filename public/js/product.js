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
