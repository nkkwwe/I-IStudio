import { useMemo, useState } from 'react';

const copy = {
  en: {
    eyebrow: '[ GOOGLE ADS BRIEF / 5–10 MIN ]',
    title: 'Launch Google Ads with a clear plan',
    description: 'Answer what you know. We will check the technical details ourselves.',
    company: '1. About the company',
    offer: '2. What are we promoting?',
    audience: '3. Where and to whom do we sell?',
    goal: '4. Advertising goal',
    budget: '5. Advertising budget',
    current: '6. What do you already have?',
    contacts: '7. Contacts and start',
    brand: 'Company / brand name',
    website: 'Website',
    businessType: 'What kind of business is this?',
    businessDescription: 'Briefly describe what you sell',
    productType: 'What exactly should we promote?',
    productLink: 'Product, service or catalogue URL',
    averageOrder: 'Average order value',
    advantage: 'Your main advantage over competitors',
    specialOffers: 'Do you have any special offers?',
    locations: 'Countries / cities where you want customers',
    adLanguage: 'Advertising language',
    mainClient: 'Who is your main customer?',
    age: 'Audience age',
    goals: 'What do you want to get from Google Ads?',
    mainResult: 'What is the most important result?',
    monthlyResult: 'How many sales / leads do you want per month?',
    acceptableCpa: 'What lead / customer cost is acceptable?',
    doNotKnow: 'I do not know',
    monthlyBudget: 'Planned monthly advertising budget',
    launch: 'When do you want to launch?',
    adsHistory: 'Have you run Google Ads before?',
    oldSpend: 'How much did you spend approximately per month?',
    oldResult: 'What result did you get?',
    connected: 'What is already connected?',
    skipNote: 'If you do not know — just skip it. We will check it ourselves.',
    name: 'Name',
    companyContact: 'Company',
    phone: 'Phone',
    email: 'Email',
    messenger: 'Telegram / WhatsApp',
    contactMethod: 'How is it most convenient to contact you?',
    comments: 'Comment / additional wishes',
    consent: 'I agree to personal data processing',
    store: 'Online store', services: 'Services', b2b: 'B2B', local: 'Local business', other: 'Other',
    productCategories: 'Product categories', concreteProducts: 'Specific products', allProducts: 'Entire catalogue',
    serviceList: 'Choose services from a list / add manually',
    discount: 'Discount', freeDelivery: 'Free delivery', installment: 'Installment', promotion: 'Promotion', gift: 'Gift', noOffer: 'No special offer',
    private: 'Individuals', smallBusiness: 'Small business', mediumBusiness: 'Medium / large business',
    age18: '18–24', age25: '25–34', age35: '35–44', age45: '45–54', age55: '55+', anyAge: 'No matter',
    sales: 'Sales', leads: 'Leads', calls: 'Calls', bookings: 'Bookings', visits: 'Store visits', otherGoal: 'Other',
    budget300: 'Up to $300', budget500: '$300–500', budget1000: '$500–1,000', budget2000: '$1,000–2,000', budget5000: '$2,000–5,000', budgetMore: '$5,000+', budgetUnknown: 'Not decided yet',
    asap: 'As soon as possible', week: 'Within a week', month: 'Within a month', researching: 'Just researching',
    no: 'No', now: 'Yes, it is running now', before: 'Yes, it ran before',
    analytics: 'Google Analytics 4', tagManager: 'Google Tag Manager', ads: 'Google Ads', merchant: 'Google Merchant Center', businessProfile: 'Google Business Profile', crm: 'CRM', nothing: 'Nothing',
    telegram: 'Telegram', whatsapp: 'WhatsApp', phoneMethod: 'Phone', emailMethod: 'Email',
  },
  uk: {
    eyebrow: '[ БРИФ GOOGLE ADS / 5–10 ХВ ]',
    title: 'Запустимо Google Ads з чітким планом',
    description: 'Відповідайте на те, що знаєте. Технічні речі ми перевіримо самі.',
    company: '1. Про компанію', offer: '2. Що рекламуємо?', audience: '3. Де й кому продаємо?', goal: '4. Мета реклами', budget: '5. Рекламний бюджет', current: '6. Що вже є?', contacts: '7. Контакти та старт',
    brand: 'Назва компанії / бренду', website: 'Сайт', businessType: 'Чим займається ваш бізнес?', businessDescription: 'Коротко опишіть, що ви продаєте', productType: 'Що саме хочете просувати?', productLink: 'Посилання на товар, послугу або каталог', averageOrder: 'Середній чек', advantage: 'Ваше головне перевага перед конкурентами', specialOffers: 'Чи є спеціальні пропозиції?', locations: 'Країни / міста, де хочете отримувати клієнтів', adLanguage: 'Мова реклами', mainClient: 'Хто ваш основний клієнт?', age: 'Вік аудиторії', goals: 'Що хочете отримати від Google Ads?', mainResult: 'Що для вас є головним результатом?', monthlyResult: 'Скільки продажів / заявок хочете отримувати на місяць?', acceptableCpa: 'Яку вартість заявки / клієнта вважаєте прийнятною?', doNotKnow: 'Не знаю', monthlyBudget: 'Планований рекламний бюджет на місяць', launch: 'Коли хочете запустити рекламу?', adsHistory: 'Запускали Google Ads раніше?', oldSpend: 'Скільки приблизно витрачали на місяць?', oldResult: 'Який результат отримували?', connected: 'Що вже підключено?', skipNote: 'Якщо не знаєте — просто пропустіть. Ми перевіримо самостійно.', name: 'Ім’я', companyContact: 'Компанія', phone: 'Телефон', email: 'Email', messenger: 'Telegram / WhatsApp', contactMethod: 'Як зручніше зв’язатися?', comments: 'Коментар / додаткові побажання', consent: 'Погоджуюсь на обробку персональних даних',
    store: 'Інтернет-магазин', services: 'Послуги', b2b: 'B2B', local: 'Локальний бізнес', other: 'Інше', productCategories: 'Категорії товарів', concreteProducts: 'Конкретні товари', allProducts: 'Весь асортимент', serviceList: 'Обрати послуги зі списку / додати вручну', discount: 'Знижка', freeDelivery: 'Безкоштовна доставка', installment: 'Розстрочка', promotion: 'Акція', gift: 'Подарунок', noOffer: 'Немає спеціальної пропозиції', private: 'Приватні клієнти', smallBusiness: 'Малий бізнес', mediumBusiness: 'Середній / великий бізнес', age18: '18–24', age25: '25–34', age35: '35–44', age45: '45–54', age55: '55+', anyAge: 'Не має значення', sales: 'Продажі', leads: 'Заявки', calls: 'Дзвінки', bookings: 'Записи / бронювання', visits: 'Відвідування магазину', otherGoal: 'Інше', budget300: 'До $300', budget500: '$300–500', budget1000: '$500–1 000', budget2000: '$1 000–2 000', budget5000: '$2 000–5 000', budgetMore: '$5 000+', budgetUnknown: 'Поки не визначився', asap: 'Якнайшвидше', week: 'Протягом тижня', month: 'Протягом місяця', researching: 'Поки вивчаю варіанти', no: 'Ні', now: 'Так, працює зараз', before: 'Так, працювала раніше', analytics: 'Google Analytics 4', tagManager: 'Google Tag Manager', ads: 'Google Ads', merchant: 'Google Merchant Center', businessProfile: 'Google Business Profile', crm: 'CRM', nothing: 'Нічого', telegram: 'Telegram', whatsapp: 'WhatsApp', phoneMethod: 'Телефон', emailMethod: 'Email',
  },
};

