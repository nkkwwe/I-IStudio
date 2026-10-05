import type { RefObject } from 'react';
import type { LandingDemoId } from '../content/landingDemos';

export type DemoNavItem = { id: string; label: string };
export const demoNavigationLabels = {
  en: { mono: ['Work', 'Studio', 'Details', 'Start a project'], pulse: ['Features', 'Why Pulse', 'Help', 'Get started'], orbit: ['Capabilities', 'Principles', 'Briefing', 'Initiate contact'], atelier: ['Collection', 'Our story', 'Good to know', 'Stay inspired'] },
  uk: { mono: ['Роботи', 'Студія', 'Деталі', 'Почати проєкт'], pulse: ['Можливості', 'Чому Pulse', 'Допомога', 'Почати'], orbit: ['Напрями', 'Принципи', 'Брифінг', 'Зв’язатися'], atelier: ['Колекція', 'Наша історія', 'Корисне', 'Натхнення'] },
  ro: { mono: ['Proiecte', 'Studio', 'Detalii', 'Începe un proiect'], pulse: ['Funcții', 'De ce Pulse', 'Ajutor', 'Începe acum'], orbit: ['Capabilități', 'Principii', 'Briefing', 'Contact'], atelier: ['Colecție', 'Povestea noastră', 'De știut', 'Inspirație'] },
};

export function LandingDemoSignature({ design }: { design: LandingDemoId }) {
  if (design === 'mono') return <div className="ld-trust ld-container"><span>FORM FOLLOWS PURPOSE.</span><div><b>Strategy</b><b>Identity</b><b>Digital</b></div></div>;
  if (design === 'orbit') return <div className="ld-trust ld-container"><span>CONNECTED DISCIPLINES / ONE SYSTEM</span><div><b>STRATEGY_01</b><b>DESIGN_02</b><b>ENGINEERING_03</b></div></div>;
  if (design === 'atelier') return <div className="ld-trust ld-container"><span>Thoughtfully imagined. Naturally inspired.</span></div>;
  return <div className="ld-trust ld-container"><span>GOOD IDEAS. GOOD COMPANY.</span><div><b>ACME</b><b>Layers</b><b>Catalog</b><b>Quotient</b></div></div>;
}
type HeaderProps = {
  design: LandingDemoId;
  brand: string;
  links: DemoNavItem[];
  open: boolean;
  menuLabel: string;
  closeLabel: string;
  onToggle: () => void;
  onNavigate: () => void;
  rootRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export function LandingDemoHeader({ design, brand, links, open, menuLabel, closeLabel, onToggle, onNavigate, rootRef, buttonRef }: HeaderProps) {
  const link = (item: DemoNavItem, index: number) => <a key={item.id} href={`#${item.id}`} onClick={onNavigate}>{(design === 'mono' || design === 'orbit') && <span className="ld-nav-index" aria-hidden="true">0{index + 1}</span>}<span>{item.label}</span>{design === 'pulse' && item.id === 'contact' && <span aria-hidden="true">↗</span>}</a>;
  return <header className="ld-header"><div className="ld-container ld-header-inner" ref={rootRef}>
    <a href="#demo-main" className="ld-brand" aria-label={`${brand} home`}>{design === 'pulse' && <span className="ld-brand-star" aria-hidden="true">✳</span>}{brand}</a>
    {design === 'mono' && <div className="ld-header-caption">Independent studio<br/>Identity & digital</div>}
    {design === 'orbit' && <span className="ld-header-caption">DIGITAL SYSTEMS / 001</span>}
    <button ref={buttonRef} className="ld-button ld-menu-button ld-secondary" aria-controls="demo-navigation" aria-expanded={open} onClick={onToggle}>{open ? `${closeLabel} ×` : `${menuLabel} ${design === 'orbit' ? '＋' : design === 'atelier' ? '≡' : '☰'}`}</button>
    <nav id="demo-navigation" className={`ld-nav${open ? ' is-open' : ''}`} aria-label="Demo navigation">{design === 'atelier' ? <><div className="ld-nav-group">{links.slice(0, 2).map(link)}</div><div className="ld-nav-group">{links.slice(2).map((item, index) => link(item, index + 2))}</div></> : links.map(link)}</nav>
  </div></header>;
}

export function LandingDemoFooter({ design, brand, links, sample }: { design: LandingDemoId; brand: string; links: DemoNavItem[]; sample: string }) {
  const navigation = <nav aria-label="Footer navigation">{links.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>;
  if (design === 'mono') return <footer className="ld-footer ld-mono-footer ld-container"><div className="ld-footer-invitation"><span className="ld-kicker">THE NEXT GOOD IDEA STARTS HERE</span><a href="#contact">Let’s make<br/>something matter.<span aria-hidden="true">↗</span></a></div><div className="ld-footer-bottom"><a className="ld-brand" href="#demo-main">{brand}</a>{navigation}<span>{sample}</span><a className="ld-text-link" href="#demo-main">Back to top ↑</a></div></footer>;
  if (design === 'pulse') return <footer className="ld-footer ld-pulse-footer"><div className="ld-container"><div className="ld-footer-banner"><div><span className="ld-kicker">A LITTLE SPACE FOR SOMETHING BIG</span><h2>Good ideas.<br/>Great company.</h2></div><a className="ld-button" href="#contact">Find your flow <span aria-hidden="true">↗</span></a><span className="ld-footer-spark" aria-hidden="true">✳</span></div><div className="ld-footer-columns"><div><a className="ld-brand" href="#demo-main">✳ {brand}</a><p>A calmer place for your next big idea.</p></div><div><span className="ld-kicker">EXPLORE PULSE</span>{navigation}</div><div><span className="ld-kicker">SMALL STEPS. BIG POSSIBILITIES.</span><a href="#explore" className="ld-text-link">Meet your workspace ↗</a><a href="#demo-main" className="ld-text-link">Back to top ↑</a></div></div><div className="ld-footer-bottom"><span>{sample}</span><span>A fictional workspace. A real design direction.</span></div></div></footer>;
  if (design === 'orbit') return <footer className="ld-footer ld-orbit-footer"><div className="ld-container"><div className="ld-footer-status"><span>END OF PAGE / START OF SOMETHING NEW</span><a href="#demo-main">RETURN TO ORIGIN ↑</a></div><a href="#contact" className="ld-footer-wordmark" aria-label="Start a conversation with Orbit">ORBIT<span aria-hidden="true">↗</span></a><div className="ld-footer-bottom"><span>STRATEGY // DESIGN // ENGINEERING</span>{navigation}<span>{sample}</span></div></div></footer>;
  return <footer className="ld-footer ld-atelier-footer"><div className="ld-container"><span className="ld-kicker">LESS, WITH A LITTLE MORE MEANING</span><p className="ld-footer-poem">Objects for everyday stories.<br/>Spaces for a slower life.</p>{navigation}<div className="ld-footer-bottom"><a className="ld-brand" href="#demo-main">{brand}</a><span>{sample}</span><a href="#demo-main" className="ld-text-link">Back to the beginning ↑</a></div></div></footer>;
}
