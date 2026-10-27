# Plano de evolução do portfólio — versão 2.0

**Preparado em:** 26/10/2026
**Base da proposta:** revisão do repositório, inspeção do site publicado em desktop e celular, testes dos filtros e consulta à documentação oficial das tecnologias.

## Recomendação executiva

Reconstruir o portfólio como **site estático com Astro**, mantendo o GitHub Pages como hospedagem. Usar **TypeScript apenas onde acrescenta segurança** — componentes e interações —, HTML semântico, CSS próprio e JavaScript mínimo para menu, filtros e carrossel. Organizar projetos e certificados reais como conteúdo estruturado, validar a publicação automaticamente e evitar frameworks de interface, banco de dados ou servidor que o site não precisa.

Astro é uma boa correspondência porque foi projetado para sites orientados a conteúdo, gera HTML estático e permite manter JavaScript no navegador apenas nos componentes que realmente precisam de interação. Isso substitui a duplicação atual de cabeçalho, rodapé, formulários e cartões sem transformar o portfólio em uma aplicação pesada.

**A tecnologia sozinha não fará o site parecer pessoal ou excepcional.** O diferencial deve ser a qualidade da história e das evidências: projetos reais, decisões explicadas, resultados honestos, processo visível e uma voz que soe como a do Taylor — não uma coleção de slogans.

## O que mudaria

### Identidade e experiência visual

- Criar uma direção de arte coerente com a raposa/logotipo existente, mas sem depender de brilho neon, cartões idênticos ou emojis em todas as seções.
- Escolher uma tipografia de título e uma de leitura; manter poucas cores de destaque e definir tokens de cor, espaço, largura, borda, movimento e foco.
- Construir uma página inicial editorial: nome, especialidade principal, proposta concreta, uma chamada principal e um trabalho em destaque. Evitar competir com várias promessas no primeiro ecrã.
- Usar imagem real do autor, do processo ou dos projetos quando disponível. Não substituir imagens quebradas por conteúdo inventado ou imagens genéricas apresentadas como trabalhos próprios.
- Fazer animações discretas, opcionais e compatíveis com `prefers-reduced-motion`. Garantir que o conteúdo continue utilizável sem JavaScript.
- Tratar celular como experiência principal: tipografia legível, menu acessível, alvos de toque adequados e sem rolagem horizontal.

### Conteúdo e credibilidade

- Transformar a página de projetos em uma vitrine de estudos de caso reais. Para cada trabalho: contexto, problema, papel do Taylor, restrições, decisões, ferramentas, resultado, aprendizados e links para demonstração/código quando públicos.
- Se não houver projetos de cliente publicáveis, usar trabalhos pessoais claramente identificados como experimentos ou projetos próprios. Nunca apresentar exemplos hipotéticos como resultados reais.
- Reduzir a lista de serviços ao que pode ser entregue com qualidade e descrever escopo, entregáveis, limites e próximo passo; revisar todos os preços antes de publicar.
- Manter certificados somente se existirem comprovantes reais. Mostrar instituição, curso e data, com imagem legível ou link de validação.
- Escrever a seção “Sobre” em primeira pessoa com trajetória, motivações e exemplos concretos. Remover autoavaliações em porcentagem sem critérios explicados; substituir por tecnologias aplicadas em trabalhos demonstráveis.
- Escolher uma especialidade principal e tratar as demais como competências complementares, para que o posicionamento seja compreensível.
- Manter contatos e links em um único conjunto de dados compartilhado pelo site. Remover qualquer URL de exemplo antes da publicação.

## Tecnologias propostas

| Tecnologia | Uso na versão 2.0 | Por que |
|---|---|---|
| **Astro** | Gerar páginas, layouts compartilhados, componentes e rotas estáticas. | É voltado a sites de conteúdo, reduz duplicação e mantém a saída estática adequada ao GitHub Pages. |
| **TypeScript** | Tipar componentes e pequenas interações; validar a forma dos dados. | Diminui erros de integração, como inicializar um slider em uma página que não possui seus controles. |
| **Markdown/MDX + coleções de conteúdo do Astro** | Escrever estudos de caso e certificados com campos validados. | Mantém conteúdo separado do layout e ajuda a impedir entradas incompletas. Usar certificados apenas quando houver conteúdo real. |
| **HTML semântico + CSS nativo** | Estrutura e design responsivo. CSS organizado por tokens, layout e componentes. | O portfólio não precisa de um framework visual para poucas páginas; CSS próprio facilita uma direção de arte autoral. |
| **JavaScript/TypeScript sem framework no cliente** | Menu, filtros e carrossel, somente onde são necessários. | Mantém o HTML como base, evita enviar uma SPA completa para uma experiência predominantemente editorial e reduz estados globais difíceis de sincronizar. |
| **pnpm** | Instalar dependências e executar scripts do projeto. | Já existe um `pnpm-lock.yaml`; definir scripts explícitos e versionar o lockfile, não metadados de `node_modules`. |
| **GitHub Actions + GitHub Pages** | Verificar, construir e publicar o resultado de `dist/`. | A implantação é repetível; um build quebrado pode falhar antes de publicar. Astro documenta essa hospedagem oficialmente. |
| **Playwright** | Testes de ponta a ponta nas rotas e fluxos importantes. | Permite testar páginas em navegador real, diferentes engines, interações e viewport móvel; pode rodar na integração contínua. |
| **axe-core integrado aos testes** | Verificações automatizadas de acessibilidade como apoio. | Encontra uma parte dos problemas automaticamente, complementando teste por teclado e revisão manual; não substitui conformidade WCAG completa. |
| **Imagens locais otimizadas** | Fotografias, capturas de projetos e identidade visual em dimensões adequadas. | Astro oferece componentes de imagem para gerar tamanhos e formatos quando os arquivos estão sob gestão do build. |

