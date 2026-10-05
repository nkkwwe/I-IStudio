export const landingDemoIds = ['mono', 'pulse', 'orbit', 'atelier'] as const;
export type LandingDemoId = typeof landingDemoIds[number];

export const landingDemos = {
  mono: {
    brand: 'mono®', eyebrow: 'INDEPENDENT DESIGN STUDIO', title: 'Less noise.\nMore impact.',
    intro: 'We turn ambitious ideas into clear identities and digital experiences. Thoughtful by design. Built to last.',
    cta: 'Let’s make something', sectionLabel: '01 / SELECTED WORK', sectionTitle: 'Small details.\nBig difference.',
    sectionIntro: 'A few imagined projects to show what your brand could look like here.',
    items: [{ title: 'Object / 01', tag: 'Brand identity', text: 'A quieter identity for a new generation of everyday objects.' }, { title: 'Fieldwork', tag: 'Digital experience', text: 'An intuitive digital home for people doing meaningful work.' }, { title: 'Common ground', tag: 'Strategy & design', text: 'A simple idea brought together by a confident visual language.' }],
    aboutTitle: 'Good design makes\nroom for what matters.', about: 'We listen first, simplify second, and build with care. From the first conversation to the last pixel, every decision has a purpose.',
    stats: [['01', 'A clear direction'], ['02', 'A considered design'], ['03', 'A confident launch']],
    contactTitle: 'Have something\nin mind?', contactIntro: 'Tell us a little about your idea. Great things start with a conversation.',
    faq: [['What can we create together?', 'Brand identities, focused landing pages and thoughtful digital experiences. The examples on this page are fictional.'], ['How does the process work?', 'We start with a conversation, define a direction, then design and build around your goals.'], ['Can the style fit my brand?', 'Yes. Colours, typography, copy and sections can all be adapted to your business.']],
  },
  pulse: {
    brand: 'pulse', eyebrow: 'A LITTLE LESS CHAOS. A LOT MORE CLARITY.', title: 'Your next big idea,\nin one place.',
    intro: 'Bring your projects, people and plans together. A calmer workspace for teams with big things to do.',
    cta: 'Try the workspace', sectionLabel: 'MADE FOR YOUR EVERYDAY', sectionTitle: 'Your flow.\nWithout the friction.',
    sectionIntro: 'Switch between views to explore the sample workspace.',
    items: [{ title: 'Plan', tag: 'See the bigger picture', text: 'Turn a busy week into a clear plan. Keep priorities visible and next steps simple.' }, { title: 'Collaborate', tag: 'Bring everyone together', text: 'Share context, find the right people and keep every conversation close to the work.' }, { title: 'Insights', tag: 'Know what is moving', text: 'See progress at a glance and give your team room to do their best work.' }],
    aboutTitle: 'Big ideas deserve\na little breathing room.', about: 'One shared space, fewer scattered updates. A sample product experience that shows how your own service could be presented.',
    stats: [['One', 'Shared workspace'], ['Less', 'Busywork'], ['More', 'Room to create']],
    contactTitle: 'Make room for\nyour next big idea.', contactIntro: 'Choose a sample plan and explore the signup experience. No account or payment is created.',
    faq: [['Is this a real productivity app?', 'This is an interactive design demo. The workspace and pricing are fictional examples; no subscription is sold.'], ['Can I change plans?', 'Try the monthly and yearly switch, then pick a plan. Your choice will appear in the demo form.'], ['Will the demo send my information?', 'No. The form shows a local confirmation only. It does not submit or store your personal details.']],
  },
  orbit: {
    brand: 'ORBIT®', eyebrow: 'FOR PEOPLE BUILDING WHAT COMES NEXT', title: 'Build beyond\nthe ordinary.',
    intro: 'Digital foundations for ambitious teams. We connect sharp strategy, expressive design and precise engineering.',
    cta: 'Start a conversation', sectionLabel: 'OUR CAPABILITIES', sectionTitle: 'From first spark\nto full orbit.',
    sectionIntro: 'Explore the capabilities behind a confident digital launch.',
    items: [{ title: 'Strategy', tag: 'Find your trajectory', text: 'A clear proposition, the right audience and a practical roadmap for what comes next.' }, { title: 'Design', tag: 'Make your mark', text: 'Distinct identities and accessible digital experiences, built around real people.' }, { title: 'Engineering', tag: 'Build a strong foundation', text: 'Responsive interfaces and carefully considered interactions that connect the whole experience.' }],
    aboutTitle: 'A fresh perspective.\nA solid foundation.', about: 'The best ideas need more than a striking first screen. They need a team that thinks about every detail, on every device.',
    stats: [['360°', 'A connected approach'], ['3', 'Core disciplines'], ['1', 'Shared ambition']],
    contactTitle: 'Ready for your\nnext chapter?', contactIntro: 'Tell us what you’re building. Let’s find a direction together.',
    faq: [['What kinds of projects fit this style?', 'Technology, digital services and ambitious creative brands. This is a sample studio, not a real service provider.'], ['Can I use a different accent colour?', 'Absolutely. The visual direction is a starting point for your own brand palette.'], ['Does the page work on a phone?', 'The navigation, content, artwork and form adapt to narrow screens. All actions also work with a keyboard.']],
  },
  atelier: {
    brand: 'atelier.', eyebrow: 'CONSIDERED OBJECTS. EVERYDAY RITUALS.', title: 'A slower way\nto live beautifully.',
    intro: 'Thoughtful pieces for the spaces we call home. Natural textures, quiet colours and little things worth keeping.',
    cta: 'Explore the collection', sectionLabel: 'THE EVERYDAY COLLECTION', sectionTitle: 'Made to be lived with.\nAnd loved for longer.',
    sectionIntro: 'A fictional collection of simple objects, each with a story of its own.',
    items: [{ title: 'The morning vessel', tag: 'Ceramics', text: 'A sculptural ceramic vessel, imagined in a warm sand finish. A quiet centrepiece for everyday flowers.' }, { title: 'Soft beginnings', tag: 'Textiles', text: 'Layers of natural linen in gentle earth tones. A sample collection for slow mornings and comfortable evenings.' }, { title: 'A quiet corner', tag: 'Living', text: 'Considered shapes and honest materials. An imagined collection that brings a little calm to a room.' }],
    aboutTitle: 'Fewer things.\nMore meaning.', about: 'We believe a beautiful home is built slowly. With objects that feel good, materials that age gracefully, and space for everyday life.',
    stats: [['Natural', 'An honest palette'], ['Simple', 'Considered shapes'], ['Timeless', 'Everyday inspiration']],
    contactTitle: 'A little inspiration\nfor your inbox.', contactIntro: 'Explore a sample newsletter signup. No email is sent and no subscription is created.',
    faq: [['Can I order these pieces?', 'These objects are fictional examples for the landing page design. There is no checkout or product order.'], ['Can the collection fit my products?', 'Yes. The images, categories and collection stories can be replaced with your own products.'], ['What happens when I sign up?', 'You will see a local demo confirmation. Your email is not sent or saved.']],
  },
} as const;

