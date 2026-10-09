(() => {
  const cfg = window.FORGECRAFT_CONFIG || {};
  const whatsappNumber = String(cfg.whatsappNumber || "").replace(/\D/g, "");
  const waUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
    link.href = waUrl("Hello Jonatoh Metal Fabricators, I would like to enquire about a metal fabrication project.");
    link.addEventListener("click", e => {
      if (!whatsappNumber || whatsappNumber.includes("REPLACE")) {
        e.preventDefault();
        alert("Please configure the WhatsApp number in js/config.js.");
      }
    });
  });
  document.querySelectorAll("[data-social]").forEach(link => {
    const platform = link.dataset.social;
    const url = cfg.social && cfg.social[platform];
    if (url && !url.includes("REPLACE_WITH")) {
      link.href = url; link.target = "_blank"; link.rel = "noopener";
    } else {
      link.href = "#";
      link.addEventListener("click", e => { e.preventDefault(); alert(`Add your ${platform} profile URL in js/config.js.`); });
    }
  });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menu && nav) menu.addEventListener("click", () => {
    const open = nav.classList.toggle("nav-open");
    menu.setAttribute("aria-expanded", String(open));
  });

  const form = document.getElementById("quote-form");
  if (form) {
    const status = document.getElementById("form-status");
    const values = () => Object.fromEntries(new FormData(form).entries());
    const quoteMessage = d => [
      "Hello ForgeCraft Metalworks, I would like to request a quotation.",
      "", `Name: ${d.name}`, `Phone: ${d.phone}`, `Customer email: ${d.customerEmail || "Not provided"}`,
      `Location: ${d.location || "Not provided"}`, `Service: ${d.service}`,
      `Quantity: ${d.quantity || "Not provided"}`, `Dimensions: ${d.dimensions || "Not provided"}`,
      `Budget: ${d.budget || "Not provided"}`, `Reference link: ${d.reference || "Not provided"}`,
      "", `Project details: ${d.details}`
    ].join("\n");
    const validate = () => {
      if (!form.reportValidity()) return false;
      return true;
    };
    document.getElementById("send-whatsapp")?.addEventListener("click", () => {
      if (!validate()) return;
      if (!whatsappNumber) { status.textContent = "Please configure the WhatsApp number in js/config.js."; return; }
      const d = values();
      window.open(waUrl(quoteMessage(d)), "_blank", "noopener");
      status.textContent = "WhatsApp opened with your quote request. Press Send in WhatsApp to submit it.";
    });
    document.getElementById("send-email")?.addEventListener("click", async () => {
      if (!validate()) return;
      const d = values();
      const e = cfg.emailjs || {};
      const configured = e.publicKey && e.serviceId && e.templateId &&
        ![e.publicKey, e.serviceId, e.templateId].some(v => String(v).includes("REPLACE"));
      if (!configured || !window.emailjs) {
        const subject = encodeURIComponent(`Quotation request - ${d.service} - ${d.name}`);
        const body = encodeURIComponent(quoteMessage(d));
        status.textContent = "EmailJS is not configured yet. Opening your email app as a fallback.";
        window.location.href = `mailto:${cfg.businessEmail || ""}?subject=${subject}&body=${body}`;
        return;
      }
      const button = document.getElementById("send-email");
      button.disabled = true; button.textContent = "Sending…";
      try {
        window.emailjs.init({ publicKey: e.publicKey });
        await window.emailjs.send(e.serviceId, e.templateId, {
          to_email: cfg.businessEmail,
          business_email: cfg.businessEmail,
          from_name: d.name,
          from_phone: d.phone,
          reply_to: d.customerEmail || "",
          customer_email: d.customerEmail || "Not provided",
          project_location: d.location || "Not provided",
          service: d.service,
          quantity: d.quantity || "Not provided",
          dimensions: d.dimensions || "Not provided",
          budget: d.budget || "Not provided",
          reference_link: d.reference || "Not provided",
          project_details: d.details,
          message: quoteMessage(d),
          subject: `Quotation request - ${d.service} - ${d.name}`
        });
        status.textContent = "Your quote request was sent by email. Thank you!";
        form.reset();
      } catch (err) {
        console.error("EmailJS send failed", err);
        status.textContent = "Email delivery failed. Please try WhatsApp or email us directly.";
      } finally {
        button.disabled = false; button.textContent = "✉ Send quote by email";
      }
    });
    const emailDisplay = document.getElementById("contact-email-display");
    const emailLink = document.getElementById("email-direct-link");
    if (emailDisplay) emailDisplay.textContent = cfg.businessEmail || "Configure business email in js/config.js.";
    if (emailLink) emailLink.href = `mailto:${cfg.businessEmail || ""}?subject=${encodeURIComponent("Metal fabrication quote request")}`;
  }

  // Gallery renders lazily; adding 200+ records to gallery-data.js is supported.
  const gallery = document.getElementById("gallery-grid");
  const filters = document.getElementById("gallery-filters");
  if (gallery && filters) {
    const items = Array.isArray(window.FORGECRAFT_GALLERY) ? window.FORGECRAFT_GALLERY : [];
    const categories = ["All", ...new Set(items.map(item => item.category).filter(Boolean))];
    let selected = "All";
    let showAll = false;
    const loadMore = document.getElementById("gallery-load-more");
    if (loadMore) loadMore.addEventListener("click", () => { showAll = !showAll; renderGallery(); });
    const renderFilters = () => {
      filters.innerHTML = "";
      categories.forEach(category => {
        const button = document.createElement("button");
        button.className = "filter-button" + (selected === category ? " selected" : "");
        button.type = "button"; button.textContent = category;
        button.addEventListener("click", () => { selected = category; showAll = false; renderFilters(); renderGallery(); });
        filters.appendChild(button);
      });
    };
    const renderGallery = () => {
      gallery.innerHTML = "";
      const visible = items.filter(item => selected === "All" || item.category === selected);
      if (!visible.length) {
        gallery.innerHTML = '<p class="muted">No gallery items in this category yet. Add images in js/gallery-data.js.</p>';
        return;
      }
      const shown = showAll ? visible : visible.slice(0, 6);
      shown.forEach(item => {
        const card = document.createElement("article"); card.className = "gallery-card";
        const img = document.createElement("img"); img.src = item.image; img.alt = item.alt || item.title || "Metalwork project";
        img.loading = "lazy"; img.decoding = "async";
        img.onerror = () => { img.removeAttribute("src"); img.classList.add("image-missing"); img.alt = "Add an image file for this gallery item"; };
        const body = document.createElement("div"); body.className = "gallery-card-caption";
        const cat = document.createElement("span"); cat.className = "service-number"; cat.textContent = item.category || "Project";
        const title = document.createElement("h3"); title.textContent = item.title || "Metalwork project";
        const link = document.createElement("a"); link.href = `contact.html#quote`; link.className = "gallery-quote-link"; link.textContent = "Quote a similar project ↗";
        body.append(cat, title, link); card.append(img, body); gallery.appendChild(card);
      });
      if (loadMore) {
        loadMore.hidden = visible.length <= 9;
        loadMore.textContent = showAll ? "Show Fewer Projects ↑" : `View More Projects (${visible.length - 6}) ↓`;
      }
    };
    renderFilters(); renderGallery();
  }
})();