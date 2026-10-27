# Portfólio de Taylor Soares

Site pessoal desenvolvido com Astro e TypeScript, publicado como site estático no GitHub Pages.

## Desenvolvimento local

Requisitos: Node.js 22.12 ou superior e pnpm.

```sh
pnpm install
pnpm dev
```

O comando `pnpm build` valida os conteúdos e gera as páginas em `dist/`. Para conferir o site construído, execute `pnpm preview`.

## Verificações

```sh
pnpm check
pnpm build
pnpm test:e2e
```

Os testes de navegador usam Chromium. Na primeira execução local, instale-o com `pnpm exec playwright install chromium`.
