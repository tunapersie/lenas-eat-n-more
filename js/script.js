const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const searchInput = document.querySelector("#dish-search");
const filterButtons = document.querySelectorAll("[data-filter]");
const dishCards = document.querySelectorAll(".dish-card");
const noResults = document.querySelector("#no-results");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    });
  });
}

let activeFilter = "all";

function updateDishes() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  dishCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesQuery = card.dataset.name.includes(query);
    const isVisible = matchesCategory && matchesQuery;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  noResults.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", updateDishes);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    updateDishes();
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();