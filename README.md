# 🌊 Profundezas — Experiência Interativa Subaquática

Projeto Integrador (PI) desenvolvido para o curso de **Ciência da Computação**, no **Senac Santo Amaro**, sob orientação do professor **Thiago**.

## 👥 Integrantes

- Pedro
- Sidney França
- Vinícius de Souza (eu)

## 🎯 Sobre o projeto

O projeto é uma **experiência narrativa interativa** construída em **p5.js**, na qual o usuário navega pelo oceano através de escolhas que definem o caminho da história. Ao todo, são **7 telas interativas**, cada uma com sua própria animação generativa, trilha sonora, paleta de cores e mecânica de interação (mouse, cliques, proximidade do cursor), simulando a sensação de mergulhar cada vez mais fundo no mar — das águas rasas e iluminadas até as profundezas escuras e desconhecidas.

A transição entre as telas é feita através de uma animação de **bolhas e fade para preto**, reforçando a sensação de "mergulho" a cada escolha do usuário, com efeitos sonoros de bolha e trilhas sonoras diferentes para cada ambiente.

## 🗺️ Estrutura das telas

O fluxo é uma narrativa ramificada (branching narrative): a partir da Ilha inicial, o jogador escolhe entre dois caminhos (águas profundas ou águas rasas), e cada caminho leva a uma nova bifurcação, terminando sempre em uma tela de "RESET" que retorna ao início.

```
                          🏝️ ILHA (index.html)
                                  │
                 ┌────────────────┴────────────────┐
        "Águas Profundas"                   "Águas Rasas"
                 │                                  │
        🐟 PROFUNDEZAS                       🐠 ÁGUAS RASAS
                 │                                  │
        ┌────────┴────────┐               ┌─────────┴─────────┐
   "A Criatura"      "A Lanterna"    "Seguir o Rebanho"   "Ir para o Neon"
        │                  │                 │                    │
🐙 MONSTRO DOS MARES  🎣 PEIXE DIABO      🐟 CARDUME          🎐 ÁGUAS VIVAS
        │                  │                 │                    │
        └──────────────────┴─── "RESET" ─────┴────────────────────┘
                                  │
                          🏝️ volta para a ILHA
```

### As 7 telas

| # | Tela | Arquivo p5.js | Ambiente / Tema | Interação principal |
|---|------|----------------|------------------|----------------------|
| 1 | **Ilha** *(tela inicial)* | `sketchIlha.js` | Céu ao entardecer, mar e uma ilha com palmeiras — ponto de partida da jornada | Escolher entre "Águas Profundas" e "Águas Rasas" |
| 2 | **Profundezas** | `function.js` | Fundo do mar escuro com peixes bioluminescentes e peixes-palhaço nadando livremente | Escolher entre "A Criatura" e "A Lanterna" |
| 3 | **Águas Rasas** | `sketch.js` | Recife raso e colorido, com cardume de peixes que reage a cliques do mouse (ondas de choque) | Clicar na água para espantar os peixes; escolher entre "Seguir o Rebanho" e "Ir para o Neon" |
| 4 | **Monstro dos Mares** | `function.js` | Uma criatura tentacular gigante, cujos tentáculos crescem quanto mais tempo o mouse fica pressionado | Segurar o clique do mouse para "alimentar" o monstro |
| 5 | **Peixe Diabo** | `sketchPeixeDiabo.js` | Abismo escuro com um peixe-abissal (anglerfish) guiado por uma lanterna | Clicar para aumentar o alcance da luz e revelar peixinhos escondidos |
| 6 | **Cardume** | `function.js` | Recife com cardume de peixes com comportamento de flocking (separação e atração pelo mouse) | Mover o mouse para guiar o cardume |
| 7 | **Águas Vivas** | `sketch.js` | Fundo com águas-vivas bioluminescentes que fogem do cursor | Aproximar o mouse para observar a fuga das águas-vivas |

> Cada tela "final" (4, 5, 6 e 7) possui um botão **RESET**, que reinicia a jornada de volta para a Ilha.

## 🎨 Tema

O tema central é a **descida progressiva pelo oceano**: a experiência começa na superfície (a ilha, ensolarada e tranquila) e vai ficando cada vez mais escura, misteriosa e profunda conforme o usuário escolhe caminhos alternativos, culminando em criaturas abissais (o monstro tentacular e o peixe-abissal). O contraste de paletas de cores (tons quentes de pôr do sol → azuis e verdes translúcidos → preto quase absoluto) reforça visualmente essa sensação de profundidade crescente.

## 🛠️ Tecnologias utilizadas

- **[p5.js](https://p5js.org/)** — biblioteca JavaScript para criação de gráficos e animações generativas via canvas
- **p5.sound** — reprodução de trilhas sonoras e efeitos sonoros (bolhas)
- **HTML5 / CSS3 / JavaScript**

## 📁 Organização sugerida de pastas

Cada tela final é redirecionada via `window.location.href`, então o projeto é organizado em subpastas, cada uma com seu próprio `index.html`, `sketch.js` (ou `function.js`) e assets:

```
/
├── index.html                    → Ilha (sketchIlha.js)
├── PROFUNDEZAS/
│   └── index.html                → function.js (Maridia / peixes)
├── AGUAS RASAS/
│   └── index.html                → sketch.js (peixes + ondas)
├── MONSTRO DOS MARES/
│   └── index.html                → function.js (monstro tentacular)
├── PEIXE DIABO/
│   └── index.html                → sketchPeixeDiabo.js (anglerfish)
├── CARDUME/
│   └── index.html                → function.js (cardume + fundo.png)
└── AGUAS VIVAS/
    └── index.html                → sketch.js (águas-vivas)
```

## 🎵 Assets necessários

Cada tela depende de uma trilha sonora e, em alguns casos, imagens de fundo, que precisam estar na mesma pasta do respectivo `index.html`:

- `Lake Verity.mp3` — Ilha
- `Maridia (Swampy Caverns).mp3` — Profundezas
- `mario.mp3` — Águas Vivas
- `zelda3.mp3` — Águas Rasas
- `DokiDokiLiteratureClub!.mp3` — Monstro dos Mares
- `Zelda Majoras Mask.mp3` — Peixe Diabo
- `DonkeyKongCountry.mp3` — Cardume
- `Spongebob Bubble.mp3` — efeito sonoro de bolha (usado em todas as transições)
- `fundo.png` — imagem de fundo do Cardume
- `fundo2.jpg` — imagem de fundo das Águas Vivas

> ⚠️ Todas as trilhas sonoras são de jogos/obras de terceiros e foram utilizadas apenas para fins acadêmicos, sem finalidade comercial.

## ▶️ Como executar

1. Clone ou baixe o repositório.
2. Certifique-se de que todas as pastas de tela contêm os arquivos de áudio/imagem necessários.
3. Como o projeto usa `loadSound`/`loadImage` (que exigem servidor local por causa de CORS), rode um servidor local na raiz do projeto, por exemplo:
   ```bash
   npx serve .
   ```
   ou, com Python:
   ```bash
   python3 -m http.server
   ```
4. Acesse `http://localhost:PORTA` no navegador e clique para iniciar a música e a jornada pela Ilha.

## 💡 Possíveis melhorias futuras

- Adicionar uma tela de créditos com os nomes dos integrantes e fontes das trilhas sonoras
- Tornar o layout responsivo para dispositivos móveis (atualmente pensado para desktop)
- Adicionar mais ramificações de história para aumentar a rejogabilidade
- Unificar a lógica repetida de transição/bolhas em um único arquivo compartilhado entre as telas
