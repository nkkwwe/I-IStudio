import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

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

export const serviceLabels: Record<string, string> = {
  landing: 'Landing Page',
  corporate: 'Business Website',
  redesign: 'Website Redesign',
  ads: 'Advertising',
  consultation: 'Consultation',
  other: 'Other',
};

export function formatDate(value?: string | null): string {
  if (!value) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function getInitials(user: AdminUser): string {
  return user.name?.trim().charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
}

export default function AdminShell({ title, eyebrow, heading, count, activeSection, children }: AdminShellProps) {
  const { auth } = usePage<AdminPageProps>().props;

  return (
    <>
      <Head title={title} />
      <main className="account-page admin-page">
        <div className="account-shell">
          <div className="admin-topbar">
            <div>
              <span className="auth-eyebrow">ADMIN AREA</span>
              <h1>Workspace control</h1>
              <p>Admin access is active for {auth.user.email}.</p>
            </div>
            <div className="admin-topbar-actions">
              <Link href="/account" className="admin-back-link">Profile</Link>
              <Link href="/" className="admin-back-link">Open site</Link>
            </div>
          </div>

          <nav className="admin-section-nav" aria-label="Admin sections">
            <Link href="/admin/project-briefs" className={`admin-section-nav-link${activeSection === 'briefs' ? ' active' : ''}`}>
              Project briefs
            </Link>
            <Link href="/admin/registered-users" className={`admin-section-nav-link${activeSection === 'users' ? ' active' : ''}`}>
              Registered users
            </Link>
          </nav>

          <section className="admin-section admin-current-section" aria-labelledby="admin-section-title">
            <div className="admin-section-heading">
              <div>
                <span className="account-panel-label">{eyebrow}</span>
                <h2 id="admin-section-title">{heading}</h2>
              </div>
              <span className="admin-section-count">{count} total</span>
            </div>
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
