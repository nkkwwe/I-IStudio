import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import LandingDemoArt from '../Components/LandingDemoArt';
import LandingDemoFeature from '../Components/LandingDemoFeature';
import { demoShellCopy, landingDemos, type LandingDemoId } from '../content/landingDemos';
import { getWebsiteDesignCopy } from '../content/websiteDesigns';
import { localizedUrl } from '../content/siteLanguage';
import { useSiteLanguage } from '../content/uiTranslations';
import '../../css/pages/landing-demo.css';

export default function LandingDemo({ design }: { design: LandingDemoId }) {
  const language = useSiteLanguage();
  const shell = demoShellCopy[language];
  const data = landingDemos[design];
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [annual, setAnnual] = useState(false);
  const [plan, setPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const completedOnce = useRef(false);
  const demoRoot = useRef<HTMLDivElement>(null);
  const anchors = ['explore', 'approach', 'questions', 'contact'];
  const tabbed = design === 'pulse' || design === 'orbit';

  useEffect(() => {
    const root = demoRoot.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-ld-reveal]'));
    const reveal = (element: HTMLElement) => { element.classList.remove('ld-reveal-pending'); observer?.unobserve(element); };
    const configure = () => {
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove('ld-reveal-pending'));
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
      }, { threshold: 0, rootMargin: '0px 0px 40px 0px' });
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add('ld-reveal-pending');
          observer?.observe(element);
        }
      });
    };
    const revealFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        const section = event.target.closest<HTMLElement>('[data-ld-reveal]');
        if (section) reveal(section);
      }
    };
    configure();
    preference.addEventListener('change', configure);
    root.addEventListener('focusin', revealFocus);
    return () => { observer?.disconnect(); preference.removeEventListener('change', configure); root.removeEventListener('focusin', revealFocus); };
  }, [design]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: PointerEvent) => { if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    const resize = () => { if (window.innerWidth > 760) setMenuOpen(false); };
    const scroll = () => setMenuOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (submitted) {
      completedOnce.current = true;
      successRef.current?.focus();
    } else if (completedOnce.current) {
      formRef.current?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
    }
  }, [submitted]);

  const choosePlan = (name: string) => {
    setPlan(`${name} · ${annual ? shell.yearly : shell.monthly}`);
    setSubmitted(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    // Focus without jumping while the section scrolls into view.
    formRef.current?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
  };
  const selectTab = (index: number) => { setTab(index); tabRefs.current[index]?.focus(); };

  return <>
    <Head title={`${design[0].toUpperCase()}${design.slice(1)} — Live demo`}><meta name="robots" content="noindex, nofollow" /></Head>
    <div className="ld-preview-bar"><a className="ld-preview-brand" href={localizedUrl('/inquiry?service=landing&designs=1', language)}>I&I Studio <span> / {shell.demo} · {design}</span></a><a className="btn btn-secondary btn-sm" href={localizedUrl('/inquiry?service=landing&designs=1', language)}>← {shell.back}</a><a className="btn btn-primary btn-sm" href={localizedUrl(`/inquiry?service=landing&design=${design}`, language)}>{getWebsiteDesignCopy(language).choose} ✓</a></div>
    <div ref={demoRoot} className={`landing-demo ld-${design}`}>
      <a className="ld-skip" href="#demo-main">{shell.skip}</a>
      <header className="ld-header">
        <div className="ld-container ld-header-inner" ref={menuRef}>
          <a href="#demo-main" className="ld-brand" aria-label={`${data.brand} home`}>{data.brand}</a>
          <button ref={menuButton} className="ld-button ld-menu-button ld-secondary" aria-controls="demo-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? `${shell.close} ×` : `${shell.menu} ☰`}</button>
          <nav id="demo-navigation" className={`ld-nav${menuOpen ? ' is-open' : ''}`} aria-label="Demo navigation">
            {anchors.map((anchor, index) => <a key={anchor} href={`#${anchor}`} onClick={() => setMenuOpen(false)}>{shell.nav[index]}<span aria-hidden="true">{index === 3 ? ' ↗' : ''}</span></a>)}
          </nav>
        </div>
      </header>
      <main id="demo-main" tabIndex={-1}>
        <section className="ld-container ld-hero" aria-labelledby="hero-title">
          <div className="ld-hero-copy"><span className="ld-kicker">{data.eyebrow}</span><h1 id="hero-title">{data.title}</h1><p>{data.intro}</p><div className="ld-hero-actions"><a className="ld-button" href={design === 'atelier' ? '#explore' : '#contact'}>{data.cta}<span aria-hidden="true">↗</span></a><a className="ld-text-link" href={design === 'atelier' ? '#approach' : '#explore'}>{design === 'mono' ? 'Discover our work' : design === 'pulse' ? 'See it in action' : design === 'orbit' ? 'Explore our capabilities' : 'Our philosophy'} <span aria-hidden="true">↓</span></a></div><div className="ld-hero-footnote"><span className="ld-status-dot" aria-hidden="true"/>{design === 'pulse' ? 'A little less busy. A little more brilliant.' : design === 'orbit' ? 'STRATEGY / DESIGN / ENGINEERING' : design === 'atelier' ? 'Good things take a little time.' : 'INDEPENDENT MINDS. CONSIDERED DESIGN.'}</div></div>
          <div className="ld-hero-art"><LandingDemoArt design={design}/>{design === 'pulse' && <div className="ld-floating-note"><span aria-hidden="true">✦</span><div><strong>Room to focus.</strong><span>One good idea at a time.</span></div></div>}{design === 'orbit' && <div className="ld-orbit-coordinates" aria-hidden="true"><span>01 / A NEW PERSPECTIVE</span><span>360°</span></div>}{design === 'atelier' && <span className="ld-art-caption">The everyday collection / 01</span>}{design === 'mono' && <span className="ld-art-caption">Form follows purpose. / 2026</span>}</div>
        </section>
        <div className="ld-trust ld-container"><span>{design === 'atelier' ? 'Thoughtfully imagined. Naturally inspired.' : 'GOOD IDEAS. GOOD COMPANY.'}</span><div><b>{design === 'atelier' ? 'EARTH' : 'ACME'}</b><b>{design === 'atelier' ? 'form & feeling' : 'Layers'}</b><b>{design === 'atelier' ? 'SLOW STUDIO' : 'Catalog'}</b><b>{design === 'atelier' ? 'gather.' : 'Quotient'}</b></div></div>
        <section id="explore" className="ld-container ld-section" data-ld-reveal aria-labelledby="explore-title">
          <div className="ld-section-heading"><div><span className="ld-kicker">{data.sectionLabel}</span><h2 id="explore-title">{data.sectionTitle}</h2></div><p>{data.sectionIntro}</p></div>
          {tabbed ? <>
            <div className="ld-tabs" role="tablist" aria-label={data.sectionLabel}>{data.items.map((item, index) => <button ref={(element) => { tabRefs.current[index] = element; }} key={item.title} id={`tab-${index}`} role="tab" aria-selected={tab === index} aria-controls={`panel-${index}`} tabIndex={tab === index ? 0 : -1} className="ld-button ld-secondary" onClick={() => setTab(index)} onKeyDown={(event) => { const next = event.key === 'ArrowRight' ? (index + 1) % 3 : event.key === 'ArrowLeft' ? (index + 2) % 3 : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : null; if (next !== null) { event.preventDefault(); selectTab(next); } }}>{item.title}</button>)}</div>
            {data.items.map((item, index) => <div key={item.title} id={`panel-${index}`} role="tabpanel" aria-labelledby={`tab-${index}`} tabIndex={0} hidden={tab !== index} className="ld-tab-panel"><div><span className="ld-kicker">0{index + 1} / {item.title}</span><h3>{item.tag}</h3><p>{item.text}</p><a className="ld-text-link" href="#contact">{shell.nav[3]} ↗</a></div><LandingDemoArt design={design} variant={index}/></div>)}
          </> : <div className="ld-project-grid">{data.items.map((item, index) => <article className="ld-project" key={item.title}><div className="ld-project-art"><LandingDemoArt design={design} variant={index}/></div><div className="ld-project-meta"><span>{item.tag}</span><span>0{index + 1}</span></div><h3>{item.title}</h3><details className="ld-story"><summary>{shell.details}<span aria-hidden="true">＋</span></summary><p>{item.text}</p><a href="#contact" className="ld-text-link">{shell.nav[3]} ↗</a></details></article>)}</div>}
        </section>
        <section id="approach" className="ld-approach" data-ld-reveal aria-labelledby="approach-title"><div className="ld-container"><span className="ld-kicker">A CONSIDERED APPROACH</span><div className="ld-approach-copy"><h2 id="approach-title">{data.aboutTitle}</h2><p>{data.about}</p></div><div className="ld-stats">{data.stats.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></div></section>
        <LandingDemoFeature design={design}/>
        {design === 'pulse' && <section className="ld-container ld-section" aria-labelledby="pricing-title"><div className="ld-section-heading"><div><span className="ld-kicker">SIMPLE SAMPLE PRICING</span><h2 id="pricing-title">A little space. Or a lot.</h2></div><div className="ld-billing" role="group" aria-label="Billing period"><button className="ld-button ld-secondary" aria-pressed={!annual} onClick={() => setAnnual(false)}>{shell.monthly}</button><button className="ld-button ld-secondary" aria-pressed={annual} onClick={() => setAnnual(true)}>{shell.yearly}</button></div></div><div className="ld-pricing">{[{ name: 'Free', price: 0, features: ['A personal workspace', '3 sample projects', 'Room to get started'] }, { name: 'Team', price: 15, features: ['A shared team space', 'Unlimited sample projects', 'Views for every workflow'] }, { name: 'Studio', price: 30, features: ['Everything in Team', 'Multiple workspaces', 'A bigger picture of progress'] }].map((item, index) => <article className={`ld-price-card${index === 1 ? ' is-featured' : ''}`} key={item.name}><span className="ld-kicker">{item.name}{index === 1 && ' / THE SWEET SPOT'}</span><p className="ld-price">${annual ? item.price * .8 : item.price}<span>{shell.month}</span></p><p className="ld-price-note">{annual && item.price ? `${shell.annual}: $${item.price * .8 * 12}` : 'Fictional demo plan'}</p><ul>{item.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><button className="ld-button" onClick={() => choosePlan(item.name)}>{shell.plan} ↗</button></article>)}</div></section>}
        <section id="questions" className="ld-container ld-section ld-faq" aria-labelledby="faq-title"><div><span className="ld-kicker">GOOD QUESTIONS</span><h2 id="faq-title">{shell.faq}</h2></div><div>{data.faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div></section>
        <section id="contact" className="ld-contact" aria-labelledby="contact-title"><div className="ld-container ld-contact-grid"><div><span className="ld-kicker">LET’S BEGIN</span><h2 id="contact-title">{data.contactTitle}</h2><p>{data.contactIntro}</p></div><div className="ld-form-card">{submitted ? <div ref={successRef} className="ld-success" role="status" tabIndex={-1}><span aria-hidden="true">✓</span><h3>{shell.success}</h3><button className="ld-button ld-secondary" onClick={() => setSubmitted(false)}>{shell.again} ↗</button></div> : <form ref={formRef} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><p className="ld-form-note">{shell.formNote}</p>{plan && <p className="ld-plan-selection">{shell.selected}: <strong>{plan}</strong></p>}<label htmlFor="demo-name">{shell.name}</label><input id="demo-name" name="name" autoComplete="name" maxLength={100} required placeholder="Alex"/><label htmlFor="demo-email">{shell.email}</label><input id="demo-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="alex@example.com"/>{design !== 'atelier' && <><label htmlFor="demo-message">{shell.message}</label><textarea id="demo-message" name="message" maxLength={2000} rows={3} placeholder="A little about what you have in mind…"/></>}<button type="submit" className="ld-button">{shell.send}<span aria-hidden="true">↗</span></button></form>}</div></div></section>
      </main>
      <footer className="ld-container ld-footer"><a className="ld-brand" href="#demo-main">{data.brand}</a><span>{shell.sample}</span><a className="ld-text-link" href="#demo-main">↑ Back to top</a></footer>
    </div>
  </>;
}
