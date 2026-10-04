import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import AccountModal from './AccountModal';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import type { Inquiry } from '../lib/inquiries';

export default function InquiryCancelModal({ inquiry, onClose, onCancelled }: {
  inquiry: Inquiry; onClose: () => void; onCancelled: () => void;
}) {
  const copy = getUiCopy(useSiteLanguage());
  const form = useForm({ status: 'cancelled' });
  const confirmButton = useRef<HTMLButtonElement>(null);
  const closeRef = useRef(onClose);
  const processingRef = useRef(form.processing);
  closeRef.current = onClose;
  processingRef.current = form.processing;

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    confirmButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !processingRef.current) closeRef.current();
      if (event.key !== 'Tab') return;
      const buttons = Array.from(confirmButton.current?.closest('[role="dialog"]')?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <AccountModal eyebrow={inquiry.ticket} title={copy.cancellation.title} danger embedded closeLabel={copy.common.closeDialog}
      onClose={() => { if (!form.processing) onClose(); }}>
      <p className="account-modal-copy">{copy.cancellation.description}</p>
      {form.errors.status && <p className="account-inline-error" role="alert">{copy.cancellation.error}</p>}
      <div className="account-modal-actions">
        <button ref={confirmButton} type="button" className="account-modal-button account-modal-button-danger inquiry-cancel-confirm-btn" disabled={form.processing}
          onClick={() => form.patch(`/account/project-briefs/${inquiry.id}/cancel`, { preserveScroll: true, onSuccess: onCancelled })}>
          {form.processing ? copy.cancellation.processing : copy.cancellation.confirm}
        </button>
      </div>
    </AccountModal>
  );
}
