export default function InquiryMarkup({
  activeService,
  onServiceChange,
  isAuthenticated = false,
  inquirySubmitted = false,
  inquiryTicket = '#II-0000',
  inquiryServiceLabel = 'Landing Page',
  inquiryBudget = '',
}) {
  return (
<div className="react-page-root"><header className="site-header">
    <div className="container header-container">
      <a href="/#hero" className="logo">
        <span className="logo-symbol"><svg width={24} height={24} viewBox="0 0 24 24" fill="none"><rect x={2} y={2} width={20} height={20} rx={6} fill="#09090b" /><path d="M7 7V17M17 7V17M10.5 13.5C11.2 12.8 12.8 11.2 13.5 10.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" /><circle cx={12} cy={12} r="1.5" fill="#ffffff" /></svg></span>
        <span className="logo-text">I&amp;I<span className="logo-sub">Studio</span></span>
      </a>
      <nav className="nav-menu" id="navMenu">
        <a href="/#hero" className="nav-link" data-i18n="nav_home">Home</a>
        <a href="/#solutions" className="nav-link" data-i18n="nav_solutions">Solutions</a>
        <a href="/#services" className="nav-link" data-i18n="nav_services">Services</a>
        <a href="/#cases" className="nav-link" data-i18n="nav_cases">Cases</a>
        <a href="/#process" className="nav-link" data-i18n="nav_process">How We Work</a>
        <a href="/#advantages" className="nav-link" data-i18n="nav_about">About</a>
        <a href="/#contact" className="nav-link" data-i18n="nav_contact">Contact</a>
        <div className="language-switcher mobile-language-switcher" aria-label="Language selection">
          <button type="button" className="language-trigger" aria-haspopup="listbox" aria-expanded="false"><span className="language-current">EN</span><svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
          <div className="language-menu" role="listbox" aria-label="Available languages"><button type="button" className="language-option active" data-language="en" role="option" aria-selected="true">English <span>EN</span></button><button type="button" className="language-option" data-language="uk" role="option" aria-selected="false">Українська <span>UK</span></button><button type="button" className="language-option" data-language="ro" role="option" aria-selected="false">Română <span>RO</span></button></div>
        </div>
      </nav>
      <div className="header-actions">
        <a href="/account" className="account-header-link" aria-label="Account" title="Account">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx={12} cy={8} r="3.2" /><path d="M5.5 20c.8-3.2 3.1-5 6.5-5s5.7 1.8 6.5 5" /></svg>
        </a>
        <button type="button" id="themeToggle" className="theme-toggle" aria-label="Toggle theme"><svg className="theme-icon theme-icon-sun" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4" /></svg><svg className="theme-icon theme-icon-moon" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg></button>
        <div className="language-switcher" aria-label="Language selection">
          <button type="button" className="language-trigger" aria-haspopup="listbox" aria-expanded="false"><span className="language-current">EN</span><svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
          <div className="language-menu" role="listbox" aria-label="Available languages"><button type="button" className="language-option active" data-language="en" role="option" aria-selected="true">English <span>EN</span></button><button type="button" className="language-option" data-language="uk" role="option" aria-selected="false">Українська <span>UK</span></button><button type="button" className="language-option" data-language="ro" role="option" aria-selected="false">Română <span>RO</span></button></div>
        </div>
        <button className="mobile-toggle" id="mobileToggle" aria-label="Toggle menu"><span /><span /><span /></button>
      </div>
    </div>
  </header>
  <main className="inquiry-form-only">
    <section className="inquiry-form-card inquiry-form-only-card" aria-labelledby="inquiryPageTitle">
      <div className="inquiry-form-header">
        <div>
          <span className="form-eyebrow" data-i18n="inquiry_eyebrow">[ PROJECT BRIEF / 2 MIN ]</span>
          <h1 id="inquiryPageTitle" data-i18n-html="form_title">Get in Touch with I&amp;I Studio</h1>
          <p data-i18n="form_desc">Leave your contacts and describe what you have in mind.</p>
        </div>
      </div>
      <div className="service-selector-tabs" id="serviceTabs">
        <button type="button" className={activeService === 'landing' ? 'tab-btn active' : 'tab-btn'} data-service="landing" data-i18n="tab_landing" onClick={() => onServiceChange('landing')}>Landing Page</button>
        <button type="button" className={activeService === 'corporate' ? 'tab-btn active' : 'tab-btn'} data-service="corporate" data-i18n="tab_corporate" onClick={() => onServiceChange('corporate')}>Business Website</button>
        <button type="button" className={activeService === 'redesign' ? 'tab-btn active' : 'tab-btn'} data-service="redesign" data-i18n="tab_redesign" onClick={() => onServiceChange('redesign')}>Website Redesign</button>
        <button type="button" className={activeService === 'ads' ? 'tab-btn active' : 'tab-btn'} data-service="ads" data-i18n="tab_ads" onClick={() => onServiceChange('ads')}>Advertising</button>
        <button type="button" className={activeService === 'consultation' ? 'tab-btn active' : 'tab-btn'} data-service="consultation" data-i18n="tab_consultation" onClick={() => onServiceChange('consultation')}>Consultation</button>
        <button type="button" className={activeService === 'other' ? 'tab-btn active' : 'tab-btn'} data-service="other" data-i18n="tab_other" onClick={() => onServiceChange('other')}>Other</button>
      </div>
      <form id="projectForm" className="smart-form" action="/inquiry" method="post" data-authenticated={isAuthenticated ? 'true' : 'false'}>
        <input type="hidden" name="service_type" id="serviceTypeInput" defaultValue={activeService} />
        <div className="form-grid-2 inquiry-form-grid">
          <div className="form-group"><label htmlFor="clientName" data-i18n-html="form_name_label">Your Name <span className="req">*</span></label><input type="text" id="clientName" name="client_name" placeholder="Alex" data-i18n-placeholder="form_name_ph" required /></div>
          <div className="form-group"><label htmlFor="clientContact" data-i18n="form_contact_label">Your business Instagram or social media (optional)</label><input type="text" id="clientContact" name="client_contact" placeholder="Instagram, Telegram or social handle (optional)" data-i18n-placeholder="form_contact_ph" /></div>
        </div>
        <div className="form-group"><label htmlFor="clientBudget" data-i18n="form_budget_label">Proposed budget / payment amount (optional)</label><input type="text" id="clientBudget" name="client_budget" placeholder="e.g. $500, $1,000, 20,000 ₴ or your offer" data-i18n-placeholder="form_budget_ph" /></div>
        <div className="form-group project-comment-group"><label htmlFor="projectComment" data-i18n-html="form_comment_label">Tell us about your project or task <span className="req">*</span></label><textarea id="projectComment" name="project_comment" rows={14} placeholder="Write in your own words: what your company does, what you want to achieve, any reference links, questions, or your approximate budget. We'll reply quickly with a concrete proposal." data-i18n-placeholder="form_comment_ph" required defaultValue={""} /></div>
        <p className="inquiry-form-note" data-i18n="inquiry_form_note">We usually reply within 1–2 hours during working hours.</p>
        <button type="submit" className="btn btn-primary btn-block btn-submit" id="submitBtn"><span data-i18n="form_btn_submit">Send Request</span><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={22} y1={2} x2={11} y2={13} /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></button>
      </form>
      <div className={`form-feedback-overlay${inquirySubmitted ? ' active' : ''}`} id="feedbackOverlay">
        <div className="feedback-card">
          <div className="feedback-icon"><svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
          <h2 data-i18n="feedback_title">Thank you! Inquiry Received.</h2>
          <p className="feedback-msg" data-i18n="feedback_msg">We have registered your request and will contact you shortly.</p>
          <div className="ticket-box"><span className="ticket-label" data-i18n="feedback_ticket_lbl">Inquiry ID</span><span className="ticket-number" id="ticketNumberDisplay">{inquiryTicket}</span></div>
          <div className="automated-actions-list"><div className="action-step done"><span className="step-icon">✓</span><span><span data-i18n="feedback_step_1">Category:</span> <strong id="assignedService">{inquiryServiceLabel}</strong></span></div><div className="action-step done" id="feedbackBudgetRow" style={{display: inquiryBudget ? 'flex' : 'none'}}><span className="step-icon">✓</span><span><span data-i18n="feedback_budget_lbl">Budget:</span> <strong id="assignedBudget">{inquiryBudget}</strong></span></div><div className="action-step done"><span className="step-icon">✓</span><span data-i18n="feedback_step_2">Instant notification dispatched to manager</span></div><div className="action-step done"><span className="step-icon">✓</span><span data-i18n="feedback_step_3">Estimated reply time: within 1–2 hours</span></div></div>
          <p className="feedback-note" data-i18n="feedback_note">We'll review your requirements and message you with an estimate and suggestions.</p>
          <button className="btn btn-secondary btn-block" id="closeFeedbackBtn" data-i18n="feedback_btn_close">Close</button>
        </div>
      </div>
    </section>
  </main></div>

  );
}
