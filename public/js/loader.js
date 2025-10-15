(function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  // Loader logic for visiting page
  window.addEventListener("load", () => {
    if (loader.style.display === "none") return;

    try {
      if (window.gsap) {
        gsap.to(loader, {
          opacity: 0,
          duration: 1,
          delay: 0.5,
          onComplete: () => {
            loader.style.display = "none";
          },
        });
      } else {
        loader.style.transition = "opacity 0.8s";
        loader.style.opacity = 0;
        setTimeout(() => {
          loader.style.display = "none";
        }, 900);
      }
    } catch (err) {
      console.error("loader.js error:", err);
      loader.style.display = "none";
    }
  });

  // FALLBACK
  setTimeout(() => {
    loader.style.display = "none";
    loader.style.opacity = 0;
  }, 5000);
})();