const optionKeys = {
  businessTypes: ['store', 'services', 'b2b', 'local', 'other'],
  productScopes: ['productCategories', 'concreteProducts', 'allProducts'],
  offers: ['discount', 'freeDelivery', 'installment', 'promotion', 'gift', 'noOffer'],
  languages: ['ukrainian', 'russian', 'english', 'romanian', 'polish', 'otherLanguage'],
  clients: ['private', 'smallBusiness', 'mediumBusiness'],
  ages: ['age18', 'age25', 'age35', 'age45', 'age55', 'anyAge'],
  goals: ['sales', 'leads', 'calls', 'bookings', 'visits', 'otherGoal'],
  budgets: ['budget300', 'budget500', 'budget1000', 'budget2000', 'budget5000', 'budgetMore', 'budgetUnknown'],
  launch: ['asap', 'week', 'month', 'researching'],
  adsHistory: ['no', 'now', 'before'],
  tools: ['analytics', 'tagManager', 'ads', 'merchant', 'businessProfile', 'crm', 'nothing'],
  contactMethods: ['telegram', 'whatsapp', 'phoneMethod', 'emailMethod'],
};

const languageLabels = {
  ukrainian: { en: 'Ukrainian', uk: 'Українська' }, russian: { en: 'Russian', uk: 'Російська' }, english: { en: 'English', uk: 'Англійська' },
  romanian: { en: 'Romanian', uk: 'Румунська' }, polish: { en: 'Polish', uk: 'Польська' }, otherLanguage: { en: 'Other', uk: 'Інша' },
};

