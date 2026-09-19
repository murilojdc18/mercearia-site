# Sessão 2026-09-19 — Perfil do Google e site

Escrito para quem não viveu a sessão. Assunto: presença online da **Mercearia
Guimarães Rosa**. O ERP em `Projetos\Sistema pai` não foi tocado, fora a D33.

## Onde paramos

O Perfil da Empresa no Google está sob gestão do Murilo com telefone, horário,
feriados, descrição, Instagram e fotos salvos; **falta salvar o endereço novo e
escolher a categoria**. O site existe, passa no build e **não foi publicado**.

## A loja, em dados

| O quê | Valor |
|---|---|
| Endereço | Rua Guimarães Rosa, 465, Jardim Tupã, Barueri, SP |
| CEP | 06435-000 (informado pela família; OpenStreetMap dá 06435-350 para o trecho) |
| Telefone e WhatsApp | (11) 97208-0503, do João |
| Horário | Seg a sáb 7h–20h; domingo e feriados 7h–14h |
| Pagamentos | Pix, dinheiro, débito, crédito |
| Instagram | @mercearia_guimaraesrosa1 |
| Família | **João**: mercado a vida toda (San, Mercado Maginata), cuida do hortifrúti e do preço. **Renata**: confeiteira (Sodiê, Mercado Maginata, Mercado Japão), faz os bolos e doces |

## O que mudou

| O quê | Onde | Commit |
|---|---|---|
| Site em Astro: início, cardápio, links, 404, créditos, revisão | `mercearia-site/src/pages/` | `9aac208` |
| Dados da loja num arquivo só | `src/data/loja.ts:30` | `9aac208` |
| Cardápio sem preço, com status por item | `src/data/cardapio.ts:9` | `9aac208` |
| Só confirmados vão ao ar | `src/data/cardapio.ts:197` (`cardapioPublico`) | `9aac208` |
| Dados estruturados do Google (loja e cardápio) | `src/data/schema.ts:8` e `:50` | `9aac208` |
| Identidade visual (lona verde, etiqueta, kraft) | `src/styles/global.css:3` | `9aac208` |
| Etiqueta amarela em estrela, com o carimbo | `src/components/Etiqueta.astro:53` | `9aac208` |
| "Aberto agora" e dia destacado | `src/pages/index.astro:173` (script) | `9aac208` |
| Busca do cardápio | `src/components/Cardapio.astro:76` | `9aac208` |
| Mapa do site sem a página de revisão | `astro.config.mjs:15` | `9aac208` |
| 16 fotos de banco + créditos | `src/assets/cardapio/`, `src/data/creditos-fotos.ts` | `23b2d70` |
| D33, escopo separado | `Sistema pai/decisions.md:407` | `288391f` |

