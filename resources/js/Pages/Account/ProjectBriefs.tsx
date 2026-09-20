import { Head, Link, usePage } from '@inertiajs/react';
import { formatDate, inquiryStatusLabels, serviceLabels, type Inquiry } from '../Admin/AdminShell';

type PageProps = {
  inquiries: Inquiry[];
};

export default function AccountProjectBriefs() {
  const { inquiries } = usePage<PageProps>().props;

  return (
    <>
      <Head title="My project briefs" />
      <main className="account-page account-history-page">
        <div className="account-shell">
          <div className="account-history-topbar">
            <div>
              <span className="auth-eyebrow">PERSONAL WORKSPACE</span>
              <h1>My project briefs</h1>
              <p>All tasks you have sent to I&amp;I Studio from this account.</p>
            </div>
            <div className="account-history-actions">
              <Link href="/account" className="admin-back-link">Back to account</Link>
              <Link href="/inquiry" className="account-admin-button">Start new brief</Link>
            </div>
          </div>

          <section className="admin-section" aria-labelledby="account-briefs-title">
            <div className="admin-section-heading">
              <div>
                <span className="account-panel-label">PROJECT HISTORY</span>
                <h2 id="account-briefs-title">Submitted briefs</h2>
              </div>
              <span className="admin-section-count">{inquiries.length} total</span>
            </div>

            {inquiries.length === 0 ? (
              <div className="account-panel admin-empty-state">
                <strong>No project briefs yet</strong>
                <p>Your submitted tasks will appear here after you send the project form.</p>
              </div>
            ) : (
              <div className="admin-inquiry-list">
                {inquiries.map((inquiry) => (
                  <article className="account-panel admin-inquiry-card" key={inquiry.id}>
                    <div className="admin-inquiry-head">
                      <div>
                        <span className="admin-inquiry-ticket">{inquiry.ticket}</span>
                        <h3>{serviceLabels[inquiry.service_type] ?? inquiry.service_type}</h3>
                      </div>
                      <span className={`admin-status admin-status-${inquiry.status}`}>{inquiryStatusLabels[inquiry.status] ?? inquiry.status}</span>
                    </div>
                    <div className="admin-inquiry-meta">
                      <span>{inquiry.email}</span>
                      <span>{formatDate(inquiry.created_at)}</span>
                    </div>
                    <p className="admin-inquiry-comment">{inquiry.comment}</p>
                    {(inquiry.contact || inquiry.budget) && (
                      <div className="admin-inquiry-details">
                        {inquiry.contact && <span><b>Contact</b>{inquiry.contact}</span>}
                        {inquiry.budget && <span><b>Budget</b>{inquiry.budget}</span>}
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
