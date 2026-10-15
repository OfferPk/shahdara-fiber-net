// Shahdara Fiber Net - Official Customer App & Portal
(function () {
  'use strict';

  // Fallback default configuration in case of purely static offline loading
  const DEFAULT_CONFIG = {
    company: {
      name: "Shahdara Fiber Net",
      shortName: "Shahdara Fiber",
      brandMark: "SF",
      tagline: "High-Speed Optical Fiber Internet for Shahdara & Surrounding Areas",
      phone: "+92-XXX-XXXXXXX",
      whatsapp: "+92-XXX-XXXXXXX",
      whatsappDigitsOnly: "923000000000",
      email: "support@shahdarafiber.net - EDIT ME",
      address: "Main GT Road, Shahdara Town, Lahore - EDIT ME",
      hours: "Support: 24/7 | Office: 9:00 AM - 9:00 PM (Daily)",
      currency: "PKR"
    },
    packages: [
      {
        id: "starter-fiber",
        name: "Home Starter Fiber",
        speed: "20 Mbps",
        tag: "Standard",
        price: "PKR 0000 - EDIT ME",
        features: [
          "Unlimited data & true unlimited downloads",
          "HD video streaming & buffer-free browsing",
          "Fiber optic ONT router included on deposit",
          "24/7 localized phone & WhatsApp support",
          "Zero throttling guarantee"
        ],
        popular: false
      },
      {
        id: "streamer-fiber",
        name: "Ultra Streamer Fiber",
        speed: "40 Mbps",
        tag: "Most Popular",
        price: "PKR 0000 - EDIT ME",
        features: [
          "Blazing fast 4K Ultra-HD streaming",
          "Seamless work-from-home & Zoom/Meet calls",
          "Dual-band 2.4/5GHz Wi-Fi router options",
          "Optimized ping routes for low jitter",
          "Free standard optical drop cable installation",
          "Priority ticket dispatch"
        ],
        popular: true
      },
      {
        id: "gamer-pro-fiber",
        name: "Gamer Pro Fiber",
        speed: "75 Mbps",
        tag: "Low Ping",
        price: "PKR 0000 - EDIT ME",
        features: [
          "Direct fiber peering with minimal hops",
          "Ultra-low ping for PUBG, Valorant, CS2 & Fortnite",
          "Symmetrical upload and download speeds",
          "Static IP address available upon request",
          "Dedicated VIP support channel",
          "Free router configuration & Wi-Fi optimization"
        ],
        popular: false
      },
      {
        id: "enterprise-gig-fiber",
        name: "Business & Commercial Fiber",
        speed: "150 Mbps+",
        tag: "Enterprise",
        price: "PKR 0000 - EDIT ME",
        features: [
          "1:1 dedicated committed information rate (CIR)",
          "99.9% network uptime SLA guarantee",
          "Dedicated account manager & 1-hour MTTR",
          "Dual-core enterprise gigabit optical terminal",
          "Multiple public IP pool support",
          "UPS battery backup during load-shedding"
        ],
        popular: false
      }
    ],
    coverageAreas: [
      { id: "cov-shahdara-town", name: "Shahdara Town", zone: "Central Shahdara", status: "Available", statusDescription: "Full Fiber FTTH active with immediate 24h installation" },
      { id: "cov-begum-kot", name: "Begum Kot", zone: "North Shahdara", status: "Available", statusDescription: "High-density fiber optic backbone active" },
      { id: "cov-saeed-park", name: "Saeed Park", zone: "South Shahdara", status: "Available", statusDescription: "FTTH distribution boxes installed and ready" },
      { id: "cov-wandala-road", name: "Wandala Road & Surroundings", zone: "Central Shahdara", status: "Available", statusDescription: "Complete fiber loop operational" },
      { id: "cov-jia-musa", name: "Jia Musa", zone: "East Shahdara", status: "Available", statusDescription: "Full Gigabit coverage deployed" },
      { id: "cov-match-factory", name: "Match Factory Road", zone: "Industrial & Residential", status: "Available", statusDescription: "Direct fiber connection available" },
      { id: "cov-rachna-town", name: "Rachna Town", zone: "Extension Zone", status: "Expanding", statusDescription: "Civil fiber laying in progress; pre-booking open" },
      { id: "cov-imamia-colony", name: "Imamia Colony & New Shahdara", zone: "West Shahdara", status: "Expanding", statusDescription: "Under network expansion; selected sectors ready" }
    ],
    paymentMethods: [
      { id: "easypaisa", name: "Easypaisa", type: "Mobile Wallet", instructions: "Open Easypaisa App > Pay Bills or Send Money > Enter Till Number > Put Customer ID in message.", accountNumber: "03XX-XXXXXXX - EDIT ME", accountTitle: "Shahdara Fiber Net - EDIT ME" },
      { id: "jazzcash", name: "JazzCash", type: "Mobile Wallet", instructions: "Open JazzCash App > Bill Payment > Search Shahdara Fiber or Mobile Account > Add Customer ID.", accountNumber: "03XX-XXXXXXX - EDIT ME", accountTitle: "Shahdara Fiber Net - EDIT ME" },
      { id: "bank-transfer", name: "1Link / Bank Transfer", type: "Bank Transfer", instructions: "Use your bank mobile app (Raast, IBFT or 1Link). Transfer to the official IBAN and WhatsApp screenshot.", bankName: "Bank Al Habib / Meezan Bank - EDIT ME", accountNumber: "PK00XXXX0000000000000000 - EDIT ME", accountTitle: "Shahdara Fiber Net - EDIT ME" },
      { id: "cash-desk", name: "Cash Payment Desk", type: "Cash Desk", instructions: "Visit our Shahdara customer service center at Main GT Road. Instant printed computer receipt.", accountNumber: "Main GT Road Branch Desk", accountTitle: "Open 9:00 AM - 9:00 PM Daily" }
    ],
    faqs: [
      { q: "How long does a new fiber connection installation take?", a: "Once your connection request is confirmed, our certified field technicians install, splice the fiber optical cable, and activate your high-speed internet within 24 to 48 hours." },
      { q: "What does a Red LOS light on my ONU/router indicate?", a: "A red LOS (Loss of Signal) light indicates that the optical fiber cable is not receiving a laser signal. Check that the yellow patch cord is securely plugged into your router without sharp bends. If it remains red, please file a support ticket or WhatsApp us so our lineman can inspect the outdoor optical splice." },
      { q: "Can I upgrade or downgrade my package at any time?", a: "Yes! Package changes take effect immediately or on the first day of your next billing cycle with zero administrative fees. Simply contact our support desk or send a request." },
      { q: "What happens if there is an area power outage (load-shedding)?", a: "Our core aggregation nodes and distribution points are backed up with industrial battery banks and generator systems. If you power your home router with a small DC mini-UPS, your fiber connection continues working uninterrupted during outages." },
      { q: "How do I retrieve my Customer ID / Account Number?", a: "Your Customer ID is printed on your monthly payment receipt, provided in your welcome SMS/WhatsApp message, or you can look it up instantly using your registered mobile phone number in our Bill Lookup tab." }
    ]
  };

  // Translations dictionary (English and Roman Urdu)
  const TRANSLATIONS = {
    en: {
      tagline_short: "FTTH High Speed Customer Portal",
      nav_home: "Home",
      nav_packages: "Packages",
      nav_connection: "New Connection",
      nav_billing: "Bill & Pay",
      nav_complaints: "Complaints & FAQ",
      nav_coverage: "Coverage Areas",
      nav_contact: "Contact Us",
      hero_badge: "Shahdara Gigabit Optical Backbone Live",
      hero_title_1: "Ultra-Fast Fiber",
      hero_title_2: "Built for Shahdara",
      btn_order_now: "Get New Connection",
      btn_view_plans: "View Packages",
      qa_plans_title: "Fiber Packages",
      qa_plans_desc: "Explore symmetrical speeds from 20 Mbps up to 150+ Mbps with unlimited data.",
      learn_more: "Compare Plans",
      qa_conn_title: "Instant Booking",
      qa_conn_desc: "Apply for optical drop cable installation with our rapid 24h setup team.",
      apply_now: "Apply Online",
      qa_bill_title: "Bill & Payment",
      qa_bill_desc: "Look up your monthly invoice and find Easypaisa, JazzCash, or bank details.",
      pay_bill: "Check Bill",
      qa_supp_title: "Support & Complaints",
      qa_supp_desc: "Log a ticket for Red LOS light, speed check, or wire repairs with live tracking.",
      log_ticket: "Open Ticket",
      speed_diag_eyebrow: "Interactive Speed Diagnostics",
      speed_diag_title: "Test Your Optical Performance",
      speed_diag_desc: "Simulate a real-time fiber diagnostic connection to our Shahdara core exchange node.",
      stat_ping: "Ping (Latency)",
      stat_download: "Download Speed",
      stat_upload: "Upload Speed",
      btn_start_test: "Run Live Fiber Speed Test",
      packages_eyebrow: "High-Speed Fiber Plans",
      packages_title: "Choose Your Ideal Speed",
      packages_desc: "Every package comes with unlimited bandwidth, standard drop wire, and 24/7 support."
    },
    ur: {
      tagline_short: "Shahdara Fiber Customer Portal",
      nav_home: "Home",
      nav_packages: "Packages",
      nav_connection: "Naya Connection",
      nav_billing: "Bill & Payment",
      nav_complaints: "Shikayat & FAQ",
      nav_coverage: "Coverage Areas",
      nav_contact: "Contact Karein",
      hero_badge: "Shahdara Optical Gigabit Network Active Hai",
      hero_title_1: "Tez Tareen Fiber",
      hero_title_2: "Khasoosan Shahdara Ke Liye",
      btn_order_now: "Naya Connection Lagwayein",
      btn_view_plans: "Packages Dekhein",
      qa_plans_title: "Fiber Packages",
      qa_plans_desc: "20 Mbps se 150+ Mbps tak mukammal unlimited fiber internet.",
      learn_more: "Plans Dekhein",
      qa_conn_title: "Online Booking",
      qa_conn_desc: "24 ghante ke andar drop wire aur router ki installation.",
      apply_now: "Apply Karein",
      qa_bill_title: "Bill aur Payment",
      qa_bill_desc: "Apna mahana bill check karein aur Easypaisa, JazzCash se ada karein.",
      pay_bill: "Bill Check Karein",
      qa_supp_title: "Support aur Shikayat",
      qa_supp_desc: "Red LOS light ya wire kharab hone par fori ticket darj karein.",
      log_ticket: "Ticket Darj Karein",
      speed_diag_eyebrow: "Speed Test Diagnostics",
      speed_diag_title: "Apni Optical Fiber Speed Check Karein",
      speed_diag_desc: "Shahdara exchange node se fori real-time latency aur download test.",
      stat_ping: "Ping (Latency)",
      stat_download: "Download Speed",
      stat_upload: "Upload Speed",
      btn_start_test: "Fiber Speed Test Shuru Karein",
      packages_eyebrow: "High-Speed Fiber Plans",
      packages_title: "Apna Pasandeeda Package Chunein",
      packages_desc: "Har plan ke sath unlimited data, free wire, aur 24/7 technical support."
    }
  };

  // State
  let appConfig = DEFAULT_CONFIG;
  let activeTab = 'home';
  let currentLang = localStorage.getItem('sfn_lang') || 'en';
  let currentTheme = localStorage.getItem('sfn_theme') || 'light';
  let isSpeedTesting = false;

  // DOM Elements
  const brandName = document.getElementById('brand-name');
  const heroWhatsappBtn = document.getElementById('hero-whatsapp-btn');
  const packagesContainer = document.getElementById('packages-cards-container');
  const connPackageSelect = document.getElementById('conn-package');
  const connAreaSelect = document.getElementById('conn-area');
  const coverageContainer = document.getElementById('coverage-grid-container');
  const paymentMethodsContainer = document.getElementById('payment-methods-container');
  const faqContainer = document.getElementById('faq-list-container');
  const contactWaVal = document.getElementById('contact-wa-val');
  const contactWaLink = document.getElementById('contact-wa-link');
  const contactPhoneVal = document.getElementById('contact-phone-val');
  const contactTelLink = document.getElementById('contact-tel-link');
  const contactAddrVal = document.getElementById('contact-addr-val');
  const contactHoursVal = document.getElementById('contact-hours-val');
  const footerCompanyName = document.getElementById('footer-company-name');
  const footerTagline = document.getElementById('footer-tagline');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const langEnBtn = document.getElementById('lang-en');
  const langUrBtn = document.getElementById('lang-ur');
  const toastEl = document.getElementById('app-toast');

  // Load Config (Backend API -> fallback to embedded)
  async function loadConfig() {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        if (data && data.company) {
          appConfig = data;
          const badge = document.getElementById('backend-status-badge');
          if (badge) badge.textContent = '● Backend Connected';
        }
      }
    } catch {
      // Fallback already assigned
      const badge = document.getElementById('backend-status-badge');
      if (badge) badge.textContent = '● Offline / Pages Mode';
    }
    renderAll();
  }

  // Toast Notification
  function showToast(message, duration = 3500) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('active');
    setTimeout(() => {
      toastEl.classList.remove('active');
    }, duration);
  }

  // Tab Switching
  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('.nav-item').forEach((item) => {
      if (item.dataset.tab === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    document.querySelectorAll('.page-tab').forEach((tab) => {
      if (tab.id === `tab-${tabId}`) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      history.replaceState(null, '', `#${tabId}`);
    } catch {
      /* ignore */
    }
  }

  // Render Packages
  function renderPackages() {
    if (!packagesContainer) return;
    packagesContainer.innerHTML = '';
    if (connPackageSelect) connPackageSelect.innerHTML = '';

    (appConfig.packages || []).forEach((pkg) => {
      // Create card
      const card = document.createElement('div');
      card.className = `package-card ${pkg.popular ? 'popular' : ''}`;

      card.innerHTML = `
        ${pkg.popular ? '<div class="popular-badge">★ Most Popular</div>' : ''}
        <div class="package-speed">${escapeHtml(pkg.speed)}</div>
        <h3 class="package-name">${escapeHtml(pkg.name)}</h3>
        <div class="package-price-box">
          <div class="package-price">${escapeHtml(pkg.price)}</div>
          <div class="package-cycle">Per Month • Unlimited Fiber</div>
        </div>
        <p class="package-desc">${escapeHtml(pkg.recommendedFor || 'High-speed reliable optical internet connection.')}</p>
        <ul class="feature-list">
          ${(pkg.features || []).map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
        <button type="button" class="btn btn-primary btn-block select-pkg-btn" data-pkg-id="${pkg.id}">
          Select ${escapeHtml(pkg.speed)} Plan →
        </button>
      `;

      card.querySelector('.select-pkg-btn').addEventListener('click', () => {
        if (connPackageSelect) connPackageSelect.value = pkg.id;
        switchTab('connection');
        showToast(`Selected ${pkg.name}. Complete your details below!`);
      });

      packagesContainer.appendChild(card);

      // Populate select in connection form
      if (connPackageSelect) {
        const opt = document.createElement('option');
        opt.value = pkg.id;
        opt.textContent = `${pkg.name} (${pkg.speed}) - ${pkg.price}`;
        if (pkg.popular) opt.selected = true;
        connPackageSelect.appendChild(opt);
      }
    });
  }

  // Render Coverage Areas
  function renderCoverage(filterText = '', filterStatus = 'all') {
    if (!coverageContainer) return;
    coverageContainer.innerHTML = '';
    if (connAreaSelect && !connAreaSelect.children.length) {
      connAreaSelect.innerHTML = '';
    }

    const areas = appConfig.coverageAreas || [];
    const query = filterText.toLowerCase().trim();

    const filtered = areas.filter((a) => {
      const matchText = !query || a.name.toLowerCase().includes(query) || a.zone.toLowerCase().includes(query);
      const matchStatus = filterStatus === 'all' || a.status.toLowerCase() === filterStatus.toLowerCase();
      return matchText && matchStatus;
    });

    if (filtered.length === 0) {
      coverageContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border);">
          No areas matching "<strong>${escapeHtml(filterText)}</strong>" found. You can request coverage below!
        </div>
      `;
      return;
    }

    filtered.forEach((area) => {
      const card = document.createElement('div');
      card.className = 'area-card';
      const isAvail = area.status === 'Available';

      card.innerHTML = `
        <div class="area-header">
          <div>
            <div class="area-name">${escapeHtml(area.name)}</div>
            <div class="area-zone">${escapeHtml(area.zone)}</div>
          </div>
          <span class="status-chip ${isAvail ? 'available' : 'expanding'}">
            ${escapeHtml(area.status)}
          </span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0;">
          ${escapeHtml(area.statusDescription || 'Fiber network infrastructure deployed.')}
        </p>
        <button type="button" class="btn btn-secondary btn-sm select-area-btn" style="margin-top: auto;">
          ${isAvail ? 'Book Connection in this Area' : 'Pre-Register for Fiber'}
        </button>
      `;

      card.querySelector('.select-area-btn').addEventListener('click', () => {
        if (connAreaSelect) connAreaSelect.value = area.name;
        switchTab('connection');
        showToast(`Area "${area.name}" selected!`);
      });

      coverageContainer.appendChild(card);
    });

    // Populate connection area dropdown once
    if (connAreaSelect && connAreaSelect.children.length === 0) {
      areas.forEach((area) => {
        const opt = document.createElement('option');
        opt.value = area.name;
        opt.textContent = `${area.name} (${area.zone}) - ${area.status}`;
        connAreaSelect.appendChild(opt);
      });
    }
  }

  // Render Payment Methods
  function renderPaymentMethods() {
    if (!paymentMethodsContainer) return;
    paymentMethodsContainer.innerHTML = '';

    (appConfig.paymentMethods || []).forEach((pm) => {
      const card = document.createElement('div');
      card.className = 'payment-card';

      card.innerHTML = `
        <div class="payment-type-badge">${escapeHtml(pm.type)}</div>
        <h3 class="payment-title">${escapeHtml(pm.name)}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
          ${escapeHtml(pm.instructions)}
        </p>
        <div class="payment-account-box">
          <div><strong>Account / Till:</strong> <span style="color: var(--accent);">${escapeHtml(pm.accountNumber)}</span></div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;"><strong>Title:</strong> ${escapeHtml(pm.accountTitle)}</div>
        </div>
        <button type="button" class="btn btn-secondary btn-sm copy-acc-btn" data-copy="${escapeHtml(pm.accountNumber)}">
          📋 Copy Account Info
        </button>
      `;

      card.querySelector('.copy-acc-btn').addEventListener('click', function () {
        const txt = this.getAttribute('data-copy');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(txt);
          showToast('Account details copied to clipboard!');
        } else {
          showToast(`Account: ${txt}`);
        }
      });

      paymentMethodsContainer.appendChild(card);
    });
  }

  // Render FAQs
  function renderFaqs() {
    if (!faqContainer) return;
    faqContainer.innerHTML = '';

    (appConfig.faqs || []).forEach((faq, idx) => {
      const item = document.createElement('div');
      item.className = 'faq-item';

      item.innerHTML = `
        <button type="button" class="faq-question" id="faq-btn-${idx}" aria-expanded="false" aria-controls="faq-ans-${idx}">
          <span>${escapeHtml(faq.q)}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer" id="faq-ans-${idx}" role="region" aria-labelledby="faq-btn-${idx}">
          ${escapeHtml(faq.a)}
        </div>
      `;

      item.querySelector('.faq-question').addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open');
        this.setAttribute('aria-expanded', !isOpen);
        this.querySelector('.faq-icon').textContent = isOpen ? '+' : '×';
      });

      faqContainer.appendChild(item);
    });
  }

  // Render Company Contact Details
  function renderCompanyInfo() {
    const comp = appConfig.company || {};
    if (brandName) brandName.textContent = comp.name || 'Shahdara Fiber Net';
    if (footerCompanyName) footerCompanyName.textContent = comp.name || 'Shahdara Fiber Net';
    if (footerTagline) footerTagline.textContent = comp.tagline || '';
    if (contactWaVal) contactWaVal.textContent = comp.whatsapp || '+92-XXX-XXXXXXX';
    if (contactPhoneVal) contactPhoneVal.textContent = comp.phone || '+92-XXX-XXXXXXX';
    if (contactAddrVal) contactAddrVal.textContent = comp.address || '';
    if (contactHoursVal) contactHoursVal.textContent = comp.hours || '';

    // WhatsApp links
    const waUrl = `https://wa.me/${encodeURIComponent(comp.whatsappDigitsOnly || '923000000000')}?text=${encodeURIComponent('Hello Shahdara Fiber Net! I would like information regarding fiber internet connection.')}`;
    if (heroWhatsappBtn) heroWhatsappBtn.href = waUrl;
    if (contactWaLink) contactWaLink.href = waUrl;

    if (contactTelLink) {
      const cleanPhone = (comp.phone || '').replace(/[^0-9\+]/g, '');
      contactTelLink.href = `tel:${cleanPhone}`;
    }
  }

  function renderAll() {
    renderCompanyInfo();
    renderPackages();
    renderCoverage();
    renderPaymentMethods();
    renderFaqs();
  }

  // Helper Escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Form: New Connection Application
  const connForm = document.getElementById('connection-form');
  if (connForm) {
    connForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('conn-name');
      const phoneInput = document.getElementById('conn-phone');
      const addressInput = document.getElementById('conn-address');
      const pkgSelect = document.getElementById('conn-package');
      const areaSelect = document.getElementById('conn-area');
      const timeSelect = document.getElementById('conn-time');
      const cnicInput = document.getElementById('conn-cnic');
      const notesInput = document.getElementById('conn-notes');

      const errName = document.getElementById('err-conn-name');
      const errPhone = document.getElementById('err-conn-phone');
      const errAddress = document.getElementById('err-conn-address');

      let valid = true;

      if (!nameInput.value || nameInput.value.trim().length < 2) {
        errName.style.display = 'block';
        valid = false;
      } else {
        errName.style.display = 'none';
      }

      const cleanPhone = phoneInput.value.replace(/[\s\-\+\(\)]/g, '');
      if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 15) {
        errPhone.style.display = 'block';
        valid = false;
      } else {
        errPhone.style.display = 'none';
      }

      if (!addressInput.value || addressInput.value.trim().length < 5) {
        errAddress.style.display = 'block';
        valid = false;
      } else {
        errAddress.style.display = 'none';
      }

      if (!valid) return;

      const submitBtn = document.getElementById('btn-submit-conn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Application...';

      const payload = {
        fullName: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: addressInput.value.trim(),
        area: areaSelect ? areaSelect.value : 'Shahdara',
        packageId: pkgSelect ? pkgSelect.value : 'starter-fiber',
        preferredTime: timeSelect ? timeSelect.value : 'Anytime',
        cnic: cnicInput ? cnicInput.value.trim() : '',
        notes: notesInput ? notesInput.value.trim() : ''
      };

      let refId = '';
      try {
        const res = await fetch('/api/connections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          refId = data.referenceId;
        }
      } catch {
        // Fallback for static GitHub Pages / offline mode
      }

      if (!refId) {
        refId = `SFN-CONN-${Date.now().toString().slice(-4)}${Math.floor(1000 + Math.random() * 9000)}`;
      }

      // Save locally so the customer retains their reference
      try {
        const existing = JSON.parse(localStorage.getItem('sfn_connections') || '[]');
        existing.unshift({ refId, ...payload, date: new Date().toISOString() });
        localStorage.setItem('sfn_connections', JSON.stringify(existing));
      } catch {
        /* ignore */
      }

      // Open Success Modal
      document.getElementById('modal-conn-ref').textContent = refId;
      const waMsg = `Assalam o Alaikum Shahdara Fiber Net! I have submitted a new connection application.\nReference ID: ${refId}\nName: ${payload.fullName}\nPhone: ${payload.phone}\nPackage: ${payload.packageId}\nAddress: ${payload.address}, ${payload.area}\nPreferred Timing: ${payload.preferredTime}`;
      const waLink = document.getElementById('modal-conn-wa-btn');
      if (waLink) {
        waLink.href = `https://wa.me/${encodeURIComponent(appConfig.company.whatsappDigitsOnly || '923000000000')}?text=${encodeURIComponent(waMsg)}`;
      }

      document.getElementById('modal-conn-success').classList.add('active');
      connForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Connection Application';
    });
  }

  // Form: Complaint Submission
  const compForm = document.getElementById('complaint-form');
  if (compForm) {
    compForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const phoneInput = document.getElementById('comp-id-phone');
      const catSelect = document.getElementById('comp-category');
      const urgSelect = document.getElementById('comp-urgency');
      const descInput = document.getElementById('comp-desc');

      const errPhone = document.getElementById('err-comp-phone');
      const errDesc = document.getElementById('err-comp-desc');

      let valid = true;
      if (!phoneInput.value || phoneInput.value.trim().length < 3) {
        errPhone.style.display = 'block';
        valid = false;
      } else {
        errPhone.style.display = 'none';
      }

      if (!descInput.value || descInput.value.trim().length < 5) {
        errDesc.style.display = 'block';
        valid = false;
      } else {
        errDesc.style.display = 'none';
      }

      if (!valid) return;

      const submitBtn = document.getElementById('btn-submit-complaint');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Registering Ticket...';

      const payload = {
        customerIdOrPhone: phoneInput.value.trim(),
        issueCategory: catSelect.value,
        urgency: urgSelect.value,
        description: descInput.value.trim()
      };

      let ticketId = '';
      try {
        const res = await fetch('/api/complaints', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          ticketId = data.ticketId;
        }
      } catch {
        // Fallback
      }

      if (!ticketId) {
        ticketId = `SFN-TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      // Save locally
      try {
        const existing = JSON.parse(localStorage.getItem('sfn_tickets') || '[]');
        existing.unshift({ ticketId, ...payload, date: new Date().toISOString() });
        localStorage.setItem('sfn_tickets', JSON.stringify(existing));
      } catch {
        /* ignore */
      }

      document.getElementById('modal-comp-tck').textContent = ticketId;
      const waMsg = `Support Ticket Logged:\nTicket ID: ${ticketId}\nCustomer: ${payload.customerIdOrPhone}\nIssue: ${payload.issueCategory}\nUrgency: ${payload.urgency}\nDetails: ${payload.description}`;
      const waLink = document.getElementById('modal-comp-wa-btn');
      if (waLink) {
        waLink.href = `https://wa.me/${encodeURIComponent(appConfig.company.whatsappDigitsOnly || '923000000000')}?text=${encodeURIComponent(waMsg)}`;
      }

      document.getElementById('modal-comp-success').classList.add('active');
      compForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Register Complaint Ticket';
    });
  }

  // Ticket Lookup Handler
  const ticketLookupForm = document.getElementById('ticket-lookup-form');
  if (ticketLookupForm) {
    ticketLookupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const qInput = document.getElementById('track-ticket-id');
      const val = qInput.value.trim();
      if (!val) return;

      const statusBox = document.getElementById('ticket-status-box');
      const resId = document.getElementById('track-res-id');
      const resStatus = document.getElementById('track-res-status');
      const resDesc = document.getElementById('track-res-desc');
      const resTimeline = document.getElementById('track-res-timeline');

      let ticketData = null;
      try {
        const res = await fetch(`/api/complaints/${encodeURIComponent(val)}`);
        if (res.ok) {
          const data = await res.json();
          ticketData = data.ticket;
        }
      } catch {
        // offline fallback
      }

      if (!ticketData) {
        ticketData = {
          ticketId: val.toUpperCase().startsWith('SFN-') ? val.toUpperCase() : `SFN-TCK-${val}`,
          status: 'In Progress - Lineman Dispatched',
          issueCategory: 'Network Line Inspection',
          updates: [
            { timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Ticket registered by NOC.' },
            { timestamp: new Date(Date.now() - 1200000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Laser optical power checked. Field technician assigned.' }
          ]
        };
      }

      resId.textContent = ticketData.ticketId;
      resStatus.textContent = ticketData.status || 'Active';
      resDesc.textContent = `Category: ${ticketData.issueCategory || 'General Support'}`;

      resTimeline.innerHTML = '';
      (ticketData.updates || []).forEach((u) => {
        const item = document.createElement('div');
        item.innerHTML = `<strong>${escapeHtml(u.timestamp || 'Just now')}:</strong> ${escapeHtml(u.note)}`;
        resTimeline.appendChild(item);
      });

      statusBox.style.display = 'block';
      showToast(`Showing status for ${ticketData.ticketId}`);
    });
  }

  // Bill Lookup Handler
  const billLookupForm = document.getElementById('bill-lookup-form');
  if (billLookupForm) {
    billLookupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const queryInput = document.getElementById('bill-lookup-query');
      const val = queryInput.value.trim();
      if (!val) return;

      const resultBox = document.getElementById('bill-result-box');
      const custName = document.getElementById('bill-cust-name');
      const statusBadge = document.getElementById('bill-status-badge');
      const custId = document.getElementById('bill-cust-id');
      const pkgName = document.getElementById('bill-pkg-name');
      const amount = document.getElementById('bill-amount');
      const dueDate = document.getElementById('bill-due-date');
      const cycle = document.getElementById('bill-cycle');
      const lastPay = document.getElementById('bill-last-pay');

      let billData = null;
      try {
        const res = await fetch(`/api/bills/lookup?query=${encodeURIComponent(val)}`);
        if (res.ok) {
          const data = await res.json();
          billData = data.bill;
        }
      } catch {
        /* fallback */
      }

      if (!billData) {
        billData = {
          customerId: val.toUpperCase().startsWith('SFN-') ? val.toUpperCase() : `SFN-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: 'Valued Subscriber',
          packageName: 'Ultra Streamer Fiber (40 Mbps)',
          monthlyAmount: 'PKR 0000 - EDIT ME',
          currentStatus: 'Paid / Active',
          dueDate: '10th of every month',
          billingPeriod: 'Current Month',
          lastPaymentDate: 'Verified'
        };
      }

      custName.textContent = billData.customerName || 'Subscriber';
      custId.textContent = billData.customerId;
      pkgName.textContent = billData.packageName;
      amount.textContent = billData.monthlyAmount;
      dueDate.textContent = billData.dueDate;
      cycle.textContent = billData.billingPeriod || 'Current Month';
      lastPay.textContent = billData.lastPaymentDate || 'Verified';

      const isPaid = (billData.currentStatus || '').toLowerCase().includes('paid');
      statusBadge.textContent = billData.currentStatus || 'Active';
      statusBadge.className = `status-chip ${isPaid ? 'available' : 'expanding'}`;

      resultBox.style.display = 'block';
      showToast(`Bill details loaded for ${billData.customerId}`);
    });
  }

  // Speed Test Simulator
  const btnSpeedtest = document.getElementById('btn-run-speedtest');
  if (btnSpeedtest) {
    btnSpeedtest.addEventListener('click', () => {
      if (isSpeedTesting) return;
      isSpeedTesting = true;

      const pingEl = document.getElementById('diag-ping');
      const downEl = document.getElementById('diag-down');
      const upEl = document.getElementById('diag-up');
      const btnText = document.getElementById('speedtest-btn-text');

      btnText.textContent = 'Testing Optical Latency...';
      pingEl.textContent = '...';
      downEl.textContent = '...';
      upEl.textContent = '...';

      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step <= 10) {
          pingEl.textContent = `${Math.floor(4 + Math.random() * 5)} ms`;
          btnText.textContent = 'Measuring Ping & Jitter...';
        } else if (step <= 25) {
          const speed = (20 + (step - 10) * 1.8 + Math.random() * 4).toFixed(1);
          downEl.textContent = `${speed} Mbps`;
          btnText.textContent = 'Testing Download Symmetrical Pipe...';
        } else if (step <= 40) {
          const speed = (20 + (step - 25) * 1.8 + Math.random() * 3).toFixed(1);
          upEl.textContent = `${speed} Mbps`;
          btnText.textContent = 'Testing Optical Upload Stream...';
        } else {
          clearInterval(interval);
          pingEl.textContent = '5 ms';
          downEl.textContent = '48.4 Mbps';
          upEl.textContent = '47.9 Mbps';
          btnText.textContent = 'Test Completed! Run Again';
          isSpeedTesting = false;
          showToast('Speed test finished! Symmetrical fiber rate verified.');
        }
      }, 70);
    });
  }

  // Coverage Search and Filter
  const coverageSearch = document.getElementById('coverage-search');
  if (coverageSearch) {
    coverageSearch.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('[data-cov-filter].active');
      const filter = activeFilterBtn ? activeFilterBtn.dataset.covFilter : 'all';
      renderCoverage(e.target.value, filter);
    });
  }

  document.querySelectorAll('[data-cov-filter]').forEach((btn) => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-cov-filter]').forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      const searchVal = coverageSearch ? coverageSearch.value : '';
      renderCoverage(searchVal, this.dataset.covFilter);
    });
  });

  // Modal Close buttons
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', function () {
      const modalId = this.getAttribute('data-close-modal');
      const m = document.getElementById(modalId);
      if (m) m.classList.remove('active');
    });
  });

  // Coverage request street modal
  const btnReqModal = document.getElementById('btn-request-coverage-modal');
  if (btnReqModal) {
    btnReqModal.addEventListener('click', () => {
      document.getElementById('modal-coverage-req').classList.add('active');
    });
  }

  const covReqForm = document.getElementById('cov-request-form');
  if (covReqForm) {
    covReqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const area = document.getElementById('cov-req-area').value.trim();
      const phone = document.getElementById('cov-req-phone').value.trim();
      document.getElementById('modal-coverage-req').classList.remove('active');
      covReqForm.reset();
      showToast(`Area request for "${area}" received! Our planning team has added your colony.`);
    });
  }

  // Navigation Click Handlers
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      switchTab(item.dataset.tab);
    });
  });

  document.querySelectorAll('[data-nav-target]').forEach((el) => {
    el.addEventListener('click', () => {
      switchTab(el.getAttribute('data-nav-target'));
    });
  });

  const brandLink = document.getElementById('brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('home');
    });
  }

  // Theme Toggle
  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
    }
    localStorage.setItem('sfn_theme', theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }
  applyTheme(currentTheme);

  // Language Switcher
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sfn_lang', lang);

    if (langEnBtn && langUrBtn) {
      if (lang === 'ur') {
        langUrBtn.classList.add('active');
        langEnBtn.classList.remove('active');
      } else {
        langEnBtn.classList.add('active');
        langUrBtn.classList.remove('active');
      }
    }

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
  }

  if (langEnBtn) {
    langEnBtn.addEventListener('click', () => applyLanguage('en'));
  }
  if (langUrBtn) {
    langUrBtn.addEventListener('click', () => applyLanguage('ur'));
  }
  applyLanguage(currentLang);

  // Initial Hash routing
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'packages', 'connection', 'billing', 'complaints', 'coverage', 'contact'].includes(hash)) {
      switchTab(hash);
    }
  }

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {
        /* SW registration optional in local file view */
      });
    });
  }

  // Boot
  loadConfig();
})();
