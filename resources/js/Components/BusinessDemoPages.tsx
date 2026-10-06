import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { bt, businessDemos, businessCopy, type BusinessDesignId, type BusinessItem, type BusinessSection } from '../content/businessDemos';
import { detailsCopy as dc, meridianPeople, projectAreas, serviceDeliverables, type DemoText } from '../content/businessDetails';
import { demoShellCopy } from '../content/landingDemos';
import { localizedUrl, type SiteLanguage } from '../content/siteLanguage';
import ThemedSelect from './ThemedSelect';
import StudioWorkArt, { type StudioArtMode } from './StudioWorkArt';

type Props = { design: BusinessDesignId; language: SiteLanguage };
const pic = (name: string) => `/images/business-demos/${name}.webp`;
function useCopy({ design, language }: Props) {
  const data = businessDemos[design];
  const text = (value: DemoText) => bt(value, language);
  const d = (key: keyof Omit<typeof dc, 'supportTopics'>) => text(dc[key]);
  const c = (key: keyof Omit<typeof businessCopy, 'steps'>) => text(businessCopy[key]);
  const url = (page: BusinessSection, item?: string) => localizedUrl(`/designs/${design}/${page}${item ? `/${item}` : ''}`, language);
  const link = (page: BusinessSection, label: ReactNode, className = 'bd-text-link', item?: string) => <Link href={url(page, item)} preserveState className={className}>{label}</Link>;
  return { data, text, d, c, link };
}
function Photo({ image, caption, className = '' }: { image: string; caption: string; className?: string }) {
  return <figure className={className}><img src={image} alt={caption} width="1200" height="900" loading="lazy" decoding="async"/><figcaption>{caption}</figcaption></figure>;
}

export function MeridianCase({ language }: { language: SiteLanguage }) {
  const d = (key: keyof Omit<typeof dc, 'supportTopics'>) => bt(dc[key], language);
  return <section className="bd-m-case bd-container" data-bd-reveal><div className="bd-m-case-title"><span className="bd-kicker">{d('caseLabel')}</span><h2>{d('case')}</h2><div className="bd-m-case-metrics"><div><strong>06</strong><span>{bt(['Working sessions', 'Робочих сесій', 'Sesiuni de lucru'], language)}</span></div><div><strong>90</strong><span>{bt(['Days of clear priorities', 'Днів чітких пріоритетів', 'Zile de priorități clare'], language)}</span></div></div></div><div className="bd-m-case-body">{(['challenge', 'approach', 'outcome'] as const).map((key, index) => <article key={key}><span>0{index + 1}</span><div><h3>{d(key)}</h3><p>{d((['caseChallenge', 'caseApproach', 'caseOutcome'] as const)[index])}</p></div></article>)}</div></section>;
}

