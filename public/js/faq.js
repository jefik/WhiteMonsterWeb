gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

  tl.from(".banner .container", { x: 100, opacity: 0 }, "-=0.8");
  tl.from(".banner .col-md-4", { x: 100, opacity: 0 }, "-=0.8");
  tl.from(".banner .col-md-8", { x: 100, opacity: 0 }, "-=0.8");
});
