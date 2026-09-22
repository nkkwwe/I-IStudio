import ChatUnreadBadge from '../Components/ChatUnreadBadge';

const serviceGoals = [
  { key: 'landing', label: 'goal_landing', number: '01' },
  { key: 'functional-site', label: 'goal_business', number: '02' },
  { key: 'redesign', label: 'goal_redesign', number: '03' },
  { key: 'ads', label: 'goal_ads', number: '04' },
  { key: 'full-pack', label: 'goal_bundle', number: '05' },
];

const cases = [
  { key: '1', category: 'ecommerce', metric: '-38%', metricKey: 'case_1_metric', className: 'case-visual-ecommerce' },
  { key: '2', category: 'business', metric: '2.6x', metricKey: 'case_2_metric', className: 'case-visual-business' },
  { key: '3', category: 'advertising', metric: '3.9x', metricKey: 'case_3_metric', className: 'case-visual-ads' },
];

const workflowSteps = [
  { number: '01', tag: 'wf_step_1_tag', title: 'wf_step_1_title', desc: 'wf_step_1_desc', duration: 'wf_step_1_dur', icon: 'search' },
  { number: '02', tag: 'wf_step_2_tag', title: 'wf_step_2_title', desc: 'wf_step_2_desc', duration: 'wf_step_2_dur', icon: 'map' },
  { number: '03', tag: 'wf_step_3_tag', title: 'wf_step_3_title', desc: 'wf_step_3_desc', duration: 'wf_step_3_dur', icon: 'layers' },
  { number: '04', tag: 'wf_step_4_tag', title: 'wf_step_4_title', desc: 'wf_step_4_desc', duration: 'wf_step_4_dur', icon: 'rocket' },
  { number: '05', tag: 'wf_step_5_tag', title: 'wf_step_5_title', desc: 'wf_step_5_desc', duration: 'wf_step_5_dur', icon: 'chart' },
];

