import { useForm } from '@inertiajs/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { getSiteLanguage, getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import { useInquiryChatActivity } from '../lib/useInquiryChatActivity';

type ChatMessage = {
  id: number;
  sender_role: string;
  sender_name: string;
  body: string;
  created_at?: string | null;
  read_at?: string | null;
  attachments?: ImagePreview[];
  attachment_url?: string | null;
  attachment_name?: string | null;
};

type InquiryChatModalProps = {
  inquiryId: number;
  ticket: string;
  title: string;
  endpoint: string;
  currentRole: 'admin' | 'user';
  clientName?: string;
  onClose: () => void;
  onRead?: () => void;
};

type ImagePreview = {
  url: string;
  name: string;
};

function formatMessageTime(value?: string | null): string {
  if (!value) return '';

  const locale = {
    en: 'en-GB',
    uk: 'uk-UA',
    ro: 'ro-RO',
  }[getSiteLanguage()];

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));
}

function dayKey(value?: string | null): string {
  const date = value ? new Date(value) : new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function formatDay(value: string | null | undefined, copy: ReturnType<typeof getUiCopy>['chat']): string {
  const date = value ? new Date(value) : new Date();
  const today = new Date();
  const calendarDay = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round((calendarDay(today) - calendarDay(date)) / 86400000);
  if (days === 0) return copy.today;
  if (days === 1) return copy.yesterday;
  if (days === 2) return copy.dayBeforeYesterday;
  return new Intl.DateTimeFormat({ en: 'en-GB', uk: 'uk-UA', ro: 'ro-RO' }[getSiteLanguage()], {
    day: 'numeric', month: 'long', ...(date.getFullYear() !== today.getFullYear() ? { year: 'numeric' as const } : {}),
  }).format(date);
}

export default function InquiryChatModal({ inquiryId, ticket, title, endpoint, currentRole, clientName, onClose, onRead }: InquiryChatModalProps) {
  const copy = getUiCopy(useSiteLanguage());
  const activity = useInquiryChatActivity(endpoint);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [attachmentError, setAttachmentError] = useState('');
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const followBottomRef = useRef(true);
  const initialScrollRef = useRef(true);
  const onCloseRef = useRef(onClose);
  const onReadRef = useRef(onRead);
  const imagePreviewRef = useRef<ImagePreview | null>(null);
  const form = useForm<{ body: string; attachments: File[] }>({ body: '', attachments: [] });
  const resizeMessageInput = useCallback(() => {
    const input = messageInputRef.current;
    if (!input) return;
    const style = window.getComputedStyle(input);
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const maxHeight = parseFloat(style.lineHeight) * 6 + padding + border;
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight + border, maxHeight)}px`;
    input.style.overflowY = input.scrollHeight + border > maxHeight ? 'auto' : 'hidden';
  }, []);

  useLayoutEffect(resizeMessageInput, [form.data.body, resizeMessageInput]);

  useEffect(() => {
    const input = messageInputRef.current;
    if (!input) return;
    let width = input.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      const nextWidth = input.getBoundingClientRect().width;
      if (nextWidth === width) return;
      width = nextWidth;
      resizeMessageInput();
    });
    observer.observe(input);
    window.addEventListener('resize', resizeMessageInput);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeMessageInput);
    };
  }, [resizeMessageInput]);
  const groups: { key: string; date?: string | null; messages: ChatMessage[] }[] = [];
  messages.forEach((message) => {
    const key = dayKey(message.created_at);
    const last = groups[groups.length - 1];
    if (last?.key === key) last.messages.push(message);
    else groups.push({ key, date: message.created_at, messages: [message] });
  });

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    onReadRef.current = onRead;
  }, [onRead]);

  useEffect(() => {
    imagePreviewRef.current = imagePreview;
  }, [imagePreview]);

  useEffect(() => {
    const urls = selectedImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [selectedImages]);

  const loadMessages = useCallback(async (showLoader = true) => {
    if (document.visibilityState !== 'visible') return;
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
      onReadRef.current?.();
    } catch {
      setLoadError(copy.chat.loadError);
    } finally {
      setLoading(false);
    }
  }, [copy.chat.loadError, endpoint]);

  useEffect(() => {
    void loadMessages();

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (imagePreviewRef.current) {
        setImagePreview(null);
        return;
      }

      onCloseRef.current();
    };

    document.addEventListener('keydown', handleEscape);
    const refresh = () => { if (document.visibilityState === 'visible') void loadMessages(false); };
    document.addEventListener('visibilitychange', refresh);
    const refreshTimer = window.setInterval(refresh, 5000);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('visibilitychange', refresh);
      window.clearInterval(refreshTimer);
    };
  }, [loadMessages]);

  useEffect(() => {
    if (!loading && messagesRef.current && (initialScrollRef.current || followBottomRef.current)) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      initialScrollRef.current = false;
    }
  }, [messages, loading, activity.peer_typing]);

  const sendMessage = () => {
    if ((!form.data.body.trim() && !form.data.attachments.length) || form.processing) return;
    activity.stopTyping();

    form.post(endpoint, {
      forceFormData: true,
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        followBottomRef.current = true;
        setSelectedImages([]);
        setAttachmentError('');
        if (attachmentInputRef.current) attachmentInputRef.current.value = '';
        form.reset();
        void loadMessages(false);
      },
    });
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleMessageKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    sendMessage();
  };

  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    setAttachmentError('');

    event.currentTarget.value = '';
    if (!files.length) return;
    if (selectedImages.length + files.length > 6) { setAttachmentError(copy.chat.imageLimit); return; }

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (files.some((file) => !acceptedTypes.includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setAttachmentError(copy.chat.imageError);
      event.currentTarget.value = '';
      return;
    }

    const next = [...selectedImages, ...files];
    setSelectedImages(next);
    form.setData('attachments', next);
  };

  const removeSelectedImage = (index: number) => {
    const next = selectedImages.filter((_, position) => position !== index);
    setSelectedImages(next);
    form.setData('attachments', next);
    setAttachmentError('');
    if (attachmentInputRef.current) attachmentInputRef.current.value = '';
  };

  return (
    <>
      <section className="inquiry-chat-modal" role="dialog" aria-modal="true" aria-labelledby={`inquiry-chat-title-${inquiryId}`}>
        <header className="inquiry-chat-header">
          <div>
            <div className="inquiry-chat-ticket-row">
              <span className="inquiry-chat-ticket">{ticket}</span>
              {currentRole === 'admin' && clientName && <strong className="inquiry-chat-client-name">{clientName}</strong>}
            </div>
            <div className="inquiry-chat-heading-row">
              <h2 id={`inquiry-chat-title-${inquiryId}`}>{copy.chat.title}</h2>
              <span className={`inquiry-chat-presence${activity.peer_present ? ' is-present' : ''}`}>
                <i aria-hidden="true" />
                {currentRole === 'user'
                  ? (activity.peer_present ? copy.chat.adminInChat : copy.chat.adminAway)
                  : (activity.peer_present ? copy.chat.clientInChat : copy.chat.clientAway)}
              </span>
            </div>
            <p>{title}</p>
          </div>
          <button type="button" className="inquiry-chat-close" onClick={onClose} aria-label={copy.chat.close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="inquiry-chat-messages" ref={messagesRef} aria-live="polite" onScroll={(event) => {
          const list = event.currentTarget;
          followBottomRef.current = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
        }}>
          {loading ? (
            <p className="inquiry-chat-state">{copy.chat.loading}</p>
          ) : loadError ? (
            <p className="inquiry-chat-state inquiry-chat-error">{loadError}</p>
          ) : messages.length === 0 ? (
            <p className="inquiry-chat-state">{copy.chat.empty}</p>
          ) : (
            groups.map((group) => <div className="inquiry-chat-day" key={group.key}>
              <div className="inquiry-chat-date"><span>{formatDay(group.date, copy.chat)}</span></div>
              {group.messages.map((message) => {
              const isOwn = message.sender_role === currentRole;

              return (
                <div className={`inquiry-chat-message${isOwn ? ' is-own' : ''}`} key={message.id}>
                  <div className={`inquiry-chat-bubble${(message.attachments?.length ?? 0) > 1 ? ' has-album' : ''}`}>
                    <div className={`inquiry-chat-photos${(message.attachments?.length ?? 0) > 1 ? ' is-album' : ''}`}>
                    {(message.attachments ?? (message.attachment_url ? [{ url: message.attachment_url, name: message.attachment_name || copy.chat.imageAlt }] : [])).map((photo) => (
                      <button
                        type="button"
                        className="inquiry-chat-image-link"
                        key={photo.url}
                        onClick={() => setImagePreview({
                          url: photo.url,
                          name: photo.name || copy.chat.imageAlt,
                        })}
                        aria-label={photo.name || copy.chat.imageAlt}
                      >
                        <img src={photo.url} alt={photo.name || copy.chat.imageAlt} onLoad={() => {
                          if (followBottomRef.current && messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                        }} />
                      </button>
                    ))}
                    </div>
                    {message.body && <p>{message.body}</p>}
                    <div className="inquiry-chat-message-footer">
                      <time dateTime={message.created_at || undefined}>{formatMessageTime(message.created_at)}</time>
                      {isOwn && <span className={`inquiry-chat-receipt${message.read_at ? ' is-read' : ''}`} aria-label={message.read_at ? copy.chat.read : copy.chat.sent} title={message.read_at ? copy.chat.read : copy.chat.sent}>
                        <svg width="20" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m2 8 4 4L17 2" />
                          {message.read_at && <path d="m10 11 2 2L23 3" />}
                        </svg>
                      </span>}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>)
          )}
          {activity.peer_typing && (
            <div className="inquiry-chat-typing" role="status">
              <span className="inquiry-chat-typing-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>{currentRole === 'user' ? copy.chat.adminTyping : copy.chat.clientTyping}</span>
            </div>
          )}
        </div>

        <form className="inquiry-chat-composer" onSubmit={submitMessage}>
          <div className="inquiry-chat-attachment-list">
          {selectedImages.map((selectedImage, index) => previewUrls[index] && (
            <div className="inquiry-chat-attachment-preview" key={`${selectedImage.name}-${index}`}>
              <img src={previewUrls[index]} alt={selectedImage.name} />
              <div>
                <strong>{selectedImage.name}</strong>
                <small>{Math.ceil(selectedImage.size / 1024)} KB</small>
              </div>
              <button type="button" disabled={form.processing} onClick={() => removeSelectedImage(index)} aria-label={`${copy.chat.removeImage}: ${selectedImage.name}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          ))}
          </div>
          <div className="inquiry-chat-composer-row">
            <label
              className="inquiry-chat-attach"
              htmlFor={'inquiry-chat-attachment-' + inquiryId}
              aria-label={copy.chat.addImage}
              title={copy.chat.addImage}
            >
              <input
                ref={attachmentInputRef}
                id={'inquiry-chat-attachment-' + inquiryId}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={selectImage}
                disabled={form.processing}
                aria-label={copy.chat.addImage}
              />
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-4.5-4.5L7 20" />
              </svg>
            </label>
            <textarea
              ref={messageInputRef}
              value={form.data.body}
              onChange={(event) => { form.setData('body', event.target.value); activity.updateTyping(event.target.value); }}
              onBlur={activity.stopTyping}
              placeholder={copy.chat.placeholder}
              rows={1}
              maxLength={5000}
              aria-label={copy.chat.placeholder}
              disabled={form.processing}
              onKeyDown={handleMessageKeyDown}
            />
            <button type="submit" className="inquiry-chat-send" aria-label={copy.chat.send} title={copy.chat.send} disabled={form.processing || (!form.data.body.trim() && !form.data.attachments.length)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
          {(attachmentError || Object.values(form.errors).length > 0) && (
            <span className="inquiry-chat-form-error">{attachmentError || Object.values(form.errors)[0]}</span>
          )}
        </form>
      </section>

      {imagePreview && (
        <div
          className="inquiry-chat-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={imagePreview.name}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setImagePreview(null);
          }}
        >
          <button type="button" className="inquiry-chat-lightbox-close" onClick={() => setImagePreview(null)} aria-label={copy.chat.close}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img src={imagePreview.url} alt={imagePreview.name} />
        </div>
      )}
    </>
  );
}
