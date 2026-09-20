import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState, type MouseEvent } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  created_at?: string;
  is_admin: boolean;
};

type PageProps = {
  auth: { user: User };
  flash?: { profile_updated?: boolean };
};

type AccountModalProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  danger?: boolean;
  onClose: () => void;
};

type AccountSiteHeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
};

function AccountSiteHeader({ isDark, onToggleTheme, onLogout }: AccountSiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState(() => window.localStorage.getItem('ii_studio_language') || 'en');
  const languageLabels: Record<string, string> = { en: 'EN', uk: 'UK', ro: 'RO' };

  const selectLanguage = (nextLanguage: string) => {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
    window.localStorage.setItem('ii_studio_language', nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  return (
    <header className="site-header account-site-header">
      <div className="container header-container">
        <a href="/#hero" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="logo-symbol">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x={2} y={2} width={20} height={20} rx={6} fill="#09090b" />
              <path d="M7 7V17M17 7V17M10.5 13.5C11.2 12.8 12.8 11.2 13.5 10.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
              <circle cx={12} cy={12} r="1.5" fill="#ffffff" />
            </svg>
          </span>
          <span className="logo-text">I&amp;I<span className="logo-sub">Studio</span></span>
        </a>

        <nav className={`nav-menu${mobileMenuOpen ? ' open' : ''}`} id="accountNavMenu">
          {[
            ['Solutions', '/#solutions'],
            ['Services', '/#services'],
            ['Cases', '/#cases'],
            ['How We Work', '/#process'],
            ['About', '/#advantages'],
            ['Contact', '/#contact'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{label}</a>
          ))}
          <div className={`language-switcher mobile-language-switcher${languageOpen ? ' open' : ''}`}>
            <button type="button" className="language-trigger" onClick={() => setLanguageOpen((open) => !open)} aria-haspopup="listbox" aria-expanded={languageOpen} aria-label={`Language: ${languageLabels[language]}`}>
              <span className="language-current">{languageLabels[language]}</span>
              <svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className="language-menu" role="listbox" aria-label="Available languages">
              <button type="button" className={`language-option${language === 'en' ? ' active' : ''}`} onClick={() => selectLanguage('en')} role="option" aria-selected={language === 'en'}>English <span>EN</span></button>
              <button type="button" className={`language-option${language === 'uk' ? ' active' : ''}`} onClick={() => selectLanguage('uk')} role="option" aria-selected={language === 'uk'}>Українська <span>UK</span></button>
              <button type="button" className={`language-option${language === 'ro' ? ' active' : ''}`} onClick={() => selectLanguage('ro')} role="option" aria-selected={language === 'ro'}>Română <span>RO</span></button>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <Link href="/inquiry" className="btn btn-primary btn-sm">
            <span>Discuss Project</span>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
          <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label={isDark ? 'Enable light theme' : 'Enable dark theme'}>
            <svg className="theme-icon theme-icon-sun" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4" /></svg>
            <svg className="theme-icon theme-icon-moon" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg>
          </button>
          <button type="button" className="account-logout" onClick={onLogout} aria-label="Sign out" title="Sign out">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 5H6.75A1.75 1.75 0 0 0 5 6.75v10.5A1.75 1.75 0 0 0 6.75 19H10" /><path d="M13 12h7" /><path d="m17 8 4 4-4 4" /></svg>
          </button>
          <div className={`language-switcher${languageOpen ? ' open' : ''}`}>
            <button type="button" className="language-trigger" onClick={() => setLanguageOpen((open) => !open)} aria-haspopup="listbox" aria-expanded={languageOpen} aria-label={`Language: ${languageLabels[language]}`}>
              <span className="language-current">{languageLabels[language]}</span>
              <svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className="language-menu" role="listbox" aria-label="Available languages">
              <button type="button" className={`language-option${language === 'en' ? ' active' : ''}`} onClick={() => selectLanguage('en')} role="option" aria-selected={language === 'en'}>English <span>EN</span></button>
              <button type="button" className={`language-option${language === 'uk' ? ' active' : ''}`} onClick={() => selectLanguage('uk')} role="option" aria-selected={language === 'uk'}>Українська <span>UK</span></button>
              <button type="button" className={`language-option${language === 'ro' ? ' active' : ''}`} onClick={() => selectLanguage('ro')} role="option" aria-selected={language === 'ro'}>Română <span>RO</span></button>
            </div>
          </div>
          <button type="button" className="mobile-toggle" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function AccountModal({ eyebrow, title, children, danger = false, onClose }: AccountModalProps) {
  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="account-modal-backdrop" onMouseDown={handleBackdropMouseDown}>
      <section className={`account-modal${danger ? ' account-modal-danger' : ''}`} role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
        <div className="account-modal-heading">
          <div>
            <span className="account-panel-label">{eyebrow}</span>
            <h2 id="account-modal-title">{title}</h2>
          </div>
          <button type="button" className="account-modal-close" onClick={onClose} aria-label="Close dialog">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="account-modal-body">{children}</div>
      </section>
    </div>
  );
}

export default function Account() {
  const { auth, flash = {} } = usePage<PageProps>().props;
  const user = auth.user;
  const initial = user.name?.trim().charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const nameForm = useForm({ name: user.name ?? '' });
  const logoutForm = useForm({});
  const deleteForm = useForm({ confirmation: '' });
  const hasOpenModal = nameModalOpen || logoutModalOpen || deleteModalOpen;

  const closeModals = () => {
    setNameModalOpen(false);
    setLogoutModalOpen(false);
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    if (!hasOpenModal) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModals();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasOpenModal]);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('ii_studio_theme', nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  const confirmLogout = () => {
    logoutForm.post('/logout');
  };

  const openNameModal = () => {
    nameForm.setData('name', user.name ?? '');
    nameForm.clearErrors();
    setNameModalOpen(true);
  };

  const closeNameModal = () => {
    nameForm.setData('name', user.name ?? '');
    nameForm.clearErrors();
    setNameModalOpen(false);
  };

  const saveName = () => {
    nameForm.patch('/account/profile', {
      preserveScroll: true,
      onSuccess: () => setNameModalOpen(false),
    });
  };

  const deleteAccount = () => {
    if (deleteForm.data.confirmation !== 'DELETE') {
      deleteForm.setError('confirmation', 'Type DELETE to confirm.');
      return;
    }

    deleteForm.delete('/account');
  };

  const openDeleteModal = () => {
    deleteForm.setData('confirmation', '');
    deleteForm.clearErrors();
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Head title="Account" />
      <AccountSiteHeader isDark={isDark} onToggleTheme={toggleTheme} onLogout={() => setLogoutModalOpen(true)} />
      <main className="account-page">
      <div className="account-shell">
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
            <dl className="account-details">
              <div><dt>Name</dt><dd>{user.name}</dd></div>
              <div><dt>Email</dt><dd>{user.email}</dd></div>
              <div><dt>Sign-in</dt><dd>Google</dd></div>
            </dl>
            <button type="button" className="account-edit-button" onClick={openNameModal}>Edit name</button>
          </article>

          {user.is_admin && (
            <article className="account-panel account-admin-panel">
              <Link href="/admin" className="account-admin-button">Admin panel</Link>
              <p className="account-admin-description">Manage the studio workspace and upcoming administrative tools from here.</p>
            </article>
          )}

          <article className="account-panel account-history-panel">
            <Link href="/account/project-briefs" className="account-admin-button">View all briefs</Link>
            <div className="account-history-content">
              <span className="account-panel-label">PROJECT HISTORY</span>
              <h2>My project briefs</h2>
              <p>Open every task you have sent to I&amp;I Studio from this account.</p>
            </div>
          </article>

          <article className="account-panel account-panel-danger">
            <span className="account-panel-label">ACCOUNT CONTROL</span>
            <h2>Leave I&amp;I Studio</h2>
            <p>Sign out on this device or permanently remove your workspace and account data.</p>
            <button type="button" className="account-delete-button" onClick={openDeleteModal}>Delete account</button>
          </article>
        </section>

        {nameModalOpen && (
          <AccountModal eyebrow="PROFILE" title="Change your name" onClose={closeNameModal}>
            <p className="account-modal-copy">Choose the name that should appear in your personal workspace.</p>
            <label className="account-field account-modal-field">
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
            <div className="account-modal-actions">
              <button type="button" className="account-modal-button account-modal-button-primary" onClick={saveName} disabled={nameForm.processing}>
                {nameForm.processing ? 'Saving…' : 'Save name'}
              </button>
              <button type="button" className="account-modal-button account-modal-button-secondary" onClick={closeNameModal}>Cancel</button>
            </div>
          </AccountModal>
        )}

        {logoutModalOpen && (
          <AccountModal eyebrow="ACCOUNT" title="Sign out?" onClose={closeModals}>
            <p className="account-modal-copy">You can sign in again with Google whenever you want to return to your workspace.</p>
            <div className="account-modal-actions">
              <button type="button" className="account-modal-button account-modal-button-danger" onClick={confirmLogout} disabled={logoutForm.processing}>
                {logoutForm.processing ? 'Signing out…' : 'Sign out'}
              </button>
              <button type="button" className="account-modal-button account-modal-button-secondary" onClick={closeModals}>Cancel</button>
            </div>
          </AccountModal>
        )}

        {deleteModalOpen && (
          <AccountModal eyebrow="ACCOUNT CONTROL" title="Delete account?" danger onClose={closeModals}>
            <p className="account-modal-copy">This permanently removes your workspace and account data. This action cannot be undone.</p>
            <label className="account-field account-modal-field">
              <span>Type DELETE to confirm</span>
              <input
                type="text"
                value={deleteForm.data.confirmation}
                onChange={(event) => deleteForm.setData('confirmation', event.target.value)}
                placeholder="DELETE"
                autoComplete="off"
                autoFocus
              />
            </label>
            {deleteForm.errors.confirmation && <small className="account-inline-error">{deleteForm.errors.confirmation}</small>}
            <div className="account-modal-actions">
              <button type="button" className="account-modal-button account-modal-button-danger" onClick={deleteAccount} disabled={deleteForm.processing}>
                {deleteForm.processing ? 'Deleting…' : 'Delete permanently'}
              </button>
              <button type="button" className="account-modal-button account-modal-button-secondary" onClick={closeModals}>Cancel</button>
            </div>
          </AccountModal>
        )}
      </div>
      </main>
    </>
  );
}
