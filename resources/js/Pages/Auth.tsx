import { Head, Link, usePage } from '@inertiajs/react';

type PageProps = {
  errors?: Record<string, string>;
  flash?: {
    inquiry_requires_auth?: boolean;
  };
};

export default function Auth() {
  const { errors = {}, flash = {} } = usePage<PageProps>().props;
  const needsAccount = Boolean(flash.inquiry_requires_auth);

  return (
    <main className="auth-page">
      <Head title={needsAccount ? 'Create account' : 'Sign in'} />

      <div className="auth-shell">
        <Link href="/" className="auth-brand">
          I&amp;I <span>Studio</span>
        </Link>

        <section className="auth-card" aria-labelledby="auth-title">
          <div className="auth-card-heading">
            <span className="auth-eyebrow">PRIVATE WORKSPACE</span>
            <h1 id="auth-title">{needsAccount ? 'Create your account' : 'Welcome back'}</h1>
            <p>{needsAccount ? 'Register with Google to send your project brief and access your workspace.' : 'Sign in with Google to access your personal workspace.'}</p>
          </div>

          {errors.google && <div className="auth-alert">{errors.google}</div>}
          {flash.inquiry_requires_auth && (
            <div className="auth-success">
              Create or sign in to your account first. Your project brief will be ready when you return.
            </div>
          )}

          <a className="auth-google-button" href="/auth/google">
            <span className="google-mark" aria-hidden="true">G</span>
            Continue with Google
          </a>

          <div className="auth-google-note">
            <span aria-hidden="true">✦</span>
            No password required. A new Google account is registered automatically.
          </div>
        </section>
      </div>
    </main>
  );
}
