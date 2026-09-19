import { Head, Link, usePage } from '@inertiajs/react';

type PageProps = {
  auth: {
    user: {
      email: string;
    };
  };
};

export default function AdminIndex() {
  const { auth } = usePage<PageProps>().props;

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
              <span className="account-panel-label">ACCESS</span>
              <strong className="admin-card-value">Protected</strong>
              <p>Only the configured administrator email can open this area.</p>
            </article>

            <article className="account-panel admin-overview-card">
              <span className="account-panel-label">PROJECTS</span>
              <strong className="admin-card-value">Coming soon</strong>
              <p>Project briefs and workspace management will be added here next.</p>
            </article>

            <article className="account-panel admin-overview-card">
              <span className="account-panel-label">SYSTEM</span>
              <strong className="admin-card-value">Ready</strong>
              <p>The protected foundation is in place for future admin tools.</p>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
