# MJ Guitars – Sito: Anleitung

## Dateien und Ordner

```
mjguitars-site/
├── index.html          Startseite (Texte, Sektionen)
├── impressum.html      Impressum (Entwurf, vor Start prüfen)
├── datenschutz.html    Datenschutz (Entwurf, vor Start prüfen)
├── css/style.css       Farben, Schriften, Layout (Farben ganz oben)
├── js/main.js          Logik: Filter, Galerie, WhatsApp, Sprache (DE/EN)
├── data/guitars.json   ← ALLE Gitarren (wird vom Admin-Panel geändert)
├── images/
│   ├── logo.jpg        Logo
│   └── uploads/        ← Fotos, die über das Panel hochgeladen werden
└── admin/
    ├── index.html      Verwaltungsbereich (/admin)
    └── config.yml      Welche Felder im Panel erscheinen
```

## Lokal ansehen (VS Code)
1. Erweiterung **„Live Server“** in VS Code installieren (Erweiterungen-Symbol links, nach „Live Server“ suchen, Installieren).
2. Ordner `mjguitars-site` in VS Code öffnen.
3. Rechtsklick auf `index.html` → **„Open with Live Server“**.

Die Gitarren werden aus `data/guitars.json` geladen. Ohne Live Server (Doppelklick auf die Datei) erscheinen die Gitarren nicht.

## Gitarren verwalten (für Milos, über /admin)
1. Im Browser `https://[Seitenadresse]/admin` öffnen und mit der Einladung anmelden.
2. **Gitarren** → **Gitarren-Liste** → **Neue Gitarre hinzufügen**.
3. Marke, Modell, Kategorie, Zustand, Baujahr, Preis, Beschreibung und Fotos ausfüllen.
4. Fotos: das erste Foto ist das Titelbild. 10 bis 20 Fotos pro Gitarre sind ideal.
5. Verkaufte Gitarre: „Verkauft“ einschalten (sie bleibt mit Badge sichtbar) oder die Gitarre im Panel löschen.
6. **Speichern** / **Veröffentlichen**. Nach 1 bis 2 Minuten ist die Änderung online.

## Texte und Kontakt ändern
- Texte: in `index.html` die Passage suchen und ändern.
- WhatsApp-Nummer: in `js/main.js` ganz oben (`WHATSAPP_NUMBER`).
- WhatsApp-Vorlagentexte: in `js/main.js` unter `WA_TEXT`.
- Englische Texte: in `js/main.js` unter `I18N.en`. Die Gitarren-Beschreibungen sind nur auf Deutsch.

## Vor dem Start (Checkliste)
- [ ] Gitarren-Fotos und -Daten eingetragen (ca. 30 Stück)
- [ ] Impressum und Datenschutz von einer Fachperson prüfen lassen
- [ ] Berufsbezeichnung im Impressum klären (WKO)
- [ ] Set-Up/Wartung: schriftliche Bestätigung von WKO oder Gewerbeamt
- [ ] Netlify Identity aktiviert und Milos eingeladen (Stefan)
- [ ] Domain verbunden und HTTPS aktiv (Netlify)
- [ ] Passwörter geändert und sicher aufbewahrt
- [ ] Test auf Handy und Computer (Chrome, Safari)
- [ ] Ende-zu-Ende-Test: Filter, Galerie, WhatsApp-Link, Admin-Panel

## Hinweis
Die aktuell eingetragenen Gitarren in `data/guitars.json` sind Beispieldaten. Vor dem Start durch die echten Daten ersetzen oder im Panel löschen.
