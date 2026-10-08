import type { SiteLanguage } from './siteLanguage';

type Text = [string, string, string];
type Story = { title: Text; text: Text };
type Concept = { service: 'landing' | 'corporate'; brand: string; label: Text; title: Text; intro: Text; action: Text; heading: Text; about: Text; items: Story[] };
export type AnimatedDesignId = 'rally' | 'serein' | 'foundry' | 'ledger';
export const animatedText = (value: Text, language: SiteLanguage) => value[language === 'uk' ? 1 : language === 'ro' ? 2 : 0];
// Original concepts, informed by these public award galleries; no copied layouts or assets.
// Rally: https://www.awwwards.com/sites/flowfest-2025
// Serein: https://www.awwwards.com/websites/honorable/?mobile=1&page=6&page6= (Truekind Skincare)
// Foundry: https://www.awwwards.com/websites/%23F36B6C/ (Terminal Industries)
// Ledger: https://www.awwwards.com/sites/pacific-partners
export const animatedDemos: Record<AnimatedDesignId, Concept> = {
  rally: {
    service: 'landing', brand: 'RALLY', label: ['IDEAS NEED PEOPLE / A FICTIONAL CREATIVE FESTIVAL', 'ІДЕЯМ ПОТРІБНІ ЛЮДИ / КОНЦЕПТ ТВОРЧОГО ФЕСТИВАЛЮ', 'IDEILE AU NEVOIE DE OAMENI / FESTIVAL CREATIV IMAGINAR'],
    title: ['Make some\nbeautiful noise.', 'Створюй.\nЗвучить голосно.', 'Creează ceva\nmemorabil.'],
    intro: ['Two days of fresh perspectives, open conversations and ideas worth getting out of bed for.', 'Два дні свіжих поглядів, відкритих розмов та ідей, заради яких варто прокинутися.', 'Două zile de perspective noi, conversații deschise și idei pentru care merită să te trezești.'],
    action: ['Join the gathering', 'Приєднатися', 'Alătură-te'], heading: ['Pick your frequency.', 'Знайди свою частоту.', 'Găsește-ți frecvența.'],
    about: ['A meeting of curious minds. No perfect answers, just great questions, hands-on sessions and a little room for the unexpected.', 'Зустріч допитливих людей. Без ідеальних відповідей: цікаві запитання, практичні сесії та місце для несподіваного.', 'O întâlnire a minților curioase. Întrebări bune, sesiuni practice și loc pentru neașteptat.'],
    items: [
      { title: ['Big ideas', 'Великі ідеї', 'Idei mari'], text: ['09:00 / Main stage. Conversations on creativity, culture and what comes next.', '09:00 / Головна сцена. Розмови про творчість, культуру та майбутнє.', '09:00 / Scena principală. Conversații despre creativitate, cultură și viitor.'] },
      { title: ['Make together', 'Творимо разом', 'Creăm împreună'], text: ['13:00 / Workshop room. Bring a question. Leave with something you made.', '13:00 / Майстерня. Приходьте із запитанням, виходьте з власною роботою.', '13:00 / Atelier. Vino cu o întrebare. Pleacă cu ceva creat de tine.'] },
      { title: ['After hours', 'Після події', 'După program'], text: ['18:00 / Social club. New friends, fresh connections and no slides.', '18:00 / Клуб. Нові друзі, знайомства й жодних презентацій.', '18:00 / Club. Prieteni noi, conexiuni și fără prezentări.'] },
    ],
  },
  serein: {
    service: 'landing', brand: 'serein', label: ['A SMALL RITUAL / A FICTIONAL WELLNESS BRAND', 'МАЛЕНЬКИЙ РИТУАЛ / КОНЦЕПТ WELLNESS-БРЕНДУ', 'UN MIC RITUAL / BRAND WELLNESS IMAGINAR'],
    title: ['A softer kind\nof everyday.', 'М’який ритм\nкожного дня.', 'Un ritm mai blând\nîn fiecare zi.'],
    intro: ['Pause for a moment. Thoughtful daily rituals, inspired by the quiet balance of the natural world.', 'Зупиніться на мить. Щоденні ритуали, натхненні спокійною рівновагою природи.', 'Oprește-te o clipă. Ritualuri zilnice inspirate de echilibrul liniștit al naturii.'],
    action: ['Find your ritual', 'Знайти свій ритуал', 'Găsește-ți ritualul'], heading: ['A moment, just for you.', 'Мить лише для вас.', 'Un moment doar pentru tine.'],
    about: ['Less rush. More presence. Our imagined collection celebrates simple ingredients, thoughtful objects and the beauty of doing one thing at a time.', 'Менше поспіху. Більше уваги. Концептуальна колекція простих інгредієнтів, продуманих речей і краси однієї справи за раз.', 'Mai puțină grabă. Mai multă prezență. O colecție imaginară de ingrediente simple și obiecte atent create.'],
    items: [
      { title: ['Morning light', 'Ранкове світло', 'Lumina dimineții'], text: ['A fresh beginning. Citrus notes and a few quiet minutes before the day unfolds.', 'Свіжий початок. Цитрусові ноти й кілька тихих хвилин перед новим днем.', 'Un început proaspăt. Note citrice și câteva minute liniștite înaintea zilei.'] },
      { title: ['Afternoon pause', 'Денна пауза', 'Pauza de după-amiază'], text: ['Take a breath. Botanical notes and a little space to reset your rhythm.', 'Переведіть подих. Рослинні ноти та трохи простору для відновлення ритму.', 'Respiră. Note botanice și puțin spațiu pentru a-ți regăsi ritmul.'] },
      { title: ['Evening calm', 'Вечірній спокій', 'Liniștea serii'], text: ['Let the day settle. Warm wood, soft light and nowhere else to be.', 'Відпустіть день. Тепле дерево, м’яке світло та спокій.', 'Lasă ziua să se așeze. Lemn cald, lumină blândă și liniște.'] },
    ],
  },
  foundry: {
    service: 'corporate', brand: 'FOUNDRY /', label: ['BUILT FOR WHAT COMES NEXT / INDUSTRIAL SYSTEMS', 'ДЛЯ НАСТУПНОГО КРОКУ / ПРОМИСЛОВІ СИСТЕМИ', 'CONSTRUIT PENTRU VIITOR / SISTEME INDUSTRIALE'],
    title: ['Precision.\nAt every scale.', 'Точність.\nУ будь-якому масштабі.', 'Precizie.\nLa orice scară.'],
    intro: ['Engineering, operations and connected infrastructure. A clear path from complex challenges to systems that work.', 'Інженерія, операції та поєднана інфраструктура. Зрозумілий шлях від складних завдань до робочих систем.', 'Inginerie, operațiuni și infrastructură conectată. De la provocări complexe la sisteme funcționale.'],
    action: ['Build with us', 'Створюйте з нами', 'Construiește cu noi'], heading: ['From blueprint to beyond.', 'Від креслення до результату.', 'De la plan la rezultat.'],
    about: ['We connect people, processes and infrastructure. An imagined engineering partner with a practical approach: understand the system, find the friction, build the next step.', 'Поєднуємо людей, процеси та інфраструктуру. Концепт інженерного партнера: зрозуміти систему, знайти перешкоди та побудувати наступний крок.', 'Conectăm oameni, procese și infrastructură. Un partener imaginar: înțelege sistemul, identifică obstacolele și construiește pasul următor.'],
    items: [
      { title: ['Infrastructure', 'Інфраструктура', 'Infrastructură'], text: ['A connected foundation for operations, from the first survey to the final handover.', 'Поєднана основа операцій: від першого дослідження до передачі результату.', 'O bază conectată pentru operațiuni, de la primul studiu la predarea finală.'] },
      { title: ['Automation', 'Автоматизація', 'Automatizare'], text: ['Practical systems that turn repeated effort into a reliable, measurable process.', 'Практичні системи, що перетворюють повторювані дії на надійний і вимірюваний процес.', 'Sisteme practice care transformă efortul repetat într-un proces fiabil și măsurabil.'] },
      { title: ['Operations', 'Операції', 'Operațiuni'], text: ['See the whole picture. Keep teams aligned and decisions close to the work.', 'Бачте цілісну картину. Узгоджуйте команди та рішення з роботою.', 'Vezi imaginea completă. Aliniază echipele și deciziile cu activitatea.'] },
    ],
  },
  ledger: {
    service: 'corporate', brand: 'Ledger & Co.', label: ['CLEAR THINKING / BUSINESS ADVISORY', 'ЯСНІСТЬ ДУМКИ / БІЗНЕС-КОНСАЛТИНГ', 'GÂNDIRE CLARĂ / CONSULTANȚĂ DE AFACERI'],
    title: ['Turn ambition\ninto direction.', 'Перетворюємо амбіції\nна напрям.', 'Transformă ambiția\nîn direcție.'],
    intro: ['Independent advice for the decisions that matter. Make sense of your numbers and see your next chapter clearly.', 'Незалежні поради для важливих рішень. Зрозумійте свої цифри та чітко побачте наступний етап.', 'Sfaturi independente pentru deciziile importante. Înțelege cifrele și vezi clar capitolul următor.'],
    action: ['Start a conversation', 'Почати розмову', 'Începe o conversație'], heading: ['Clarity changes everything.', 'Ясність змінює все.', 'Claritatea schimbă totul.'],
    about: ['Good advice starts with listening. Our fictional practice brings strategy, financial planning and day-to-day decisions into one considered view.', 'Хороша порада починається зі слухання. Концепт практики, що поєднує стратегію, фінансове планування та щоденні рішення.', 'Un sfat bun începe cu ascultarea. O practică imaginară care conectează strategia, planificarea financiară și deciziile zilnice.'],
    items: [
      { title: ['Strategy', 'Стратегія', 'Strategie'], text: ['A focused direction, built around your business rather than a borrowed playbook.', 'Чіткий напрям, побудований навколо вашого бізнесу, а не запозичених правил.', 'O direcție clară, construită în jurul afacerii tale, nu al unui model împrumutat.'] },
      { title: ['Financial planning', 'Фінансове планування', 'Planificare financiară'], text: ['Connect the numbers to your next decision with a clear view of the possibilities.', 'Поєднайте цифри з наступним рішенням і зрозумійте можливості.', 'Conectează cifrele la următoarea decizie și înțelege posibilitățile.'] },
      { title: ['Partnership', 'Партнерство', 'Parteneriat'], text: ['A steady perspective as your business grows, changes and finds its next chapter.', 'Надійний погляд у міру зростання, змін та нового етапу вашого бізнесу.', 'O perspectivă stabilă pe măsură ce afacerea crește și se transformă.'] },
    ],
  },
};
