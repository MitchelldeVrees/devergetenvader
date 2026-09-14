"""Rebuild local fonts. Requires: python -m pip install fonttools brotli.
Sources: google/fonts, SIL Open Font License (included alongside each subset).
"""
from io import BytesIO
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import quote
from fontTools.ttLib import TTFont
from fontTools.subset import Options, Subsetter
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1] / "public" / "fonts"
ROOT.mkdir(parents=True, exist_ok=True)
BASE = "https://raw.githubusercontent.com/google/fonts/main/ofl/"
FONTS = [
    ("anton", "Anton-Regular.ttf", "anton", {}),
    ("archivo", "Archivo[wdth,wght].ttf", "archivo", {"wdth": 100, "wght": (400, 700)}),
    ("ebgaramond", "EBGaramond[wght].ttf", "garamond", {"wght": (400, 600)}),
    ("ebgaramond", "EBGaramond-Italic[wght].ttf", "garamond-italic", {"wght": 500}),
    ("caveat", "Caveat[wght].ttf", "caveat", {"wght": 400}),
]
for family, source, name, axes in FONTS:
    raw = urlopen(BASE + family + "/" + quote(source), timeout=30).read()
    font = TTFont(BytesIO(raw))
    if axes:
        font = instantiateVariableFont(font, axes, inplace=True)
    options = Options()
    options.flavor = "woff2"
    options.layout_features = ["kern", "liga", "clig"]
    subset = Subsetter(options=options)
    # Latin-1 covers Dutch accents. Include common punctuation, Euro, arrows.
    subset.populate(unicodes=list(range(0x20, 0x100)) + list(range(0x2000, 0x2070)) + [0x0132, 0x0133, 0x0152, 0x0153, 0x20ac, 0x2192, 0x2212, 0x2665])
    subset.subset(font)
    # Modified subsets receive distinct family/PostScript names (OFL reserved names).
    for record in font['name'].names:
        if record.nameID in (1, 3, 4, 6, 16, 17):
            value = "DVV-" + name
            record.string = value.encode(record.getEncoding(), errors="replace")
    font.flavor = "woff2"
    font.save(ROOT / f"{name}.woff2")
    license_text = urlopen(BASE + family + "/OFL.txt", timeout=30).read()
    (ROOT / f"{family}-OFL.txt").write_bytes(license_text)
    print(name, (ROOT / f"{name}.woff2").stat().st_size, "bytes")
