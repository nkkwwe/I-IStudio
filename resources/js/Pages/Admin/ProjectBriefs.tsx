import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { getUiCopy } from '../../content/uiTranslations';
import AdminShell, { formatDate, type Inquiry } from './AdminShell';
import AdminStatusSelect from './AdminStatusSelect';

type PageProps = {
  inquiries: Inquiry[];
};

export default function ProjectBriefs() {
  const { inquiries } = usePage<PageProps>().props;
  const [updatingInquiryId, setUpdatingInquiryId] = useState<number | null>(null);
  const copy = getUiCopy();

  const updateStatus = (inquiry: Inquiry, status: string) => {
    setUpdatingInquiryId(inquiry.id);
    router.patch(`/admin/project-briefs/${inquiry.id}/status`, { status }, {
      preserveScroll: true,
      onFinish: () => setUpdatingInquiryId(null),
    });
  };

  return (
    <AdminShell
      title={copy.admin.projectBriefs}
      eyebrow={copy.admin.workQueue}
      heading={copy.admin.projectBriefs}
      count={inquiries.length}
      activeSection="briefs"
    >
      {inquiries.length === 0 ? (
        <div className="account-panel admin-empty-state">
          <strong>{copy.admin.noProjectBriefs}</strong>
          <p>{copy.admin.newTasks}</p>
        </div>
      ) : (
        <div className="admin-inquiry-list">
          {inquiries.map((inquiry) => (
            <article className="account-panel admin-inquiry-card" key={inquiry.id}>
              <div className="admin-inquiry-head">
                <div>
                  <span className="admin-inquiry-ticket">{inquiry.ticket}</span>
                  <h3>{copy.services[inquiry.service_type] ?? inquiry.service_type}</h3>
                </div>
                <AdminStatusSelect
                  value={inquiry.status}
                  options={Object.entries(copy.admin.statuses).map(([value, label]) => ({ value, label }))}
                  onChange={(status) => updateStatus(inquiry, status)}
                  disabled={updatingInquiryId === inquiry.id}
                  ariaLabel={`${copy.admin.projectBriefs}: ${inquiry.ticket}`}
                />
              </div>
              <div className="admin-inquiry-meta">
                <span><strong>{inquiry.name}</strong> · {inquiry.email}</span>
                <span>{formatDate(inquiry.created_at)}</span>
              </div>
              <p className="admin-inquiry-comment">{inquiry.comment}</p>
              {(inquiry.contact || inquiry.budget) && (
                <div className="admin-inquiry-details">
                  {inquiry.contact && <span><b>{copy.admin.contact}</b>{inquiry.contact}</span>}
                  {inquiry.budget && <span><b>{copy.admin.budget}</b>{inquiry.budget}</span>}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
