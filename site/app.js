/* Solenne AI — behaviour of the two static pages.
 *
 * Four jobs: pick the language (a saved choice, otherwise the browser's),
 * swap every text node that carries data-ru/data-en, copy an address to the
 * clipboard, and reveal sections as they scroll in. The repository address is
 * derived from the GitHub Pages URL, so the pages need no configuration before
 * they are published.
 *
 * Nothing here is required to read the page: without this script the markup
 * stays Russian, all links work, and no section hides itself.
 */

(function () {
  "use strict";

  var STORAGE_KEY = "solenne-lang";
  /* Canonical repository: used when the page is opened outside GitHub Pages
     (a local preview, a mirror, a saved file), so download links never
     degrade into "#". */
  var FALLBACK_REPO = "https://github.com/Stamir36/solenne-ai";

  /* Заголовок и описание на каждую страницу: язык переключается один раз для
     всего документа, а адресная строка и сниппет поиска должны совпадать с
     тем, что человек видит. */
  var PAGES = {
    home: {
      ru: {
        title: "Solenne AI — 3D-компаньон для рабочего стола",
        description:
          "Solenne AI — 3D-компаньон на VRM: помнит мелочи, имеет настроение, живёт между сессиями и ведёт трансляцию вместе с вами. Локальные модель и голос.",
      },
      en: {
        title: "Solenne AI — a 3D companion for your desktop",
        description:
          "Solenne AI is a VRM companion who remembers small things, has moods of her own, lives between sessions and co-hosts your stream. Local model and voice.",
      },
    },
    help: {
      ru: {
        title: "Помощь — подключить модель и голос | Solenne AI",
        description:
          "Как подключить бесплатную модель и голос к Solenne AI: ключи Google AI Studio, Groq, OpenRouter и NVIDIA, Ollama и LM Studio локально, Silero и Edge TTS для речи.",
      },
      en: {
        title: "Help — connect a model and a voice | Solenne AI",
        description:
          "How to connect a free model and a voice to Solenne AI: Google AI Studio, Groq, OpenRouter and NVIDIA keys, local Ollama and LM Studio, Silero and Edge TTS for speech.",
      },
    },
  };

  /** Язык браузера: первым идёт тот, что человек поставил основным. */
  function detectLang() {
    var list =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ""];
    for (var i = 0; i < list.length; i += 1) {
      var code = String(list[i] || "").toLowerCase();
      if (code.indexOf("ru") === 0) return "ru";
      if (code.indexOf("en") === 0) return "en";
    }
    return "ru";
  }

  /** Ручной выбор запоминается и главнее языка системы. */
  function storedLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ru" || saved === "en") return saved;
    } catch (err) {
      /* Приватный режим может запретить хранилище: тогда решает браузер. */
    }
    return null;
  }

  /* Встроенный в <head> скрипт уже поставил выбранный язык в <html lang>
     до первой отрисовки — здесь его достаточно прочитать. */
  function readLang() {
    var saved = storedLang();
    if (saved) return saved;
    var fromMarkup = String(document.documentElement.lang || "").toLowerCase();
    if (fromMarkup === "ru" || fromMarkup === "en") return fromMarkup;
    return detectLang();
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-ru][data-en]");
    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      node.textContent = node.getAttribute(lang === "ru" ? "data-ru" : "data-en");
    }

    var marks = document.querySelectorAll("#lang [data-lang]");
    for (var j = 0; j < marks.length; j += 1) {
      marks[j].classList.toggle("on", marks[j].getAttribute("data-lang") === lang);
    }

    var page = PAGES[document.body.dataset.page] || PAGES.home;
    var text = page[lang] || page.ru;
    document.title = text.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", text.description);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* Ничего не поделать: выбор просто не запомнится. */
    }

    /* Снимаем задержку, которую поставил <head> для английского языка. */
    document.documentElement.removeAttribute("data-boot");
  }

  /** Кнопки-ссылки на репозиторий и релизы. */
  function pagesRepo() {
    var match = location.hostname.match(/^([^.]+)\.github\.io$/i);
    if (!match) return null;
    var parts = location.pathname.split("/").filter(Boolean);
    if (!parts.length) return "https://github.com/" + match[1];
    return "https://github.com/" + match[1] + "/" + parts[0];
  }

  function initRepoLinks() {
    var repo = pagesRepo() || FALLBACK_REPO;
    var links = [document.getElementById("repo-link"), document.getElementById("repo-link-2")];
    links.forEach(function (link) {
      if (link) link.href = repo;
    });
    var releases = document.getElementById("releases-btn");
    if (releases) releases.href = repo + "/releases";
    /* Имя ассета не меняется от релиза к релизу, поэтому ссылка не устареет. */
    var zip = document.getElementById("zip-btn");
    if (zip) zip.href = repo + "/releases/latest/download/Solenne-AI-Portable.zip";
  }

  /** Полоса навигации становится заметнее, когда страница прокручена. */
  function initNav() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var update = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function legacyCopy(value, done) {
    var field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "-1000px";
    document.body.appendChild(field);
    field.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      /* Копирования не будет — кнопка просто не подтвердит действие. */
    }
    document.body.removeChild(field);
    done();
  }

  function copyText(value, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done, function () {
        legacyCopy(value, done);
      });
      return;
    }
    legacyCopy(value, done);
  }

  /** Кнопки «Копировать» на странице помощи. */
  function initCopy() {
    document.addEventListener("click", function (event) {
      var button =
        event.target && event.target.closest ? event.target.closest("[data-copy]") : null;
      if (!button) return;
      event.preventDefault();
      var lang = document.documentElement.lang === "en" ? "en" : "ru";
      var base = button.getAttribute("data-" + lang) || button.textContent;
      copyText(button.getAttribute("data-copy") || "", function () {
        button.classList.add("done");
        button.textContent = lang === "en" ? "Copied" : "Скопировано";
        window.setTimeout(function () {
          button.textContent = base;
          button.classList.remove("done");
        }, 1400);
      });
    });
  }

  /**
   * Секции проявляются при прокрутке.
   *
   * Класс `anim` ставится последним: если наблюдатель не создался или упал,
   * страница остаётся видимой. При «уменьшить движение» он не ставится вовсе.
   */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var nodes = document.querySelectorAll(
      ".section .head, .section .card, .section .steps li, .section .warn, " +
        ".section .pillars article, .section .items article, .section .shot, " +
        ".section .panel, .section details",
    );
    if (!nodes.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i += 1) {
          if (!entries[i].isIntersecting) continue;
          entries[i].target.classList.add("in");
          observer.unobserve(entries[i].target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      node.setAttribute("data-reveal", "");
      /* Соседние блоки проявляются лесенкой, а не все разом. */
      var order = 0;
      var siblings = node.parentElement ? node.parentElement.children : [];
      for (var k = 0; k < siblings.length && siblings[k] !== node; k += 1) order += 1;
      node.style.setProperty("--d", Math.min(order, 4) * 60 + "ms");
      observer.observe(node);
    }

    document.documentElement.classList.add("anim");
  }

  var toggle = document.getElementById("lang");
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyLang(document.documentElement.lang === "ru" ? "en" : "ru");
    });
  }

  applyLang(readLang());
  initNav();
  initCopy();
  initRepoLinks();
  initReveal();
})();