export function BusinessAbout(props: Props) {
  const { design, language } = props;
  const { data, text, d, c, link } = useCopy(props);
  if (design === 'meridian') return <>
    <section className="bd-m-about-hero"><div className="bd-container"><span className="bd-kicker">{text(data.signature)}</span><h1>{text(data.aboutTitle)}</h1><div><p>{text(data.about)}</p>{link('contact', d('brief'), 'bd-button')}</div></div></section>
    <section className="bd-m-people bd-container"><div className="bd-section-heading"><h2>{d('team')}</h2><span className="bd-kicker">{c('sample')}</span></div>{meridianPeople.map((person, index) => <article key={person.name} data-bd-reveal><span className="bd-m-person-index">0{index + 1}</span><div><span className="bd-kicker">{text(person.role)}</span><h3>{person.name}</h3></div><p>{text(person.focus)}</p></article>)}</section>
    <MeridianCase language={language}/>
    <section className="bd-m-principles bd-container"><h2>{d('principles')}</h2><div>{[c('process'), d('scope'), d('outcome')].map((title, index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text(([
      ['Ask the useful questions before offering answers.', 'Спершу ставимо корисні запитання.', 'Punem întrebările utile înaintea răspunsurilor.'],
      ['Build plans your team can actually use, with clear owners and checkpoints.', 'Створюємо практичні плани з відповідальними та контрольними точками.', 'Construim planuri practice, cu responsabili și puncte de verificare.'],
      ['Stay close to the work and review progress together.', 'Працюємо поруч із вами та разом оцінюємо прогрес.', 'Rămânem aproape și evaluăm progresul împreună.'],
    ] as DemoText[])[index])}</p></article>)}</div></section>
  </>;
  if (design === 'forma') return <>
    <section className="bd-f-about-title bd-container"><span className="bd-kicker">{text(data.signature)} / 2014—2026</span><h1>{d('philosophy')}</h1><p>{d('philosophyText')}</p></section>
    <Photo className="bd-f-about-photo" image={pic('house')} caption={text(['A practice shaped by light.', 'Студія, сформована світлом.', 'Un birou modelat de lumină.'])}/>
    <section className="bd-f-philosophy bd-container" data-bd-reveal><span className="bd-kicker">01 / {c('story')}</span><h2>{text(data.aboutTitle)}</h2><div><p>{text(data.about)}</p>{link('collection', text(data.collection))}</div></section>
    <section className="bd-f-materials bd-container"><div className="bd-section-heading"><h2>{d('materials')}</h2><span className="bd-kicker">TACTILE / HONEST / ENDURING</span></div>{[d('oak'), d('stone'), d('linen')].map((material, index) => <figure key={material} data-bd-reveal><div className={`bd-material-sample bd-material-${index}`}><img src={pic(['house', 'interior', 'room'][index])} alt={material} loading="lazy" width="1200" height="900"/></div><figcaption><span>0{index + 1}</span>{material}</figcaption></figure>)}</section>
  </>;
  if (design === 'verde') return <>
    <section className="bd-v-about-title bd-container"><span className="bd-kicker">{text(data.signature)}</span><h1>{d('rooted')}</h1><p>{d('rootedText')}</p></section>
    <div className="bd-v-story-pictures bd-container"><Photo image={pic('ficus')} caption={text(['A small beginning.', 'Маленький початок.', 'Un început mic.'])}/><div><span className="bd-v-story-note">{text(['Room to\ngrow.', 'Простір\nдля зростання.', 'Loc pentru\ncreștere.'])}</span><Photo image={pic('planter')} caption={text(['Good company for everyday life.', 'Хороша компанія на щодень.', 'Companie bună în fiecare zi.'])}/></div></div>
    <section className="bd-v-values bd-container"><h2>{text(data.aboutTitle)}</h2><p>{text(data.about)}</p><div>{[
      [['Choose thoughtfully', 'Обирайте уважно', 'Alege atent'], ['Start with your light, your room and your routine.', 'Почніть зі світла, простору та вашого ритму.', 'Începe cu lumina, camera și rutina ta.']],
      [['Care simply', 'Дбайте просто', 'Îngrijește simplu'], ['A little attention, given often, is better than a complicated ritual.', 'Трохи регулярної уваги краще за складні ритуали.', 'Puțină atenție regulată e mai bună decât ritualuri complicate.']],
      [['Keep growing', 'Продовжуйте зростати', 'Continuă să crești'], ['Find a little inspiration in the seasons and the everyday.', 'Шукайте натхнення в сезонах і щоденних речах.', 'Găsește inspirație în anotimpuri și lucruri simple.']],
    ].map(([title, description], index) => <article key={index} data-bd-reveal><span>0{index + 1}</span><h3>{text(title as DemoText)}</h3><p>{text(description as DemoText)}</p></article>)}</div>{link('journal', d('fieldNotes'), 'bd-button')}</section>
  </>;
  return <>
    <section className="bd-s-manifesto bd-container"><span className="bd-kicker">{text(data.signature)}</span><h1>{d('manifesto')}</h1><div><span>01 / STUDIO®</span><p>{d('manifestoText')}</p></div></section>
    <section className="bd-s-capabilities bd-container"><h2>{d('capabilities')}</h2>{[
      [d('identity'), ['Strategy / naming / visual systems', 'Стратегія / неймінг / візуальні системи', 'Strategie / naming / sisteme vizuale']],
      [d('digital'), ['Websites / interfaces / experiences', 'Сайти / інтерфейси / досвід', 'Website-uri / interfețe / experiențe']],
      [d('packaging'), ['Objects / print / art direction', 'Об’єкти / друк / артдирекція', 'Obiecte / print / art direction']],
    ].map(([title, description], index) => <article key={index} data-bd-reveal><span>0{index + 1}</span><h3>{title as string}</h3><p>{text(description as DemoText)}</p></article>)}</section>
    <div className="bd-s-about-boards bd-container"><StudioWorkArt project="open-culture" label="Open Culture — sample brand identity"/><StudioWorkArt project="objects-of-tomorrow" mode="packaging" label="OTO — sample packaging system"/></div>
    <section className="bd-s-statement bd-container"><h2>{text(data.aboutTitle)}</h2><p>{text(data.about)}</p>{link('collection', text(data.collection), 'bd-button')}</section>
  </>;
}

