import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { localizedUrl } from '../content/siteLanguage';
import { landing, schema, translate, serviceLabel, visibleField, getStartupBriefRows } from '../content/startupContent';
import { buildLeadContext } from './GoogleAdsBrief';
import StartupSelect from './StartupSelect';
import AutoGrowingTextarea from './AutoGrowingTextarea';
import { getInquiryUxCopy } from '../content/inquiryUxCopy';

export default function ServiceBrief({ service, language, submitted, ticket }) {
  const t = (value) => translate(value, language);
  const storageKey = `ii_brief_v1_${service}`;
  const [initial] = useState(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
      return Object.fromEntries(Object.keys(schema.fields).map((key) => [key, typeof stored[key] === 'string' ? stored[key] : '']));
    } catch { return {}; }
  });
  const form = useForm({ ...initial, consent: false });
  const [step, setStep] = useState(0);
  const [invalid, setInvalid] = useState({});
  const [context] = useState(buildLeadContext);
  const title = useRef(null);
  const stepCount = schema.steps.length;
  const review = step === stepCount;
  const active = Object.fromEntries(Object.entries(schema.fields).filter(([, field]) => visibleField(field, service, form.data)));
  const answers = Object.fromEntries(Object.keys(active).map((key) => [key, form.data[key] || '']));

  useEffect(() => {
    try {
      if (Object.values(answers).some(Boolean)) sessionStorage.setItem(storageKey, JSON.stringify(answers));
      else sessionStorage.removeItem(storageKey);
    } catch { /* Storage can be unavailable. */ }
  }, [form.data]);
  useEffect(() => { title.current?.focus(); }, [step]);
  const clear = () => {
    try { sessionStorage.removeItem(storageKey); } catch { /* Storage can be unavailable. */ }
    form.setData({ ...Object.fromEntries(Object.keys(schema.fields).map((key) => [key, ''])), consent: false });
    setStep(0);
    setInvalid({});
    form.clearErrors();
  };
  const validate = (keys) => {
    const errors = {};
    keys.forEach((key) => {
      const field = active[key];
      if (!field) return;
      const value = String(answers[key] || '').trim();
      if (field.required && !value) errors[key] = t(landing.required);
      if (value && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[key] = t(landing.required);
      if (value && field.type === 'url') {
        try { if (!['http:', 'https:'].includes(new URL(value).protocol)) errors[key] = 'https://…'; } catch { errors[key] = 'https://…'; }
      }
      if (value && field.type === 'number' && (!Number.isFinite(Number(value)) || Number(value) <= 0)) errors[key] = '> 0';
    });
    setInvalid(errors);
    return Object.keys(errors)[0];
  };
  const advance = () => {
    const firstError = validate(schema.steps[step].fields);
    if (firstError) document.getElementById(`brief-${firstError}`)?.focus();
    else setStep(step + 1);
  };
  const submit = (event) => {
    event.preventDefault();
    if (!review) { advance(); return; }
    const firstError = validate(Object.keys(active));
    if (firstError) { setStep(schema.steps.findIndex((part) => part.fields.includes(firstError))); return; }
    if (!form.data.consent || form.processing) return;
    const summary = [serviceLabel(service, language), answers.product, answers.notes].filter(Boolean).join('\n\n');
    form.transform(() => ({
      submission_kind: 'detailed', brief_version: 1, service_type: service,
      client_name: answers.client_name, client_email: answers.client_email,
      project_comment: summary, client_budget: answers.budget ? `${answers.budget} ${answers.currency}` : '',
      brief_data: JSON.stringify(answers), lead_context: JSON.stringify(context), ads_consent: form.data.consent,
    })).post(localizedUrl('/inquiry'), { preserveScroll: true, onSuccess: () => { clear(); } });
  };
  const renderField = (key) => {
    const field = active[key];
    if (!field) return null;
    const error = invalid[key] || form.errors[`brief.${key}`] || form.errors[key];
    const props = { id: `brief-${key}`, value: form.data[key] || '', required: Boolean(field.required), placeholder: field.placeholder ? t(field.placeholder) : undefined, onChange: (e) => form.setData(key, e.target.value), 'aria-invalid': Boolean(error), 'aria-describedby': error ? `error-${key}` : undefined };
    return <div className="form-group" key={key}><label htmlFor={props.id}>{t(field.label)}{field.required ? ' *' : ''}</label>
      {field.type === 'select' ? <StartupSelect {...props} onChange={(value) => form.setData(key, value)} ariaLabel={t(field.label)}><option value="">{t(landing.choose)}</option>{field.options.map((value) => <option value={value} key={value}>{t(schema.options[value] || value)}</option>)}</StartupSelect>
        : field.type === 'textarea' ? <AutoGrowingTextarea {...props} rows={4} maxLength={1000} /> : <input {...props} type={field.type || 'text'} maxLength={key === 'client_name' ? 120 : 255} {...(field.type === 'number' ? { min: '0.01', step: '0.01' } : {})} />}
      {error && <p className="account-inline-error" id={`error-${key}`}>{error}</p>}
    </div>;
  };
  return <form className="smart-form ads-brief-form startup-brief" onSubmit={submit}>
    {submitted && <p role="status">{t(landing.success)} <strong>{ticket}</strong></p>}
    <h1>{serviceLabel(service, language)}</h1>
    <p className="startup-brief-note">{t(landing.budgetNote)}</p>
    <p className="inquiry-form-note">{getInquiryUxCopy(language).noAccount}</p>
    <details className="startup-brief-draft"><summary>{t(landing.draft)}</summary><button type="button" className="btn btn-secondary btn-sm" onClick={clear}>{t(landing.clear)}</button></details>
    <div className="startup-brief-progress"><p>{t(landing.step)} {step + 1} / {stepCount + 1} · {t(review ? landing.review : schema.steps[step].title)}</p><progress max={stepCount + 1} value={step + 1} aria-label={t(landing.step)} /></div>
    <h2 ref={title} tabIndex={-1}>{t(review ? landing.review : schema.steps[step].title)}</h2>
    {review ? <><dl>{getStartupBriefRows(answers, language).map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl><label className="ads-consent"><input type="checkbox" required checked={form.data.consent} onChange={(e) => form.setData('consent', e.target.checked)} />{t(landing.consent)}</label></> : schema.steps[step].fields.map(renderField)}
    {Object.keys(form.errors).length > 0 && <div className="account-inline-error" role="alert">{Object.values(form.errors).map((error, i) => <p key={i}>{error}</p>)}</div>}
    <div className="startup-brief-actions">
      {step > 0 && <button type="button" className="btn btn-secondary" disabled={form.processing} onClick={() => setStep(step - 1)}>{t(landing.back)}</button>}
      <button type="submit" className="btn btn-primary" disabled={form.processing}>{t(form.processing ? landing.sending : review ? landing.submit : landing.next)}</button>
    </div>
  </form>;
}
