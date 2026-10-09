import type { SiteLanguage } from './siteLanguage';

type Text = [string, string, string];
type Story = { title: Text; text: Text };
export type Concept = { service: 'landing' | 'corporate'; brand: string; label: Text; title: Text; intro: Text; action: Text; heading: Text; about: Text; items: Story[] };
export type AnimatedDesignId = 'rally' | 'serein' | 'foundry' | 'ledger' | 'drift' | 'frequency' | 'vellum' | 'canopy';
export const animatedText = (value: Text, language: SiteLanguage) => value[language === 'uk' ? 1 : language === 'ro' ? 2 : 0];
// Original concepts, informed by these public award galleries; no copied layouts or assets.
// Rally: https://www.awwwards.com/sites/flowfest-2025
// Serein: https://www.awwwards.com/websites/honorable/?mobile=1&page=6&page6= (Truekind Skincare)
// Foundry: https://www.awwwards.com/websites/%23F36B6C/ (Terminal Industries)
// Ledger: https://www.awwwards.com/sites/pacific-partners
export const animatedDemos: Record<AnimatedDesignId, Concept> = {
  drift: {
    service: 'landing', brand: 'drift.', label: ['LESS PLANNING. MORE WANDERING. / TRAVEL CONCEPT', 'МЕНШЕ ПЛАНІВ. БІЛЬШЕ МАНДРІВ. / КОНЦЕПТ ПОДОРОЖЕЙ', 'MAI PUȚINE PLANURI. MAI MULTE CĂLĂTORII. / CONCEPT TURISTIC'],
    title: ['Take the\nscenic route.', 'Обирай шлях\nіз краєвидами.', 'Alege drumul\ncu priveliști.'],
    intro: ['Small journeys. Wide horizons. Find a slower escape, somewhere between the mountains and the sea.', 'Невеликі подорожі. Безмежні обрії. Знайдіть спокійний відпочинок між горами та морем.', 'Călătorii mici. Orizonturi largi. Descoperă o escapadă liniștită între munți și mare.'],
    action: ['Plan your escape', 'Спланувати подорож', 'Planifică escapada'], heading: ['Where will you wander?', 'Куди вирушаємо?', 'Unde vei călători?'],
    about: ['An imagined travel collective for people who collect moments. Thoughtful routes, small groups and enough room to take the unexpected turn.', 'Концепт спільноти мандрівників, які збирають миті. Продумані маршрути, невеликі групи та свобода звернути з дороги.', 'Un colectiv turistic imaginar pentru cei care adună momente. Trasee atent alese, grupuri mici și libertatea de a schimba drumul.'],
    items: [
      { title: ['Above the clouds', 'Вище хмар', 'Deasupra norilor'], text: ['Alpine trails, lakeside mornings and a cabin at the end of the path. A sample four-day escape.', 'Альпійські стежки, ранки біля озера та будиночок наприкінці шляху. Приклад подорожі на чотири дні.', 'Poteci alpine, dimineți pe malul lacului și o cabană la capătul drumului. O escapadă exemplu de patru zile.'] },
      { title: ['By the water', 'Біля води', 'Lângă apă'], text: ['Salt on your skin, quiet coves and long lunches. A sample three-day coastal journey.', 'Сіль на шкірі, тихі бухти та неквапливі обіди. Приклад триденної подорожі узбережжям.', 'Sare pe piele, golfuri liniștite și prânzuri lungi. O călătorie exemplu de trei zile pe coastă.'] },
      { title: ['Into the green', 'Серед зелені', 'În mijlocul naturii'], text: ['Forest paths, open windows and a slower pace. A sample weekend in the countryside.', 'Лісові стежки, відкриті вікна та повільний ритм. Приклад вихідних за містом.', 'Poteci prin pădure, ferestre deschise și un ritm lent. Un weekend exemplu la țară.'] },
    ],
  },
  frequency: {
    service: 'landing', brand: 'FREQUENCY', label: ['INDEPENDENT SOUND / A MUSIC PLATFORM CONCEPT', 'НЕЗАЛЕЖНИЙ ЗВУК / КОНЦЕПТ МУЗИЧНОЇ ПЛАТФОРМИ', 'SUNET INDEPENDENT / CONCEPT DE PLATFORMĂ MUZICALĂ'],
    title: ['Feel every\nfrequency.', 'Відчуй кожну\nчастоту.', 'Simte fiecare\nfrecvență.'],
    intro: ['A place for curious ears. Discover independent sounds, build your own mood and get closer to the music.', 'Місце для допитливих слухачів. Відкривайте незалежний звук, створюйте настрій та ставайте ближче до музики.', 'Un loc pentru ascultători curioși. Descoperă sunete independente, creează o atmosferă și apropie-te de muzică.'],
    action: ['Find your sound', 'Знайти свій звук', 'Găsește-ți sunetul'], heading: ['Change the mood.', 'Зміни настрій.', 'Schimbă atmosfera.'],
    about: ['No algorithm can tell you how to feel. This fictional platform puts discovery first, with listening rooms shaped around atmosphere rather than charts.', 'Жоден алгоритм не знає ваших почуттів. Концептуальна платформа ставить відкриття на перше місце: музичні кімнати за настроєм, а не рейтингами.', 'Niciun algoritm nu îți poate dicta emoțiile. Această platformă imaginară pune descoperirea pe primul loc, cu camere muzicale create în jurul atmosferei.'],
    items: [
      { title: ['Deep focus', 'Зосередженість', 'Concentrare'], text: ['Soft textures and spacious rhythms. The visualiser shifts into a slower, deeper pattern. This demo plays no audio.', 'М’які текстури та просторі ритми. Візуалізатор переходить у повільний глибокий режим. Демо не відтворює аудіо.', 'Texturi fine și ritmuri ample. Vizualizarea trece la un ritm mai lent și profund. Demo-ul nu redă sunet.'] },
      { title: ['After dark', 'Після заходу', 'După apus'], text: ['Warm bass and late-night energy. A sharper visual rhythm for the hours after sunset. Visual demo only.', 'Теплий бас та нічна енергія. Виразний візуальний ритм після заходу сонця. Лише візуальне демо.', 'Bas cald și energie nocturnă. Un ritm vizual mai pronunțat după apus. Doar demo vizual.'] },
      { title: ['Open air', 'Просто неба', 'În aer liber'], text: ['Bright tones and a little space to move. An open, playful pattern. Visual demo only.', 'Світлі тони та простір для руху. Відкритий грайливий ритм. Лише візуальне демо.', 'Tonuri luminoase și spațiu de mișcare. Un ritm deschis și jucăuș. Doar demo vizual.'] },
    ],
  },
  vellum: {
    service: 'corporate', brand: 'Vellum', label: ['WORDS WITH WEIGHT / EDITORIAL STUDIO CONCEPT', 'СЛОВА ЗІ ЗМІСТОМ / КОНЦЕПТ РЕДАКЦІЙНОЇ СТУДІЇ', 'CUVINTE CU GREUTATE / CONCEPT DE STUDIO EDITORIAL'],
    title: ['Stories worth\nturning pages for.', 'Історії, які\nхочеться читати.', 'Povești pentru care\nmerită să citești.'],
    intro: ['We give ideas a lasting form. Editorial strategy, independent publishing and considered identities for cultural organisations.', 'Надаємо ідеям довговічної форми. Редакційна стратегія, незалежне видавництво та айдентика культурних організацій.', 'Dăm ideilor o formă durabilă. Strategie editorială, publicații independente și identități pentru organizații culturale.'],
    action: ['Tell us your story', 'Розкажіть свою історію', 'Spune-ne povestea ta'], heading: ['A practice in three chapters.', 'Практика у трьох розділах.', 'O practică în trei capitole.'],
    about: ['An imagined editorial practice with a simple belief: the right words and the right form belong together. We work from the first question to the final page.', 'Концепт редакційної студії з простим переконанням: точні слова та правильна форма нероздільні. Працюємо від першого запитання до останньої сторінки.', 'Un studio editorial imaginar cu o convingere simplă: cuvintele potrivite și forma potrivită se completează. De la prima întrebare la ultima pagină.'],
    items: [
      { title: ['Editorial', 'Редакція', 'Editorial'], text: ['A clear point of view. Research, narratives and a voice that sounds unmistakably like you.', 'Чіткий погляд. Дослідження, історії та голос, що впізнавано звучить як ви.', 'Un punct de vedere clar. Cercetare, povești și o voce care te reprezintă.'] },
      { title: ['Publishing', 'Видавництво', 'Publicații'], text: ['From manuscript to a meaningful object. Books, journals and digital editions built to be kept.', 'Від рукопису до значущого об’єкта. Книги, журнали та цифрові видання, які хочеться зберегти.', 'De la manuscris la un obiect cu sens. Cărți, reviste și ediții digitale de păstrat.'] },
      { title: ['Identity', 'Айдентика', 'Identitate'], text: ['A visual language with a story inside it. Identities for institutions, exhibitions and independent voices.', 'Візуальна мова з історією всередині. Айдентика інституцій, виставок та незалежних голосів.', 'Un limbaj vizual cu o poveste. Identități pentru instituții, expoziții și voci independente.'] },
    ],
  },
  canopy: {
    service: 'corporate', brand: 'canopy', label: ['A BETTER TOMORROW, BY DESIGN / CLEAN ENERGY CONCEPT', 'КРАЩЕ ЗАВТРА / КОНЦЕПТ ЧИСТОЇ ЕНЕРГІЇ', 'UN VIITOR MAI BUN / CONCEPT DE ENERGIE CURATĂ'],
    title: ['Good energy.\nShared futures.', 'Чиста енергія.\nСпільне майбутнє.', 'Energie curată.\nUn viitor comun.'],
    intro: ['Connecting communities, clean power and practical change. A thoughtful energy partner for places ready to move forward.', 'Поєднуємо громади, чисту енергію та практичні зміни. Енергетичний партнер для тих, хто готовий рухатися вперед.', 'Conectăm comunități, energie curată și schimbări practice. Un partener energetic pentru cei pregătiți să avanseze.'],
    action: ['Explore a partnership', 'Обговорити партнерство', 'Discută un parteneriat'], heading: ['Everything is connected.', 'Усе взаємопов’язане.', 'Totul este conectat.'],
    about: ['A fictional clean-energy company with a community-first approach. Understand the place, design a practical system and support the people who use it.', 'Концепт компанії чистої енергії, яка починає з громади. Зрозуміти місце, спроєктувати практичну систему та підтримати людей.', 'O companie imaginară de energie curată orientată spre comunitate. Înțelege locul, proiectează sistemul și sprijină oamenii.'],
    items: [
      { title: ['Generate', 'Генерувати', 'Generează'], text: ['Explore solar generation at the heart of an illustrative community network.', 'Дослідіть сонячну генерацію в центрі умовної мережі громади.', 'Explorează producția solară în centrul unei rețele comunitare ilustrative.'] },
      { title: ['Store', 'Зберігати', 'Stochează'], text: ['See how storage connects supply to the moments when people need it. An illustrative system, not measured performance.', 'Побачте, як зберігання поєднує виробництво з потребами людей. Умовна система, не виміряні показники.', 'Vezi cum stocarea conectează producția la nevoile oamenilor. Un sistem ilustrativ, fără date măsurate.'] },
      { title: ['Share', 'Ділитися', 'Distribuie'], text: ['Bring the network together. Homes, workspaces and shared infrastructure in one connected view.', 'Поєднайте мережу. Домівки, робочі простори та спільна інфраструктура в єдиній системі.', 'Conectează rețeaua. Locuințe, spații de lucru și infrastructură comună într-o singură imagine.'] },
    ],
  },
  rally: {
    service: 'landing', brand: 'RALLY', label: ['IDEAS NEED PEOPLE / A FICTIONAL CREATIVE FESTIVAL', 'ІДЕЯМ ПОТРІБНІ ЛЮДИ / КОНЦЕПТ ТВОРЧОГО ФЕСТИВАЛЮ', 'IDEILE AU NEVOIE DE OAMENI / FESTIVAL CREATIV IMAGINAR'],
    title: ['Make some\nbeautiful noise.', 'Створюй.\nЗвучи голосно.', 'Creează ceva\nmemorabil.'],
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
