# Sessão 2026-10-27 — Telefone e foto fora

Sessão curta, um assunto só. Continua `2026-10-13-marca-e-favicon.md`.

## Onde paramos

O site está no ar sem telefone, sem WhatsApp e sem a foto do João e da Renata; o
contato passou a ser o Instagram. No Perfil do Google, a remoção do WhatsApp e a
postagem dos bolos sem o número estão **pendentes de revisão do Google** — e a busca
ainda mostra "Telefone (11) …" no painel, mesmo com o campo de telefone vazio.

## Decisões tomadas

**Nenhum número da loja em lugar público** — site, dados estruturados, Perfil do
Google e postagens. Por quê: o João recebia ligação de spam toda hora. Contato
passa a ser só o Instagram. Vale também para postagens futuras
(`historico/postagens-google.md:71`).

## O que mudou

| O quê | Onde | Commit |
|---|---|---|
| Número, função `whats` e links `wa.me` apagados | `src/data/loja.ts` (sem `telefone`); `instagram` em `:54` | `b2cffb2` |
| `telephone` fora do schema.org | `src/data/schema.ts` | `b2cffb2` |
| Botão principal, menu, encomenda de bolo e cardápio apontam para o Instagram | `src/pages/index.astro:48`, `:84`; `src/layouts/Base.astro:82`; `src/components/Cardapio.astro:22`, `:66` | `b2cffb2` |
| WhatsApp do rodapé apagado (fica só o Instagram) | `src/layouts/Base.astro:108` | `b2cffb2` |
| "Perguntar no WhatsApp" de cada item do cardápio apagado, com o CSS dele | `src/components/ItemCardapio.astro` | `b2cffb2` |
| "Chamar no WhatsApp" e "Encomendar bolo" fora da página de links (ela é o link da bio do Instagram) | `src/pages/links.astro:9-14` | `b2cffb2` |
| Foto do casal fora da home e do repo | `src/pages/index.astro:60` (`quem__abertura` só com o texto); `src/assets/joao-e-renata.jpg` apagado | `b2cffb2` |
| Perfil do Google: chat WhatsApp removido; postagem dos bolos sem o número | feito no Chrome, conta do Murilo; estado "Pendente" | — |
| Anotações sem o número | `historico/postagens-google.md:35-39`, `:67-71`; `historico/2026-09-19-perfil-google-e-site.md:18` | `d5a0409` |
| LEIAME não diz mais que o telefone mora em `loja.ts` | `LEIAME.md:26` | (este fechamento) |

## O que descobri que estava errado

- **O campo "Número de telefone" do Perfil já estava vazio** quando abri a edição — o
  próprio Google sugeria "Adicione seu telefone". Mesmo assim o painel público mostrava
  "Ligar para" com o número antigo. A fonte provável é o chat do WhatsApp
 , que era o único lugar do perfil com o número. Não confirmado.
- **O número estava escondido mesmo onde não aparecia na tela**: todo link `wa.me`
  carrega o número no endereço. Tirar só o texto do rodapé não bastava.

## Armadilhas desta rodada

- **`cat > arquivo` sem entrada trava o shell** esperando stdin; custou um timeout de 5 min.
- **Não há Python nesta máquina** (`python` cai no atalho da Microsoft Store). Script
  de edição em Node (`.mjs`) funciona.
- **`src/pages/links.astro` está em CRLF**, os outros em LF: substituição com `\n`
  literal não casa nele. `sed` por linha resolve.
- **O Google mostra "Sua edição está demorando mais que o esperado"** logo após salvar;
  não é erro, é a fila de revisão.

## O que ficou aberto

| Pendência | Trava o quê | Com quem |
|---|---|---|
| Conferir em ~3 dias se o telefone sumiu do painel do Google | Fim do spam | Murilo |
| Se não sumir: "Entrar em contato com o suporte" na edição do Perfil | Idem | Murilo |
| O número segue no **histórico do git** (repo público no GitHub) | Nada urgente; reescrever histórico exige push forçado | Murilo, se quiser |
| Classes `botao--whats` e `menu__whats` ficaram com nome antigo | Nada; é só o nome do estilo | — |
| `mercearia-fotos-google/` e `.agents/` não rastreados | Herdado de 13/10 | Murilo |

As pendências de 13/10 (foto de perfil no Google) e de 19/09 continuam valendo.

## Como verificar que isto é verdade

```bash
cd "C:/Users/Murilo/Documents/Projetos/familia/mercearia-site"
grep -rniE "wa\.me|97208|972080503|whatsapp|telefone" src/        # vazio
for p in "" cardapio/ links/; do curl -s "https://merceariaguimaraesrosa.store/$p" | grep -ciE "wa\.me|97208|whatsapp|joao-e-renata"; done   # 0 0 0
git ls-files | grep joao                                           # vazio
```

No Google: buscar "Mercearia Guimarães Rosa" logado → Editar perfil → Contato.
Chat deve estar vazio, sem "Pendente".
