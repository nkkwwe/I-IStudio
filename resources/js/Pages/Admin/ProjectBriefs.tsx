import AdminShell, { formatDate, serviceLabels, type Inquiry } from './AdminShell';
import { usePage } from '@inertiajs/react';

type PageProps = {
  inquiries: Inquiry[];
};

export default function ProjectBriefs() {
  const { inquiries } = usePage<PageProps>().props;

  return (
    <AdminShell
      title="Project briefs"
      eyebrow="WORK QUEUE"
      heading="Project briefs"
      count={inquiries.length}
      activeSection="briefs"
    >
      {inquiries.length === 0 ? (
        <div className="account-panel admin-empty-state">
          <strong>No project briefs yet</strong>
          <p>New tasks sent through the project form will appear here.</p>
        </div>
      ) : (
        <div className="admin-inquiry-list">
          {inquiries.map((inquiry) => (
            <article className="account-panel admin-inquiry-card" key={inquiry.id}>
              <div className="admin-inquiry-head">
                <div>
                  <span className="admin-inquiry-ticket">{inquiry.ticket}</span>
                  <h3>{serviceLabels[inquiry.service_type] ?? inquiry.service_type}</h3>
                </div>
                <span className={`admin-status admin-status-${inquiry.status}`}>{inquiry.status}</span>
              </div>
              <div className="admin-inquiry-meta">
                <span><strong>{inquiry.name}</strong> · {inquiry.email}</span>
                <span>{formatDate(inquiry.created_at)}</span>
              </div>
              <p className="admin-inquiry-comment">{inquiry.comment}</p>
              {(inquiry.contact || inquiry.budget) && (
                <div className="admin-inquiry-details">
                  {inquiry.contact && <span><b>Contact</b>{inquiry.contact}</span>}
                  {inquiry.budget && <span><b>Budget</b>{inquiry.budget}</span>}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