export const demoShellCopy = {
  en: { demo: 'Live design demo', back: 'All designs', choose: 'Choose this design', live: 'Live demo ↗', menu: 'Menu', close: 'Close menu', nav: ['Explore', 'Our approach', 'Questions', 'Get in touch'], name: 'Your name', email: 'Email address', message: 'Your idea (optional)', send: 'Try the demo form', success: 'Demo complete. Your information has not been sent or saved.', again: 'Try again', formNote: 'Demo form only — no information is sent or saved.', details: 'Read the story', less: 'Close story', sample: 'Sample content · Built by I&I Studio', selected: 'Selected plan', monthly: 'Monthly', yearly: 'Yearly · save 20%', plan: 'Choose plan', faq: 'A few things you might wonder', annual: 'Billed yearly', month: '/ month', skip: 'Skip to content' },
  uk: { demo: 'Живе демо дизайну', back: 'Усі дизайни', choose: 'Обрати цей дизайн', live: 'Живе демо ↗', menu: 'Меню', close: 'Закрити меню', nav: ['Огляд', 'Наш підхід', 'Запитання', 'Зв’язатися'], name: 'Ваше ім’я', email: 'Електронна пошта', message: 'Ваша ідея (необов’язково)', send: 'Спробувати демоформу', success: 'Демо завершено. Ваші дані не надіслано й не збережено.', again: 'Спробувати ще раз', formNote: 'Демонстраційна форма — дані не надсилаються й не зберігаються.', details: 'Переглянути історію', less: 'Закрити історію', sample: 'Приклади контенту · I&I Studio', selected: 'Обраний план', monthly: 'Щомісяця', yearly: 'Щороку · економія 20%', plan: 'Обрати план', faq: 'Відповіді на запитання', annual: 'Оплата за рік', month: '/ місяць', skip: 'Перейти до вмісту' },
  ro: { demo: 'Demo live de design', back: 'Toate designurile', choose: 'Alege acest design', live: 'Demo live ↗', menu: 'Meniu', close: 'Închide meniul', nav: ['Explorează', 'Abordarea noastră', 'Întrebări', 'Contact'], name: 'Numele tău', email: 'Adresa de email', message: 'Ideea ta (opțional)', send: 'Încearcă formularul demo', success: 'Demo finalizat. Datele tale nu au fost trimise sau salvate.', again: 'Încearcă din nou', formNote: 'Formular demonstrativ — datele nu sunt trimise sau salvate.', details: 'Citește povestea', less: 'Închide povestea', sample: 'Conținut demonstrativ · I&I Studio', selected: 'Plan selectat', monthly: 'Lunar', yearly: 'Anual · economisești 20%', plan: 'Alege planul', faq: 'Răspunsuri la întrebări', annual: 'Facturat anual', month: '/ lună', skip: 'Sari la conținut' },
};
