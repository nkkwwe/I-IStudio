import { useForm } from '@inertiajs/react';
import { Fragment, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import { useInquiryChatActivity } from '../lib/useInquiryChatActivity';
import { useInquiryChatScroll } from '../lib/useInquiryChatScroll';
import { useInquiryChatMessages } from '../lib/useInquiryChatMessages';
import type { ChatMessage, ImagePreview, InquiryChatModalProps } from './InquiryChat/types';
import { groupMessages, formatDay } from './InquiryChat/format';
import ChatMessageBubble from './InquiryChat/ChatMessageBubble';

export default function InquiryChatModal({ inquiryId, ticket, title, endpoint, currentRole, clientName, onClose, onRead }: InquiryChatModalProps) {
  const copy = getUiCopy(useSiteLanguage());
  const activity = useInquiryChatActivity(endpoint);
  const { messages, setMessages, loading, loadError, firstUnreadMessageId, messageRevisionRef, loadMessages } = useInquiryChatMessages(endpoint, copy.chat.loadError, onRead);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [attachmentError, setAttachmentError] = useState('');
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const [messageMenu, setMessageMenu] = useState<{ message: ChatMessage; x: number; y: number; confirmingDelete?: boolean } | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [editBody, setEditBody] = useState('');
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef({ menu: false, editing: false });
  interactionRef.current = { menu: Boolean(messageMenu), editing: Boolean(editingMessage) };
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const onCloseRef = useRef(onClose);
  const imagePreviewRef = useRef<ImagePreview | null>(null);
  const form = useForm<{ body: string; attachments: File[] }>({ body: '', attachments: [] });
  const { messagesRef, composerRef, messageInputRef, followBottomRef, scrollToBottom, handleScroll, dateVisible, floatingDates } = useInquiryChatScroll(
    messages, loading || Boolean(loadError), firstUnreadMessageId, editingMessage ? editBody : form.data.body, Boolean(editingMessage),
  );

  useEffect(() => {
    if (!messageMenu) return;
    menuRef.current?.querySelector('button')?.focus();
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMessageMenu(null);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [messageMenu?.message.id, messageMenu?.confirmingDelete]);

  const groups = useMemo(() => groupMessages(messages), [messages]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    imagePreviewRef.current = imagePreview;
  }, [imagePreview]);

  useEffect(() => {
    const urls = selectedImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [selectedImages]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (interactionRef.current.menu) {
        setMessageMenu(null);
        return;
      }

      if (interactionRef.current.editing) {
        setEditingMessage(null);
        setActionError('');
        return;
      }

      if (imagePreviewRef.current) {
        setImagePreview(null);
        return;
      }

      onCloseRef.current();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const sendMessage = () => {
    if (editingMessage) { void saveEditedMessage(); return; }
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

  const openMessageMenu = (message: ChatMessage, element: HTMLElement, clientX?: number, clientY?: number) => {
    if (!message.can_manage || message.sender_role !== currentRole || actionBusy) return;
    const modal = element.closest('.inquiry-chat-modal')?.getBoundingClientRect();
    if (!modal) return;
    const rect = element.getBoundingClientRect();
    setActionError('');
    setMessageMenu({ message,
      x: Math.max(12, Math.min((clientX ?? rect.right) - modal.left, modal.width - 252)),
      y: Math.max(12, Math.min((clientY ?? rect.bottom) - modal.top, modal.height - 190)),
    });
  };

  const mutateMessage = async (message: ChatMessage, method: 'PATCH' | 'DELETE', body?: string) => {
    const cookie = document.cookie.split('; ').find((value) => value.startsWith('XSRF-TOKEN='));
    const response = await fetch(`${endpoint}/${message.id}`, {
      method, credentials: 'same-origin',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': decodeURIComponent(cookie?.slice(11) ?? '') },
      ...(method === 'PATCH' ? { body: JSON.stringify({ body }) } : {}),
    });
    if (!response.ok) throw new Error(copy.chat.actionError);
    return response.json() as Promise<{ message?: ChatMessage }>;
  };

  const saveEditedMessage = async () => {
    if (!editingMessage || actionBusy || form.processing) return;
    if (!editBody.trim() && !editingMessage.attachments?.length && !editingMessage.attachment_url) {
      setActionError(copy.chat.emptyEditError);
      return;
    }
    setActionBusy(true);
    messageRevisionRef.current += 1;
    setActionError('');
    try {
      const result = await mutateMessage(editingMessage, 'PATCH', editBody);
      messageRevisionRef.current += 1;
      if (result.message) setMessages((current) => current.map((message) => message.id === editingMessage.id ? result.message! : message));
      setEditingMessage(null);
    } catch { setActionError(copy.chat.actionError); }
    finally { setActionBusy(false); }
  };

  const deleteMessage = async () => {
    if (!messageMenu || actionBusy) return;
    const message = messageMenu.message;
    setActionBusy(true);
    messageRevisionRef.current += 1;
    setActionError('');
    try {
      await mutateMessage(message, 'DELETE');
      messageRevisionRef.current += 1;
      setMessages((current) => current.filter((item) => item.id !== message.id));
      if (editingMessage?.id === message.id) setEditingMessage(null);
      setMessageMenu(null);
    } catch { setActionError(copy.chat.actionError); }
    finally { setActionBusy(false); }
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

        <div className={`inquiry-chat-messages${dateVisible ? ' is-scrolling' : ''}`} ref={messagesRef} aria-live="polite" onScroll={(event) => {
          if (!handleScroll(event)) return;
          setMessageMenu(null);
        }}>
          {loading ? (
            <p className="inquiry-chat-state">{copy.chat.loading}</p>
          ) : loadError ? (
            <p className="inquiry-chat-state inquiry-chat-error">{loadError}</p>
          ) : messages.length === 0 ? (
            <p className="inquiry-chat-state">{copy.chat.empty}</p>
          ) : (
            groups.map((group) => <div className="inquiry-chat-day" key={group.key} data-day={group.key}>
              <div className={`inquiry-chat-date${floatingDates.includes(group.key) ? ' is-floating' : ''}`}><span>{formatDay(group.date, copy.chat)}</span></div>
              {group.messages.map((message) => (
                <Fragment key={message.id}>
                  {message.id === firstUnreadMessageId && <div className="inquiry-chat-unread-boundary" data-unread-boundary>{copy.chat.unreadMessages}</div>}
                  <ChatMessageBubble message={message} currentRole={currentRole} copy={copy} onOpenMenu={openMessageMenu} onPreview={setImagePreview} onImageLoad={() => { if (followBottomRef.current) scrollToBottom(); }} />
                </Fragment>
              ))}
            </div>)
          )}

        </div>

        <form ref={composerRef} className="inquiry-chat-composer" onSubmit={submitMessage}>
          {activity.peer_typing && (
            <div className="inquiry-chat-typing" role="status">
              <span className="inquiry-chat-typing-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>{currentRole === 'user' ? copy.chat.adminTyping : copy.chat.clientTyping}</span>
            </div>
          )}
          {editingMessage && <div className="inquiry-chat-editing-bar">
            <span>{copy.chat.editingMessage}</span>
            <button type="button" disabled={actionBusy} onClick={() => { setEditingMessage(null); setActionError(''); }}>{copy.common.cancel}</button>
          </div>}
          {!editingMessage && <div className="inquiry-chat-attachment-list" role="list" aria-label={copy.chat.addImage}>
          {selectedImages.map((selectedImage, index) => previewUrls[index] && (
            <div className="inquiry-chat-attachment-preview" role="listitem" key={`${selectedImage.name}-${index}`}>
              <button type="button" className="inquiry-chat-selected-photo" onClick={() => setImagePreview({ url: previewUrls[index], name: selectedImage.name })} aria-label={selectedImage.name}>
                <img src={previewUrls[index]} alt="" />
                <span>{Array.from(selectedImage.name).length > 10 ? `${Array.from(selectedImage.name).slice(0, 10).join('')}…` : selectedImage.name}</span>
              </button>
              <button type="button" className="inquiry-chat-remove-photo" disabled={form.processing} onClick={() => removeSelectedImage(index)} aria-label={`${copy.chat.removeImage}: ${selectedImage.name}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          ))}
          </div>}
          <div className="inquiry-chat-composer-row">
              <input
                ref={attachmentInputRef}
                id={'inquiry-chat-attachment-' + inquiryId}
                type="file"
                hidden
                multiple
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={selectImage}
                disabled={form.processing}
                aria-label={copy.chat.addImage}
              />
            <button
              type="button"
              className="inquiry-chat-attach"
              onClick={() => attachmentInputRef.current?.click()}
              disabled={form.processing || Boolean(editingMessage) || actionBusy}
              aria-label={copy.chat.addImage}
              title={copy.chat.addImage}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-4.5-4.5L7 20" />
              </svg>
            </button>
            <textarea
              className="inquiry-chat-input"
              ref={messageInputRef}
              value={editingMessage ? editBody : form.data.body}
              onChange={(event) => { if (editingMessage) setEditBody(event.target.value); else form.setData('body', event.target.value); activity.updateTyping(event.target.value); }}
              onBlur={activity.stopTyping}
              placeholder={copy.chat.placeholder}
              rows={1}
              maxLength={5000}
              aria-label={copy.chat.placeholder}
              disabled={form.processing || actionBusy}
              onKeyDown={handleMessageKeyDown}
            />
            <button type="submit" className="inquiry-chat-send" aria-label={editingMessage ? copy.chat.saveMessage : copy.chat.send} title={editingMessage ? copy.chat.saveMessage : copy.chat.send} disabled={form.processing || actionBusy || (!editingMessage && !form.data.body.trim() && !form.data.attachments.length)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={editingMessage ? 'm5 12 4 4L19 6' : 'm4 4 17 8-17 8 3-8-3-8Z'} />
                {!editingMessage && <path d="M7 12h14" />}
              </svg>
            </button>
          </div>
          {(actionError || attachmentError || Object.values(form.errors).length > 0) && (
            <span className="inquiry-chat-form-error" role="alert">{actionError || attachmentError || Object.values(form.errors)[0]}</span>
          )}
        </form>
        {messageMenu && <div ref={menuRef} className="inquiry-chat-message-menu" role="group" aria-label={copy.chat.messageActions} style={{ left: messageMenu.x, top: messageMenu.y }}>
          {messageMenu.confirmingDelete ? <>
            <p>{copy.chat.deleteMessageConfirmation}</p>
            <button type="button" className="is-danger" disabled={actionBusy} onClick={() => void deleteMessage()}>{copy.chat.deleteMessage}</button>
            <button type="button" disabled={actionBusy} onClick={() => setMessageMenu(null)}>{copy.common.cancel}</button>
          </> : <>
            <button type="button" disabled={actionBusy || form.processing} onClick={() => {
              setEditingMessage(messageMenu.message); setEditBody(messageMenu.message.body); setMessageMenu(null); setActionError('');
              requestAnimationFrame(() => messageInputRef.current?.focus());
            }}>{copy.chat.editMessage}</button>
            <button type="button" className="is-danger" disabled={actionBusy || form.processing} onClick={() => setMessageMenu({ ...messageMenu, confirmingDelete: true })}>{copy.chat.deleteMessage}</button>
          </>}
        </div>}
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
