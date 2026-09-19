export default function HomeMarkup() {
  return (
<div className="react-page-root"><header className="site-header">
    <div className="container header-container">
      <a href="#hero" className="logo">
        <span className="logo-symbol">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <rect x={2} y={2} width={20} height={20} rx={6} fill="#09090b" />
            <path d="M7 7V17M17 7V17M10.5 13.5C11.2 12.8 12.8 11.2 13.5 10.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
            <circle cx={12} cy={12} r="1.5" fill="#ffffff" />
          </svg>
        </span>
        <span className="logo-text">I&amp;I<span className="logo-sub">Studio</span></span>
      </a>
      <nav className="nav-menu" id="navMenu">
        <a href="#solutions" className="nav-link" data-i18n="nav_solutions">Solutions</a>
        <a href="#services" className="nav-link" data-i18n="nav_services">Services</a>
        <a href="#cases" className="nav-link" data-i18n="nav_cases">Cases</a>
        <a href="#process" className="nav-link" data-i18n="nav_process">How We Work</a>
        <a href="#advantages" className="nav-link" data-i18n="nav_about">About</a>
        <a href="#contact" className="nav-link" data-i18n="nav_contact">Contact</a>
      </nav>
      <div className="header-actions">
        <a href="/inquiry" className="btn btn-primary btn-sm">
          <span data-i18n="btn_discuss">Discuss Project</span>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
        <a href="/account" className="account-header-link">Account</a>
        <button type="button" id="themeToggle" className="theme-toggle" aria-label="Toggle theme">
          <svg className="theme-icon theme-icon-sun" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4" /></svg>
          <svg className="theme-icon theme-icon-moon" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg>
        </button>
        <div className="language-switcher" aria-label="Language selection">
          <button type="button" className="language-trigger" aria-haspopup="listbox" aria-expanded="false">
            <span className="language-current">EN</span>
            <svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div className="language-menu" role="listbox" aria-label="Available languages">
            <button type="button" className="language-option active" data-language="en" role="option" aria-selected="true">English <span>EN</span></button>
            <button type="button" className="language-option" data-language="uk" role="option" aria-selected="false">Українська <span>UK</span></button>
            <button type="button" className="language-option" data-language="ro" role="option" aria-selected="false">Română <span>RO</span></button>
          </div>
        </div>
        <button className="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
  <section className="hero-section" id="hero">
    <div className="container hero-container">
      <div className="hero-badge">
        <span className="badge-dot" />
        <span data-i18n="hero_badge">Websites • Redesign • Targeted Advertising</span>
      </div>
      <h1 className="hero-title" data-i18n-html="hero_title">
        We build websites, redesign existing pages, and launch ads that <span className="gradient-text">bring you clients.</span>
      </h1>
      <p className="hero-subtitle" data-i18n="hero_subtitle">
        From high-converting landing pages and functional business sites to modern website overhauls and targeted advertising — we turn visitors into actual inquiries.
      </p>
      <div className="hero-cta-group">
        <a href="/inquiry" className="btn btn-primary btn-lg">
          <span data-i18n="hero_btn_discuss">Discuss Project</span>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
        <a href="#services" className="btn btn-secondary btn-lg">
          <span data-i18n="hero_btn_explore">Explore Services</span>
        </a>
      </div>
      <div className="hero-editorial-wrap">
        <div className="hero-editorial-intro">
          <h3 data-i18n="hero_ed_title">Focused digital execution for modern businesses</h3>
          <p data-i18n-html="hero_ed_desc">
            At <strong>I&amp;I Studio</strong>, we specialize in high-impact web development and customer acquisition. We don't drag out projects for months or build complicated bloated systems you can't manage. We focus strictly on what brings real commercial inquiries to your business.
          </p>
        </div>
        <div className="hero-services-text-grid">
          <div className="service-text-item">
            <div className="text-item-header">
              <span className="text-item-num">01</span>
              <h4 data-i18n="hero_serv_01_title">High-Converting Landing Pages</h4>
            </div>
            <p data-i18n="hero_serv_01_desc">
              One-page websites built to present a specific service, product, or promotion with crystal clarity. We write persuasive texts, design clean modern layouts, and optimize forms so visitors turn into direct inquiries. Fast turnaround: ready for traffic in 5–7 days.
            </p>
          </div>
          <div className="service-text-item">
            <div className="text-item-header">
              <span className="text-item-num">02</span>
              <h4 data-i18n="hero_serv_02_title">Functional Business Websites</h4>
            </div>
            <p data-i18n="hero_serv_02_desc">
              Complete multi-page platforms for established companies that need to showcase multiple services, transparent pricing, verified client portfolio, team credentials, and quote calculators. Fast, clean code that loads in under 1 second.
            </p>
          </div>
          <div className="service-text-item">
            <div className="text-item-header">
              <span className="text-item-num">03</span>
              <h4 data-i18n-html="hero_serv_03_title">Website Redesign &amp; Modernization</h4>
            </div>
            <p data-i18n="hero_serv_03_desc">
              Complete overhaul of outdated, slow, or low-converting websites. We transform the UI into a modern Swiss/Corporate Tech aesthetic, fix mobile responsiveness, boost PageSpeed scores to 95+, and preserve all existing Google SEO rankings.
            </p>
          </div>
          <div className="service-text-item">
            <div className="text-item-header">
              <span className="text-item-num">04</span>
              <h4 data-i18n-html="hero_serv_04_title">Targeted Advertising (Google &amp; Meta)</h4>
            </div>
            <p data-i18n="hero_serv_04_desc">
              Bringing paying clients from day one. We set up Google Search campaigns for people actively looking for your services right now, plus visually engaging Instagram and Facebook ads with custom creatives, tracking pixels, and cost-per-lead optimization.
            </p>
          </div>
        </div>
        <div className="hero-trust-bar">
          <div className="trust-pill"><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <span data-i18n="hero_trust_1">5–7 Days Typical Launch</span></div>
          <div className="trust-pill"><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <span data-i18n="hero_trust_2">15s Lead Alerts to Telegram</span></div>
          <div className="trust-pill"><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <span data-i18n="hero_trust_3">100% Mobile Optimized</span></div>
          <div className="trust-pill"><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <span data-i18n-html="hero_trust_4">Fixed Pricing &amp; Direct Contact</span></div>
        </div>
      </div>
    </div>
  </section>
  <section className="solutions-section" id="solutions">
    <div className="container">
      <div className="section-header">
        <span className="section-tag" data-i18n="sol_tag">[ 01 / SOLUTIONS ]</span>
        <h2 className="section-title" data-i18n="sol_title">Solutions Tailored to Your Goal</h2>
        <p className="section-desc" data-i18n="sol_desc">Choose what your business needs right now to see the exact recommended approach.</p>
      </div>
      <div className="goals-pills-wrapper">
        <button className="goal-pill active" data-goal="landing">
          <span className="goal-icon"><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></span> <span data-i18n="goal_landing">Launch a Landing Page</span>
        </button>
        <button className="goal-pill" data-goal="functional-site">
          <span className="goal-icon"><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={4} y={2} width={16} height={20} rx={2} /><line x1={9} y1={6} x2={15} y2={6} /><line x1={9} y1={10} x2={15} y2={10} /><line x1={9} y1={14} x2={15} y2={14} /></svg></span> <span data-i18n="goal_business">Functional Business Website</span>
        </button>
        <button className="goal-pill" data-goal="redesign">
          <span className="goal-icon"><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg></span> <span data-i18n="goal_redesign">Redesign Existing Website</span>
        </button>
        <button className="goal-pill" data-goal="ads">
          <span className="goal-icon"><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><circle cx={12} cy={12} r={6} /><circle cx={12} cy={12} r={2} /></svg></span> <span data-i18n-html="goal_ads">Launch Paid Ads (Google &amp; Meta)</span>
        </button>
        <button className="goal-pill" data-goal="full-pack">
          <span className="goal-icon"><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><polygon points="12 6 12 12 16 14" /></svg></span> <span data-i18n="goal_bundle">Website + Ads Bundle</span>
        </button>
      </div>
      <div className="solution-output-card" id="solutionOutput">
      </div>
    </div>
  </section>
  <section className="services-section" id="services">
    <div className="container">
      <div className="section-header">
        <span className="section-tag" data-i18n="serv_tag">[ 02 / CORE SERVICES ]</span>
        <h2 className="section-title" data-i18n="serv_title">What We Build For You</h2>
        <p className="section-desc" data-i18n="serv_desc">Practical, conversion-focused digital solutions crafted in a modern modular ecosystem.</p>
      </div>
      <div className="bento-grid">
        <div className="bento-card bento-span-7">
          <div className="bento-card-top">
            <div className="bento-tag-group">
              <span className="bento-badge" data-i18n="bento_1_badge">Landing Pages</span>
              <span className="bento-subbadge"><svg className="inline-svg" width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> <span data-i18n="bento_1_subbadge">7-Day Launch</span></span>
            </div>
            <div className="card-icon-wrapper">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
          </div>
          <h3 className="bento-title" data-i18n="bento_1_title">High-Converting Landing Pages</h3>
          <p className="bento-desc" data-i18n="bento_1_desc">One-page websites built to present your product or service with maximum clarity, overcoming client objections and turning paid clicks into direct inquiries.</p>
          <div className="bento-inner-panel">
            <div className="browser-mockup-header">
              <div className="browser-dots">
                <span /><span /><span />
              </div>
              <div className="browser-address">iistudio.dev/preview/landing</div>
              <div className="live-status-pill"><span className="live-dot" /> Live</div>
            </div>
            <div className="bento-panel-stat">
              <span className="stat-number">4.8% – 9.2%</span>
              <span className="stat-desc" data-i18n="bento_1_stat_desc">Target form conversion rate</span>
            </div>
            <div className="bento-feature-chips">
              <span className="chip" data-i18n="bento_1_chip_1">✓ 100% Mobile Perfection</span>
              <span className="chip" data-i18n="bento_1_chip_2">✓ Telegram Lead Ping in 15s</span>
              <span className="chip" data-i18n="bento_1_chip_3">✓ Tracking Pixels</span>
            </div>
          </div>
          <a href="/inquiry?service=landing" className="bento-link">
            <span data-i18n="bento_1_link">Configure Landing Page Form</span>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
        <div className="bento-card bento-span-5">
          <div className="bento-card-top">
            <div className="bento-tag-group">
              <span className="bento-badge" data-i18n="bento_2_badge">Paid Acquisition</span>
              <span className="bento-subbadge"><svg className="inline-svg" width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx={12} cy={12} r={10} /><circle cx={12} cy={12} r={6} /><circle cx={12} cy={12} r={2} /></svg> <span data-i18n="bento_2_subbadge">High ROAS</span></span>
            </div>
            <div className="card-icon-wrapper">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={10} /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
            </div>
          </div>
          <h3 className="bento-title" data-i18n="bento_2_title">Targeted Advertising</h3>
          <p className="bento-desc" data-i18n="bento_2_desc">Laser-targeted campaigns in Google Search and Meta (Instagram &amp; Facebook) to reach people actively seeking your services.</p>
          <div className="bento-inner-panel">
            <div className="ad-metric-banner">
              <span className="ad-stat-big">3.8x</span>
              <span className="ad-stat-tag" data-i18n="bento_2_roas">Average Ad ROAS</span>
              <span className="ad-trend-badge"><svg className="inline-svg" width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1={7} y1={17} x2={17} y2={7} /><polyline points="7 7 17 7 17 17" /></svg> <span data-i18n="bento_2_reach">+240% reach</span></span>
            </div>
            <div className="bento-channels-row">
              <span className="channel-pill" data-i18n="bento_2_ch_1">Google Search</span>
              <span className="channel-pill" data-i18n="bento_2_ch_2">Instagram Feed</span>
              <span className="channel-pill" data-i18n="bento_2_ch_3">Meta Ads</span>
            </div>
          </div>
          <a href="/inquiry?service=ads" className="bento-link">
            <span data-i18n="bento_2_link">Configure Advertising Form</span>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
        <div className="bento-card bento-span-5">
          <div className="bento-card-top">
            <div className="bento-tag-group">
              <span className="bento-badge" data-i18n="bento_3_badge">Modernization</span>
              <span className="bento-subbadge"><svg className="inline-svg" width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> <span data-i18n="bento_3_subbadge">Speed Boost</span></span>
            </div>
            <div className="card-icon-wrapper">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>
            </div>
          </div>
          <h3 className="bento-title" data-i18n="bento_3_title">Website Redesign &amp; Overhaul</h3>
          <p className="bento-desc" data-i18n="bento_3_desc">Upgrade slow, outdated websites into crisp modern experiences that look premium and function flawlessly on smartphones.</p>
          <div className="bento-inner-panel">
            <div className="speed-score-widget">
              <div className="score-badge">98<span>/100</span></div>
              <div className="score-info">
                <strong data-i18n="bento_3_score">Google PageSpeed Score</strong>
                <span className="speed-compare">3.8s → <strong data-i18n="bento_3_time">0.9s load time</strong></span>
              </div>
            </div>
            <div className="bento-feature-chips" style={{marginTop: 12}}>
              <span className="chip" data-i18n="bento_3_chip_1">✓ Zero Lost Traffic</span>
              <span className="chip" data-i18n="bento_3_chip_2">✓ Preserved Google SEO</span>
            </div>
          </div>
          <a href="/inquiry?service=redesign" className="bento-link">
            <span data-i18n="bento_3_link">Configure Redesign Form</span>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
        <div className="bento-card bento-span-7">
          <div className="bento-card-top">
            <div className="bento-tag-group">
              <span className="bento-badge" data-i18n="bento_4_badge">Corporate Web</span>
              <span className="bento-subbadge"><svg className="inline-svg" width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x={4} y={2} width={16} height={20} rx={2} /><line x1={9} y1={6} x2={15} y2={6} /><line x1={9} y1={10} x2={15} y2={10} /><line x1={9} y1={14} x2={15} y2={14} /></svg> <span data-i18n="bento_4_subbadge">Multi-Page</span></span>
            </div>
            <div className="card-icon-wrapper">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x={2} y={3} width={20} height={14} rx={2} ry={2} /><line x1={8} y1={21} x2={16} y2={21} /><line x1={12} y1={17} x2={12} y2={21} /></svg>
            </div>
          </div>
          <h3 className="bento-title" data-i18n="bento_4_title">Functional Business Websites</h3>
          <p className="bento-desc" data-i18n="bento_4_desc">Multi-page corporate and service platforms designed to showcase your complete offerings, cases, calculators, and allow your staff to manage content easily.</p>
          <div className="bento-inner-panel">
            <div className="bento-pill-grid">
              <div className="pill-item"><svg className="inline-svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1={16} y1={13} x2={8} y2={13} /><line x1={16} y1={17} x2={8} y2={17} /></svg> <span data-i18n-html="bento_4_pill_1">Structured Services &amp; Pricing</span></div>
              <div className="pill-item"><svg className="inline-svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x={4} y={2} width={16} height={20} rx={2} /><line x1={8} y1={6} x2={16} y2={6} /><line x1={16} y1={14} x2={16} y2={18} /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg> <span data-i18n="bento_4_pill_2">Interactive Quote Calculators</span></div>
              <div className="pill-item"><svg className="inline-svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg> <span data-i18n="bento_4_pill_3">Verified Case Studies Portfolio</span></div>
              <div className="pill-item"><svg className="inline-svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> <span data-i18n="bento_4_pill_4">Easy-to-Manage Admin CMS</span></div>
            </div>
          </div>
          <a href="/inquiry?service=corporate" className="bento-link">
            <span data-i18n="bento_4_link">Configure Business Website Form</span>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
  <section className="cases-section" id="cases">
    <div className="container">
      <div className="section-header">
        <span className="section-tag" data-i18n="case_tag">[ 03 / CASE STUDIES ]</span>
        <h2 className="section-title" data-i18n="case_title">Selected Case Studies</h2>
        <p className="section-desc" data-i18n="case_desc">Practical examples of how our websites and advertising deliver measurable business outcomes.</p>
      </div>
      <div className="cases-grid">
        <article className="case-card">
          <div className="case-visual visual-mockup-wrap">
            <div className="case-badge-overlay">
              <span className="case-category" data-i18n="case_1_cat">Landing Page + Meta Ads</span>
              <span className="case-badge-metric" data-i18n="case_1_metric">-38% Lead Cost</span>
            </div>
            <div className="device-mockup laptop-frame">
              <div className="laptop-camera" />
              <div className="laptop-screen">
                <div className="screen-browser-nav">
                  <div className="nav-dots">
                    <span className="nav-dot red" />
                    <span className="nav-dot yellow" />
                    <span className="nav-dot green" />
                  </div>
                  <span className="nav-url">renovations-pro.com</span>
                </div>
                <div className="screen-content mockup-landing">
                  <div className="mockup-hero-banner">
                    <span className="m-hero-badge"><svg className="inline-svg" width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> Turnkey Reno</span>
                    <h5>Apartment Renovation in 30 Days</h5>
                    <div className="m-hero-btn">Calculate Quote</div>
                  </div>
                  <div className="mockup-lead-bubble">
                    <span className="bubble-icon"><svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg></span>
                    <div className="bubble-info">
                      <strong>New Lead: +1 555...</strong>
                      <span>2-Bed Apt Reno • $8.20 CAC</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="laptop-base" />
            </div>
          </div>
          <div className="case-body">
            <div className="case-meta" data-i18n-html="case_1_meta">
              <span>Timeline: 10 Days</span> • <span>Home Services &amp; Renovation</span>
            </div>
            <h3 className="case-title" data-i18n="case_1_title">High-Converting Service Landing &amp; Instagram Ads</h3>
            <p className="case-challenge" data-i18n-html="case_1_obj"><strong>Objective:</strong> Client needed a fast launch to generate inquiries for apartment renovations before the high season started.</p>
            <div className="case-scope">
              <span className="scope-tag" data-i18n="case_1_tag_1">Responsive Landing</span>
              <span className="scope-tag" data-i18n="case_1_tag_2">Instagram &amp; Facebook Ads</span>
              <span className="scope-tag" data-i18n="case_1_tag_3">Telegram Alert Bot</span>
              <span className="scope-tag" data-i18n="case_1_tag_4">Cost Calculator</span>
            </div>
            <div className="case-metrics-row">
              <div className="metric-box">
                <span className="metric-val">84</span>
                <span className="metric-label" data-i18n="case_1_lbl_1">Inquiries / Mo</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">$8.20</span>
                <span className="metric-label" data-i18n="case_1_lbl_2">Avg. Lead Cost</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">2 min</span>
                <span className="metric-label" data-i18n="case_1_lbl_3">Lead Notification</span>
              </div>
            </div>
            <a href="/inquiry?service=landing" className="btn btn-secondary btn-block">
              <span data-i18n="case_btn_similar">I Want Similar Results</span>
            </a>
          </div>
        </article>
        <article className="case-card">
          <div className="case-visual visual-mockup-wrap">
            <div className="case-badge-overlay">
              <span className="case-category" data-i18n="case_2_cat">Website Redesign</span>
              <span className="case-badge-metric" data-i18n="case_2_metric">+160% Conversions</span>
            </div>
            <div className="dual-devices-wrapper">
              <div className="device-mockup laptop-frame mini-laptop">
                <div className="laptop-camera" />
                <div className="laptop-screen">
                  <div className="screen-browser-nav">
                    <div className="nav-dots"><span /><span /><span /></div>
                    <span className="nav-url">apex-consulting.com</span>
                  </div>
                  <div className="screen-content mockup-b2b">
                    <div className="mockup-b2b-header">
                      <span className="m-logo">APEX.</span>
                      <div className="m-nav-lines"><span /><span /><span /></div>
                    </div>
                    <div className="mockup-b2b-content">
                      <span className="b2b-title">Strategic Advisory</span>
                      <div className="b2b-grid">
                        <div className="b2b-card-mini">Financial</div>
                        <div className="b2b-card-mini">Operations</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="laptop-base" />
              </div>
              <div className="device-mockup phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <div className="phone-badge"><svg className="inline-svg" width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> 98/100</div>
                  <div className="phone-card">
                    <span>Mobile Ready</span>
                    <div className="phone-btn">Consult</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="case-body">
            <div className="case-meta" data-i18n-html="case_2_meta">
              <span>Timeline: 2 Weeks</span> • <span>B2B Consulting Agency</span>
            </div>
            <h3 className="case-title" data-i18n="case_2_title">Complete Redesign of Outdated Corporate Website</h3>
            <p className="case-challenge" data-i18n-html="case_2_obj"><strong>Objective:</strong> Modernize a 7-year-old slow website that was losing traffic on mobile and failing to generate consultation requests.</p>
            <div className="case-scope">
              <span className="scope-tag" data-i18n="case_2_tag_1">Modern UI/UX</span>
              <span className="scope-tag" data-i18n="case_2_tag_2">Mobile Optimization</span>
              <span className="scope-tag" data-i18n="case_2_tag_3">Speed Boost (96 PageSpeed)</span>
              <span className="scope-tag" data-i18n="case_2_tag_4">Smart Quote Forms</span>
            </div>
            <div className="case-metrics-row">
              <div className="metric-box">
                <span className="metric-val">2.6x</span>
                <span className="metric-label" data-i18n="case_2_lbl_1">More Inquiries</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">1.2s</span>
                <span className="metric-label" data-i18n="case_2_lbl_2">Load Time</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">+45%</span>
                <span className="metric-label" data-i18n="case_2_lbl_3">Mobile Engagement</span>
              </div>
            </div>
            <a href="/inquiry?service=redesign" className="btn btn-secondary btn-block">
              <span data-i18n="case_btn_similar">I Want Similar Results</span>
            </a>
          </div>
        </article>
        <article className="case-card">
          <div className="case-visual visual-mockup-wrap">
            <div className="case-badge-overlay">
              <span className="case-category" data-i18n="case_3_cat">Business Site + Google Ads</span>
              <span className="case-badge-metric" data-i18n="case_3_metric">3.9x ROAS</span>
            </div>
            <div className="device-mockup laptop-frame">
              <div className="laptop-camera" />
              <div className="laptop-screen">
                <div className="screen-browser-nav">
                  <div className="nav-dots">
                    <span className="nav-dot red" />
                    <span className="nav-dot yellow" />
                    <span className="nav-dot green" />
                  </div>
                  <span className="nav-url">machinery-fleet.com/catalog</span>
                </div>
                <div className="screen-content mockup-catalog">
                  <div className="mockup-catalog-pills">
                    <span className="cat-pill active">Excavators</span>
                    <span className="cat-pill">Cranes</span>
                    <span className="cat-pill">Dumpers</span>
                  </div>
                  <div className="mockup-catalog-cards">
                    <div className="m-cat-card">
                      <div className="m-cat-tag">CAT 320D</div>
                      <span className="m-cat-price">$240 / day</span>
                    </div>
                    <div className="m-cat-card">
                      <div className="m-cat-tag">Liebherr 50T</div>
                      <span className="m-cat-price">$450 / day</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="laptop-base" />
            </div>
          </div>
          <div className="case-body">
            <div className="case-meta" data-i18n-html="case_3_meta">
              <span>Timeline: 3 Weeks</span> • <span>Logistics &amp; Equipment Rental</span>
            </div>
            <h3 className="case-title" data-i18n="case_3_title">Functional Multi-Page Website &amp; Google Search Campaign</h3>
            <p className="case-challenge" data-i18n-html="case_3_obj"><strong>Objective:</strong> Present machinery fleet, enable online quote requests, and attract warm commercial search traffic.</p>
            <div className="case-scope">
              <span className="scope-tag" data-i18n="case_3_tag_1">Catalog Structure</span>
              <span className="scope-tag" data-i18n="case_3_tag_2">Google Search Ads</span>
              <span className="scope-tag" data-i18n="case_3_tag_3">Analytics Setup</span>
              <span className="scope-tag" data-i18n="case_3_tag_4">Fast Contact Triggers</span>
            </div>
            <div className="case-metrics-row">
              <div className="metric-box">
                <span className="metric-val">112</span>
                <span className="metric-label" data-i18n="case_3_lbl_1">Warm Leads</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">3.9x</span>
                <span className="metric-label" data-i18n="case_3_lbl_2">Ad ROI</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">0</span>
                <span className="metric-label" data-i18n="case_3_lbl_3">Missed Inquiries</span>
              </div>
            </div>
            <a href="/inquiry?service=corporate" className="btn btn-secondary btn-block">
              <span data-i18n="case_btn_similar">I Want Similar Results</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
  <section className="process-section" id="process">
    <div className="container">
      <div className="section-header">
        <span className="section-tag" data-i18n="wf_tag">[ 04 / WORKFLOW ]</span>
        <h2 className="section-title" data-i18n="wf_title">How We Deliver Your Project</h2>
        <p className="section-desc" data-i18n="wf_desc">Clear communication, fast turnarounds, and no complicated corporate bureaucracy.</p>
      </div>
      <div className="workflow-flow-wrapper">
        <div className="workflow-grid">
          <div className="workflow-card">
            <div className="workflow-card-top">
              <span className="workflow-num">01</span>
              <span className="workflow-tag" data-i18n="wf_step_1_tag">Discovery</span>
            </div>
            <div className="workflow-icon-box">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1={8} y1={9} x2={16} y2={9} />
                <line x1={8} y1={13} x2={13} y2={13} />
              </svg>
            </div>
            <h4 data-i18n-html="wf_step_1_title">Brief &amp; Strategy</h4>
            <p data-i18n="wf_step_1_desc">We discuss your goals, audience, and offer to pick the highest-converting format (landing, business site, or ad campaign).</p>
            <div className="workflow-footer">
              <span className="workflow-meta">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span data-i18n="wf_step_1_del">Clear Scope</span>
              </span>
              <span className="workflow-duration" data-i18n="wf_step_1_dur">1–2 Days</span>
            </div>
          </div>
          <div className="workflow-card">
            <div className="workflow-card-top">
              <span className="workflow-num">02</span>
              <span className="workflow-tag" data-i18n="wf_step_2_tag">Roadmap</span>
            </div>
            <div className="workflow-icon-box">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1={16} y1={13} x2={8} y2={13} />
                <line x1={16} y1={17} x2={8} y2={17} />
              </svg>
            </div>
            <h4 data-i18n-html="wf_step_2_title">Fixed Proposal &amp; Structure</h4>
            <p data-i18n="wf_step_2_desc">We establish the page wireframe, key conversion blocks, agreed timeline (typically 1–3 weeks), and a fixed transparent price.</p>
            <div className="workflow-footer">
              <span className="workflow-meta">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span data-i18n="wf_step_2_del">Fixed Terms</span>
              </span>
              <span className="workflow-duration" data-i18n="wf_step_2_dur">1 Day</span>
            </div>
          </div>
          <div className="workflow-card">
            <div className="workflow-card-top">
              <span className="workflow-num">03</span>
              <span className="workflow-tag" data-i18n="wf_step_3_tag">Production</span>
            </div>
            <div className="workflow-icon-box">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x={2} y={3} width={20} height={14} rx={2} />
                <line x1={8} y1={21} x2={16} y2={21} />
                <line x1={12} y1={17} x2={12} y2={21} />
              </svg>
            </div>
            <h4 data-i18n-html="wf_step_3_title">Design &amp; Web Development</h4>
            <p data-i18n="wf_step_3_desc">We design a clean layout, write concise texts, build fast responsive code, and set up instant notifications to your Telegram or Email.</p>
            <div className="workflow-footer">
              <span className="workflow-meta">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span data-i18n="wf_step_3_del">Live Staging</span>
              </span>
              <span className="workflow-duration" data-i18n="wf_step_3_dur">5–10 Days</span>
            </div>
          </div>
          <div className="workflow-card">
            <div className="workflow-card-top">
              <span className="workflow-num">04</span>
              <span className="workflow-tag" data-i18n="wf_step_4_tag">Launch</span>
            </div>
            <div className="workflow-icon-box">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h4 data-i18n-html="wf_step_4_title">Advertising &amp; Go-Live</h4>
            <p data-i18n="wf_step_4_desc">We deploy the website to your domain, configure analytics pixels, and launch targeted Google or Meta ad campaigns to bring traffic.</p>
            <div className="workflow-footer">
              <span className="workflow-meta">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span data-i18n="wf_step_4_del">Traffic Active</span>
              </span>
              <span className="workflow-duration" data-i18n="wf_step_4_dur">2–3 Days</span>
            </div>
          </div>
          <div className="workflow-card">
            <div className="workflow-card-top">
              <span className="workflow-num">05</span>
              <span className="workflow-tag" data-i18n="wf_step_5_tag">Scale</span>
            </div>
            <div className="workflow-icon-box">
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h4 data-i18n-html="wf_step_5_title">Support &amp; Lead Growth</h4>
            <p data-i18n="wf_step_5_desc">We monitor incoming leads, test which headlines and creatives convert best, and make fine adjustments to maximize results.</p>
            <div className="workflow-footer">
              <span className="workflow-meta">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span data-i18n="wf_step_5_del">Continuous ROI</span>
              </span>
              <span className="workflow-duration" data-i18n="wf_step_5_dur">Ongoing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="advantages-section" id="advantages">
    <div className="container">
      <div className="section-header">
        <span className="section-tag" data-i18n="adv_tag">[ 05 / WHY US ]</span>
        <h2 className="section-title" data-i18n="adv_title">Practical, Modern &amp; Focused</h2>
        <p className="section-desc" data-i18n="adv_desc">Direct communication and focus on getting your business real inquiries.</p>
      </div>
      <div className="advantages-grid">
        <div className="advantage-card">
          <div className="adv-icon">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <h3 data-i18n="adv_1_title">Fast Launch (1–3 Weeks)</h3>
          <p data-i18n="adv_1_desc">We don't drag projects out for months. Your landing page or redesign is ready and working in days.</p>
        </div>
        <div className="advantage-card">
          <div className="adv-icon">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={5} y={2} width={14} height={20} rx={2} ry={2} /><line x1={12} y1={18} x2="12.01" y2={18} /></svg>
          </div>
          <h3 data-i18n="adv_2_title">100% Mobile Optimized</h3>
          <p data-i18n="adv_2_desc">Over 75% of your clients browse on phones. Every button, image, and form looks and works flawlessly on mobile.</p>
        </div>
        <div className="advantage-card">
          <div className="adv-icon">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><circle cx={12} cy={12} r={6} /><circle cx={12} cy={12} r={2} /></svg>
          </div>
          <h3 data-i18n="adv_3_title">Conversion-Oriented</h3>
          <p data-i18n="adv_3_desc">Not just pretty visuals. We write clear offers, place strategic buttons, and remove friction to maximize inquiries.</p>
        </div>
        <div className="advantage-card">
          <div className="adv-icon">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          </div>
          <h3 data-i18n="adv_4_title">Instant Lead Alerts</h3>
          <p data-i18n="adv_4_desc">New inquiries go directly to your Telegram or Email in seconds, allowing you to call clients while they are hot.</p>
        </div>
        <div className="advantage-card">
          <div className="adv-icon">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4.5V11c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V6.5L12 2z" /><polyline points="9 12 11 14 15 10" /></svg>
          </div>
          <h3 data-i18n-html="adv_5_title">Clear &amp; Fixed Pricing</h3>
          <p data-i18n="adv_5_desc">You know the exact cost before we start. No unexpected bills or hidden charges along the way.</p>
        </div>
        <div className="advantage-card">
          <div className="adv-icon">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><line x1={8} y1={9} x2={16} y2={9} /><line x1={8} y1={13} x2={13} y2={13} /></svg>
          </div>
          <h3 data-i18n="adv_6_title">Direct Communication</h3>
          <p data-i18n="adv_6_desc">You speak directly with the creators building your site and running your ads, with fast response times.</p>
        </div>
      </div>
    </div>
  </section>
  <section className="inquiry-section" id="inquiry">
    <div className="container">
      <div className="inquiry-container">
        <div className="inquiry-info">
          <span className="section-tag" data-i18n="inq_tag">[ 06 / PROJECT INQUIRY ]</span>
          <h2 className="inquiry-title" data-i18n="inq_title">Let's discuss your project.</h2>
          <p className="inquiry-desc" data-i18n="inq_desc">
            Tell us what you want to create or upgrade. Write freely in your own words — we'll review your task and get back to you with ideas, structure, and a transparent estimate.
          </p>
          <div className="inquiry-guarantees">
            <div className="guarantee-item">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
              <span data-i18n="inq_guar_1">Quick response within 1–2 hours</span>
            </div>
            <div className="guarantee-item">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
              <span data-i18n="inq_guar_2">Transparent quote with no obligations</span>
            </div>
            <div className="guarantee-item">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
              <span data-i18n-html="inq_guar_3">Help with domain, hosting &amp; launch</span>
            </div>
          </div>
          <div className="inquiry-contact-card">
            <h4 data-i18n="inq_direct_title">Prefer direct messaging?</h4>
            <p data-i18n="inq_direct_desc">Send us a quick message directly:</p>
            <div className="direct-contacts">
              <a href="mailto:hello@iistudio.com" className="direct-link">
                <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span>hello@iistudio.com</span>
              </a>
              <a href="https://t.me/ii_studio_lead" target="_blank" rel="noopener" className="direct-link">
                <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                <span>Telegram: @ii_studio_lead</span>
              </a>
            </div>
          </div>
        </div>
        <div className="inquiry-action-card">
          <div className="inquiry-action-header">
            <div className="inquiry-badge-row">
              <span className="action-pill-badge" data-i18n="inq_cta_badge">Online Brief • 2 min</span>
              <span className="live-status-dot"><span className="dot-ping" /> <span data-i18n="inq_feat_1">1–2 hours response time</span></span>
            </div>
            <h3 className="inquiry-action-title" data-i18n="inq_cta_card_title">Calculate Cost or Discuss Project</h3>
            <p className="inquiry-action-desc" data-i18n="inq_cta_card_desc">
              Open our interactive brief, select your service direction, and describe your idea. We'll reply within 1–2 hours with an estimate and plan.
            </p>
          </div>
          <div className="action-topic-group">
            <span className="action-topic-label" data-i18n="form_tab_label">Service direction (optional):</span>
            <div className="action-service-pills">
              <button type="button" className="action-service-pill" data-service="landing">
                <span className="pill-dot" />
                <span data-i18n="tab_landing">Landing Page</span>
              </button>
              <button type="button" className="action-service-pill" data-service="corporate">
                <span className="pill-dot" />
                <span data-i18n="tab_corporate">Business Website</span>
              </button>
              <button type="button" className="action-service-pill" data-service="redesign">
                <span className="pill-dot" />
                <span data-i18n="tab_redesign">Website Redesign</span>
              </button>
              <button type="button" className="action-service-pill" data-service="ads">
                <span className="pill-dot" />
                <span data-i18n="tab_ads">Advertising</span>
              </button>
              <button type="button" className="action-service-pill" data-service="consultation">
                <span className="pill-dot" />
                <span data-i18n="tab_consultation">Consultation</span>
              </button>
              <button type="button" className="action-service-pill" data-service="other">
                <span className="pill-dot" />
                <span data-i18n="tab_other">Other</span>
              </button>
            </div>
          </div>
          <div className="inquiry-action-main">
            <a href="/inquiry" className="btn btn-primary btn-lg btn-block btn-open-page" id="openInquiryPageBtn">
              <span data-i18n="inq_cta_btn">Open Project Brief</span>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </div>
          <div className="inquiry-features-grid">
            <div className="inquiry-feat-item">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" /></svg>
              <span data-i18n="inq_feat_1">1–2 hours response time</span>
            </div>
            <div className="inquiry-feat-item">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1={16} y1={13} x2={8} y2={13} /><line x1={16} y1={17} x2={8} y2={17} /><polyline points="10 9 9 9 8 9" /></svg>
              <span data-i18n="inq_feat_2">Fixed transparent estimate</span>
            </div>
            <div className="inquiry-feat-item">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <span data-i18n="inq_feat_3">Direct contact with creators</span>
            </div>
          </div>
          <div className="inquiry-action-footer">
            <span className="security-note" data-i18n="inq_cta_hint">No spam, no intrusive calls • Free consultation</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <template id="legacyInquiryForm">
      <div className="modal-backdrop" id="inquiryModal" role="dialog" aria-modal="true" aria-labelledby="modalInquiryTitle" aria-hidden="true">
        <div className="modal-card">
          <button type="button" className="modal-close-btn" id="closeModalBtn" aria-label="Close modal">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>
          </button>
          <div className="modal-header">
            <h3 id="modalInquiryTitle" data-i18n-html="form_title">Get in Touch with I&amp;I Studio</h3>
            <p data-i18n="form_desc">Leave your contacts and describe what you have in mind.</p>
          </div>
          <div className="form-topic-group">
            <span className="form-topic-label" data-i18n="form_tab_label">Service direction (optional):</span>
            <div className="service-selector-tabs" id="serviceTabs">
              <button type="button" className="tab-btn active" data-service="landing" data-i18n="tab_landing">Landing Page</button>
              <button type="button" className="tab-btn" data-service="corporate" data-i18n="tab_corporate">Business Website</button>
              <button type="button" className="tab-btn" data-service="redesign" data-i18n="tab_redesign">Website Redesign</button>
              <button type="button" className="tab-btn" data-service="ads" data-i18n="tab_ads">Advertising</button>
              <button type="button" className="tab-btn" data-service="consultation" data-i18n="tab_consultation">Consultation</button>
              <button type="button" className="tab-btn" data-service="other" data-i18n="tab_other">Other</button>
            </div>
          </div>
          <form id="projectForm" className="smart-form">
            <input type="hidden" name="service_type" id="serviceTypeInput" defaultValue="landing" />
            <div className="form-group">
              <label htmlFor="clientName" data-i18n-html="form_name_label">Your Name <span className="req">*</span></label>
              <input type="text" id="clientName" name="client_name" placeholder="Alex" data-i18n-placeholder="form_name_ph" required />
            </div>
            <div className="form-group">
              <label htmlFor="clientContact" data-i18n="form_contact_label">Instagram вашего бизнеса или другие соцсети (необязательно)</label>
              <input type="text" id="clientContact" name="client_contact" placeholder="Instagram вашого бізнесу (необов'язково)" data-i18n-placeholder="form_contact_ph" />
            </div>
            <div className="form-group">
              <label htmlFor="clientBudget" data-i18n="form_budget_label">Предлагаемая сумма оплаты / бюджет (опционально)</label>
              <input type="text" id="clientBudget" name="client_budget" placeholder="Например: $500, $1,000, 20 000 ₴ или ваш вариант" data-i18n-placeholder="form_budget_ph" />
            </div>
            <div className="form-group">
              <label htmlFor="projectComment" data-i18n-html="form_comment_label">Tell us about your project or task <span className="req">*</span></label>
              <textarea id="projectComment" name="project_comment" rows={3} placeholder="Write in your own words: what your company does, what you want to achieve (launch a landing, redesign an existing site, or start ads), any reference links, questions, or your approximate budget. We'll reply quickly with a concrete proposal." data-i18n-placeholder="form_comment_ph" required defaultValue={""} />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-submit" id="submitBtn">
              <span data-i18n="form_btn_submit">Send Request</span>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={22} y1={2} x2={11} y2={13} /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </form>
          <div className="form-feedback-overlay" id="feedbackOverlay">
            <div className="feedback-card">
              <div className="feedback-icon">
                <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h3 data-i18n="feedback_title">Thank you! Inquiry Received.</h3>
              <p className="feedback-msg" data-i18n="feedback_msg">We have registered your request and will contact you shortly.</p>
              <div className="ticket-box">
                <span className="ticket-label" data-i18n="feedback_ticket_lbl">Inquiry ID</span>
                <span className="ticket-number" id="ticketNumberDisplay">#II-8924</span>
              </div>
              <div className="automated-actions-list">
                <div className="action-step done">
                  <span className="step-icon">✓</span>
                  <span><span data-i18n="feedback_step_1">Category:</span> <strong id="assignedService">Landing Page Development</strong></span>
                </div>
                <div className="action-step done" id="feedbackBudgetRow" style={{display: 'none'}}>
                  <span className="step-icon">✓</span>
                  <span><span data-i18n="feedback_budget_lbl">Budget:</span> <strong id="assignedBudget" /></span>
                </div>
                <div className="action-step done">
                  <span className="step-icon">✓</span>
                  <span data-i18n="feedback_step_2">Instant notification dispatched to manager</span>
                </div>
                <div className="action-step done">
                  <span className="step-icon">✓</span>
                  <span data-i18n="feedback_step_3">Estimated reply time: within 1–2 hours</span>
                </div>
              </div>
              <p className="feedback-note" data-i18n="feedback_note">We'll review your requirements and message you with an estimate and suggestions.</p>
              <button className="btn btn-secondary btn-block" id="closeFeedbackBtn" data-i18n="feedback_btn_close">Close</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  <footer className="site-footer" id="contact">
    <div className="container footer-container">
      <div className="footer-brand">
        <a href="#hero" className="logo">
          <span className="logo-symbol">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <rect x={2} y={2} width={20} height={20} rx={6} fill="#09090b" />
              <path d="M7 7V17M17 7V17M10.5 13.5C11.2 12.8 12.8 11.2 13.5 10.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
              <circle cx={12} cy={12} r="1.5" fill="#ffffff" />
            </svg>
          </span>
          <span className="logo-text">I&amp;I<span className="logo-sub">Studio</span></span>
        </a>
        <p className="footer-tagline" data-i18n="footer_tagline">
          Creating modern landing pages, functional business websites, clean redesigns, and high-impact advertising campaigns.
        </p>
      </div>
      <div className="footer-links-col">
        <h4 data-i18n="footer_col_nav">Navigation</h4>
        <ul>
          <li><a href="#hero" data-i18n="nav_home">Main</a></li>
          <li><a href="#services" data-i18n="nav_services">Services</a></li>
          <li><a href="#solutions" data-i18n="nav_solutions">Solutions</a></li>
          <li><a href="#cases" data-i18n="nav_cases">Case Studies</a></li>
          <li><a href="#process" data-i18n="nav_process">How We Work</a></li>
          <li><a href="#advantages" data-i18n="nav_about">Why Us</a></li>
        </ul>
      </div>
      <div className="footer-links-col">
        <h4 data-i18n="footer_col_services">Services</h4>
        <ul>
          <li><a href="/inquiry?service=landing" data-i18n="tab_landing">Landing Pages</a></li>
          <li><a href="/inquiry?service=corporate" data-i18n="tab_corporate">Functional Websites</a></li>
          <li><a href="/inquiry?service=redesign" data-i18n="tab_redesign">Website Redesign</a></li>
          <li><a href="/inquiry?service=ads" data-i18n="tab_ads">Targeted Advertising</a></li>
        </ul>
      </div>
      <div className="footer-links-col">
        <h4 data-i18n="footer_col_contact">Direct Contact</h4>
        <ul>
          <li><a href="mailto:hello@iistudio.com">hello@iistudio.com</a></li>
          <li><a href="tel:+15550192834">+1 (555) 019-2834</a></li>
          <li><a href="https://t.me/ii_studio_lead" target="_blank" rel="noopener">Telegram: @ii_studio_lead</a></li>
          <li><span className="hours-badge" data-i18n="footer_hours">Mon - Sat: 09:00 - 20:00</span></li>
        </ul>
      </div>
    </div>
    <div className="container footer-bottom">
      <p data-i18n-html="footer_copy">© 2026 I&amp;I Studio. Designed to bring real clients to your business.</p>
      <div className="footer-sublinks">
        <a href="/inquiry" data-i18n="footer_consult">Quick Consultation</a>
        <a href="/inquiry" data-i18n="footer_discuss">Discuss Project</a>
      </div>
    </div>
  </footer></div>

  );
}
