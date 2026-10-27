const themeButton = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const themeLabel = themeButton?.querySelector<HTMLElement>("[data-theme-label]");
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function updateTheme(theme: "light" | "tech", persist = false): void {
  document.documentElement.dataset.theme = theme;

  const isTechMode = theme === "tech";
  themeButton?.setAttribute("aria-pressed", String(isTechMode));
  themeButton?.setAttribute("aria-label", isTechMode ? "Ativar modo claro" : "Ativar modo tech");
  themeButton?.setAttribute("title", isTechMode ? "Ativar modo claro" : "Ativar modo tech");
  if (themeLabel) themeLabel.textContent = isTechMode ? "Modo claro" : "Modo tech";
  if (themeColor) themeColor.content = isTechMode ? "#0a0f1c" : "#f4f1e9";

  if (persist) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      console.warn("Não foi possível salvar sua preferência de tema.", error);
    }
  }
}

if (themeButton) {
  updateTheme(document.documentElement.dataset.theme === "tech" ? "tech" : "light");
  themeButton.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "tech" ? "light" : "tech";
    updateTheme(nextTheme, true);
  });
}
