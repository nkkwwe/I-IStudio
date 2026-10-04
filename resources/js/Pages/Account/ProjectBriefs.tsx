import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../../content/uiTranslations';
import { localizedUrl } from '../../content/siteLanguage';
import InquiryUnreadNotice from '../../Components/InquiryUnreadNotice';
import InquiryCancelModal from '../../Components/InquiryCancelModal';
import useInquiryUnreadPolling from '../../lib/useInquiryUnreadPolling';
import InquiryChatModal from '../../Components/InquiryChatModal';
import InquiryDetailModal from '../../Components/InquiryDetailModal';
import InquiryReviewModal from '../../Components/InquiryReviewModal';
import AccountSiteHeader from '../../Components/AccountSiteHeader';
import { formatDate, formatBudget, type Inquiry } from '../../lib/inquiries';

type PageProps = {
  inquiries: Inquiry[];
  auth: { user: { name: string; email: string } };
};

export default function AccountProjectBriefs() {
  const page = usePage<PageProps>();
  const { inquiries: initialInquiries, auth } = page.props;
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [activeChatInquiry, setActiveChatInquiry] = useState<Inquiry | null>(null);
  const [activeReviewInquiry, setActiveReviewInquiry] = useState<Inquiry | null>(null);
  const [cancelInquiry, setCancelInquiry] = useState<Inquiry | null>(null);
  const [isDark, setIsDark] = useState(false);
  const isInquiryModalOpen = Boolean(selectedInquiry || activeChatInquiry || activeReviewInquiry || cancelInquiry);
  useInquiryUnreadPolling(setInquiries, '/account/project-briefs/unread-counts');

  useEffect(() => {
    const id = Number(new URL(page.url, window.location.origin).searchParams.get('brief'));
    setSelectedInquiry(initialInquiries.find((inquiry) => inquiry.id === id) ?? null);
  }, [page.url]);

  useEffect(() => {
    if (!isInquiryModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInquiryModalOpen]);


  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('ii_studio_theme', nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  const markInquiryRead = (inquiryId: number) => {
    setInquiries((current) => current.map((inquiry) => (
      inquiry.id === inquiryId ? { ...inquiry, unread_count: 0 } : inquiry
    )));
  };

  return (
    <>
      <Head title={copy.account.myProjectBriefs} />
      <AccountSiteHeader isDark={isDark} onToggleTheme={toggleTheme} showProfile isAuthenticated userInitial={auth.user.name?.trim().charAt(0).toUpperCase() || auth.user.email.charAt(0).toUpperCase()} />
      <main className="account-page account-history-page">
        <div className="account-shell">
          <div className="account-history-topbar">
            <div>
              <span className="auth-eyebrow">{copy.account.personalWorkspace}</span>
              <h1>{copy.account.myProjectBriefs}</h1>
              <p>{copy.account.allTasks}</p>
            </div>
            <div className="account-history-actions">
              <Link href={localizedUrl('/inquiry')} className="account-admin-button">{copy.account.startNewBrief}</Link>
            </div>
          </div>

          <section className="admin-section" aria-labelledby="account-briefs-title">
            <div className="admin-section-heading">
              <div>
                <span className="account-panel-label">{copy.account.projectHistory}</span>
                <h2 id="account-briefs-title">{copy.account.submittedBriefs}</h2>
              </div>
              <span className="admin-section-count">{inquiries.length} {copy.admin.total}</span>
            </div>

            {inquiries.length === 0 ? (
              <div className="account-panel admin-empty-state">
                <strong>{copy.account.noProjectBriefs}</strong>
                <p>{copy.account.noProjectBriefsDescription}</p>
              </div>
            ) : (
              <div className="admin-inquiry-list">
                {inquiries.map((inquiry) => {
                  const metaItems: { key: string; label: string; value: string }[] = [];
                  if (inquiry.email) {
                    metaItems.push({
                      key: 'email',
                      label: (copy.account.email || 'Email').toUpperCase(),
                      value: inquiry.email,
                    });
                  }
                  if (inquiry.contact) {
                    metaItems.push({
                      key: 'contact',
                      label: (copy.admin.contact || 'Contact').toUpperCase(),
                      value: inquiry.contact,
                    });
                  }
                  if (inquiry.budget) {
                    const formattedBudget = formatBudget(inquiry.budget);
                    if (formattedBudget) {
                      metaItems.push({
                        key: 'budget',
                        label: (copy.admin.budget || 'Budget').toUpperCase(),
                        value: formattedBudget,
                      });
                    }
                  }

                  return (
                    <article
                      className="account-panel admin-inquiry-card"
                      key={inquiry.id}
                      tabIndex={0}
                      role="button"
                      onClick={() => setSelectedInquiry(inquiry)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedInquiry(inquiry);
                        }
                      }}
                    >
                      <div className="admin-inquiry-head">
                        <div>
                          <span className="admin-inquiry-ticket">{inquiry.ticket}</span>
                          <h3>{copy.services[inquiry.service_type] ?? inquiry.service_type}</h3>
                        </div>
                        <span className={`admin-status admin-status-${inquiry.status}`}>
                          <span>{copy.admin.statuses[inquiry.status] ?? inquiry.status}</span>
                        </span>
                      </div>
                      <div className="admin-inquiry-meta">
                        <div className="admin-inquiry-meta-group">
                          {metaItems.map((item, index) => (
                            <span key={item.key} className="admin-inquiry-meta-item">
                              {index > 0 && <span className="admin-inquiry-meta-divider" aria-hidden="true">|</span>}
                              <b className="admin-inquiry-meta-label">{item.label}:</b>
                              <span className="admin-inquiry-meta-value">{item.value}</span>
                            </span>
                          ))}
                        </div>
                        <div className="inquiry-card-updates">
                          <InquiryUnreadNotice count={inquiry.unread_count} />
                          <span className="admin-inquiry-date">{formatDate(inquiry.created_at, language)}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
            {isInquiryModalOpen && (
              <div
                className="inquiry-modal-backdrop"
                role="presentation"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget && !cancelInquiry) {
                    setSelectedInquiry(null);
                    setActiveChatInquiry(null);
                    setActiveReviewInquiry(null);
                  }
                }}
              >
                {selectedInquiry && (
                  <InquiryDetailModal
                    inquiry={inquiries.find((inquiry) => inquiry.id === selectedInquiry.id) ?? selectedInquiry}
                    currentRole="user"
                    onClose={() => setSelectedInquiry(null)}
                    onCancel={() => {
                      setCancelInquiry(selectedInquiry);
                      setSelectedInquiry(null);
                    }}
                    onOpenChat={() => {
                      const inq = selectedInquiry;
                      setSelectedInquiry(null);
                      setActiveChatInquiry(inq);
                    }}
                    onOpenReview={() => {
                      setActiveReviewInquiry(selectedInquiry);
                      setSelectedInquiry(null);
                    }}
                  />
                )}
                {activeChatInquiry && (
                  <InquiryChatModal
                    key={activeChatInquiry.id}
                    inquiryId={activeChatInquiry.id}
                    ticket={activeChatInquiry.ticket}
                    title={copy.services[activeChatInquiry.service_type] ?? activeChatInquiry.service_type}
                    endpoint={`/account/project-briefs/${activeChatInquiry.id}/messages`}
                    currentRole="user"
                    onRead={() => markInquiryRead(activeChatInquiry.id)}
                    onClose={() => { setActiveChatInquiry(null); setSelectedInquiry(activeChatInquiry); }}
                  />
                )}
                {activeReviewInquiry && (
                  <InquiryReviewModal
                    inquiry={activeReviewInquiry}
                    embedded
                    onClose={() => { setActiveReviewInquiry(null); setSelectedInquiry(activeReviewInquiry); }}
                    onReviewSaved={(review) => {
                      setInquiries((current) => current.map((inquiry) => (
                        inquiry.id === activeReviewInquiry.id ? { ...inquiry, review } : inquiry
                      )));
                      setActiveReviewInquiry((current) => current ? { ...current, review } : null);
                    }}
                  />
                )}
                {cancelInquiry && (
                  <InquiryCancelModal inquiry={cancelInquiry}
                    onClose={() => { setSelectedInquiry(cancelInquiry); setCancelInquiry(null); }}
                    onCancelled={() => { setCancelInquiry(null); setSelectedInquiry(null); }} />
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