### O que não usaria inicialmente

- **React, Next.js, banco de dados ou API própria:** não há requisito atual que justifique hidratação ampla, servidor ou estado de aplicação complexo.
- **Tailwind por padrão:** adicionar outra camada de convenções não é condição para organizar um site pequeno; primeiro estabelecer tokens e componentes em CSS.
- **CMS:** não é necessário se o Taylor consegue atualizar alguns projetos versionando Markdown. Reavaliar apenas se editar conteúdo pelo Git se tornar uma barreira real.
- **Analytics invasivo, cookie banner ou rastreamento sem necessidade:** acrescentar telemetria apenas se houver uma pergunta de negócio concreta e uma decisão consciente sobre privacidade.
- **Formulário com segredo no navegador:** hospedagem estática não deve expor chaves privadas. Usar um provedor de formulários confiável ou `mailto:`; testar entrega, antispam, aviso de privacidade e confirmação.

## Arquitetura sugerida

```text
src/
  components/
    SiteHeader.astro
    SiteFooter.astro
    ProjectCard.astro
    ContactLinks.astro
    ServiceCard.astro
  layouts/
    SiteLayout.astro
  pages/
    index.astro
    sobre.astro
    servicos.astro
    projetos.astro
    certificados.astro
    contato.astro
    404.astro
  content/
    projects/
      projeto-real.md
    certificates/
      certificado-real.md
  styles/
    tokens.css
    global.css
    components.css
  scripts/
    menu.ts
    project-filters.ts
    service-filters.ts
    slider.ts
public/
  favicon.svg
  favicon.ico
  images/
tests/
  pages.spec.ts
  interactions.spec.ts
  accessibility.spec.ts
```

O nome e a extensão finais das rotas devem ser decididos antes da migração. É importante preservar ou redirecionar links publicados antigos (`about.html`, `projects.html` etc.) para não quebrar bookmarks e resultados de busca. GitHub Pages é hospedagem estática; a estratégia de rotas e caminhos precisa ser conferida no build e no endereço sob `/Taylor-Portf-lio-2026/`.

### Dados de projeto com campos definidos

Cada estudo de caso deve declarar campos como:

```yaml
title: Nome real do projeto
summary: Resultado ou propósito em uma frase
role: Papel realizado pelo Taylor
year: 2026
status: publicado
cover: ./capa.webp
stack:
  - HTML
  - CSS
links:
  live: https://...
  source: https://...
```

O schema deve validar o conteúdo no build. Não criar campos com métricas que o projeto não possui, nem publicar URLs internas ou privadas sem autorização.

## Etapas de construção e validação

### Etapa 0 — fechar conteúdo e decisões

Antes do design final, reunir:

- quais projetos podem ser divulgados, capturas de tela e links;
- quais serviços e preços continuam válidos;
- certificados e comprovantes reais;
- currículo atualizado, se deve ser oferecido para download;
- URLs definitivas de WhatsApp, e-mail, GitHub, LinkedIn e outras redes;
- texto pessoal, idiomas, localização e disponibilidade que o Taylor autoriza exibir.

Itens sem evidência não entram como alegações concluídas. Um projeto não pronto fica claramente identificado ou é omitido.

### Etapa 1 — fundação técnica

- Criar Astro com build estático e configuração explícita de URL pública e `base` do repositório.
- Configurar componentes compartilhados, layout, tokens e rotas.
- Adicionar `pnpm` scripts para desenvolvimento, verificação, testes e build.
- Incluir favicon, metadados por página, URL canônica e metadados sociais.
- Fazer o build e verificar caminhos de CSS, imagens e links no GitHub Pages — não apenas no servidor local.

### Etapa 2 — conteúdo e sistema visual

