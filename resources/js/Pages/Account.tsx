import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import { localizedUrl } from '../content/siteLanguage';
import ChatUnreadBadge, { useChatUnreadCount } from '../Components/ChatUnreadBadge';
import AccountSiteHeader from '../Components/AccountSiteHeader';
import AccountModal from '../Components/AccountModal';

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  created_at?: string;
  is_admin: boolean;
};

type PageProps = {
  auth: {
    user: User;
    unread_chat_count?: number;
  };
  inquiries?: AccountBrief[];
  flash?: { profile_updated?: boolean };
};

type AccountBrief = {
  id: number;
  ticket: string;
  service_type: string;
  status: string;
  created_at?: string | null;
};

export default function Account() {
  const { auth, flash = {}, inquiries = [] } = usePage<PageProps>().props;
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const common = copy.common;
  const accountCopy = copy.account;
  const user = auth.user;
  const submittedBriefs = inquiries.slice(0, 3);
  const unreadChatCount = useChatUnreadCount(auth.unread_chat_count ?? 0);
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
    logoutForm.post(localizedUrl('/logout'));
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
    nameForm.patch(localizedUrl('/account/profile'), {
      preserveScroll: true,
      onSuccess: () => setNameModalOpen(false),
    });
  };

  const deleteAccount = () => {
    if (deleteForm.data.confirmation !== 'DELETE') {
      deleteForm.setError('confirmation', accountCopy.deleteConfirmationError);
      return;
    }

    deleteForm.delete(localizedUrl('/account'));
  };

  const openDeleteModal = () => {
    deleteForm.setData('confirmation', '');
    deleteForm.clearErrors();
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Head title={accountCopy.pageTitle} />
      <div className="account-dashboard-layout">
      <AccountSiteHeader isDark={isDark} onToggleTheme={toggleTheme} onLogout={() => setLogoutModalOpen(true)} />
      <main className="account-page account-dashboard-page">
      <div className="account-shell">
        <section className="account-hero account-dashboard-hero">
          <div className="account-avatar">{user.avatar ? <img src={user.avatar} alt="" /> : initial}</div>
          <div>
            <span className="auth-eyebrow">{accountCopy.personalWorkspace}</span>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </section>

        {flash.profile_updated && <div className="account-flash">{accountCopy.profileUpdated}</div>}

        <section className="account-grid account-dashboard-grid">
          <article className="account-panel account-dashboard-briefs">
            <div className="account-dashboard-heading">
              <div>
                <span className="account-panel-label">{accountCopy.projectHistory}</span>
                <h2>{accountCopy.myProjectBriefs}</h2>
              </div>
              <Link href={localizedUrl('/inquiry')} className="btn btn-primary account-dashboard-new">{accountCopy.startNewBrief}</Link>
            </div>
            {submittedBriefs.length > 0 ? (
              <div className="account-brief-status-list" aria-label={accountCopy.submittedBriefs}>
                {submittedBriefs.map((brief) => (
                  <Link className="account-brief-status-row" key={brief.id} href={`${localizedUrl('/account/project-briefs')}?brief=${brief.id}`}>
                    <div>
                      <span className="account-brief-ticket">{brief.ticket}</span>
                      <strong>{copy.services[brief.service_type] ?? brief.service_type}</strong>
                    </div>
                    <span className={`account-brief-status account-brief-status-${brief.status}`}>{copy.admin.statuses[brief.status] ?? brief.status}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="account-dashboard-empty">
                <strong>{accountCopy.noProjectBriefs}</strong>
                <p>{accountCopy.noProjectBriefsDescription}</p>
              </div>
            )}
            <Link href={localizedUrl('/account/project-briefs')} className="btn btn-secondary account-dashboard-all">
              <span>{accountCopy.viewAllBriefs}</span>
              <ChatUnreadBadge count={unreadChatCount} />
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </Link>
          </article>

          <article className="account-panel account-dashboard-profile">
            <div className="account-dashboard-profile-head">
              <div>
                <span className="account-panel-label">{accountCopy.accountLabel}</span>
                <h2>{accountCopy.profileTitle}</h2>
              </div>
              <button type="button" className="btn btn-secondary btn-sm" onClick={openNameModal}>{accountCopy.editName}</button>
            </div>
            <dl className="account-details">
              <div><dt>{accountCopy.name}</dt><dd>{user.name}</dd></div>
              <div><dt>{accountCopy.email}</dt><dd>{user.email}</dd></div>
              <div><dt>{accountCopy.signIn}</dt><dd>{accountCopy.google}</dd></div>
            </dl>
            <div className="account-dashboard-settings">
              <span className="account-panel-label">{accountCopy.accountControl}</span>
              <button type="button" className="account-delete-button" onClick={openDeleteModal}>{common.deleteAccount}</button>
            </div>
          </article>

          {user.is_admin && (
            <article className="account-panel account-action-card account-dashboard-admin">
              <Link href="/admin" className="account-action-card-link">
                <div className="account-action-card-content">
                  <h2>{accountCopy.adminPanel}</h2>
                  <p>{accountCopy.adminPanelDescription}</p>
                </div>
                <span className="account-action-card-arrow" aria-hidden="true">→</span>
              </Link>
            </article>
          )}

        </section>

        {nameModalOpen && (
          <AccountModal eyebrow={accountCopy.profileLabel} title={accountCopy.changeName} closeLabel={common.closeDialog} compact onClose={closeNameModal}>
            <p className="account-modal-copy">{accountCopy.changeNameDescription}</p>
            <label className="account-field account-modal-field">
              <span>{accountCopy.name}</span>
              <input
                type="text"
                value={nameForm.data.name}
                onChange={(event) => nameForm.setData('name', event.target.value)}
                autoComplete="name"
              />
            </label>
            {nameForm.errors.name && <small className="account-inline-error">{nameForm.errors.name}</small>}
            <div className="account-modal-actions">
              <button type="button" className="account-modal-button account-modal-button-primary" onClick={saveName} disabled={nameForm.processing}>
                {nameForm.processing ? common.saving : common.saveName}
              </button>
            </div>
          </AccountModal>
        )}

        {logoutModalOpen && (
          <AccountModal eyebrow={accountCopy.accountLabel} title={accountCopy.signOutTitle} closeLabel={common.closeDialog} danger compact onClose={closeModals}>
            <p className="account-modal-copy">{accountCopy.signOutDescription}</p>
            <div className="account-modal-actions">
              <button type="button" className="account-modal-button account-modal-button-danger" onClick={confirmLogout} disabled={logoutForm.processing}>
                {logoutForm.processing ? accountCopy.signingOut : common.signOut}
              </button>
            </div>
          </AccountModal>
        )}

        {deleteModalOpen && (
          <AccountModal eyebrow={accountCopy.accountControl} title={accountCopy.deleteTitle} closeLabel={common.closeDialog} danger compact onClose={closeModals}>
            <p className="account-modal-copy">{accountCopy.deleteDescription}</p>
            <label className="account-field account-modal-field">
              <span>{accountCopy.deleteConfirmationLabel}</span>
              <input
                type="text"
                value={deleteForm.data.confirmation}
                onChange={(event) => deleteForm.setData('confirmation', event.target.value)}
                placeholder={accountCopy.deleteConfirmationPlaceholder}
                autoComplete="off"
              />
            </label>
            {deleteForm.errors.confirmation && <small className="account-inline-error">{deleteForm.errors.confirmation}</small>}
            <div className="account-modal-actions">
              <button type="button" className="account-modal-button account-modal-button-danger" onClick={deleteAccount} disabled={deleteForm.processing}>
                {deleteForm.processing ? common.deleting : common.deletePermanently}
              </button>
            </div>
          </AccountModal>
        )}
      </div>
      </main>
      </div>
    </>
  );
}
