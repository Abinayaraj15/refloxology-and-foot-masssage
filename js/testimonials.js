/**
 * SOLE HARMONY - Client Testimonials Filter, Sort & Experience Submission
 */

(function () {
  const TESTIMONIALS_DATA = [
    {
      id: "rev-1",
      name: "Eleanor Wright",
      role: "Critical Care Nurse • Guest for 5 Years",
      category: "pain-relief",
      outcomeTag: "Plantar Fasciitis Relief",
      service: "Traditional Foot Reflexology (60m)",
      practitioner: "Master Mei-Ling Chen",
      tenureYears: 5,
      rating: 5,
      avatar: "assets/images/testimonials/eleanor-wright.jpg",
      quote:
        "Twelve-hour hospital shifts left me with sharp morning heel tightness for months. Master Mei-Ling spent five minutes gently testing plantar soreness before calibrating her wooden stylus work along my arch and Achilles. After my second visit, I walked across my bedroom floor pain-free for the first time in a year."
    },
    {
      id: "rev-2",
      name: "Dr. Sophia Al-Mansoor",
      role: "ER Physician · Weekly Guest (3 Yrs)",
      category: "members",
      outcomeTag: "Hospital-Shift Recovery",
      service: "Full-Body Reflexology (90m)",
      practitioner: "Kai Tanaka",
      tenureYears: 3,
      rating: 5,
      avatar: "assets/images/testimonials/sophia-almansoor.jpg",
      quote:
        "As a physician, sterilization is the first thing I notice—autoclaved tools, fresh single-use basin liners, and spotless quiet treatment suites. Beyond hygiene, Kai understands nerve and lymph pathways deeply. Every 90-minute visit resets my legs and lower spine completely."
    },
    {
      id: "rev-3",
      name: "David & Claire Lim",
      role: "Members Since 2012 · 14 Years",
      category: "members",
      outcomeTag: "14-Year Sanctuary Regulars",
      service: "Traditional Foot Reflexology (60m)",
      practitioner: "Master Mei-Ling Chen",
      tenureYears: 14,
      rating: 5,
      avatar: "assets/images/testimonials/david-claire-lim.jpg",
      quote:
        "We booked our very first herbal foot soak with Sole Harmony back in 2012. Fourteen years later, the consistency is remarkable: the ginger-lemongrass bath is always included before the timer starts, nobody ever rushes your final tea, and the team remembers every pressure preference."
    },
    {
      id: "rev-4",
      name: "Sophia Chen",
      role: "Concert Violinist • Client for 4 Years",
      category: "sleep-stress",
      outcomeTag: "Insomnia & Nerve Calm",
      service: "Relaxing Foot Massage (60m)",
      practitioner: "Kai Tanaka",
      tenureYears: 4,
      rating: 5,
      avatar: "assets/images/testimonials/sophia-chen.jpg",
      quote:
        "Concert touring wrecked my sleep schedule. Kai combines slow warm sweet-almond calf stroking with calm cranial pressure along the toes, keeping check-ins whisper-quiet so my nervous system drops straight into deep rest. I sleep seven uninterrupted hours every evening after a visit."
    },
    {
      id: "rev-5",
      name: "Eleanor Vance",
      role: "Engineering Lead · Since 2019",
      category: "reflexology",
      outcomeTag: "Desk Fatigue & Circulation",
      service: "Traditional Foot Reflexology (60m)",
      practitioner: "Julianna Alvarez",
      tenureYears: 7,
      rating: 5,
      avatar: "assets/images/testimonials/eleanor-vance.jpg",
      quote:
        "Zero-gravity recliners paired with Julianna's rhythmic thumb-walking relieved months of sedentary leg swelling in one session. You never get generic spa fluff here—she explains how solar-plexus and digestive zone tightness tie into posture habits."
    },
    {
      id: "rev-6",
      name: "Julian Thorne",
      role: "Principal Architect • 5-Session Member",
      category: "reflexology",
      outcomeTag: "90-Min Bespoke Craft",
      service: "Custom Wellness Session (90m)",
      practitioner: "Elena Rostova",
      tenureYears: 5,
      rating: 5,
      avatar: "assets/images/testimonials/julian-thorne.jpg",
      quote:
        "What separates a 16-year studio from pop-up massage shops is restraint and pacing. Elena adjusts pressure naturally wherever tissue resists, spends extra minutes unlocking tight calf fascia, and gives practical stretch tips afterwards with warm organic tea."
    },
    {
      id: "rev-7",
      name: "Marcus Thorne",
      role: "Product Director · Couples Regular",
      category: "sleep-stress",
      outcomeTag: "Zero-Rush Hospitality",
      service: "Full-Body & Basalt Reflexology",
      practitioner: "Mei-Ling Chen & Julianna",
      tenureYears: 3,
      rating: 5,
      avatar: "assets/images/testimonials/marcus-thorne.jpg",
      quote:
        "Booked our anniversary double suite online in under two minutes with zero card prepayment. Acoustic insulation makes the outside street disappear completely, and heated volcanic basalt stones along our calves melted travel exhaustion effortlessly."
    },
    {
      id: "rev-8",
      name: "Hannah Gallagher",
      role: "Distance Runner • Client for 2 Years",
      category: "pain-relief",
      outcomeTag: "Athletic Calf & Arch Recovery",
      service: "Relaxing Foot Massage (90m)",
      practitioner: "Elena Rostova",
      tenureYears: 2,
      rating: 5,
      avatar: "assets/images/testimonials/hannah-gallagher.jpg",
      quote:
        "Between half-marathon training cycles, Elena focuses directly on ankle mobility, tight sole arches, and steamed lavender towel wraps around the Achilles. My recovery turnaround time dropped noticeably once I switched from generic deep tissue to focused foot care here."
    },
    {
      id: "rev-9",
      name: "Naomi Takahashi",
      role: "Conductor & Educator · Since 2016",
      category: "members",
      outcomeTag: "10-Year Continuity Care",
      service: "Neck, Shoulder & Sole Reflexology",
      practitioner: "Julianna Alvarez",
      tenureYears: 10,
      rating: 5,
      avatar: "assets/images/testimonials/naomi-takahashi.jpg",
      quote:
        "Having visited for nearly ten years, the biggest trust factor is continuity. Practitioners chart trapezius knots and ankle stiffness over time rather than treating you like a stranger. You always receive a full 60 minutes on the table."
    }
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderAvatar(item) {
    if (item.avatar) {
      return `<img src="${escapeHtml(item.avatar)}" alt="${escapeHtml(item.name)}" class="testimonial-avatar" width="44" height="44" loading="lazy">`;
    }
    const initials = item.initials || item.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return `<div class="testimonial-avatar-initials" aria-hidden="true">${escapeHtml(initials)}</div>`;
  }

  function renderCards(list, gridEl, countEl) {
    if (countEl) {
      countEl.textContent = `${list.length} Verified Review${list.length === 1 ? "" : "s"} Shown`;
    }

    if (list.length === 0) {
      gridEl.innerHTML = `
        <div class="col-span-full text-center py-12 card-wellness p-8">
          <h3 class="font-heading text-xl text-main mb-2">No client stories matched your filter</h3>
          <p class="text-secondary text-sm mb-4">Clear your search query or view all verified studio reviews.</p>
          <button type="button" class="btn-wellness btn-secondary-custom btn-sm mx-auto" id="reset-reviews-btn">Show All Reviews</button>
        </div>`;
      return;
    }

    gridEl.innerHTML = list
      .map((item) => {
        const stars = "★".repeat(item.rating);
        return `
          <article class="testimonial-card-rich animate-fade-in">
            <div class="review-card-top">
              <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <div class="rating-stars" aria-label="${item.rating} out of 5 stars">${stars}</div>
                <span class="testimonial-outcome-pill">${escapeHtml(item.outcomeTag)}</span>
              </div>
              <p class="review-card-quote text-secondary text-sm leading-relaxed italic">
                "${escapeHtml(item.quote)}"
              </p>
            </div>
            <div class="review-card-footer">
              <div class="review-service-meta text-xs">
                <strong class="text-main block">${escapeHtml(item.service)}</strong>
                <span class="text-muted-custom block">with ${escapeHtml(item.practitioner)}</span>
              </div>
              <div class="review-author-row">
                ${renderAvatar(item)}
                <div class="min-w-0 flex-1">
                  <strong class="font-heading text-sm text-main block">${escapeHtml(item.name)}</strong>
                  <span class="text-xs text-secondary block">${escapeHtml(item.role)}</span>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("testimonials-feed-grid");
    if (!grid) return;

    const filterBtns = document.querySelectorAll(".review-filter-btn");
    const searchInput = document.getElementById("reviews-search-input");
    const sortSelect = document.getElementById("reviews-sort-select");
    const countLabel = document.getElementById("reviews-count-label");
    const submitForm = document.getElementById("testimonial-submit-form");

    let activeFilter = "all";
    let searchTerm = "";
    let sortBy = "featured";

    const updateView = () => {
      let filtered = TESTIMONIALS_DATA.filter((item) => {
        const matchCat = activeFilter === "all" || item.category === activeFilter;
        const q = searchTerm.trim().toLowerCase();
        const matchSearch =
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.quote.toLowerCase().includes(q) ||
          item.service.toLowerCase().includes(q) ||
          item.practitioner.toLowerCase().includes(q) ||
          item.outcomeTag.toLowerCase().includes(q);
        return matchCat && matchSearch;
      });

      if (sortBy === "tenure") {
        filtered = [...filtered].sort((a, b) => b.tenureYears - a.tenureYears);
      } else if (sortBy === "recent") {
        filtered = [...filtered].reverse();
      }

      renderCards(filtered, grid, countLabel);
      const resetBtn = document.getElementById("reset-reviews-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          activeFilter = "all";
          searchTerm = "";
          if (searchInput) searchInput.value = "";
          filterBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-review-filter") === "all"));
          updateView();
        });
      }
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.getAttribute("data-review-filter") || "all";
        updateView();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value || "";
        updateView();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        sortBy = e.target.value || "featured";
        updateView();
      });
    }

    if (submitForm) {
      submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameEl = document.getElementById("review-name");
        const serviceEl = document.getElementById("review-service");
        const practitionerEl = document.getElementById("review-practitioner");
        const msgEl = document.getElementById("review-message");

        const nameVal = (nameEl?.value || "").trim();
        const msgVal = (msgEl?.value || "").trim();
        if (!nameVal || msgVal.length < 15) {
          if (window.Notifications) {
            window.Notifications.show("Please Complete Review", "Enter your name and share at least 15 characters about your visit.", "error");
          }
          return;
        }

        const newItem = {
          id: "rev-user-" + Date.now(),
          name: nameVal,
          role: "Verified Studio Visitor • Just Submitted",
          category: "reflexology",
          outcomeTag: "Guest Feedback",
          service: serviceEl?.value || "Traditional Foot Reflexology",
          practitioner: practitionerEl?.value || "Master Team",
          tenureYears: 1,
          rating: 5,
          initials: nameVal.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
          quote: msgVal
        };

        TESTIMONIALS_DATA.unshift(newItem);
        activeFilter = "all";
        searchTerm = "";
        filterBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-review-filter") === "all"));
        if (searchInput) searchInput.value = "";
        submitForm.reset();
        updateView();

        if (window.Notifications) {
          window.Notifications.show(
            "Thank You for Sharing",
            "Your studio feedback has been added to our guest stories wall.",
            "success"
          );
        }
      });
    }

    updateView();
  });
})();
