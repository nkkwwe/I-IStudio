import { landing, translate } from '../content/startupContent';
import { getInquiryUxCopy } from '../content/inquiryUxCopy';

export default function InquiryServiceSelector({ service, language, onChange }) {
  const copy = getInquiryUxCopy(language);
  const website = ['landing', 'corporate', 'redesign'].includes(service);
  const choices = [
    { id: website ? service : 'landing', label: copy.website, selected: website },
    ...['ads', 'meta-ads', 'marketplaces', 'tiktok-ads'].map((id) => ({ id, label: translate(landing.services.find((item) => item.id === id).name, language), selected: service === id })),
    { id: 'consultation', label: language === 'uk' ? 'Консультація' : language === 'ro' ? 'Consultație' : 'Consultation', selected: service === 'consultation' },
    { id: 'other', label: copy.unsure, selected: service === 'other' },
  ];
  return <div className="inquiry-services">
    <p className="inquiry-service-label">{copy.services}</p>
    <div className="service-selector-tabs" id="serviceTabs" role="group" aria-label={copy.services}>
      {choices.map((item) => <button key={item.id} type="button" className={`tab-btn${item.selected ? ' active' : ''}`} aria-pressed={item.selected} onClick={() => onChange(item.id)}>{item.label}</button>)}
    </div>
    {website && <div className="inquiry-website-types" role="group" aria-label={copy.websiteType}>
      {['landing', 'corporate', 'redesign'].map((id) => <button key={id} type="button" className={`tab-btn${service === id ? ' active' : ''}`} aria-pressed={service === id} onClick={() => onChange(id)}>{copy[id]}</button>)}
    </div>}
  </div>;
}
