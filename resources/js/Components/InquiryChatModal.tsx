import { useForm } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { getSiteLanguage, getUiCopy } from '../content/uiTranslations';

type ChatMessage = {
  id: number;
  sender_role: string;
  sender_name: string;
  body: string;
  created_at?: string | null;
  attachment_url?: string | null;
  attachment_name?: string | null;
};

type InquiryChatModalProps = {
  inquiryId: number;
  ticket: string;
  title: string;
  endpoint: string;
  currentRole: 'admin' | 'user';
  onClose: () => void;
};

function formatMessageTime(value?: string | null): string {
  if (!value) return '';

  const locale = {
    en: 'en-GB',
    uk: 'uk-UA',
    ro: 'ro-RO',
  }[getSiteLanguage()];

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function InquiryChatModal({ inquiryId, ticket, title, endpoint, currentRole, onClose }: InquiryChatModalProps) {
  const copy = getUiCopy();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [attachmentError, setAttachmentError] = useState('');
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const form = useForm<{ body: string; attachment: File | null }>({ body: '', attachment: null });

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const loadMessages = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setLoadError('');

    try {
      const response = await fetch(endpoint, {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) throw new Error('Unable to load chat');

      const payload = await response.json() as { messages?: ChatMessage[] };
      setMessages(payload.messages ?? []);
    } catch {
      setLoadError(copy.chat.loadError);
    } finally {
      setLoading(false);
    }
  }, [copy.chat.loadError, endpoint]);

  useEffect(() => {
    void loadMessages();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };

    document.addEventListener('keydown', handleEscape);
    const refreshTimer = window.setInterval(() => void loadMessages(false), 5000);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
      window.clearInterval(refreshTimer);
    };
  }, [loadMessages]);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, loading]);

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ((!form.data.body.trim() && !form.data.attachment) || form.processing) return;

    form.post(endpoint, {
      forceFormData: true,
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setSelectedImage(null);
        setAttachmentError('');
        if (attachmentInputRef.current) attachmentInputRef.current.value = '';
        form.reset();
        void loadMessages();
      },
    });
  };

  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    setAttachmentError('');

    if (!file) return;

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!acceptedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setSelectedImage(null);
      form.setData('attachment', null);
      setAttachmentError(copy.chat.imageError);
      event.currentTarget.value = '';
      return;
    }

    setSelectedImage(file);
    form.setData('attachment', file);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    form.setData('attachment', null);
    setAttachmentError('');
    if (attachmentInputRef.current) attachmentInputRef.current.value = '';
  };

  return (
    <div
      className="inquiry-chat-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="inquiry-chat-modal" role="dialog" aria-modal="true" aria-labelledby={`inquiry-chat-title-${inquiryId}`}>
        <header className="inquiry-chat-header">
          <div>
            <span className="inquiry-chat-ticket">{ticket}</span>
            <h2 id={`inquiry-chat-title-${inquiryId}`}>{copy.chat.title}</h2>
            <p>{title}</p>
          </div>
          <button type="button" className="inquiry-chat-close" onClick={onClose} aria-label={copy.chat.close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="inquiry-chat-messages" ref={messagesRef} aria-live="polite">
          {loading ? (
            <p className="inquiry-chat-state">{copy.chat.loading}</p>
          ) : loadError ? (
            <p className="inquiry-chat-state inquiry-chat-error">{loadError}</p>
          ) : messages.length === 0 ? (
            <p className="inquiry-chat-state">{copy.chat.empty}</p>
          ) : (
            messages.map((message) => {
              const isOwn = message.sender_role === currentRole;

              return (
                <div className={`inquiry-chat-message${isOwn ? ' is-own' : ''}`} key={message.id}>
                  <div className="inquiry-chat-bubble">
                    <div className="inquiry-chat-message-meta">
                      <strong>{message.sender_role === 'admin' ? copy.chat.studio : message.sender_name}</strong>
                      <span>{formatMessageTime(message.created_at)}</span>
                    </div>
                    {message.attachment_url && (
                      <a className="inquiry-chat-image-link" href={message.attachment_url} target="_blank" rel="noreferrer">
                        <img src={message.attachment_url} alt={message.attachment_name || copy.chat.imageAlt} />
                      </a>
                    )}
                    {message.body && <p>{message.body}</p>}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form className="inquiry-chat-composer" onSubmit={submitMessage}>
          {selectedImage && previewUrl && (
            <div className="inquiry-chat-attachment-preview">
              <img src={previewUrl} alt={selectedImage.name} />
              <div>
                <strong>{selectedImage.name}</strong>
                <small>{Math.ceil(selectedImage.size / 1024)} KB</small>
              </div>
              <button type="button" onClick={removeSelectedImage} aria-label={copy.chat.removeImage}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          )}
          <div className="inquiry-chat-composer-row">
            <label className="inquiry-chat-attach" htmlFor={'inquiry-chat-attachment-' + inquiryId}>
              <input
                ref={attachmentInputRef}
                id={'inquiry-chat-attachment-' + inquiryId}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={selectImage}
                disabled={form.processing}
              />
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-4.5-4.5L7 20" />
              </svg>
              <span>{copy.chat.addImage}</span>
            </label>
            <textarea
              value={form.data.body}
              onChange={(event) => form.setData('body', event.target.value)}
              placeholder={copy.chat.placeholder}
              rows={1}
              maxLength={5000}
              aria-label={copy.chat.placeholder}
              disabled={form.processing}
            />
            <button type="submit" className="inquiry-chat-send" disabled={form.processing || (!form.data.body.trim() && !form.data.attachment)}>
              <span>{copy.chat.send}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
          {(attachmentError || form.errors.attachment || form.errors.body) && (
            <span className="inquiry-chat-form-error">{attachmentError || form.errors.attachment || form.errors.body}</span>
          )}
        </form>
      </section>
    </div>
  );
}
