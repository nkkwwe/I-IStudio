import { Head, Link, usePage } from '@inertiajs/react';

type AuthProps = {
  mode?: 'login' | 'register';
};

type PageProps = AuthProps & {
  errors?: Record<string, string>;
};

export default function Auth({ mode = 'login' }: AuthProps) {
  const { errors = {} } = usePage<PageProps>().props;
  const isRegister = mode === 'register';

  return (
    <main className="auth-page">
      <Head title={isRegister ? 'Create account' : 'Sign in'} />
      <div className="auth-shell">
        <Link href="/" className="auth-brand">I&amp;I <span>Studio</span></Link>
        <section className="auth-card" aria-labelledby="auth-title">
          <div className="auth-card-heading">
            <span className="auth-eyebrow">PRIVATE WORKSPACE</span>
            <h1 id="auth-title">{isRegister ? 'Create your account' : 'Welcome back'}</h1>
            <p>{isRegister ? 'Create your personal workspace with your Google account.' : 'Sign in with Google to access your personal workspace.'}</p>
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

          <p className="auth-switch">
            {isRegister ? 'Already have an account?' : 'New to I&I Studio?'}{' '}
            <Link href={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create one'}</Link>
          </p>
          <Link href="/" className="auth-back">← Back to website</Link>
        </section>
      </div>
    </main>
  );
}
