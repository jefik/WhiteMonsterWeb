// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" }, delay: 1.5 });

  tl.from(".banner .banner-up", { x: 100, opacity: 0 }, "-=0.8");
  tl.from(".banner .banner-down", { x: 100, opacity: 0 }, "-=0.8");
  tl.from(".about .bubble", { y: 100, opacity: 0 }, "-=0.8");
});

// SCROLL
gsap.from(".gallery figure", {
  scrollTrigger: {
    trigger: ".gallery-section",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
});

gsap.from(".products .card", {
  scrollTrigger: {
    trigger: ".products",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  stagger: 0.2,
});

gsap.from(".news .row .imgNews", {
  scrollTrigger: {
    trigger: ".news",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.2,
});

gsap.from(".news .row .content", {
  scrollTrigger: {
    trigger: ".news",
    start: "top 80%",
  },
  x: 100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.2,
});

gsap.from(".gallery-section h1", {
  scrollTrigger: {
    trigger: ".gallery-section",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".products h1", {
  scrollTrigger: {
    trigger: ".products",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".news h1", {
  scrollTrigger: {
    trigger: ".news",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});
