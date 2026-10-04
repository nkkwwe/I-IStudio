import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../Components/InquiryChat/types';

export function useInquiryChatMessages(endpoint: string, errorText: string, onRead?: () => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState<number | null>(null);
  const hasLoadedRef = useRef(false);
  const messageRevisionRef = useRef(0);
  const requestRef = useRef<AbortController | null>(null);
  const queuedRef = useRef(false);
  const onReadRef = useRef(onRead);
  onReadRef.current = onRead;

  const loadMessages = useCallback(async (showLoader = true): Promise<void> => {
    if (document.visibilityState !== 'visible') return;
    if (requestRef.current) {
      queuedRef.current = true;
      return;
    }
    const controller = new AbortController();
    requestRef.current = controller;
    const revision = messageRevisionRef.current;
    if (showLoader || !hasLoadedRef.current) setLoading(true);

    try {
      const response = await fetch(endpoint, {
        signal: controller.signal,
        credentials: 'same-origin',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      });
      if (!response.ok) throw new Error('Unable to load chat');
      const payload = await response.json() as { messages?: ChatMessage[]; first_unread_message_id?: number | null };
      if (controller.signal.aborted) return;
      if (revision === messageRevisionRef.current) {
        if (!hasLoadedRef.current) {
          setFirstUnreadMessageId(payload.first_unread_message_id ?? null);
          hasLoadedRef.current = true;
        }
        setMessages(payload.messages ?? []);
      }
      setLoadError('');
      onReadRef.current?.();
    } catch {
      if (!controller.signal.aborted) setLoadError(errorText);
    } finally {
      if (requestRef.current === controller) requestRef.current = null;
      if (!controller.signal.aborted) {
        setLoading(false);
        if (queuedRef.current) {
          queuedRef.current = false;
          void loadMessages(false);
        }
      }
    }
  }, [endpoint, errorText]);

  useEffect(() => {
    void loadMessages();
    const refresh = () => { void loadMessages(false); };
    document.addEventListener('visibilitychange', refresh);
    const timer = window.setInterval(refresh, 5000);
    return () => {
      document.removeEventListener('visibilitychange', refresh);
      window.clearInterval(timer);
      queuedRef.current = false;
      requestRef.current?.abort();
      requestRef.current = null;
    };
  }, [loadMessages]);

  return { messages, setMessages, loading, loadError, firstUnreadMessageId, messageRevisionRef, loadMessages };
}
