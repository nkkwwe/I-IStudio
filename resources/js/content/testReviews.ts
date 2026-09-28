import type { PublicReview } from '../Components/ClientReviews';
import type { SiteLanguage } from './siteLanguage';

// Temporary homepage preview data. Remove this file and its Home import after review.
const samples = {
  en: {
    author: 'Test review',
    bodies: [
      'Test data: a short review to check the card layout and rating.',
      'Test data: a longer review to see how several lines of text look next to shorter cards. Check the spacing, author name and project type.',
      'Test data: check the smooth scrolling and pause button. These are preview cards, not real client feedback.',
      'Test data: this card helps check the dark theme, star colours and readability on a phone.',
      'Test data: another review to check the continuous loop and manual scrolling when the animation is paused.',
      'Test data: the last preview card. It should flow smoothly into the first card without an empty gap.',
    ],
  },
  uk: {
    author: 'Тестовий відгук',
    bodies: [
      'Тестові дані: короткий відгук для перевірки картки та оцінки.',
      'Тестові дані: довший відгук, щоб побачити кілька рядків тексту поряд із короткими картками. Перевірте відступи, ім’я автора й тип проєкту.',
      'Тестові дані: перевірте плавне прокручування та кнопку паузи. Це демонстраційні картки, а не справжні відгуки клієнтів.',
      'Тестові дані: ця картка допомагає перевірити темну тему, колір зірок і читабельність на телефоні.',
      'Тестові дані: ще один відгук для перевірки безперервної стрічки та ручного прокручування після паузи.',
      'Тестові дані: остання демонстраційна картка. Вона має плавно переходити до першої без порожнього проміжку.',
    ],
  },
  ro: {
    author: 'Recenzie de test',
    bodies: [
      'Date de test: o recenzie scurtă pentru verificarea cardului și a evaluării.',
      'Date de test: o recenzie mai lungă pentru a vedea mai multe rânduri lângă cardurile scurte. Verifică spațierea, numele autorului și tipul proiectului.',
      'Date de test: verifică derularea și butonul de pauză. Aceste carduri sunt demonstrative, nu recenzii reale ale clienților.',
      'Date de test: acest card ajută la verificarea temei întunecate, a stelelor și a lizibilității pe telefon.',
      'Date de test: încă o recenzie pentru verificarea buclei continue și a derulării manuale după pauză.',
      'Date de test: ultimul card demonstrativ. Ar trebui să treacă ușor la primul card fără un spațiu gol.',
    ],
  },
};

export function getTestReviews(language: SiteLanguage): PublicReview[] {
  const sample = samples[language];
  const ratings = [5, 4.75, 4.5, 4.25, 4, 5];
  const services = ['landing', 'corporate', 'redesign', 'ads', 'consultation', 'landing'];

  return sample.bodies.map((body, index) => ({
    id: -(index + 1),
    author: `${sample.author} ${index + 1}`,
    body,
    rating: ratings[index],
    service: services[index],
  }));
}