function buildLeadContext() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  params.forEach((value, key) => {
    if (key.toLowerCase().startsWith('utm_')) utm[key] = value;
  });

  const referrer = document.referrer || '';
  let source = utm.utm_source || 'Direct';
  if (!utm.utm_source && referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      source = host.includes('google') ? 'Google' : host.includes('facebook') ? 'Facebook' : host.includes('instagram') ? 'Instagram' : 'Organic';
    } catch {
      source = 'Organic';
    }
  }

  return {
    source,
    utm,
    device: window.innerWidth < 768 ? 'mobile' : 'desktop',
    landing_page: window.location.href,
    captured_at: new Date().toISOString(),
  };
}

function ChoiceGroup({ title, name = title, options, value, onChange, multiple = false, labels }) {
  return (
    <div className="ads-choice-group">
      {title && <h4>{title}</h4>}
      <div className="ads-choice-grid">
        {options.map((key) => {
          const checked = multiple ? value.includes(key) : value === key;
          const label = labels[key] ?? key;

          return (
            <label className={`ads-choice${checked ? ' selected' : ''}`} key={key}>
              <input type={multiple ? 'checkbox' : 'radio'} name={multiple ? `${name}-multiple` : name} value={key} checked={checked} onChange={() => onChange(key)} />
              <span className="ads-choice-mark" aria-hidden="true">{checked ? '✓' : ''}</span>
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function TextField({ label, name, value, onChange, type = 'text', placeholder, required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={`ads-${name}`}>{label}{required && <span className="req"> *</span>}</label>
      <input id={`ads-${name}`} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  );
}

export default function GoogleAdsBrief({ language = 'en' }) {
  const t = copy[language] || copy.en;
  const [fields, setFields] = useState({
    brand_name: '', website_url: '', business_type: '', business_description: '', promoted_url: '', average_order_value: '', advantage: '', locations: '', monthly_result: '', acceptable_cpa: '', old_spend: '', old_result: '', name: '', company_name: '', phone: '', email: '', messenger: '', additional_comments: '',
  });
  const [productScope, setProductScope] = useState([]);
  const [serviceScope, setServiceScope] = useState('');
  const [offers, setOffers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [clientType, setClientType] = useState('');
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState([]);
  const [mainResult, setMainResult] = useState('');
  const [cpaUnknown, setCpaUnknown] = useState(false);
  const [budget, setBudget] = useState('');
  const [launch, setLaunch] = useState('');
  const [adsHistory, setAdsHistory] = useState('');
  const [tools, setTools] = useState([]);
  const [contactMethod, setContactMethod] = useState('');
  const [consent, setConsent] = useState(false);
  const [leadContext] = useState(buildLeadContext);

  const setField = (name) => (event) => setFields((current) => ({ ...current, [name]: event.target.value }));
  const toggleValue = (setter, key, exclusive = null) => {
    setter((current) => {
      if (exclusive && key === exclusive) return current.includes(key) ? [] : [key];
      if (exclusive && current.includes(exclusive)) return [...current.filter((item) => item !== exclusive), key];
      return current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
    });
  };
  const labels = useMemo(() => Object.fromEntries(Object.entries(languageLabels).map(([key, values]) => [key, values[language] ?? values.en])), [language]);
  const data = {
    ...fields,
    product_scope: productScope,
    service_scope: serviceScope,
    special_offers: offers,
    advertising_languages: languages,
    main_client: clientType,
    audience_age: age,
    goals,
    main_result: mainResult,
    acceptable_cpa_unknown: cpaUnknown,
    monthly_budget: budget,
    launch_timing: launch,
    ads_history: adsHistory,
    connected_tools: tools,
    contact_method: contactMethod,
    consent,
  };
  const clientContact = [fields.phone && `Phone: ${fields.phone}`, fields.messenger && `Messenger: ${fields.messenger}`].filter(Boolean).join(' | ');
  const projectComment = [
    'Google Ads brief submitted via seven-block form.',
    fields.additional_comments ? `Additional comments: ${fields.additional_comments}` : '',
  ].filter(Boolean).join('\n');

  const updateBusinessType = (key) => {
    setFields((current) => ({ ...current, business_type: key }));
    if (key === 'store') setServiceScope('');
    else setProductScope([]);
  };

  return (
    <div className="ads-brief-form">
      <div className="ads-brief-intro">
        <span className="calculator-kicker">{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.description}</p>
      </div>
      <input type="hidden" name="client_contact" value={clientContact} readOnly />
      <input type="hidden" name="client_budget" value={budget ? t[budget] ?? budget : ''} readOnly />
      <input type="hidden" name="brief_data" value={JSON.stringify(data)} readOnly />
      <input type="hidden" name="lead_context" value={JSON.stringify(leadContext)} readOnly />
      <input type="hidden" name="project_comment" value={projectComment} readOnly />

      <fieldset className="ads-brief-section">
        <legend>{t.company}</legend>
        <div className="form-grid-2 inquiry-form-grid">
          <TextField label={t.brand} name="brand_name" value={fields.brand_name} onChange={setField('brand_name')} required />
          <TextField label={t.website} name="website_url" type="url" value={fields.website_url} onChange={setField('website_url')} placeholder="https://" />
        </div>
        <ChoiceGroup title={t.businessType} name="business_type" options={optionKeys.businessTypes} value={fields.business_type} onChange={updateBusinessType} labels={Object.fromEntries(optionKeys.businessTypes.map((key) => [key, t[key]]))} />
        <div className="form-group"><label htmlFor="ads-business-description">{t.businessDescription}</label><textarea id="ads-business-description" name="business_description" rows={3} value={fields.business_description} onChange={setField('business_description')} /></div>
      </fieldset>

      <fieldset className="ads-brief-section">
        <legend>{t.offer}</legend>
        <ChoiceGroup title={t.productType} name="product_scope" options={fields.business_type === 'store' ? optionKeys.productScopes : []} value={productScope} onChange={(key) => toggleValue(setProductScope, key)} multiple labels={Object.fromEntries(optionKeys.productScopes.map((key) => [key, t[key]]))} />
        {fields.business_type !== 'store' && <TextField label={t.productType} name="service_scope" value={serviceScope} onChange={(event) => setServiceScope(event.target.value)} placeholder={t.serviceList} />}
        <div className="form-grid-2 inquiry-form-grid">
          <TextField label={t.productLink} name="promoted_url" type="url" value={fields.promoted_url} onChange={setField('promoted_url')} placeholder="https://" />
          <TextField label={t.averageOrder} name="average_order_value" value={fields.average_order_value} onChange={setField('average_order_value')} />
        </div>
        <TextField label={t.advantage} name="advantage" value={fields.advantage} onChange={setField('advantage')} />
        <ChoiceGroup title={t.specialOffers} name="special_offers" options={optionKeys.offers} value={offers} onChange={(key) => toggleValue(setOffers, key, 'noOffer')} multiple labels={Object.fromEntries(['discount', 'freeDelivery', 'installment', 'promotion', 'gift', 'noOffer'].map((key) => [key, t[key]]))} />
      </fieldset>

      <fieldset className="ads-brief-section">
        <legend>{t.audience}</legend>
        <TextField label={t.locations} name="locations" value={fields.locations} onChange={setField('locations')} placeholder="Ukraine, Kyiv, ..." />
        <ChoiceGroup title={t.adLanguage} options={optionKeys.languages} value={languages} onChange={(key) => toggleValue(setLanguages, key)} multiple labels={labels} />
        <ChoiceGroup title={t.mainClient} options={optionKeys.clients} value={clientType} onChange={setClientType} labels={Object.fromEntries(optionKeys.clients.map((key) => [key, t[key]]))} />
        <ChoiceGroup title={t.age} options={optionKeys.ages} value={age} onChange={setAge} labels={Object.fromEntries(optionKeys.ages.map((key) => [key, t[key]]))} />
      </fieldset>

      <fieldset className="ads-brief-section">
        <legend>{t.goal}</legend>
        <ChoiceGroup title={t.goals} options={optionKeys.goals} value={goals} onChange={(key) => toggleValue(setGoals, key)} multiple labels={Object.fromEntries(optionKeys.goals.map((key) => [key, t[key]]))} />
        <ChoiceGroup title={t.mainResult} options={optionKeys.goals} value={mainResult} onChange={setMainResult} labels={Object.fromEntries(optionKeys.goals.map((key) => [key, t[key]]))} />
        <div className="form-grid-2 inquiry-form-grid">
          <TextField label={t.monthlyResult} name="monthly_result" value={fields.monthly_result} onChange={setField('monthly_result')} />
          <div className="form-group"><label htmlFor="ads-acceptable-cpa">{t.acceptableCpa}</label><input id="ads-acceptable-cpa" name="acceptable_cpa" value={cpaUnknown ? '' : fields.acceptable_cpa} onChange={setField('acceptable_cpa')} disabled={cpaUnknown} /><label className="ads-inline-check"><input type="checkbox" checked={cpaUnknown} onChange={() => setCpaUnknown((current) => !current)} />{t.doNotKnow}</label></div>
        </div>
      </fieldset>

      <fieldset className="ads-brief-section">
        <legend>{t.budget}</legend>
        <ChoiceGroup title={t.monthlyBudget} options={optionKeys.budgets} value={budget} onChange={setBudget} labels={Object.fromEntries(optionKeys.budgets.map((key) => [key, t[key]]))} />
        <ChoiceGroup title={t.launch} options={optionKeys.launch} value={launch} onChange={setLaunch} labels={Object.fromEntries(optionKeys.launch.map((key) => [key, t[key]]))} />
      </fieldset>

      <fieldset className="ads-brief-section">
        <legend>{t.current}</legend>
        <ChoiceGroup title={t.adsHistory} options={optionKeys.adsHistory} value={adsHistory} onChange={setAdsHistory} labels={Object.fromEntries(optionKeys.adsHistory.map((key) => [key, t[key]]))} />
        {adsHistory && adsHistory !== 'no' && <div className="form-grid-2 inquiry-form-grid"><TextField label={t.oldSpend} name="old_spend" value={fields.old_spend} onChange={setField('old_spend')} /><TextField label={t.oldResult} name="old_result" value={fields.old_result} onChange={setField('old_result')} /></div>}
        <ChoiceGroup title={t.connected} options={optionKeys.tools} value={tools} onChange={(key) => toggleValue(setTools, key, 'nothing')} multiple labels={Object.fromEntries(optionKeys.tools.map((key) => [key, t[key]]))} />
        <p className="ads-brief-note">{t.skipNote}</p>
      </fieldset>

      <fieldset className="ads-brief-section">
        <legend>{t.contacts}</legend>
        <div className="form-grid-2 inquiry-form-grid">
          <TextField label={t.name} name="client_name" value={fields.name} onChange={setField('name')} required />
          <TextField label={t.companyContact} name="company_name" value={fields.company_name} onChange={setField('company_name')} />
          <TextField label={t.phone} name="phone" type="tel" value={fields.phone} onChange={setField('phone')} />
          <TextField label={t.email} name="client_email" type="email" value={fields.email} onChange={setField('email')} required />
          <TextField label={t.messenger} name="messenger" value={fields.messenger} onChange={setField('messenger')} />
        </div>
        <ChoiceGroup title={t.contactMethod} options={optionKeys.contactMethods} value={contactMethod} onChange={setContactMethod} labels={Object.fromEntries(optionKeys.contactMethods.map((key) => [key, t[key]]))} />
        <div className="form-group"><label htmlFor="ads-additional-comments">{t.comments}</label><textarea id="ads-additional-comments" name="ads_additional_comments" rows={4} value={fields.additional_comments} onChange={setField('additional_comments')} /></div>
        <label className="ads-consent"><input type="checkbox" name="ads_consent" value="1" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />{t.consent}</label>
      </fieldset>
    </div>
  );
}