export function BusinessContact(props: Props) {
  const { design, language } = props;
  const { data, text, d, c } = useCopy(props);
  const shell = demoShellCopy[language];
  const [sent, setSent] = useState(false);
  const [choice, setChoice] = useState('1');
  const [disciplines, setDisciplines] = useState<string[]>(['identity']);
  const success = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => { if (sent) success.current?.focus(); }, [sent]);
  const retry = () => { setSent(false); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus()); };
  const options = (design === 'verde' ? dc.supportTopics : data.categories.slice(1)).map((label, index) => ({ value: String(index + 1), label: text(label) }));
  const heading = design === 'meridian' ? d('brief') : design === 'forma' ? d('projectBrief') : design === 'verde' ? d('needHelp') : d('studioBrief');
  const extraLabel = design === 'forma' ? d('space') : design === 'verde' ? d('topic') : d('service');
  const formContent = <div className="bd-contact-form">{sent ? <div className="bd-success" ref={success} tabIndex={-1}><h2>{shell.success}</h2><button className="bd-button" onClick={retry}>{shell.again}</button></div> : <form ref={form} onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
    {design === 'studio' ? <fieldset className="bd-s-discipline-picker"><legend>{d('selectServices')}</legend>{(['identity', 'digital', 'packaging'] as const).map((discipline) => <button type="button" key={discipline} aria-pressed={disciplines.includes(discipline)} onClick={() => setDisciplines((current) => current.includes(discipline) ? current.filter((entry) => entry !== discipline) : [...current, discipline])}>{d(discipline)}<span aria-hidden="true">{disciplines.includes(discipline) ? '−' : '+'}</span></button>)}</fieldset> : <div className="bd-form-select"><span id="bd-context-label">{extraLabel}</span><ThemedSelect ariaLabel={extraLabel} value={choice} options={options} onChange={setChoice}/></div>}
    <div className="bd-form-pair"><label>{shell.name}<input required name="name" autoComplete="name" maxLength={100}/></label><label>{shell.email}<input required type="email" name="email" autoComplete="email" maxLength={254}/></label></div>
    {design === 'meridian' && <label>{d('company')}<input name="company" autoComplete="organization" maxLength={120}/></label>}
    {design === 'forma' && <label>{d('location')}<input name="location" maxLength={120}/></label>}
    <label>{shell.message}<textarea name="message" rows={design === 'studio' ? 4 : 5} maxLength={2000}/></label><p>{shell.formNote}</p><button className="bd-button" type="submit">{shell.send}<span aria-hidden="true">↗</span></button>
  </form>}</div>;
  if (design === 'meridian') return <section className="bd-m-contact bd-container"><div className="bd-m-contact-intro"><span className="bd-kicker">MERIDIAN / ADVISORY</span><h1>{heading}</h1><p>{c('contactIntro')}</p><div className="bd-m-contact-advisor"><span className="bd-kicker">{text(meridianPeople[0].role)}</span><strong>{meridianPeople[0].name}</strong><p>{text(meridianPeople[0].focus)}</p><span className="bd-kicker">{c('sample')}</span></div></div>{formContent}</section>;
  if (design === 'forma') return <><section className="bd-f-contact-title bd-container"><span className="bd-kicker">FORMA / NEW SPACES</span><h1>{heading}</h1><p>{c('contactIntro')}</p></section><section className="bd-f-contact-workbench bd-container"><Photo image={pic('room')} caption={text(['A new chapter starts with a conversation.', 'Новий етап починається з розмови.', 'Un nou capitol începe cu o conversație.'])}/>{formContent}</section></>;
  if (design === 'verde') return <><section className="bd-v-help-title bd-container"><span className="bd-kicker">VERDE / HERE TO HELP</span><h1>{heading}</h1></section><section className="bd-v-help bd-container"><aside><h2>{d('care')}</h2>{(['light', 'water', 'delivery'] as const).map((topic) => <details key={topic}><summary>{d(topic)}<span aria-hidden="true">+</span></summary><p>{d(`${topic}Text`)}</p></details>)}<Photo image={pic('planter')} caption={text(['A little everyday company.', 'Трохи компанії на щодень.', 'Puțină companie în fiecare zi.'])}/></aside><div className="bd-v-help-form"><h2>{c('contactTitle')}</h2>{formContent}</div></section></>;
  return <section className="bd-s-contact bd-container"><div><span className="bd-kicker">STUDIO® / LET'S MAKE IT HAPPEN</span><h1>{heading}</h1><p>{d('manifestoText')}</p><span className="bd-s-contact-signature">BIG IDEAS.<br/>OPEN MINDS.</span></div>{formContent}</section>;
}

