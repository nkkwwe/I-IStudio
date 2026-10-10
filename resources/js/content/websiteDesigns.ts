// Original previews inspired by the visual directions in these public galleries:
// https://horoshop.ua/ua/design/ and https://webflow.com/templates/search/saas-landing-pages
// Additional directions: https://www.a1.gallery/style/bento and https://www.awwwards.com/websites/art/
// All gallery thumbnails are screenshots of the original interactive demos.
export type WebsiteDesign = {
  id: string;
  name: string;
  style: [string, string, string];
  description: [string, string, string];
};

const designs: Record<string, WebsiteDesign[]> = {
  landing: [
    { id: 'glaze', name: 'Glaze', style: ['Playful gelato', 'Грайливе джелато', 'Gelato jucăuș'], description: ['Lavender space, oversized type, a floating gelato cup and an interactive tasting menu.', 'Лавандовий простір, велика типографіка, рухомий стаканчик джелато та інтерактивне меню смаків.', 'Spațiu lavandă, tipografie mare, cupă gelato animată și meniu interactiv de arome.'] },
    { id: 'drift', name: 'Drift', style: ['Travel scrapbook', 'Подорожній альбом', 'Album de călătorii'], description: ['Sky-blue space, floating photo postcards and an interactive escape collection.', 'Небесно-блакитний простір, рухомі фотолистівки та інтерактивні маршрути.', 'Spațiu albastru, cărți poștale animate și escapade interactive.'] },
    { id: 'frequency', name: 'Frequency', style: ['Independent sound', 'Незалежний звук', 'Sunet independent'], description: ['Electric orange, condensed type and an animated visualiser with three moods.', 'Електричний помаранчевий, вузька типографіка та анімований візуалізатор трьох настроїв.', 'Portocaliu electric, tipografie condensată și vizualizare animată cu trei atmosfere.'] },
    { id: 'rally', name: 'Rally', style: ['Kinetic festival', 'Кінетичний фестиваль', 'Festival cinetic'], description: ['Oversized type, a moving ticket and an interactive event programme.', 'Велика типографіка, рухомий квиток та інтерактивна програма події.', 'Tipografie mare, bilet animat și program interactiv de eveniment.'] },
    { id: 'serein', name: 'Serein', style: ['Botanical rituals', 'Рослинні ритуали', 'Ritualuri botanice'], description: ['Quiet serif type, breathing light and a changing wellness collection.', 'Спокійна антиква, світло в ритмі дихання та змінна wellness-колекція.', 'Font serif calm, lumină pulsantă și colecție wellness interactivă.'] },
    { id: 'prism', name: 'Prism', style: ['Creative gradients', 'Творчі градієнти', 'Gradiente creative'], description: ['Fluid colour, sculptural artwork and an interactive spectrum of moods.', 'Плавні кольори, скульптурна графіка та інтерактивний спектр настроїв.', 'Culori fluide, grafică sculpturală și un spectru interactiv de atmosfere.'] },
    { id: 'bento', name: 'Bento', style: ['Bento workspace', 'Bento-простір', 'Spațiu Bento'], description: ['A modular grid, soft lilac accents and an interactive product story.', 'Модульна сітка, м’які бузкові акценти та інтерактивна історія продукту.', 'Grilă modulară, accente liliachii și o poveste interactivă a produsului.'] },
    { id: 'signal', name: 'Signal', style: ['Swiss graphic', 'Швейцарська графіка', 'Grafică elvețiană'], description: ['Confident typography, graphic posters and a precise editorial rhythm.', 'Впевнена типографіка, графічні постери та чіткий журнальний ритм.', 'Tipografie puternică, postere grafice și un ritm editorial precis.'] },
    { id: 'mono', name: 'Mono', style: ['Minimal', 'Мінімалізм', 'Minimalist'], description: ['Clear typography, a quiet palette and a focused offer.', 'Чітка типографіка, стримані кольори та акцент на пропозиції.', 'Tipografie clară, culori discrete și accent pe ofertă.'] },
    { id: 'pulse', name: 'Pulse', style: ['Bright product', 'Яскравий продукт', 'Produs vibrant'], description: ['Soft colour, product previews and compact feature cards.', 'М’які кольори, прев’ю продукту та компактні картки переваг.', 'Culori delicate, prezentarea produsului și carduri cu beneficii.'] },
    { id: 'orbit', name: 'Orbit', style: ['Dark technology', 'Темний технологічний', 'Tehnologie închisă'], description: ['A dark background, a bold accent and a striking hero.', 'Темний фон, виразний акцент і помітний перший екран.', 'Fundal închis, accent puternic și o secțiune principală expresivă.'] },
    { id: 'atelier', name: 'Atelier', style: ['Warm editorial', 'Теплий журнальний', 'Editorial cald'], description: ['Warm tones, elegant type and generous space for visuals.', 'Теплі відтінки, елегантний шрифт і простір для візуалів.', 'Tonuri calde, font elegant și spațiu pentru imagini.'] },
  ],
  corporate: [
    { id: 'transit', name: 'Transit', style: ['Connected logistics', 'Поєднана логістика', 'Logistică conectată'], description: ['Crisp blue, lime accents, a wide dispatch board and animated, selectable freight corridors.', 'Чіткий синій, лаймові акценти, широка схема перевезень та анімовані маршрути з перемиканням.', 'Albastru clar, accente lime, panou logistic panoramic și coridoare animate, selectabile.'] },
    { id: 'vellum', name: 'Vellum', style: ['Editorial publishing', 'Редакційне видавництво', 'Publicații editoriale'], description: ['Paper tones, red serif headlines, floating book editions and chapter-like service rows.', 'Паперові тони, червона антиква, рухомі книги та послуги у вигляді розділів.', 'Tonuri de hârtie, titluri serif roșii, cărți animate și servicii organizate în capitole.'] },
    { id: 'canopy', name: 'Canopy', style: ['Community energy', 'Енергія громади', 'Energie comunitară'], description: ['Mint-green space, rounded panels and an animated, interactive energy network.', 'М’ятний простір, округлі панелі та анімована інтерактивна енергомережа.', 'Spațiu verde-mentă, panouri rotunjite și rețea energetică animată, interactivă.'] },
    { id: 'foundry', name: 'Foundry', style: ['Industrial precision', 'Промислова точність', 'Precizie industrială'], description: ['Graphite surfaces, animated engineering and a structured service system.', 'Графітові поверхні, анімована інженерна схема та структуровані послуги.', 'Suprafețe grafit, inginerie animată și servicii structurate.'] },
    { id: 'ledger', name: 'Ledger', style: ['Editorial advisory', 'Журнальний консалтинг', 'Consultanță editorială'], description: ['Elegant type, restrained copper details and an interactive scenario chart.', 'Елегантна типографіка, стримана мідь та інтерактивний графік сценаріїв.', 'Tipografie elegantă, detalii cupru și grafic interactiv de scenarii.'] },
    { id: 'haven', name: 'Haven', style: ['Warm workspace', 'Теплий робочий простір', 'Spațiu de lucru primitor'], description: ['A spacious photo-led layout, soft terracotta and a welcoming business story.', 'Простора композиція з фотографіями, м’яка теракота та привітна історія бізнесу.', 'Compoziție spațioasă cu fotografii, teracotă delicată și o poveste primitoare.'] },
    { id: 'cobalt', name: 'Cobalt', style: ['Modern corporate', 'Сучасний корпоративний', 'Corporate modern'], description: ['Cobalt accents, connected systems and a clear service presentation.', 'Кобальтові акценти, поєднані системи та зрозуміла презентація послуг.', 'Accente cobalt, sisteme conectate și servicii prezentate clar.'] },
    { id: 'maison', name: 'Maison', style: ['Quiet luxury', 'Стримана розкіш', 'Lux discret'], description: ['Editorial typography, architectural imagery and warm natural tones.', 'Журнальна типографіка, архітектурні фото та теплі природні відтінки.', 'Tipografie editorială, imagini arhitecturale și tonuri naturale calde.'] },
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
    note: 'These demos are simplified sketches of a design direction. Your commissioned website will be more refined, detailed and tailored to your business — from the visuals to every interaction.',
    summary: 'Design direction', alt: 'Website preview: {name}', previewLabel: 'Preview {name}',
    landing: 'Landing page', corporate: 'Business website',
  },
  uk: {
    eyebrow: 'НАПРЯМ ДИЗАЙНУ / НЕОБОВ’ЯЗКОВО', title: 'Оберіть вигляд свого сайту',
    description: 'Знайдіть стиль до вподоби або довірте дизайн нам.',
    gallery: 'Переглянути дизайни', change: 'Змінити дизайн', close: 'Закрити дизайни',
    galleryTitle: 'Оберіть напрям дизайну', preview: 'Прев’ю', choose: 'Обрати цей дизайн',
    chosen: 'Обрано', back: 'Усі дизайни', skip: 'Довірити дизайн вам', clear: 'Скасувати вибір дизайну',
    note: 'Ці демо — лише спрощені приклади напряму дизайну. Ваш сайт на замовлення буде значно детальнішим і довершенішим: індивідуальні візуали, структура та взаємодії під ваш бізнес.',
    summary: 'Напрям дизайну', alt: 'Прев’ю сайту: {name}', previewLabel: 'Переглянути {name}',
    landing: 'Лендинг', corporate: 'Сайт для бізнесу',
  },
  ro: {
    eyebrow: 'DIRECȚIE DE DESIGN / OPȚIONAL', title: 'Alege aspectul site-ului tău',
    description: 'Găsește un stil care îți place sau lasă designul în grija noastră.',
    gallery: 'Vezi designurile', change: 'Schimbă designul', close: 'Închide designurile',
    galleryTitle: 'Explorează direcțiile de design', preview: 'Previzualizare', choose: 'Alege acest design',
    chosen: 'Selectat', back: 'Toate designurile', skip: 'Las designul în grija voastră', clear: 'Anulează selecția designului',
    note: 'Aceste demo-uri sunt schițe simplificate ale unei direcții de design. Site-ul realizat la comandă va fi mai rafinat, detaliat și adaptat afacerii tale, de la imagini la fiecare interacțiune.',
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
  const revision = ['bento', 'signal', 'prism', 'cobalt', 'maison', 'haven'].includes(id) ? '?v=20261007-2' : '';
  return `/images/design-previews/${id}.webp${revision}`;
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
