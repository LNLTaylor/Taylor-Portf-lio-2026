const serviceButtons = document.querySelectorAll<HTMLButtonElement>("[data-service-filter]");
const serviceCards = document.querySelectorAll<HTMLElement>("[data-service-category]");

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.serviceFilter;

    serviceButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    serviceCards.forEach((card) => {
      const visible = selectedCategory === "all" || card.dataset.serviceCategory === selectedCategory;
      card.hidden = !visible;
    });
  });
});
