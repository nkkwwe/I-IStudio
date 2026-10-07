import type { SiteLanguage } from './siteLanguage';
type Text = [string, string, string];
export const modernText = (value: Text, language: SiteLanguage) => value[language === 'uk' ? 1 : language === 'ro' ? 2 : 0];
type Concept = { service: 'landing' | 'corporate'; brand: string; label: Text; title: Text; intro: Text; section: Text; about: Text; items: { title: Text; text: Text; image?: string }[] };
export const modernDemos: Record<string, Concept> = {
  prism: {
    service: 'landing', brand: 'prism /', label: ['A NEW DIMENSION OF CREATIVE WORK', 'НОВИЙ ВИМІР ТВОРЧОСТІ', 'O NOUĂ DIMENSIUNE A CREATIVITĂȚII'],
    title: ['Ideas without\nlimits.', 'Ідеї без\nмеж.', 'Idei fără\nlimite.'],
    intro: ['A creative toolkit for your next bright idea. Bring colour, clarity and a little unexpected magic to the things you make.', 'Творчий інструмент для вашої наступної яскравої ідеї. Додайте кольору, ясності та трохи несподіваного до того, що створюєте.', 'Un instrument creativ pentru următoarea ta idee. Adu culoare, claritate și puțină magie în ceea ce creezi.'],
    section: ['Find your own spectrum.', 'Знайдіть власний спектр.', 'Găsește-ți propriul spectru.'],
    about: ['Start with a spark, explore a few directions and make it yours. A playful concept that gives your product space to stand out, with thoughtful details on every screen.', 'Почніть з іскри, дослідіть кілька напрямів і знайдіть свій. Грайливий концепт, що допомагає продукту виділитися завдяки продуманим деталям на кожному екрані.', 'Pornește de la o scânteie, explorează direcții și găsește-o pe a ta. Un concept expresiv care evidențiază produsul prin detalii atent lucrate pe fiecare ecran.'],
    items: [
      { title: ['Soft focus', 'М’який фокус', 'Focus delicat'], text: ['Gentle gradients and a little breathing room for a fresh beginning.', 'М’які градієнти та трохи простору для нового початку.', 'Gradiente delicate și puțin spațiu pentru un început nou.'] },
      { title: ['Bold energy', 'Яскрава енергія', 'Energie expresivă'], text: ['A brighter palette for ideas that deserve to be seen.', 'Виразніша палітра для ідей, які заслуговують бути помітними.', 'O paletă vie pentru idei care merită să fie văzute.'] },
      { title: ['Open possibilities', 'Відкриті можливості', 'Posibilități deschise'], text: ['An unexpected combination. A direction that feels entirely yours.', 'Несподіване поєднання. Напрям, що відчувається саме вашим.', 'O combinație neașteptată. O direcție care îți aparține.'] },
    ],
  },
  haven: {
    service: 'corporate', brand: 'haven.', label: ['GOOD WORK STARTS WITH A GOOD PLACE', 'ХОРОША РОБОТА ПОЧИНАЄТЬСЯ З ПРОСТОРУ', 'MUNCA BUNĂ ÎNCEPE CU UN LOC BUN'],
    title: ['Your space.\nYour pace.', 'Ваш простір.\nВаш ритм.', 'Spațiul tău.\nRitmul tău.'],
    intro: ['Thoughtful workspaces for independent minds. Find your quiet corner, bring your team together or make room for something new.', 'Продумані робочі простори для незалежних людей. Знайдіть тихий куточок, зберіть команду або створіть місце для нового.', 'Spații de lucru pentru minți independente. Găsește un colț liniștit, adună echipa sau fă loc pentru ceva nou.'],
    section: ['A little room to do more.', 'Простір для більшого.', 'Puțin spațiu pentru mai mult.'],
    about: ['We believe a workspace should feel as good as it works. Natural light, comfortable details and room for real connection — shaped around the way you spend your day.', 'Віримо, що робочий простір має бути і зручним, і приємним. Природне світло, продумані деталі та місце для спілкування — під ваш щоденний ритм.', 'Credem că un spațiu de lucru trebuie să fie plăcut și funcțional. Lumină naturală, detalii confortabile și loc pentru conexiuni, în ritmul zilei tale.'],
    items: [
      { title: ['A place to focus', 'Місце зосередитись', 'Un loc pentru concentrare'], text: ['A personal desk, a calm atmosphere and space for your best ideas.', 'Власний стіл, спокійна атмосфера та простір для найкращих ідей.', 'Un birou personal, o atmosferă calmă și loc pentru ideile tale.'] },
      { title: ['Room for your team', 'Простір для команди', 'Loc pentru echipa ta'], text: ['Flexible offices that bring people and their projects together.', 'Гнучкі офіси, що поєднують людей та їхні проєкти.', 'Birouri flexibile care aduc oamenii și proiectele împreună.'] },
      { title: ['Meet, make, connect', 'Зустрічайтесь і творіть', 'Întâlnește, creează, conectează'], text: ['Welcoming meeting spaces for conversations that move things forward.', 'Затишні кімнати для розмов, що допомагають рухатись уперед.', 'Spații primitoare pentru conversații care duc lucrurile înainte.'] },
    ],
  },
  bento: {
    service: 'landing', brand: 'bento.', label: ['LESS FRICTION. MORE MOMENTUM.', 'МЕНШЕ ЗАЙВОГО. БІЛЬШЕ РУХУ.', 'MAI PUȚIN EFORT. MAI MULT AVÂNT.'],
    title: ['A little space.\nA bigger possibility.', 'Трохи простору.\nБільше можливостей.', 'Puțin spațiu.\nMai multe posibilități.'],
    intro: ['Your ideas, notes and next steps — beautifully connected. An imagined workspace for people who make things happen.', 'Ідеї, нотатки та наступні кроки — в одному продуманому просторі. Концепт сервісу для тих, хто втілює задумане.', 'Idei, notițe și pașii următori, conectați frumos. Un spațiu imaginar pentru cei care transformă ideile în realitate.'],
    section: ['Everything in its place.', 'Усе на своєму місці.', 'Totul la locul său.'],
    about: ['Make room for the work you love. A flexible system that brings the details together without losing the bigger picture.', 'Залиште місце для улюбленої справи. Гнучка система поєднує деталі, зберігаючи цілісну картину.', 'Fă loc muncii care îți place. Un sistem flexibil conectează detaliile fără să piardă imaginea de ansamblu.'],
    items: [
      { title: ['Capture the spark', 'Збережіть іскру', 'Păstrează scânteia'], text: ['One home for ideas before they become something big.', 'Один простір для ідей, з яких починається щось велике.', 'Un loc pentru ideile care vor deveni ceva important.'] },
      { title: ['Find your rhythm', 'Знайдіть свій ритм', 'Găsește-ți ritmul'], text: ['A clear weekly view. Less switching, more doing.', 'Зрозумілий план тижня. Менше перемикань, більше справ.', 'O săptămână clară. Mai puține schimbări, mai mult progres.'] },
      { title: ['Move together', 'Рухайтесь разом', 'Avansați împreună'], text: ['Keep your team close and your next step visible.', 'Команда поруч, а наступний крок завжди зрозумілий.', 'Echipa aproape, următorul pas mereu vizibil.'] },
    ],
  },
  signal: {
    service: 'landing', brand: 'SIGNAL®', label: ['INDEPENDENT IDEAS / DISTINCT IDENTITIES', 'НЕЗАЛЕЖНІ ІДЕЇ / ВИРАЗНІ БРЕНДИ', 'IDEI INDEPENDENTE / IDENTITĂȚI DISTINCTE'],
    title: ['Be clear.\nBe impossible\nto ignore.', 'Будьте чіткими.\nБудьте\nпомітними.', 'Fii clar.\nFii imposibil\nde ignorat.'],
    intro: ['Strategy with a point of view. Design with a purpose. We help ambitious brands find their own frequency.', 'Стратегія з власним поглядом. Дизайн із метою. Допомагаємо амбітним брендам знайти свою частоту.', 'Strategie cu perspectivă. Design cu scop. Ajutăm brandurile ambițioase să-și găsească propria frecvență.'],
    section: ['Good work.\nClear intention.', 'Сильні роботи.\nЧіткий задум.', 'Lucrări bune.\nIntenție clară.'],
    about: ['We question, edit and connect. Then we make something that feels unmistakably yours. Independent thinking, from the first idea to the final detail.', 'Запитуємо, спрощуємо та поєднуємо. А потім створюємо щось неповторно ваше. Незалежне мислення — від першої ідеї до останньої деталі.', 'Întrebăm, simplificăm și conectăm. Apoi creăm ceva inconfundabil al tău. Gândire independentă, de la prima idee la ultimul detaliu.'],
    items: [
      { title: ['New perspective', 'Новий погляд', 'O perspectivă nouă'], text: ['An identity system built around one confident idea.', 'Система айдентики навколо однієї впевненої ідеї.', 'Un sistem de identitate construit în jurul unei idei puternice.'] },
      { title: ['Common language', 'Спільна мова', 'Un limbaj comun'], text: ['A digital experience that speaks with clarity.', 'Цифровий досвід, який говорить зрозуміло.', 'O experiență digitală care comunică limpede.'] },
      { title: ['Next chapter', 'Наступний розділ', 'Următorul capitol'], text: ['A fresh direction for a brand ready to move forward.', 'Новий напрям для бренду, готового рухатись уперед.', 'O direcție nouă pentru un brand pregătit să avanseze.'] },
    ],
  },
  cobalt: {
    service: 'corporate', brand: 'cobalt /', label: ['TECHNOLOGY WITH HUMAN INTENTION', 'ТЕХНОЛОГІЇ З ЛЮДСЬКИМ ПІДХОДОМ', 'TEHNOLOGIE CU INTENȚIE UMANĂ'],
    title: ['Complexity,\nmade clear.', 'Складне\nстає простим.', 'Complexitatea,\nsimplificată.'],
    intro: ['A digital partner for your next chapter. We connect strategy, systems and people to build a business that moves forward.', 'Цифровий партнер для нового етапу. Поєднуємо стратегію, системи та людей, щоб ваш бізнес рухався вперед.', 'Un partener digital pentru următoarea etapă. Conectăm strategia, sistemele și oamenii pentru o afacere în mișcare.'],
    section: ['A connected approach.', 'Цілісний підхід.', 'O abordare conectată.'],
    about: ['Good technology begins with understanding. We map your challenges, build the right foundations and make change feel manageable.', 'Хороші технології починаються з розуміння. Досліджуємо ваші виклики, будуємо основу та робимо зміни керованими.', 'Tehnologia bună începe cu înțelegerea. Analizăm provocările, construim fundația și facem schimbarea gestionabilă.'],
    items: [
      { title: ['Digital strategy', 'Цифрова стратегія', 'Strategie digitală'], text: ['Turn business priorities into a practical digital roadmap.', 'Перетворіть пріоритети бізнесу на практичний цифровий план.', 'Transformă prioritățile afacerii într-un plan digital practic.'] },
      { title: ['Connected systems', 'Поєднані системи', 'Sisteme conectate'], text: ['Bring tools, data and daily workflows into one coherent system.', 'Об’єднайте інструменти, дані та робочі процеси в цілісну систему.', 'Conectează instrumentele, datele și procesele într-un sistem coerent.'] },
      { title: ['Lasting progress', 'Сталий прогрес', 'Progres durabil'], text: ['Give your team the clarity and support to keep improving.', 'Дайте команді ясність і підтримку для подальшого розвитку.', 'Oferă echipei claritate și sprijin pentru a continua să crească.'] },
    ],
  },
  maison: {
    service: 'corporate', brand: 'maison', label: ['SPACES WITH A SENSE OF BELONGING', 'ПРОСТОРИ, ДЕ ВІДЧУВАЄШ СЕБЕ ВДОМА', 'SPAȚII ÎN CARE TE SIMȚI ACASĂ'],
    title: ['A place to feel.\nA space to be.', 'Місце відчувати.\nПростір бути.', 'Un loc să simți.\nUn spațiu să fii.'],
    intro: ['An independent interior practice shaping thoughtful spaces. Honest materials, natural light and a quieter kind of luxury.', 'Незалежна студія інтер’єрів, що створює продумані простори. Чесні матеріали, природне світло та стримана розкіш.', 'Un studio independent de interior. Materiale autentice, lumină naturală și un lux discret.'],
    section: ['Spaces with a story.', 'Простори з історією.', 'Spații cu o poveste.'],
    about: ['We begin with how you live. Then we shape the light, materials and details around it. Considered spaces that feel personal, now and for years to come.', 'Починаємо з вашого способу життя. Потім підбираємо світло, матеріали та деталі. Продумані простори, що залишаються особистими роками.', 'Începem cu felul în care trăiești. Apoi modelăm lumina, materialele și detaliile. Spații personale, acum și peste ani.'],
    items: [
      { title: ['The quiet residence', 'Тиха резиденція', 'Reședința liniștită'], text: ['Warm textures and open spaces for everyday living.', 'Теплі текстури та відкритий простір для щоденного життя.', 'Texturi calde și spații deschise pentru viața de zi cu zi.'], image: '/images/business-demos/house.webp' },
      { title: ['An ordinary ritual', 'Щоденний ритуал', 'Un ritual cotidian'], text: ['A considered interior with room for slow mornings.', 'Продуманий інтер’єр із місцем для неспішних ранків.', 'Un interior atent, cu loc pentru dimineți liniștite.'], image: '/images/business-demos/interior.webp' },
      { title: ['Room to gather', 'Місце зустрічі', 'Loc de întâlnire'], text: ['Natural light, honest materials and a shared sense of place.', 'Природне світло, чесні матеріали та відчуття спільного місця.', 'Lumină naturală, materiale autentice și sentimentul de apartenență.'], image: '/images/business-demos/office.webp' },
    ],
  },
};
