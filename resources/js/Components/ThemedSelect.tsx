import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

export type ThemedSelectOption = { value: string; label: string };
type ThemedSelectProps = {
  id?: string;
  value: string;
  options: readonly ThemedSelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  ariaLabel: string;
  variant?: 'status' | 'filter';
};

export default function ThemedSelect({ id, value, options, onChange, disabled = false, required = false, 'aria-invalid': invalid, 'aria-describedby': describedBy, ariaLabel, variant = 'filter' }: ThemedSelectProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState({ above: false, height: 320 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useLayoutEffect(() => {
    if (!open) return;
    const updatePlacement = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger || !menu) return;
      const rect = trigger.getBoundingClientRect();
      const viewport = window.visualViewport;
      let top = viewport?.offsetTop ?? 0;
      let bottom = top + (viewport?.height ?? window.innerHeight);
      // Intersect the viewport with every ancestor that can clip the menu.
      for (let parent = rootRef.current?.parentElement; parent; parent = parent.parentElement) {
        if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(parent).overflowY)) {
          const bounds = parent.getBoundingClientRect();
          top = Math.max(top, bounds.top + parent.clientTop);
          bottom = Math.min(bottom, bounds.top + parent.clientTop + parent.clientHeight);
        }
      }
      const below = Math.max(0, bottom - rect.bottom - 16);
      const above = Math.max(0, rect.top - top - 16);
      const desired = Math.min(320, menu.scrollHeight + 2);
      const opensAbove = below < desired && above > below;
      setPlacement({ above: opensAbove, height: Math.min(desired, opensAbove ? above : below) });
    };
    updatePlacement();
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
    items?.[Math.max(0, options.findIndex((option) => option.value === value))]?.focus({ preventScroll: true });
    const observer = new ResizeObserver(updatePlacement);
    if (triggerRef.current) observer.observe(triggerRef.current);
    window.addEventListener('resize', updatePlacement);
    document.addEventListener('scroll', updatePlacement, true);
    window.visualViewport?.addEventListener('resize', updatePlacement);
    window.visualViewport?.addEventListener('scroll', updatePlacement);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePlacement);
      document.removeEventListener('scroll', updatePlacement, true);
      window.visualViewport?.removeEventListener('resize', updatePlacement);
      window.visualViewport?.removeEventListener('scroll', updatePlacement);
    };
  }, [open, options, value]);

  useEffect(() => {
    if (!open) return undefined;
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return <div className={`admin-status-control${variant === 'filter' ? ' admin-filter-select' : ''}`} ref={rootRef}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}
    onKeyDown={(event) => {
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        if (!open) { setOpen(true); return; }
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]'));
        const index = items.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items[next]?.focus();
      }
    }}>
    <button id={id} type="button" ref={triggerRef}
      className={`admin-status-select${variant === 'status' ? ` admin-status-${value}` : ''}${open ? ' open' : ''}`}
      onClick={() => setOpen((isOpen) => !isOpen)} disabled={disabled} aria-label={ariaLabel}
      aria-required={required || undefined} aria-invalid={invalid} aria-describedby={describedBy}
      aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? menuId : undefined}>
      <span>{selectedOption?.label ?? value}</span>
      <svg className="admin-status-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    {open && <div id={menuId} ref={menuRef} className="admin-status-menu" data-placement={placement.above ? 'top' : 'bottom'} style={{ top: placement.above ? 'auto' : 'calc(100% + 8px)', bottom: placement.above ? 'calc(100% + 8px)' : 'auto', maxHeight: placement.height, overflowY: 'auto' }} role="listbox" aria-label={ariaLabel}>
      {options.map((option) => <button type="button" className={`admin-status-option${option.value === value ? ' active' : ''}`} key={option.value}
        role="option" aria-selected={option.value === value} onClick={() => {
          setOpen(false);
          triggerRef.current?.focus();
          if (option.value !== value) onChange(option.value);
        }}>
        {variant === 'status' && <span className={`admin-status-option-dot admin-status-${option.value}`} aria-hidden="true" />}
        <span>{option.label}</span>
      </button>)}
    </div>}
  </div>;
}
