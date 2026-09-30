import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useSiteLanguage } from '../content/uiTranslations';
import { localizedUrl } from '../content/siteLanguage';
import { landing, translate } from '../content/startupContent';
import ClientReviews from './ClientReviews';
import StartupSelect from './StartupSelect';

function StartupFaqItem({ id, question, answer, t }) {
  const [open, setOpen] = useState(false);
  const answerId = `startup-faq-answer-${id}`;
  return <div className="startup-faq">
    <h3><button className="startup-faq-trigger" type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpen((value) => !value)}>
      <span>{t(question)}</span><svg className={open ? 'is-open' : ''} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button></h3>
    <div className={`startup-faq-answer${open ? ' is-open' : ''}`} id={answerId} aria-hidden={!open} inert={!open}>
      <div><p>{t(answer)}</p></div>
    </div>
  </div>;
}

export default function StartupLanding({ reviews = [] }) {
  const language = useSiteLanguage();
  const t = (value) => translate(value, language);
  const { flash = {} } = usePage().props;
  const heading = useRef(null);
  const form = useForm({ submission_kind: 'initial', service_type: 'consultation', client_name: '', client_email: '', project_comment: '', ads_consent: false });
  const selectService = (id) => {
    form.setData('service_type', id);
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
  };
  const input = (name, label, type = 'text') => <div className="form-group">
    <label htmlFor={`lead-${name}`}>{t(label)} *</label>
    <input id={`lead-${name}`} type={type} autoComplete={type === 'email' ? 'email' : 'name'} required maxLength={name === 'client_name' ? 120 : 255} value={form.data[name]} onChange={(e) => form.setData(name, e.target.value)} aria-invalid={Boolean(form.errors[name])} aria-describedby={form.errors[name] ? `lead-${name}-error` : undefined} />
    {form.errors[name] && <p className="account-inline-error" id={`lead-${name}-error`}>{form.errors[name]}</p>}
  </div>;
  return <>
    <section className="hero-section startup-hero" id="hero"><div className="container startup-hero-layout">
      <div className="startup-hero-copy">
        <div className="hero-badge"><span className="hero-badge-dot" />{t(landing.badge)}</div>
        <h1 className="hero-title">{t(landing.title)}</h1>
        <p className="hero-subtitle">{t(landing.description)}</p>
        <div className="hero-cta-group"><a className="btn btn-primary" href="#inquiry">{t(landing.discuss)}</a><a className="btn btn-secondary" href="#services">{t(landing.explore)}</a></div>
        <div className="hero-trust-bar">{landing.trust.map((item, i) => <span className="trust-pill" key={i}>{t(item)}</span>)}</div>
      </div>
      <aside className="startup-hero-panel" aria-label={t(landing.heroPanelTitle)}>
        <span className="startup-panel-kicker">I&amp;I STUDIO / DIGITAL</span>
        <h2>{t(landing.heroPanelTitle)}</h2><p>{t(landing.heroPanelDescription)}</p>
        <ol>{landing.heroPanelItems.map(([number, en, uk, ro]) => <li key={number}><span>{number}</span><strong>{t([en, uk, ro])}</strong></li>)}</ol>
      </aside>
    </div></section>
    <section className="startup-section service-solutions-section" id="services"><div className="container">
      <div className="section-header"><span className="section-tag">{t(landing.servicesTag)}</span><h2 className="section-title">{t(landing.servicesTitle)}</h2><p className="section-desc">{t(landing.servicesDescription)}</p></div>
      <div className="startup-service-grid">{landing.services.map((service, i) => <article className="advantage-card startup-service-card" key={service.id}>
        <span className="advantage-num">0{i + 1}</span><h3>{t(service.name)}</h3><p>{t(service.description)}</p>
        <ul>{service.items.map((item, index) => <li key={index}>{t(item)}</li>)}</ul>
        <button type="button" className="btn btn-secondary" onClick={() => selectService(service.id)}>{t(landing.discuss)}</button>
      </article>)}</div>
    </div></section>
    <section className="startup-section" id="advantages"><div className="container">
      <div className="section-header"><span className="section-tag">{t(landing.approachTag)}</span><h2 className="section-title">{t(landing.approachTitle)}</h2></div>
      <div className="startup-principles">{landing.principles.map(([title, body], i) => <article className="advantage-card startup-principle-card" key={i}><span className="advantage-num">0{i + 1}</span><h3>{t(title)}</h3><p>{t(body)}</p></article>)}</div>
    </div></section>
    {reviews.length > 0 && <ClientReviews reviews={reviews} />}
    <section className="startup-section workflow-section" id="process"><div className="container">
      <div className="section-header"><span className="section-tag">{t(landing.processTag)}</span><h2 className="section-title">{t(landing.processTitle)}</h2></div>
      <div className="startup-steps">{landing.steps.map(([title, body], i) => <article className="workflow-card" key={i}><div className="workflow-card-top"><span className="workflow-num">0{i + 1}</span></div><h3>{t(title)}</h3><p>{t(body)}</p></article>)}</div>
    </div></section>
    <section className="startup-section startup-pricing-section" id="pricing"><div className="container startup-reading startup-pricing-card"><span className="section-tag">{t(landing.pricingTag)}</span><h2 className="section-title">{t(landing.pricingTitle)}</h2><p>{t(landing.pricing)}</p><a className="btn btn-secondary" href="#inquiry">{t(landing.discuss)}</a></div></section>
    <section className="startup-section startup-faq-section" id="faq"><div className="container startup-reading"><span className="section-tag">{t(landing.faqTag)}</span><h2 className="section-title">{t(landing.faqTitle)}</h2>{landing.faq.map(([question, answer], i) => <StartupFaqItem id={i} key={i} question={question} answer={answer} t={t} />)}</div></section>
    <section className="inquiry-section" id="inquiry"><div className="container inquiry-container">
      <div className="inquiry-copy"><h2 className="section-title" ref={heading} tabIndex={-1}>{t(landing.contactTitle)}</h2><p className="section-desc">{t(landing.contactDescription)}</p><aside className="startup-contact-card"><h3>{t(landing.contactStepsTitle)}</h3><ol className="startup-contact-steps">{landing.contactSteps.map(([title, body], i) => <li key={i}><span>0{i + 1}</span><div><strong>{t(title)}</strong><p>{t(body)}</p></div></li>)}</ol></aside></div>
      <form className="smart-form inquiry-cta-card startup-lead" onSubmit={(e) => { e.preventDefault(); if (form.processing) return; form.post(localizedUrl('/inquiry'), { preserveScroll: true, onSuccess: () => form.reset('client_name', 'client_email', 'project_comment', 'ads_consent') }); }}>
        {flash.inquiry_submitted && <p role="status">{t(landing.success)} <strong>{flash.inquiry_ticket}</strong></p>}
        {input('client_name', landing.name)}{input('client_email', landing.email, 'email')}
        <div className="form-group"><label htmlFor="lead-service">{t(landing.service)}</label><StartupSelect id="lead-service" value={form.data.service_type} onChange={(e) => form.setData('service_type', e.target.value)}><option value="consultation">{t(landing.advice)}</option>{landing.services.map((service) => <option key={service.id} value={service.id}>{t(service.name)}</option>)}</StartupSelect></div>
        <div className="form-group"><label htmlFor="lead-task">{t(landing.task)}</label><textarea id="lead-task" rows={3} maxLength={1000} value={form.data.project_comment} onChange={(e) => form.setData('project_comment', e.target.value)} /></div>
        <label className="ads-consent"><input type="checkbox" required checked={form.data.ads_consent} onChange={(e) => form.setData('ads_consent', e.target.checked)} />{t(landing.consent)}</label>
        {Object.keys(form.errors).length > 0 && <div role="alert" className="account-inline-error">{Object.entries(form.errors).filter(([key]) => !['client_name', 'client_email'].includes(key)).map(([key, error]) => <p key={key}>{error}</p>)}</div>}
        <button className="btn btn-primary" type="submit" disabled={form.processing}>{t(form.processing ? landing.sending : landing.submit)}</button>
        <a className="btn btn-secondary" href={localizedUrl(`/inquiry?service=${form.data.service_type}`)}>{t(landing.detailed)}</a>
      </form>
    </div></section>
  </>;
}
