// Stable field and option keys are stored with the inquiry; labels follow the site language.
const strings = {
  en: {
    pageTitle: 'Launch Meta Ads', eyebrow: '[ META ADS BRIEF / 5–10 MIN ]', title: 'Find your customers on Facebook and Instagram',
    description: 'Tell us about your business and goals. We will help with the audience, creatives and technical setup.',
    note: 'Answer what you know. You can skip optional questions — we will work through them together.',
    company: '1. About your business', offer: '2. Your offer', audience: '3. Audience and geography', goals: '4. Goals and customer journey', budget: '5. Budget and launch', assets: '6. Pages and creatives', contacts: '7. Contact details',
    brand_name: 'Company / brand name', website_url: 'Website (if you have one)', business_type: 'What kind of business is this?', business_description: 'What does your business do?',
    promoted_offer: 'Which products or services should we promote?', promoted_url: 'Product, service or catalogue link', average_order_value: 'Average order value and currency', advantage: 'Why do customers choose you?', special_offer: 'Promotion or special offer (if any)',
    locations: 'Countries / cities where you want customers', advertising_languages: 'Advertising languages', audience_description: 'Describe your ideal customer', competitors: 'Competitors or accounts you like (optional)',
    main_goal: 'What is the main result you want?', destinations: 'Where should customers contact you or buy?', monthly_result: 'Desired number of sales / enquiries per month (if known)',
    monthly_budget: 'Monthly advertising budget', budgetNote: 'This is the media budget paid to Meta. Management and creative production are discussed separately.', launch_timing: 'When would you like to start?', ads_history: 'Have you advertised on Facebook or Instagram before?', previous_results: 'Previous budget, results and what you would like to improve',
    facebook_page: 'Facebook business page', instagram_profile: 'Instagram business profile', available_assets: 'What materials do you already have?', creative_support: 'Do you need help with creatives?', materials_url: 'Link to materials or examples (optional)', assetsNote: 'No website or ready creatives yet? That is fine — tell us what you have. No passwords or account access are needed here.',
    client_name: 'Name', client_email: 'Email', phone: 'Phone (optional)', messenger: 'Telegram / WhatsApp (optional)', contact_method: 'Preferred contact method', additional_comments: 'Anything else we should know?', consent: 'I agree to personal data processing',
    store: 'Online store', services: 'Services', local: 'Local business', b2b: 'B2B', other: 'Other', sales: 'Sales', leads: 'Enquiries / bookings', messages: 'Messages', awareness: 'Brand awareness', followers: 'Audience growth', advice: 'Help me choose',
    website: 'Website / online store', instagram: 'Instagram Direct', messengerChat: 'Facebook Messenger', whatsapp: 'WhatsApp', leadForm: 'Contact form in the ad',
    budget300: 'Up to $300', budget500: '$300–500', budget1000: '$500–1,000', budget2000: '$1,000–2,000', budgetMore: '$2,000+', undecided: 'Not decided yet',
    asap: 'As soon as possible', week: 'Within a week', month: 'Within a month', researching: 'Just researching', no: 'Not yet', now: 'Yes, running now', before: 'Yes, previously',
    photos: 'Product / service photos', videos: 'Videos / Reels', branding: 'Logo and brand guidelines', reviews: 'Customer reviews / content', none: 'No materials yet', ready: 'Creatives are ready', adapt: 'Adapt existing materials', create: 'Create from scratch', email: 'Email', phoneCall: 'Phone', telegram: 'Telegram',
  },
  uk: {
    pageTitle: 'Запуск Meta Ads', eyebrow: '[ БРИФ META ADS / 5–10 ХВ ]', title: 'Знайдемо ваших клієнтів у Facebook та Instagram',
    description: 'Розкажіть про бізнес і цілі. Допоможемо з аудиторією, креативами та технічними налаштуваннями.',
    note: 'Відповідайте на те, що знаєте. Необов’язкові питання можна пропустити — розберемося разом.',
    company: '1. Про ваш бізнес', offer: '2. Ваша пропозиція', audience: '3. Аудиторія та географія', goals: '4. Цілі та шлях клієнта', budget: '5. Бюджет і запуск', assets: '6. Сторінки та креативи', contacts: '7. Контактні дані',
    brand_name: 'Назва компанії / бренду', website_url: 'Сайт (якщо є)', business_type: 'Чим займається ваш бізнес?', business_description: 'Коротко про ваш бізнес',
    promoted_offer: 'Які товари або послуги просуваємо?', promoted_url: 'Посилання на товар, послугу або каталог', average_order_value: 'Середній чек і валюта', advantage: 'Чому клієнти обирають вас?', special_offer: 'Акція або спеціальна пропозиція (якщо є)',
    locations: 'Країни / міста, де хочете отримувати клієнтів', advertising_languages: 'Мови реклами', audience_description: 'Опишіть свого ідеального клієнта', competitors: 'Конкуренти або акаунти, які подобаються (необов’язково)',
    main_goal: 'Який головний результат ви хочете отримати?', destinations: 'Де клієнтам зручно звертатися або купувати?', monthly_result: 'Бажана кількість продажів / звернень на місяць (якщо знаєте)',
    monthly_budget: 'Рекламний бюджет на місяць', budgetNote: 'Це бюджет на показ реклами в Meta. Ведення реклами та створення креативів обговорюємо окремо.', launch_timing: 'Коли хочете почати?', ads_history: 'Чи запускали рекламу у Facebook або Instagram?', previous_results: 'Попередній бюджет, результати та що хочете покращити',
    facebook_page: 'Бізнес-сторінка Facebook', instagram_profile: 'Бізнес-профіль Instagram', available_assets: 'Які матеріали вже є?', creative_support: 'Чи потрібна допомога з креативами?', materials_url: 'Посилання на матеріали або приклади (необов’язково)', assetsNote: 'Ще немає сайту чи готових креативів? Розкажіть, що вже є. Паролі та доступи до акаунтів тут не потрібні.',
    client_name: 'Ім’я', client_email: 'Email', phone: 'Телефон (необов’язково)', messenger: 'Telegram / WhatsApp (необов’язково)', contact_method: 'Як зручніше зв’язатися?', additional_comments: 'Коментар / додаткові побажання', consent: 'Погоджуюсь на обробку персональних даних',
    store: 'Інтернет-магазин', services: 'Послуги', local: 'Локальний бізнес', b2b: 'B2B', other: 'Інше', sales: 'Продажі', leads: 'Заявки / бронювання', messages: 'Повідомлення', awareness: 'Впізнаваність бренду', followers: 'Зростання аудиторії', advice: 'Допоможіть обрати',
    website: 'Сайт / інтернет-магазин', instagram: 'Instagram Direct', messengerChat: 'Facebook Messenger', whatsapp: 'WhatsApp', leadForm: 'Форма заявки в рекламі',
    budget300: 'До $300', budget500: '$300–500', budget1000: '$500–1 000', budget2000: '$1 000–2 000', budgetMore: '$2 000+', undecided: 'Поки не визначився',
    asap: 'Якнайшвидше', week: 'Протягом тижня', month: 'Протягом місяця', researching: 'Поки вивчаю варіанти', no: 'Ще ні', now: 'Так, працює зараз', before: 'Так, запускали раніше',
    photos: 'Фото товарів / послуг', videos: 'Відео / Reels', branding: 'Логотип і фірмовий стиль', reviews: 'Відгуки / контент клієнтів', none: 'Матеріалів ще немає', ready: 'Креативи вже готові', adapt: 'Адаптувати наявні матеріали', create: 'Створити з нуля', email: 'Email', phoneCall: 'Телефон', telegram: 'Telegram',
  },
  ro: {
    pageTitle: 'Lansare Meta Ads', eyebrow: '[ BRIEF META ADS / 5–10 MIN ]', title: 'Găsim clienții tăi pe Facebook și Instagram',
    description: 'Povestește-ne despre afacere și obiective. Te ajutăm cu audiența, materialele și configurarea tehnică.',
    note: 'Răspunde la ce știi. Poți sări peste întrebările opționale — le clarificăm împreună.',
    company: '1. Despre afacere', offer: '2. Oferta ta', audience: '3. Audiență și geografie', goals: '4. Obiective și parcursul clientului', budget: '5. Buget și lansare', assets: '6. Pagini și materiale', contacts: '7. Date de contact',
    brand_name: 'Numele companiei / brandului', website_url: 'Site (dacă există)', business_type: 'Ce tip de afacere ai?', business_description: 'Descrie pe scurt afacerea',
    promoted_offer: 'Ce produse sau servicii promovăm?', promoted_url: 'Link către produs, serviciu sau catalog', average_order_value: 'Valoarea medie a comenzii și moneda', advantage: 'De ce te aleg clienții?', special_offer: 'Promoție sau ofertă specială (dacă există)',
    locations: 'Țări / orașe în care vrei clienți', advertising_languages: 'Limbile reclamelor', audience_description: 'Descrie clientul ideal', competitors: 'Concurenți sau conturi care îți plac (opțional)',
    main_goal: 'Care este rezultatul principal dorit?', destinations: 'Unde pot clienții să te contacteze sau să cumpere?', monthly_result: 'Numărul dorit de vânzări / solicitări lunar (dacă îl știi)',
    monthly_budget: 'Bugetul lunar pentru reclame', budgetNote: 'Acesta este bugetul plătit către Meta pentru afișarea reclamelor. Administrarea și producția materialelor se discută separat.', launch_timing: 'Când vrei să începi?', ads_history: 'Ai rulat reclame pe Facebook sau Instagram?', previous_results: 'Bugetul anterior, rezultatele și ce ai dori să îmbunătățești',
    facebook_page: 'Pagina de business Facebook', instagram_profile: 'Profilul de business Instagram', available_assets: 'Ce materiale ai deja?', creative_support: 'Ai nevoie de ajutor cu materialele?', materials_url: 'Link către materiale sau exemple (opțional)', assetsNote: 'Încă nu ai site sau materiale? Spune-ne ce ai deja. Nu avem nevoie de parole sau acces la conturi aici.',
    client_name: 'Nume', client_email: 'Email', phone: 'Telefon (opțional)', messenger: 'Telegram / WhatsApp (opțional)', contact_method: 'Cum preferi să te contactăm?', additional_comments: 'Comentarii / alte preferințe', consent: 'Sunt de acord cu prelucrarea datelor personale',
    store: 'Magazin online', services: 'Servicii', local: 'Afacere locală', b2b: 'B2B', other: 'Altele', sales: 'Vânzări', leads: 'Solicitări / rezervări', messages: 'Mesaje', awareness: 'Notorietatea brandului', followers: 'Creșterea audienței', advice: 'Ajutați-mă să aleg',
    website: 'Site / magazin online', instagram: 'Instagram Direct', messengerChat: 'Facebook Messenger', whatsapp: 'WhatsApp', leadForm: 'Formular de contact în reclamă',
    budget300: 'Până la $300', budget500: '$300–500', budget1000: '$500–1.000', budget2000: '$1.000–2.000', budgetMore: '$2.000+', undecided: 'Încă nu am decis',
    asap: 'Cât mai curând', week: 'Într-o săptămână', month: 'Într-o lună', researching: 'Explorez opțiunile', no: 'Încă nu', now: 'Da, rulează acum', before: 'Da, în trecut',
    photos: 'Fotografii produse / servicii', videos: 'Videoclipuri / Reels', branding: 'Logo și identitate vizuală', reviews: 'Recenzii / conținut de la clienți', none: 'Încă nu am materiale', ready: 'Materialele sunt gata', adapt: 'Adaptarea materialelor existente', create: 'Creare de la zero', email: 'Email', phoneCall: 'Telefon', telegram: 'Telegram',
  },
};

