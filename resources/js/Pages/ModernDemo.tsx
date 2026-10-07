import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { modernDemos, modernText } from '../content/modernDemos';
import { demoShellCopy } from '../content/landingDemos';
import { getWebsiteDesignCopy } from '../content/websiteDesigns';
import { localizedUrl } from '../content/siteLanguage';
import { useSiteLanguage } from '../content/uiTranslations';
import '../../css/pages/landing-demo.css';
import '../../css/pages/modern-demo.css';
import '../../css/pages/modern-identities.css';
import Visual from '../Components/ModernDemoArt';
import { ModernExplore, ModernAbout, ModernJournal, identityHeadings, identityNotes } from '../Components/ModernDemoSections';

function Arrow() { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>; }

export default function ModernDemo({ design, section = 'home' }: { design: string; section?: string }) {
  const language = useSiteLanguage();
  const data = modernDemos[design];
  const t = (value: [string,string,string]) => modernText(value, language);
  const shell = demoShellCopy[language];
  const copy = getWebsiteDesignCopy(language);
  const business = data.service === 'corporate';
  const SectionHeading = section === 'home' ? 'h2' : 'h1';
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const back = localizedUrl(`/inquiry?service=${data.service}&designs=1`, language);
  const url = (page: string) => localizedUrl(`/designs/${design}${page === 'home' ? '' : `/${page}`}`, language);
  const labels = business ? [t(['Expertise','Напрями','Expertiză']), t(['Our story','Про нас','Povestea noastră']), t(['Journal','Журнал','Jurnal']), shell.nav[3]] : shell.nav;
  const pages = ['collection','about','journal','contact'];
  const ids = ['explore','approach','questions','contact'];
  const nav = (index: number, label: string) => business ? <Link href={url(pages[index])} onClick={() => setMenu(false)} aria-current={section === pages[index] ? 'page' : undefined}>{label}</Link> : <a href={`#${ids[index]}`} onClick={() => setMenu(false)}>{label}</a>;
  useEffect(() => {
    setMenu(false); setSent(false);
    main.current?.focus({preventScroll:true});
  }, [design,section]);
  useEffect(() => {
    if (sent) success.current?.focus();
  }, [sent]);
  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setMenu(false); };
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); menuRef.current?.focus(); } };
    const close = () => setMenu(false);
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    window.addEventListener('scroll', close, {passive:true}); window.addEventListener('resize', close);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); window.removeEventListener('scroll', close); window.removeEventListener('resize', close); };
  }, [menu]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const elements = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-md-reveal]') ?? []);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.remove('md-pending'); observer.unobserve(entry.target); } }), {threshold:0.05});
    const configure = () => { observer.disconnect(); elements.forEach(el => { el.classList.remove('md-pending'); if(!preference.matches && el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('md-pending'); observer.observe(el); } }); };
    const focus = (event: FocusEvent) => { if(event.target instanceof HTMLElement) event.target.closest('[data-md-reveal]')?.classList.remove('md-pending'); };
    configure(); preference.addEventListener('change', configure); const node = root.current; node?.addEventListener('focusin', focus);
    return () => { observer.disconnect(); preference.removeEventListener('change',configure); node?.removeEventListener('focusin',focus); };
  }, [design,section]);
  const cta = business ? <Link className="ld-button" href={url('contact')}>{shell.nav[3]}<Arrow/></Link> : <a className="ld-button" href="#contact">{shell.nav[3]}<Arrow/></a>;
  const sectionProps = { design, data, language, inner: section !== 'home', cta, details: shell.details, active, onActive: setActive };
  const projects = <ModernExplore {...sectionProps}/>;
  const about = <ModernAbout {...sectionProps}/>;
  const questions = business ? <ModernJournal {...sectionProps}/> : <section id="questions" className="ld-container ld-section md-faq" data-md-reveal><div><span className="ld-kicker">03 / {labels[2]}</span><SectionHeading>{business ? t(['Notes from the studio.', 'Нотатки студії.', 'Notițe din studio.']) : shell.faq}</SectionHeading></div><div>{(business ? data.items.map(item => [t(item.title), `${t(item.text)} ${t(data.about)}`]) : [
    [t(['Can this direction fit my brand?', 'Чи підійде цей стиль моєму бренду?', 'Se poate adapta stilul la brandul meu?']), copy.note],
    [t(['What can I try here?', 'Що можна спробувати тут?', 'Ce pot încerca aici?']), t(['Explore the navigation, expand the stories and try the form. This is an interactive design concept.', 'Перегляньте навігацію, відкрийте історії та спробуйте форму. Це інтерактивний концепт дизайну.', 'Explorează navigarea, deschide poveștile și încearcă formularul. Acesta este un concept de design interactiv.'])],
    [t(['Will the form send my details?', 'Чи надсилає форма мої дані?', 'Formularul trimite datele mele?']), shell.formNote],
  ]).map(([question,answer],i) => <details key={i}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>;
  const contact = <section id="contact" className="ld-contact"><div className="ld-container ld-contact-grid"><div><span className="ld-kicker">04 / {shell.nav[3]}</span><SectionHeading>{t(identityHeadings[design].contact)}</SectionHeading><p>{t(data.intro)}</p></div><div className="ld-form-card">{sent ? <div ref={success} tabIndex={-1} role="status" className="ld-success"><h3>{shell.success}</h3><button className="ld-button" onClick={() => {setSent(false); requestAnimationFrame(() => form.current?.querySelector('input')?.focus());}}>{shell.again}<Arrow/></button></div> : <form ref={form} onSubmit={e => {e.preventDefault();setSent(true);}}><p className="ld-form-note">{shell.formNote}</p><label htmlFor="md-name">{shell.name}</label><input id="md-name" autoComplete="name" maxLength={100} required placeholder="Alex"/><label htmlFor="md-email">{shell.email}</label><input id="md-email" type="email" autoComplete="email" maxLength={254} required placeholder="alex@example.com"/><label htmlFor="md-message">{shell.message}</label><textarea id="md-message" rows={3} maxLength={2000}/><button type="submit" className="ld-button">{shell.send}<Arrow/></button></form>}</div></div></section>;
  return <><Head title={`${data.brand} — ${shell.demo}`}><meta name="robots" content="noindex, nofollow"/></Head><div className="ld-preview-bar"><a className="ld-preview-brand" href={back}>I&I Studio <span>/ {shell.demo} · {design}</span></a><a className="btn btn-secondary btn-sm" href={back}>← {shell.back}</a><a className="btn btn-primary btn-sm" href={localizedUrl(`/inquiry?service=${data.service}&design=${design}`,language)}>{copy.choose}</a><p className="md-preview-note">{copy.note}</p></div><div ref={root} className={`landing-demo modern-demo md-${design}`}><a className="ld-skip" href="#demo-main">{shell.skip}</a><header className="ld-header"><div className="ld-container ld-header-inner" ref={navRef}>{business ? <Link className="ld-brand" href={url('home')}>{data.brand}</Link> : <a className="ld-brand" href="#demo-main">{data.brand}</a>}<button ref={menuRef} className="ld-button ld-secondary ld-menu-button" aria-expanded={menu} aria-controls="md-navigation" onClick={() => setMenu(!menu)}>{menu ? shell.close : shell.menu}<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" aria-hidden="true"><path d={menu ? 'm6 6 12 12M6 18 18 6' : 'M4 8h16M4 16h16'}/></svg></button><nav id="md-navigation" className={`ld-nav${menu?' is-open':''}`} aria-label={shell.menu}>{labels.map((label,i) => <span key={i}>{nav(i,label)}</span>)}</nav></div></header><main ref={main} id="demo-main" tabIndex={-1}>{section === 'home' ? <><section className="ld-container ld-hero md-hero"><div className="ld-hero-copy"><span className="ld-kicker">{t(data.label)}</span><h1>{t(data.title)}</h1><p>{t(data.intro)}</p><div className="ld-hero-actions">{cta}{business ? <Link className="ld-text-link" href={url('collection')}>{labels[0]}<Arrow/></Link> : <a className="ld-text-link" href="#explore">{labels[0]}<Arrow/></a>}</div><span className="ld-hero-footnote">{t(['INDEPENDENT CONCEPT / 2026', 'НЕЗАЛЕЖНИЙ КОНЦЕПТ / 2026', 'CONCEPT INDEPENDENT / 2026'])}</span></div><div className="md-hero-art"><Visual design={design}/></div></section><div className="md-ribbon"><div className="ld-container"><span>{data.brand}</span><span>{t(identityNotes[design].ribbon)}</span><span>{identityNotes[design].disciplines}</span></div></div>{design==='prism' && <section className="ld-container ld-section md-interactive"><div><span className="ld-kicker">{design === 'prism' ? t(['YOUR COLOUR / YOUR DIRECTION', 'ВАШ КОЛІР / ВАШ НАПРЯМ', 'CULOAREA TA / DIRECȚIA TA']) : 'YOUR WORKSPACE / YOUR WAY'}</span><h2>{t(data.section)}</h2><div className="ld-tabs" role="group" aria-label={labels[0]}>{data.items.map((item,i)=><button key={i} className={`ld-button ${active!==i?'ld-secondary':''}`} aria-pressed={active===i} onClick={()=>setActive(i)}>{t(item.title)}</button>)}</div><p aria-live="polite">{t(data.items[active].text)}</p></div><Visual design={design} variant={active}/></section>}{projects}{about}{questions}{contact}</> : section==='collection' ? projects : section==='about' ? about : section==='journal' ? questions : contact}</main><footer className="md-footer"><div className="ld-container"><div className="md-footer-top"><div><span className="ld-kicker">{t(identityHeadings[design].footer)}</span><a href={business ? url('home') : '#demo-main'} className="md-wordmark">{data.brand}</a></div>{cta}</div><nav aria-label="Footer">{labels.map((label,i)=><span key={i}>{nav(i,label)}</span>)}</nav><div className="md-footer-bottom"><span>{shell.sample}</span><a className="ld-text-link" href="#demo-main">↑ {t(['Back to top','На початок','Înapoi sus'])}</a></div></div></footer></div></>;
}
