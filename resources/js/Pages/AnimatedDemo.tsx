import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { animatedDemos, animatedText, type AnimatedDesignId } from '../content/animatedDemos';
import { demoShellCopy } from '../content/landingDemos';
import { getWebsiteDesignCopy } from '../content/websiteDesigns';
import { localizedUrl } from '../content/siteLanguage';
import { useSiteLanguage } from '../content/uiTranslations';
import '../../css/pages/landing-demo.css';
import '../../css/pages/animated-demo.css';
import '../../css/pages/new-animated-concepts.css';
import '../../css/pages/glaze-transit.css';
import { isNewAnimated, NewConceptArt, NewConceptExplore } from '../Components/NewAnimatedConcept';

function Arrow() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>; }

export default function AnimatedDemo({ design, section = 'home' }: { design: AnimatedDesignId; section?: string }) {
  const language = useSiteLanguage();
  const t = (value: [string, string, string]) => animatedText(value, language);
  const data = animatedDemos[design];
  const shell = demoShellCopy[language];
  const copy = getWebsiteDesignCopy(language);
  const business = data.service === 'corporate';
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sent, setSent] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const pages = ['collection', 'about', 'journal', 'contact'];
  const anchors = ['explore', 'approach', 'questions', 'contact'];
  const labels = business ? [t(['Expertise', 'Напрями', 'Expertiză']), t(['Our approach', 'Наш підхід', 'Abordarea noastră']), t(['Insights', 'Ідеї', 'Perspective']), shell.nav[3]] : shell.nav;
  const url = (page = 'home') => localizedUrl(`/designs/${design}${page === 'home' ? '' : `/${page}`}`, language);
  const back = localizedUrl(`/inquiry?service=${data.service}&designs=1`, language);
  const navLink = (i: number) => business
    ? <Link href={url(pages[i])} aria-current={section === pages[i] ? 'page' : undefined} onClick={() => setMenu(false)}>{labels[i]}</Link>
    : <a href={`#${anchors[i]}`} onClick={() => setMenu(false)}>{labels[i]}</a>;
  const cta = business ? <Link className="ld-button" href={url('contact')}>{t(data.action)}<Arrow/></Link> : <a className="ld-button" href="#contact">{t(data.action)}<Arrow/></a>;
  const Heading = section === 'home' ? 'h2' : 'h1';

  useEffect(() => { setMenu(false); setSent(false); setActive(0); main.current?.focus({ preventScroll: true }); }, [design, section]);
  useEffect(() => { if (sent) success.current?.focus(); }, [sent]);
  useEffect(() => {
    if (!menu) return;
    const outside = (event: PointerEvent) => { if (!navigation.current?.contains(event.target as Node)) setMenu(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } };
    const close = () => setMenu(false);
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    window.addEventListener('scroll', close, { passive: true }); window.addEventListener('resize', close);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); window.removeEventListener('scroll', close); window.removeEventListener('resize', close); };
  }, [menu]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const elements = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-cd-reveal]') ?? []);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('cd-pending'); observer.unobserve(entry.target); } }), { threshold: 0.05 });
    const configure = () => { observer.disconnect(); elements.forEach(el => { el.classList.remove('cd-pending'); if (!paused && !preference.matches && el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('cd-pending'); observer.observe(el); } }); };
    const focus = (event: FocusEvent) => { if (event.target instanceof HTMLElement) event.target.closest('[data-cd-reveal]')?.classList.remove('cd-pending'); };
    configure(); preference.addEventListener('change', configure); const node = root.current; node?.addEventListener('focusin', focus);
    return () => { observer.disconnect(); preference.removeEventListener('change', configure); node?.removeEventListener('focusin', focus); };
  }, [design, section, paused]);

  const selectors = <div className="cd-selectors" role="group" aria-label={t(data.heading)}>{data.items.map((item, i) => <button className={`ld-button${active === i ? '' : ' ld-secondary'}`} aria-pressed={active === i} key={i} onClick={() => setActive(i)}>{t(item.title)}</button>)}</div>;
  const art = <div className={`cd-art cd-art-${active}`}>
    {isNewAnimated(design) ? <NewConceptArt design={design} active={active} language={language}/> : design === 'rally' ? <div className="cd-ticket"><span>RALLY / 026</span><strong>{['IDEAS', 'MAKE', 'MEET'][active]}</strong><div className="cd-ticket-lines" aria-hidden="true"/><span>{t(['GOOD PEOPLE. GREAT ENERGY.', 'ХОРОШІ ЛЮДИ. ПОТУЖНА ЕНЕРГІЯ.', 'OAMENI BUNI. ENERGIE GROZAVĂ.'])}</span></div>
      : design === 'serein' ? <div className="cd-ritual-scene"><div className="cd-halo" aria-hidden="true"/><div className="cd-bottle"><span>serein</span><strong>{['01', '02', '03'][active]}</strong><span>{t(data.items[active].title)}</span><small>DAILY RITUAL / 100 ML</small></div><span className="cd-scene-caption">{t(['Slow down. Stay a while.', 'Сповільніться. Залиштесь на мить.', 'Încetinește. Rămâi o clipă.'])}</span></div>
      : design === 'foundry' ? <div className="cd-machine"><div className="cd-machine-label"><span>SYSTEM / 00{active + 1}</span><span>{t(['CONNECTED', 'ПОЄДНАНО', 'CONECTAT'])}</span></div><svg viewBox="0 0 600 400" role="img" aria-label={t(['Connected infrastructure illustration', 'Ілюстрація поєднаної інфраструктури', 'Ilustrație de infrastructură conectată'])}><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m80 240 220 120 220-120-220-120Z M80 240v-90L300 30l220 120v90M300 30v90M80 150l220 120 220-120M300 270v90"/><g className="cd-machine-core"><path d="m190 180 110 60 110-60-110-60Z M190 180v-50l110-60 110 60v50M190 130l110 60 110-60M300 190v50"/></g><path className="cd-scan" d="M80 150l220 120 220-120"/></g></svg><div className="cd-machine-label"><span>INPUT → PROCESS → OUTPUT</span><span>F / {['01','02','03'][active]}</span></div></div>
      : <div className="cd-chart"><span className="ld-kicker">{t(['ILLUSTRATIVE SCENARIO / NO FINANCIAL FORECAST', 'УМОВНИЙ СЦЕНАРІЙ / НЕ ФІНАНСОВИЙ ПРОГНОЗ', 'SCENARIU ILUSTRATIV / FĂRĂ PROGNOZĂ FINANCIARĂ'])}</span><div className="cd-chart-title"><strong>{['1.4', '1.8', '2.3'][active]}×</strong><span>{t(data.items[active].title)}</span></div><svg key={active} viewBox="0 0 500 240" preserveAspectRatio="none" role="img" aria-label={t(['Illustrative growth curve', 'Умовна крива зростання', 'Curbă ilustrativă de creștere'])}><g stroke="currentColor" opacity=".15"><path d="M10 40h480M10 100h480M10 160h480M10 220h480"/></g><path className="cd-chart-curve" fill="none" stroke="currentColor" strokeWidth="3" pathLength="1" d={['M10 210C90 190 100 210 170 165S290 140 350 105 430 80 490 65', 'M10 210C110 210 100 160 180 170S290 90 350 100 420 40 490 35', 'M10 210C90 210 130 150 190 160S300 115 350 65 440 50 490 15'][active]}/></svg><div className="cd-chart-axis"><span>01 / {t(['Today', 'Сьогодні', 'Astăzi'])}</span><span>02 / {t(['Next chapter', 'Наступний етап', 'Capitolul următor'])}</span></div></div>}
  </div>;

  const explore = isNewAnimated(design) ? <NewConceptExplore design={design} data={data} active={active} onChange={setActive} language={language} standalone={section !== 'home'} contactUrl={url('contact')} cta={cta} motionControl={<button className="ld-text-link cd-motion-toggle nc-page-motion" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? t(['Play motion', 'Увімкнути анімацію', 'Pornește animația']) : t(['Pause motion', 'Зупинити анімацію', 'Oprește animația'])}</button>}/> : <section id="explore" className={`ld-container ld-section cd-explore cd-explore-${design}`} data-cd-reveal><span className="ld-kicker">01 / {labels[0]}</span><Heading>{t(data.heading)}</Heading>
    {design === 'rally' ? <><div className="cd-programme">{data.items.map((item, i) => <details key={i} open={active === i} onToggle={event => { if (event.currentTarget.open) setActive(i); }}><summary><span>0{i + 1}</span><h3>{t(item.title)}</h3><Arrow/></summary><p>{t(item.text)}</p></details>)}</div><div className="cd-event-note">{t(['A fictional event. A real reason to bring people together.', 'Концептуальна подія. Справжня причина зібрати людей.', 'Un eveniment imaginar. Un motiv real pentru a aduna oamenii.'])}</div></>
      : design === 'serein' ? <div className="cd-ritual-layout"><div>{selectors}<div key={active} className="cd-active-story" aria-live="polite"><h3>{t(data.items[active].title)}</h3><p>{t(data.items[active].text)}</p>{cta}</div></div>{art}</div>
      : design === 'foundry' ? <div className="cd-services">{data.items.map((item, i) => <article key={i}><span className="ld-kicker">F / 0{i + 1}</span><h3>{t(item.title)}</h3><p>{t(item.text)}</p><Link className="ld-text-link" href={url('contact')}>{t(data.action)}<Arrow/></Link></article>)}</div>
      : <div className="cd-ledger-layout"><div>{selectors}<p aria-live="polite">{t(data.items[active].text)}</p><p className="cd-scenario-note">{t(['Explore three illustrative perspectives, not investment outcomes.', 'Три умовні погляди, а не результати інвестицій.', 'Trei perspective ilustrative, nu rezultate de investiții.'])}</p></div>{art}</div>}
  </section>;
  const about = <section id="approach" className="cd-about" data-cd-reveal><div className="ld-container"><span className="ld-kicker">02 / {labels[1]}</span><Heading>{t(data.title)}</Heading><p>{t(data.about)}</p><div className="cd-principles">{data.items.map((item, i) => <span key={i}><b>0{i + 1}</b>{t(item.title)}</span>)}</div></div></section>;
  const questions = <section id="questions" className="ld-container ld-section cd-questions" data-cd-reveal><div><span className="ld-kicker">03 / {labels[2]}</span><Heading>{business ? t(['A closer look.', 'Погляньмо ближче.', 'O privire mai atentă.']) : shell.faq}</Heading></div><div>{business ? data.items.map((item, i) => <details key={i}><summary>{t(item.title)}<Arrow/></summary><p>{t(item.text)} {t(data.about)}</p><Link className="ld-text-link" href={url('contact')}>{labels[3]}<Arrow/></Link></details>) : [[t(['Can I adapt this design?', 'Чи можна адаптувати дизайн?', 'Pot adapta acest design?']), copy.note], [t(['What can I try?', 'Що можна спробувати?', 'Ce pot încerca?']), t(['Use the navigation, explore the interactive sections and try the demo form.', 'Спробуйте навігацію, інтерактивні секції та демоформу.', 'Încearcă navigarea, secțiunile interactive și formularul demo.'])], [t(['Does this form send anything?', 'Чи надсилає форма дані?', 'Formularul trimite date?']), shell.formNote]].map(([question, answer], i) => <details key={i}><summary>{question}<Arrow/></summary><p>{answer}</p></details>)}</div></section>;
  const contact = <section id="contact" className="ld-contact"><div className="ld-container ld-contact-grid"><div><span className="ld-kicker">04 / {labels[3]}</span><Heading>{t(data.action)}</Heading><p>{t(data.intro)}</p></div><div className="ld-form-card">{sent ? <div ref={success} tabIndex={-1} role="status" className="ld-success"><h3>{shell.success}</h3><button className="ld-button" onClick={() => { setSent(false); requestAnimationFrame(() => form.current?.querySelector('input')?.focus()); }}>{shell.again}<Arrow/></button></div> : <form ref={form} onSubmit={event => { event.preventDefault(); setSent(true); }}><p className="ld-form-note">{shell.formNote}</p><label htmlFor="cd-name">{shell.name}</label><input id="cd-name" required autoComplete="name" maxLength={100} placeholder="Alex"/><label htmlFor="cd-email">{shell.email}</label><input id="cd-email" required type="email" autoComplete="email" maxLength={254} placeholder="alex@example.com"/><label htmlFor="cd-message">{shell.message}</label><textarea id="cd-message" rows={3} maxLength={2000}/><button type="submit" className="ld-button">{shell.send}<Arrow/></button></form>}</div></div></section>;

  return <><Head title={`${data.brand} — ${shell.demo}`}><meta name="robots" content="noindex, nofollow"/></Head><div className="ld-preview-bar"><a className="ld-preview-brand" href={back}>I&I Studio <span>/ {shell.demo} · {design}</span></a><a className="btn btn-secondary btn-sm" href={back}>{shell.back}</a><a className="btn btn-primary btn-sm" href={localizedUrl(`/inquiry?service=${data.service}&design=${design}`, language)}>{copy.choose}</a><p className="cd-preview-note">{copy.note}</p></div>
    <div ref={root} className={`landing-demo animated-demo cd-${design}${paused ? ' cd-paused' : ''}`}><a className="ld-skip" href="#demo-main">{shell.skip}</a><header className="ld-header"><div className="ld-container ld-header-inner" ref={navigation}>{business ? <Link className="ld-brand" href={url()}>{data.brand}</Link> : <a className="ld-brand" href="#demo-main">{data.brand}</a>}<button ref={menuButton} className="ld-button ld-secondary ld-menu-button" aria-expanded={menu} aria-controls="cd-navigation" onClick={() => setMenu(!menu)}>{menu ? shell.close : shell.menu}<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" aria-hidden="true"><path d={menu ? 'm6 6 12 12M6 18 18 6' : 'M4 8h16M4 16h16'}/></svg></button><nav id="cd-navigation" className={`ld-nav${menu ? ' is-open' : ''}`} aria-label={shell.menu}>{labels.map((_, i) => <span key={i}>{navLink(i)}</span>)}</nav></div></header>
      <main id="demo-main" ref={main} tabIndex={-1}>{section === 'home' ? <><section className="ld-container cd-hero"><div className="cd-hero-copy"><span className="ld-kicker">{t(data.label)}</span><h1>{t(data.title)}</h1><p>{t(data.intro)}</p><div className="ld-hero-actions">{cta}<button className="ld-text-link cd-motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? t(['Play motion', 'Увімкнути анімацію', 'Pornește animația']) : t(['Pause motion', 'Зупинити анімацію', 'Oprește animația'])}</button></div></div>{art}{design === 'rally' && <div className="cd-event-meta"><span>02 DAYS / 03 TRACKS</span><span>{t(['DESIGN / CULTURE / CONNECTION', 'ДИЗАЙН / КУЛЬТУРА / ЗНАЙОМСТВА', 'DESIGN / CULTURĂ / CONEXIUNI'])}</span></div>}</section>{design === 'rally' && <div className="cd-marquee" aria-hidden="true"><div>{[0,1,2,3].map(i => <span key={i}>IDEAS INTO ACTION / PEOPLE INTO COMMUNITY / </span>)}</div></div>}{explore}{about}{questions}{contact}</> : section === 'collection' ? explore : section === 'about' ? about : section === 'journal' ? questions : contact}</main>
      <footer className="cd-footer"><div className="ld-container"><span className="ld-kicker">{shell.sample}</span><a className="cd-wordmark" href={business ? url() : '#demo-main'}>{data.brand}</a><div className="cd-footer-bottom"><nav aria-label={t(['Footer navigation', 'Навігація внизу', 'Navigare în subsol'])}>{labels.map((_, i) => <span key={i}>{navLink(i)}</span>)}</nav><a className="ld-text-link" href="#demo-main">{t(['Back to top', 'На початок', 'Înapoi sus'])}<Arrow/></a></div></div></footer>
    </div></>;
}
