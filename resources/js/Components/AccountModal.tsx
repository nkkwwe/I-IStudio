import { type MouseEvent } from 'react';

type AccountModalProps = {
  eyebrow: string;
  title: string;
  closeLabel: string;
  children: React.ReactNode;
  danger?: boolean;
  onClose: () => void;
};

export default function AccountModal({ eyebrow, title, closeLabel, children, danger = false, onClose }: AccountModalProps) {
  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="account-modal-backdrop" onMouseDown={handleBackdropMouseDown}>
      <section className={`account-modal${danger ? ' account-modal-danger' : ''}`} role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
        <div className="account-modal-heading">
          <div>
            <span className="account-panel-label">{eyebrow}</span>
            <h2 id="account-modal-title">{title}</h2>
          </div>
          <button type="button" className="account-modal-close" onClick={onClose} aria-label={closeLabel}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="account-modal-body">{children}</div>
      </section>
    </div>
  );
}

