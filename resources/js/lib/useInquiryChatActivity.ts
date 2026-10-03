import { useCallback, useEffect, useRef, useState } from 'react';

export function useInquiryChatActivity(endpoint: string) {
  const [peer, setPeer] = useState({ peer_present: false, peer_typing: false });
  const typingUntil = useRef(0);
  const notify = useRef<() => void>(() => {});

  useEffect(() => {
    const clientId = crypto.randomUUID();
    let disposed = false;
    let pending = false;
    let queued = false;
    let lastSuccess = 0;
    const controllers = new Set<AbortController>();
    const send = async (leaving = false) => {
      if (disposed && !leaving) return;
      if (pending && !leaving) { queued = true; return; }
      const cookie = document.cookie.split('; ').find((value) => value.startsWith('XSRF-TOKEN='));
      if (!cookie) return;
      const controller = new AbortController();
      controllers.add(controller);
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      if (!leaving) pending = true;
      try {
        const response = await fetch(`${endpoint}/activity`, {
          method: 'POST', credentials: 'same-origin', keepalive: leaving,
          signal: controller.signal,
          headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': decodeURIComponent(cookie.slice(11)) },
          body: JSON.stringify({ client_id: clientId, active: !leaving && document.visibilityState === 'visible', typing: !leaving && Date.now() < typingUntil.current }),
        });
        if (!response.ok) throw new Error('Activity unavailable');
        const result = await response.json();
        if (!disposed && !leaving) {
          lastSuccess = Date.now();
          setPeer({ peer_present: result.peer_present === true, peer_typing: result.peer_typing === true });
        }
      } catch {
        if (!disposed && Date.now() - lastSuccess > 12000) setPeer({ peer_present: false, peer_typing: false });
      } finally {
        window.clearTimeout(timeout);
        controllers.delete(controller);
        if (!leaving) {
          pending = false;
          if (queued && !disposed) { queued = false; void send(); }
        }
      }
    };
    let lastNotification = 0;
    notify.current = () => {
      if (Date.now() - lastNotification < 800 && typingUntil.current > 0) return;
      lastNotification = Date.now();
      void send();
    };
    const visibility = () => { typingUntil.current = 0; void send(); };
    const leave = () => { typingUntil.current = 0; void send(true); };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', leave);
    void send();
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void send();
    }, 2000);
    return () => {
      disposed = true;
      notify.current = () => {};
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', leave);
      controllers.forEach((controller) => controller.abort());
      leave();
    };
  }, [endpoint]);

  const updateTyping = useCallback((value: string) => {
    typingUntil.current = value.trim() ? Date.now() + 2500 : 0;
    notify.current();
  }, []);
  const stopTyping = useCallback(() => { typingUntil.current = 0; notify.current(); }, []);
  return { ...peer, updateTyping, stopTyping };
}
