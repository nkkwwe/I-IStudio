import { useEffect, useRef, useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';

export type PublicReview = { id: number; author: string; rating: number; body: string; service: string; demo?: boolean };

const labels = {
  en: { tag: 'CLIENT REVIEWS', title: 'What our clients say', client: 'Client', sample: 'Example only', note: 'Sample content for layout preview — these are not client testimonials.', pause: 'Pause reviews', resume: 'Play reviews' },
  uk: { tag: 'ВІДГУКИ КЛІЄНТІВ', title: 'Що кажуть наші клієнти', client: 'Клієнт', sample: 'Лише приклад', note: 'Демонстраційний текст для перегляду макета, це не відгуки клієнтів.', pause: 'Зупинити відгуки', resume: 'Продовжити відгуки' },
  ro: { tag: 'RECENZII CLIENȚI', title: 'Ce spun clienții noștri', client: 'Client', sample: 'Doar exemplu', note: 'Text demonstrativ pentru previzualizarea aspectului, nu sunt recenzii reale.', pause: 'Oprește recenziile', resume: 'Continuă recenziile' },
};

export default function ClientReviews({ reviews }: { reviews: PublicReview[] }) {
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const text = labels[language];
  const hasSamples = reviews.some((review) => review.demo);
  const viewport = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [touchInput, setTouchInput] = useState(false);
  const [paused, setPaused] = useState(false);
  const many = reviews.length > 3;
  const automatic = many && overflow && !reducedMotion && !touchInput;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(any-pointer: coarse)');
    const update = () => setTouchInput(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!viewport.current || !group.current) return;
    const measure = () => setOverflow(group.current!.scrollWidth > viewport.current!.clientWidth + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    observer.observe(group.current);
    measure();
    return () => observer.disconnect();
  }, [reviews.length]);

  if (!reviews.length) return null;

  const cards = (duplicate = false) => reviews.map((review) => (
    <article className={`client-review-card${review.demo ? ' is-demo-review' : ''}`} key={review.id}>
      {review.demo && <span className="client-review-demo-tag">{text.sample}</span>}
      <div className="client-review-rating" aria-label={copy.review.ratingValue.replace('{rating}', String(review.rating))}>
        <div className="client-review-stars" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <span className="client-review-star" key={index}>
              <svg viewBox="0 0 24 24" fill="none"><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5Z" /></svg>
              <span style={{ width: `${Math.max(0, Math.min(1, review.rating - index)) * 100}%` }}><svg viewBox="0 0 24 24"><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5Z" /></svg></span>
            </span>
          ))}
        </div>
        <span>{review.rating} / 5</span>
      </div>
      <blockquote tabIndex={duplicate ? -1 : 0}>{review.body}</blockquote>
      <footer><strong>{review.author || text.client}</strong><span>{copy.services[review.service] ?? text.client}</span></footer>
    </article>
  ));

  return (
    <section className="client-reviews-section" aria-labelledby="client-reviews-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{text.tag}</span>
          <h2 className="section-title" id="client-reviews-title">{text.title}</h2>
          {hasSamples && <p className="client-review-demo-note">{text.note}</p>}
          {automatic && <button type="button" className="btn btn-secondary btn-sm" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? text.resume : text.pause}</button>}
        </div>
        <div ref={viewport} className={`client-reviews-viewport${many ? ' has-many' : ''}${automatic ? ' is-automatic' : ''}${paused ? ' is-paused' : ''}`} onFocus={() => setPaused(true)} onPointerDown={(event) => { if (event.pointerType !== 'mouse') setPaused(true); }}>
          <div className="client-reviews-track" style={{ animationDuration: `${Math.max(40, reviews.length * 8)}s` }}>
            <div ref={group} className="client-reviews-group">{cards()}</div>
            {automatic && !paused && <div className="client-reviews-group" aria-hidden="true" inert>{cards(true)}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
