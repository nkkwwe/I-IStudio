import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import InquiryChatModal from '../../Components/InquiryChatModal';
import InquiryDetailModal from '../../Components/InquiryDetailModal';
import AdminShell from './AdminShell';
import { formatDate, formatBudget, type Inquiry } from '../../lib/inquiries';
import AdminStatusSelect from './AdminStatusSelect';

type PageProps = {
  inquiries: Inquiry[];
};

export default function ProjectBriefs() {
  const { inquiries } = usePage<PageProps>().props;
  const [updatingInquiryId, setUpdatingInquiryId] = useState<number | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [activeChatInquiry, setActiveChatInquiry] = useState<Inquiry | null>(null);
  const isInquiryModalOpen = Boolean(selectedInquiry || activeChatInquiry);
  const language = useSiteLanguage();
  const copy = getUiCopy(language);

  useEffect(() => {
    if (!isInquiryModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInquiryModalOpen]);

  const updateStatus = (inquiry: Inquiry, status: string) => {
    setUpdatingInquiryId(inquiry.id);
    router.patch(`/admin/project-briefs/${inquiry.id}/status`, { status }, {
      preserveScroll: true,
      onFinish: () => setUpdatingInquiryId(null),
    });
  };

  return (
    <AdminShell
      title={copy.admin.projectBriefs}
      eyebrow={copy.admin.workQueue}
      heading={copy.admin.projectBriefs}
      count={inquiries.length}
      activeSection="briefs"
    >
      {inquiries.length === 0 ? (
        <div className="account-panel admin-empty-state">
          <strong>{copy.admin.noProjectBriefs}</strong>
          <p>{copy.admin.newTasks}</p>
        </div>
      ) : (
        <div className="admin-inquiry-list">
          {inquiries.map((inquiry) => (
            <article
              className="account-panel admin-inquiry-card"
              key={inquiry.id}
              tabIndex={0}
              role="button"
              onClick={() => setSelectedInquiry(inquiry)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedInquiry(inquiry);
                }
              }}
            >
              <div className="admin-inquiry-head">
                <div>
                  <span className="admin-inquiry-ticket">{inquiry.ticket}</span>
                  <h3>{copy.services[inquiry.service_type] ?? inquiry.service_type}</h3>
                </div>
                <span className={`admin-status admin-status-${inquiry.status}`}>
                  <span>{copy.admin.statuses[inquiry.status] ?? inquiry.status}</span>
                </span>
              </div>
              <div className="admin-inquiry-meta">
                <span><strong>{inquiry.name}</strong> · {inquiry.email}</span>
                <span>{formatDate(inquiry.created_at, language)}</span>
              </div>
              {(inquiry.contact || inquiry.budget) && (
                <div className="admin-inquiry-details">
                  {inquiry.contact && <span><b>{copy.admin.contact}</b>{inquiry.contact}</span>}
                  {inquiry.budget && <span><b>{copy.admin.budget}</b>{formatBudget(inquiry.budget)}</span>}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      {isInquiryModalOpen && (
        <div
          className="inquiry-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedInquiry(null);
              setActiveChatInquiry(null);
            }
          }}
        >
          {selectedInquiry && (
            <InquiryDetailModal
              inquiry={selectedInquiry}
              currentRole="admin"
              onClose={() => setSelectedInquiry(null)}
              onOpenChat={() => {
                const inq = selectedInquiry;
                setSelectedInquiry(null);
                setActiveChatInquiry(inq);
              }}
              statusSlot={
                <div onClick={(e) => e.stopPropagation()}>
                  <AdminStatusSelect
                    value={selectedInquiry.status}
                    options={Object.entries(copy.admin.statuses).map(([value, label]) => ({ value, label }))}
                    onChange={(status) => {
                      updateStatus(selectedInquiry, status);
                      setSelectedInquiry((prev) => prev ? { ...prev, status } : null);
                    }}
                    disabled={updatingInquiryId === selectedInquiry.id}
                    ariaLabel={`${copy.admin.projectBriefs}: ${selectedInquiry.ticket}`}
                  />
                </div>
              }
            />
          )}
          {activeChatInquiry && (
            <InquiryChatModal
              inquiryId={activeChatInquiry.id}
              ticket={activeChatInquiry.ticket}
              title={copy.services[activeChatInquiry.service_type] ?? activeChatInquiry.service_type}
              endpoint={`/admin/project-briefs/${activeChatInquiry.id}/messages`}
              currentRole="admin"
              onClose={() => setActiveChatInquiry(null)}
            />
          )}
        </div>
      )}
    </AdminShell>
  );
}