const extraArticles: Record<BusinessDesignId, { title: DemoText; text: DemoText; tag: DemoText; image: string }> = {
  meridian: { title: ['One report. Better conversations.', 'Один звіт. Кращі розмови.', 'Un raport. Conversații mai bune.'], text: ['A useful report answers a decision, not every possible question. Agree on five numbers that matter, name an owner for each, and review the same view together. Consistency gives your team time to think.', 'Корисний звіт допомагає прийняти рішення. Узгодьте п’ять важливих показників, призначте відповідальних і переглядайте єдину картину разом. Послідовність дає час думати.', 'Un raport util răspunde unei decizii. Alege cinci indicatori, un responsabil pentru fiecare și analizați aceeași imagine împreună. Consecvența oferă timp de gândire.'], tag: ['OPERATIONS', 'ОПЕРАЦІЇ', 'OPERAȚIUNI'], image: pic('meeting') },
  forma: { title: ['Materials that get better with time.', 'Матеріали, що красивішають з часом.', 'Materiale care devin mai frumoase.'], text: ['A surface has a life beyond its first photograph. Timber softens, stone gains character and linen settles into use. We select materials for how they age, how they feel and how easily they can be cared for.', 'Поверхня має життя після першої фотографії. Дерево змінюється, камінь набуває характеру, льон стає м’якшим. Обираємо матеріали за тим, як вони старіють і як легко за ними доглядати.', 'Suprafețele trăiesc dincolo de prima fotografie. Lemnul, piatra și inul câștigă caracter. Alegem materiale pentru felul în care îmbătrânesc și se îngrijesc.'], tag: ['MATERIAL NOTES', 'ПРО МАТЕРІАЛИ', 'NOTE DESPRE MATERIALE'], image: pic('house') },
  verde: { title: ['Less watering. More observing.', 'Менше поливу. Більше уваги.', 'Mai puțină udare. Mai multă atenție.'], text: ['A calendar cannot tell you how your plant feels. Light, temperature and the pot all affect how quickly soil dries. Check with a fingertip before reaching for the watering can. Observation is your most useful tool.', 'Календар не знає стану вашої рослини. Світло, температура та горщик впливають на висихання ґрунту. Перевірте його пальцем перед поливом. Увага — найкорисніший інструмент.', 'Calendarul nu știe cum se simte planta. Lumina, temperatura și ghiveciul influențează solul. Verifică-l înainte de udare. Observarea e cea mai utilă unealtă.'], tag: ['PLANT CARE', 'ДОГЛЯД', 'ÎNGRIJIRE'], image: pic('planter') },
  studio: { title: ['Make the system, not just the logo.', 'Створюйте систему, а не лише логотип.', 'Creează sistemul, nu doar logo-ul.'], text: ['An identity needs to work on a tiny screen and a big wall. Start with a clear idea, build a flexible set of rules, and test the work in real situations. The best systems have enough structure to be recognisable and enough room to surprise.', 'Айдентика має працювати на маленькому екрані та великій стіні. Почніть з ідеї, створіть гнучкі правила й перевірте їх у реальних ситуаціях. Хороша система впізнавана, але залишає місце для несподіваного.', 'Identitatea trebuie să funcționeze pe un ecran mic și pe un perete mare. O idee clară, reguli flexibile și teste în situații reale formează un sistem memorabil.'], tag: ['DESIGN THINKING', 'ДИЗАЙН-МИСЛЕННЯ', 'GÂNDIRE DE DESIGN'], image: pic('abstract') },
};