**Fora de repositório** (ficam no disco): fotos do Perfil em
`Downloads\mercearia-fotos-google\`; relatórios do Lighthouse em `lh-*.json`
(ignorados pelo git).

## Decisões tomadas

**D33** — A presença online fica em projeto separado do ERP.
Por quê: operação de balcão não pode depender de rede; vitrine pública é toda rede.
Consequência registrada: ligar o cardápio ao espelho no Supabase exige decisão nova.

Decisões menores, que valem para o site e estão no `LEIAME.md`:
- **Sem preço em lugar nenhum.** Só a etiqueta da loja vale.
- **Item só entra se a loja tiver.** O presumido fica em `/cardapio/revisar`.
- **Foto de banco leva selo "foto ilustrativa"** e crédito.

## O que descobri que estava errado

- **O perfil do Google não estava sem dono.** Eu havia afirmado, pelo link "É
  proprietário desta empresa?", que ninguém gerenciava. Estava reivindicado pela
  esposa do pai. Corrigido só quando o Murilo mandou o print da tela.
- **O bairro e o CEP do Google estão errados**: o perfil diz Jardim Silveira,
  06447-300; o real é Jardim Tupã, 06435-000. O OpenStreetMap registra a rua como
  "Jardim Tupan" dentro da região do Jardim Silveira, o que explica a confusão.
- **Empresas de nome parecido em outras cidades** (Itapecerica da Serra e Minas)
  apareceram na busca e quase entraram como se fossem a loja.
- **O Google em português não tem a categoria "Mercearia"**, só variações (kosher,
  italiana, atacadista). O perfil segue em **Padaria**.
- **Toda edição por IA mexeu nos preços das etiquetas** das fotos: 18,99 virou
  4,98, 8,99 virou 6,99, 4,50 virou 1,99. Só apareceu porque comparei etiqueta por
  etiqueta com a foto original.
- **A primeira versão do site tinha a cara padrão de IA** (fundo creme, título em
  serifa, cartões iguais), segundo o guia de design da Anthropic. Foi refeita.

## O que ficou aberto

| Pendência | Trava o quê | Com quem |
|---|---|---|
| Salvar endereço 465 / Jardim Tupã / CEP no Perfil | SEO local: site e Google precisam bater | Murilo, 1 clique no Chrome |
| Escolher categoria: Supermercado, Mercado ou manter Padaria | Como a loja é encontrada na busca | Murilo |
| Corrigir "Jardim Silveira" na descrição do Perfil | Coerência do endereço | Murilo |
| Revisar os 32 itens presumidos em `/cardapio/revisar` | Publicar o cardápio | Murilo com o pai |
| Confirmar grafias: San, Maginata, Japão, Sodiê | Texto da página inicial | Família |
| Preço da coxinha (a etiqueta da foto diz 7,00, estimado) | Foto da vitrine editada | Pai |
| CEP nos Correios e coordenadas pelo pino do Maps | `loja.ts` e dados estruturados | Murilo |
| Etiquetas de preço **dentro da foto** da vitrine | Decidir desfocar ou trocar a foto | Murilo |
| Link oficial "Receber avaliações" | Botão da página de links | Murilo |
| Publicar (Netlify Drop ou GitHub+Netlify) e depois Search Console | Tudo de SEO | Murilo |
| Natal e Ano Novo: abre? | Feriados no Perfil | Família |

**Pendências que não são desta sessão**, encontradas no repo do ERP e deixadas
como estavam: `.claude/pack.json` modificado (branchProtegida para null),
`.agents/` e `skills-lock.json` não rastreados, todos de 12/09.

## Armadilhas desta rodada

- **A janela de edição do Google não rola com a roda do mouse.** Só Tab funciona.
  Clicar no **nome** de um dia da semana desmarca o "Fechado" dele; aconteceu com o
  sábado e quase foi salvo assim.
- **A tela de envio de fotos do Google fica em quadro protegido**: o agente não
  consegue anexar arquivo. Quem sobe foto é o Murilo.
- **Instalar skill de terceiro foi bloqueado** pelo classificador de segurança
  (a de Astro). A oficial da Anthropic passou. Documentação oficial substituiu.
- **Verificação rodando junto com o build mente**: a checagem de imagens acusou 7
  fotos quebradas porque rodou enquanto o `dist/` era reescrito.
- **Busca por preço no HTML dá falso positivo**: as coordenadas do SVG da etiqueta
  (`50,12`) casam com o padrão de preço. Filtrar `points="..."` antes.

## Como verificar que isto é verdade

```bash
cd "C:/Users/Murilo/Documents/Projetos/mercearia-site"
git log --oneline -3          # os dois commits do site
npm run build                 # 6 páginas, sem erro
npm run preview               # abre em http://127.0.0.1:4321
grep -c "status: rev" src/data/cardapio.ts   # 32 itens presumidos
grep -rn "R\$" src/ | grep -v creditos       # nada: o site não tem preço
```

No repo do ERP: `grep -n '^\*\*D33' decisions.md`.

Próximo passo natural: salvar o endereço no Perfil, escolher a categoria e revisar
o cardápio com o pai. Só depois publicar.
