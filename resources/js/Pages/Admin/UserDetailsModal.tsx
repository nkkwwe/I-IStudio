import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AccountModal from '../../Components/AccountModal';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import { formatBudget, formatDate, type Inquiry } from '../../lib/inquiries';
import { getInitials, type AdminUser } from './AdminShell';
import { getAdminCopy } from './adminCopy';

type UserDetails = AdminUser & {
  updated_at: string | null;
  email_verified_at: string | null;
  is_admin: boolean;
  login_method: string;
  inquiries: Inquiry[];
};

export default function UserDetailsModal({ user, onClose }: { user: AdminUser; onClose: () => void }) {
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const text = getAdminCopy(language);
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    setDetails(null);
    setError(false);
    fetch(`/admin/registered-users/${user.id}`, { headers: { Accept: 'application/json' }, signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('User details unavailable'); return response.json(); })
      .then(setDetails)
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [user.id, attempt]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = content.current?.closest('[role="dialog"]');
    dialog?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab' || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); previousFocus?.focus(); };
  }, [user.id, onClose]);

  const field = (label: string, value: string) => <div className="inquiry-detail-meta-item" key={label}><dt className="inquiry-detail-meta-label">{label}</dt><dd className="inquiry-detail-meta-value">{value}</dd></div>;
  return <AccountModal eyebrow={text.profile} title={user.name || copy.admin.unnamedUser} closeLabel={text.close} onClose={onClose}>
    <div ref={content} className="admin-user-details">
      <span className="admin-user-avatar">{user.avatar ? <img src={user.avatar} alt="" /> : getInitials(user)}</span>
      <dl className="inquiry-detail-meta-grid">
        {field('ID', String(user.id))}
        {field(copy.account.email, user.email)}
        {field(copy.admin.registered, formatDate(user.created_at, language))}
        {details && <>
          {field(text.updated, formatDate(details.updated_at, language))}
          {field(text.verified, details.email_verified_at ? formatDate(details.email_verified_at, language) : text.no)}
          {field(text.role, details.is_admin ? text.admin : text.user)}
          {field(text.login, details.login_method)}
        </>}
      </dl>
      {!details && !error && <p role="status">{text.loading}</p>}
      {error && <div role="alert"><p>{text.error}</p><button className="btn btn-secondary btn-sm" onClick={() => setAttempt((value) => value + 1)}>{text.retry}</button></div>}
      {details && <>
        <h3>{copy.admin.projectBriefs} · {details.inquiries.length}</h3>
        {details.inquiries.length === 0 && <p>{copy.admin.noProjectBriefs}</p>}
        <div className="admin-inquiry-list">{details.inquiries.map((inquiry) => <article className="admin-user-brief" key={inquiry.id}>
          <Link href={`/admin/project-briefs?brief=${inquiry.id}`} className="admin-user-brief-link">
            <span><small className="admin-inquiry-ticket">{inquiry.ticket}</small><strong>{copy.services[inquiry.service_type] ?? inquiry.service_type}</strong></span>
            <span className={`admin-status admin-status-${inquiry.status}`}>{copy.admin.statuses[inquiry.status] ?? inquiry.status}</span>
          </Link>
          <p>{formatDate(inquiry.created_at, language)} · {inquiry.name} · {inquiry.email}</p>
          {inquiry.contact && <p>{copy.admin.contact}: {inquiry.contact}</p>}
          {inquiry.budget && <p>{copy.admin.budget}: {formatBudget(inquiry.budget)}</p>}
          {inquiry.comment && <p>{inquiry.comment}</p>}
          {inquiry.review ? <div className="admin-user-review">
            <strong>{text.review} · {inquiry.review.rating} / 5</strong>
            <p>{inquiry.review.body}</p>
            {inquiry.review.attachments.map((attachment) => <a className="admin-back-link" href={attachment.url} key={attachment.id} target="_blank" rel="noopener noreferrer">{attachment.name}</a>)}
          </div> : <p>{text.noReview}</p>}
        </article>)}</div>
      </>}
    </div>
  </AccountModal>;
}