- Implementar página inicial, sobre, serviços, projetos, certificados e contato a partir de layout e componentes comuns.
- Criar estudos de caso somente a partir do material real fornecido.
- Ajustar identidade visual e imagens; otimizar assets e reservar dimensões para evitar saltos de layout.
- Remover conteúdo duplicado, placeholders, destino `#` e arquivos de imagem sem origem.

### Etapa 3 — interações acessíveis

- Menu: botão com nome acessível, `aria-expanded`, navegação associada e operação por teclado.
- Filtros: estados independentes para serviços e projetos, estado selecionado anunciado e cartões utilizáveis sem JS.
- Carrossel: só inicializar quando presente, botões com rótulos e alternativa por toque/rolagem; avaliar se é realmente necessário.
- Formulário: validação, entrega real, estados de sucesso/erro e destino de confirmação próprio.
- Respeitar redução de movimento e foco visível; não retirar outlines sem substituição.

### Etapa 4 — qualidade e publicação

- Playwright: cada rota retorna conteúdo esperado; nenhum link interno ou imagem local está quebrado; navegação, filtros e formulário funcionam.
- Testes em viewport móvel e desktop; Chromium ao menos na CI e revisão manual adicional em navegador/teclado.
- Axe: nenhum problema crítico/sério automatizado sem justificativa; revisar manualmente contraste, foco, ordem de leitura, labels e zoom.
- Build de produção como requisito da integração contínua; publicar Pages apenas após sucesso.
- Medir Core Web Vitals quando houver dados reais de usuários e usar Lighthouse como diagnóstico, não como objetivo estético isolado.
- Após publicação, testar em produção as rotas, favicon, meta tags, links, imagens e formulário.

## Critérios de pronto para a versão 2.0

- Todas as rotas publicadas têm conteúdo intencional; nenhuma página principal termina em placeholder.
- Todos os projetos e certificados exibidos são reais, autorizados e têm imagens/links funcionais; nenhum cartão usa `href="#"`.
- Nenhum link de contato contém `SEU...`, `example.com` ou e-mail genérico.
- Nenhum recurso local retorna 404, incluindo favicon, currículo e imagens.
- Não há erro de console nem erro de inicialização em nenhuma página.
- Filtros distintos não alteram estados de outros componentes.
- Navegação principal e controles podem ser usados com teclado, mostram foco e comunicam seus estados.
- Uma única definição de navegação, rodapé, contatos e metadados por layout compartilhado; conteúdo específico permanece por página.
- O build é reproduzível e passa testes antes da publicação.
- A página inicial explica rapidamente quem é Taylor, o que faz e mostra pelo menos um trabalho real, sem exigir que a pessoa percorra páginas longas para entender o valor.

## Pesquisa e fontes oficiais

Consulta realizada em 26/10/2026. A documentação é viva; confirmar as versões estáveis e os requisitos de Node quando a implementação começar.

1. **Astro — Why Astro:** arquitetura orientada a conteúdo, renderização server-first e redução de JavaScript no cliente.
   https://docs.astro.build/en/concepts/why-astro/
2. **Astro — Content Collections:** conteúdo estruturado, organização, IntelliSense e checagem de tipos.
   https://docs.astro.build/en/guides/content-collections/
3. **Astro — Pages e rotas:** roteamento por arquivos, layouts reutilizáveis e página 404.
   https://docs.astro.build/en/basics/astro-pages/
4. **Astro — Images:** componentes de imagem e otimização de imagens geridas no projeto.
   https://docs.astro.build/en/guides/images/
5. **Astro — configuração:** `site`, `base` e build estático, necessários para URL pública e subdiretório do GitHub Pages.
   https://docs.astro.build/en/reference/configuration-reference/
6. **Astro — deployment para GitHub Pages:** fluxo oficial de implantação com GitHub Actions.
   https://docs.astro.build/en/guides/deploy/github/
7. **GitHub Docs — custom workflows para Pages:** permissões e fluxo de artefato/deployment.
   https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
8. **W3C — WCAG 2.2:** critérios de acessibilidade para teclado, foco, interação e conteúdo perceptível.
   https://www.w3.org/TR/WCAG22/
9. **web.dev — Core Web Vitals:** métricas atuais de carregamento, interatividade e estabilidade visual; metas recomendadas de LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 no percentil 75.
   https://web.dev/articles/vitals
10. **Playwright — documentação:** testes end-to-end em Chromium, Firefox e WebKit, execução local e em CI.
    https://playwright.dev/docs/intro
11. **axe-core:** motor automatizado de testes de acessibilidade; deve complementar, não substituir, avaliação humana.
    https://github.com/dequelabs/axe-core

## Limites desta proposta

Este plano não substitui decisões do Taylor sobre conteúdo, identidade, preço, privacidade ou quais trabalhos podem ser divulgados. Não inventar projetos, depoimentos, resultados, certificados, experiências, imagens ou disponibilidade para completar uma seção. A implementação completa deve começar depois de confirmar esses materiais e decisões.
