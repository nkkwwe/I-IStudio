import ServiceBrief from '../Components/ServiceBrief';
import { landing, translate } from '../content/startupContent';
import AccountSiteHeader from '../Components/AccountSiteHeader';
import calculatorCopy from '../content/inquiryCalculatorCopy';
import WebsiteDesignPicker from '../Components/WebsiteDesignPicker';
import InquiryServiceSelector from '../Components/InquiryServiceSelector';
import AutoGrowingTextarea from '../Components/AutoGrowingTextarea';
import { getInquiryUxCopy } from '../content/inquiryUxCopy';
import { getWebsiteDesignCopy, getWebsiteDesigns, restoreDesignReference } from '../content/websiteDesigns';
import { localizedUrl } from '../content/siteLanguage';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const ux = getInquiryUxCopy(language);
  const [appliedEstimate, setAppliedEstimate] = useState(null);
  const estimateApplied = Boolean(appliedEstimate);
  const calculatorRef = useRef(null);
  const calculatorTrigger = useRef(null);
  const service = copy.services[activeService] || copy.services.other;
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorStep, setCalculatorStep] = useState(1);
  const [scopeChoice, setScopeChoice] = useState(service.scope[0].value);
  const [extras, setExtras] = useState({});
  const [designReference, setDesignReference] = useState(() => restoreDesignReference(activeService));
  const selectedDesign = getWebsiteDesigns(activeService).find((design) => design.id === designReference);
  const designCopy = getWebsiteDesignCopy(language);

  useEffect(() => {
    const form = document.getElementById('projectForm');
    const handleReset = () => { setDesignReference(''); setAppliedEstimate(null); };
    form?.addEventListener('reset', handleReset);
    return () => form?.removeEventListener('reset', handleReset);
  }, [activeService]);

  useEffect(() => {
    const overlay = document.getElementById('feedbackOverlay');
    if (!overlay) return undefined;
    let restoreScroll = null;
    const syncScrollLock = () => {
      if (overlay.classList.contains('active') && !restoreScroll) {
        const bodyOverflow = document.body.style.overflow;
        const rootOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        restoreScroll = () => {
          document.body.style.overflow = bodyOverflow;
          document.documentElement.style.overflow = rootOverflow;
          restoreScroll = null;
        };
      } else if (!overlay.classList.contains('active')) {
        restoreScroll?.();
      }
    };
    const observer = new MutationObserver(syncScrollLock);
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
    syncScrollLock();
    return () => {
      observer.disconnect();
      restoreScroll?.();
    };
  }, []);

  useEffect(() => {
    setCalculatorOpen(false);
    setCalculatorStep(1);
    setAppliedEstimate(null);
    setScopeChoice(service.scope[0].value);
    setExtras({});
    setDesignReference(restoreDesignReference(activeService));
  }, [activeService]);

  useEffect(() => {
    if (!calculatorOpen) return undefined;

    const returnFocus = document.activeElement;
    const handleEscape = (event) => {
      if (event.key === 'Escape') setCalculatorOpen(false);
      if (event.key !== 'Tab') return;
      const controls = [...(calculatorRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled)') ?? [])];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    calculatorRef.current?.querySelector('.calculator-modal-close')?.focus();
    document.body.classList.add('calculator-modal-open');
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.classList.remove('calculator-modal-open');
      document.removeEventListener('keydown', handleEscape);
      if (returnFocus?.isConnected) returnFocus.focus();
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

  if (['ads', 'meta-ads', 'tiktok-ads', 'marketplaces'].includes(activeService)) {
    return <div className="react-page-root">
      <AccountSiteHeader isDark={isDark} onToggleTheme={onToggleTheme} showProfile={true} isAuthenticated={isAuthenticated} userInitial={userName?.trim()?.charAt(0)?.toLocaleUpperCase() || 'A'} unreadChatCount={unreadChatCount} />
      <main className="inquiry-form-only"><section className="inquiry-form-card inquiry-form-only-card">
        <InquiryServiceSelector service={activeService} language={language} onChange={onServiceChange} />
        <ServiceBrief key={activeService} service={activeService} language={language} submitted={inquirySubmitted} ticket={inquiryTicket} />
      </section></main>
    </div>;
  }

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
          <span className="form-eyebrow">{ux.noAccount}</span>
          <h1 id="inquiryPageTitle">{ux.title}</h1>
          <p>{ux.description}</p>
        </div>
      </div>
      <InquiryServiceSelector service={activeService} language={language} onChange={onServiceChange} />
      <form id="projectForm" className="smart-form" action={localizedUrl('/inquiry')} method="post" data-authenticated={isAuthenticated ? 'true' : 'false'} data-brief-mode="generic">
        <input type="hidden" name="service_type" id="serviceTypeInput" value={activeService} readOnly />
        <div className="form-grid-2 inquiry-form-grid">
          <div className="form-group"><label htmlFor="clientName" data-i18n-html="form_name_label">Your Name <span className="req">*</span></label><input type="text" id="clientName" name="client_name" placeholder="Alex" data-i18n-placeholder="form_name_ph" required /></div>
          <div className="form-group"><label htmlFor="replyContact">{ux.reply}{!isAuthenticated && <span className="req"> *</span>}</label><input type="text" id="replyContact" name="reply_contact" placeholder={ux.replyPlaceholder} required={!isAuthenticated} maxLength={255} autoComplete="off" aria-describedby={isAuthenticated ? "replyContactHint" : undefined} />{isAuthenticated && <p className="inquiry-form-note" id="replyContactHint">{ux.replyAccount}</p>}</div>
        </div>
        <div className="form-group project-comment-group"><label htmlFor="projectComment" data-i18n-html="form_comment_label">Tell us about your project or task <span className="req">*</span></label><AutoGrowingTextarea id="projectComment" name="project_comment" rows={4} placeholder={ux.commentPlaceholder} required maxLength={10000} defaultValue="" /></div>
        <details className="inquiry-optional">
          <summary>{ux.optional}</summary>
          <div className="inquiry-optional-content">
            <div className="form-group"><label htmlFor="clientContact">{ux.business}</label><input type="text" id="clientContact" name="client_contact" placeholder={ux.businessPlaceholder} maxLength={255} aria-describedby="businessProfileHint" /><p className="inquiry-form-note" id="businessProfileHint">{ux.businessHint}</p></div>
            <div className="form-group"><label htmlFor="clientBudget" data-i18n="form_budget_label">Proposed budget / payment amount (optional)</label><input type="text" id="clientBudget" name="client_budget" placeholder="e.g. $500, $1,000, 20,000 ₴ or your offer" data-i18n-placeholder="form_budget_ph" maxLength={120} /></div>
            {activeService !== 'other' && <div className="inquiry-estimate-tool">
              <div><span className="calculator-kicker">{estimateApplied ? ux.applied : ux.base}</span><strong>{appliedEstimate?.total ?? (isCustomEstimate ? copy.customEstimate : formatPrice(service.basePrice, language))}</strong></div>
              <button ref={calculatorTrigger} type="button" className="btn btn-secondary" aria-haspopup="dialog" onClick={() => { setCalculatorStep(1); setCalculatorOpen(true); }}>{ux.estimate}</button>
              <p className="inquiry-form-note">{copy.finalNote}</p>
              {estimateApplied && <div className="calculator-selection-preview" aria-live="polite">{appliedEstimate.options.slice(1).map((option) => <span className="calculator-selection-chip" key={option.label}>{option.label}</span>)}</div>}
            </div>}
            <WebsiteDesignPicker service={activeService} language={language} value={selectedDesign?.id ?? ''} onChange={setDesignReference} />
          </div>
        </details>
        <input type="hidden" name="calculator_summary" value={[appliedEstimate?.summary, selectedDesign ? `${designCopy.summary}: ${selectedDesign.name} (${selectedDesign.id})` : ''].filter(Boolean).join('\n')} readOnly />
        <input type="hidden" name="design_reference" value={selectedDesign?.id ?? ''} readOnly />
        {(estimateApplied || selectedDesign) && <p className="inquiry-form-note" aria-live="polite">{estimateApplied && `${ux.applied}: ${appliedEstimate.total}`}{estimateApplied && selectedDesign && ' · '}{selectedDesign && `${designCopy.chosen}: ${selectedDesign.name}`}</p>}
        {Object.keys(errors).length > 0 && <div className="account-inline-error" role="alert">{Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}</div>}
        <p className="inquiry-form-note">{isAuthenticated ? ux.accountNextStep : ux.nextStep}</p>
        <button type="submit" className="btn btn-primary btn-block btn-submit" id="submitBtn"><span data-i18n="form_btn_submit">Send Request</span><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={22} y1={2} x2={11} y2={13} /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></button>
      </form>
      {calculatorOpen && typeof document !== 'undefined' && createPortal(
        <div className="calculator-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCalculatorOpen(false); }}>
          <section ref={calculatorRef} className="calculator-modal" role="dialog" aria-modal="true" aria-labelledby="calculatorModalTitle">
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
              <div className="calculator-footer-actions">
                {calculatorStep === 2 && <button type="button" className="btn btn-secondary" onClick={() => setCalculatorStep(1)}>{ux.back}</button>}
                <button type="button" className="btn btn-primary" onClick={() => { if (calculatorStep === 1) setCalculatorStep(2); else { setAppliedEstimate({ summary: calculatorSummary, total: totalDisplay, options: selectedOptions }); setCalculatorOpen(false); } }}>{calculatorStep === 1 ? ux.next : ux.apply}</button>
              </div>
            </footer>
          </section>
        </div>,
        document.body,
      )}
      <div className={`form-feedback-overlay${inquirySubmitted ? ' active' : ''}`} id="feedbackOverlay">
        <div className="feedback-card">
          <div className="feedback-icon"><svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
          <h2 data-i18n="feedback_title">Thank you! Inquiry Received.</h2>
          <p className="feedback-msg">{translate(landing.success, language)}</p>
          <div className="ticket-box"><span className="ticket-label" data-i18n="feedback_ticket_lbl">Inquiry ID</span><span className="ticket-number" id="ticketNumberDisplay">{inquiryTicket}</span></div>
          <div className="automated-actions-list"><div className="action-step done"><span className="step-icon">✓</span><span><span data-i18n="feedback_step_1">Category:</span> <strong id="assignedService">{inquiryServiceLabel}</strong></span></div><div className="action-step done" id="feedbackBudgetRow" style={{display: inquiryBudget ? 'flex' : 'none'}}><span className="step-icon">✓</span><span><span data-i18n="feedback_budget_lbl">Budget:</span> <strong id="assignedBudget">{inquiryBudget}</strong></span></div></div>
          <p className="feedback-note" data-i18n="feedback_note">We'll review your requirements and message you with an estimate and suggestions.</p>
          <button type="button" className="btn btn-secondary btn-block" id="closeFeedbackBtn" data-i18n="feedback_btn_close">Close</button>
        </div>
      </div>
    </section>
  </main></div>

  );
}
