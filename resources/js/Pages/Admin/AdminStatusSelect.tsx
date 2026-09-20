import { useEffect, useRef, useState } from 'react';

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
};

export default function AdminStatusSelect({ value, options, onChange, disabled = false, ariaLabel }: AdminStatusSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="admin-status-control" ref={rootRef}>
      <button
        type="button"
        className={`admin-status-select admin-status-${value}${open ? ' open' : ''}`}
        onClick={() => setOpen((isOpen) => !isOpen)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedOption?.label ?? value}</span>
        <svg className="admin-status-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="admin-status-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <button
              type="button"
              className={`admin-status-option${option.value === value ? ' active' : ''}`}
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                setOpen(false);
                if (option.value !== value) onChange(option.value);
              }}
            >
              <span className={`admin-status-option-dot admin-status-${option.value}`} aria-hidden="true" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
