"""Gera os prints das telas do protótipo em docs/imagens/telas.

Uso:
    pip install playwright pillow
    playwright install chromium
    python scripts/gerar-prints.py
"""
import functools
import http.server
import threading
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
PROTOTIPO = RAIZ / "prototipo"
SAIDA = RAIZ / "docs" / "imagens" / "telas"
PORTA = 8765

TELAS = [
    ("01-onboarding", "Main.dc.html", ""),
    ("02-mapa", "Home.dc.html", ""),
    ("03-trilha", "Missao.dc.html", ""),
    ("04-captura-scan", "Conexao.dc.html", ""),
    ("05-captura-sucesso", "Conexao.dc.html", '?state={"step":2}'),
    ("06-capturado", "Consentimento.dc.html", ""),
    ("07-caranguejodex", "Perfil.dc.html", ""),
    ("08-certificado", "Certificado.dc.html", ""),
    ("09-patrocinador", "Patrocinador.dc.html", ""),
]
VISAO_GERAL = ["01-", "02-", "03-", "05-", "06-", "07-"]


def servidor():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(PROTOTIPO))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORTA), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def capturar():
    SAIDA.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        navegador = p.chromium.launch()
        pagina = navegador.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1.5)
        for nome, arquivo, estado in TELAS:
            pagina.goto(f"http://127.0.0.1:{PORTA}/{arquivo}{estado.replace(chr(34), '%22')}")
            pagina.wait_for_selector("body[data-ready='1']")
            pagina.wait_for_load_state("networkidle")
            pagina.evaluate("document.fonts.ready")
            tela = pagina.locator("body > div").first
            tela.screenshot(path=str(SAIDA / f"{nome}.png"))
            print("ok", nome)
        navegador.close()


def montar_visao_geral():
    arquivos = sorted(f for f in SAIDA.glob("0*.png") if any(f.name.startswith(k) for k in VISAO_GERAL))
    telas = [Image.open(f).resize((390, 844)) for f in arquivos]
    folha = Image.new("RGB", (len(telas) * 414 + 24, 892), (239, 239, 239))
    for i, tela in enumerate(telas):
        folha.paste(tela, (24 + i * 414, 24))
    folha.save(SAIDA / "visao-geral.png")
    print("ok visao-geral")


if __name__ == "__main__":
    httpd = servidor()
    try:
        capturar()
        montar_visao_geral()
    finally:
        httpd.shutdown()
