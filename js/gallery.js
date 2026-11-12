/**
 * SOLE HARMONY - Studio Sanctuary Ambiance Gallery & Interactive Lightbox
 */

window.StudioGallery = (function () {
  const GALLERY_SPACES = [
    {
      id: "solo-acoustic-suite",
      title: "Solo Acoustic Reflexology Suite",
      category: "suites",
      categoryLabel: "Treatment Suites",
      wing: "Suite 01 · Acoustic Wing",
      image: "assets/images/gallery/gallery-single-suite.jpg",
      alt: "Private solo reflexology suite with linen recliner, slatted wood walls, candlelit sconces, and copper foot bath",
      description:
        "Zero-gravity Belgian linen recliner overlooking an illuminated night courtyard, wrapped in vertical bamboo acoustic slats and 2700K brass sconces.",
      lighting: "2700K Brass Sconces",
      acoustics: "< 30 dB Quiet Floor",
      aroma: "Warm Hinoki & Cedar",
      capacity: "1 Guest · Private Door",
      recommendedServiceId: "traditional-foot-reflexology",
      recommendedServiceTitle: "Traditional Foot Reflexology (60m)"
    },
    {
      id: "courtyard-couples-suite",
      title: "Double Garden Courtyard Suite",
      category: "suites",
      categoryLabel: "Treatment Suites",
      wing: "Suite 04 · Botanical Patio",
      image: "assets/images/spa-interior/lounge.jpg",
      alt: "Twin teak bodywork tables beside open sliding timber doors onto a lush bamboo garden and carved stone soaking basin",
      description:
        "Twin organic-linen bodywork tables framed by sliding mahogany doors opening onto an enclosed bamboo courtyard with a carved river-stone vessel.",
      lighting: "Filtered Garden Daylight",
      acoustics: "Rustling Bamboo Foliage",
      aroma: "Plumeria & Fresh Lemongrass",
      capacity: "2 Guests · Couples Sanctuary",
      recommendedServiceId: "custom-wellness-session",
      recommendedServiceTitle: "Custom Wellness Session (90m)"
    },
    {
      id: "sunlit-cedar-daybed-suite",
      title: "Sunlit Daybed & Cedar Soak Suite",
      category: "suites",
      categoryLabel: "Treatment Suites",
      wing: "Suite 05 · East Windows",
      image: "assets/images/gallery/gallery-cedar-suite.jpg",
      alt: "Sunlit private bodywork suite with elevated linen daybed, sage knit throw, cedar botanical soaking tub, and basalt stone tray",
      description:
        "Floor-to-ceiling sheer linen drapes diffuse morning light onto an elevated ergonomic daybed, cedar herbal soaking bucket, and heated volcanic basalt tray.",
      lighting: "Sheer-Diffused Daylight",
      acoustics: "Double-Core Acoustic Wall",
      aroma: "Eucalyptus & Volcanic Basalt",
      capacity: "1 Guest · Extended Rituals",
      recommendedServiceId: "full-body-reflexology",
      recommendedServiceTitle: "Full-Body Reflexology (90m)"
    },
    {
      id: "stone-soaking-alcove",
      title: "Chamomile & Basalt Soaking Alcove",
      category: "lounge-soak",
      categoryLabel: "Soak & Lounge",
      wing: "Opening Ritual · Wet Alcove",
      image: "assets/images/gallery/gallery-soak-bar.jpg",
      alt: "Hand-carved dark stone foot soaking bowl inset in pebbles with steaming chamomile and ginger infusion beside oak bench",
      description:
        "Every session begins with ten unhurried minutes here: hand-carved matte stone set in river pebbles, infused with steeped wild ginger and chamomile petals.",
      lighting: "Spotlit Wall Plaster",
      acoustics: "Gentle Trickling Spout",
      aroma: "Ginger Root & Chamomile",
      capacity: "Complimentary Pre-Session",
      recommendedServiceId: "relaxing-foot-massage",
      recommendedServiceTitle: "Relaxing Foot Massage (60m)"
    },
    {
      id: "fluted-walnut-reception",
      title: "Fluted Walnut Arrival Foyer",
      category: "lounge-soak",
      categoryLabel: "Soak & Lounge",
      wing: "Main Entrance · Quiet Check-In",
      image: "assets/images/spa-interior/reception.jpg",
      alt: "Warm travertine and walnut reception desk beside cream linen waiting sofas, rice paper lanterns, and illuminated tea shelves",
      description:
        "No ringing phones or bright screens greet you here: curved travertine stonework, warm walnut slats, rice-paper globes, and unhurried intake seating.",
      lighting: "Rice-Paper Diffused Glow",
      acoustics: "Phone-Free Quiet Policy",
      aroma: "Bergamot & Dry Sandalwood",
      capacity: "Staggered Private Arrivals",
      recommendedServiceId: "traditional-foot-reflexology",
      recommendedServiceTitle: "Book First Visit Session"
    },
    {
      id: "medicinal-tea-conservatory",
      title: "Sunlit Medicinal Tea Conservatory",
      category: "lounge-soak",
      categoryLabel: "Soak & Lounge",
      wing: "Post-Session · Recovery Lounge",
      image: "assets/images/gallery/gallery-tea-conservatory.jpg",
      alt: "Sun-filtered linen curtains framing a stoneware teapot and ceramic handleless cups on a walnut tray beside an indoor olive tree",
      description:
        "Step out gently after bodywork to savor loose-leaf roasted dandelion, jujube, and mint tea in handmade stoneware vessels before returning outdoors.",
      lighting: "North-Facing Natural Sun",
      acoustics: "Unhurried Transition Lounge",
      aroma: "Fresh Mint & Jujube Blossom",
      capacity: "Complimentary Post-Treatment",
      recommendedServiceId: "custom-wellness-session",
      recommendedServiceTitle: "Plan Your Studio Visit"
    }
  ];

  let activeFilter = "all";
  let searchQuery = "";
  let filteredSpaces = GALLERY_SPACES.slice();
  let currentModalIndex = 0;

  function initGalleryPage() {
    const gridEl = document.getElementById("gallery-ambiance-grid");
    if (!gridEl) return;

    bindFilterControls();
    bindLightboxControls();
    renderSpaces();
  }

  function bindFilterControls() {
    const pills = document.querySelectorAll("[data-gallery-filter]");
    const searchInput = document.getElementById("gallery-search-input");
    const resetBtn = document.getElementById("gallery-reset-filters");

    pills.forEach(btn => {
      btn.addEventListener("click", () => {
        activeFilter = btn.getAttribute("data-gallery-filter") || "all";
        pills.forEach(p => {
          p.classList.remove("active");
          p.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        renderSpaces();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value.trim().toLowerCase();
        renderSpaces();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        activeFilter = "all";
        searchQuery = "";
        if (searchInput) searchInput.value = "";
        pills.forEach(p => {
          const isAll = p.getAttribute("data-gallery-filter") === "all";
          p.classList.toggle("active", isAll);
          p.setAttribute("aria-pressed", String(isAll));
        });
        renderSpaces();
      });
    }
  }

  function renderSpaces() {
    const gridEl = document.getElementById("gallery-ambiance-grid");
    const countEl = document.getElementById("gallery-count-label");
    const emptyEl = document.getElementById("gallery-empty-state");
    if (!gridEl) return;

    filteredSpaces = GALLERY_SPACES.filter(space => {
      const catOk = activeFilter === "all" || space.category === activeFilter;
      if (!catOk) return false;
      if (!searchQuery) return true;
      const hay = `${space.title} ${space.wing} ${space.description} ${space.aroma} ${space.lighting} ${space.categoryLabel}`.toLowerCase();
      return hay.includes(searchQuery);
    });

    if (countEl) {
      countEl.textContent = `${filteredSpaces.length} OF ${GALLERY_SPACES.length} SANCTUARY SPACES SHOWN`;
    }

    if (filteredSpaces.length === 0) {
      gridEl.innerHTML = "";
      if (emptyEl) emptyEl.classList.remove("hidden");
      return;
    }

    if (emptyEl) emptyEl.classList.add("hidden");

    gridEl.innerHTML = filteredSpaces
      .map(
        (space, index) => `
      <article class="card-wellness p-0 flex flex-col overflow-hidden group gallery-space-card">
        <button type="button" class="gallery-space-media-btn" data-space-index="${index}" aria-label="Open full view of ${escapeHtml(space.title)}">
          <div class="gallery-space-media">
            <img src="${space.image}" alt="${escapeHtml(space.alt)}" class="gallery-space-img" loading="lazy">
            <span class="gallery-space-pill">${escapeHtml(space.categoryLabel)}</span>
            <span class="gallery-space-zoom" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              Inspect Space
            </span>
          </div>
        </button>

        <div class="gallery-space-body">
          <div class="gallery-space-meta-top">
            <span class="text-xs font-semibold uppercase tracking-wider text-primary-custom">${escapeHtml(space.wing)}</span>
          </div>
          <h3 class="gallery-space-title">${escapeHtml(space.title)}</h3>
          <p class="gallery-space-desc">${escapeHtml(space.description)}</p>

          <div class="flex flex-wrap gap-1.5 gallery-space-specs">
            <span class="gallery-spec-chip">${escapeHtml(space.lighting)}</span>
            <span class="gallery-spec-chip">${escapeHtml(space.aroma)}</span>
          </div>

          <div class="gallery-space-footer border-t">
            <span class="text-xs text-muted-custom font-medium">${escapeHtml(space.capacity)}</span>
            <button type="button" class="gallery-detail-trigger" data-space-index="${index}">
              View Room <span class="gallery-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    gridEl.querySelectorAll("[data-space-index]").forEach(trigger => {
      trigger.addEventListener("click", () => {
        const idx = parseInt(trigger.getAttribute("data-space-index"), 10);
        if (!Number.isNaN(idx)) openLightbox(idx);
      });
    });
  }

  function bindLightboxControls() {
    const backdrop = document.getElementById("gallery-lightbox-backdrop");
    const closeBtn = document.getElementById("gallery-lightbox-close");
    const prevBtn = document.getElementById("gallery-lightbox-prev");
    const nextBtn = document.getElementById("gallery-lightbox-next");

    if (!backdrop) return;

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    backdrop.addEventListener("click", e => {
      if (e.target === backdrop) closeLightbox();
    });

    if (prevBtn) prevBtn.addEventListener("click", () => stepLightbox(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => stepLightbox(1));

    document.addEventListener("keydown", e => {
      if (!backdrop.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        const isRtl = document.documentElement.getAttribute("dir") === "rtl";
        stepLightbox(isRtl ? 1 : -1);
      }
      if (e.key === "ArrowRight") {
        const isRtl = document.documentElement.getAttribute("dir") === "rtl";
        stepLightbox(isRtl ? -1 : 1);
      }
    });
  }

  function openLightbox(index) {
    const backdrop = document.getElementById("gallery-lightbox-backdrop");
    if (!backdrop || !filteredSpaces.length) return;
    currentModalIndex = (index + filteredSpaces.length) % filteredSpaces.length;
    updateLightboxContent();
    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const backdrop = document.getElementById("gallery-lightbox-backdrop");
    if (!backdrop) return;
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    if (!filteredSpaces.length) return;
    currentModalIndex = (currentModalIndex + delta + filteredSpaces.length) % filteredSpaces.length;
    updateLightboxContent();
  }

  function updateLightboxContent() {
    const space = filteredSpaces[currentModalIndex];
    if (!space) return;

    const img = document.getElementById("lightbox-space-img");
    const wing = document.getElementById("lightbox-space-wing");
    const title = document.getElementById("lightbox-space-title");
    const desc = document.getElementById("lightbox-space-desc");
    const counter = document.getElementById("lightbox-space-counter");
    const lightEl = document.getElementById("lightbox-spec-lighting");
    const acoustEl = document.getElementById("lightbox-spec-acoustics");
    const aromaEl = document.getElementById("lightbox-spec-aroma");
    const capEl = document.getElementById("lightbox-spec-capacity");
    const bookLink = document.getElementById("lightbox-book-link");

    if (img) {
      img.src = space.image;
      img.alt = space.alt;
    }
    if (wing) wing.textContent = space.wing;
    if (title) title.textContent = space.title;
    if (desc) desc.textContent = space.description;
    if (counter) counter.textContent = `${currentModalIndex + 1} / ${filteredSpaces.length}`;
    if (lightEl) lightEl.textContent = space.lighting;
    if (acoustEl) acoustEl.textContent = space.acoustics;
    if (aromaEl) aromaEl.textContent = space.aroma;
    if (capEl) capEl.textContent = space.capacity;
    if (bookLink) {
      bookLink.href = `booking.html?service=${encodeURIComponent(space.recommendedServiceId)}`;
      bookLink.textContent = `Book ${space.recommendedServiceTitle}`;
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  return {
    spaces: GALLERY_SPACES,
    initGalleryPage,
    openLightbox,
    closeLightbox
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("gallery-ambiance-grid")) {
    window.StudioGallery.initGalleryPage();
  }
});
