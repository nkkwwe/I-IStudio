import AccountSiteHeader from '../Components/AccountSiteHeader';
import GoogleAdsBrief from '../Components/GoogleAdsBrief';
import { localizedUrl } from '../content/siteLanguage';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';

const calculatorCopy = {
  en: {
    kicker: '[ PROJECT ESTIMATOR / EXAMPLE ]', openCalculator: 'Build an estimate', closeCalculator: 'Close calculator',
    applyCalculator: 'Apply selection', configured: 'Your selection', included: 'Included', estimate: 'Example estimate',
    selected: 'Estimate details', serviceBase: 'Service', finalNote: 'An initial estimate only. We confirm the final scope and price after reviewing your brief.',
    customEstimate: 'Quote after brief', customPrice: 'To confirm',
    serviceNames: { landing: 'Landing page', corporate: 'Business website', redesign: 'Website redesign', consultation: 'Consultation', other: 'Custom request' },
    services: {
      landing: { title: 'Plan your landing page', description: 'Estimate the page size and conversion features you need.', base: 'Landing page design and build', basePrice: 500,
        stepOne: 'Page scope', stepOneDescription: 'Choose an approximate number of content sections.', stepTwo: 'Conversion features', stepTwoDescription: 'Add the pieces that help visitors take action.',
        scope: [{ value: 'compact', label: 'Compact — up to 5 sections', description: 'A focused offer with the key details.', price: 0 }, { value: 'standard', label: 'Standard — 6 to 8 sections', description: 'Room for benefits, process, proof and FAQs.', price: 180 }, { value: 'extended', label: 'Extended — 9 to 12 sections', description: 'More detail for several audiences or offers.', price: 350 }],
        extras: [{ value: 'copy', label: 'Copywriting', description: 'Page copy shaped around your offer.', price: 180 }, { value: 'analytics', label: 'Analytics and conversion tracking', description: 'Measure form submissions and key actions.', price: 100 }, { value: 'integrations', label: 'Lead integrations', description: 'Connect forms to email, CRM or Telegram.', price: 120 }, { value: 'motion', label: 'Custom motion and interactions', description: 'Extra animation beyond the standard interface.', price: 150 }] },
      corporate: { title: 'Scope your business website', description: 'Set the content scale, then add the tools your team will use.', base: 'Business website foundation', basePrice: 900,
        stepOne: 'Website size', stepOneDescription: 'Estimate how much content the first release needs.', stepTwo: 'Team tools', stepTwoDescription: 'Choose the systems and content features to include.',
        scope: [{ value: 'starter', label: 'Starter — up to 5 pages', description: 'Company, services and contact information.', price: 0 }, { value: 'growth', label: 'Growth — 6 to 10 pages', description: 'More service detail, cases and useful pages.', price: 350 }, { value: 'large', label: 'Large — 11 to 20 pages', description: 'A broad company or multi-service structure.', price: 700 }],
        extras: [{ value: 'cms', label: 'Content management', description: 'Edit pages and common content without a developer.', price: 250 }, { value: 'blog', label: 'News or articles section', description: 'Publish updates and expert content.', price: 180 }, { value: 'languages', label: 'Additional language', description: 'Prepare the site structure for one more language.', price: 250 }, { value: 'integrations', label: 'Business integrations', description: 'Connect forms with CRM, email or other tools.', price: 150 }] },
      redesign: { title: 'Plan your website redesign', description: 'Choose how deeply to change the current site and what must be preserved.', base: 'Redesign discovery and implementation', basePrice: 650,
        stepOne: 'Redesign depth', stepOneDescription: 'Start with the level of change you have in mind.', stepTwo: 'Keep and improve', stepTwoDescription: 'Include the migration and quality work your site needs.',
        scope: [{ value: 'visual', label: 'Visual refresh', description: 'Update the look while keeping the current structure.', price: 0 }, { value: 'ux', label: 'UX and visual redesign', description: 'Improve navigation, page flow and visual design.', price: 250 }, { value: 'restructure', label: 'Full restructure', description: 'Rework the site architecture and key user journeys.', price: 500 }],
        extras: [{ value: 'seo', label: 'SEO and URL preservation', description: 'Plan redirects and protect important search pages.', price: 160 }, { value: 'migration', label: 'Content migration', description: 'Move and check existing pages and media.', price: 180 }, { value: 'performance', label: 'Performance improvements', description: 'Review loading speed and prioritize practical fixes.', price: 140 }, { value: 'platform', label: 'Platform or technology migration', description: 'Move the site to a different platform or setup.', price: 300 }] },
      consultation: { title: 'Choose your consultation', description: 'Set the time and preparation that will make the conversation useful.', base: 'Consultation session', basePrice: 100,
        stepOne: 'Session length', stepOneDescription: 'Pick enough time for the questions you have.', stepTwo: 'Preparation and follow-up', stepTwoDescription: 'Add a review or a concrete plan after the call.',
        scope: [{ value: '60', label: 'Focused session — 60 minutes', description: 'Work through one main question or decision.', price: 0 }, { value: '90', label: 'Deep dive — 90 minutes', description: 'Explore a few connected topics in detail.', price: 50 }, { value: '120', label: 'Workshop — 2 hours', description: 'A longer working session for a complex task.', price: 100 }],
        extras: [{ value: 'review', label: 'Review materials in advance', description: 'We study your site, brief or references before the call.', price: 75 }, { value: 'roadmap', label: 'Written action plan', description: 'A concise list of next steps after the session.', price: 90 }, { value: 'followup', label: '30-minute follow-up', description: 'A short follow-up to review progress or questions.', price: 45 }] },
      other: { title: 'Describe your custom project', description: 'Choose the kind of help you need. We will estimate custom work after reviewing the brief.', base: 'Custom project estimate', basePrice: null,
        stepOne: 'Project type', stepOneDescription: 'Pick the closest match. You can explain the details in your brief.', stepTwo: 'What matters most?', stepTwoDescription: 'Select the outcomes or support you would like to discuss.',
        scope: [{ value: 'store', label: 'Online store or catalogue', description: 'Products, services, bookings or online sales.', price: null }, { value: 'webapp', label: 'Web application or client portal', description: 'A custom online tool, dashboard or account area.', price: null }, { value: 'automation', label: 'Automation or integration', description: 'Connect services or reduce repeated manual work.', price: null }, { value: 'unsure', label: 'I need help defining the solution', description: 'I have a goal, but would like a recommendation.', price: null }],
        extras: [{ value: 'strategy', label: 'Help define the scope', description: 'Clarify requirements and the best first release.', price: null }, { value: 'design', label: 'Interface and visual design', description: 'Plan the user experience and look of the product.', price: null }, { value: 'support', label: 'Launch and ongoing support', description: 'Discuss setup, handover or future improvements.', price: null }] },
    },
  },
  uk: {
    kicker: '[ ОЦІНКА ПРОЄКТУ / ПРИКЛАД ]', openCalculator: 'Розрахувати проєкт', closeCalculator: 'Закрити калькулятор',
    applyCalculator: 'Застосувати вибір', configured: 'Ваш вибір', included: 'Включено', estimate: 'Приклад розрахунку',
    selected: 'Деталі оцінки', serviceBase: 'Послуга', finalNote: 'Це попередня оцінка. Фінальні обсяг і ціну підтвердимо після перегляду брифу.',
    customEstimate: 'Після брифу', customPrice: 'Уточнимо',
    serviceNames: { landing: 'Лендинг', corporate: 'Сайт для бізнесу', redesign: 'Редизайн сайту', consultation: 'Консультація', other: 'Індивідуальний запит' },
    services: {
      landing: { title: 'Сплануйте свій лендинг', description: 'Оцініть розмір сторінки та потрібні функції для конверсії.', base: 'Дизайн і розробка лендингу', basePrice: 500,
        stepOne: 'Обсяг сторінки', stepOneDescription: 'Оберіть приблизну кількість змістових блоків.', stepTwo: 'Функції для конверсії', stepTwoDescription: 'Додайте можливості, що допоможуть отримувати звернення.',
        scope: [{ value: 'compact', label: 'Компактний — до 5 блоків', description: 'Сфокусована пропозиція та найважливіша інформація.', price: 0 }, { value: 'standard', label: 'Стандартний — 6–8 блоків', description: 'Переваги, процес, приклади та відповіді на питання.', price: 180 }, { value: 'extended', label: 'Розширений — 9–12 блоків', description: 'Детальна презентація для кількох аудиторій чи пропозицій.', price: 350 }],
        extras: [{ value: 'copy', label: 'Тексти для сторінки', description: 'Тексти, побудовані навколо вашої пропозиції.', price: 180 }, { value: 'analytics', label: 'Аналітика та відстеження конверсій', description: 'Облік надсилань форм та ключових дій.', price: 100 }, { value: 'integrations', label: 'Інтеграції заявок', description: 'Надсилання заявок в email, CRM або Telegram.', price: 120 }, { value: 'motion', label: 'Анімації та інтерактивність', description: 'Додаткові анімації й реакції інтерфейсу.', price: 150 }] },
      corporate: { title: 'Визначте обсяг бізнес-сайту', description: 'Оберіть обсяг матеріалів і потрібні інструменти для команди.', base: 'Основа сайту для бізнесу', basePrice: 900,
        stepOne: 'Розмір сайту', stepOneDescription: 'Оцініть обсяг матеріалів для першого запуску.', stepTwo: 'Інструменти команди', stepTwoDescription: 'Оберіть системи та функції для роботи з контентом.',
        scope: [{ value: 'starter', label: 'Стартовий — до 5 сторінок', description: 'Компанія, послуги та контакти.', price: 0 }, { value: 'growth', label: 'Для зростання — 6–10 сторінок', description: 'Деталі послуг, кейси й корисні сторінки.', price: 350 }, { value: 'large', label: 'Великий — 11–20 сторінок', description: 'Розгалужена структура компанії чи напрямів.', price: 700 }],
        extras: [{ value: 'cms', label: 'Керування контентом', description: 'Самостійно редагуйте сторінки й матеріали.', price: 250 }, { value: 'blog', label: 'Новини або статті', description: 'Публікуйте оновлення та експертні матеріали.', price: 180 }, { value: 'languages', label: 'Додаткова мова', description: 'Підготуйте сайт ще однією мовою.', price: 250 }, { value: 'integrations', label: 'Інтеграції для бізнесу', description: 'Зв’яжіть форми з CRM, email або іншими інструментами.', price: 150 }] },
      redesign: { title: 'Сплануйте редизайн сайту', description: 'Оберіть глибину оновлення та важливі для збереження матеріали.', base: 'Аналіз і впровадження редизайну', basePrice: 650,
        stepOne: 'Глибина редизайну', stepOneDescription: 'Оберіть бажаний рівень змін.', stepTwo: 'Зберегти та покращити', stepTwoDescription: 'Додайте міграцію та перевірки, потрібні вашому сайту.',
        scope: [{ value: 'visual', label: 'Візуальне оновлення', description: 'Оновити вигляд зі збереженням структури.', price: 0 }, { value: 'ux', label: 'Редизайн UX та візуалу', description: 'Покращити навігацію, шлях користувача й дизайн.', price: 250 }, { value: 'restructure', label: 'Повна перебудова', description: 'Оновити структуру сайту та ключові сценарії.', price: 500 }],
        extras: [{ value: 'seo', label: 'Збереження SEO та адрес сторінок', description: 'Спланувати перенаправлення важливих сторінок.', price: 160 }, { value: 'migration', label: 'Перенесення контенту', description: 'Перенести й перевірити сторінки та медіа.', price: 180 }, { value: 'performance', label: 'Покращення швидкості', description: 'Перевірити швидкість і пріоритетні виправлення.', price: 140 }, { value: 'platform', label: 'Перехід на іншу платформу', description: 'Перенести сайт на іншу платформу чи технологію.', price: 300 }] },
      consultation: { title: 'Оберіть формат консультації', description: 'Визначте час і підготовку, потрібні для корисної розмови.', base: 'Консультаційна сесія', basePrice: 100,
        stepOne: 'Тривалість зустрічі', stepOneDescription: 'Оберіть час відповідно до кількості питань.', stepTwo: 'Підготовка та продовження', stepTwoDescription: 'Додайте попередній аналіз або план після розмови.',
        scope: [{ value: '60', label: 'Точкова сесія — 60 хвилин', description: 'Розберемо одне головне питання чи рішення.', price: 0 }, { value: '90', label: 'Детальний розбір — 90 хвилин', description: 'Докладно обговоримо кілька пов’язаних тем.', price: 50 }, { value: '120', label: 'Воркшоп — 2 години', description: 'Робоча сесія для складної задачі.', price: 100 }],
        extras: [{ value: 'review', label: 'Попередній аналіз матеріалів', description: 'До зустрічі вивчимо сайт, бриф або приклади.', price: 75 }, { value: 'roadmap', label: 'Письмовий план дій', description: 'Стислий перелік наступних кроків після зустрічі.', price: 90 }, { value: 'followup', label: 'Додаткова зустріч — 30 хвилин', description: 'Коротко обговоримо прогрес або нові питання.', price: 45 }] },
      other: { title: 'Опишіть свій проєкт', description: 'Оберіть тип задачі. Вартість індивідуальної розробки визначимо після брифу.', base: 'Оцінка індивідуального проєкту', basePrice: null,
        stepOne: 'Тип проєкту', stepOneDescription: 'Оберіть найближчий варіант; деталі можна додати в брифі.', stepTwo: 'Що для вас важливо?', stepTwoDescription: 'Позначте результат або підтримку, які хочете обговорити.',
        scope: [{ value: 'store', label: 'Інтернет-магазин або каталог', description: 'Товари, послуги, бронювання чи онлайн-продажі.', price: null }, { value: 'webapp', label: 'Вебзастосунок або кабінет', description: 'Онлайн-інструмент, панель керування чи особистий кабінет.', price: null }, { value: 'automation', label: 'Автоматизація чи інтеграція', description: 'Поєднання сервісів або скорочення ручної роботи.', price: null }, { value: 'unsure', label: 'Допомога з вибором рішення', description: 'Є мета, але потрібна рекомендація з реалізації.', price: null }],
        extras: [{ value: 'strategy', label: 'Допомога з визначенням обсягу', description: 'Уточнити вимоги та оптимальний перший реліз.', price: null }, { value: 'design', label: 'Дизайн інтерфейсу', description: 'Спланувати досвід користувача та вигляд продукту.', price: null }, { value: 'support', label: 'Запуск і подальша підтримка', description: 'Обговорити налаштування, передачу чи розвиток.', price: null }] },
    },
  },
  ro: {
    kicker: '[ ESTIMARE PROIECT / EXEMPLU ]', openCalculator: 'Estimează proiectul', closeCalculator: 'Închide calculatorul',
    applyCalculator: 'Aplică selecția', configured: 'Selecția ta', included: 'Inclus', estimate: 'Estimare exemplu',
    selected: 'Detalii estimare', serviceBase: 'Serviciu', finalNote: 'Este o estimare inițială. Confirmăm volumul și prețul după analizarea brief-ului.',
    customEstimate: 'După brief', customPrice: 'De stabilit',
    serviceNames: { landing: 'Landing page', corporate: 'Site business', redesign: 'Redesign site', consultation: 'Consultație', other: 'Solicitare personalizată' },
    services: {
      landing: { title: 'Planifică landing page-ul', description: 'Estimează dimensiunea paginii și funcțiile pentru conversii.', base: 'Design și dezvoltare landing page', basePrice: 500,
        stepOne: 'Dimensiunea paginii', stepOneDescription: 'Alege numărul aproximativ de secțiuni.', stepTwo: 'Funcții pentru conversii', stepTwoDescription: 'Adaugă elementele care încurajează acțiunea.',
        scope: [{ value: 'compact', label: 'Compact — până la 5 secțiuni', description: 'O ofertă clară și informațiile esențiale.', price: 0 }, { value: 'standard', label: 'Standard — 6–8 secțiuni', description: 'Beneficii, proces, exemple și întrebări frecvente.', price: 180 }, { value: 'extended', label: 'Extins — 9–12 secțiuni', description: 'Mai multe detalii pentru audiențe sau oferte diferite.', price: 350 }],
        extras: [{ value: 'copy', label: 'Texte pentru pagină', description: 'Texte construite în jurul ofertei tale.', price: 180 }, { value: 'analytics', label: 'Analiză și urmărirea conversiilor', description: 'Măsoară formularele și acțiunile importante.', price: 100 }, { value: 'integrations', label: 'Integrarea solicitărilor', description: 'Trimite solicitările în email, CRM sau Telegram.', price: 120 }, { value: 'motion', label: 'Animații și interacțiuni', description: 'Animații suplimentare în interfață.', price: 150 }] },
      corporate: { title: 'Stabilește volumul site-ului business', description: 'Alege volumul de conținut și instrumentele necesare echipei.', base: 'Structura de bază a site-ului business', basePrice: 900,
        stepOne: 'Dimensiunea site-ului', stepOneDescription: 'Estimează conținutul necesar pentru prima lansare.', stepTwo: 'Instrumente pentru echipă', stepTwoDescription: 'Alege funcțiile și sistemele pentru conținut.',
        scope: [{ value: 'starter', label: 'Start — până la 5 pagini', description: 'Companie, servicii și date de contact.', price: 0 }, { value: 'growth', label: 'Dezvoltare — 6–10 pagini', description: 'Detalii despre servicii, proiecte și pagini utile.', price: 350 }, { value: 'large', label: 'Extins — 11–20 pagini', description: 'Structură amplă pentru companie sau servicii multiple.', price: 700 }],
        extras: [{ value: 'cms', label: 'Administrarea conținutului', description: 'Editează pagini și materiale fără programator.', price: 250 }, { value: 'blog', label: 'Știri sau articole', description: 'Publică noutăți și materiale de specialitate.', price: 180 }, { value: 'languages', label: 'Limbă suplimentară', description: 'Pregătește site-ul pentru încă o limbă.', price: 250 }, { value: 'integrations', label: 'Integrări business', description: 'Conectează formularele la CRM, email sau alte instrumente.', price: 150 }] },
      redesign: { title: 'Planifică redesignul site-ului', description: 'Alege amploarea schimbărilor și ce trebuie păstrat.', base: 'Analiza și implementarea redesignului', basePrice: 650,
        stepOne: 'Amploarea redesignului', stepOneDescription: 'Alege nivelul de schimbare dorit.', stepTwo: 'Păstrează și îmbunătățește', stepTwoDescription: 'Include migrarea și verificările necesare.',
        scope: [{ value: 'visual', label: 'Reîmprospătare vizuală', description: 'Actualizează aspectul și păstrează structura.', price: 0 }, { value: 'ux', label: 'Redesign UX și vizual', description: 'Îmbunătățește navigarea și experiența utilizatorilor.', price: 250 }, { value: 'restructure', label: 'Restructurare completă', description: 'Reorganizează site-ul și traseele principale.', price: 500 }],
        extras: [{ value: 'seo', label: 'Păstrarea SEO și a adreselor', description: 'Planifică redirecționarea paginilor importante.', price: 160 }, { value: 'migration', label: 'Migrarea conținutului', description: 'Mută și verifică pagini și fișiere media.', price: 180 }, { value: 'performance', label: 'Îmbunătățirea vitezei', description: 'Verifică viteza și stabilește corecțiile prioritare.', price: 140 }, { value: 'platform', label: 'Migrare pe altă platformă', description: 'Mută site-ul pe o altă platformă sau tehnologie.', price: 300 }] },
      consultation: { title: 'Alege consultația potrivită', description: 'Stabilește durata și pregătirea utilă pentru discuție.', base: 'Sesiune de consultație', basePrice: 100,
        stepOne: 'Durata sesiunii', stepOneDescription: 'Alege timpul potrivit pentru întrebările tale.', stepTwo: 'Pregătire și continuare', stepTwoDescription: 'Adaugă o analiză sau un plan după discuție.',
        scope: [{ value: '60', label: 'Sesiune concentrată — 60 min', description: 'Analizăm o întrebare sau decizie principală.', price: 0 }, { value: '90', label: 'Analiză detaliată — 90 min', description: 'Discutăm în detaliu câteva subiecte conexe.', price: 50 }, { value: '120', label: 'Atelier — 2 ore', description: 'Sesiune de lucru pentru o problemă complexă.', price: 100 }],
        extras: [{ value: 'review', label: 'Analiza materialelor înainte', description: 'Studiem site-ul, brief-ul sau referințele înainte de apel.', price: 75 }, { value: 'roadmap', label: 'Plan scris de acțiune', description: 'O listă concisă de pași după sesiune.', price: 90 }, { value: 'followup', label: 'Sesiune de urmărire — 30 min', description: 'Discutăm progresul sau întrebările apărute.', price: 45 }] },
      other: { title: 'Descrie proiectul tău', description: 'Alege tipul de proiect. Estimăm lucrările personalizate după brief.', base: 'Estimare proiect personalizat', basePrice: null,
        stepOne: 'Tipul proiectului', stepOneDescription: 'Alege varianta apropiată; poți adăuga detalii în brief.', stepTwo: 'Ce contează cel mai mult?', stepTwoDescription: 'Selectează rezultatele sau sprijinul dorit.',
        scope: [{ value: 'store', label: 'Magazin online sau catalog', description: 'Produse, servicii, rezervări sau vânzări online.', price: null }, { value: 'webapp', label: 'Aplicație web sau cont personal', description: 'Instrument online, panou sau zonă privată.', price: null }, { value: 'automation', label: 'Automatizare sau integrare', description: 'Conectarea serviciilor sau reducerea muncii repetitive.', price: null }, { value: 'unsure', label: 'Am nevoie de ajutor pentru soluție', description: 'Am un obiectiv, dar aș dori o recomandare.', price: null }],
        extras: [{ value: 'strategy', label: 'Definirea volumului', description: 'Clarifică cerințele și prima versiune potrivită.', price: null }, { value: 'design', label: 'Design de interfață', description: 'Planifică experiența și aspectul produsului.', price: null }, { value: 'support', label: 'Lansare și suport continuu', description: 'Discută configurarea și dezvoltarea ulterioară.', price: null }] },
    },
  },
};

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
  const service = copy.services[activeService] || copy.services.other;
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorStep, setCalculatorStep] = useState(1);
  const [scopeChoice, setScopeChoice] = useState(service.scope[0].value);
  const [extras, setExtras] = useState({});

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
