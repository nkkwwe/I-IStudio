import { useEffect, useId, useRef, useState } from 'react';

export default function InquiryDisclosure({ title, className = '', children }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const root = useRef(null);

  useEffect(() => {
    const element = root.current;
    const expand = () => setOpen(true);
    element?.addEventListener('inquiry:expand', expand);
    return () => element?.removeEventListener('inquiry:expand', expand);
  }, []);

  return <div ref={root} className={`inquiry-disclosure ${className}`}>
    <button className="inquiry-disclosure-trigger" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
      <span>{title}</span>
      <svg className={open ? 'is-open' : ''} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    <div className={`startup-faq-answer${open ? ' is-open' : ''}`} id={panelId} aria-hidden={!open} inert={!open}>
      <div>{children}</div>
    </div>
  </div>;
}
