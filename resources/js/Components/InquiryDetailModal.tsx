import { useEffect, type ReactNode } from 'react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import ChatUnreadBadge from './ChatUnreadBadge';
import { formatDate, formatBudget, type Inquiry } from '../Pages/Admin/AdminShell';

type InquiryDetailModalProps = {
  inquiry: Inquiry;
  currentRole: 'admin' | 'user';
  onClose: () => void;
  onOpenChat: () => void;
  statusSlot?: ReactNode;
};

export default function InquiryDetailModal({
  inquiry,
  currentRole,
  onClose,
  onOpenChat,
  statusSlot,
}: InquiryDetailModalProps) {
  const language = useSiteLanguage();
  const copy = getUiCopy(language);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const serviceTitle = copy.services[inquiry.service_type] ?? inquiry.service_type;
  const formattedBudget = formatBudget(inquiry.budget);

  return (
    <div className="inquiry-detail-backdrop" onMouseDown={handleBackdropMouseDown}>
      <section
        className="inquiry-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-detail-modal-title"
      >
        <div className="inquiry-detail-heading">
          <div>
            <span className="inquiry-detail-ticket">{inquiry.ticket}</span>
            <h2 id="inquiry-detail-modal-title">{serviceTitle}</h2>
          </div>
          <div className="inquiry-detail-heading-actions">
            {statusSlot ? (
              statusSlot
            ) : (
              <span className={`admin-status admin-status-${inquiry.status}`}>
                {copy.admin.statuses[inquiry.status] ?? inquiry.status}
              </span>
            )}
            <button
              type="button"
              className="account-modal-close"
              onClick={onClose}
              aria-label={copy.common.closeDialog}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="inquiry-detail-meta-grid">
          <div className="inquiry-detail-meta-item">
            <span className="inquiry-detail-meta-label">{copy.admin.client}</span>
            <span className="inquiry-detail-meta-value">
              <strong>{inquiry.name}</strong>
              {inquiry.email && <span className="inquiry-detail-subtext"> · {inquiry.email}</span>}
            </span>
          </div>

          <div className="inquiry-detail-meta-item">
            <span className="inquiry-detail-meta-label">{copy.admin.date}</span>
            <span className="inquiry-detail-meta-value">{formatDate(inquiry.created_at, language)}</span>
          </div>

          {inquiry.contact && (
            <div className="inquiry-detail-meta-item">
              <span className="inquiry-detail-meta-label">{copy.admin.contact}</span>
              <span className="inquiry-detail-meta-value">{inquiry.contact}</span>
            </div>
          )}

          {formattedBudget && (
            <div className="inquiry-detail-meta-item">
              <span className="inquiry-detail-meta-label">{copy.admin.budget}</span>
              <span className="inquiry-detail-meta-value">{formattedBudget}</span>
            </div>
          )}
        </div>

        <div className="inquiry-detail-comment-section">
          <span className="inquiry-detail-comment-label">{copy.admin.description}</span>
          <div className="inquiry-detail-comment-box">
            {inquiry.comment ? inquiry.comment : <em>{copy.admin.noDescription}</em>}
          </div>
        </div>

        <div className="inquiry-detail-footer">
          <button type="button" className="inquiry-detail-chat-btn" onClick={onOpenChat}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.7-.8L4 20l1.8-3.6A7.4 7.4 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z" />
              <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
            </svg>
            <span>{copy.chat.openChat}</span>
            {Boolean(inquiry.unread_count && inquiry.unread_count > 0) && (
              <ChatUnreadBadge count={inquiry.unread_count ?? 0} />
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
