import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';

type AuthProps = {
  mode?: 'login' | 'register';
};

type PageProps = AuthProps & {
  errors?: Record<string, string>;
};

export default function Auth({ mode = 'login' }: AuthProps) {
  const { errors = {} } = usePage<PageProps>().props;
  const isRegister = mode === 'register';
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    remember: false,
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.post(isRegister ? '/register' : '/login');
  };

  return (
    <main className="auth-page">
      <Head title={isRegister ? 'Create account' : 'Sign in'} />
      <div className="auth-shell">
        <Link href="/" className="auth-brand">I&amp;I <span>Studio</span></Link>
        <section className="auth-card" aria-labelledby="auth-title">
          <div className="auth-card-heading">
            <span className="auth-eyebrow">PRIVATE WORKSPACE</span>
            <h1 id="auth-title">{isRegister ? 'Create your account' : 'Welcome back'}</h1>
            <p>{isRegister ? 'Save your brief and keep your project conversations in one place.' : 'Sign in to access your personal workspace.'}</p>
          </div>

          {errors.google && <div className="auth-alert">{errors.google}</div>}

          <a className="auth-google-button" href="/auth/google">
            <span className="google-mark" aria-hidden="true">G</span>
            Continue with Google
          </a>

          <div className="auth-divider"><span>or use email</span></div>

          <form onSubmit={submit} className="auth-form">
            {isRegister && (
              <label>
                Name <span className="auth-optional">optional</span>
                <input type="text" autoComplete="name" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} />
                {form.errors.name && <small>{form.errors.name}</small>}
              </label>
            )}
            <label>
              Email
              <input type="email" autoComplete="email" value={form.data.email} onChange={(event) => form.setData('email', event.target.value)} required />
              {form.errors.email && <small>{form.errors.email}</small>}
            </label>
            <label>
              Password
              <input type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} value={form.data.password} onChange={(event) => form.setData('password', event.target.value)} required minLength={isRegister ? 8 : undefined} />
              {isRegister && <span className="auth-hint">At least 8 characters.</span>}
              {form.errors.password && <small>{form.errors.password}</small>}
            </label>
            {isRegister ? (
              <label>
                Confirm password
                <input type="password" autoComplete="new-password" value={form.data.password_confirmation} onChange={(event) => form.setData('password_confirmation', event.target.value)} required />
              </label>
            ) : (
              <label className="auth-check-row">
                <input type="checkbox" checked={form.data.remember} onChange={(event) => form.setData('remember', event.target.checked)} />
                <span>Remember me</span>
              </label>
            )}
            <button type="submit" className="auth-submit" disabled={form.processing}>
              {form.processing ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>

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
