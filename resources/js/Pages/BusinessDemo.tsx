import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { businessCopy, businessDemos, bt, type BusinessDesignId, type BusinessItem, type BusinessSection } from '../content/businessDemos';
import { demoShellCopy } from '../content/landingDemos';
import { localizedUrl } from '../content/siteLanguage';
import { useSiteLanguage } from '../content/uiTranslations';
import '../../css/pages/landing-demo.css';
import '../../css/pages/business-demo.css';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12"/> : <path d="M4 12h16m-6-6 6 6-6 6"/>}</svg>;
}
function MenuIcon({ open }: { open: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={open ? 'm6 6 12 12M6 18 18 6' : 'M4 8h16M4 16h16'}/></svg>;
}

export default function BusinessDemo({ design, section = 'home', item }: { design: BusinessDesignId; section?: BusinessSection; item?: string }) {
  const language = useSiteLanguage();
  const data = businessDemos[design];
  const shell = demoShellCopy[language];
  const t = (key: keyof Omit<typeof businessCopy, 'steps'>) => bt(businessCopy[key], language);
  const text = (value: [string, string, string]) => bt(value, language);
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState(0);
  const [search, setSearch] = useState('');
  const [bag, setBag] = useState<Record<string, number>>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sent, setSent] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const navRoot = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const previousPage = useRef(`${design}/${section}/${item ?? ''}`);
  const url = (page: BusinessSection = 'home', id?: string) => localizedUrl(`/designs/${design}${page === 'home' ? '' : `/${page}`}${id ? `/${id}` : ''}`, language);
  const link = (page: BusinessSection, label: ReactNode, className = '', id?: string) => <Link href={url(page, id)} preserveState className={className}>{label}</Link>;
  const buttonLink = (page: BusinessSection, label: ReactNode, secondary = false, id?: string) => link(page, <>{label}<Arrow/></>, `bd-button${secondary ? ' bd-secondary' : ''}`, id);
  const count = Object.values(bag).reduce((total, n) => total + n, 0);
  const selected = data.items.find((entry) => entry.id === item);
  const filtered = data.items.filter((entry) => (!category || category === entry.category) && `${text(entry.title)} ${text(entry.description)}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));

  useEffect(() => {
    setMenu(false); setAdded(false); setSent(false); setQuantity(1); setCheckedOut(false);
    const next = `${design}/${section}/${item ?? ''}`;
    if (previousPage.current !== next) main.current?.focus({ preventScroll: true });
    previousPage.current = next;
  }, [design, section, item]);

  useEffect(() => {
    if (!menu) return;
    const outside = (event: PointerEvent) => { if (!navRoot.current?.contains(event.target as Node)) setMenu(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } };
    const close = () => setMenu(false);
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    window.addEventListener('scroll', close, { passive: true }); window.addEventListener('resize', close);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); window.removeEventListener('scroll', close); window.removeEventListener('resize', close); };
  }, [menu]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-bd-reveal]') ?? []);
    let observer: IntersectionObserver | undefined;
    const show = (element: HTMLElement) => { element.classList.remove('bd-pending'); observer?.unobserve(element); };
    const configure = () => {
      observer?.disconnect(); elements.forEach((element) => element.classList.remove('bd-pending'));
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) show(entry.target as HTMLElement); }), { rootMargin: '0px 0px 50px 0px' });
      elements.forEach((element) => { if (element.getBoundingClientRect().top > window.innerHeight) { element.classList.add('bd-pending'); observer?.observe(element); } });
    };
    const focus = (event: FocusEvent) => { if (event.target instanceof HTMLElement) { const element = event.target.closest<HTMLElement>('[data-bd-reveal]'); if (element) show(element); } };
    configure(); preference.addEventListener('change', configure); root.current?.addEventListener('focusin', focus);
    const currentRoot = root.current;
    return () => { observer?.disconnect(); preference.removeEventListener('change', configure); currentRoot?.removeEventListener('focusin', focus); };
  }, [design, section, item]);

  useEffect(() => { if (sent || checkedOut) success.current?.focus(); }, [sent, checkedOut]);

  const photo = (src: string, alt: string, className = '', eager = false) => <img className={className} src={src} alt={alt} width="1200" height="900" loading={eager ? 'eager' : 'lazy'} decoding="async"/>;
  const stats = <div className="bd-stats">{data.stats.map(([number, label]) => <div key={number}><strong>{number}</strong><span>{text(label)}</span></div>)}</div>;
  const cards = (items: BusinessItem[] = data.items) => <div className="bd-card-grid">{items.map((entry, index) => <article className={`bd-card bd-card-${index + 1}`} key={entry.id} data-bd-reveal>
    {link('item', <>{photo(entry.image, text(entry.title), 'bd-card-photo')}<span className="bd-card-index">0{index + 1}</span><span className="bd-image-arrow"><Arrow diagonal/></span></>, 'bd-card-image', entry.id)}
    <div className="bd-card-meta"><span>{text(data.categories[entry.category])}</span>{entry.price !== undefined && <span>€{entry.price}</span>}</div>
    <h3>{link('item', text(entry.title), '', entry.id)}</h3>
    {design === 'meridian' && <p>{text(entry.description)}</p>}
    {design === 'verde' && <button className="bd-text-button" onClick={() => { setBag((current) => ({ ...current, [entry.id]: Math.min(10, (current[entry.id] ?? 0) + 1) })); setAdded(true); }} disabled={(bag[entry.id] ?? 0) >= 10}>{t('add')}<span aria-hidden="true"> +</span></button>}
  </article>)}</div>;
  const collectionHeader = <div className="bd-section-heading"><div><span className="bd-kicker">{text(data.signature)}</span><h2>{text(data.collection)}</h2></div>{buttonLink('collection', t('all'), true)}</div>;
  const homeStory = <section className="bd-story bd-container" data-bd-reveal><span className="bd-kicker">{t('story')}</span><h2>{text(data.aboutTitle)}</h2><div><p>{text(data.about)}</p>{buttonLink('about', t('more'), true)}</div></section>;
  const homeJournal = <section className="bd-journal-promo bd-container" data-bd-reveal><div>{photo(data.journal[0].image, text(data.journal[0].title))}</div><div><span className="bd-kicker">{t('journal')} / 01</span><h2>{text(data.journal[0].title)}</h2><p>{text(data.journal[0].text)}</p>{buttonLink('journal', t('read'), true)}</div></section>;
  const home = <>
    {design === 'meridian' && <>
      <section className="bd-meridian-hero bd-container"><div className="bd-hero-copy"><span className="bd-kicker">{text(data.signature)}</span><h1>{text(data.title)}</h1><p>{text(data.intro)}</p><div className="bd-actions">{buttonLink('collection', text(data.collection))}{link('about', <>{t('story')}<Arrow diagonal/></>, 'bd-text-link')}</div><div className="bd-hero-note"><span className="bd-dot"/> {text(['Independent thinking. Practical outcomes.', 'Незалежне мислення. Практичні результати.', 'Gândire independentă. Rezultate practice.'])}</div></div><div className="bd-meridian-visual">{photo(data.hero, text(data.signature), '', true)}<div className="bd-image-caption"><span>MERIDIAN / PERSPECTIVES</span><strong>01 — 04</strong></div><div className="bd-visual-label">{text(['See the bigger picture.', 'Бачте ширшу картину.', 'Privește imaginea de ansamblu.'])}<Arrow diagonal/></div></div></section>
      <section className="bd-meridian-proof bd-container">{stats}<p>{text(['Built on perspective. Focused on your next move.', 'Спираємося на досвід. Фокусуємося на вашому наступному кроці.', 'Construit pe experiență. Concentrat pe următorul pas.'])}</p></section>
      <section className="bd-section bd-container">{collectionHeader}{cards(data.items.slice(0, 3))}</section>{homeStory}{homeJournal}
    </>}
    {design === 'forma' && <>
      <section className="bd-forma-hero"><div className="bd-forma-title bd-container"><h1>{text(data.title)}</h1><div><span className="bd-kicker">{text(data.signature)} / EST. 2014</span><p>{text(data.intro)}</p>{link('collection', <>{text(data.collection)}<Arrow diagonal/></>, 'bd-text-link')}</div></div><div className="bd-forma-image">{photo(data.hero, text(['A light-filled contemporary interior', 'Світлий сучасний інтер’єр', 'Un interior contemporan luminos']), '', true)}<span className="bd-forma-image-label">FORMA / SELECTED SPACES — 01</span>{link('item', <Arrow diagonal/>, 'bd-round-link', 'soft-interior')}</div></section>
      <section className="bd-section bd-container">{collectionHeader}{cards(data.items.slice(0, 2))}</section>{homeStory}<div className="bd-container">{stats}</div>{homeJournal}
    </>}
    {design === 'verde' && <>
      <div className="bd-verde-announcement">{text(['A calmer home starts with a little green.', 'Затишний дім починається з трохи зелені.', 'O casă liniștită începe cu puțină verdeață.'])}</div>
      <section className="bd-verde-hero bd-container"><div className="bd-hero-copy"><span className="bd-kicker">{text(data.signature)}</span><h1>{text(data.title)}</h1><p>{text(data.intro)}</p>{buttonLink('collection', text(data.collection))}<span className="bd-verde-note">{text(['Slow living. Good growing.', 'Повільніше життя. Природне зростання.', 'Viață liniștită. Creștere frumoasă.'])}</span></div><div className="bd-verde-visual">{photo(data.hero, text(['A ficus with rich green leaves', 'Фікус із зеленим листям', 'Un ficus cu frunze verzi']), '', true)}<div className="bd-verde-sticker">{text(['GROW\nWITH US', 'РОСТІТЬ\nЗ НАМИ', 'CREȘTE\nCU NOI'])}</div></div></section>
      <section className="bd-verde-categories bd-container" aria-label={text(data.collection)}>{data.categories.slice(1).map((label, index) => <Link key={index} href={`${url('collection')}?category=${index + 1}`} preserveState className="bd-category-tile"><span>0{index + 1}</span><h2>{text(label)}</h2><Arrow diagonal/></Link>)}</section>
      <section className="bd-section bd-container">{collectionHeader}{cards()}</section>{homeStory}{homeJournal}
    </>}
    {design === 'studio' && <>
      <section className="bd-studio-hero bd-container"><div className="bd-studio-top"><span className="bd-kicker">{text(data.signature)}</span><span>STRATEGY / IDENTITY / DIGITAL</span></div><h1>{text(data.title)}</h1><div className="bd-studio-intro"><p>{text(data.intro)}</p>{buttonLink('collection', text(['See what we do', 'Наші роботи', 'Vezi ce facem']))}</div><div className="bd-studio-mosaic"><div className="bd-studio-type" aria-hidden="true"><span>MAKE<br/>IT<br/><em>MATTER.</em></span><Arrow diagonal/></div>{link('item', <>{photo(data.hero, text(data.items[0].title), '', true)}<span>OBJECTS OF TOMORROW / 2026</span></>, 'bd-studio-feature', data.items[0].id)}<div className="bd-studio-mini"><span>STUDIO® NOTES / 001</span><p>{text(['A little different.\nA lot more you.', 'Трохи інакше.\nБільше вас.', 'Puțin diferit.\nMai mult tu.'])}</p>{link('about', <Arrow diagonal/>, 'bd-round-link')}</div></div></section>
      <section className="bd-section bd-container">{collectionHeader}{cards(data.items.slice(1, 3))}</section>{homeStory}<div className="bd-container">{stats}</div>{homeJournal}
    </>}
  </>;

  useEffect(() => {
    if (section === 'collection') {
      const requested = Number(new URLSearchParams(window.location.search).get('category') ?? '0');
      setCategory(Number.isInteger(requested) && requested >= 0 && requested < data.categories.length ? requested : 0);
      setSearch('');
    }
  }, [section, design, data.categories.length]);

  const collection = <section className="bd-section bd-container"><div className="bd-page-title"><span className="bd-kicker">{text(data.signature)}</span><h1>{text(data.collection)}</h1><p>{text(data.intro)}</p></div><div className="bd-filters"><div className="bd-filter-tabs" role="group" aria-label={text(data.collection)}>{data.categories.map((label, index) => <button key={index} className={category === index ? 'is-active' : ''} aria-pressed={category === index} onClick={() => setCategory(index)}>{text(label)}</button>)}</div><label className="bd-search"><span className="bd-sr-only">{t('search')}</span><input type="search" placeholder={t('search')} value={search} onChange={(event) => setSearch(event.target.value)}/></label></div><p className="bd-result-count" aria-live="polite">{filtered.length} {t('found')}</p>{filtered.length ? cards(filtered) : <div className="bd-empty"><h2>{t('empty')}</h2><button className="bd-button" onClick={() => { setCategory(0); setSearch(''); }}>{t('reset')}</button></div>}</section>;
  const about = <><section className="bd-about-hero bd-container"><span className="bd-kicker">{t('story')}</span><h1>{text(data.aboutTitle)}</h1><div className="bd-about-layout">{photo(design === 'verde' ? data.hero : '/images/business-demos/meeting.webp', text(data.signature), '', true)}<div><p>{text(data.about)}</p>{buttonLink('contact', t('contact'))}</div></div>{stats}</section><section className="bd-process bd-container" data-bd-reveal><span className="bd-kicker">{t('process')}</span><h2>{t('team')}</h2><div>{businessCopy.steps.map((step, index) => <article key={index}><span>0{index + 1}</span><h3>{text(step)}</h3><p>{text([['We begin with your world: the people, the priorities and the possibilities.', 'We explore options, test ideas and find a direction worth pursuing.', 'We turn the chosen direction into something useful, considered and lasting.'][index], ['Починаємо з вашого світу: людей, пріоритетів і можливостей.', 'Досліджуємо варіанти, перевіряємо ідеї та знаходимо потрібний напрям.', 'Втілюємо обраний напрям у корисний і довговічний результат.'][index], ['Începem cu oamenii, prioritățile și posibilitățile tale.', 'Explorăm opțiuni, testăm idei și găsim direcția potrivită.', 'Transformăm direcția aleasă într-un rezultat util și durabil.'][index]])}</p></article>)}</div></section></>;
  const journal = <section className="bd-section bd-container"><div className="bd-page-title"><span className="bd-kicker">{text(data.signature)}</span><h1>{t('journal')}</h1></div>{data.journal.map((article, index) => <article className="bd-article" key={index}>{photo(article.image, text(article.title), '', true)}<div><span className="bd-kicker">01 / {t('journal')}</span><h2>{text(article.title)}</h2><p>{text(article.text)}</p><details><summary>{t('question')}<span aria-hidden="true">+</span></summary><p>{t('faq')}</p></details>{buttonLink('contact', t('contact'), true)}</div></article>)}</section>;
  const contact = <section className="bd-contact bd-container"><div><span className="bd-kicker">{text(data.signature)}</span><h1>{t('contactTitle')}</h1><p>{t('contactIntro')}</p><div className="bd-contact-image">{photo(data.hero, text(data.signature))}</div><span className="bd-kicker">{t('sample')}</span></div><div className="bd-contact-form">{sent ? <div className="bd-success" ref={success} tabIndex={-1}><span aria-hidden="true">✓</span><h2>{shell.success}</h2><button className="bd-button" onClick={() => setSent(false)}>{shell.again}</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>{shell.name}<input required name="name" autoComplete="name" maxLength={100}/></label><label>{shell.email}<input required type="email" name="email" autoComplete="email" maxLength={254}/></label><label>{shell.message}<textarea name="message" rows={5} maxLength={2000}/></label><p>{shell.formNote}</p><button className="bd-button" type="submit">{shell.send}<Arrow/></button></form>}</div></section>;
  const itemPage = selected && <><section className="bd-detail bd-container">{link('collection', <>← {t('back')}</>, 'bd-text-link')}<div className="bd-detail-grid">{photo(selected.image, text(selected.title), '', true)}<div><span className="bd-kicker">{text(data.categories[selected.category])}</span><h1>{text(selected.title)}</h1>{selected.price !== undefined && <strong className="bd-price">€{selected.price}</strong>}<p>{text(selected.description)}</p>{design === 'verde' ? <><label className="bd-quantity">{text(['Quantity', 'Кількість', 'Cantitate'])}<input type="number" min={1} max={10} value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(10, Number(event.target.value) || 1)))}/></label><button className="bd-button" disabled={(bag[selected.id] ?? 0) >= 10} onClick={() => { setBag((current) => ({ ...current, [selected.id]: Math.min(10, (current[selected.id] ?? 0) + quantity) })); setAdded(true); }}>{t('add')}<Arrow/></button><p role="status">{added && t('added')}</p>{buttonLink('bag', `${t('bag')} (${count})`, true)}</> : buttonLink('contact', t('contact'))}<details><summary>{t('details')}<span aria-hidden="true">+</span></summary><p>{t('faq')}</p></details></div></div></section><section className="bd-section bd-container"><div className="bd-section-heading"><h2>{text(data.collection)}</h2></div>{cards(data.items.filter((entry) => entry.id !== selected.id).slice(0, 2))}</section></>;
  const bagItems = data.items.filter((entry) => bag[entry.id] > 0);
  const bagPage = <section className="bd-section bd-container"><div className="bd-page-title"><span className="bd-kicker">{t('sample')}</span><h1>{t('bag')}</h1></div>{checkedOut ? <div className="bd-success" ref={success} tabIndex={-1}><h2>{t('completed')}</h2>{buttonLink('collection', text(data.collection))}</div> : bagItems.length ? <div className="bd-bag-layout"><div>{bagItems.map((entry) => <article className="bd-bag-row" key={entry.id}>{link('item', photo(entry.image, text(entry.title)), '', entry.id)}<div><h2>{link('item', text(entry.title), '', entry.id)}</h2><span>€{entry.price}</span><button className="bd-text-button" onClick={() => setBag((current) => { const next = { ...current }; delete next[entry.id]; return next; })}>{t('remove')}</button></div><label><span className="bd-sr-only">{text(['Quantity for', 'Кількість для', 'Cantitate pentru'])} {text(entry.title)}</span><input type="number" min={1} max={10} value={bag[entry.id]} onChange={(event) => setBag((current) => ({ ...current, [entry.id]: Math.max(1, Math.min(10, Number(event.target.value) || 1)) }))}/></label><strong>€{(entry.price ?? 0) * bag[entry.id]}</strong></article>)}</div><aside className="bd-bag-total"><span>{t('total')}</span><strong>€{bagItems.reduce((total, entry) => total + (entry.price ?? 0) * bag[entry.id], 0)}</strong><p>{t('faq')}</p><button className="bd-button" onClick={() => { setCheckedOut(true); setBag({}); }}>{t('checkout')}<Arrow/></button></aside></div> : <div className="bd-empty"><h2>{t('emptyBag')}</h2>{buttonLink('collection', text(data.collection))}</div>}</section>;
  const pageTitle = section === 'home' ? data.brand : section === 'item' && selected ? text(selected.title) : section === 'collection' ? text(data.collection) : section === 'bag' ? t('bag') : t(section as 'about' | 'journal' | 'contact');

  return <><Head title={`${pageTitle} — ${shell.demo}`}><meta name="robots" content="noindex, nofollow"/></Head><div className="ld-preview-bar"><a className="ld-preview-brand" href={localizedUrl('/inquiry?service=corporate&designs=1', language)}>I&I Studio <span>/ {shell.demo} · {design}</span></a><a className="btn btn-secondary btn-sm" href={localizedUrl('/inquiry?service=corporate&designs=1', language)}>← {shell.back}</a><a className="btn btn-primary btn-sm" href={localizedUrl(`/inquiry?service=corporate&design=${design}`, language)}>{shell.choose} ✓</a></div>
    <div className={`business-demo bd-${design}`} ref={root}>
      <a className="bd-skip" href="#business-main">{shell.skip}</a>
      <header className="bd-header"><div className="bd-container bd-header-inner" ref={navRoot}>{link('home', data.brand, 'bd-brand')}<span className="bd-header-caption">{text(data.signature)}</span><button ref={menuButton} className="bd-menu" aria-expanded={menu} aria-controls="business-navigation" aria-label={menu ? shell.close : shell.menu} onClick={() => setMenu(!menu)}><MenuIcon open={menu}/></button><nav className={`bd-nav${menu ? ' is-open' : ''}`} id="business-navigation" aria-label={text(['Main navigation', 'Головна навігація', 'Navigare principală'])}>{(['home', 'collection', 'about', 'journal', 'contact'] as const).map((page, index) => <Link key={page} href={url(page)} preserveState aria-current={section === page || (page === 'collection' && section === 'item') ? 'page' : undefined} onClick={() => setMenu(false)}>{design === 'studio' && page !== 'contact' && <span className="bd-nav-number">0{index + 1}</span>}{page === 'collection' ? text(data.collection) : t(page)}{page === 'contact' && <Arrow diagonal/>}</Link>)}</nav>{design === 'verde' && link('bag', <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2"/></svg><span>{count}</span><span className="bd-sr-only">{t('bag')}</span></>, 'bd-bag-link')}</div></header>
      <main id="business-main" ref={main} tabIndex={-1}>{section === 'home' ? home : section === 'collection' ? collection : section === 'about' ? about : section === 'journal' ? journal : section === 'contact' ? contact : section === 'item' ? itemPage : bagPage}</main>
      {section !== 'contact' && section !== 'bag' && <section className="bd-final-cta bd-container" data-bd-reveal><span className="bd-kicker">{text(data.signature)}</span><h2>{design === 'verde' ? text(['A little green\ngoes a long way.', 'Трохи зелені\nзмінює багато.', 'Puțin verde\nface mult.']) : t('contactTitle')}</h2>{buttonLink(design === 'verde' ? 'collection' : 'contact', design === 'verde' ? text(data.collection) : t('contact'))}</section>}
      <footer className="bd-footer bd-container"><div>{link('home', data.brand, 'bd-brand')}<p>{text(data.intro)}</p></div><nav aria-label={text(['Footer navigation', 'Навігація внизу', 'Navigare subsol'])}>{(['collection', 'about', 'journal', 'contact'] as const).map((page) => <Link preserveState key={page} href={url(page)}>{page === 'collection' ? text(data.collection) : t(page)}</Link>)}</nav><div className="bd-footer-bottom"><span>{t('sample')} · I&I Studio</span><a href="#business-main">{text(['Back to top', 'Нагору', 'Înapoi sus'])} ↑</a></div></footer>
      {design === 'verde' && <p className="bd-sr-only" role="status">{added ? `${t('added')}. ${t('bag')}: ${count}` : ''}</p>}
    </div></>;
}
