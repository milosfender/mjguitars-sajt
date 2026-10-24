/* ==========================================================
   MJ Guitars – Logik
   Lädt die Gitarren aus data/guitars.json, baut Filter, Karten,
   Galerie und WhatsApp-Links. Texte für DE/EN stehen unten.
   ========================================================== */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "4369918132766";
  var DATA_URL = "data/guitars.json";

  // Alle Kategorien: werden immer als Button angezeigt, auch wenn gerade keine Gitarre drin ist
  var ALL_CATEGORIES = ["E-Gitarre", "Akustikgitarre", "Klassische Gitarre", "E-Bass", "Akustikbass", "Verstärker", "Sonstiges"];

  /* ---------- Texte (Deutsch / Englisch) ---------- */
  var I18N = {
    de: {
      nav_guitars: "Gitarren", nav_service: "Service", nav_sell: "Verkaufen", nav_contact: "Kontakt",
      hero_eyebrow: "Gitarren & Bässe in Wien",
      hero_title: "Gitarren & Bässe mit Charakter.",
      hero_lead: "Neue und gebrauchte Instrumente für jedes Budget, ehrliche Beratung und Set-Up nach Terminvereinbarung. Vom ersten Akkord bis zur Bühne.",
      cta_book: "Termin vereinbaren", cta_call: "Anrufen",
      quote_text: "Nichts ist schöner als eine Gitarre. Außer vielleicht zwei.",
      guitars_eyebrow: "Aktuell zum Verkauf", guitars_title: "Unsere Gitarren",
      count: "{n} Gitarren", count_one: "1 Gitarre",
      filter_search: "Suche", filter_search_ph: "z.B. Stratocaster, Yamaha",
      filter_category: "Kategorie", filter_brand: "Marke", filter_condition: "Zustand",
      filter_year: "Baujahr", filter_price: "Preis", filter_sort: "Sortierung",
      filter_reset: "Filter zurücksetzen",
      filter_advanced: "Erweiterte Suche",
      all: "Alle",
      year_any: "Alle Jahre", year_old: "vor 1990", year_90: "1990–2009", year_10: "2010–2019", year_20: "ab 2020",
      price_any: "Alle Preise", price_1: "bis 300 €", price_2: "300–700 €", price_3: "700–1.500 €", price_4: "über 1.500 €",
      sort_default: "Neueste zuerst", sort_price_up: "Preis aufsteigend", sort_price_down: "Preis absteigend", sort_year: "Baujahr (neueste)",
      sold: "Verkauft", details: "Details", ask: "Anfragen", photo_soon: "Fotos folgen",
      empty: "Zu diesen Filtern gibt es gerade keine Gitarre. Schreiben Sie uns, vielleicht haben wir etwas Passendes.",
      error: "Die Gitarren konnten gerade nicht geladen werden. Bitte versuchen Sie es später noch einmal.",
      year_label: "Baujahr", condition_label: "Zustand", close: "Schließen", prev: "Vorheriges Foto", next: "Nächstes Foto",
      note_willhaben: "Weitere Angebote finden Sie auf",
      service_eyebrow: "Im Studio", service_title: "Set-Up & Wartung",
      service_lead: "Damit Ihre Gitarre optimal spielt: sauber eingestellt, richtig intoniert und mit frischen Saiten. Termin nach Vereinbarung.",
      service_cta: "Service anfragen",
      service_maint: "Wartung & Set-Up", service_acc: "Zubehör",
      s_setup: "Set-Up und Halskrümmung", s_intonation: "Intonation", s_strings: "Neubesaitung",
      s_pickups: "Tonabnehmer (Pickups): Einbau und Tausch", s_pots: "Potentiometer-Austausch",
      a_strings: "Saiten, Gurte, Kapodaster", a_cases: "Taschen und Koffer", a_picks: "Plektren und Kabel", a_amps: "Verstärker und Effekte",
      sell_title: "Gitarre verkaufen?",
      sell_text: "Wir kaufen gebrauchte Gitarren, Bässe und Verstärker zu fairen Preisen. Schicken Sie uns ein paar Fotos per WhatsApp und erhalten Sie ein Angebot.",
      sell_cta: "Fotos per WhatsApp senden",
      contact_eyebrow: "Termin nach Vereinbarung", contact_title: "Kontakt",
      contact_address: "Adresse", contact_phone: "Telefon & WhatsApp", contact_email: "E-Mail",
      contact_map: "In Google Maps öffnen",
      map_load: "Karte laden",
      map_note: "Beim Laden der Karte werden Daten an Google übertragen.",
      map_more: "Mehr dazu",
      footer_imprint: "Impressum", footer_privacy: "Datenschutz",
      wa_label: "WhatsApp schreiben"
    },
    en: {
      nav_guitars: "Guitars", nav_service: "Service", nav_sell: "Sell", nav_contact: "Contact",
      hero_eyebrow: "Guitars & Basses in Vienna",
      hero_title: "Guitars & basses with character.",
      hero_lead: "New and used instruments for every budget, honest advice and set-up by appointment. From the first chord to the stage.",
      cta_book: "Book an appointment", cta_call: "Call",
      quote_text: "Nothing is more beautiful than a guitar. Except, maybe, two.",
      guitars_eyebrow: "Currently for sale", guitars_title: "Our guitars",
      count: "{n} guitars", count_one: "1 guitar",
      filter_search: "Search", filter_search_ph: "e.g. Stratocaster, Yamaha",
      filter_category: "Category", filter_brand: "Brand", filter_condition: "Condition",
      filter_year: "Year", filter_price: "Price", filter_sort: "Sort by",
      filter_reset: "Reset filters",
      filter_advanced: "Advanced search",
      all: "All",
      year_any: "All years", year_old: "before 1990", year_90: "1990–2009", year_10: "2010–2019", year_20: "2020 onwards",
      price_any: "All prices", price_1: "up to 300 €", price_2: "300–700 €", price_3: "700–1,500 €", price_4: "over 1,500 €",
      sort_default: "Newest first", sort_price_up: "Price: low to high", sort_price_down: "Price: high to low", sort_year: "Year (newest)",
      sold: "Sold", details: "Details", ask: "Enquire", photo_soon: "Photos coming soon",
      empty: "No guitars match these filters right now. Write to us, we may have something suitable.",
      error: "The guitars could not be loaded right now. Please try again later.",
      year_label: "Year", condition_label: "Condition", close: "Close", prev: "Previous photo", next: "Next photo",
      note_willhaben: "More offers can be found on",
      service_eyebrow: "In the studio", service_title: "Set-up & maintenance",
      service_lead: "So your guitar plays its best: properly adjusted, intonated and with fresh strings. By appointment.",
      service_cta: "Enquire about service",
      service_maint: "Maintenance & set-up", service_acc: "Accessories",
      s_setup: "Set-up and neck adjustment", s_intonation: "Intonation", s_strings: "Restringing",
      s_pickups: "Pickups: installation and replacement", s_pots: "Potentiometer replacement",
      a_strings: "Strings, straps, capos", a_cases: "Bags and cases", a_picks: "Picks and cables", a_amps: "Amps and effects",
      sell_title: "Want to sell your guitar?",
      sell_text: "We buy used guitars, basses and amps at fair prices. Send us a few photos on WhatsApp and get an offer.",
      sell_cta: "Send photos on WhatsApp",
      contact_eyebrow: "By appointment", contact_title: "Contact",
      contact_address: "Address", contact_phone: "Phone & WhatsApp", contact_email: "Email",
      contact_map: "Open in Google Maps",
      map_load: "Load map",
      map_note: "Loading the map sends data to Google.",
      map_more: "Learn more",
      footer_imprint: "Imprint", footer_privacy: "Privacy",
      wa_label: "Write on WhatsApp"
    }
  };

  /* ---------- WhatsApp-Nachrichten ---------- */
  var WA_TEXT = {
    de: {
      general: "Hallo MJ Guitars, ich habe eine Frage:",
      termin: "Hallo MJ Guitars, ich möchte gerne einen Termin vereinbaren.",
      service: "Hallo MJ Guitars, ich interessiere mich für einen Service an meiner Gitarre. Wann ist ein Termin möglich?",
      ankauf: "Hallo MJ Guitars, ich möchte eine Gitarre verkaufen. Fotos schicke ich gleich mit.",
      inquiry: "Hallo MJ Guitars, ich interessiere mich für die {name} ({price}, Baujahr {year}). Ist sie noch verfügbar?"
    },
    en: {
      general: "Hello MJ Guitars, I have a question:",
      termin: "Hello MJ Guitars, I would like to book an appointment.",
      service: "Hello MJ Guitars, I am interested in a service for my guitar. When is an appointment possible?",
      ankauf: "Hello MJ Guitars, I would like to sell a guitar. I will send photos along.",
      inquiry: "Hello MJ Guitars, I am interested in the {name} ({price}, year {year}). Is it still available?"
    }
  };

  /* ---------- Zustand ---------- */
  var state = {
    lang: "de",
    guitars: [],
    loadError: false,
    category: "all",
    categories: [],
    gallery: { guitar: null, index: 0 }
  };

  function t(key) {
    var dict = I18N[state.lang] || I18N.de;
    return dict[key] !== undefined ? dict[key] : (I18N.de[key] || key);
  }

  function waUrl(text) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function fmtPrice(n) {
    return Number(n).toLocaleString(state.lang === "en" ? "en-GB" : "de-AT") + " €";
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignorieren */ }
  }

  /* ---------- Sprache ---------- */
  function applyLanguage(lang) {
    state.lang = I18N[lang] ? lang : "de";
    storageSet("mj-lang", state.lang);
    document.documentElement.lang = state.lang;

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === state.lang;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      var key = a.getAttribute("data-wa");
      a.setAttribute("href", waUrl(WA_TEXT[state.lang][key] || WA_TEXT[state.lang].general));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    document.querySelectorAll(".wa-float").forEach(function (a) {
      a.setAttribute("aria-label", t("wa_label"));
    });

    buildFilterOptions();
    renderGuitars();
  }

  /* ---------- Filter ---------- */
  var FILTER_IDS = ["f-search", "f-brand", "f-condition", "f-year", "f-price", "f-sort"];

  function renderCategoryPills() {
    var box = document.getElementById("cat-pills");
    box.innerHTML = "";
    ["all"].concat(state.categories).forEach(function (cat) {
      var btn = document.createElement("button");
      btn.type = "button";
      var count = cat === "all" ? state.guitars.length
        : state.guitars.filter(function (g) { return g.category === cat; }).length;
      var empty = cat !== "all" && count === 0;
      btn.className = "pill" + (cat === state.category ? " pill-on" : "") + (empty ? " pill-empty" : "");
      btn.textContent = cat === "all" ? t("all") : cat;
      btn.setAttribute("aria-pressed", cat === state.category ? "true" : "false");
      if (empty) btn.title = state.lang === "en" ? "No guitars in this category yet" : "In dieser Kategorie gibt es noch keine Gitarren";
      btn.addEventListener("click", function () {
        state.category = cat;
        renderCategoryPills();
        renderGuitars();
      });
      box.appendChild(btn);
    });
  }

  function uniqueSorted(values) {
    var seen = {};
    return values.filter(function (v) {
      if (!v || seen[v]) return false;
      seen[v] = true;
      return true;
    }).sort(function (a, b) { return a.localeCompare(b, "de"); });
  }

  function fillSelect(id, options, keepValue) {
    var select = document.getElementById(id);
    var previous = keepValue ? select.value : "all";
    select.innerHTML = "";
    options.forEach(function (opt) {
      var o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      select.appendChild(o);
    });
    select.value = options.some(function (o) { return o.value === previous; }) ? previous : "all";
  }

  function buildFilterOptions() {
    var extra = uniqueSorted(state.guitars.map(function (g) { return g.category; }))
      .filter(function (c) { return ALL_CATEGORIES.indexOf(c) === -1; });
    var cats = ALL_CATEGORIES.concat(extra);
    var brands = uniqueSorted(state.guitars.map(function (g) { return g.brand; }));
    var conds = uniqueSorted(state.guitars.map(function (g) { return g.condition; }));

    state.categories = cats;
    renderCategoryPills();
    fillSelect("f-brand", [{ value: "all", label: t("all") }].concat(brands.map(function (b) { return { value: b, label: b }; })), true);
    fillSelect("f-condition", [{ value: "all", label: t("all") }].concat(conds.map(function (c) { return { value: c, label: c }; })), true);
    fillSelect("f-year", [
      { value: "all", label: t("year_any") },
      { value: "old", label: t("year_old") },
      { value: "90", label: t("year_90") },
      { value: "10", label: t("year_10") },
      { value: "20", label: t("year_20") }
    ], true);
    fillSelect("f-price", [
      { value: "all", label: t("price_any") },
      { value: "1", label: t("price_1") },
      { value: "2", label: t("price_2") },
      { value: "3", label: t("price_3") },
      { value: "4", label: t("price_4") }
    ], true);
    fillSelect("f-sort", [
      { value: "default", label: t("sort_default") },
      { value: "price-up", label: t("sort_price_up") },
      { value: "price-down", label: t("sort_price_down") },
      { value: "year", label: t("sort_year") }
    ], true);
  }

  function readFilters() {
    return {
      search: document.getElementById("f-search").value.trim().toLowerCase(),
      category: state.category,
      brand: document.getElementById("f-brand").value,
      condition: document.getElementById("f-condition").value,
      year: document.getElementById("f-year").value,
      price: document.getElementById("f-price").value,
      sort: document.getElementById("f-sort").value
    };
  }

  function matchesYear(g, y) {
    if (y === "all") return true;
    if (y === "old") return g.year < 1990;
    if (y === "90") return g.year >= 1990 && g.year <= 2009;
    if (y === "10") return g.year >= 2010 && g.year <= 2019;
    if (y === "20") return g.year >= 2020;
    return true;
  }

  function matchesPrice(g, p) {
    if (p === "all") return true;
    if (p === "1") return g.price <= 300;
    if (p === "2") return g.price > 300 && g.price <= 700;
    if (p === "3") return g.price > 700 && g.price <= 1500;
    if (p === "4") return g.price > 1500;
    return true;
  }

  function applyFilters() {
    var f = readFilters();
    var list = state.guitars.filter(function (g) {
      if (f.category !== "all" && g.category !== f.category) return false;
      if (f.brand !== "all" && g.brand !== f.brand) return false;
      if (f.condition !== "all" && g.condition !== f.condition) return false;
      if (!matchesYear(g, f.year)) return false;
      if (!matchesPrice(g, f.price)) return false;
      if (f.search) {
        var hay = (g.brand + " " + g.model + " " + g.category + " " + g.description).toLowerCase();
        if (hay.indexOf(f.search) === -1) return false;
      }
      return true;
    });

    if (f.sort === "price-up") list.sort(function (a, b) { return a.price - b.price; });
    if (f.sort === "price-down") list.sort(function (a, b) { return b.price - a.price; });
    if (f.sort === "year") list.sort(function (a, b) { return b.year - a.year; });
    return list;
  }

  /* ---------- Karten ---------- */
  function renderGuitars() {
    var grid = document.getElementById("guitar-grid");
    var count = document.getElementById("count");
    grid.innerHTML = "";

    if (state.loadError) {
      grid.appendChild(el("p", "empty", t("error")));
      count.textContent = "";
      return;
    }

    var list = applyFilters();
    count.textContent = list.length === 1 ? t("count_one") : t("count").replace("{n}", list.length);

    if (list.length === 0) {
      grid.appendChild(el("p", "empty", t("empty")));
      return;
    }

    list.forEach(function (g, i) {
      var card = el("article", "card" + (g.sold ? " card-sold" : ""));

      var media = el("div", "card-media");
      if (g.photos.length) {
        var img = el("img");
        img.src = g.photos[0];
        img.alt = g.name;
        img.loading = "lazy";
        media.appendChild(img);
      } else {
        media.appendChild(el("span", "card-placeholder", t("photo_soon")));
      }
      media.appendChild(el("span", "tag", g.category));
      if (g.sold) media.appendChild(el("span", "sold-badge", t("sold")));
      card.appendChild(media);

      var body = el("div", "card-body");
      body.appendChild(el("p", "card-meta", g.year + " · " + g.condition));
      body.appendChild(el("h3", "", g.name));
      body.appendChild(el("p", "card-desc", g.description));

      var foot = el("div", "card-foot");
      foot.appendChild(el("span", "price", fmtPrice(g.price)));

      var actions = el("div", "card-actions");
      var details = el("button", "btn-outline-small", t("details"));
      details.type = "button";
      details.addEventListener("click", function () { openDetail(g); });
      actions.appendChild(details);

      if (!g.sold) {
        var ask = el("a", "btn-wa-small", t("ask"));
        ask.href = waUrl(WA_TEXT[state.lang].inquiry
          .replace("{name}", g.name)
          .replace("{price}", fmtPrice(g.price))
          .replace("{year}", String(g.year)));
        ask.target = "_blank";
        ask.rel = "noopener";
        actions.appendChild(ask);
      }
      foot.appendChild(actions);
      body.appendChild(foot);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---------- Detail & Galerie ---------- */
  var dialog = document.getElementById("detail");

  function openDetail(g) {
    state.gallery.guitar = g;
    state.gallery.index = 0;

    document.getElementById("detail-title").textContent = g.name;
    document.getElementById("d-cat").textContent = g.category;
    document.getElementById("d-meta").textContent = t("year_label") + ": " + g.year + "  ·  " + t("condition_label") + ": " + g.condition;
    document.getElementById("d-price").textContent = g.sold ? t("sold") : fmtPrice(g.price);
    document.getElementById("d-desc").textContent = g.description;

    var wa = document.getElementById("d-wa");
    if (g.sold) {
      wa.style.display = "none";
    } else {
      wa.style.display = "";
      wa.href = waUrl(WA_TEXT[state.lang].inquiry
        .replace("{name}", g.name)
        .replace("{price}", fmtPrice(g.price))
        .replace("{year}", String(g.year)));
    }
    wa.textContent = t("ask");

    renderGallery();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function renderGallery() {
    var g = state.gallery.guitar;
    var photos = g ? g.photos : [];
    var img = document.getElementById("gallery-img");
    var empty = document.getElementById("gallery-empty");
    var count = document.getElementById("g-count");
    var thumbs = document.getElementById("thumbs");
    var prev = document.getElementById("g-prev");
    var next = document.getElementById("g-next");

    thumbs.innerHTML = "";

    if (!photos.length) {
      img.removeAttribute("src");
      img.style.display = "none";
      empty.style.display = "";
      count.textContent = "";
      prev.style.display = next.style.display = "none";
      return;
    }

    img.style.display = "";
    empty.style.display = "none";
    prev.style.display = next.style.display = photos.length > 1 ? "" : "none";
    count.textContent = (state.gallery.index + 1) + " / " + photos.length;
    img.src = photos[state.gallery.index];
    img.alt = g.name + " – " + (state.gallery.index + 1);

    photos.forEach(function (src, i) {
      var b = el("button", "thumb" + (i === state.gallery.index ? " thumb-on" : ""));
      b.type = "button";
      b.setAttribute("aria-label", (i + 1) + " / " + photos.length);
      var ti = el("img");
      ti.src = src;
      ti.alt = "";
      ti.loading = "lazy";
      b.appendChild(ti);
      b.addEventListener("click", function () { state.gallery.index = i; renderGallery(); });
      thumbs.appendChild(b);
    });
  }

  function stepGallery(delta) {
    var g = state.gallery.guitar;
    if (!g || !g.photos.length) return;
    var n = g.photos.length;
    state.gallery.index = (state.gallery.index + delta + n) % n;
    renderGallery();
  }

  document.getElementById("g-prev").addEventListener("click", function () { stepGallery(-1); });
  document.getElementById("g-next").addEventListener("click", function () { stepGallery(1); });
  document.getElementById("detail-close").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (e) {
    // Klick auf den abgedunkelten Hintergrund schließt das Fenster
    if (e.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", function (e) {
    if (!dialog.open) return;
    if (e.key === "ArrowLeft") stepGallery(-1);
    if (e.key === "ArrowRight") stepGallery(1);
  });

  /* ---------- Start ---------- */
  function normalize(raw) {
    return {
      brand: String(raw.brand || "").trim(),
      model: String(raw.model || "").trim(),
      name: (String(raw.brand || "") + " " + String(raw.model || "")).trim(),
      category: raw.category || "",
      condition: raw.condition || "",
      year: Number(raw.year) || 0,
      price: Number(raw.price) || 0,
      description: raw.description || "",
      photos: Array.isArray(raw.photos) ? raw.photos.filter(Boolean) : [],
      sold: raw.sold === true
    };
  }

  function loadGuitars() {
    return fetch(DATA_URL, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        state.guitars = (data.guitars || []).map(normalize);
      })
      .catch(function (err) {
        state.loadError = true;
        console.error("Gitarren konnten nicht geladen werden:", err,
          "Tipp: Die Seite mit der Erweiterung 'Live Server' in VS Code öffnen.");
      });
  }

  function init() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { applyLanguage(btn.getAttribute("data-lang")); });
    });

    FILTER_IDS.forEach(function (id) {
      var node = document.getElementById(id);
      node.addEventListener(id === "f-search" ? "input" : "change", renderGuitars);
    });
    document.getElementById("f-reset").addEventListener("click", function () {
      document.getElementById("f-search").value = "";
      ["f-brand", "f-condition", "f-year", "f-price"].forEach(function (id) {
        document.getElementById(id).value = "all";
      });
      document.getElementById("f-sort").value = "default";
      state.category = "all";
      renderCategoryPills();
      renderGuitars();
    });

    // Google Maps erst nach Klick laden (keine Daten an Google ohne Zustimmung)
    var mapLoad = document.getElementById("map-load");
    if (mapLoad) {
      mapLoad.addEventListener("click", function () {
        var box = document.getElementById("map");
        var frame = document.createElement("iframe");
        frame.src = box.getAttribute("data-src");
        frame.title = "MJ Guitars auf Google Maps";
        frame.loading = "lazy";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.style.border = "0";
        box.innerHTML = "";
        box.appendChild(frame);
      });
    }

    var saved = storageGet("mj-lang");
    state.lang = saved && I18N[saved] ? saved : "de";

    loadGuitars().then(function () {
      applyLanguage(state.lang);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
