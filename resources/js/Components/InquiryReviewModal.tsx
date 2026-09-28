import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import type { Inquiry, InquiryReview } from '../lib/inquiries';

type InquiryReviewModalProps = {
  inquiry: Inquiry;
  embedded?: boolean;
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

export default function InquiryReviewModal({ inquiry, embedded = false, onClose, onReviewSaved }: InquiryReviewModalProps) {
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const initialReview = inquiry.review;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newPhotoPreviews, setNewPhotoPreviews] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const form = useForm({
    rating: initialReview?.rating ?? 5,
    body: initialReview?.body ?? '',
    attachment_ids: initialReview?.attachments.map((attachment) => attachment.id) ?? [],
    attachment_ids_json: '[]',
    attachments: [] as File[],
  });

  useEffect(() => {
    const urls = form.data.attachments.map((file) => URL.createObjectURL(file));
    setNewPhotoPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [form.data.attachments]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !form.processing) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [form.processing, onClose]);

  const displayedRating = hoverRating ?? form.data.rating;
  const formattedRating = displayedRating.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  const ratingLabel = copy.review.ratingValue.replace('{rating}', formattedRating);
  const keptPhotos = initialReview?.attachments.filter((attachment) => form.data.attachment_ids.includes(attachment.id)) ?? [];
  const photoCount = keptPhotos.length + form.data.attachments.length;

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (files.length === 0) return;

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (files.some((file) => !acceptedTypes.includes(file.type) || file.size > 5 * 1024 * 1024)) {
      form.setError('attachments', copy.review.imageError);
      return;
    }

    const available = 6 - photoCount;
    if (files.length > available) {
      form.setError('attachments', copy.review.photoLimitError);
      if (available <= 0) return;
    } else {
      form.clearErrors('attachments');
    }

    form.setData('attachments', [...form.data.attachments, ...files.slice(0, available)]);
    setSaved(false);
  };

  const removeSavedPhoto = (id: number) => {
    form.setData('attachment_ids', form.data.attachment_ids.filter((attachmentId) => attachmentId !== id));
    form.clearErrors('attachments');
    setSaved(false);
  };

  const removeNewPhoto = (index: number) => {
    form.setData('attachments', form.data.attachments.filter((_, fileIndex) => fileIndex !== index));
    form.clearErrors('attachments');
    setSaved(false);
  };

  const photoCards = [
    ...keptPhotos.map((attachment) => ({
      key: `saved-${attachment.id}`,
      url: attachment.url,
      name: attachment.name,
      onRemove: () => removeSavedPhoto(attachment.id),
    })),
    ...form.data.attachments.map((file, index) => ({
      key: `new-${index}-${file.name}`,
      url: newPhotoPreviews[index] ?? '',
      name: file.name,
      onRemove: () => removeNewPhoto(index),
    })),
  ];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.transform(({ attachment_ids, ...data }) => ({
      ...data,
      _method: 'PUT',
      body: data.body.trim(),
      attachment_ids_json: JSON.stringify(attachment_ids),
    }));
    form.post(`/account/project-briefs/${inquiry.id}/review`, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setSaved(true);
        router.reload({
          only: ['inquiries'],
          onSuccess: (page) => {
            const updatedInquiry = (page.props.inquiries as Inquiry[]).find((item) => item.id === inquiry.id);
            if (updatedInquiry?.review) {
              form.setData('attachment_ids', updatedInquiry.review.attachments.map((attachment) => attachment.id));
              form.setData('attachments', []);
              form.clearErrors('attachments');
              onReviewSaved(updatedInquiry.review);
            }
          },
        });
      },
    });
  };

  return (
    <div
      className={`inquiry-review-backdrop${embedded ? ' is-embedded' : ''}`}
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
            <div className={`inquiry-review-stars${hoverRating !== null ? ' is-preview' : ''}`} onMouseLeave={() => setHoverRating(null)}>
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
                          onPointerEnter={(event) => {
                            if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                              setHoverRating(rating);
                            }
                          }}
                          onFocus={(event) => {
                            if (event.currentTarget.matches(':focus-visible')) setHoverRating(rating);
                          }}
                          onBlur={() => setHoverRating(null)}
                          onClick={() => {
                            form.setData('rating', rating);
                            form.clearErrors('rating');
                            setHoverRating(null);
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
            multiple
            onChange={handlePhoto}
            aria-label={copy.review.addPhoto}
            disabled={form.processing}
          />
          <div className="inquiry-review-photos" aria-label={copy.review.photoCount.replace('{count}', String(photoCount))}>
            {photoCards.map((photo) => (
              <div className="inquiry-review-photo-card" key={photo.key}>
                {photo.url && <img src={photo.url} alt={photo.name || copy.chat.imageAlt} />}
                <span title={photo.name}>{photo.name || copy.chat.imageAlt}</span>
                <button type="button" onClick={photo.onRemove} aria-label={`${copy.review.removePhoto}: ${photo.name}`} disabled={form.processing}>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </div>
            ))}
          </div>
          <div className="inquiry-review-photo-actions">
            <button type="button" className="inquiry-review-add-photo" onClick={() => fileInputRef.current?.click()} disabled={form.processing || photoCount >= 6}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
              <span>{copy.review.addPhoto}</span>
            </button>
            <span className="inquiry-review-photo-count">{copy.review.photoCount.replace('{count}', String(photoCount))}</span>
          </div>
          {(form.errors.attachments || form.errors.attachment_ids_json) && (
            <span className="inquiry-review-error">{form.errors.attachments || form.errors.attachment_ids_json}</span>
          )}

          {saved && <p className="inquiry-review-saved" role="status">{copy.review.saved}</p>}

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
