//Sticky header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const headerMiddle = header?.querySelector(".header-middle");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header?.classList.add("sticky");
      headerMiddle?.classList.add("sticky");
    } else {
      header?.classList.remove("sticky");
      headerMiddle?.classList.remove("sticky");
    }
  });
});

//Last row / last container styling
const rows = document.querySelectorAll(".rect .row");
const lastRow = rows[rows.length - 1];
lastRow.classList.add("last-row");

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".main .container");
  if (containers.length > 0) {
    const lastContainer = containers[containers.length - 1];
    lastContainer.classList.add("container-last");
  }
});

// FIX BUTTONS LINKS
document.querySelectorAll(".butt[data-href]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = button.getAttribute("data-href");
  });
});
