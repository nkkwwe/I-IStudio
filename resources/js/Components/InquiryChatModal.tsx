import { useForm } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { getSiteLanguage, getUiCopy } from '../content/uiTranslations';

type ChatMessage = {
  id: number;
  sender_role: string;
  sender_name: string;
  body: string;
  created_at?: string | null;
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
  const messagesRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const form = useForm({ body: '' });

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

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

    if (!form.data.body.trim() || form.processing) return;

    form.post(endpoint, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        form.reset();
        void loadMessages();
      },
    });
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
                    <p>{message.body}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form className="inquiry-chat-composer" onSubmit={submitMessage}>
          <textarea
            value={form.data.body}
            onChange={(event) => form.setData('body', event.target.value)}
            placeholder={copy.chat.placeholder}
            rows={1}
            maxLength={5000}
            aria-label={copy.chat.placeholder}
            disabled={form.processing}
          />
          {form.errors.body && <span className="inquiry-chat-form-error">{form.errors.body}</span>}
          <button type="submit" className="inquiry-chat-send" disabled={form.processing || !form.data.body.trim()}>
            <span>{copy.chat.send}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </form>
      </section>
    </div>
  );
}
