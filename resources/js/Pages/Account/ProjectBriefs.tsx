import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import ChatUnreadBadge, { fetchChatUnreadCounts } from '../../Components/ChatUnreadBadge';
import InquiryChatModal from '../../Components/InquiryChatModal';
import { formatDate, type Inquiry } from '../Admin/AdminShell';

type PageProps = {
  inquiries: Inquiry[];
};

export default function AccountProjectBriefs() {
  const { inquiries: initialInquiries } = usePage<PageProps>().props;
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [activeChatInquiry, setActiveChatInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  useEffect(() => {
    let cancelled = false;

    const refreshUnreadCounts = async () => {
      if (document.visibilityState === 'hidden') return;

      try {
        const payload = await fetchChatUnreadCounts();
        if (cancelled) return;

        const unreadByInquiry = new Map(
          (payload.inquiries ?? []).map((inquiry) => [inquiry.id, inquiry.unread_count]),
        );

        setInquiries((current) => current.map((inquiry) => ({
          ...inquiry,
          unread_count: unreadByInquiry.get(inquiry.id) ?? 0,
        })));
      } catch {
        // Keep the server-rendered counts during a temporary network failure.
      }
    };

    const handleFocus = () => void refreshUnreadCounts();
    const timer = window.setInterval(() => void refreshUnreadCounts(), 15000);
    window.addEventListener('focus', handleFocus);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const markInquiryRead = (inquiryId: number) => {
    setInquiries((current) => current.map((inquiry) => (
      inquiry.id === inquiryId ? { ...inquiry, unread_count: 0 } : inquiry
    )));
  };

  return (
    <>
      <Head title={copy.account.myProjectBriefs} />
      <main className="account-page account-history-page">
        <div className="account-shell">
          <div className="account-history-topbar">
            <div>
              <span className="auth-eyebrow">{copy.account.personalWorkspace}</span>
              <h1>{copy.account.myProjectBriefs}</h1>
              <p>{copy.account.allTasks}</p>
            </div>
            <div className="account-history-actions">
              <Link href="/account" className="admin-back-link">{copy.account.backToAccount}</Link>
              <Link href="/inquiry" className="account-admin-button">{copy.account.startNewBrief}</Link>
            </div>
          </div>

          <section className="admin-section" aria-labelledby="account-briefs-title">
            <div className="admin-section-heading">
              <div>
                <span className="account-panel-label">{copy.account.projectHistory}</span>
                <h2 id="account-briefs-title">{copy.account.submittedBriefs}</h2>
              </div>
              <span className="admin-section-count">{inquiries.length} {copy.admin.total}</span>
            </div>

            {inquiries.length === 0 ? (
              <div className="account-panel admin-empty-state">
                <strong>{copy.account.noProjectBriefs}</strong>
                <p>{copy.account.noProjectBriefsDescription}</p>
              </div>
            ) : (
              <div className="admin-inquiry-list">
                {inquiries.map((inquiry) => (
                  <article className="account-panel admin-inquiry-card" key={inquiry.id}>
                    <div className="admin-inquiry-head">
                      <div>
                        <span className="admin-inquiry-ticket">{inquiry.ticket}</span>
                        <h3>{copy.services[inquiry.service_type] ?? inquiry.service_type}</h3>
                      </div>
                      <span className={`admin-status admin-status-${inquiry.status}`}>{copy.admin.statuses[inquiry.status] ?? inquiry.status}</span>
                    </div>
                    <div className="admin-inquiry-meta">
                      <span>{inquiry.email}</span>
                      <span>{formatDate(inquiry.created_at, language)}</span>
                    </div>
                    <p className="admin-inquiry-comment">{inquiry.comment}</p>
                    {(inquiry.contact || inquiry.budget) && (
                      <div className="admin-inquiry-details">
                        {inquiry.contact && <span><b>{copy.admin.contact}</b>{inquiry.contact}</span>}
                        {inquiry.budget && <span><b>{copy.admin.budget}</b>{inquiry.budget}</span>}
                      </div>
                    )}
                    <div className="admin-inquiry-actions">
                      <button type="button" className="admin-chat-button" onClick={() => setActiveChatInquiry(inquiry)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.7-.8L4 20l1.8-3.6A7.4 7.4 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z" />
                          <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
                        </svg>
                        <span>{copy.chat.openChat}</span>
                        <ChatUnreadBadge count={inquiry.unread_count ?? 0} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {activeChatInquiry && (
              <InquiryChatModal
                inquiryId={activeChatInquiry.id}
                ticket={activeChatInquiry.ticket}
                title={copy.services[activeChatInquiry.service_type] ?? activeChatInquiry.service_type}
                endpoint={`/account/project-briefs/${activeChatInquiry.id}/messages`}
                currentRole="user"
                onRead={() => markInquiryRead(activeChatInquiry.id)}
                onClose={() => setActiveChatInquiry(null)}
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
}
