const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
const primaryNavigation = document.querySelector<HTMLElement>("#navegacao-principal");

if (menuButton && primaryNavigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir navegação");
    primaryNavigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Abrir navegação" : "Fechar navegação");
    primaryNavigation.classList.toggle("is-open", !expanded);
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
