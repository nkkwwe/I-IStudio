/**
 * I&I Studio - Frontend Interactivity & Language Switcher
 */

import { router } from '@inertiajs/react';

let currentLanguage = 'en';
let activeGoalKey = 'landing';

const savedTheme = localStorage.getItem('ii_studio_theme');
if (savedTheme === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}

export function initLegacyApp() {
  initThemeSwitcher();
  initMobileMenu();
  initLanguageSwitcher();
  initSolutionsByGoal();
  initServiceTabs();
  initSmartForm();
  initScrollSpy();
}

/* ==========================================================================
   1. Language Switcher & Localization Controller
   ========================================================================== */
/* ==========================================================================
   1. Theme Switcher
   ========================================================================== */
function initThemeSwitcher() {
  if (document.querySelector('.account-site-header')) return;
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
    const t = window.translations?.[currentLanguage] || window.translations?.en || {};
    toggle.setAttribute('aria-label', isDark ? (t.theme_light || 'Enable light theme') : (t.theme_dark || 'Enable dark theme'));
    toggle.setAttribute('title', isDark ? (t.theme_light || 'Light theme') : (t.theme_dark || 'Dark theme'));
    localStorage.setItem('ii_studio_theme', isDark ? 'dark' : 'light');
  };

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });

  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
}
function initLanguageSwitcher() {
  const options = document.querySelectorAll('.site-header:not(.account-site-header) .language-option');
  const switchers = Array.from(document.querySelectorAll('.site-header:not(.account-site-header) .language-switcher'));
  const supportedLanguages = ['en', 'uk', 'ro'];
  const languageLabels = { en: 'EN', uk: 'UK', ro: 'RO' };
  const savedLanguage = localStorage.getItem('ii_studio_language');
  const closeSwitcher = (switcher) => {
    const trigger = switcher.querySelector('.language-trigger');
    switcher.classList.remove('open');
    trigger?.setAttribute('aria-expanded', 'false');
  };

  window.setLanguage = function(lang) {
    if (!window.translations || !window.translations[lang]) {
      lang = 'en';
    }
    if (!supportedLanguages.includes(lang)) lang = 'en';
    currentLanguage = lang;
    const t = window.translations[lang] || window.translations.en || {};

    switchers.forEach(switcher => {
      const trigger = switcher.querySelector('.language-trigger');
      const currentLabel = switcher.querySelector('.language-current');

      switcher.querySelectorAll('.language-option').forEach(opt => {
        const isActive = opt.dataset.language === lang;
        opt.classList.toggle('active', isActive);
        opt.setAttribute('aria-selected', String(isActive));
      });

      if (currentLabel) currentLabel.textContent = languageLabels[lang];
      trigger?.setAttribute('aria-label', `${t.aria_languages || 'Language selection'}: ${languageLabels[lang]}`);
      closeSwitcher(switcher);
    });

    // Update html attributes
    document.documentElement.lang = lang;
    localStorage.setItem('ii_studio_language', lang);

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (t[key] !== undefined) el.setAttribute('title', t[key]);
    });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const isDark = document.documentElement.dataset.theme === 'dark';
      themeToggle.setAttribute('aria-label', isDark ? (t.theme_light || 'Enable light theme') : (t.theme_dark || 'Enable dark theme'));
      themeToggle.setAttribute('title', isDark ? (t.theme_light || 'Light theme') : (t.theme_dark || 'Dark theme'));
    }

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
      } else {
        const parentSwitcher = option.closest('.language-switcher');
        if (parentSwitcher) closeSwitcher(parentSwitcher);
      }
    });
  });

  switchers.forEach(switcher => {
    const trigger = switcher.querySelector('.language-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = switcher.classList.toggle('open');
      switchers.forEach(otherSwitcher => {
        if (otherSwitcher !== switcher) closeSwitcher(otherSwitcher);
      });
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', (event) => {
    if (!switchers.some(switcher => switcher.contains(event.target))) {
      switchers.forEach(closeSwitcher);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      switchers.forEach(closeSwitcher);
      switchers[0].querySelector('.language-trigger')?.focus();
    }
  });

  // Apply initially
  window.setLanguage(supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en');
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
   2.1. ScrollSpy Navigation
   ========================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (!navLinks.length) return;

  const getTargetSection = (link) => {
    const hash = link.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return null;
    return document.querySelector(hash);
  };

  const sectionsWithLinks = Array.from(navLinks)
    .map(link => ({ link, section: getTargetSection(link) }))
    .filter(item => item.section !== null);
  if (!sectionsWithLinks.length) return;

  let isClickScrolling = false;
  let scrollEndTimer = null;

  const setActiveLink = (targetLink) => {
    sectionsWithLinks.forEach(({ link }) => {
      if (link === targetLink) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const updateActiveNav = () => {
    if (isClickScrolling) return;

    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
    const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);

    if (isBottom) {
      setActiveLink(sectionsWithLinks[sectionsWithLinks.length - 1].link);
      return;
    }

    if (window.scrollY < 80) {
      sectionsWithLinks.forEach(({ link }) => link.classList.remove('active'));
      return;
    }

    const threshold = headerHeight + 80;
    let activeItem = null;

    for (let i = sectionsWithLinks.length - 1; i >= 0; i--) {
      const item = sectionsWithLinks[i];
      const rect = item.section.getBoundingClientRect();
      if (rect.top <= threshold) {
        activeItem = item;
        break;
      }
    }

    if (activeItem) {
      setActiveLink(activeItem.link);
    } else {
      sectionsWithLinks.forEach(({ link }) => link.classList.remove('active'));
    }
  };

  const endClickScroll = () => {
    if (!isClickScrolling) return;
    isClickScrolling = false;
    clearTimeout(scrollEndTimer);
  };

  sectionsWithLinks.forEach(({ link }) => {
    link.addEventListener('click', () => {
      setActiveLink(link);
      isClickScrolling = true;
      clearTimeout(scrollEndTimer);
      // Fallback timer: auto-release if no scroll events occur
      scrollEndTimer = setTimeout(endClickScroll, 1200);
    });
  });

  const logo = document.querySelector('.site-header .logo');
  if (logo) {
    logo.addEventListener('click', () => {
      sectionsWithLinks.forEach(({ link }) => link.classList.remove('active'));
      isClickScrolling = true;
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(endClickScroll, 1200);
    });
  }

  const handleScroll = () => {
    if (isClickScrolling) {
      // While smooth scrolling to target, keep blocking any other active state changes.
      // Reset timer: only release lock 150ms after the very last scroll frame has settled.
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(endClickScroll, 150);
      return;
    }
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', updateActiveNav, { passive: true });

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', endClickScroll, { passive: true });
  }

  const preventManualScroll = (event) => {
    if (isClickScrolling) {
      event.preventDefault();
    }
  };

  window.addEventListener('wheel', preventManualScroll, { passive: false });
  window.addEventListener('touchmove', preventManualScroll, { passive: false });
  window.addEventListener('keydown', (event) => {
    if (isClickScrolling && ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      event.preventDefault();
    }
  });

  updateActiveNav();
}

/* ==========================================================================
   3. Solutions by Goal (Objective Selector)
   ========================================================================== */
function initSolutionsByGoal() {
  const pills = document.querySelectorAll('.goal-pill');
  const output = document.getElementById('solutionOutput');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');

      activeGoalKey = pill.getAttribute('data-goal');
      renderSolution(activeGoalKey);
    });
  });

  function renderSolution(key) {
    if (!window.solutionsData || !window.translations) return;

    const langData = window.solutionsData[currentLanguage] || window.solutionsData['en'];
    const data = langData ? langData[key] : null;
    const t = window.translations[currentLanguage] || window.translations['en'];
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

          <a href="#inquiry" class="btn btn-primary solution-calc-btn" data-service="${data.serviceKey}" onclick="preselectService('${data.serviceKey}'); return false;">
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

// Global preselect helper for buttons and pills across page
window.preselectService = function(serviceKey, openModal = true) {
  const serviceAliases = {
    'functional-site': 'corporate',
    'full-pack': 'landing',
  };
  const inquiryServiceKey = serviceAliases[serviceKey] || serviceKey;
  const tabs = document.querySelectorAll('#serviceTabs .tab-btn');
  const targetTab = document.querySelector(`#serviceTabs .tab-btn[data-service="${inquiryServiceKey}"]`);
  const serviceInput = document.getElementById('serviceTypeInput');
  const homepageInquiry = document.getElementById('inquiry');

  if (homepageInquiry && !document.querySelector('.inquiry-page') && openModal) {
    const pills = homepageInquiry.querySelectorAll('.action-service-pill');
    pills.forEach(pill => {
      const isSelected = pill.dataset.service === inquiryServiceKey;
      pill.classList.toggle('active', isSelected);
      pill.setAttribute('aria-pressed', String(isSelected));
    });
    const openBriefButton = document.getElementById('openInquiryPageBtn');
    if (openBriefButton) openBriefButton.dataset.service = inquiryServiceKey;
    homepageInquiry.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  if (!serviceInput && openModal) {
    window.location.href = `/inquiry?service=${encodeURIComponent(serviceKey)}`;
    return;
  }

  if (targetTab) {
    tabs.forEach(t => t.classList.remove('active'));
    targetTab.classList.add('active');
  }
  if (serviceInput) serviceInput.value = inquiryServiceKey;

  if (openModal && window.openInquiryPage) {
    window.openInquiryPage(inquiryServiceKey);
  }
};

/* ==========================================================================
   5. Inquiry Page, Smart Form & Ticket Confirmation
   ========================================================================== */
function initSmartForm() {
  const form = document.getElementById('projectForm');
  const openInquiryBtns = document.querySelectorAll('#openInquiryPageBtn, [data-open-page="inquiry"], .action-service-pill, [data-scroll-to-inquiry], [data-route-to-inquiry]');
  const overlay = document.getElementById('feedbackOverlay');
  const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');
  const serviceInput = document.getElementById('serviceTypeInput');

  window.openInquiryPage = function(serviceKey = 'landing') {
    window.location.href = `/inquiry?service=${encodeURIComponent(serviceKey)}`;
  };

  if (!form) {
    openInquiryBtns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        if (btn.hasAttribute('data-route-to-inquiry')) {
          window.openInquiryPage(btn.dataset.service || 'landing');
          return;
        }
        window.preselectService(btn.dataset.service || 'landing');
      });
    });
    return;
  }

  openInquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openInquiryPage(btn.dataset.service || 'landing');
    });
  });

  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (requestedService) {
    const requestedTab = document.querySelector(`#serviceTabs .tab-btn[data-service="${requestedService}"]`);
    if (requestedTab) requestedTab.click();
  }

  // Form submission & Ticket confirmation
  if (form && overlay) {
    restoreInquiryDraft(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const payload = Object.fromEntries(new FormData(form).entries());

      if (form.dataset.authenticated !== 'true') {
        localStorage.setItem('ii_studio_inquiry_draft', JSON.stringify(payload));
      }

      router.post('/inquiry', payload, {
        preserveScroll: true,
        onSuccess: (page) => {
          if (page.component === 'Inquiry' && page.props?.flash?.inquiry_submitted) {
            localStorage.removeItem('ii_studio_inquiry_draft');
          }
        },
      });
    });

    if (closeFeedbackBtn) {
      closeFeedbackBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        form.reset();
        localStorage.removeItem('ii_studio_inquiry_draft');
        const budgetRow = document.getElementById('feedbackBudgetRow');
        if (budgetRow) budgetRow.style.display = 'none';
        window.preselectService('landing', false);
      });
    }
  }
}

function restoreInquiryDraft(form) {
  let draft = null;

  try {
    draft = JSON.parse(localStorage.getItem('ii_studio_inquiry_draft') || 'null');
  } catch {
    localStorage.removeItem('ii_studio_inquiry_draft');
  }

  if (!draft || typeof draft !== 'object') return;

  Object.entries(draft).forEach(([name, value]) => {
    const field = form.elements.namedItem(name);
    if (field && typeof value === 'string') field.value = value;
  });

  const serviceTab = document.querySelector(`#serviceTabs .tab-btn[data-service="${draft.service_type}"]`);
  serviceTab?.click();
}
