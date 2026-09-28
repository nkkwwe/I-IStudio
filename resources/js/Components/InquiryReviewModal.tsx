import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import type { Inquiry, InquiryReview } from '../lib/inquiries';

type InquiryReviewModalProps = {
  inquiry: Inquiry;
  onClose: () => void;
  onReviewSaved: (review: InquiryReview) => void;
};

function StarShape({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5Z" />
    </svg>
  );
}

export default function InquiryReviewModal({ inquiry, onClose, onReviewSaved }: InquiryReviewModalProps) {
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const initialReview = inquiry.review;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const form = useForm({
    rating: initialReview?.rating ?? 5,
    body: initialReview?.body ?? '',
    attachment: null as File | null,
    remove_attachment: false,
  });

  useEffect(() => {
    if (!form.data.attachment) {
      setPreviewUrl(null);
      return undefined;
    }

    const url = URL.createObjectURL(form.data.attachment);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [form.data.attachment]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !form.processing) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [form.processing, onClose]);

  const displayedRating = hoverRating ?? form.data.rating;
  const ratingLabel = copy.review.ratingValue.replace('{rating}', displayedRating.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = '';
    if (!file) return;

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!acceptedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      form.setError('attachment', copy.review.imageError);
      return;
    }

    form.clearErrors('attachment');
    form.setData('attachment', file);
    form.setData('remove_attachment', false);
    setSaved(false);
  };

  const removePhoto = () => {
    form.setData('attachment', null);
    form.setData('remove_attachment', Boolean(initialReview?.attachment_url));
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSaved(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.transform((data) => ({ ...data, _method: 'PUT', body: data.body.trim() }));
    form.post(`/account/project-briefs/${inquiry.id}/review`, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setSaved(true);
        router.reload({
          only: ['inquiries'],
          onSuccess: (page) => {
            const updatedInquiry = (page.props.inquiries as Inquiry[]).find((item) => item.id === inquiry.id);
            if (updatedInquiry?.review) onReviewSaved(updatedInquiry.review);
          },
        });
      },
    });
  };

  const photoUrl = previewUrl ?? (form.data.remove_attachment ? null : initialReview?.attachment_url ?? null);

  return (
    <div
      className="inquiry-review-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !form.processing) onClose();
      }}
    >
      <section className="inquiry-review-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-review-title">
        <div className="inquiry-review-heading">
          <div className="inquiry-review-heading-mark" aria-hidden="true">
            <StarShape className="" />
          </div>
          <button type="button" className="account-modal-close" onClick={onClose} aria-label={copy.common.closeDialog} disabled={form.processing}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <span className="inquiry-review-ticket">{inquiry.ticket}</span>
        <h2 id="inquiry-review-title">{initialReview ? copy.review.editTitle : copy.review.title}</h2>
        <p className="inquiry-review-description">{copy.review.description}</p>

        <form className="inquiry-review-form" onSubmit={submit}>
          <fieldset className="inquiry-review-rating">
            <legend>{copy.review.rating}</legend>
            <div className="inquiry-review-stars" onMouseLeave={() => setHoverRating(null)}>
              {Array.from({ length: 5 }, (_, starIndex) => {
                const fill = Math.max(0, Math.min(1, displayedRating - starIndex));
                return (
                  <div className="inquiry-review-star" key={starIndex}>
                    <StarShape className="inquiry-review-star-base" />
                    <div className="inquiry-review-star-fill" style={{ width: `${fill * 100}%` }}>
                      <StarShape className="inquiry-review-star-colored" />
                    </div>
                    {[1, 2, 3, 4].map((quarter) => {
                      const rating = (starIndex * 4 + quarter) / 4;
                      return (
                        <button
                          type="button"
                          key={quarter}
                          className="inquiry-review-star-hit"
                          style={{ left: `${(quarter - 1) * 25}%` }}
                          aria-label={copy.review.ratingValue.replace('{rating}', rating.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''))}
                          aria-pressed={form.data.rating === rating}
                          disabled={rating < 1 || form.processing}
                          onMouseEnter={() => setHoverRating(rating)}
                          onFocus={() => setHoverRating(rating)}
                          onBlur={() => setHoverRating(null)}
                          onClick={() => {
                            form.setData('rating', rating);
                            form.clearErrors('rating');
                            setSaved(false);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
              <output className="inquiry-review-rating-value">{ratingLabel}</output>
            </div>
          </fieldset>
          {form.errors.rating && <span className="inquiry-review-error">{form.errors.rating}</span>}

          <label className="inquiry-review-field-label" htmlFor={`review-body-${inquiry.id}`}>{copy.review.comment}</label>
          <textarea
            id={`review-body-${inquiry.id}`}
            className="inquiry-review-textarea"
            value={form.data.body}
            onChange={(event) => {
              form.setData('body', event.target.value);
              form.clearErrors('body');
              setSaved(false);
            }}
            maxLength={5000}
            rows={5}
            placeholder={copy.review.placeholder}
            required
            disabled={form.processing}
          />
          <div className="inquiry-review-counter">{form.data.body.length} / 5000</div>
          {form.errors.body && <span className="inquiry-review-error">{form.errors.body}</span>}

          <input
            ref={fileInputRef}
            className="inquiry-review-file-input"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handlePhoto}
            aria-label={copy.review.addPhoto}
            disabled={form.processing}
          />
          {photoUrl ? (
            <div className="inquiry-review-photo-preview">
              <img src={photoUrl} alt={form.data.attachment?.name ?? initialReview?.attachment_name ?? copy.chat.imageAlt} />
              <span>{form.data.attachment?.name ?? initialReview?.attachment_name ?? copy.chat.imageAlt}</span>
              <button type="button" onClick={removePhoto} aria-label={copy.review.removePhoto} disabled={form.processing}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
          ) : (
            <button type="button" className="inquiry-review-add-photo" onClick={() => fileInputRef.current?.click()} disabled={form.processing}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
              <span>{initialReview?.attachment_url ? copy.review.replacePhoto : copy.review.addPhoto}</span>
            </button>
          )}
          {form.errors.attachment && <span className="inquiry-review-error">{form.errors.attachment || copy.review.imageError}</span>}

          {saved && <p className="inquiry-review-saved" role="status">{copy.review.saved}</p>}
          {form.errors.remove_attachment && <span className="inquiry-review-error">{form.errors.remove_attachment}</span>}

          <div className="inquiry-review-actions">
            <button type="button" className="inquiry-review-cancel" onClick={onClose} disabled={form.processing}>{copy.common.cancel}</button>
            <button type="submit" className="inquiry-review-submit" disabled={form.processing || !form.data.body.trim()}>
              {form.processing ? copy.review.saving : initialReview ? copy.review.update : copy.review.save}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
