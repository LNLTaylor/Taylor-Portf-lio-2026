const projectButtons = document.querySelectorAll<HTMLButtonElement>("[data-project-filter]");
const projectCards = document.querySelectorAll<HTMLElement>("[data-project-category]");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.projectFilter;

    projectButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    projectCards.forEach((card) => {
      const visible = selectedCategory === "all" || card.dataset.projectCategory === selectedCategory;
      card.hidden = !visible;
    });
  });
});
