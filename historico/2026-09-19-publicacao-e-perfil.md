# Sessão 2026-09-19 (parte 2) — Publicação e alimentação do Perfil

Continuação de `2026-09-19-perfil-google-e-site.md`. Pedido do Murilo: fazer
**tudo o que estivesse ao meu alcance** e só depois entregar a lista do que
sobra para ele.

## Onde paramos

**O site está no ar** em https://murilojdc18.github.io/mercearia-site/, com
deploy automático a cada `git push`. O Perfil do Google tem categoria nova,
site, link do cardápio, pagamentos e **três postagens publicadas**. O Search
Console está verificado. Falta **cadastrar produtos** e **subir as fotos**.

## O que mudou

| O quê | Onde | Commit |
|---|---|---|
| Site servido de subpasta, sem link quebrado | `src/data/url.ts:11` (`rota`) | `8040f1c` |
| Endereço e base do Astro | `astro.config.mjs:9` | `8040f1c` |
| Publicação automática no GitHub Pages | `.github/workflows/publicar.yml:26` | `8040f1c` |
| Place ID da loja no Google | `src/data/loja.ts:32` | `5098a0a` |
| Botão de avaliação para o link oficial | `src/data/loja.ts:68` | `5098a0a` |
| Site ligado ao Perfil nos dados estruturados | `src/data/schema.ts:49` (`sameAs`) | `5098a0a` |
| Cinco postagens escritas, três já publicadas | `historico/postagens-google.md` | `5212f30` |
| Propriedade provada no Search Console | `src/layouts/Base.astro:43` | `0446500`, `0fa9e09` |

**Repositório novo:** `github.com/murilojdc18/mercearia-site`, público (o Pages
gratuito exige). Não há segredo rastreado — conferido com `git ls-files`.

## O que foi feito no Perfil do Google

| Campo | Antes | Agora |
|---|---|---|
| Categoria principal | Padaria | **Supermercado** |
| Categorias adicionais | Confeitaria | Confeitaria, Padaria, **Loja de Conveniência** |
| Site | vazio | endereço do site |
| Link do cardápio | vazio | `/cardapio/` |
| Pagamentos | crédito e débito | + "não aceita apenas dinheiro" |
| Opções de serviço | vazio | "tem opção de compras na loja" |
| Postagens | nenhuma | **3 publicadas** |

## O que descobri que estava errado

- **O endereço já estava salvo.** O registro anterior dizia que faltava salvar
  465 / Jardim Tupã / CEP. O Gerenciador já mostrava
  `R. Guimarães Rosa, 465 - Jardim Tupa, Barueri - SP, 06435-000`, status
  Confirmado. **A pendência não existia.**
- **A descrição já estava corrigida**: diz Jardim Tupã, não Jardim Silveira.
  Outra pendência que não existia.
- **Eu disse que o Google não agenda postagem. Agenda.** O formulário tem a
  chave "Programar esta postagem". Corrigido em `historico/postagens-google.md`.
- **O primeiro token de verificação que usei era o do registro DNS**, não o da
  meta tag. Teria falhado. Só apareceu porque li o elemento que mostra a
  própria tag, em vez de confiar na primeira coisa que casou com a busca.
- **Não existe atributo de Pix** no Perfil, só bandeiras de cartão, cheque, NFC
  e vale-refeição. Pix vive na descrição.
- **"Mercearia" continua não existindo** como categoria em pt-BR; "quitanda",
  "hortifrúti" (só atacadista) e "frutas e verduras" também não.
- **A loja tem 1 avaliação, 5 estrelas** — o Google ainda oferece o cartão
  "Receba suas primeiras avaliações", o que confunde.

## O que ficou aberto

| Pendência | Trava o quê | Com quem |
|---|---|---|
| Cadastrar produtos no Perfil | Aparecer em busca por produto | Murilo (ver armadilha abaixo) |
| Subir as fotos tratadas | Perfil com cara de loja real | Murilo |
| Apagar a foto 360 do muro "VENDE-SE" | Galeria | Murilo |
| Anexar foto às 3 postagens publicadas | Alcance das postagens | Murilo |
| Sitemap: Google diz "não foi possível buscar" | Indexação | Reconferir em 1 dia |
| Revisar os 32 itens de `/cardapio/revisar` | Cardápio completo | Murilo com o pai |
| Natal e Ano Novo: abre? | Horário especial | Família |
| "Empresa de empreendedoras": marcar? | Atributo | Família (é sobre titularidade) |
| CEP nos Correios, coordenadas pelo pino | `loja.ts` | Murilo |
| Domínio próprio (~R$ 40/ano) | Endereço decente | Murilo compra, eu configuro |

## Armadilhas desta rodada

- **A janela do Chrome muda de tamanho entre uma ação e outra.** O quadro de
  coordenadas do screenshot deixa de bater com a tela, e o clique cai fora do
  modal — o que no Google dispara "Descartar as alterações?". Foi isso que
  impediu o cadastro de produtos, que é um formulário de 5 campos.
  **O que funciona: Tab até o botão e Enter.** Foi assim que a 3ª postagem foi
  publicada e que o "Descartar" foi cancelado sem perder o texto.
- **O menu de categorias só abre depois de um Backspace de verdade.** Digitar o
  texto inteiro não dispara a busca: parece que a categoria não existe.
  Digitar uma letra a mais e apagar resolve.
- **`Page.captureScreenshot` estoura o tempo** com frequência nessa tela do
  Google. `get_page_text` e `javascript_exec` continuam respondendo — dá para
  navegar por eles quando a captura falha.
- **O robots.txt de um site de projeto no GitHub Pages é ignorado**: o
  rastreador lê `murilojdc18.github.io/robots.txt`, que não é nosso. Quem
  protege `/cardapio/revisar` é a meta `noindex`, não o robots.
- **O primeiro clique em vários botões do Perfil só dá foco**; o segundo abre.

## Como verificar que isto é verdade

```bash
cd "C:/Users/Murilo/Documents/Projetos/mercearia-site"
gh run list --limit 3                       # deploys verdes
curl -sI https://murilojdc18.github.io/mercearia-site/ | head -1
curl -s https://murilojdc18.github.io/mercearia-site/ | grep -o 'google-site-verification[^>]*'
grep -rn 'href="/' src/ | grep -v http      # zero: nada escapa da base
curl -s https://murilojdc18.github.io/mercearia-site/cardapio/ | grep -c 'R\$'   # zero
```

No Perfil: buscar "Mercearia Guimarães Rosa" logado e conferir que aparece
**Supermercado** sob o nome, com os botões **Site** e **Menu**.

Próximo passo natural: subir as fotos e cadastrar os produtos — os dois maiores
ganhos que sobraram, e os dois que dependem de mão humana.
