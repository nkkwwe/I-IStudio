import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminShell, { formatDate, inquiryStatusOptions, serviceLabels, type Inquiry } from './AdminShell';

type PageProps = {
  inquiries: Inquiry[];
};

export default function ProjectBriefs() {
  const { inquiries } = usePage<PageProps>().props;
  const [updatingInquiryId, setUpdatingInquiryId] = useState<number | null>(null);

  const updateStatus = (inquiry: Inquiry, status: string) => {
    setUpdatingInquiryId(inquiry.id);
    router.patch(`/admin/project-briefs/${inquiry.id}/status`, { status }, {
      preserveScroll: true,
      onFinish: () => setUpdatingInquiryId(null),
    });
  };

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
                <select
                  className={`admin-status-select admin-status-${inquiry.status}`}
                  value={inquiry.status}
                  onChange={(event) => updateStatus(inquiry, event.target.value)}
                  disabled={updatingInquiryId === inquiry.id}
                  aria-label={`Status for ${inquiry.ticket}`}
                >
                  {inquiryStatusOptions.map((option) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                  ))}
                </select>
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
