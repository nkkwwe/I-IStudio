import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import AccountModal from './AccountModal';
import { designImage, designText, getWebsiteDesignCopy, getWebsiteDesigns } from '../content/websiteDesigns';
import { demoShellCopy } from '../content/landingDemos';
import { localizedUrl, type SiteLanguage } from '../content/siteLanguage';

type Props = { service: string; language: string; value: string; onChange: (id: string) => void };

export default function WebsiteDesignPicker({ service, language, value, onChange }: Props) {
  const designs = getWebsiteDesigns(service);
  const copy = getWebsiteDesignCopy(language);
  const demoCopy = demoShellCopy[language as SiteLanguage] ?? demoShellCopy.en;
  const description = service === 'landing'
    ? (language === 'uk' ? 'Натисніть на дизайн, щоб відкрити живе демо в новій вкладці.' : language === 'ro' ? 'Apasă pe un design pentru a deschide demo-ul live într-o filă nouă.' : 'Click a design to open its live demo in a new tab.')
    : copy.description;
  const newTabLabel = language === 'uk' ? ' (нова вкладка)' : language === 'ro' ? ' (filă nouă)' : ' (new tab)';
  const liveUrl = (id: string) => localizedUrl(`/designs/${id}`, language as SiteLanguage);
  const liveLink = (id: string) => <a className="btn btn-secondary btn-sm" href={localizedUrl(`/designs/${id}`, language as SiteLanguage)} target="_blank" rel="noopener noreferrer">{demoCopy.live}<span className="sr-only">{language === 'uk' ? ' (нова вкладка)' : language === 'ro' ? ' (filă nouă)' : ' (new tab)'}</span></a>;
  // Undefined is closed; null is the gallery; a design id opens its static preview.
  const [view, setView] = useState<string | null | undefined>(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('designs') === '1' ? null : undefined);
  const previousService = useRef(service);
  const portalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const galleryScroll = useRef(0);
  const selected = designs.find((design) => design.id === value);
  const previewed = designs.find((design) => design.id === view);
  const open = view !== undefined;

  useEffect(() => {
    if (previousService.current !== service) setView(undefined);
    previousService.current = service;
  }, [service]);

  useEffect(() => {
    if (!open) return;
    const returnFocus = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : triggerRef.current;
    const previousBody = document.body.style.overflow;
    const previousRoot = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    portalRef.current?.querySelector<HTMLButtonElement>('.account-modal-close')?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setView(undefined); }
      if (event.key !== 'Tab') return;
      const elements = Array.from(portalRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], [tabindex="0"]') ?? []);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousRoot;
      if (returnFocus?.isConnected) returnFocus.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dialog = portalRef.current?.querySelector<HTMLElement>('.account-modal');
    if (dialog) dialog.scrollTop = view === null ? galleryScroll.current : 0;
    portalRef.current?.querySelector<HTMLButtonElement>(view === null ? '.account-modal-close' : '.design-preview-back')?.focus();
  }, [view, open]);

  if (!designs.length) return null;
  const openPreview = (id: string) => {
    galleryScroll.current = portalRef.current?.querySelector('.account-modal')?.scrollTop ?? 0;
    setView(id);
  };
  const choose = (id: string) => { onChange(id); setView(undefined); };
  const serviceLabel = service === 'landing' ? copy.landing : copy.corporate;

  return <>
    <section className="design-launcher" aria-labelledby="designPickerTitle">
      <div className="design-launcher-header">
        <div>
          <span className="calculator-kicker">{copy.eyebrow}</span>
          <h2 id="designPickerTitle">{copy.title}</h2>
          <p>{description}</p>
        </div>
        <button ref={triggerRef} type="button" className="btn btn-secondary" aria-haspopup="dialog" aria-expanded={open} onClick={() => setView(null)}>{selected ? copy.change : copy.gallery}<span aria-hidden="true">↗</span></button>
      </div>
      <div className="design-launcher-strip">
        {designs.map((design) => service === 'landing' ? <a key={design.id} className={`design-mini design-mini-live${value === design.id ? ' is-selected' : ''}`} href={liveUrl(design.id)} target="_blank" rel="noopener noreferrer" aria-label={`${design.name} · ${demoCopy.live}${newTabLabel}`}>
          <img src={designImage(design.id)} alt="" width="960" height="1120" loading="lazy" />
          <span>{design.name} <span aria-hidden="true">↗</span>{value === design.id && <span aria-hidden="true"> ✓</span>}</span>
        </a> : <button type="button" key={design.id} className={`design-mini${value === design.id ? ' is-selected' : ''}`} aria-label={copy.previewLabel.replace('{name}', design.name)} onClick={() => openPreview(design.id)}>
          <img src={designImage(design.id)} alt="" width="960" height="1120" loading="lazy" />
          <span>{design.name}{value === design.id && <span aria-hidden="true"> ✓</span>}</span>
        </button>)}
      </div>
      {selected && <div className="design-selection" aria-live="polite">
        <span>{copy.chosen}: <strong>{selected.name}</strong> · {designText(selected.style, language)}</span>
        <button type="button" className="design-clear" onClick={() => { onChange(''); triggerRef.current?.focus(); }} aria-label={copy.clear}>×</button>
      </div>}
    </section>
    {open && createPortal(<div ref={portalRef} className="account-modal-backdrop design-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setView(undefined); }}>
      <AccountModal embedded eyebrow={serviceLabel} title={previewed?.name ?? copy.galleryTitle} closeLabel={copy.close} onClose={() => setView(undefined)}>
        {previewed ? <>
          <div className="design-preview-toolbar">
            <button type="button" className="btn btn-secondary btn-sm design-preview-back" onClick={() => setView(null)}>← {copy.back}</button>
            <span className="design-style">{designText(previewed.style, language)}</span>
            {service === 'landing' && liveLink(previewed.id)}
          </div>
          <p className="design-gallery-description">{designText(previewed.description, language)}</p>
          <img className="design-full-preview" src={designImage(previewed.id)} alt={copy.alt.replace('{name}', previewed.name)} width="960" height="1120" />
          <div className="design-preview-actions">
            <p>{copy.note}</p>
            <button type="button" className="btn btn-primary" onClick={() => choose(previewed.id)}>{copy.choose}<span aria-hidden="true">✓</span></button>
          </div>
        </> : <>
          <p className="design-gallery-description">{description}</p>
          <div className="design-gallery-grid">
            {designs.map((design) => <article key={design.id} className={`design-card${value === design.id ? ' is-selected' : ''}`}>
              {service === 'landing' ? <a className="design-card-preview" href={liveUrl(design.id)} target="_blank" rel="noopener noreferrer" aria-label={`${design.name} · ${demoCopy.live}${newTabLabel}`}>
                <img src={designImage(design.id)} alt={copy.alt.replace('{name}', design.name)} width="960" height="1120" loading="lazy" />
              </a> : <button type="button" className="design-card-preview" aria-label={copy.previewLabel.replace('{name}', design.name)} onClick={() => openPreview(design.id)}>
                <img src={designImage(design.id)} alt={copy.alt.replace('{name}', design.name)} width="960" height="1120" loading="lazy" />
              </button>}
              <div className="design-card-copy">
                <div className="design-card-title"><h3>{design.name}</h3><span className="design-style">{designText(design.style, language)}</span></div>
                <p>{designText(design.description, language)}</p>
                <div className="design-card-actions">
                  {service === 'landing' && liveLink(design.id)}
                  {service !== 'landing' && <button type="button" className="btn btn-secondary btn-sm" onClick={() => openPreview(design.id)}>{copy.preview}</button>}
                  <button type="button" className={`btn btn-sm ${value === design.id ? 'btn-primary' : 'btn-secondary'}`} aria-pressed={value === design.id} onClick={() => choose(design.id)}>{value === design.id ? copy.chosen : copy.choose}</button>
                </div>
              </div>
            </article>)}
          </div>
          <div className="design-preview-actions"><p>{copy.note}</p><button type="button" className="btn btn-secondary" onClick={() => choose('')}>{copy.skip}</button></div>
        </>}
      </AccountModal>
    </div>, document.body)}
  </>;
}