const advantages = [
  { number: '01', title: 'adv_1_title', desc: 'adv_1_desc', icon: 'target' },
  { number: '02', title: 'adv_2_title', desc: 'adv_2_desc', icon: 'bolt' },
  { number: '03', title: 'adv_3_title', desc: 'adv_3_desc', icon: 'message' },
  { number: '04', title: 'adv_4_title', desc: 'adv_4_desc', icon: 'code' },
  { number: '05', title: 'adv_5_title', desc: 'adv_5_desc', icon: 'shield' },
  { number: '06', title: 'adv_6_title', desc: 'adv_6_desc', icon: 'spark' },
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  const paths = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    map: <><path d="M4 5.5 9 3l6 3 5-2.5v15L15 21l-6-3-5 2.5z" /><path d="M9 3v15M15 6v15" /></>,
    layers: <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></>,
    rocket: <><path d="M14.5 4.5c2.4-2.4 5.2-2.2 5.2-2.2s.2 2.8-2.2 5.2l-5.2 5.2-3.8-3.8z" /><path d="m8.5 8.5-4 1 .1 3.4 3.4.1M15.5 15.5l-1 4-3.4-.1-.1-3.4" /><path d="M5 19c1.2.3 2.1-.6 2.4-1.8M5 19c-.3-1.2.6-2.1 1.8-2.4" /></>,
    chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 3-4 3 2 5-6" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
    bolt: <path d="m13 2-8 12h6l-1 8 8-12h-6z" />,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3-.6L4 20l1.6-4.2A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" /></>,
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>,
    shield: <path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z" />,
    spark: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6z" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

function Logo({ href = '#hero' }) {
  return (
    <a href={href} className="logo">
      <span className="logo-symbol">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x={2} y={2} width={20} height={20} rx={6} fill="#09090b" />
          <path d="M7 7V17M17 7V17M10.5 13.5C11.2 12.8 12.8 11.2 13.5 10.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
          <circle cx={12} cy={12} r="1.5" fill="#ffffff" />
        </svg>
      </span>
      <span className="logo-text">I&amp;I<span className="logo-sub">Studio</span></span>
    </a>
  );
}

function LanguageSwitcher({ mobile = false }) {
  return (
    <div className={'language-switcher' + (mobile ? ' mobile-language-switcher' : '')} data-i18n-aria-label="aria_languages" aria-label="Language selection">
      <button type="button" className="language-trigger" aria-haspopup="listbox" aria-expanded="false">
        <span className="language-current">EN</span>
        <svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <div className="language-menu" role="listbox" data-i18n-aria-label="aria_languages" aria-label="Available languages">
        <button type="button" className="language-option active" data-language="en" role="option" aria-selected="true">English <span>EN</span></button>
        <button type="button" className="language-option" data-language="uk" role="option" aria-selected="false">Українська <span>UK</span></button>
        <button type="button" className="language-option" data-language="ro" role="option" aria-selected="false">Română <span>RO</span></button>
      </div>
    </div>
  );
}

function Header({ isAuthenticated, signInLabel, unreadChatCount }) {
  return (
    <header className="site-header">
      <div className="container header-container">
        <Logo />
        <nav className="nav-menu" id="navMenu">
          <a href="#hero" className="nav-link" data-i18n="nav_home">Main</a>
          <a href="#services" className="nav-link" data-i18n="nav_services">Services</a>
          <a href="#cases" className="nav-link" data-i18n="nav_cases">Cases</a>
          <a href="#process" className="nav-link" data-i18n="nav_process">How We Work</a>
          <a href="#advantages" className="nav-link" data-i18n="nav_about">About</a>
          <a href="#contact" className="nav-link" data-i18n="nav_contact">Contact</a>
          <LanguageSwitcher mobile />
        </nav>
        <div className="header-actions">
          {isAuthenticated ? (
            <a href="/account" className="account-header-link" data-i18n-aria-label="aria_account" data-i18n-title="aria_account" aria-label="Account" title="Account">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx={12} cy={8} r="3.2" /><path d="M5.5 20c.8-3.2 3.1-5 6.5-5s5.7 1.8 6.5 5" /></svg>
              <ChatUnreadBadge count={unreadChatCount} />
            </a>
          ) : (
            <a href="/login" className="account-header-link account-sign-in-link" aria-label={signInLabel} title={signInLabel}>{signInLabel}</a>
          )}
          <button type="button" id="themeToggle" className="theme-toggle" data-i18n-aria-label="aria_theme" aria-label="Toggle theme">
            <svg className="theme-icon theme-icon-sun" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4" /></svg>
            <svg className="theme-icon theme-icon-moon" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg>
          </button>
          <LanguageSwitcher />
          <button className="mobile-toggle" id="mobileToggle" data-i18n-aria-label="aria_menu" aria-label="Toggle menu"><span /><span /><span /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        <div className="hero-badge"><span className="hero-badge-dot" /><span data-i18n="hero_badge">Websites • Redesign • Targeted Advertising</span></div>
        <h1 className="hero-title" data-i18n-html="hero_title">Digital systems that <span className="text-gradient">move business forward.</span></h1>
        <p className="hero-subtitle" data-i18n="hero_subtitle">We build focused websites and acquisition systems for companies ready to grow.</p>
        <div className="hero-cta-group">
          <a href="#inquiry" className="btn btn-primary" data-scroll-to-inquiry><span data-i18n="hero_btn_discuss">Discuss Project</span><Icon name="arrow" size={18} /></a>
          <a href="#services" className="btn btn-secondary"><span data-i18n="hero_btn_explore">Explore Services</span><Icon name="arrow" size={18} /></a>
        </div>
        <div className="hero-trust-bar">
          <div className="trust-pill"><Icon name="check" size={14} /><span data-i18n="hero_trust_1">5–7 Days Typical Launch</span></div>
          <div className="trust-pill"><Icon name="check" size={14} /><span data-i18n="hero_trust_2">15s Lead Alerts to Telegram</span></div>
          <div className="trust-pill"><Icon name="check" size={14} /><span data-i18n="hero_trust_3">100% Mobile Optimized</span></div>
          <div className="trust-pill"><Icon name="check" size={14} /><span data-i18n-html="hero_trust_4">Fixed Pricing &amp; Direct Contact</span></div>
        </div>
      </div>
    </section>
  );
}

function ServicesAndSolutions() {
  return (
    <section className="solutions-section service-solutions-section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="sol_tag">[ 01 / SERVICES &amp; SOLUTIONS ]</span>
          <h2 className="section-title" data-i18n-html="sol_title">Choose the right <span className="text-gradient">solution</span> for your goal</h2>
          <p className="section-desc" data-i18n="sol_desc">Select a direction to see what is included, how long it takes, and what result to expect.</p>
        </div>
        <div className="goals-pills-wrapper" id="goalSelector">
          {serviceGoals.map((goal) => (
            <button type="button" className={'goal-pill' + (goal.key === 'landing' ? ' active' : '')} data-goal={goal.key} aria-pressed={goal.key === 'landing'} key={goal.key}>
              <span className="goal-pill-number">{goal.number}</span>
              <span data-i18n={goal.label}>Landing Page</span>
              <Icon name="arrow" size={16} />
            </button>
          ))}
        </div>
        <div className="solution-output-card" id="solutionOutput" aria-live="polite" />
      </div>
    </section>
  );
}

function CaseVisual({ item }) {
  return (
    <div className={'visual-mockup-wrap ' + item.className}>
      <div className="case-metric-overlay">
        <strong>{item.metric}</strong>
        <span data-i18n={item.metricKey + '_label'}>Lead Cost</span>
      </div>
      <div className={'case-visual-window case-device-' + item.key}>
        <div className="case-window-bar"><span /><span /><span /></div>
        <div className="case-window-content">
          <div className="case-window-line case-window-line-long" />
          <div className="case-window-line" />
          <div className="case-window-blocks"><span /><span /><span /></div>
          <div className="case-window-chart"><i /><i /><i /><i /><i /></div>
        </div>
      </div>
      {item.key === '1' && <span className="case-device-base" aria-hidden="true" />}
    </div>
  );
}

function CaseStudies() {
  return (
    <section className="cases-section" id="cases">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="case_tag">[ 02 / CASE STUDIES ]</span>
          <h2 className="section-title" data-i18n-html="case_title">Work that creates <span className="text-gradient">momentum.</span></h2>
          <p className="section-desc" data-i18n="case_desc">Selected projects, measured by the business outcomes they helped create.</p>
        </div>
        <div className="cases-grid">
          {cases.map((item) => (
            <article className="case-card case-card-compact" key={item.key}>
              <CaseVisual item={item} />
              <div className="case-body">
                <div className="case-meta">
                  <span data-i18n={'case_' + item.key + '_cat'}>E-commerce</span>
                  <span data-i18n-html={'case_' + item.key + '_meta'}>Website / 2024</span>
                </div>
                <h3 data-i18n-html={'case_' + item.key + '_title'}>Performance-led digital experience</h3>
                <p className="case-summary" data-i18n-html={'case_' + item.key + '_obj'}>A focused redesign aligned the experience with the customer journey and made the next step obvious.</p>
                <div className="case-metrics-row">
                  <div className="case-metric"><strong>{item.metric}</strong><span data-i18n={item.metricKey + '_label'}>Lead Cost</span></div>
                  <div className="case-metric"><strong data-i18n={'case_' + item.key + '_metric2_val'}>+42%</strong><span data-i18n={'case_' + item.key + '_metric2'}>Conversion Rate</span></div>
                </div>
                <a href="#inquiry" className="case-link" data-scroll-to-inquiry><span data-i18n="case_btn_similar">Discuss a similar project</span><Icon name="arrow" size={16} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="workflow-section" id="process">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="wf_tag">[ 03 / WORKFLOW ]</span>
          <h2 className="section-title" data-i18n-html="wf_title">From first idea to <span className="text-gradient">measurable result.</span></h2>
          <p className="section-desc" data-i18n="wf_desc">A clear five-step process keeps decisions focused, feedback fast, and progress visible.</p>
        </div>
        <div className="workflow-flow-wrapper">
          <div className="workflow-grid">
            {workflowSteps.map((step) => (
              <article className="workflow-card" key={step.number}>
                <div className="workflow-card-top"><span className="workflow-num">{step.number}</span><span className="workflow-tag" data-i18n={step.tag}>Discovery</span></div>
                <div className="workflow-icon-box"><Icon name={step.icon} size={24} /></div>
                <h3 data-i18n={step.title}>Clear next step</h3>
                <p data-i18n={step.desc}>We align the work around the next decision and the result it should unlock.</p>
                <div className="workflow-footer"><span className="workflow-meta"><Icon name="arrow" size={14} /><span data-i18n="wf_duration_label">Duration</span></span><span className="workflow-duration" data-i18n={step.duration}>1–2 Days</span></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section className="advantages-section" id="advantages">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="adv_tag">[ 04 / WHY US ]</span>
          <h2 className="section-title" data-i18n-html="adv_title">Small team. <span className="text-gradient">High ownership.</span></h2>
          <p className="section-desc" data-i18n="adv_desc">Senior attention from the first conversation to the first measurable outcome.</p>
        </div>
        <div className="advantages-grid">
          {advantages.map((item) => (
            <article className="advantage-card" key={item.number}>
              <div className="advantage-card-top"><span className="advantage-num">{item.number}</span><span className="advantage-icon"><Icon name={item.icon} size={20} /></span></div>
              <h3 data-i18n={item.title}>Clear thinking</h3>
              <p data-i18n={item.desc}>Every decision has a reason, a priority, and a visible effect on the user journey.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inquiry() {
  return (
    <section className="inquiry-section" id="inquiry">
      <div className="container inquiry-container">
        <div className="inquiry-copy">
          <span className="section-tag" data-i18n="inq_tag">[ 05 / PROJECT INQUIRY ]</span>
          <h2 className="section-title" data-i18n-html="inq_title">Have a project <span className="text-gradient">in mind?</span></h2>
          <p className="section-desc" data-i18n="inq_desc">Tell us what you want to improve. We will reply with a focused next step and a realistic estimate.</p>
          <div className="inquiry-contact-list">
            <a href="https://t.me/" className="inquiry-contact-item"><span className="inquiry-contact-icon">↗</span><span><small data-i18n="inq_contact_telegram_label">Telegram</small><strong data-i18n="inq_contact_telegram_value">@iandistudio</strong></span></a>
            <a href="mailto:hello@iandistudio.com" className="inquiry-contact-item"><span className="inquiry-contact-icon">@</span><span><small data-i18n="inq_contact_email_label">Email</small><strong>hello@iandistudio.com</strong></span></a>
          </div>
        </div>
        <div className="inquiry-cta-card">
          <div className="inquiry-cta-icon"><Icon name="arrow" size={22} /></div>
          <h3 data-i18n="inq_cta_card_title">Let’s make it clear.</h3>
          <p data-i18n="inq_cta_card_desc">Choose a direction and send a short brief. No long forms, no pressure.</p>
          <div className="action-service-pills" id="serviceTabs">
            <button type="button" className="action-service-pill active" data-service="landing" aria-pressed="true" data-i18n="tab_landing">Landing Page</button>
            <button type="button" className="action-service-pill" data-service="corporate" aria-pressed="false" data-i18n="tab_corporate">Business Website</button>
            <button type="button" className="action-service-pill" data-service="redesign" aria-pressed="false" data-i18n="tab_redesign">Website Redesign</button>
            <button type="button" className="action-service-pill" data-service="ads" aria-pressed="false" data-i18n="tab_ads">Advertising</button>
          </div>
          <button type="button" className="btn btn-primary btn-block" id="openInquiryPageBtn"><span data-i18n="inq_cta_btn">Start a conversation</span><Icon name="arrow" size={18} /></button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-container">
        <div className="footer-top"><Logo /><p data-i18n="footer_desc">Focused digital systems for modern businesses.</p></div>
        <div className="footer-bottom">
          <span data-i18n="footer_copy">© 2024 I&amp;I Studio. All rights reserved.</span>
          <nav className="footer-nav">
            <a href="#hero" data-i18n="nav_home">Main</a>
            <a href="#services" data-i18n="nav_services">Services</a>
            <a href="#cases" data-i18n="nav_cases">Cases</a>
            <a href="#inquiry" data-i18n="nav_contact">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function HomeMarkup({ isAuthenticated = false, signInLabel = 'Sign in', unreadChatCount = 0 }) {
  return (
    <div className="react-page-root">
      <Header isAuthenticated={isAuthenticated} signInLabel={signInLabel} unreadChatCount={unreadChatCount} />
      <main>
        <Hero />
        <ServicesAndSolutions />
        <CaseStudies />
        <Process />
        <Advantages />
        <Inquiry />
      </main>
      <Footer />
    </div>
  );
}
