// Original previews inspired by the visual directions in these public galleries:
// https://horoshop.ua/ua/design/ and https://webflow.com/templates/search/saas-landing-pages
// All gallery thumbnails are screenshots of the original interactive demos.
export type WebsiteDesign = {
  id: string;
  name: string;
  style: [string, string, string];
  description: [string, string, string];
};

const designs: Record<string, WebsiteDesign[]> = {
  landing: [
    { id: 'mono', name: 'Mono', style: ['Minimal', 'Мінімалізм', 'Minimalist'], description: ['Clear typography, a quiet palette and a focused offer.', 'Чітка типографіка, стримані кольори та акцент на пропозиції.', 'Tipografie clară, culori discrete și accent pe ofertă.'] },
    { id: 'pulse', name: 'Pulse', style: ['Bright product', 'Яскравий продукт', 'Produs vibrant'], description: ['Soft colour, product previews and compact feature cards.', 'М’які кольори, прев’ю продукту та компактні картки переваг.', 'Culori delicate, prezentarea produsului și carduri cu beneficii.'] },
    { id: 'orbit', name: 'Orbit', style: ['Dark technology', 'Темний технологічний', 'Tehnologie închisă'], description: ['A dark background, a bold accent and a striking hero.', 'Темний фон, виразний акцент і помітний перший екран.', 'Fundal închis, accent puternic și o secțiune principală expresivă.'] },
    { id: 'atelier', name: 'Atelier', style: ['Warm editorial', 'Теплий журнальний', 'Editorial cald'], description: ['Warm tones, elegant type and generous space for visuals.', 'Теплі відтінки, елегантний шрифт і простір для візуалів.', 'Tonuri calde, font elegant și spațiu pentru imagini.'] },
  ],
  corporate: [
    { id: 'meridian', name: 'Meridian', style: ['Business classic', 'Ділова класика', 'Clasic business'], description: ['A professional blue palette with services and trust signals.', 'Ділова синя палітра, послуги та елементи довіри.', 'Paletă albastră profesională, servicii și elemente de încredere.'] },
    { id: 'forma', name: 'Forma', style: ['Architecture & portfolio', 'Архітектура та портфоліо', 'Arhitectură și portofoliu'], description: ['Large project images, a refined grid and a calm visual rhythm.', 'Великі зображення проєктів, чітка сітка та спокійний ритм.', 'Imagini mari ale proiectelor, grilă ordonată și ritm vizual calm.'] },
    { id: 'verde', name: 'Verde', style: ['Natural & calm', 'Природний та спокійний', 'Natural și calm'], description: ['Natural greens, gentle shapes and a human approach.', 'Природні зелені відтінки, м’які форми та людяний підхід.', 'Tonuri naturale de verde, forme delicate și o abordare umană.'] },
    { id: 'studio', name: 'Studio', style: ['Bold creative', 'Виразний креативний', 'Creativ expresiv'], description: ['Oversized headings, vivid accents and an expressive portfolio.', 'Великі заголовки, яскраві акценти та виразне портфоліо.', 'Titluri mari, accente vii și un portofoliu expresiv.'] },
  ],
};

const copy = {
  en: {
    eyebrow: 'DESIGN DIRECTION / OPTIONAL', title: 'Choose a look for your website',
    description: 'Find a direction you like, or leave the design to us.',
    gallery: 'View designs', change: 'Change design', close: 'Close designs',
    galleryTitle: 'Explore design directions', preview: 'Preview', choose: 'Choose this design',
    chosen: 'Selected', back: 'All designs', skip: 'Leave the design to you', clear: 'Clear design selection',
    note: 'Sample content shows the visual direction. We will adapt the colours, text and layout to your business.',
    summary: 'Design direction', alt: 'Website preview: {name}', previewLabel: 'Preview {name}',
    landing: 'Landing page', corporate: 'Business website',
  },
  uk: {
    eyebrow: 'НАПРЯМ ДИЗАЙНУ / НЕОБОВ’ЯЗКОВО', title: 'Оберіть вигляд свого сайту',
    description: 'Знайдіть стиль до вподоби або довірте дизайн нам.',
    gallery: 'Переглянути дизайни', change: 'Змінити дизайн', close: 'Закрити дизайни',
    galleryTitle: 'Оберіть напрям дизайну', preview: 'Прев’ю', choose: 'Обрати цей дизайн',
    chosen: 'Обрано', back: 'Усі дизайни', skip: 'Довірити дизайн вам', clear: 'Скасувати вибір дизайну',
    note: 'Приклади показують візуальний напрям. Кольори, тексти й структуру адаптуємо до вашого бізнесу.',
    summary: 'Напрям дизайну', alt: 'Прев’ю сайту: {name}', previewLabel: 'Переглянути {name}',
    landing: 'Лендинг', corporate: 'Сайт для бізнесу',
  },
  ro: {
    eyebrow: 'DIRECȚIE DE DESIGN / OPȚIONAL', title: 'Alege aspectul site-ului tău',
    description: 'Găsește un stil care îți place sau lasă designul în grija noastră.',
    gallery: 'Vezi designurile', change: 'Schimbă designul', close: 'Închide designurile',
    galleryTitle: 'Explorează direcțiile de design', preview: 'Previzualizare', choose: 'Alege acest design',
    chosen: 'Selectat', back: 'Toate designurile', skip: 'Las designul în grija voastră', clear: 'Anulează selecția designului',
    note: 'Exemplele arată direcția vizuală. Vom adapta culorile, textele și structura la afacerea ta.',
    summary: 'Direcție de design', alt: 'Previzualizare site: {name}', previewLabel: 'Previzualizează {name}',
    landing: 'Landing page', corporate: 'Site business',
  },
};

export function getWebsiteDesigns(service: string): WebsiteDesign[] {
  return designs[service] ?? [];
}

export function getWebsiteDesignCopy(language: string) {
  return copy[language as keyof typeof copy] ?? copy.en;
}

export function designText(values: [string, string, string], language: string): string {
  return values[language === 'uk' ? 1 : language === 'ro' ? 2 : 0];
}

export function designImage(id: string): string {
  return `/images/design-previews/${id}.webp`;
}

export function restoreDesignReference(service: string): string {
  if (typeof window === 'undefined') return '';
  try {
    const requested = new URLSearchParams(window.location?.search ?? '').get('design');
    if (requested && getWebsiteDesigns(service).some((design) => design.id === requested)) return requested;
    const draft = JSON.parse(window.localStorage.getItem('ii_studio_inquiry_draft') ?? 'null');
    return draft?.service_type === service && getWebsiteDesigns(service).some((design) => design.id === draft.design_reference)
      ? draft.design_reference : '';
  } catch {
    return '';
  }
}
