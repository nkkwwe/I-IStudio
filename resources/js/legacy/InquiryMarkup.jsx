import AccountSiteHeader from '../Components/AccountSiteHeader';
import GoogleAdsBrief from '../Components/GoogleAdsBrief';
import MetaAdsBrief from '../Components/MetaAdsBrief';
import calculatorCopy from '../content/inquiryCalculatorCopy';
import { getMetaAdsCopy } from '../content/metaAdsBrief';
import { localizedUrl } from '../content/siteLanguage';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';

function formatPrice(value, language) {
  const locale = language === 'uk' ? 'uk-UA' : language === 'ro' ? 'ro-RO' : 'en-US';

  return `$${new Intl.NumberFormat(locale).format(value)}`;
}

function OptionCard({ checked, name, value, label, description, price, included, onChange, type = 'radio' }) {
  return (
    <label className={`calculator-option${checked ? ' selected' : ''}`}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span className="calculator-option-mark" aria-hidden="true">{checked ? '✓' : ''}</span>
      <span className="calculator-option-copy">
        <strong>{label}</strong>
        <span>{description}</span>
      </span>
      <span className="calculator-option-price">{price === null ? included : price ? `+ $${price}` : included}</span>
    </label>
  );
}

export default function InquiryMarkup({
  activeService,
  onServiceChange,
  language = 'en',
  isAuthenticated = false,
  userName = '',
  inquirySubmitted = false,
  inquiryTicket = '#II-0000',
  inquiryServiceLabel = 'Landing Page',
  inquiryBudget = '',
  signInLabel = 'Sign in',
  unreadChatCount = 0,
  isDark = false,
  onToggleTheme,
  errors = {},
}) {
  const copy = calculatorCopy[language] || calculatorCopy.en;
  const isMetaAds = activeService === 'meta-ads';
  const isAds = activeService === 'ads' || isMetaAds;
  const metaCopy = getMetaAdsCopy(language);
  const service = copy.services[activeService] || copy.services.other;
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorStep, setCalculatorStep] = useState(1);
  const [scopeChoice, setScopeChoice] = useState(service.scope[0].value);
  const [extras, setExtras] = useState({});

  useEffect(() => {
    // Keep the selected direction visible inside the horizontal mobile selector.
    const tabs = document.getElementById('serviceTabs');
    const activeTab = tabs?.querySelector('.active');
    if (tabs && activeTab && tabs.scrollWidth > tabs.clientWidth) {
      tabs.scrollLeft = activeTab.offsetLeft - tabs.offsetLeft;
    }
  }, [activeService]);

  useEffect(() => {
    setCalculatorOpen(false);
    setCalculatorStep(1);
    setScopeChoice(service.scope[0].value);
    setExtras({});
  }, [activeService]);

  useEffect(() => {
    if (!calculatorOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') setCalculatorOpen(false);
    };

    document.body.classList.add('calculator-modal-open');
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('calculator-modal-open');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [calculatorOpen]);

  const selectedOptions = useMemo(() => {
    const selected = [
      { label: service.base, price: service.basePrice },
      { label: service.scope.find((option) => option.value === scopeChoice)?.label ?? service.scope[0].label, price: service.scope.find((option) => option.value === scopeChoice)?.price ?? 0 },
    ];

    service.extras.forEach((option) => {
      if (extras[option.value]) selected.push({ label: option.label, price: option.price });
    });

    return selected;
  }, [service, scopeChoice, extras]);
  const isCustomEstimate = service.basePrice === null;
  const total = selectedOptions.reduce((sum, option) => sum + (option.price ?? 0), 0);
  const totalDisplay = isCustomEstimate ? copy.customEstimate : formatPrice(total, language);
  const calculatorSummary = [
    `${copy.serviceBase}: ${copy.serviceNames[activeService] ?? activeService}`,
    ...selectedOptions.map((option) => `${option.label}: ${option.price === null ? copy.customPrice : formatPrice(option.price, language)}`),
    `${copy.estimate}: ${totalDisplay}`,
  ].join('\n');
  const toggleExtra = (key) => setExtras((current) => ({ ...current, [key]: !current[key] }));

  return (
    <div className="react-page-root">
      <AccountSiteHeader
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        showProfile={true}
        isAuthenticated={isAuthenticated}
        userInitial={userName?.trim()?.charAt(0)?.toLocaleUpperCase() || 'A'}
        unreadChatCount={unreadChatCount}
      />
      <main className="inquiry-form-only">
    <section className="inquiry-form-card inquiry-form-only-card" aria-labelledby="inquiryPageTitle">
      <div className="inquiry-form-header">
        <div>
          {isMetaAds ? <span className="form-eyebrow">[ FACEBOOK / INSTAGRAM ]</span> : <span className="form-eyebrow" data-i18n="inquiry_eyebrow">[ PROJECT BRIEF / 2 MIN ]</span>}
          {isAds ? (
            <>
              <h1 id="inquiryPageTitle">{isMetaAds ? metaCopy.pageTitle : language === 'uk' ? 'Запуск Google Ads' : 'Launch Google Ads'}</h1>
              <p>{isMetaAds ? metaCopy.note : language === 'uk' ? 'Заповніть короткий бриф — технічні речі ми перевіримо самі.' : 'Complete the short brief — we will check the technical details ourselves.'}</p>
            </>
          ) : (
            <>
              <h1 id="inquiryPageTitle" data-i18n-html="form_title">Get in Touch with I&amp;I Studio</h1>
              <p data-i18n="form_desc">Leave your contacts and describe what you have in mind.</p>
            </>
          )}
        </div>
      </div>
      <div className="service-selector-tabs" id="serviceTabs">
        <button type="button" className={activeService === 'landing' ? 'tab-btn active' : 'tab-btn'} data-service="landing" data-i18n="tab_landing" onClick={() => onServiceChange('landing')}>Landing Page</button>
        <button type="button" className={activeService === 'corporate' ? 'tab-btn active' : 'tab-btn'} data-service="corporate" data-i18n="tab_corporate" onClick={() => onServiceChange('corporate')}>Business Website</button>
        <button type="button" className={activeService === 'redesign' ? 'tab-btn active' : 'tab-btn'} data-service="redesign" data-i18n="tab_redesign" onClick={() => onServiceChange('redesign')}>Website Redesign</button>
        <button type="button" className={activeService === 'ads' ? 'tab-btn active' : 'tab-btn'} data-service="ads" aria-pressed={activeService === 'ads'} onClick={() => onServiceChange('ads')}>Google Ads</button>
        <button type="button" className={isMetaAds ? 'tab-btn active' : 'tab-btn'} data-service="meta-ads" aria-pressed={isMetaAds} onClick={() => onServiceChange('meta-ads')}>Meta (Facebook) Ads</button>
        <button type="button" className={activeService === 'consultation' ? 'tab-btn active' : 'tab-btn'} data-service="consultation" data-i18n="tab_consultation" onClick={() => onServiceChange('consultation')}>Consultation</button>
        <button type="button" className={activeService === 'other' ? 'tab-btn active' : 'tab-btn'} data-service="other" data-i18n="tab_other" onClick={() => onServiceChange('other')}>Other</button>
      </div>
      <form id="projectForm" className="smart-form" action={localizedUrl('/inquiry')} method="post" data-authenticated={isAuthenticated ? 'true' : 'false'} data-brief-mode={isMetaAds ? 'meta-ads' : isAds ? 'google-ads' : 'generic'}>
        <input type="hidden" name="service_type" id="serviceTypeInput" value={activeService} readOnly />
        {isMetaAds ? (
          <MetaAdsBrief language={language} />
        ) : activeService === 'ads' ? (
          <GoogleAdsBrief language={language} />
        ) : (
          <>
      <section className="calculator-launcher" aria-labelledby="calculatorLauncherTitle">
        <div className="calculator-launcher-copy">
          <span className="calculator-kicker">{copy.kicker}</span>
          <h2 id="calculatorLauncherTitle">{service.title}</h2>
          <p>{service.description}</p>
        </div>
        <div className="calculator-launcher-actions">
          <div className="calculator-total" aria-live="polite">
            <span>{copy.estimate}</span>
            <strong>{totalDisplay}</strong>
            <small>{copy.finalNote}</small>
          </div>
          <button type="button" className="btn btn-primary calculator-open-button" onClick={() => setCalculatorOpen(true)}>{copy.openCalculator}<span aria-hidden="true">→</span></button>
        </div>
        <div className="calculator-selection-preview" aria-label={copy.selected}>
          <span className="calculator-selection-label">{copy.configured}</span>
          {selectedOptions.slice(1).map((option, index) => (
            <span className="calculator-selection-chip" key={`${option.label}-${index}`}>{option.label}</span>
          ))}
        </div>
      </section>
        <input type="hidden" name="calculator_summary" value={calculatorSummary} readOnly />
        <div className="form-grid-2 inquiry-form-grid">
          <div className="form-group"><label htmlFor="clientName" data-i18n-html="form_name_label">Your Name <span className="req">*</span></label><input type="text" id="clientName" name="client_name" placeholder="Alex" data-i18n-placeholder="form_name_ph" required /></div>
          <div className="form-group"><label htmlFor="clientContact" data-i18n="form_contact_label">Your business Instagram or social media (optional)</label><input type="text" id="clientContact" name="client_contact" placeholder="Instagram, Telegram or social handle (optional)" data-i18n-placeholder="form_contact_ph" /></div>
        </div>
        <div className="form-group"><label htmlFor="clientBudget" data-i18n="form_budget_label">Proposed budget / payment amount (optional)</label><input type="text" id="clientBudget" name="client_budget" placeholder="e.g. $500, $1,000, 20,000 ₴ or your offer" data-i18n-placeholder="form_budget_ph" /></div>
        <div className="form-group project-comment-group"><label htmlFor="projectComment" data-i18n-html="form_comment_label">Tell us about your project or task <span className="req">*</span></label><textarea id="projectComment" name="project_comment" rows={8} placeholder="Write in your own words: what your company does, what you want to achieve, any reference links, questions, or your approximate budget. We'll reply quickly with a concrete proposal." data-i18n-placeholder="form_comment_ph" required defaultValue={""} /></div>
          </>
        )}
        {Object.keys(errors).length > 0 && <div className="account-inline-error" role="alert">{Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}</div>}
        <p className="inquiry-form-note" data-i18n="inquiry_form_note">We usually reply within 1–2 hours during working hours.</p>
        <button type="submit" className="btn btn-primary btn-block btn-submit" id="submitBtn"><span data-i18n="form_btn_submit">Send Request</span><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={22} y1={2} x2={11} y2={13} /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></button>
      </form>
      {calculatorOpen && typeof document !== 'undefined' && createPortal(
        <div className="calculator-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCalculatorOpen(false); }}>
          <section className="calculator-modal" role="dialog" aria-modal="true" aria-labelledby="calculatorModalTitle">
            <header className="calculator-modal-header">
              <div className="calculator-modal-heading">
                <span className="calculator-kicker">{copy.kicker}</span>
                <h2 id="calculatorModalTitle">{service.title}</h2>
                <p>{service.description}</p>
              </div>
              <div className="calculator-modal-header-actions">
                <div className="calculator-total" aria-live="polite">
                  <span>{copy.estimate}</span>
                  <strong>{totalDisplay}</strong>
                </div>
                <button type="button" className="calculator-modal-close" aria-label={copy.closeCalculator} onClick={() => setCalculatorOpen(false)}>×</button>
              </div>
            </header>
            <div className="calculator-modal-body">
              <div className="calculator-layout">
                <div className="calculator-builder">
                  <div className="calculator-steps" aria-label={service.title}>
                    <button type="button" className={calculatorStep === 1 ? 'calculator-step active' : 'calculator-step'} onClick={() => setCalculatorStep(1)}><span>01</span>{service.stepOne}</button>
                    <button type="button" className={calculatorStep === 2 ? 'calculator-step active' : 'calculator-step'} onClick={() => setCalculatorStep(2)}><span>02</span>{service.stepTwo}</button>
                  </div>
                  {calculatorStep === 1 ? (
                    <div className="calculator-step-content">
                      <div className="calculator-section-heading"><h3>{service.stepOne}</h3><p>{service.stepOneDescription}</p></div>
                      <div className="calculator-options-grid">
                        {service.scope.map((option) => (
                          <OptionCard key={option.value} checked={scopeChoice === option.value} name="calculator_scope" value={option.value} label={option.label} description={option.description} price={option.price} included={isCustomEstimate ? copy.customPrice : copy.included} onChange={() => setScopeChoice(option.value)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="calculator-step-content">
                      <div className="calculator-section-heading"><h3>{service.stepTwo}</h3><p>{service.stepTwoDescription}</p></div>
                      <div className="calculator-options-list">
                        {service.extras.map((option) => (
                          <OptionCard key={option.value} checked={Boolean(extras[option.value])} name={`calculator_${option.value}`} value="yes" label={option.label} description={option.description} price={option.price} included={isCustomEstimate ? copy.customPrice : copy.included} type="checkbox" onChange={() => toggleExtra(option.value)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <aside className="calculator-summary" aria-label={copy.selected}>
                  <div className="calculator-summary-head"><span>{copy.selected}</span><strong>{totalDisplay}</strong></div>
                  <div className="calculator-summary-list">
                    {selectedOptions.map((option, index) => (
                      <div className="calculator-summary-row" key={`${option.label}-${index}`}><span>{option.label}</span><strong>{option.price === null ? copy.customPrice : option.price ? `+ ${formatPrice(option.price, language)}` : copy.included}</strong></div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
            <footer className="calculator-modal-footer">
              <span>{copy.finalNote}</span>
              <button type="button" className="btn btn-primary" onClick={() => setCalculatorOpen(false)}>{copy.applyCalculator}<span aria-hidden="true">✓</span></button>
            </footer>
          </section>
        </div>,
        document.body,
      )}
      <div className={`form-feedback-overlay${inquirySubmitted ? ' active' : ''}`} id="feedbackOverlay">
        <div className="feedback-card">
          <div className="feedback-icon"><svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
          <h2 data-i18n="feedback_title">Thank you! Inquiry Received.</h2>
          <p className="feedback-msg" data-i18n="feedback_msg">We have registered your request and will contact you shortly.</p>
          <div className="ticket-box"><span className="ticket-label" data-i18n="feedback_ticket_lbl">Inquiry ID</span><span className="ticket-number" id="ticketNumberDisplay">{inquiryTicket}</span></div>
          <div className="automated-actions-list"><div className="action-step done"><span className="step-icon">✓</span><span><span data-i18n="feedback_step_1">Category:</span> <strong id="assignedService">{inquiryServiceLabel}</strong></span></div><div className="action-step done" id="feedbackBudgetRow" style={{display: inquiryBudget ? 'flex' : 'none'}}><span className="step-icon">✓</span><span><span data-i18n="feedback_budget_lbl">Budget:</span> <strong id="assignedBudget">{inquiryBudget}</strong></span></div><div className="action-step done"><span className="step-icon">✓</span><span data-i18n="feedback_step_2">Instant notification dispatched to manager</span></div><div className="action-step done"><span className="step-icon">✓</span><span data-i18n="feedback_step_3">Estimated reply time: within 1–2 hours</span></div></div>
          <p className="feedback-note" data-i18n="feedback_note">We'll review your requirements and message you with an estimate and suggestions.</p>
          <button type="button" className="btn btn-secondary btn-block" id="closeFeedbackBtn" data-i18n="feedback_btn_close">Close</button>
        </div>
      </div>
    </section>
  </main></div>

  );
}
