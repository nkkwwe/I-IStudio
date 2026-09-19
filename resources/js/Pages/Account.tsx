import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  created_at?: string;
};

type PageProps = {
  auth: { user: User };
  flash?: { profile_updated?: boolean };
};

export default function Account() {
  const { auth, flash = {} } = usePage<PageProps>().props;
  const user = auth.user;
  const initial = user.name?.trim().charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
  const [isEditingName, setIsEditingName] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const nameForm = useForm({ name: user.name ?? '' });
  const logoutForm = useForm({});
  const deleteForm = useForm({ confirmation: '' });

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('ii_studio_theme', nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  const logout = () => {
    logoutForm.post('/logout');
  };

  const saveName = () => {
    nameForm.patch('/account/profile', {
      preserveScroll: true,
      onSuccess: () => setIsEditingName(false),
    });
  };

  const deleteAccount = () => {
    if (deleteForm.data.confirmation !== 'DELETE') {
      deleteForm.setError('confirmation', 'Type DELETE to confirm.');
      return;
    }

    deleteForm.delete('/account');
  };

  return (
    <main className="account-page">
      <Head title="Account" />
      <div className="account-shell">
        <header className="account-topbar">
          <Link href="/" className="auth-brand">I&amp;I <span>Studio</span></Link>
          <div className="account-topbar-actions">
            <button type="button" className="theme-toggle account-theme-toggle" onClick={toggleTheme} aria-label={isDark ? 'Enable light theme' : 'Enable dark theme'}>
              <svg className="theme-icon theme-icon-sun" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4" /></svg>
              <svg className="theme-icon theme-icon-moon" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg>
            </button>
            <button type="button" className="account-logout" onClick={logout} aria-label="Sign out" title="Sign out">
              <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 5H6.75A1.75 1.75 0 0 0 5 6.75v10.5A1.75 1.75 0 0 0 6.75 19H10" />
                <path d="M13 12h7" />
                <path d="m17 8 4 4-4 4" />
              </svg>
            </button>
          </div>
        </header>

        <section className="account-hero">
          <div className="account-avatar">{user.avatar ? <img src={user.avatar} alt="" /> : initial}</div>
          <div>
            <span className="auth-eyebrow">PERSONAL WORKSPACE</span>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </section>

        {flash.profile_updated && <div className="account-flash">Profile name updated.</div>}

        <section className="account-grid">
          <article className="account-panel account-panel-wide">
            <span className="account-panel-label">ACCOUNT</span>
            <h2>Your workspace is ready.</h2>
            <p>Use this space to keep your project brief, conversations and next steps connected to your account.</p>
            <Link href="/inquiry" className="account-primary-link">Start a project brief <span>→</span></Link>
          </article>

          <article className="account-panel">
            <span className="account-panel-label">PROFILE</span>
            {isEditingName ? (
              <div className="account-profile-form">
                <label className="account-field">
                  <span>Name</span>
                  <input
                    type="text"
                    value={nameForm.data.name}
                    onChange={(event) => nameForm.setData('name', event.target.value)}
                    autoComplete="name"
                    autoFocus
                  />
                </label>
                {nameForm.errors.name && <small className="account-inline-error">{nameForm.errors.name}</small>}
                <div className="account-form-actions">
                  <button type="button" className="account-save-button" onClick={saveName} disabled={nameForm.processing}>
                    {nameForm.processing ? 'Saving…' : 'Save name'}
                  </button>
                  <button type="button" className="account-cancel-button" onClick={() => { nameForm.setData('name', user.name); setIsEditingName(false); }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <dl className="account-details">
                  <div><dt>Name</dt><dd>{user.name}</dd></div>
                  <div><dt>Email</dt><dd>{user.email}</dd></div>
                  <div><dt>Sign-in</dt><dd>Google</dd></div>
                </dl>
                <button type="button" className="account-edit-button" onClick={() => setIsEditingName(true)}>Edit name</button>
              </>
            )}
          </article>

          <article className="account-panel account-panel-danger">
            <span className="account-panel-label">ACCOUNT CONTROL</span>
            <h2>Leave I&amp;I Studio</h2>
            <p>Sign out on this device or permanently remove your workspace and account data.</p>
            {!deleteOpen ? (
              <button type="button" className="account-delete-button" onClick={() => setDeleteOpen(true)}>Delete account</button>
            ) : (
              <div className="account-delete-confirm">
                <strong>This action cannot be undone.</strong>
                <span>Type DELETE to confirm account removal.</span>
                <input
                  type="text"
                  value={deleteForm.data.confirmation}
                  onChange={(event) => deleteForm.setData('confirmation', event.target.value)}
                  placeholder="DELETE"
                  autoComplete="off"
                />
                {deleteForm.errors.confirmation && <small className="account-inline-error">{deleteForm.errors.confirmation}</small>}
                <div className="account-form-actions">
                  <button type="button" className="account-delete-button" onClick={deleteAccount} disabled={deleteForm.processing}>Delete permanently</button>
                  <button type="button" className="account-cancel-button" onClick={() => { setDeleteOpen(false); deleteForm.clearErrors(); }}>Cancel</button>
                </div>
              </div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}
