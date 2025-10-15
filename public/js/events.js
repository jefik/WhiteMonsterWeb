// GSAP Animations

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

// Tags filtering / load more button handling

document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".event-item")); // ALL event elements
  const btn = document.getElementById("load-more");
  const filterButtons = document.querySelectorAll(".filters button");
  const increment = 3;

  let currentTag = "All";
  let visibleCount = increment;

  function showItems(tag) {
    currentTag = tag;

    // Get items matching the selected tag
    const relevantItems = items.filter((item) => {
      const tags = item.dataset.tags.split(",").map((t) => t.trim()); // Split into array
      return tag === "All" || tags.includes(tag);
    });

    // Show only visibleCount items, rest hidden
    relevantItems.forEach((item, index) => {
      item.style.display = index < visibleCount ? "" : "none";
    });

    // Hide items not matching the selected tag
    items.filter((i) => !relevantItems.includes(i)).forEach((i) => (i.style.display = "none"));

    // Show or Hide the load more button
    if (relevantItems.length > visibleCount) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  }

  // Handle filter button clicks
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const tag = button.dataset.tag || "All"; // Getting tag from button

      // Update of active class
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Reset visible count for new tag
      visibleCount = increment;
      showItems(tag);
    });
  });

  // Handling load more button click
  btn.addEventListener("click", () => {
    visibleCount += increment;
    showItems(currentTag); // Rerender items
  });

  showItems("All");
});
