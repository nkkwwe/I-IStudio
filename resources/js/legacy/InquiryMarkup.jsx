import AccountSiteHeader from '../Components/AccountSiteHeader';
import GoogleAdsBrief from '../Components/GoogleAdsBrief';
import { localizedUrl } from '../content/siteLanguage';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';

const calculatorCopy = {
  en: {
    kicker: '[ PRICE CALCULATOR / EXAMPLE ]',
    title: 'Assemble your website',
    description: 'Choose the structure and add-ons. The estimate updates automatically.',
    stepStructure: 'Structure',
    stepExtras: 'Add-ons',
    openCalculator: 'Open calculator',
    closeCalculator: 'Close calculator',
    applyCalculator: 'Apply selection',
    configured: 'Configured',
    structureTitle: 'What are we building?',
    structureDescription: 'Start with the format that is closest to your idea.',
    onePage: 'One-page landing',
    onePageDescription: 'A focused page for one offer or campaign.',
    multiPage: 'Multi-page business site',
    multiPageDescription: 'Several pages for services, cases and the company.',
    catalog: 'Site with catalogue',
    catalogDescription: 'Products, categories and a scalable catalogue structure.',
    extrasTitle: 'What should be included?',
    extrasDescription: 'Select only what you need. This is a preliminary example.',
    admin: 'Admin panel / CMS',
    adminDescription: 'Edit pages, services and content yourself.',
    content: 'Banners and copy',
    contentDescription: 'We prepare the basic visual and text content.',
    products: 'Product catalogue',
    productsDescription: 'Up to 50 products with categories and filters.',
    account: 'Client personal account',
    accountDescription: 'Sign-in, profile and private client area.',
    included: 'Included',
    estimate: 'Example estimate',
    selected: 'Selected',
    base: 'Base package',
    finalNote: 'The final price is confirmed after reviewing the brief.',
    serviceBase: 'Service direction',
    serviceNames: {
      landing: 'Landing page', corporate: 'Business website', redesign: 'Website redesign',
      ads: 'Advertising', consultation: 'Consultation', other: 'Custom request',
    },
  },
  uk: {
    kicker: '[ КАЛЬКУЛЯТОР ЦІНИ / ПРИКЛАД ]',
    title: 'Зберіть свій сайт',
    description: 'Оберіть структуру та додаткові функції. Оцінка оновлюється автоматично.',
    stepStructure: 'Структура',
    stepExtras: 'Додатково',
    openCalculator: 'Відкрити калькулятор',
    closeCalculator: 'Закрити калькулятор',
    applyCalculator: 'Застосувати вибір',
    configured: 'Налаштовано',
    structureTitle: 'Що створюємо?',
    structureDescription: 'Почніть із формату, найближчого до вашої ідеї.',
    onePage: 'Односторінковий лендинг',
    onePageDescription: 'Одна сфокусована сторінка для пропозиції або реклами.',
    multiPage: 'Багатосторінковий сайт',
    multiPageDescription: 'Сторінки послуг, кейсів та інформації про компанію.',
    catalog: 'Сайт із каталогом',
    catalogDescription: 'Товари, категорії та структура каталогу, яку можна розширювати.',
    extrasTitle: 'Що додати до проєкту?',
    extrasDescription: 'Оберіть лише потрібне. Це попередній приклад розрахунку.',
    admin: 'Адмінпанель / CMS',
    adminDescription: 'Самостійне редагування сторінок, послуг і контенту.',
    content: 'Банери та тексти',
    contentDescription: 'Підготуємо базове візуальне та текстове наповнення.',
    products: 'Каталог товарів',
    productsDescription: 'До 50 товарів із категоріями та фільтрами.',
    account: 'Особистий кабінет клієнта',
    accountDescription: 'Вхід, профіль та приватна зона клієнта.',
    included: 'Включено',
    estimate: 'Приклад розрахунку',
    selected: 'Обрано',
    base: 'Базовий пакет',
    finalNote: 'Фінальну ціну підтверджуємо після перегляду брифу.',
    serviceBase: 'Напрям послуги',
    serviceNames: {
      landing: 'Лендинг', corporate: 'Сайт для бізнесу', redesign: 'Редизайн сайту',
      ads: 'Реклама', consultation: 'Консультація', other: 'Індивідуальний запит',
    },
  },
  ro: {
    kicker: '[ CALCULATOR DE PREȚ / EXEMPLU ]',
    title: 'Configurează site-ul tău',
    description: 'Alege structura și funcțiile suplimentare. Estimarea se actualizează automat.',
    stepStructure: 'Structură',
    stepExtras: 'Extra',
    openCalculator: 'Deschide calculatorul',
    closeCalculator: 'Închide calculatorul',
    applyCalculator: 'Aplică selecția',
    configured: 'Configurat',
    structureTitle: 'Ce construim?',
    structureDescription: 'Începe cu formatul cel mai apropiat de ideea ta.',
    onePage: 'Landing page cu o pagină',
    onePageDescription: 'O pagină concentrată pentru o ofertă sau campanie.',
    multiPage: 'Site business cu mai multe pagini',
    multiPageDescription: 'Pagini pentru servicii, proiecte și companie.',
    catalog: 'Site cu catalog',
    catalogDescription: 'Produse, categorii și o structură de catalog extensibilă.',
    extrasTitle: 'Ce includem în proiect?',
    extrasDescription: 'Alege doar ce ai nevoie. Acesta este un exemplu preliminar.',
    admin: 'Panou de administrare / CMS',
    adminDescription: 'Editezi singur paginile, serviciile și conținutul.',
    content: 'Bannere și texte',
    contentDescription: 'Pregătim conținutul vizual și textul de bază.',
    products: 'Catalog de produse',
    productsDescription: 'Până la 50 de produse cu categorii și filtre.',
    account: 'Cont personal pentru clienți',
    accountDescription: 'Autentificare, profil și zonă privată pentru clienți.',
    included: 'Inclus',
    estimate: 'Estimare exemplu',
    selected: 'Selectat',
    base: 'Pachet de bază',
    finalNote: 'Prețul final se confirmă după analizarea brief-ului.',
    serviceBase: 'Direcția serviciului',
    serviceNames: {
      landing: 'Landing page', corporate: 'Site business', redesign: 'Redesign site',
      ads: 'Publicitate', consultation: 'Consultație', other: 'Solicitare personalizată',
    },
  },
};

