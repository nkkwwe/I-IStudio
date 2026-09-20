import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { getUiCopy } from '../../content/uiTranslations';
import InquiryChatModal from '../../Components/InquiryChatModal';
import { formatDate, type Inquiry } from '../Admin/AdminShell';

type PageProps = {
  inquiries: Inquiry[];
};

export default function AccountProjectBriefs() {
  const { inquiries } = usePage<PageProps>().props;
  const copy = getUiCopy();
  const [activeChatInquiry, setActiveChatInquiry] = useState<Inquiry | null>(null);

  return (
    <>
      <Head title="My project briefs" />
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
              <span className="admin-section-count">{inquiries.length} total</span>
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
                      <span>{formatDate(inquiry.created_at)}</span>
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
                onClose={() => setActiveChatInquiry(null)}
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
}
