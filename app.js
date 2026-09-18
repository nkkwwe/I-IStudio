/**
 * I&I Studio - Frontend Interactivity & Language Switcher
 */

let currentLanguage = 'ru';
let activeGoalKey = 'landing';

const savedTheme = localStorage.getItem('ii_studio_theme');
if (savedTheme === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initMobileMenu();
  initLanguageSwitcher();
  initSolutionsByGoal();
  initServiceTabs();
  initSmartForm();
});

/* ==========================================================================
   1. Language Switcher & Localization Controller
   ========================================================================== */
/* ==========================================================================
   1. Theme Switcher
   ========================================================================== */
function initThemeSwitcher() {
  const languageSwitcher = document.querySelector('.language-switcher');
  if (!languageSwitcher) return;

  let toggle = document.getElementById('themeToggle');

  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'themeToggle';
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<svg class="theme-icon theme-icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3.5"></circle><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4"></path></svg>' +
      '<svg class="theme-icon theme-icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z"></path></svg>';
    languageSwitcher.insertAdjacentElement('beforebegin', toggle);
  }

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Enable light theme' : 'Enable dark theme');
    toggle.setAttribute('title', isDark ? 'Light theme' : 'Dark theme');
    localStorage.setItem('ii_studio_theme', isDark ? 'dark' : 'light');
  };

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });

  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
}
function initLanguageSwitcher() {
  const options = document.querySelectorAll('.language-option');
  if (!options.length) return;

  // Retrieve saved language, default to 'ru'
  const savedLanguage = localStorage.getItem('ii_studio_language') || 'ru';

  window.setLanguage = function(lang) {
    if (!window.translations || !window.translations[lang]) {
      lang = 'ru';
    }
    currentLanguage = lang;

    // Update switcher pill buttons
    options.forEach(opt => {
      const isActive = opt.dataset.language === lang;
      opt.classList.toggle('active', isActive);
      opt.setAttribute('aria-pressed', String(isActive));
    });

    // Update html attributes
    document.documentElement.lang = lang;
    localStorage.setItem('ii_studio_language', lang);

    const t = window.translations[lang];
    if (!t) return;

    // Update document title
    if (t.page_title) {
      document.title = t.page_title;
    }

    // Update standard text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // Update innerHTML nodes (formatting, spans, strong)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // Update input and textarea placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // Re-render solutions by goal in the new language
    if (window.renderActiveSolution) {
      window.renderActiveSolution();
    }
  };

  options.forEach(option => {
    option.addEventListener('click', () => {
      const targetLang = option.dataset.language;
      if (targetLang && targetLang !== currentLanguage) {
        window.setLanguage(targetLang);
      }
    });
  });

  // Apply initially
  window.setLanguage(savedLanguage);
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('navMenu');
  const header = document.querySelector('.site-header');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    // Close on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }

  // Scroll listener for sticky header
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   3. Solutions by Goal (Objective Selector)
   ========================================================================== */
function initSolutionsByGoal() {
  const pills = document.querySelectorAll('.goal-pill');
  const output = document.getElementById('solutionOutput');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeGoalKey = pill.getAttribute('data-goal');
      renderSolution(activeGoalKey);
    });
  });

  function renderSolution(key) {
    if (!window.solutionsData || !window.translations) return;

    const langData = window.solutionsData[currentLanguage] || window.solutionsData['ru'];
    const data = langData ? langData[key] : null;
    const t = window.translations[currentLanguage] || window.translations['ru'];
    if (!data || !output || !t) return;

    output.innerHTML = `
      <div class="solution-grid">
        <div class="solution-left">
          <span class="section-tag" style="margin-bottom: 12px;">${t.sol_rec_approach}</span>
          <h3>${data.title}</h3>
          <p>${data.desc}</p>
          
          <div class="solution-stack-title">${t.sol_included_title}</div>
          <div class="solution-tags">
            ${data.tags.map(tag => `<span class="sol-tag">✓ ${tag}</span>`).join('')}
          </div>

          <a href="#inquiry" class="btn btn-primary" onclick="preselectService('${data.serviceKey}')">
            <span>${t.sol_calc_btn}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>

        <div class="solution-right">
          <div class="sol-stat-row">
            <span class="sol-stat-label">${t.sol_lbl_timeline}</span>
            <span class="sol-stat-value">${data.timeline}</span>
          </div>
          <div class="sol-stat-row">
            <span class="sol-stat-label">${t.sol_lbl_deliverable}</span>
            <span class="sol-stat-value">${data.deliverable}</span>
          </div>
          <div class="sol-stat-row">
            <span class="sol-stat-label">${t.sol_lbl_target}</span>
            <span class="sol-stat-value" style="color: var(--accent-blue);">${data.kpi}</span>
          </div>
          <div class="sol-stat-row">
            <span class="sol-stat-label">${t.sol_lbl_support}</span>
            <span class="sol-stat-value">${t.sol_val_support}</span>
          </div>
        </div>
      </div>
    `;
  }

  window.renderActiveSolution = function() {
    renderSolution(activeGoalKey);
  };

  // Render initial
  renderSolution('landing');
}

/* ==========================================================================
   4. Service Direction Selector
   ========================================================================== */
function initServiceTabs() {
  const tabs = document.querySelectorAll('#serviceTabs .tab-btn');
  const serviceInput = document.getElementById('serviceTypeInput');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const service = tab.getAttribute('data-service');
      if (serviceInput) serviceInput.value = service;
    });
  });
}

// Global preselect helper for buttons on page
window.preselectService = function(serviceKey) {
  const tabs = document.querySelectorAll('#serviceTabs .tab-btn');
  const targetTab = document.querySelector(`#serviceTabs .tab-btn[data-service="${serviceKey}"]`);
  const serviceInput = document.getElementById('serviceTypeInput');

  if (targetTab) {
    tabs.forEach(t => t.classList.remove('active'));
    targetTab.classList.add('active');
    if (serviceInput) serviceInput.value = serviceKey;
  }

  // Smooth scroll to form
  const inquirySection = document.getElementById('inquiry');
  if (inquirySection) {
    inquirySection.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   5. Smart Form Submission & Confirmation
   ========================================================================== */
function initSmartForm() {
  const form = document.getElementById('projectForm');
  const overlay = document.getElementById('feedbackOverlay');
  const closeBtn = document.getElementById('closeFeedbackBtn');
  const ticketDisplay = document.getElementById('ticketNumberDisplay');
  const assignedService = document.getElementById('assignedService');

  if (form && overlay) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const serviceType = document.getElementById('serviceTypeInput')?.value || 'landing';
      const mapObj = window.serviceManagerMap ? window.serviceManagerMap[currentLanguage] : null;
      const mapping = mapObj ? (mapObj[serviceType] || mapObj['landing']) : { serviceName: 'Landing Page' };

      // Generate random ticket number for I&I Studio
      const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `#II-${randomTicketNum}`;

      if (ticketDisplay) ticketDisplay.textContent = ticketId;
      if (assignedService) assignedService.textContent = mapping.serviceName;

      // Show overlay
      overlay.classList.add('active');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        form.reset();
        preselectService('landing');
      });
    }
  }
}
