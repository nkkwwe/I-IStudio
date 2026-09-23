import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { getUiCopy, useSiteLanguage, type SiteLanguage } from '../../content/uiTranslations';
import { localizedUrl } from '../../content/siteLanguage';

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  created_at?: string | null;
};

export type Inquiry = {
  id: number;
  ticket: string;
  name: string;
  email: string;
  contact?: string | null;
  budget?: string | null;
  service_type: string;
  comment: string;
  status: string;
  created_at?: string | null;
  unread_count?: number;
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

export function formatDate(value?: string | null, language: SiteLanguage = 'en'): string {
  if (!value) return '—';

  const locale = language === 'uk' ? 'uk-UA' : language === 'ro' ? 'ro-RO' : 'en-GB';

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatBudget(value?: string | null): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';

  const clean = trimmed.replace(/\s+/g, '');
  const match = clean.match(/^(\$?)([0-9]+(?:\.[0-9]+)?)(\$?)$/);
  if (match) {
    const rawNum = match[2];
    const parts = rawNum.split('.');
    const intFormatted = Number(parts[0]).toLocaleString('en-US');
    return parts.length > 1 ? `$${intFormatted}.${parts[1]}` : `$${intFormatted}`;
  }

  // Already formatted like $10,000 or $10,000.00
  if (/^\$[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)?$/.test(trimmed)) {
    return trimmed;
  }

  // If ends with $, e.g. "10000$" or "10 000$"
  if (trimmed.endsWith('$')) {
    const without = trimmed.slice(0, -1).trim().replace(/\s+/g, '');
    const num = Number(without);
    if (!isNaN(num)) {
      return `$${num.toLocaleString('en-US')}`;
    }
  }

  // If starts with $, e.g. "$10000"
  if (trimmed.startsWith('$')) {
    const without = trimmed.slice(1).trim().replace(/\s+/g, '');
    const num = Number(without);
    if (!isNaN(num)) {
      return `$${num.toLocaleString('en-US')}`;
    }
  }

  // Range like 5000-10000 or 5000-10000$
  const rangeMatch = clean.replace(/\$/g, '').match(/^([0-9]+)[-–—]([0-9]+)$/);
  if (rangeMatch) {
    const n1 = Number(rangeMatch[1]);
    const n2 = Number(rangeMatch[2]);
    if (!isNaN(n1) && !isNaN(n2)) {
      return `$${n1.toLocaleString('en-US')} – $${n2.toLocaleString('en-US')}`;
    }
  }

  return trimmed;
}

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
