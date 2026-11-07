/* ==========================================================
   MJ Guitars – Logik
   Lädt die Produkte aus data/guitars.json und die Bewertungen aus
   data/reviews.json, baut Menü, Filter, Karten, Galerie, Vollbild-Zoom
   und WhatsApp-Links. Texte für DE/EN stehen unten.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Einstellungen (hier ändern) ---------- */
  var WHATSAPP_NUMBER = "4369918132766";
  // Link zur Willhaben-Seite von Milos: nur hier ändern, gilt für alle Willhaben-Links der Seite
  var WILLHABEN_URL = "https://www.willhaben.at/iad/kaufen-und-verkaufen/d/ankauf-best-preise-e-gitarre-e-bass-western-klassik-fender-gibson-1889391876/";
  var DATA_URL = "data/guitars.json";
  var REVIEWS_URL = "data/reviews.json";

  // Kategorien: "key" ist der Wert im Panel, "menu" = erscheint im Menü „Produkte“ und immer als Filter
  var CATEGORIES = [
    { key: "E-Gitarre", de: "E-Gitarren", en: "Electric guitars", sub_de: "Strat, Tele, Les Paul & mehr", sub_en: "Strat, Tele, Les Paul & more", menu: true },
    { key: "Westerngitarre", de: "Westerngitarren", en: "Acoustic guitars", sub_de: "Akustik mit Stahlsaiten", sub_en: "Steel-string acoustics", menu: true },
    { key: "Klassische Gitarre", de: "Klassische Gitarren", en: "Classical guitars", sub_de: "Konzertgitarren mit Nylonsaiten", sub_en: "Nylon-string guitars", menu: true },
    { key: "E-Bass", de: "E-Bässe", en: "Bass guitars", sub_de: "4-, 5- & 6-Saiter", sub_en: "4, 5 & 6 strings", menu: true },
    { key: "Verstärker", de: "Verstärker", en: "Amplifiers", sub_de: "Röhre, Transistor & Modeling", sub_en: "Tube, solid-state & modeling", menu: true },
    { key: "Effektpedal", de: "Effektpedale", en: "Effect pedals", sub_de: "Overdrive, Delay, Reverb & mehr", sub_en: "Overdrive, delay, reverb & more", menu: true },
    { key: "Akustikbass", de: "Akustikbässe", en: "Acoustic basses", menu: false },
    { key: "Sonstiges", de: "Sonstiges", en: "Other", menu: false }
  ];
  // Alte Kategorienamen, die automatisch übernommen werden
  var LEGACY_CATEGORIES = { "Akustikgitarre": "Westerngitarre" };

  /* ---------- Texte (Deutsch / Englisch) ---------- */
  var I18N = {
    de: {
      nav_products: "Produkte", nav_service: "Service", nav_sell: "Verkaufen", nav_contact: "Kontakt",
      menu_eyebrow: "Aktuell im Studio", menu_all: "Alle Produkte ansehen", menu_empty: "bald",
      hero_eyebrow: "Gitarren & Bässe in Wien",
      hero_title: "Gitarren & Bässe mit Charakter.",
      hero_lead: "Gebrauchte Gitarren und Bässe mit Geschichte – für jedes Budget, mit ehrlicher Beratung und Set-Up nach Terminvereinbarung. Vom ersten Akkord bis zur Bühne.",
      cta_book: "Termin vereinbaren", cta_call: "Anrufen",
      quote_l1: "Nichts ist schöner als eine Gitarre.", quote_l2: "Außer vielleicht zwei.",
      guitars_eyebrow: "Aktuell zum Verkauf", guitars_title: "Unsere Produkte",
      count: "{n} Angebote", count_one: "1 Angebot",
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
      empty: "Zu diesen Filtern gibt es gerade kein Angebot. Schreiben Sie uns, vielleicht haben wir etwas Passendes.",
      empty_cat: "In dieser Kategorie gibt es gerade nichts",
      error: "Die Angebote konnten gerade nicht geladen werden. Bitte versuchen Sie es später noch einmal.",
      year_label: "Baujahr", condition_label: "Zustand", close: "Schließen", prev: "Vorheriges Foto", next: "Nächstes Foto",
      zoom_open: "Vollbild", zoom_hint: "Doppelt tippen oder mit zwei Fingern zoomen",
      zoom_in: "Vergrößern", zoom_out: "Verkleinern", zoom_fs: "Vollbild",
      note_willhaben: "Weitere Angebote finden Sie auf",
      reviews_eyebrow: "Google-Bewertungen", reviews_title: "Das sagen unsere Kunden",
      reviews_more: "Alle Bewertungen auf Google", reviews_count: "{n} Bewertungen auf Google", reviews_count_one: "1 Bewertung auf Google",
      service_eyebrow: "Im Studio", service_title: "Set-Up & Wartung",
      service_lead: "Damit Ihre Gitarre optimal spielt: sauber eingestellt und richtig intoniert. Termin nach Vereinbarung.",
      service_cta: "Service anfragen",
      s_setup: "Set-Up & Halskrümmung", s_setup_d: "Saitenlage und Halsstab so eingestellt, dass sich die Gitarre leicht spielt.",
      s_intonation: "Intonation", s_intonation_d: "Jeder Ton sitzt sauber, auch weit oben am Griffbrett.",
      s_pickups: "Tonabnehmer (Pickups)", s_pickups_d: "Einbau und Tausch von Pickups für Ihren Wunschsound.",
      s_pots: "Potentiometer", s_pots_d: "Kratzende oder defekte Potis werden ausgetauscht.",
      about_eyebrow: "Über uns", about_title: "Willkommen bei MJ Guitars",
      about_p1: "MJ Guitars ist weiterhin für Sie da – jetzt ausschließlich nach Terminvereinbarung.",
      about_p2: "Als Ein-Mann-Betrieb biete ich Ihnen persönliche Beratung und fairen Service – und nehme mir für jeden Termin ausreichend Zeit. Sie möchten ein Instrument kaufen, verkaufen oder servicieren lassen? Melden Sie sich einfach: Besichtigungen, An- und Verkäufe sowie Servicearbeiten erfolgen ausschließlich nach Terminvereinbarung.",
      about_tagline: "Persönlicher Service, kompetente Beratung und faire Preise.",
      about_p3: "Ich freue mich auf Ihre Anfrage!",
      beethoven_text: "Eine falsche Note zu spielen ist unwichtig, aber ohne Leidenschaft zu spielen ist unverzeihlich.",
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
      nav_products: "Products", nav_service: "Service", nav_sell: "Sell", nav_contact: "Contact",
      menu_eyebrow: "Currently in the studio", menu_all: "View all products", menu_empty: "soon",
      hero_eyebrow: "Guitars & Basses in Vienna",
      hero_title: "Guitars & basses with character.",
      hero_lead: "Pre-owned guitars and basses with a story – for every budget, with honest advice and set-up by appointment. From the first chord to the stage.",
      cta_book: "Book an appointment", cta_call: "Call",
      quote_l1: "Nothing is more beautiful than a guitar.", quote_l2: "Except, maybe, two.",
      guitars_eyebrow: "Currently for sale", guitars_title: "Our products",
      count: "{n} items", count_one: "1 item",
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
      empty: "Nothing matches these filters right now. Write to us, we may have something suitable.",
      empty_cat: "Nothing in this category right now",
      error: "The products could not be loaded right now. Please try again later.",
      year_label: "Year", condition_label: "Condition", close: "Close", prev: "Previous photo", next: "Next photo",
      zoom_open: "Full screen", zoom_hint: "Double-tap or pinch to zoom",
      zoom_in: "Zoom in", zoom_out: "Zoom out", zoom_fs: "Full screen",
      note_willhaben: "More offers can be found on",
      reviews_eyebrow: "Google reviews", reviews_title: "What our customers say",
      reviews_more: "All reviews on Google", reviews_count: "{n} reviews on Google", reviews_count_one: "1 review on Google",
      service_eyebrow: "In the studio", service_title: "Set-up & maintenance",
      service_lead: "So your guitar plays its best: properly adjusted and intonated. By appointment.",
      service_cta: "Enquire about service",
      s_setup: "Set-up & neck relief", s_setup_d: "String action and truss rod adjusted so the guitar plays easily.",
      s_intonation: "Intonation", s_intonation_d: "Every note in tune, all the way up the neck.",
      s_pickups: "Pickups", s_pickups_d: "Pickup installation and swaps for the sound you want.",
      s_pots: "Potentiometers", s_pots_d: "Scratchy or faulty pots replaced.",
      about_eyebrow: "About us", about_title: "Welcome to MJ Guitars",
      about_p1: "MJ Guitars is still here for you – now by appointment only.",
      about_p2: "As a one-man business, I offer personal advice and fair service – and take enough time for every appointment. Want to buy, sell or service an instrument? Just get in touch: viewings, purchases, sales and service work are by appointment only.",
      about_tagline: "Personal service, expert advice and fair prices.",
      about_p3: "I look forward to hearing from you!",
      beethoven_text: "To play a wrong note is insignificant; to play without passion is inexcusable.",
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
      inquiry: "Hallo MJ Guitars, ich interessiere mich für: {name} ({price}, Baujahr {year}). Ist das noch verfügbar?"
    },
    en: {
      general: "Hello MJ Guitars, I have a question:",
      termin: "Hello MJ Guitars, I would like to book an appointment.",
      service: "Hello MJ Guitars, I am interested in a service for my guitar. When is an appointment possible?",
      ankauf: "Hello MJ Guitars, I would like to sell a guitar. I will send photos along.",
      inquiry: "Hello MJ Guitars, I am interested in: {name} ({price}, year {year}). Is it still available?"
    }
  };

  /* ---------- Zustand ---------- */
  var state = {
    lang: "de",
    guitars: [],
    reviews: null,
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

  function catInfo(key) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].key === key) return CATEGORIES[i];
    return null;
  }
  function catLabel(key) {
    var c = catInfo(key);
    return c ? c[state.lang] || c.de : key;
  }
  function catCount(key) {
    return state.guitars.filter(function (g) { return g.category === key && !g.sold; }).length;
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
    [["zoom-in", "zoom_in"], ["zoom-out", "zoom_out"], ["zoom-fs", "zoom_fs"], ["zoom-close", "close"],
     ["zoom-prev", "prev"], ["zoom-next", "next"], ["g-prev", "prev"], ["g-next", "next"], ["detail-close", "close"]]
      .forEach(function (p) {
        var b = document.getElementById(p[0]);
        if (b) b.setAttribute("aria-label", t(p[1]));
      });

    buildFilterOptions();
    renderMenu();
    renderGuitars();
    renderReviews();
  }

  /* ---------- Menü „Produkte“ ---------- */
  var menu = {
    item: document.getElementById("prod-item"),
    trigger: document.getElementById("prod-trigger"),
    panel: document.getElementById("prod-menu"),
    closeTimer: null
  };

  function renderMenu() {
    var list = document.getElementById("mega-list");
    if (!list) return;
    list.innerHTML = "";
    CATEGORIES.filter(function (c) { return c.menu; }).forEach(function (c, i) {
      var li = el("li");
      li.style.setProperty("--i", i);
      var a = el("a", "mega-link");
      a.href = "#gitarren";
      a.setAttribute("data-cat", c.key);
      a.appendChild(el("span", "mega-title", c[state.lang] || c.de));
      a.appendChild(el("span", "mega-arrow", "→"));
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function openMenu() {
    clearTimeout(menu.closeTimer);
    menu.item.classList.add("open");
    menu.trigger.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    clearTimeout(menu.closeTimer);
    menu.item.classList.remove("open");
    menu.trigger.setAttribute("aria-expanded", "false");
  }

  function chooseCategory(cat) {
    state.category = cat;
    renderCategoryPills();
    renderGuitars();
    closeMenu();
  }

  function initMenu() {
    if (!menu.item) return;
    var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    menu.trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (menu.item.classList.contains("open")) closeMenu(); else openMenu();
    });
    menu.item.addEventListener("mouseenter", function () { if (canHover.matches) openMenu(); });
    menu.item.addEventListener("mouseleave", function () {
      if (!canHover.matches) return;
      menu.closeTimer = setTimeout(closeMenu, 180);
    });
    menu.panel.addEventListener("click", function (e) {
      var link = e.target.closest("[data-cat]");
      if (!link) return;
      chooseCategory(link.getAttribute("data-cat"));
    });
    document.addEventListener("click", function (e) {
      if (menu.item.classList.contains("open") && !menu.item.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.item.classList.contains("open")) {
        closeMenu();
        menu.trigger.focus();
      }
    });
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
      btn.textContent = cat === "all" ? t("all") : catLabel(cat);
      btn.setAttribute("aria-pressed", cat === state.category ? "true" : "false");
      if (empty) btn.title = t("empty_cat");
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
    var used = uniqueSorted(state.guitars.map(function (g) { return g.category; }));
    // Menü-Kategorien immer, die anderen nur wenn es Produkte darin gibt
    var cats = CATEGORIES.filter(function (c) { return c.menu || used.indexOf(c.key) !== -1; })
      .map(function (c) { return c.key; });
    var extra = used.filter(function (c) { return !catInfo(c); });
    var brands = uniqueSorted(state.guitars.map(function (g) { return g.brand; }));
    var conds = uniqueSorted(state.guitars.map(function (g) { return g.condition; }));

    state.categories = cats.concat(extra);
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
        var hay = (g.brand + " " + g.model + " " + g.category + " " + catLabel(g.category) + " " + g.description).toLowerCase();
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
  function inquiryText(g) {
    return WA_TEXT[state.lang].inquiry
      .replace("{name}", g.name)
      .replace("{price}", fmtPrice(g.price))
      .replace("{year}", String(g.year));
  }

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

    list.forEach(function (g) {
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
      media.appendChild(el("span", "tag", catLabel(g.category)));
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
        ask.href = waUrl(inquiryText(g));
        ask.target = "_blank";
        ask.rel = "noopener";
        actions.appendChild(ask);
      }
      foot.appendChild(actions);
      body.appendChild(foot);
      card.appendChild(body);
      if (g.photos.length) {
        media.addEventListener("click", function () { openDetail(g); });
        media.classList.add("card-media-click");
      }
      grid.appendChild(card);
    });
  }

  /* ---------- Bewertungen ---------- */
  function stars(n) {
    var wrap = el("span", "stars");
    wrap.setAttribute("aria-label", n + " / 5");
    for (var i = 1; i <= 5; i++) wrap.appendChild(el("span", i <= Math.round(n) ? "star on" : "star", "★"));
    return wrap;
  }

  function renderReviews() {
    var section = document.getElementById("bewertungen");
    if (!section) return;
    var data = state.reviews;
    var list = data && Array.isArray(data.reviews) ? data.reviews.filter(function (r) { return r && r.text; }) : [];
    if (!list.length) { section.hidden = true; return; }
    section.hidden = false;

    var score = document.getElementById("reviews-score");
    score.innerHTML = "";
    var avg = Number(data.average);
    var total = Number(data.total);
    if (avg > 0) {
      score.appendChild(el("span", "score-num", avg.toLocaleString(state.lang === "en" ? "en-GB" : "de-AT", { minimumFractionDigits: 1, maximumFractionDigits: 1 })));
      var right = el("span", "score-right");
      right.appendChild(stars(avg));
      if (total > 0) right.appendChild(el("span", "score-count", total === 1 ? t("reviews_count_one") : t("reviews_count").replace("{n}", total)));
      score.appendChild(right);
    }

    var track = document.getElementById("reviews-track");
    track.innerHTML = "";
    list.forEach(function (r) {
      var card = el("figure", "review");
      card.appendChild(stars(Number(r.rating) || 5));
      var q = el("blockquote", "review-text");
      q.appendChild(el("p", "", r.text));
      card.appendChild(q);
      var cap = el("figcaption", "review-by");
      cap.appendChild(el("span", "review-avatar", String(r.name || "?").trim().charAt(0).toUpperCase()));
      var who = el("span", "review-who");
      who.appendChild(el("span", "review-name", r.name || ""));
      if (r.date) who.appendChild(el("span", "review-date", r.date));
      cap.appendChild(who);
      card.appendChild(cap);
      track.appendChild(card);
    });
  }

  /* ---------- Detail & Galerie ---------- */
  var dialog = document.getElementById("detail");

  function openDetail(g) {
    state.gallery.guitar = g;
    state.gallery.index = 0;

    document.getElementById("detail-title").textContent = g.name;
    document.getElementById("d-cat").textContent = catLabel(g.category);
    document.getElementById("d-meta").textContent = t("year_label") + ": " + g.year + "  ·  " + t("condition_label") + ": " + g.condition;
    document.getElementById("d-price").textContent = g.sold ? t("sold") : fmtPrice(g.price);
    document.getElementById("d-desc").textContent = g.description;

    var wa = document.getElementById("d-wa");
    if (g.sold) {
      wa.style.display = "none";
    } else {
      wa.style.display = "";
      wa.href = waUrl(inquiryText(g));
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
    var zoomBtn = document.getElementById("g-zoom");

    thumbs.innerHTML = "";

    if (!photos.length) {
      img.removeAttribute("src");
      img.style.display = "none";
      empty.style.display = "";
      count.textContent = "";
      prev.style.display = next.style.display = zoomBtn.style.display = "none";
      return;
    }

    img.style.display = "";
    empty.style.display = "none";
    zoomBtn.style.display = "";
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
    if (!dialog.open || zoom.dialog.open) return;
    if (e.key === "ArrowLeft") stepGallery(-1);
    if (e.key === "ArrowRight") stepGallery(1);
  });

  /* ---------- Vollbild mit Zoom ---------- */
  var zoom = {
    dialog: document.getElementById("zoom"),
    stage: document.getElementById("zoom-stage"),
    img: document.getElementById("zoom-img"),
    photos: [],
    index: 0,
    s: 1, tx: 0, ty: 0,      // Zoomfaktor und Verschiebung
    base: { w: 0, h: 0, ox: 0, oy: 0 },
    pointers: {},
    gesture: null,
    lastTap: 0,
    MAX: 5
  };

  function zoomLayout() {
    var W = zoom.stage.clientWidth, H = zoom.stage.clientHeight;
    var nw = zoom.img.naturalWidth || 1, nh = zoom.img.naturalHeight || 1;
    var r = Math.min(W / nw, H / nh);
    var w = nw * r, h = nh * r;
    zoom.base = { w: w, h: h, ox: (W - w) / 2, oy: (H - h) / 2, W: W, H: H };
    zoom.img.style.width = w + "px";
    zoom.img.style.height = h + "px";
    zoom.img.style.left = zoom.base.ox + "px";
    zoom.img.style.top = zoom.base.oy + "px";
  }

  function zoomClamp() {
    var b = zoom.base;
    var sw = b.w * zoom.s, sh = b.h * zoom.s;
    if (sw <= b.W) zoom.tx = (b.W - sw) / 2 - b.ox;
    else zoom.tx = Math.min(-b.ox, Math.max(b.W - sw - b.ox, zoom.tx));
    if (sh <= b.H) zoom.ty = (b.H - sh) / 2 - b.oy;
    else zoom.ty = Math.min(-b.oy, Math.max(b.H - sh - b.oy, zoom.ty));
  }

  function zoomApply(animate) {
    zoomClamp();
    zoom.img.classList.toggle("zoom-anim", !!animate);
    zoom.img.style.transform = "translate(" + zoom.tx + "px," + zoom.ty + "px) scale(" + zoom.s + ")";
    zoom.dialog.classList.toggle("is-zoomed", zoom.s > 1.01);
  }

  // Zoomen um einen Punkt (px, py) auf der Bühne
  function zoomAt(newS, px, py, animate) {
    newS = Math.max(1, Math.min(zoom.MAX, newS));
    var b = zoom.base;
    var qx = (px - b.ox - zoom.tx) / zoom.s;
    var qy = (py - b.oy - zoom.ty) / zoom.s;
    zoom.s = newS;
    zoom.tx = px - b.ox - newS * qx;
    zoom.ty = py - b.oy - newS * qy;
    zoomApply(animate);
  }

  function zoomReset() {
    zoom.s = 1; zoom.tx = 0; zoom.ty = 0;
    zoomApply(false);
  }

  function zoomShow(i) {
    var n = zoom.photos.length;
    zoom.index = (i + n) % n;
    zoom.img.classList.add("zoom-loading");
    zoom.img.onload = function () {
      zoomLayout();
      zoomReset();
      zoom.img.classList.remove("zoom-loading");
    };
    zoom.img.src = zoom.photos[zoom.index];
    zoom.img.alt = (state.gallery.guitar ? state.gallery.guitar.name : "") + " – " + (zoom.index + 1);
    document.getElementById("zoom-count").textContent = (zoom.index + 1) + " / " + n;
    var multi = n > 1;
    document.getElementById("zoom-prev").style.display = multi ? "" : "none";
    document.getElementById("zoom-next").style.display = multi ? "" : "none";
    // Nachbarfotos vorladen
    [1, -1].forEach(function (d) {
      if (n > 1) { var pre = new Image(); pre.src = zoom.photos[(zoom.index + d + n) % n]; }
    });
  }

  function openZoom() {
    var g = state.gallery.guitar;
    if (!g || !g.photos.length) return;
    zoom.photos = g.photos;
    zoom.dialog.classList.remove("hint-off");
    if (typeof zoom.dialog.showModal === "function") zoom.dialog.showModal();
    else zoom.dialog.setAttribute("open", "");
    zoomShow(state.gallery.index);
    setTimeout(function () { zoom.dialog.classList.add("hint-off"); }, 2600);
  }

  function closeZoom() {
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
    if (zoom.dialog.open) zoom.dialog.close();
  }

  function initZoom() {
    var stage = zoom.stage;
    document.getElementById("g-zoom").addEventListener("click", openZoom);
    document.getElementById("gallery-img").addEventListener("click", openZoom);
    document.getElementById("zoom-close").addEventListener("click", closeZoom);
    document.getElementById("zoom-prev").addEventListener("click", function () { zoomShow(zoom.index - 1); });
    document.getElementById("zoom-next").addEventListener("click", function () { zoomShow(zoom.index + 1); });
    document.getElementById("zoom-in").addEventListener("click", function () { zoomAt(zoom.s * 1.6, zoom.base.W / 2, zoom.base.H / 2, true); });
    document.getElementById("zoom-out").addEventListener("click", function () { zoomAt(zoom.s / 1.6, zoom.base.W / 2, zoom.base.H / 2, true); });

    var fsBtn = document.getElementById("zoom-fs");
    if (!zoom.dialog.requestFullscreen) fsBtn.style.display = "none";
    fsBtn.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
      else zoom.dialog.requestFullscreen().catch(function () {});
    });
    document.addEventListener("fullscreenchange", function () {
      setTimeout(function () { if (zoom.dialog.open) { zoomLayout(); zoomReset(); } }, 60);
    });

    // Beim Schließen die Galerie auf das zuletzt gesehene Foto setzen
    zoom.dialog.addEventListener("close", function () {
      state.gallery.index = zoom.index;
      renderGallery();
    });

    window.addEventListener("resize", function () {
      if (zoom.dialog.open) { zoomLayout(); zoomReset(); }
    });

    document.addEventListener("keydown", function (e) {
      if (!zoom.dialog.open) return;
      if (e.key === "ArrowLeft") zoomShow(zoom.index - 1);
      if (e.key === "ArrowRight") zoomShow(zoom.index + 1);
      if (e.key === "+" || e.key === "=") zoomAt(zoom.s * 1.6, zoom.base.W / 2, zoom.base.H / 2, true);
      if (e.key === "-") zoomAt(zoom.s / 1.6, zoom.base.W / 2, zoom.base.H / 2, true);
    });

    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      var r = stage.getBoundingClientRect();
      zoomAt(zoom.s * Math.exp(-e.deltaY * 0.0018), e.clientX - r.left, e.clientY - r.top, false);
    }, { passive: false });

    function pts() {
      return Object.keys(zoom.pointers).map(function (k) { return zoom.pointers[k]; });
    }
    function local(p) {
      var r = stage.getBoundingClientRect();
      return { x: p.x - r.left, y: p.y - r.top };
    }

    stage.addEventListener("pointerdown", function (e) {
      stage.setPointerCapture(e.pointerId);
      zoom.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var p = pts();
      if (p.length === 1) {
        zoom.gesture = { type: "pan", sx: e.clientX, sy: e.clientY, tx: zoom.tx, ty: zoom.ty, t: Date.now(), moved: false };
      } else if (p.length === 2) {
        var a = local(p[0]), b = local(p[1]);
        zoom.gesture = {
          type: "pinch",
          d0: Math.hypot(a.x - b.x, a.y - b.y) || 1,
          m0: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
          s0: zoom.s, tx0: zoom.tx, ty0: zoom.ty
        };
      }
    });

    stage.addEventListener("pointermove", function (e) {
      if (!zoom.pointers[e.pointerId]) return;
      zoom.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var g = zoom.gesture;
      if (!g) return;
      if (g.type === "pan") {
        var dx = e.clientX - g.sx, dy = e.clientY - g.sy;
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) g.moved = true;
        if (zoom.s > 1.01) {
          zoom.tx = g.tx + dx; zoom.ty = g.ty + dy;
          zoomApply(false);
        } else {
          // nicht gezoomt: Foto folgt dem Finger leicht (Wischen)
          zoom.img.style.transform = "translate(" + (zoom.tx + dx * 0.6) + "px," + zoom.ty + "px)";
        }
      } else if (g.type === "pinch") {
        var p = pts();
        if (p.length < 2) return;
        var a = local(p[0]), b = local(p[1]);
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        var m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        var newS = Math.max(1, Math.min(zoom.MAX, g.s0 * d / g.d0));
        var bs = zoom.base;
        var qx = (g.m0.x - bs.ox - g.tx0) / g.s0;
        var qy = (g.m0.y - bs.oy - g.ty0) / g.s0;
        zoom.s = newS;
        zoom.tx = m.x - bs.ox - newS * qx;
        zoom.ty = m.y - bs.oy - newS * qy;
        zoomApply(false);
      }
    });

    function endPointer(e) {
      if (!zoom.pointers[e.pointerId]) return;
      delete zoom.pointers[e.pointerId];
      var g = zoom.gesture;
      var left = pts();
      if (g && g.type === "pan" && left.length === 0) {
        var dx = e.clientX - g.sx, dy = e.clientY - g.sy;
        if (zoom.s <= 1.01 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
          zoomShow(zoom.index + (dx < 0 ? 1 : -1));
        } else if (!g.moved) {
          // Doppeltippen / Doppelklick: zoomen oder zurück
          var now = Date.now();
          if (now - zoom.lastTap < 320) {
            var l = local({ x: e.clientX, y: e.clientY });
            if (zoom.s > 1.01) zoomAt(1, l.x, l.y, true); else zoomAt(2.6, l.x, l.y, true);
            zoom.lastTap = 0;
          } else {
            zoom.lastTap = now;
          }
          zoomApply(false);
        } else {
          zoomApply(zoom.s <= 1.01);
        }
        zoom.gesture = null;
      } else if (g && g.type === "pinch") {
        if (left.length === 1) {
          var k = Object.keys(zoom.pointers)[0];
          zoom.gesture = { type: "pan", sx: zoom.pointers[k].x, sy: zoom.pointers[k].y, tx: zoom.tx, ty: zoom.ty, t: Date.now(), moved: true };
        } else {
          zoom.gesture = null;
        }
      }
    }
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);
  }

  /* ---------- Zitate: sanft einblenden, Saiten schwingen ---------- */
  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        var section = entry.target.closest(".quote");
        if (section && !reduced) {
          section.querySelectorAll(".quote-strings animate").forEach(function (a, i) {
            setTimeout(function () { try { a.beginElement(); } catch (e) { /* ignorieren */ } }, 250 + i * 70);
          });
        }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    targets.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Start ---------- */
  function normalize(raw) {
    var cat = raw.category || "";
    if (LEGACY_CATEGORIES[cat]) cat = LEGACY_CATEGORIES[cat];
    return {
      brand: String(raw.brand || "").trim(),
      model: String(raw.model || "").trim(),
      name: (String(raw.brand || "") + " " + String(raw.model || "")).trim(),
      category: cat,
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
        console.error("Produkte konnten nicht geladen werden:", err);
      });
  }

  function loadReviews() {
    return fetch(REVIEWS_URL, { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) { state.reviews = data; })
      .catch(function () { state.reviews = null; });
  }

  function init() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { applyLanguage(btn.getAttribute("data-lang")); });
    });

    document.querySelectorAll("[data-willhaben]").forEach(function (a) {
      a.setAttribute("href", WILLHABEN_URL);
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

    initMenu();
    initZoom();
    initReveal();

    var saved = storageGet("mj-lang");
    state.lang = saved && I18N[saved] ? saved : "de";

    Promise.all([loadGuitars(), loadReviews()]).then(function () {
      applyLanguage(state.lang);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
