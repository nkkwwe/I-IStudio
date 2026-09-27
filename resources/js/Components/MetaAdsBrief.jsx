import { useState } from 'react';
import { buildLeadContext, ChoiceGroup } from './GoogleAdsBrief';
import { getMetaAdsCopy, metaOptions } from '../content/metaAdsBrief';

export default function MetaAdsBrief({ language = 'en' }) {
  const t = getMetaAdsCopy(language);
  const [fields, setFields] = useState({});
  const [leadContext] = useState(buildLeadContext);
  const setField = (name, value) => setFields((current) => ({ ...current, [name]: value }));
  const data = { ...fields, platform: 'meta', previous_results: fields.ads_history === 'no' ? '' : fields.previous_results };
  const text = (name, { type = 'text', required = false, multiline = false, placeholder } = {}) => {
    const props = { id: `meta-${name}`, name, value: fields[name] || '', required, placeholder, maxLength: multiline ? 3000 : 255, onChange: (event) => setField(name, event.target.value) };
    return <div className="form-group" key={name}>
      <label htmlFor={props.id}>{t[name]}{required && <span className="req"> *</span>}</label>
      {multiline ? <textarea {...props} rows={3} /> : <input {...props} type={type} maxLength={['client_name', 'phone', 'messenger'].includes(name) ? 120 : 255} />}
    </div>;
  };
  const choices = (name, multiple = false, exclusive = null) => <ChoiceGroup
    title={t[name]} name={`meta-${name}`} options={metaOptions[name]} labels={t} multiple={multiple} value={fields[name] || (multiple ? [] : '')}
    onChange={(key) => {
      if (!multiple) return setField(name, key);
      setFields((current) => {
        const values = current[name] || [];
        const next = values.includes(key) ? values.filter((item) => item !== key) : key === exclusive ? [key] : [...values.filter((item) => item !== exclusive), key];
        return { ...current, [name]: next };
      });
    }}
  />;

  return <div className="ads-brief-form meta-ads-brief">
    <div className="ads-brief-intro">
      <span className="calculator-kicker">{t.eyebrow}</span>
      <h2>{t.title}</h2>
      <p>{t.description}</p>
    </div>
    <input type="hidden" name="brief_data" value={JSON.stringify(data)} readOnly />
    <input type="hidden" name="lead_context" value={JSON.stringify(leadContext)} readOnly />
    <input type="hidden" name="client_contact" value={[fields.phone, fields.messenger].filter(Boolean).join(' | ')} readOnly />
    <input type="hidden" name="client_budget" value={t[fields.monthly_budget] || ''} readOnly />
    <input type="hidden" name="project_comment" value={['Meta Ads — Facebook & Instagram', fields.promoted_offer, fields.additional_comments].filter(Boolean).join('\n\n')} readOnly />

    <fieldset className="ads-brief-section"><legend>{t.company}</legend>
      <div className="form-grid-2 inquiry-form-grid">{text('brand_name', { required: true })}{text('website_url', { type: 'url', placeholder: 'https://' })}</div>
      {choices('business_type')}{text('business_description', { multiline: true })}
    </fieldset>
    <fieldset className="ads-brief-section"><legend>{t.offer}</legend>
      {text('promoted_offer', { multiline: true })}
      <div className="form-grid-2 inquiry-form-grid">{text('promoted_url', { type: 'url', placeholder: 'https://' })}{text('average_order_value')}</div>
      {text('advantage', { multiline: true })}{text('special_offer')}
    </fieldset>
    <fieldset className="ads-brief-section"><legend>{t.audience}</legend>
      <div className="form-grid-2 inquiry-form-grid">{text('locations')}{text('advertising_languages')}</div>
      {text('audience_description', { multiline: true })}{text('competitors', { multiline: true })}
    </fieldset>
    <fieldset className="ads-brief-section"><legend>{t.goals}</legend>
      {choices('main_goal')}{choices('destinations', true, 'advice')}{text('monthly_result')}
    </fieldset>
    <fieldset className="ads-brief-section"><legend>{t.budget}</legend>
      {choices('monthly_budget')}<p className="ads-brief-note">{t.budgetNote}</p>
      {choices('launch_timing')}{choices('ads_history')}
      {['now', 'before'].includes(fields.ads_history) && text('previous_results', { multiline: true })}
    </fieldset>
    <fieldset className="ads-brief-section"><legend>{t.assets}</legend>
      <div className="form-grid-2 inquiry-form-grid">{text('facebook_page', { placeholder: 'https://facebook.com/…' })}{text('instagram_profile', { placeholder: '@…' })}</div>
      {choices('available_assets', true, 'none')}{choices('creative_support')}{text('materials_url', { type: 'url', placeholder: 'https://' })}
      <p className="ads-brief-note">{t.assetsNote}</p>
    </fieldset>
    <fieldset className="ads-brief-section"><legend>{t.contacts}</legend>
      <div className="form-grid-2 inquiry-form-grid">{text('client_name', { required: true })}{text('client_email', { type: 'email', required: true })}{text('phone', { type: 'tel' })}{text('messenger')}</div>
      {choices('contact_method')}{text('additional_comments', { multiline: true })}
      <label className="ads-consent"><input type="checkbox" name="ads_consent" value="1" checked={Boolean(fields.consent)} onChange={(event) => setField('consent', event.target.checked)} required />{t.consent}</label>
    </fieldset>
  </div>;
}
