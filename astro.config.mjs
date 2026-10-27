import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lnltaylor.github.io",
  base: "/Taylor-Portf-lio-2026",
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "file",
  },
});
