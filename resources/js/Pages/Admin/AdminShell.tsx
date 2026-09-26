import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import { localizedUrl } from '../../content/siteLanguage';

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  created_at?: string | null;
};

type AdminPageProps = {
  auth: {
    user: {
      email: string;
    };
  };
};

type AdminShellProps = {
  title: string;
  eyebrow: string;
  heading: string;
  count: number;
  activeSection: 'briefs' | 'users';
  children: ReactNode;
};

export function getInitials(user: AdminUser): string {
  return user.name?.trim().charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
}

export default function AdminShell({ title, eyebrow, heading, count, activeSection, children }: AdminShellProps) {
  const { auth } = usePage<AdminPageProps>().props;
  const language = useSiteLanguage();
  const copy = getUiCopy(language);

  return (
    <>
      <Head title={title} />
      <main className="account-page admin-page">
        <div className="account-shell">
          <div className="admin-topbar">
            <div>
              <span className="auth-eyebrow">{copy.admin.area}</span>
              <h1>{copy.admin.workspace}</h1>
              <p>{copy.admin.accessPrefix} {auth.user.email}.</p>
            </div>
            <div className="admin-topbar-actions">
              <Link href={localizedUrl('/account')} className="admin-back-link">{copy.admin.profile}</Link>
              <Link href={localizedUrl('/')} className="admin-back-link">{copy.admin.openSite}</Link>
            </div>
          </div>

          <nav className="admin-section-nav" aria-label={copy.admin.sections}>
            <Link href="/admin/project-briefs" className={`admin-section-nav-link${activeSection === 'briefs' ? ' active' : ''}`}>
              {copy.admin.projectBriefs}
            </Link>
            <Link href="/admin/registered-users" className={`admin-section-nav-link${activeSection === 'users' ? ' active' : ''}`}>
              {copy.admin.registeredUsers}
            </Link>
          </nav>

          <section className="admin-section admin-current-section" aria-labelledby="admin-section-title">
            <div className="admin-section-heading">
              <div>
                <span className="account-panel-label">{eyebrow}</span>
                <h2 id="admin-section-title">{heading}</h2>
              </div>
              <span className="admin-section-count">{count} {copy.admin.total}</span>
            </div>
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