export function BusinessJournal(props: Props) {
  const { design } = props;
  const { data, text, d, link } = useCopy(props);
  const [active, setActive] = useState(0);
  const articleHeading = useRef<HTMLHeadingElement>(null);
  const articles = [{ ...data.journal[0], tag: data.signature }, extraArticles[design]];
  const article = articles[active];
  const headings = { meridian: d('insights'), forma: d('notes'), verde: d('fieldNotes'), studio: d('notebook') };
  const selectArticle = (index: number) => { setActive(index); requestAnimationFrame(() => articleHeading.current?.focus({ preventScroll: true })); };
  return <section className={`bd-editorial bd-editorial-${design} bd-container`}><header><span className="bd-kicker">{text(data.signature)}</span><h1>{headings[design]}</h1></header><div className="bd-editorial-layout"><nav className="bd-editorial-index" aria-label={text(['Choose an article', 'Оберіть статтю', 'Alege un articol'])}>{articles.map((entry, index) => <button type="button" key={index} aria-pressed={active === index} onClick={() => selectArticle(index)}><span>0{index + 1} / {text(entry.tag)}</span><strong>{text(entry.title)}</strong><span aria-hidden="true">↗</span></button>)}</nav><article className="bd-editorial-article" key={active}>{design === 'studio' ? <StudioWorkArt project={active ? 'open-culture' : 'objects-of-tomorrow'} mode={active ? 'digital' : 'identity'} label={text(article.title)}/> : <Photo image={article.image} caption={text(article.tag)}/>}<div className="bd-editorial-text"><span className="bd-kicker">{d('readTime')}</span><h2 ref={articleHeading} tabIndex={-1}>{text(article.title)}</h2><p>{text(article.text)}</p><blockquote>{design === 'meridian' ? d('principles') : design === 'forma' ? d('philosophy') : design === 'verde' ? d('care') : d('workSystem')}</blockquote>{link(design === 'verde' ? 'collection' : 'contact', design === 'verde' ? text(data.collection) : d('brief'))}</div></article></div></section>;
}

