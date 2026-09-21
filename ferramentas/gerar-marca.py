"""Gera a marca da loja e todos os formatos de icone.

A marca e a propria etiqueta de preco da vitrine: estrela de papel amarela,
contorno de caneta vermelha, iniciais no letreiro condensado da fachada.
A mesma estrela do componente `src/components/Etiqueta.astro` e as mesmas cores
de `src/styles/global.css` - o icone e o site falam a mesma lingua.

As letras NAO sao texto: sao os contornos reais da Bricolage Grotesque em
peso 800 / largura 75, extraidos da fonte e convertidos em caminho. Assim o
desenho e identico em qualquer maquina, sem depender de fonte instalada.

Rodar:  python ferramentas/gerar-marca.py
Precisa de: fontTools + brotli (Python) e sharp (ja vem com o Astro).
"""
import json, math, pathlib, subprocess, sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = RAIZ / 'public'
FONTE = RAIZ / 'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2'

# Tokens de src/styles/global.css. Nenhuma cor inventada.
AMARELO = '#ffcc1a'      # --etiqueta
VERMELHO = '#c8241c'     # --marcador
VERDE = '#145a2b'        # --lona-800
VERDE_FUNDO = '#186a33'  # --lona-700


def glifos():
    """Contornos do G e do R, no mesmo peso e largura do letreiro do topo."""
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.boundsPen import BoundsPen

    ft = instancer.instantiateVariableFont(
        TTFont(FONTE), {'wght': 800, 'wdth': 75, 'opsz': 96}, inplace=False)
    gs, cmap = ft.getGlyphSet(), ft.getBestCmap()
    saida = {}
    for ch in 'GR':
        nome = cmap[ord(ch)]
        caneta = SVGPathPen(gs); gs[nome].draw(caneta)
        caixa = BoundsPen(gs); gs[nome].draw(caixa)
        saida[ch] = {'d': caneta.getCommands(), 'largura': gs[nome].width, 'caixa': caixa.bounds}
    return saida


def estrela(raio_externo=48.0, pontas=18, interno=37.0):
    """Raio levemente irregular, como papel recortado a mao. Igual a Etiqueta.astro,
    com as pontas mais fundas: a 16px a silhueta precisa ler como adesivo, nao como tampinha."""
    k = raio_externo / 50.0
    pontos = []
    for i in range(pontas * 2):
        ang = math.pi * i / pontas - math.pi / 2
        raio = ((50 - (i % 3) * 0.8) if i % 2 == 0 else (interno + (i % 4) * 0.5)) * k
        pontos.append(f'{50 + raio * math.cos(ang):.2f},{50 + raio * math.sin(ang):.2f}')
    return ' '.join(pontos)


def iniciais(gl, largura_alvo):
    g, r = gl['G'], gl['R']
    x0, x1 = g['caixa'][0], r['largura'] + r['caixa'][2]
    y0 = min(g['caixa'][1], r['caixa'][1])
    y1 = max(g['caixa'][3], r['caixa'][3])
    escala = largura_alvo / (x1 - x0)
    # scale(s, -s): a fonte cresce para cima, o SVG para baixo
    t = (f'translate(50 50) scale({escala:.5f} {-escala:.5f}) '
         f'translate({-(x0 + x1) / 2:.1f} {-(y0 + y1) / 2:.1f})')
    return (f'<g transform="{t}" fill="{VERDE}"><path d="{g["d"]}"/>'
            f'<path transform="translate({r["largura"]} 0)" d="{r["d"]}"/></g>')


def marca(gl, raio=48.0, letras=62.0, traco=1.7, inclinacao=-8.0, fundo=None):
    corpo = (f'<polygon points="{estrela(raio)}" fill="{AMARELO}" stroke="{VERMELHO}" '
             f'stroke-width="{traco}" stroke-linejoin="round"/>') + iniciais(gl, letras)
    atras = f'<rect width="100" height="100" fill="{fundo}"/>' if fundo else ''
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
            f'{atras}<g transform="rotate({inclinacao} 50 50)">{corpo}</g></svg>')


def png(svg_texto, destino, lado):
    """Rasteriza com o sharp que ja acompanha o Astro."""
    script = (
        "const sharp=require('sharp');"
        f"sharp(Buffer.from(process.argv[1]),{{density:1200}}).resize({lado},{lado})"
        f".png().toFile(process.argv[2]).then(()=>console.log('ok'));"
    )
    subprocess.run([('npx.cmd' if sys.platform == 'win32' else 'npx'), 'node', '-e', script,
                    svg_texto, str(destino)], cwd=RAIZ, check=True,
                   capture_output=True, shell=(sys.platform == 'win32'))


if __name__ == '__main__':
    gl = glifos()
    PUBLIC.mkdir(exist_ok=True)

    # 1. Icone principal: fundo transparente, serve em aba clara e escura
    solto = marca(gl)
    (PUBLIC / 'favicon.svg').write_text(solto, encoding='utf-8')

    # 2. Quadrado verde: iOS e Android recortam o icone e nao aceitam transparencia
    quadrado = marca(gl, raio=43, letras=56, fundo=VERDE_FUNDO)
    png(quadrado, PUBLIC / 'apple-touch-icon.png', 180)

    # 3. Foto de perfil do Google: quadrado grande
    png(quadrado, RAIZ / 'ferramentas/logo-google.png', 720)

    # 4. favicon.ico: e o que navegador antigo e link compartilhado procuram na raiz
    from PIL import Image
    tmp = PUBLIC / '_ico.png'
    png(solto, tmp, 64)
    Image.open(tmp).save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
    tmp.unlink()

    for f in ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']:
        print(f'  public/{f}  {(PUBLIC / f).stat().st_size} bytes')
    print('  ferramentas/logo-google.png  (subir no Perfil da Empresa)')
