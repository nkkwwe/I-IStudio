import { Head, Link, router, usePage } from '@inertiajs/react';

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  created_at?: string;
};

type PageProps = {
  auth: { user: User };
};

export default function Account() {
  const { auth } = usePage<PageProps>().props;
  const user = auth.user;
  const initial = user.name?.trim().charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();

  const logout = () => router.post('/logout');

  return (
    <main className="account-page">
      <Head title="Account" />
      <div className="account-shell">
        <header className="account-topbar">
          <Link href="/" className="auth-brand">I&amp;I <span>Studio</span></Link>
          <button type="button" className="account-logout" onClick={logout}>Sign out</button>
        </header>
        <section className="account-hero">
          <div className="account-avatar">{user.avatar ? <img src={user.avatar} alt="" /> : initial}</div>
          <div>
            <span className="auth-eyebrow">PERSONAL WORKSPACE</span>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </section>
        <section className="account-grid">
          <article className="account-panel account-panel-wide">
            <span className="account-panel-label">ACCOUNT</span>
            <h2>Your workspace is ready.</h2>
            <p>Use this space to keep your project brief, conversations and next steps connected to your account.</p>
            <Link href="/inquiry" className="account-primary-link">Start a project brief <span>→</span></Link>
          </article>
          <article className="account-panel">
            <span className="account-panel-label">PROFILE</span>
            <dl className="account-details">
              <div><dt>Name</dt><dd>{user.name}</dd></div>
              <div><dt>Email</dt><dd>{user.email}</dd></div>
              <div><dt>Sign-in</dt><dd>{user.avatar ? 'Google' : 'Email and password'}</dd></div>
            </dl>
          </article>
        </section>
        <Link href="/" className="account-back">← Back to website</Link>
      </div>
    </main>
  );
}
