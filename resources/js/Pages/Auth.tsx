import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';

type AuthProps = {
  mode?: 'login' | 'register';
};

type RegistrationState = {
  email?: string;
  code_sent?: boolean;
  verified?: boolean;
};

type PageProps = AuthProps & {
  errors?: Record<string, string>;
  flash?: {
    verification_sent?: boolean;
    verification_success?: boolean;
  };
  registration?: RegistrationState;
};

export default function Auth({ mode = 'login' }: AuthProps) {
  const { errors = {}, flash = {}, registration = {} } = usePage<PageProps>().props;
  const isRegister = mode === 'register';
  const registerStep = !isRegister
    ? 'login'
    : registration.verified
      ? 'password'
      : registration.code_sent
        ? 'code'
        : 'email';
  const form = useForm({
    name: '',
    email: registration.email ?? '',
    code: '',
    password: '',
    password_confirmation: '',
    remember: false,
  });

  const requestCode = () => {
    form.post('/register/request-code', { preserveScroll: true });
  };

  const verifyCode = () => {
    form.post('/register/verify-code', { preserveScroll: true });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isRegister) {
      form.post('/login');
    } else if (registerStep === 'email') {
      requestCode();
    } else if (registerStep === 'code') {
      verifyCode();
    } else {
      form.post('/register');
    }
  };

  const emailLocked = isRegister && registerStep !== 'email';

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
          {isRegister && flash.verification_sent && (
            <div className="auth-success">Код подтверждения отправлен на вашу почту.</div>
          )}
          {isRegister && flash.verification_success && (
            <div className="auth-success">Email подтверждён. Теперь придумайте пароль.</div>
          )}

          <a className="auth-google-button" href="/auth/google">
            <span className="google-mark" aria-hidden="true">G</span>
            Continue with Google
          </a>

          <div className="auth-divider"><span>or use email</span></div>

          {isRegister && registerStep !== 'login' && (
            <div className="auth-step-label">
              {registerStep === 'email' && 'Step 1 of 3 · Enter your email'}
              {registerStep === 'code' && 'Step 2 of 3 · Confirm your email'}
              {registerStep === 'password' && 'Step 3 of 3 · Create a password'}
            </div>
          )}

          <form onSubmit={submit} className="auth-form">
            {isRegister && registerStep === 'password' && (
              <label>
                Name <span className="auth-optional">optional</span>
                <input type="text" autoComplete="name" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} />
                {form.errors.name && <small>{form.errors.name}</small>}
              </label>
            )}

            {(registerStep === 'login' || isRegister) && (
              <label>
                Email
                <input
                  type="email"
                  autoComplete="email"
                  value={form.data.email}
                  readOnly={emailLocked}
                  onChange={(event) => form.setData('email', event.target.value)}
                  required
                />
                {form.errors.email && <small>{form.errors.email}</small>}
              </label>
            )}

            {isRegister && registerStep === 'code' && (
              <label>
                Confirmation code
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={form.data.code}
                  onChange={(event) => form.setData('code', event.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                />
                <span className="auth-hint">Check your inbox. The code is valid for 10 minutes.</span>
                {form.errors.code && <small>{form.errors.code}</small>}
              </label>
            )}

            {(!isRegister || registerStep === 'password') && (
              <label>
                Password
                <input type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} value={form.data.password} onChange={(event) => form.setData('password', event.target.value)} required minLength={isRegister ? 8 : undefined} />
                {isRegister && <span className="auth-hint">At least 8 characters.</span>}
                {form.errors.password && <small>{form.errors.password}</small>}
              </label>
            )}

            {isRegister && registerStep === 'password' ? (
              <label>
                Confirm password
                <input type="password" autoComplete="new-password" value={form.data.password_confirmation} onChange={(event) => form.setData('password_confirmation', event.target.value)} required />
                {form.errors.password_confirmation && <small>{form.errors.password_confirmation}</small>}
              </label>
            ) : !isRegister ? (
              <label className="auth-check-row">
                <input type="checkbox" checked={form.data.remember} onChange={(event) => form.setData('remember', event.target.checked)} />
                <span>Remember me</span>
              </label>
            ) : null}

            <button type="submit" className="auth-submit" disabled={form.processing}>
              {form.processing ? 'Please wait…' : !isRegister ? 'Sign in' : registerStep === 'email' ? 'Send confirmation code' : registerStep === 'code' ? 'Confirm email' : 'Create account'}
            </button>
          </form>

          {isRegister && registerStep === 'code' && (
            <div className="auth-step-actions">
              <button type="button" className="auth-text-button" onClick={requestCode} disabled={form.processing}>Send code again</button>
              <Link href="/register/reset" className="auth-text-button">Use another email</Link>
            </div>
          )}

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
