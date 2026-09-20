import { Head, Link, usePage } from '@inertiajs/react';

type AdminUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  created_at?: string | null;
};

type Inquiry = {
  id: number;
  ticket: string;
  name: string;
  email: string;
  contact?: string | null;
  budget?: string | null;
  service_type: string;
  comment: string;
  status: string;
  created_at?: string | null;
};

type PageProps = {
  auth: {
    user: {
      email: string;
    };
  };
  users: AdminUser[];
  inquiries: Inquiry[];
};

const serviceLabels: Record<string, string> = {
  landing: 'Landing Page',
  corporate: 'Business Website',
  redesign: 'Website Redesign',
  ads: 'Advertising',
  consultation: 'Consultation',
  other: 'Other',
};

function formatDate(value?: string | null): string {
  if (!value) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function getInitials(user: AdminUser): string {
  return user.name?.trim().charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
}

export default function AdminIndex() {
  const { auth, users, inquiries } = usePage<PageProps>().props;
  const newInquiries = inquiries.filter((inquiry) => inquiry.status === 'new').length;

  return (
    <>
      <Head title="Admin panel" />
      <main className="account-page admin-page">
        <div className="account-shell">
          <div className="admin-topbar">
            <div>
              <span className="auth-eyebrow">ADMIN AREA</span>
              <h1>Workspace control</h1>
              <p>Admin access is active for {auth.user.email}.</p>
            </div>
            <div className="admin-topbar-actions">
              <Link href="/account" className="admin-back-link">← Profile</Link>
              <Link href="/" className="admin-back-link">Open site ↗</Link>
            </div>
          </div>

          <section className="admin-overview-grid" aria-label="Admin overview">
            <article className="account-panel admin-overview-card">
              <span className="account-panel-label">REGISTERED USERS</span>
              <strong className="admin-card-value">{users.length}</strong>
              <p>All accounts created on the I&amp;I Studio website.</p>
            </article>

            <article className="account-panel admin-overview-card">
              <span className="account-panel-label">NEW BRIEFS</span>
              <strong className="admin-card-value">{newInquiries}</strong>
              <p>Project tasks waiting for your review and response.</p>
            </article>

            <article className="account-panel admin-overview-card">
              <span className="account-panel-label">ACCESS</span>
              <strong className="admin-card-value">Protected</strong>
              <p>Only configured administrator emails can open this area.</p>
            </article>
          </section>

          <section className="admin-section" aria-labelledby="admin-inquiries-title">
            <div className="admin-section-heading">
              <div>
                <span className="account-panel-label">WORK QUEUE</span>
                <h2 id="admin-inquiries-title">Project briefs</h2>
              </div>
              <span className="admin-section-count">{inquiries.length} total</span>
            </div>

            {inquiries.length === 0 ? (
              <div className="account-panel admin-empty-state">
                <strong>No project briefs yet</strong>
                <p>New tasks sent through the project form will appear here.</p>
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
                      <span className={`admin-status admin-status-${inquiry.status}`}>{inquiry.status}</span>
                    </div>
                    <div className="admin-inquiry-meta">
                      <span><strong>{inquiry.name}</strong> · {inquiry.email}</span>
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

          <section className="admin-section" aria-labelledby="admin-users-title">
            <div className="admin-section-heading">
              <div>
                <span className="account-panel-label">PEOPLE</span>
                <h2 id="admin-users-title">Registered users</h2>
              </div>
              <span className="admin-section-count">{users.length} total</span>
            </div>

            <div className="account-panel admin-users-panel">
              {users.length === 0 ? (
                <div className="admin-empty-state admin-empty-state-inline">
                  <strong>No users registered yet</strong>
                </div>
              ) : (
                <div className="admin-users-list">
                  {users.map((user) => (
                    <div className="admin-user-row" key={user.id}>
                      <div className="admin-user-identity">
                        <span className="admin-user-avatar">
                          {user.avatar ? <img src={user.avatar} alt="" /> : getInitials(user)}
                        </span>
                        <span>
                          <strong>{user.name || 'Unnamed user'}</strong>
                          <small>{user.email}</small>
                        </span>
                      </div>
                      <span className="admin-user-date">Registered {formatDate(user.created_at)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
