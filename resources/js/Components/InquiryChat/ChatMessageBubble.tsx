import { useEffect, useRef } from 'react';
import type { ChatMessage, ImagePreview } from './types';
import type { getUiCopy } from '../../content/uiTranslations';
import { formatMessageTime } from './format';

type Props = {
  message: ChatMessage;
  currentRole: 'admin' | 'user';
  copy: ReturnType<typeof getUiCopy>;
  onOpenMenu: (message: ChatMessage, element: HTMLElement, x?: number, y?: number) => void;
  onPreview: (image: ImagePreview) => void;
  onImageLoad: () => void;
};

export default function ChatMessageBubble({ message, currentRole, copy, onOpenMenu, onPreview, onImageLoad }: Props) {
  const isOwn = message.sender_role === currentRole;
  const holdRef = useRef<{ timer: ReturnType<typeof setTimeout>; x: number; y: number } | null>(null);
  const suppressHoldClickRef = useRef(false);
  const cancelHold = () => {
    if (holdRef.current) clearTimeout(holdRef.current.timer);
    holdRef.current = null;
  };
  useEffect(() => () => cancelHold(), []);
  return (
    <div className={`inquiry-chat-message${isOwn ? ' is-own' : ''}`} data-message-id={message.id}>
      <div className={`inquiry-chat-bubble${(message.attachments?.length ?? 0) > 1 ? ' has-album' : ''}${isOwn && message.can_manage ? ' can-manage' : ''}`}
        tabIndex={isOwn && message.can_manage ? 0 : undefined}
        aria-label={isOwn && message.can_manage ? copy.chat.messageActions : undefined}
        onContextMenu={(event) => {
          if (!isOwn || !message.can_manage) return;
          event.preventDefault();
          cancelHold();
          onOpenMenu(message, event.currentTarget, event.clientX, event.clientY);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
            if (!isOwn || !message.can_manage) return;
            event.preventDefault();
            onOpenMenu(message, event.currentTarget);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' || !isOwn || !message.can_manage) return;
          suppressHoldClickRef.current = false;
          cancelHold();
          const element = event.currentTarget;
          const x = event.clientX, y = event.clientY;
          holdRef.current = { x, y, timer: setTimeout(() => {
            holdRef.current = null;
            suppressHoldClickRef.current = true;
            onOpenMenu(message, element, x, y);
          }, 550) };
        }}
        onPointerMove={(event) => {
          if (holdRef.current && Math.hypot(event.clientX - holdRef.current.x, event.clientY - holdRef.current.y) > 10) cancelHold();
        }}
        onPointerUp={cancelHold}
        onPointerCancel={cancelHold}
        onClickCapture={(event) => {
          if (!suppressHoldClickRef.current) return;
          suppressHoldClickRef.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className={`inquiry-chat-photos${(message.attachments?.length ?? 0) > 1 ? ' is-album' : ''}`}>
        {(message.attachments ?? (message.attachment_url ? [{ url: message.attachment_url, name: message.attachment_name || copy.chat.imageAlt }] : [])).map((photo) => (
          <button
            type="button"
            className="inquiry-chat-image-link"
            key={photo.url}
            onClick={() => onPreview({
              url: photo.url,
              name: photo.name || copy.chat.imageAlt,
            })}
            aria-label={photo.name || copy.chat.imageAlt}
          >
            <img src={photo.url} alt={photo.name || copy.chat.imageAlt} onLoad={() => {
              onImageLoad();
            }} />
          </button>
        ))}
        </div>
        {message.body && <p>{message.body}</p>}
        <div className="inquiry-chat-message-footer">
          {message.edited_at && <span className="inquiry-chat-edited">{copy.chat.edited}</span>}
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
}