const serviceBasePrices = { landing: 500, corporate: 900, redesign: 650, ads: 300, consultation: 100, other: 0 };
const formatPrices = { 'one-page': 0, 'multi-page': 450, catalog: 900 };
const extraPrices = { admin: 300, content: 250, products: 350, account: 450 };

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
      <span className="calculator-option-price">{price ? `+ $${price}` : included}</span>
    </label>
  );
}

export default function InquiryMarkup({
  activeService,
  onServiceChange,
  language = 'en',
  isAuthenticated = false,
  inquirySubmitted = false,
  inquiryTicket = '#II-0000',
  inquiryServiceLabel = 'Landing Page',
  inquiryBudget = '',
  signInLabel = 'Sign in',
  unreadChatCount = 0,
  isDark = false,
  onToggleTheme,
}) {
  const copy = calculatorCopy[language] || calculatorCopy.en;
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorStep, setCalculatorStep] = useState(1);
  const [format, setFormat] = useState(activeService === 'corporate' ? 'multi-page' : 'one-page');
  const [extras, setExtras] = useState({ admin: false, content: false, products: false, account: false });

  useEffect(() => {
    setCalculatorOpen(false);
    setCalculatorStep(1);
    setFormat(activeService === 'corporate' ? 'multi-page' : 'one-page');
    setExtras({ admin: false, content: false, products: false, account: false });
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

  const formatOptions = [
    { value: 'one-page', label: copy.onePage, description: copy.onePageDescription, price: 0 },
    { value: 'multi-page', label: copy.multiPage, description: copy.multiPageDescription, price: formatPrices['multi-page'] },
    { value: 'catalog', label: copy.catalog, description: copy.catalogDescription, price: formatPrices.catalog },
  ];
  const extraOptions = [
    { value: 'admin', label: copy.admin, description: copy.adminDescription, price: extraPrices.admin },
    { value: 'content', label: copy.content, description: copy.contentDescription, price: extraPrices.content },
    { value: 'products', label: copy.products, description: copy.productsDescription, price: extraPrices.products },
    { value: 'account', label: copy.account, description: copy.accountDescription, price: extraPrices.account },
  ];
  const selectedOptions = useMemo(() => {
    const selected = [
      { label: copy.base, price: serviceBasePrices[activeService] ?? 0 },
      { label: formatOptions.find((option) => option.value === format)?.label ?? copy.onePage, price: formatPrices[format] ?? 0 },
    ];

    extraOptions.forEach((option) => {
      if (extras[option.value]) selected.push({ label: option.label, price: option.price });
    });

    return selected;
  }, [activeService, copy, extraOptions, extras, format, formatOptions]);
  const total = selectedOptions.reduce((sum, option) => sum + option.price, 0);
  const calculatorSummary = [
    `${copy.serviceBase}: ${copy.serviceNames[activeService] ?? activeService}`,
    ...selectedOptions.map((option) => `${option.label}: ${formatPrice(option.price, language)}`),
    `${copy.estimate}: ${formatPrice(total, language)}`,
  ].join('\n');
  const toggleExtra = (key) => setExtras((current) => ({ ...current, [key]: !current[key] }));

  return (
    <div className="react-page-root">
      <AccountSiteHeader
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        showProfile={true}
        isAuthenticated={isAuthenticated}
        unreadChatCount={unreadChatCount}
      />
      <main className="inquiry-form-only">
    <section className="inquiry-form-card inquiry-form-only-card" aria-labelledby="inquiryPageTitle">
      <div className="inquiry-form-header">
        <div>
          <span className="form-eyebrow" data-i18n="inquiry_eyebrow">[ PROJECT BRIEF / 2 MIN ]</span>
          {activeService === 'ads' ? (
            <>
              <h1 id="inquiryPageTitle">{language === 'uk' ? 'Запуск Google Ads' : 'Launch Google Ads'}</h1>
              <p>{language === 'uk' ? 'Заповніть короткий бриф — технічні речі ми перевіримо самі.' : 'Complete the short brief — we will check the technical details ourselves.'}</p>
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
        <button type="button" className={activeService === 'ads' ? 'tab-btn active' : 'tab-btn'} data-service="ads" data-i18n="tab_ads" onClick={() => onServiceChange('ads')}>Advertising</button>
        <button type="button" className={activeService === 'consultation' ? 'tab-btn active' : 'tab-btn'} data-service="consultation" data-i18n="tab_consultation" onClick={() => onServiceChange('consultation')}>Consultation</button>
        <button type="button" className={activeService === 'other' ? 'tab-btn active' : 'tab-btn'} data-service="other" data-i18n="tab_other" onClick={() => onServiceChange('other')}>Other</button>
      </div>
      <form id="projectForm" className="smart-form" action={localizedUrl('/inquiry')} method="post" data-authenticated={isAuthenticated ? 'true' : 'false'} data-brief-mode={activeService === 'ads' ? 'google-ads' : 'generic'}>
        <input type="hidden" name="service_type" id="serviceTypeInput" defaultValue={activeService} />
        {activeService === 'ads' ? (
          <GoogleAdsBrief language={language} />
        ) : (
          <>
      <section className="calculator-launcher" aria-labelledby="calculatorLauncherTitle">
        <div className="calculator-launcher-copy">
          <span className="calculator-kicker">{copy.kicker}</span>
          <h2 id="calculatorLauncherTitle">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <div className="calculator-launcher-actions">
          <div className="calculator-total" aria-live="polite">
            <span>{copy.estimate}</span>
            <strong>{formatPrice(total, language)}</strong>
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
        <p className="inquiry-form-note" data-i18n="inquiry_form_note">We usually reply within 1–2 hours during working hours.</p>
        <button type="submit" className="btn btn-primary btn-block btn-submit" id="submitBtn"><span data-i18n="form_btn_submit">Send Request</span><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1={22} y1={2} x2={11} y2={13} /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></button>
      </form>
      {calculatorOpen && typeof document !== 'undefined' && createPortal(
        <div className="calculator-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCalculatorOpen(false); }}>
          <section className="calculator-modal" role="dialog" aria-modal="true" aria-labelledby="calculatorModalTitle">
            <header className="calculator-modal-header">
              <div className="calculator-modal-heading">
                <span className="calculator-kicker">{copy.kicker}</span>
                <h2 id="calculatorModalTitle">{copy.title}</h2>
                <p>{copy.description}</p>
              </div>
              <div className="calculator-modal-header-actions">
                <div className="calculator-total" aria-live="polite">
                  <span>{copy.estimate}</span>
                  <strong>{formatPrice(total, language)}</strong>
                </div>
                <button type="button" className="calculator-modal-close" aria-label={copy.closeCalculator} onClick={() => setCalculatorOpen(false)}>×</button>
              </div>
            </header>
            <div className="calculator-modal-body">
              <div className="calculator-layout">
                <div className="calculator-builder">
                  <div className="calculator-steps" aria-label={copy.title}>
                    <button type="button" className={calculatorStep === 1 ? 'calculator-step active' : 'calculator-step'} onClick={() => setCalculatorStep(1)}><span>01</span>{copy.stepStructure}</button>
                    <button type="button" className={calculatorStep === 2 ? 'calculator-step active' : 'calculator-step'} onClick={() => setCalculatorStep(2)}><span>02</span>{copy.stepExtras}</button>
                  </div>
                  {calculatorStep === 1 ? (
                    <div className="calculator-step-content">
                      <div className="calculator-section-heading"><h3>{copy.structureTitle}</h3><p>{copy.structureDescription}</p></div>
                      <div className="calculator-options-grid">
                        {formatOptions.map((option) => (
                          <OptionCard key={option.value} checked={format === option.value} name="calculator_format" value={option.value} label={option.label} description={option.description} price={option.price} included={copy.included} onChange={() => setFormat(option.value)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="calculator-step-content">
                      <div className="calculator-section-heading"><h3>{copy.extrasTitle}</h3><p>{copy.extrasDescription}</p></div>
                      <div className="calculator-options-list">
                        {extraOptions.map((option) => (
                          <OptionCard key={option.value} checked={Boolean(extras[option.value])} name={`calculator_${option.value}`} value="yes" label={option.label} description={option.description} price={option.price} included={copy.included} type="checkbox" onChange={() => toggleExtra(option.value)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <aside className="calculator-summary" aria-label={copy.selected}>
                  <div className="calculator-summary-head"><span>{copy.selected}</span><strong>{formatPrice(total, language)}</strong></div>
                  <div className="calculator-summary-list">
                    {selectedOptions.map((option, index) => (
                      <div className="calculator-summary-row" key={`${option.label}-${index}`}><span>{option.label}</span><strong>{option.price ? `+ ${formatPrice(option.price, language)}` : copy.included}</strong></div>
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