export const metaOptions = {
  business_type: ['store', 'services', 'local', 'b2b', 'other'],
  main_goal: ['sales', 'leads', 'messages', 'awareness', 'followers', 'advice'],
  destinations: ['website', 'instagram', 'messengerChat', 'whatsapp', 'leadForm', 'advice'],
  monthly_budget: ['budget300', 'budget500', 'budget1000', 'budget2000', 'budgetMore', 'undecided'],
  launch_timing: ['asap', 'week', 'month', 'researching'],
  ads_history: ['no', 'now', 'before'],
  available_assets: ['photos', 'videos', 'branding', 'reviews', 'none'],
  creative_support: ['ready', 'adapt', 'create', 'advice'],
  contact_method: ['email', 'phoneCall', 'telegram', 'whatsapp'],
};

export function getMetaAdsCopy(language) {
  return strings[language] || strings.en;
}

export function getMetaBriefRows(data, language) {
  const t = getMetaAdsCopy(language);
  return Object.entries(data).filter(([key, value]) => key !== 'consent' && key !== 'platform' && value !== '' && value != null && (!Array.isArray(value) || value.length > 0))
    .map(([key, value]) => ({
      label: t[key] || key.replaceAll('_', ' '),
      value: metaOptions[key] ? (Array.isArray(value) ? value : [value]).map((item) => t[item] || item).join(', ') : String(value),
    }));
}
