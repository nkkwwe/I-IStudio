import { Head, Link, usePage } from '@inertiajs/react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';

type PageProps = {
  errors?: Record<string, string>;
  flash?: {
    inquiry_requires_auth?: boolean;
  };
};

export default function Auth() {
  const { errors = {}, flash = {} } = usePage<PageProps>().props;
  const needsAccount = Boolean(flash.inquiry_requires_auth);
  const copy = getUiCopy(useSiteLanguage());

  return (
    <main className="auth-page">
      <Head title={needsAccount ? copy.auth.pageCreateAccount : copy.auth.pageSignIn} />

      <div className="auth-shell">
        <Link href="/" className="auth-brand">
          I&amp;I <span>Studio</span>
        </Link>

        <section className="auth-card" aria-labelledby="auth-title">
          <div className="auth-card-heading">
            <span className="auth-eyebrow">{copy.auth.privateWorkspace}</span>
            <h1 id="auth-title">{needsAccount ? copy.auth.createYourAccount : copy.auth.welcomeBack}</h1>
            <p>{needsAccount ? copy.auth.createAccountDescription : copy.auth.signInDescription}</p>
          </div>

          {errors.google && <div className="auth-alert">{errors.google}</div>}
          {flash.inquiry_requires_auth && (
            <div className="auth-success">
              {copy.auth.inquiryRequiresAuth}
            </div>
          )}

          <a className="auth-google-button" href="/auth/google">
            <span className="google-mark" aria-hidden="true">G</span>
            {copy.auth.continueWithGoogle}
          </a>

          <div className="auth-google-note">
            <span aria-hidden="true">✦</span>
            {copy.auth.noPasswordNote}
          </div>
        </section>
      </div>
    </main>
  );
}
