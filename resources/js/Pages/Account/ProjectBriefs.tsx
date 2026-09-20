import { Head, Link, usePage } from '@inertiajs/react';
import { getUiCopy } from '../../content/uiTranslations';
import { formatDate, type Inquiry } from '../Admin/AdminShell';

type PageProps = {
  inquiries: Inquiry[];
};

export default function AccountProjectBriefs() {
  const { inquiries } = usePage<PageProps>().props;
  const copy = getUiCopy();

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
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
