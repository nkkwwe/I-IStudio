import type { PublicReview } from '../Components/ClientReviews';
import type { SiteLanguage } from './siteLanguage';

// Clearly labelled sample cards preview the carousel until real reviews are available.
const samples = {
  en: {
    author: 'Sample project',
    bodies: [
      'The landing page makes our service easier to explain and gives customers a simple way to get in touch.',
      'The team organised our product catalogue and helped prepare the marketplace store for launch.',
      'We set clear campaign goals together and got a practical plan for the next steps.',
      'The updated website is easier to browse on a phone and makes our services clearer.',
      'We had a straightforward process, regular updates and a website that reflects our offer.',
      'Campaign setup and inquiry tracking were explained clearly before launch.',
    ],
  },
  uk: {
    author: 'Демо-проєкт',
    bodies: [
      'Лендінг зрозуміло представляє послугу та спрощує звернення клієнтів.',
      'Команда впорядкувала каталог товарів і підготувала магазин до запуску на маркетплейсі.',
      'Разом визначили цілі рекламної кампанії та склали план наступних кроків.',
      'Сайтом зручніше користуватися з телефона, а послуги описані зрозуміліше.',
      'Процес був послідовним, команда регулярно повідомляла про роботу, а сайт краще представляє пропозицію.',
      'Налаштування кампанії та відстеження звернень зрозуміло пояснили перед запуском.',
    ],
  },
  ro: {
    author: 'Proiect demonstrativ',
    bodies: [
      'Pagina de prezentare ne ajută să explicăm serviciul și simplifică contactarea de către clienți.',
      'Echipa a organizat catalogul și a pregătit magazinul pentru lansarea pe marketplace.',
      'Am clarificat obiectivele campaniei și am primit un plan practic pentru pașii următori.',
      'Site-ul este mai ușor de folosit pe telefon și descrie mai clar serviciile noastre.',
      'Proces clar, actualizări constante și un site care reflectă mai bine oferta noastră.',
      'Configurarea campaniei și măsurarea solicitărilor au fost explicate înainte de lansare.',
    ],
  },
};

export function getTestReviews(language: SiteLanguage): PublicReview[] {
  const sample = samples[language];
  const ratings = [5, 4.75, 4.5, 4.25, 4, 5];
  const services = ['landing', 'marketplaces', 'ads', 'corporate', 'redesign', 'meta-ads'];

  return sample.bodies.map((body, index) => ({
    id: -(index + 1),
    author: `${sample.author} ${index + 1}`,
    body,
    rating: ratings[index],
    service: services[index],
    demo: true,
  }));
}
