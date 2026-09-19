import { Head, Link, usePage } from '@inertiajs/react';

type PageProps = {
  errors?: Record<string, string>;
};

export default function Auth() {
  const { errors = {} } = usePage<PageProps>().props;

  return (
    <main className="auth-page">
      <Head title="Sign in" />

      <div className="auth-shell">
        <Link href="/" className="auth-brand">
          I&amp;I <span>Studio</span>
        </Link>

        <section className="auth-card" aria-labelledby="auth-title">
          <div className="auth-card-heading">
            <span className="auth-eyebrow">PRIVATE WORKSPACE</span>
            <h1 id="auth-title">Welcome back</h1>
            <p>Sign in with Google to access your personal workspace.</p>
          </div>

          {errors.google && <div className="auth-alert">{errors.google}</div>}

          <a className="auth-google-button" href="/auth/google">
            <span className="google-mark" aria-hidden="true">G</span>
            Continue with Google
          </a>

          <div className="auth-google-note">
            <span aria-hidden="true">✦</span>
            No password required. Your Google account keeps your workspace secure.
          </div>
        </section>
      </div>
    </main>
  );
}
