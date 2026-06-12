(function () {
  "use strict";

  const CATEGORIES = {
    exam: { label: "⚡ Exam Tomorrow", order: 0 },
    years: { label: "📊 Previous Years", order: 1 },
    analysis: { label: "📈 Analysis & Predictions", order: 2 },
    tutorials: { label: "📚 Tutorials", order: 3 },
    ca: { label: "📰 Current Affairs 2026", order: 4 },
    plans: { label: "📅 Study Plans", order: 5 },
    home: { label: "Home", order: -1 },
  };

  const els = {
    nav: document.getElementById("nav"),
    content: document.getElementById("content"),
    pageTitle: document.getElementById("pageTitle"),
    searchInput: document.getElementById("searchInput"),
    sidebar: document.getElementById("sidebar"),
    overlay: document.getElementById("overlay"),
    menuBtn: document.getElementById("menuBtn"),
    sidebarClose: document.getElementById("sidebarClose"),
    themeBtn: document.getElementById("themeBtn"),
    fontUp: document.getElementById("fontUp"),
    fontDown: document.getElementById("fontDown"),
  };

  let currentPage = "home";

  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: true,
  });

  function init() {
    if (!window.NTPC_DATA) {
      els.content.innerHTML = "<p>Error: content.js not loaded. Run build-content.py first.</p>";
      return;
    }
    buildNav();
    loadTheme();
    loadFontSize();
    bindEvents();
    navigate(getHash() || "home");
  }

  function getHash() {
    const h = location.hash.slice(1);
    return NTPC_DATA.pages[h] ? h : null;
  }

  function buildNav() {
    const byCat = {};
    NTPC_DATA.manifest.forEach((item) => {
      if (item.id === "home") return;
      const cat = item.cat || "other";
      if (!byCat[cat]) byCat[cat] = [];
      byCat[cat].push(item);
    });

    const sortedCats = Object.keys(byCat).sort(
      (a, b) => (CATEGORIES[a]?.order ?? 99) - (CATEGORIES[b]?.order ?? 99)
    );

    els.nav.innerHTML = sortedCats
      .map((cat) => {
        const label = CATEGORIES[cat]?.label || cat;
        const items = byCat[cat]
          .map(
            (item) => `
          <button class="nav-item${item.priority ? " priority" : ""}" data-id="${item.id}" type="button">
            <span class="icon">${item.icon || "📄"}</span>
            <span>${item.title}</span>
          </button>`
          )
          .join("");
        return `<div class="nav-group" data-cat="${cat}">
          <div class="nav-group-title">${label}</div>
          ${items}
        </div>`;
      })
      .join("");
  }

  function bindEvents() {
    els.nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-item");
      if (!btn) return;
      navigate(btn.dataset.id);
      closeSidebar();
    });

    window.addEventListener("hashchange", () => {
      const id = getHash();
      if (id) navigate(id, false);
    });

    els.searchInput.addEventListener("input", onSearch);

    els.menuBtn.addEventListener("click", openSidebar);
    els.sidebarClose.addEventListener("click", closeSidebar);
    els.overlay.addEventListener("click", closeSidebar);

    els.themeBtn.addEventListener("click", toggleTheme);
    els.fontUp.addEventListener("click", () => adjustFont(1));
    els.fontDown.addEventListener("click", () => adjustFont(-1));

    const logoHome = document.getElementById("logoHome");
    logoHome?.addEventListener("click", () => navigate("home"));
    logoHome?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") navigate("home");
    });
  }

  function navigate(id, pushHash = true) {
    if (id !== "home" && !NTPC_DATA.pages[id]) id = "home";
    currentPage = id;
    if (pushHash) location.hash = id === "home" ? "" : id;

    document.querySelectorAll(".nav-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.id === id);
    });

    if (id === "home") {
      els.pageTitle.textContent = "Home";
      els.content.innerHTML = renderHome();
      bindHomeCards();
    } else {
      const page = NTPC_DATA.pages[id];
      els.pageTitle.textContent = page.title;
      els.content.innerHTML = `<div class="md">${marked.parse(page.markdown)}</div>`;
      enhanceMarkdown();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderHome() {
    const urgent = NTPC_DATA.manifest.filter((m) => m.priority);
    const counts = {
      pages: NTPC_DATA.manifest.length,
      years: NTPC_DATA.manifest.filter((m) => m.cat === "years").length,
      tutorials: NTPC_DATA.manifest.filter((m) => m.cat === "tutorials").length,
      ca: NTPC_DATA.manifest.filter((m) => m.cat === "ca").length,
    };

    const urgentCards = urgent
      .map(
        (item) => `
      <div class="card urgent" data-id="${item.id}">
        <div class="card-icon">${item.icon}</div>
        <h3>${item.title}</h3>
        <p>Start here — exam-focused content with explanations</p>
      </div>`
      )
      .join("");

    const sections = [
      { cat: "years", icon: "📊", desc: "2021–2025 paper analysis & weightage" },
      { cat: "tutorials", icon: "📚", desc: "Math, Reasoning & Science tutorials" },
      { cat: "ca", icon: "📰", desc: "Jan–Jun 2026 current affairs + MCQs" },
      { cat: "analysis", icon: "📈", desc: "Master topics & 2026 predictions" },
      { cat: "plans", icon: "📅", desc: "30, 60 & 90 day study plans" },
    ];

    const sectionCards = sections
      .map((s) => {
        const first = NTPC_DATA.manifest.find((m) => m.cat === s.cat);
        return `
        <div class="card" data-id="${first?.id || ""}">
          <div class="card-icon">${s.icon}</div>
          <h3>${CATEGORIES[s.cat]?.label.replace(/^[^\s]+\s/, "") || s.cat}</h3>
          <p>${s.desc}</p>
        </div>`;
      })
      .join("");

    return `
      <div class="dashboard-hero">
        <h2>🚂 RRB NTPC CBT-1 — Complete Study Hub</h2>
        <p>All research, questions, tutorials, current affairs & study plans in one place. Works offline.</p>
        <div class="hero-stats">
          <div class="hero-stat"><span class="num">${counts.pages}</span><span class="lbl">Documents</span></div>
          <div class="hero-stat"><span class="num">370+</span><span class="lbl">Practice Q</span></div>
          <div class="hero-stat"><span class="num">100</span><span class="lbl">Exam Questions</span></div>
          <div class="hero-stat"><span class="num">90</span><span class="lbl">Minutes</span></div>
        </div>
      </div>

      <h2 style="margin-bottom:1rem;color:var(--accent)">🔥 Start Here (Exam Priority)</h2>
      <div class="card-grid">${urgentCards}</div>

      <h2 style="margin-bottom:1rem">Browse All Sections</h2>
      <div class="card-grid">${sectionCards}</div>

      <div class="formula-box">
        <h3>⚡ Last-Minute Formula Sheet</h3>
        <pre>Profit% = (SP−CP)/CP × 100
SI = PRT/100  |  CI−SI (2yr) = P×(R/100)²
Speed = D/T  |  km/h × 5/18 = m/s
LCM × HCF = a × b
Successive %: a+b+ab/100
Avg speed (equal dist) = 2ab/(a+b)
Work: 1/A + 1/B per day
Boat: down=b+w, up=b−w, still=(D+U)/2

Reasoning: Coding try +1 first | Draw blood tree
Puzzles: draw circle/row | Syllogism: Venn
GA: Science 10-12Q | Computers 4-5Q | CA 8-10Q

Order: Reasoning → Math → GA | Target 72-80 attempts</pre>
      </div>
    `;
  }

  function bindHomeCards() {
    els.content.querySelectorAll(".card[data-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        if (id) navigate(id);
      });
    });
  }

  function enhanceMarkdown() {
    const md = els.content.querySelector(".md");
    if (!md) return;

    md.querySelectorAll("p").forEach((p) => {
      const t = p.innerHTML;
      if (/^\*\*Answer:/i.test(p.textContent) || /^\*\*Explanation:/i.test(p.textContent)) {
        p.classList.add("answer-block");
      }
    });

    md.querySelectorAll("strong").forEach((s) => {
      if (s.textContent.startsWith("Answer:") || s.textContent.startsWith("Explanation:")) {
        s.closest("p")?.classList.add("answer-block");
      }
    });
  }

  function onSearch() {
    const q = els.searchInput.value.trim().toLowerCase();
    const groups = els.nav.querySelectorAll(".nav-group");
    let any = false;

    groups.forEach((group) => {
      let groupVisible = false;
      group.querySelectorAll(".nav-item").forEach((item) => {
        const id = item.dataset.id;
        const page = NTPC_DATA.pages[id];
        const text = (page?.title + " " + (page?.markdown || "")).toLowerCase();
        const match = !q || text.includes(q);
        item.classList.toggle("search-hidden", !match);
        if (match) groupVisible = true;
      });
      group.classList.toggle("search-hidden", !groupVisible);
      if (groupVisible) any = true;
    });

    let nr = els.nav.querySelector(".no-results");
    if (!q) {
      nr?.remove();
      return;
    }
    if (!any) {
      if (!nr) {
        nr = document.createElement("div");
        nr.className = "no-results";
        els.nav.appendChild(nr);
      }
      nr.textContent = `No results for "${q}"`;
    } else {
      nr?.remove();
    }
  }

  function openSidebar() {
    els.sidebar.classList.add("open");
    els.overlay.classList.add("open");
  }

  function closeSidebar() {
    els.sidebar.classList.remove("open");
    els.overlay.classList.remove("open");
  }

  function toggleTheme() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next === "light" ? "light" : "");
    els.themeBtn.textContent = next === "light" ? "☀️" : "🌙";
    localStorage.setItem("ntpc-theme", next);
  }

  function loadTheme() {
    const t = localStorage.getItem("ntpc-theme") || "dark";
    if (t === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      els.themeBtn.textContent = "☀️";
    }
  }

  function adjustFont(delta) {
    const root = document.documentElement;
    const cur = parseFloat(getComputedStyle(root).fontSize) || 16;
    const next = Math.min(20, Math.max(13, cur + delta));
    root.style.fontSize = next + "px";
    localStorage.setItem("ntpc-font", next);
  }

  function loadFontSize() {
    const s = localStorage.getItem("ntpc-font");
    if (s) document.documentElement.style.fontSize = s + "px";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
