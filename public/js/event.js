gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" }, delay: 1.2 });

  tl.from("button", { x: -100, opacity: 0 }, "-=0.6");
  tl.from(".inside", { x: -100, opacity: 0 }, "-=0.6");
  tl.from(".event-tags", { x: -100, opacity: 0 }, "-=0.6");
  tl.from(".article-cont img", { y: 50, opacity: 0 }, "-=0.6");
  tl.from(".content h1", { y: 50, opacity: 0 }, "-=0.6");
  tl.from(".header-row p", { y: 50, opacity: 0 }, "-=0.6");
  tl.from(".social-icons a", { y: 50, opacity: 0, stagger: 0.1 }, "-=0.6");
});

// SCROLL
gsap.from(".gallery a", {
  scrollTrigger: {
    trigger: ".section4",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
});

gsap.from(".section5 table tr, .section5 table th, .section5 table td", {
  scrollTrigger: {
    trigger: ".section5 table",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  scale: 0.95,
  duration: 0.4,
  stagger: 0.1,
});

gsap.from(".article-cont h2", {
  scrollTrigger: {
    trigger: ".article-cont h2",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});

gsap.from(".article-row p", {
  scrollTrigger: {
    trigger: ".article-row p",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});

gsap.from(".article-cont li", {
  scrollTrigger: {
    trigger: ".article-cont li",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.05,
});

gsap.from(".section2", {
  scrollTrigger: {
    trigger: ".section2",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 0.6,
});

//FIX BUTTON LINKS
document.querySelectorAll(".butt[data-href]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = button.getAttribute("data-href");
  });
});
