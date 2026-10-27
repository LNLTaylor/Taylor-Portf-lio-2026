import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "index.html",
  "about.html",
  "services.html",
  "products.html",
  "projects.html",
  "certificates.html",
  "contact.html",
];

test("todas as páginas principais abrem com título e conteúdo", async ({ page }) => {
  for (const path of pages) {
    const response = await page.goto(path);

    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main h1"), path).toHaveCount(1);
    await expect(page).toHaveTitle(/Taylor Soares/);
  }
});

test("as páginas não criam rolagem horizontal em telas pequenas ou grandes", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 740 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1280, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);

    for (const path of pages) {
      await page.goto(path);
      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );

      expect(hasHorizontalOverflow, `${path} em ${viewport.width}px`).toBe(false);

      if (path === "index.html") {
        const logoRatio = await page.locator(".hero-art img").evaluate((image) => {
          const { width, height } = image.getBoundingClientRect();
          return width / height;
        });

        expect(logoRatio, `proporção do lobo em ${viewport.width}px`).toBeCloseTo(1, 2);
      }
    }
  }
});

test("a navegação móvel abre, navega e fecha", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("index.html");

  const menuButton = page.locator(".menu-toggle");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Sobre" }).click();

  await expect(page).toHaveURL(/about\.html$/);
  await expect(page.getByRole("button", { name: "Abrir navegação" })).toHaveAttribute("aria-expanded", "false");
});

test("o modo tech pode ser alternado e a preferência continua nas páginas", async ({ page }) => {
  await page.goto("index.html");

  const themeToggle = page.getByRole("button", { name: "Ativar modo tech" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "tech");
  await expect(page.getByRole("button", { name: "Ativar modo claro" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0a0f1c");

  await page.goto("services.html");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "tech");
  await page.getByRole("button", { name: "Ativar modo claro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("os filtros de serviços exibem apenas a categoria escolhida", async ({ page }) => {
  await page.goto("services.html");

  const services = page.locator("[data-service-category]");
  const designFilter = page.locator('[data-service-filter="design"]');

  await designFilter.click();
  await expect(designFilter).toHaveAttribute("aria-pressed", "true");

  const visibleServices = services.filter({ visible: true });
  await expect(visibleServices).not.toHaveCount(0);

  for (const category of await visibleServices.evaluateAll((items) =>
    items.map((item) => item.getAttribute("data-service-category")),
  )) {
    expect(category).toBe("design");
  }

  await page.locator('[data-service-filter="all"]').click();
  await expect(services.filter({ visible: true })).toHaveCount(await services.count());
});

test("as páginas principais não apresentam violações WCAG automatizadas", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    await page.evaluate(() => localStorage.removeItem("portfolio-theme"));
    await page.reload();

    for (const theme of ["light", "tech"] as const) {
      if (theme === "tech") await page.getByRole("button", { name: "Ativar modo tech" }).click();
      await expect
        .poll(() =>
          page.locator(".theme-toggle").evaluate((button) => getComputedStyle(button).backgroundColor),
        )
        .toBe(theme === "tech" ? "rgb(17, 24, 39)" : "rgb(234, 229, 218)");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(results.violations, `${path} no tema ${theme}`).toEqual([]);
    }
  }
});
