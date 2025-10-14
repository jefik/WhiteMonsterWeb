gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" }, delay: 1.2 });

  tl.from(".inner h1", { x: -100, opacity: 0 }, "-=0.6");
  tl.from(".newest-hero img", { x: -100, opacity: 0 }, "-=0.6");
  tl.from(".corner ", { x: -100, opacity: 0 }, "-=0.6");
});

// SCROLL
gsap.from(".filters button", {
  scrollTrigger: {
    trigger: ".filters-wrapper",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
});

gsap.from(".rect .row .imgNews", {
  scrollTrigger: {
    trigger: ".rect",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.2,
});

gsap.from(".rect .row .content", {
  scrollTrigger: {
    trigger: ".rect",
    start: "top 80%",
  },
  x: 100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.2,
});

gsap.from("#load-more", {
  scrollTrigger: {
    trigger: "#load-more",
    start: "top 80%",
    once: true,
  },
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

const items = document.querySelectorAll(".event-item");
const btn = document.getElementById("load-more");
let visibleCount = 3;
const increment = 3;

btn.addEventListener("click", () => {
  const next = visibleCount + increment;
  for (let i = visibleCount; i < next && i < items.length; i++) {
    items[i].style.display = "block";
  }
  visibleCount += increment;

  if (visibleCount >= items.length) {
    btn.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filters button");
  const allItems = Array.from(document.querySelectorAll(".event-item"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const tag = button.dataset.tag;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      allItems.forEach((item) => {
        const itemTags = item
          .querySelector(".tags")
          .textContent.split(",")
          .map((t) => t.trim());
        if (tag === "All" || itemTags.includes(tag)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
