import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4321/Taylor-Portf-lio-2026/",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm preview --host 127.0.0.1",
    url: "http://127.0.0.1:4321/Taylor-Portf-lio-2026/index.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
