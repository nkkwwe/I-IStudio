import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import InquiryChatModal from '../../Components/InquiryChatModal';
import InquiryDetailModal from '../../Components/InquiryDetailModal';
import AdminShell from './AdminShell';
import { formatDate, formatBudget, type Inquiry } from '../../lib/inquiries';
import AdminStatusSelect from './AdminStatusSelect';
import BriefFilters, { useBriefFilters } from './BriefFilters';
import { getAdminCopy } from './adminCopy';
import InquiryUnreadNotice from '../../Components/InquiryUnreadNotice';
import useInquiryUnreadPolling from '../../lib/useInquiryUnreadPolling';

type PageProps = {
  inquiries: Inquiry[];
};

export default function ProjectBriefs() {
  const page = usePage<PageProps>();
  const { inquiries: initialInquiries } = page.props;
  const [inquiries, setInquiries] = useState(initialInquiries);
  useInquiryUnreadPolling(setInquiries, '/admin/project-briefs/unread-counts');
  useEffect(() => { setInquiries(initialInquiries); }, [initialInquiries]);
  const filterState = useBriefFilters(inquiries);
  const [updatingInquiryId, setUpdatingInquiryId] = useState<number | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const currentInquiry = selectedInquiry ? inquiries.find((inquiry) => inquiry.id === selectedInquiry.id) ?? selectedInquiry : null;
  const [activeChatInquiry, setActiveChatInquiry] = useState<Inquiry | null>(null);
  const isInquiryModalOpen = Boolean(selectedInquiry || activeChatInquiry);
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  useEffect(() => {
    const id = Number(new URL(page.url, window.location.origin).searchParams.get('brief'));
    setSelectedInquiry(inquiries.find((inquiry) => inquiry.id === id) ?? null);
  }, [page.url]);

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
      onSuccess: () => setSelectedInquiry((current) => current?.id === inquiry.id ? { ...current, status } : current),
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
      <BriefFilters inquiries={inquiries} state={filterState} />
      {filterState.filtered.length === 0 ? (
        <div className="account-panel admin-empty-state">
          <strong>{inquiries.length ? getAdminCopy(language).empty : copy.admin.noProjectBriefs}</strong>
        </div>
      ) : (
        <div className="admin-inquiry-list">
          {filterState.filtered.map((inquiry) => (
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
                <div className="inquiry-card-updates">
                  <InquiryUnreadNotice count={inquiry.unread_count} />
                  <span>{formatDate(inquiry.created_at, language)}</span>
                </div>
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
          {currentInquiry && (
            <InquiryDetailModal
              inquiry={currentInquiry}
              currentRole="admin"
              onClose={() => setSelectedInquiry(null)}
              onOpenChat={() => {
                const inq = currentInquiry;
                setSelectedInquiry(null);
                setActiveChatInquiry(inq);
              }}
              statusSlot={currentInquiry.status !== 'cancelled' && (
                <div onClick={(e) => e.stopPropagation()}>
                  <AdminStatusSelect
                    value={currentInquiry.status}
                    options={Object.entries(copy.admin.statuses).filter(([value]) => value !== 'cancelled').map(([value, label]) => ({ value, label }))}
                    onChange={(status) => {
                      updateStatus(currentInquiry, status);
                    }}
                    disabled={updatingInquiryId === currentInquiry.id}
                    ariaLabel={`${copy.admin.projectBriefs}: ${currentInquiry.ticket}`}
                  />
                </div>
              )}
            />
          )}
          {activeChatInquiry && (
            <InquiryChatModal
              key={activeChatInquiry.id}
              inquiryId={activeChatInquiry.id}
              ticket={activeChatInquiry.ticket}
              clientName={activeChatInquiry.name}
              title={copy.services[activeChatInquiry.service_type] ?? activeChatInquiry.service_type}
              endpoint={`/admin/project-briefs/${activeChatInquiry.id}/messages`}
              currentRole="admin"
              onRead={() => setInquiries((current) => current.map((inquiry) => inquiry.id === activeChatInquiry.id ? { ...inquiry, unread_count: 0 } : inquiry))}
              onClose={() => { setActiveChatInquiry(null); setSelectedInquiry(activeChatInquiry); }}
            />
          )}
        </div>
      )}
    </AdminShell>
  );
}
