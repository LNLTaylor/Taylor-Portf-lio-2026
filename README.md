# Portfólio de Taylor Soares

Portfólio estático feito com Astro, pronto para publicação no GitHub Pages. Textos, serviços, projetos, certificados e arquivos ficam em conteúdo estruturado para facilitar atualizações sem editar páginas ou CSS.

## Como atualizar sem programar

1. Abra [app.pagescms.org](https://app.pagescms.org) e entre com a conta GitHub que tem acesso ao repositório.
2. Escolha a área que quer alterar: **Dados do portfólio**, **Serviços**, **Projetos**, **Certificados** ou **Produtos digitais**.
3. Edite o texto ou envie a imagem/PDF pelo próprio formulário; revise o resultado antes de salvar.
4. Em projetos, certificados e produtos, marque **Publicar no portfólio** somente depois de revisar todas as informações.
5. Salve a alteração. O Pages CMS cria um commit no GitHub; com o Pages configurado para **GitHub Actions**, o site é atualizado após a validação automática.

Para retirar algo do site, desmarque **Publicar no portfólio** ou remova o item. A remoção da lista não apaga automaticamente cópias anteriores do arquivo ou do texto do histórico do GitHub.

> O site e o repositório são públicos: despublicar não torna um arquivo privado. Não envie documentos confidenciais, números de identificação, endereços residenciais ou dados que não queira divulgar. O Pages CMS ainda precisa ser autorizado por você; confira as permissões do aplicativo antes de conectá-lo.

## Rodar localmente

Requisitos: Node.js 22.12 ou superior e pnpm.

```sh
pnpm install
pnpm dev
```

O comando `pnpm build` valida os conteúdos e gera as páginas em `dist/`. Para conferir o site construído, execute `pnpm preview`.

## Editar conteúdo pelo Pages CMS

O painel administrativo é hospedado em [app.pagescms.org](https://app.pagescms.org); ele não é uma rota pública `/admin`. Depois de entrar com a conta GitHub autorizada para o repositório, escolha a coleção que deseja editar:

- **Dados do portfólio:** nome, apresentação, contatos, redes sociais, SEO e currículo em PDF.
- **Projetos e estudos de caso:** descrição, imagem de capa, processo, resultado, links e tecnologias.
- **Certificados:** instituição, data, PDF e link de validação.
- **Serviços e preços:** descrição, categoria, preço e ordem de exibição.
- **Produtos digitais:** descrição, imagem, preço e link de compra.

Para acrescentar um arquivo, use o campo de imagem ou PDF da coleção. Imagens raster (`JPG`, `PNG` ou `WebP`) e PDFs são guardados em `public/media/`. Não envie documentos com dados pessoais que não devam ficar públicos.

Projetos, certificados e produtos novos começam despublicados. Revise todo o conteúdo e os anexos antes de ativar **Publicar no portfólio**; itens despublicados não aparecem nas páginas do site. Para retirar um item, desative a publicação ou remova-o pela coleção. O Pages CMS cria commits no repositório; esses commits passam a reconstruir o site quando a publicação por GitHub Actions estiver habilitada. Despublicar não apaga o arquivo da pasta pública nem do histórico do repositório.

> Antes de instalar o Pages CMS, confira cuidadosamente as permissões solicitadas pelo aplicativo GitHub e autorize apenas o repositório correto. O serviço é de terceiros e a integração ainda precisa ser autorizada pela proprietária do repositório.

## Publicação

O workflow em `.github/workflows/deploy.yml` valida, testa e prepara a publicação do diretório `dist/` no GitHub Pages. Para ativá-lo, entre em **Settings → Pages** no GitHub e altere a origem de publicação para **GitHub Actions**. A versão atual permanece no ar até essa configuração ser alterada e uma execução do workflow ser concluída.

Antes de ativar a nova versão, confira serviços e valores migrados, complete o conteúdo real e teste os links e arquivos. Projetos e certificados não foram inventados; as coleções começam vazias.

## Verificações

```sh
pnpm check
pnpm build
pnpm test:e2e
```

Os testes de navegador usam Chromium. Na primeira execução local, instale-o com `pnpm exec playwright install chromium`.
