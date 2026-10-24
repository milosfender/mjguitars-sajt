#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MJ Guitars – Foto verkleinern und Gitarrenliste erstellen.

Aufruf (im Terminal von VS Code):
    py preparare.py "C:\\Pfad\\zu\\Gitarren"

Der angegebene Ordner enthält pro Gitarre einen Unterordner mit den Fotos
und einer Datei info.txt. Das Skript:
  1. verkleinert alle Fotos (max. 1600 px, JPEG) nach images/guitars/<ordner>/
  2. erstellt data/guitars.json neu (die alte Datei wird vorher als .bak gesichert)
Chitarre senza info.txt o con dati mancanti vengono saltate e segnalate.
"""

import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageOps

CATEGORIES = ["E-Gitarre", "Akustikgitarre", "Klassische Gitarre", "E-Bass", "Akustikbass", "Verstärker", "Sonstiges"]
CONDITIONS = ["Neu", "Neu – Ausstellungsstück", "Wie neu", "Gebraucht – sehr gut", "Gebraucht – gut", "Gebraucht – Gebrauchsspuren"]

MAX_SIZE = 1600      # längste Seite in Pixel
QUALITY = 82         # JPEG-Qualität
IMG_EXT = {".jpg", ".jpeg", ".png", ".webp"}

# Erlaubte Schlüssel in info.txt (links) und ihre interne Bedeutung
ALIASES = {
    "marca": "brand", "marke": "brand", "brand": "brand",
    "modello": "model", "modell": "model", "model": "model",
    "categoria": "category", "kategorie": "category", "category": "category",
    "stato": "condition", "zustand": "condition", "condition": "condition",
    "anno": "year", "baujahr": "year", "year": "year",
    "prezzo": "price", "preis": "price", "price": "price",
    "verkauft": "sold", "sold": "sold",
    "beschreibung": "description", "descrizione": "description", "description": "description",
}


def read_info(path):
    """Liest info.txt (UTF-8 oder Windows-Kodierung) als Dictionary."""
    raw = path.read_bytes()
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        text = raw.decode("cp1252")
    data = {}
    for line in text.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        internal = ALIASES.get(key.strip().lower())
        if internal:
            data[internal] = value.strip()
    return data


def parse_price(value):
    digits = re.sub(r"[^\d]", "", value or "")
    return int(digits) if digits else None


def parse_year(value):
    digits = re.sub(r"[^\d]", "", value or "")
    return int(digits[:4]) if len(digits) >= 4 else None


def convert_photo(src, target):
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((MAX_SIZE, MAX_SIZE))
        im.save(target, "JPEG", quality=QUALITY, optimize=True, progressive=True)


def main():
    if len(sys.argv) < 2:
        print('Uso: py preparare.py "C:\\Percorso\\alla\\cartella\\Chitarre"')
        sys.exit(1)

    source = Path(sys.argv[1]).expanduser()
    if not source.is_dir():
        print(f"Cartella non trovata: {source}")
        sys.exit(1)

    project = Path(__file__).resolve().parent
    out_images = project / "images" / "guitars"
    out_json = project / "data" / "guitars.json"

    guitars, warnings = [], []
    photo_count = 0

    for folder in sorted(p for p in source.iterdir() if p.is_dir()):
        info_file = folder / "info.txt"
        if not info_file.exists():
            warnings.append(f"{folder.name}: info.txt mancante, saltata")
            continue

        info = read_info(info_file)
        missing = [k for k in ("brand", "model", "category", "condition", "year", "price") if not info.get(k)]
        price = parse_price(info.get("price"))
        year = parse_year(info.get("year"))
        if missing or price is None or year is None:
            warnings.append(f"{folder.name}: dati mancanti {missing or ''} – saltata")
            continue

        if info["category"] not in CATEGORIES:
            warnings.append(f"{folder.name}: categoria '{info['category']}' non presente nell'elenco")
        if info["condition"] not in CONDITIONS:
            warnings.append(f"{folder.name}: stato '{info['condition']}' non presente nell'elenco")

        dest = out_images / folder.name
        dest.mkdir(parents=True, exist_ok=True)
        for old in dest.glob("*"):
            old.unlink()

        photos = []
        sources = sorted(f for f in folder.iterdir() if f.suffix.lower() in IMG_EXT)
        for index, src in enumerate(sources, start=1):
            target = dest / f"{index:02d}.jpg"
            try:
                convert_photo(src, target)
                photos.append(f"images/guitars/{folder.name}/{target.name}")
                photo_count += 1
            except Exception as err:
                warnings.append(f"{folder.name}/{src.name}: foto non leggibile ({err}) – saltata")

        if not photos:
            warnings.append(f"{folder.name}: nessuna foto trovata")

        guitars.append({
            "brand": info["brand"],
            "model": info["model"],
            "category": info["category"],
            "condition": info["condition"],
            "year": year,
            "price": price,
            "description": info.get("description", ""),
            "photos": photos,
            "sold": info.get("sold", "nein").lower() in ("ja", "yes", "true", "1"),
        })
        print(f"OK  {folder.name}: {len(photos)} foto")

    out_json.parent.mkdir(parents=True, exist_ok=True)
    if out_json.exists():
        shutil.copy(out_json, out_json.with_suffix(".json.bak"))
    out_json.write_text(json.dumps({"guitars": guitars}, ensure_ascii=False, indent=2), encoding="utf-8")

    print()
    print(f"Fatto: {len(guitars)} chitarre, {photo_count} foto.")
    print(f"Lista salvata in: {out_json}")
    if warnings:
        print("\nAvvisi:")
        for w in warnings:
            print(f"  - {w}")


if __name__ == "__main__":
    main()