import { Link } from '@inertiajs/react';
import { useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { animatedText, type Concept } from '../content/animatedDemos';
import type { SiteLanguage } from '../content/siteLanguage';

export type NewAnimatedId = 'drift' | 'frequency' | 'vellum' | 'canopy' | 'glaze' | 'transit';
export const isNewAnimated = (design: string): design is NewAnimatedId => ['drift', 'frequency', 'vellum', 'canopy', 'glaze', 'transit'].includes(design);
const photos = ['/images/animated-demos/alpine.webp', '/images/animated-demos/coast.webp', '/images/business-demos/plants.webp'];

export function NewConceptArt({ design, active, language }: { design: NewAnimatedId; active: number; language: SiteLanguage }) {
  const gridId = useId();
  const t = (values: [string, string, string]) => animatedText(values, language);
  if (design === 'glaze') return <div className={`nx-gelato nx-flavour-${active}`}>
    <span className="nx-gelato-label">GLAZE / SMALL BATCH GELATO</span>
    <svg className="nx-scoop" viewBox="0 0 460 460" role="img" aria-label={t(['Illustrated gelato cup', 'Ілюстрація стаканчика джелато', 'Ilustrație de cupă gelato'])}>
      <ellipse cx="230" cy="402" rx="112" ry="14" fill="var(--ld-ink)" opacity=".12"/>
      <g className="nx-cup-float"><path d="m125 236 28 140q77 35 154 0l28-140Z" fill="var(--nx-paper)" stroke="var(--ld-ink)" strokeWidth="2"/>
      <path d="m146 290 15 70m24-66 6 73m41-72v77m41-77-6 73m43-80-15 73" stroke="var(--ld-line)" strokeWidth="2"/>
      <g fill="var(--nx-flavour)" stroke="var(--ld-ink)" strokeWidth="2"><path d="M123 241c-17-24-5-51 20-59-6-29 16-50 43-48 17-30 53-30 72-6 30-7 54 16 54 40 29 3 46 37 26 66-55 23-151 25-215 7Z"/><circle cx="218" cy="129" r="51"/></g>
      <path d="M189 116c6-14 18-21 33-19m-65 103c8-11 16-16 29-14m78-15c13 0 22 6 27 17" fill="none" stroke="var(--nx-paper)" strokeWidth="7" strokeLinecap="round"/>
      <ellipse cx="230" cy="243" rx="108" ry="15" fill="none" stroke="var(--ld-ink)" strokeWidth="2"/>
      <text x="230" y="325" textAnchor="middle" fill="var(--ld-ink)" fontSize="48" fontWeight="800" fontFamily="inherit">glaze.</text></g>
    </svg>
    <strong className="nx-flavour-caption">{t([['Berry day', 'Pistachio club', 'Sunny mango'][active], ['Ягідний день', 'Фісташковий клуб', 'Сонячне манго'][active], ['Zi cu fructe', 'Clubul fisticului', 'Mango însorit'][active]])}</strong><span className="nx-gelato-foot">0{active + 1} / A LITTLE EVERYDAY JOY</span>
  </div>;
  if (design === 'transit') return <div className={`nx-dispatch nx-mode-${active}`}>
    <div className="nx-dispatch-meta"><span>{t(['NETWORK EXPLORER / ILLUSTRATION', 'ОГЛЯД МЕРЕЖІ / ІЛЮСТРАЦІЯ', 'EXPLORATOR DE REȚEA / ILUSTRAȚIE'])}</span><span>TR / 0{active + 1}</span></div>
    <svg viewBox="0 0 1000 320" role="img" aria-label={t(['Illustrative freight route between hubs', 'Концептуальний маршрут вантажу між хабами', 'Traseu ilustrativ de transport între huburi'])}>
      <defs><pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0v40" fill="none" stroke="var(--ld-line)" strokeWidth=".5"/></pattern></defs><rect width="1000" height="320" fill={`url(#${gridId})`}/>
      <g fill="none" stroke="var(--ld-line)" strokeWidth="2"><path d="M60 240H940M60 80H940M240 30v260M760 30v260"/></g>
      <path className="nx-route" d={['M100 240H360Q410 240 410 190V130Q410 80 460 80H900', 'M100 80H340Q390 80 390 130V190Q390 240 440 240H900', 'M100 160H900'][active]} fill="none" stroke="var(--ld-accent)" strokeWidth="4"/>
      <g fill="var(--nx-paper)" stroke="var(--ld-ink)" strokeWidth="2">{[[100,active === 0 ? 240 : active === 1 ? 80 : 160],[500,160],[900,active === 0 ? 80 : active === 1 ? 240 : 160]].map(([x,y], i) => <g key={i}><rect x={x-32} y={y-24} width="64" height="48" rx="3"/><path d={`M${x-20} ${y+12}v-24h40v24m-30 0v-14h20v14`}/></g>)}</g>
      <g className="nx-cargo" key={active}><rect x="-17" y="-12" width="34" height="24" rx="2" fill="var(--ld-accent)" stroke="var(--ld-ink)"/><path d="M-6-12v24M6-12v24" stroke="var(--ld-ink)"/></g>
    </svg><div className="nx-dispatch-bottom"><span>01 / ORIGIN</span><strong>{t([['Road corridor', 'Ocean corridor', 'Warehouse corridor'][active], ['Автокоридор', 'Морський коридор', 'Складський коридор'][active], ['Coridor rutier', 'Coridor maritim', 'Coridor de depozit'][active]])}</strong><span>02 / DESTINATION</span></div>
  </div>;
  if (design === 'drift') return <div className="nc-postcards">
    <figure className="nc-postcard nc-postcard-back"><img src={photos[(active + 1) % 3]} alt="" width="800" height="1000"/><figcaption>DRIFT FIELD NOTES / 0{active + 1}</figcaption></figure>
    <figure key={active} className="nc-postcard nc-postcard-front"><img src={photos[active]} alt={t([['An alpine lake between mountains', 'A quiet Mediterranean coastline', 'Green plants in natural light'][active], ['Альпійське озеро серед гір', 'Тихе середземноморське узбережжя', 'Зелені рослини в природному світлі'][active], ['Un lac alpin între munți', 'Un litoral mediteranean liniștit', 'Plante verzi în lumină naturală'][active]])} width="800" height="1000"/><figcaption><span>{['46° N / 09° E', '38° N / 15° E', '48° N / 24° E'][active]}</span><span>{t(['A PLACE TO EXHALE', 'МІСЦЕ ДЛЯ ВИДИХУ', 'UN LOC PENTRU LINIȘTE'])}</span></figcaption></figure>
    <span className="nc-stamp">GO<br/>SLOW.</span>
  </div>;
  if (design === 'frequency') return <div className={`nc-sound nc-sound-${active}`}>
    <div className="nc-sound-meta"><span>FQ / 0{active + 1}</span><span>{t(['VISUAL SESSION · NO AUDIO', 'ВІЗУАЛЬНА СЕСІЯ · БЕЗ АУДІО', 'SESIUNE VIZUALĂ · FĂRĂ AUDIO'])}</span></div>
    <div className="nc-wave" aria-hidden="true">{Array.from({ length: 37 }, (_, i) => <i key={i} style={{ '--bar': `${22 + Math.sin(i * .62 + active) ** 2 * 76}%`, '--delay': `${-i * .13}s` } as CSSProperties}/>)}</div>
    <div className="nc-sound-bottom"><strong>{['01:48', '02:36', '03:12'][active]}</strong><span>{['DEEP FOCUS', 'AFTER DARK', 'OPEN AIR'][active]}<br/>INDEPENDENT SOUND EXPLORER</span></div>
  </div>;
  if (design === 'vellum') return <div className="nc-editions" aria-label={t(['Illustrative book covers', 'Концептуальні обкладинки книг', 'Coperți de carte ilustrative'])} role="img"><div className="nc-book nc-book-back"><span>VELLUM<br/>EDITION 02</span><strong>Form<br/>& feeling.</strong><small>AN INDEPENDENT JOURNAL</small></div><div className="nc-book nc-book-front"><span>VELLUM<br/>EDITION 01</span><strong>The art<br/>of paying<br/><em>attention.</em></strong><svg viewBox="0 0 200 100" aria-hidden="true"><g fill="none" stroke="currentColor">{[0,1,2,3,4,5].map(i => <ellipse key={i} cx="100" cy="50" rx={90 - i * 12} ry="42"/>)}</g></svg><small>WORDS / CULTURE / IDEAS</small></div></div>;
  return <div className={`nc-network nc-network-${active}`}>
    <div className="nc-network-top"><span>{t(['COMMUNITY ENERGY / ILLUSTRATION', 'ЕНЕРГІЯ ГРОМАДИ / ІЛЮСТРАЦІЯ', 'ENERGIE COMUNITARĂ / ILUSTRAȚIE'])}</span><span>0{active + 1} / 03</span></div>
    <svg viewBox="0 0 560 410" role="img" aria-label={t(['Solar, storage and community energy network', 'Мережа сонячної генерації, зберігання та громади', 'Rețea solară, stocare și comunitate'])}>
      <g className="nc-connections" fill="none" stroke="currentColor" strokeWidth="2"><path d="M280 190 120 90M280 190 445 90M280 190 115 315M280 190 445 315"/><path className="nc-flow" d="M120 90 280 190 445 90M115 315 280 190 445 315"/></g>
      {[[120,90],[445,90],[115,315],[445,315]].map(([x,y], i) => <g key={i} className={`nc-node nc-node-${i}`} transform={`translate(${x} ${y})`}><circle r="48" fill="var(--nc-node-bg)" stroke="currentColor"/><g fill="none" stroke="currentColor" strokeWidth="2">{i === 0 ? <><path d="M-23-12h46l7 30h-60Zm3 10h40M-12-12l-4 30M12-12l4 30M0-12v30M0 18v10M-15 28h30"/></> : i === 1 ? <><rect x="-22" y="-15" width="44" height="30" rx="4"/><path d="M22-5h5v10h-5M-10 0h20M0-10v20"/></> : <><path d="m-25 0 25-20L25 0M-19-5v26h38V-5M-5 21V7H5v14"/></>}</g></g>)}
      <circle className="nc-network-core" cx="280" cy="190" r="65" fill="var(--ld-accent)"/><text x="280" y="196" textAnchor="middle" fill="var(--ld-on-accent)" fontSize="20" fontFamily="inherit">canopy</text>
    </svg><div className="nc-network-bottom"><strong>{t([['Generate', 'Store', 'Share'][active], ['Генерувати', 'Зберігати', 'Ділитися'][active], ['Generează', 'Stochează', 'Distribuie'][active]])}</strong><span>{t(['A connected future', 'Поєднане майбутнє', 'Un viitor conectat'])}</span></div>
  </div>;
}

export function NewConceptExplore({ design, data, active, onChange, language, standalone, contactUrl, cta, motionControl }: { design: NewAnimatedId; data: Concept; active: number; onChange: (index: number) => void; language: SiteLanguage; standalone: boolean; contactUrl: string; cta: ReactNode; motionControl: ReactNode }) {
  const t = (values: [string, string, string]) => animatedText(values, language);
  const Heading = standalone ? 'h1' : 'h2';
  const selection = <div className="nc-options" role="group" aria-label={t(data.heading)}>{data.items.map((item, i) => <button key={i} className="ld-button ld-secondary" aria-pressed={active === i} onClick={() => onChange(i)}><span>0{i + 1}</span>{t(item.title)}</button>)}</div>;
  if (design === 'glaze') return <section id="explore" className="ld-container ld-section nx-tasting" data-cd-reveal><span className="ld-kicker">01 / {t(data.label)}</span><Heading>{t(data.heading)}</Heading><div className="nx-flavour-cards" role="group" aria-label={t(data.heading)}>{data.items.map((item,i) => <article className={`nx-flavour-${i}`} key={i}><span className="nx-flavour-number">0{i+1}</span><h3>{t(item.title)}</h3><p>{t(item.text)}</p><button className="ld-button ld-secondary" aria-pressed={active === i} onClick={() => onChange(i)}>{t(['Taste this mood', 'Обрати цей настрій', 'Alege această aromă'])}</button></article>)}</div><div className="nx-tasting-result"><NewConceptArt design={design} active={active} language={language}/><div aria-live="polite"><span className="ld-kicker">GLAZE / YOUR PICK</span><h3>{t(data.items[active].title)}</h3><p>{t(data.items[active].text)}</p>{cta}</div></div></section>;
  if (design === 'transit') return <section id="explore" className="ld-container ld-section nx-transport" data-cd-reveal><span className="ld-kicker">01 / {t(data.label)}</span><Heading>{t(data.heading)}</Heading>{standalone && motionControl}{selection}<NewConceptArt design={design} active={active} language={language}/><div className="nx-transport-story"><div aria-live="polite"><h3>{t(data.items[active].title)}</h3><p>{t(data.items[active].text)}</p></div>{cta}</div></section>;
  return <section id="explore" className={`ld-container ld-section nc-explore nc-explore-${design}`} data-cd-reveal><span className="ld-kicker">01 / {t(data.label)}</span><Heading>{t(data.heading)}</Heading>{standalone && motionControl}
    {design === 'drift' ? <div className="nc-destinations">{data.items.map((item, i) => <article key={i}><img src={photos[i]} alt="" width="800" height="1000" loading="lazy"/><div><span className="ld-kicker">0{i + 1} / DRIFT FIELD NOTES</span><h3>{t(item.title)}</h3><p>{t(item.text)}</p><button className="ld-button ld-secondary" aria-pressed={active === i} onClick={() => onChange(i)}>{t(['Preview this escape', 'Переглянути маршрут', 'Vezi escapada'])}</button></div></article>)}</div>
    : design === 'vellum' ? <div className="nc-chapters">{data.items.map((item, i) => <article key={i}><span className="nc-chapter-number">0{i + 1}</span><div><h3>{t(item.title)}</h3><p>{t(item.text)}</p></div><Link className="ld-text-link" href={contactUrl}>{t(data.action)}<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></Link></article>)}</div>
    : <div className="nc-interactive"><div>{selection}<div className="nc-selected-story" aria-live="polite"><h3>{t(data.items[active].title)}</h3><p>{t(data.items[active].text)}</p></div>{cta}</div><NewConceptArt design={design} active={active} language={language}/></div>}
  </section>;
}
