import { useEffect, useId, useRef, useState } from 'react';

export type StatusOption = {
  value: string;
  label: string;
};

type AdminStatusSelectProps = {
  value: string;
  options: readonly StatusOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  ariaLabel: string;
  variant?: 'status' | 'filter';
};

export default function AdminStatusSelect({ value, options, onChange, disabled = false, ariaLabel, variant = 'status' }: AdminStatusSelectProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (open) {
      const items = rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
      items?.[Math.max(0, options.findIndex((option) => option.value === value))]?.focus();
    }
  }, [open]);

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

  return (
    <div className={`admin-status-control${variant === 'filter' ? ' admin-filter-select' : ''}`} ref={rootRef}
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
      <button
        type="button"
        ref={triggerRef}
        className={`admin-status-select${variant === 'status' ? ` admin-status-${value}` : ''}${open ? ' open' : ''}`}
        onClick={() => setOpen((isOpen) => !isOpen)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
      >
        <span>{selectedOption?.label ?? value}</span>
        <svg className="admin-status-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div id={menuId} className="admin-status-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <button
              type="button"
              className={`admin-status-option${option.value === value ? ' active' : ''}`}
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
                if (option.value !== value) onChange(option.value);
              }}
            >
              {variant === 'status' && <span className={`admin-status-option-dot admin-status-${option.value}`} aria-hidden="true" />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