export function BusinessDetail(props: Props & { selected: BusinessItem; purchase?: ReactNode }) {
  const { design, selected } = props;
  const { data, text, d, c, link } = useCopy(props);
  const [view, setView] = useState(0);
  const [mode, setMode] = useState<StudioArtMode>('identity');
  const gallery = design === 'forma' ? [selected.image, pic(selected.id === 'soft-interior' ? 'house' : 'interior'), pic('room')] : [selected.image, selected.image, selected.image];
  const galleryLabels = [d('full'), d('detail'), d('texture')];
  const selector = <div className="bd-gallery-thumbs" role="group" aria-label={d('visualStudies')}>{gallery.map((image, index) => <button type="button" key={index} aria-pressed={view === index} aria-label={galleryLabels[index]} onClick={() => setView(index)}><img src={image} alt="" className={`bd-gallery-crop-${index}`} width="160" height="120"/>{galleryLabels[index]}</button>)}</div>;
  if (design === 'meridian') return <><section className="bd-m-service-title bd-container">{link('collection', `← ${c('back')}`)}<span className="bd-kicker">{text(data.categories[selected.category])}</span><h1>{text(selected.title)}</h1><p>{text(selected.description)}</p></section><section className="bd-m-service-scope bd-container"><Photo image={selected.image} caption={text(data.signature)}/><aside><span className="bd-kicker">MERIDIAN / ENGAGEMENT</span><h2>{d('scope')}</h2><ol>{(serviceDeliverables[selected.id] ?? []).map((deliverable) => <li key={deliverable[0]}>{text(deliverable)}</li>)}</ol>{link('contact', d('brief'), 'bd-button')}</aside></section><MeridianCase language={props.language}/></>;
  if (design === 'forma') return <><section className="bd-f-project-title bd-container">{link('collection', `← ${c('back')}`)}<h1>{text(selected.title)}</h1><dl><div><dt>{d('area')}</dt><dd>{projectAreas[selected.id]}</dd></div><div><dt>{d('type')}</dt><dd>{text(data.categories[selected.category])}</dd></div><div><dt>{d('stage')}</dt><dd>{d('concept')}</dd></div></dl></section><figure className="bd-f-project-image"><img src={gallery[view]} alt={`${text(selected.title)} — ${galleryLabels[view]}`} width="1400" height="1000"/><figcaption>{d('visualStudies')} / 0{view + 1}</figcaption></figure><div className="bd-container">{selector}</div><section className="bd-f-project-notes bd-container"><span className="bd-kicker">01 / {d('intention')}</span><h2>{text(selected.title)}</h2><p>{text(selected.description)}</p><span className="bd-kicker">02 / {d('designNotes')}</span><div><h3>{d('philosophy')}</h3><p>{d('philosophyText')}</p></div><div className="bd-f-project-materials"><span>{d('oak')}</span><span>{d('stone')}</span><span>{d('linen')}</span></div>{link('contact', d('projectBrief'), 'bd-button')}</section></>;
  if (design === 'verde') return <section className="bd-v-product bd-container">{link('collection', `← ${c('back')}`)}<div className="bd-v-product-layout"><div className="bd-v-product-gallery"><img src={selected.image} className={`bd-product-crop-${view}`} alt={`${text(selected.title)} — ${galleryLabels[view]}`} width="1200" height="1000"/>{selector}</div><div className="bd-v-product-copy"><span className="bd-kicker">{text(data.categories[selected.category])}</span><h1>{text(selected.title)}</h1><strong className="bd-price">€{selected.price}</strong><p>{text(selected.description)}</p>{props.purchase}{selected.category === 1 && <div className="bd-v-product-care"><div><span>{d('light')}</span><p>{d('lightText')}</p></div><div><span>{d('water')}</span><p>{d('waterText')}</p></div></div>}<details><summary>{d('delivery')}<span aria-hidden="true">+</span></summary><p>{d('deliveryText')}</p></details></div></div></section>;
  return <><section className="bd-s-case-title bd-container">{link('collection', `← ${c('back')}`)}<span className="bd-kicker">STUDIO® / {text(data.categories[selected.category])}</span><h1>{text(selected.title)}</h1><div><span>2026 / CONCEPT PROJECT</span><p>{text(selected.description)}</p></div></section><section className="bd-s-case-system bd-container"><div className="bd-s-case-tabs" role="group" aria-label={d('workSystem')}>{(['identity', 'digital', 'packaging'] as const).map((entry) => <button type="button" key={entry} aria-pressed={mode === entry} onClick={() => setMode(entry)}>{d(entry)}</button>)}</div><StudioWorkArt key={mode} project={selected.id} mode={mode} label={`${text(selected.title)} — ${d(mode)}`}/><div className="bd-s-case-summary"><h2>{d('workSystem')}</h2><p>{text(extraArticles.studio.text)}</p></div></section><div className="bd-s-case-grid bd-container"><StudioWorkArt project={selected.id} mode={mode === 'identity' ? 'packaging' : 'identity'} label={`${text(selected.title)} — ${d(mode === 'identity' ? 'packaging' : 'identity')}`}/><StudioWorkArt project={selected.id} mode="digital" label={`${text(selected.title)} — ${d('digital')}`}/></div></>;
}
