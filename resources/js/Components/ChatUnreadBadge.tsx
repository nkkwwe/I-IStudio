import { useEffect, useState } from 'react';

export type ChatUnreadCountsPayload = {
  unread_count: number;
  inquiries?: Array<{
    id: number;
    unread_count: number;
  }>;
};

function normalizeCount(value: unknown): number {
  const count = Number(value);

  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
}

export async function fetchChatUnreadCounts(): Promise<ChatUnreadCountsPayload> {
  const response = await fetch('/account/project-briefs/unread-counts', {
    cache: 'no-store',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to load unread chat counts');
  }

  const payload = await response.json() as Partial<ChatUnreadCountsPayload>;

  return {
    unread_count: normalizeCount(payload.unread_count),
    inquiries: Array.isArray(payload.inquiries)
      ? payload.inquiries.map((inquiry) => ({
          id: Number(inquiry.id),
          unread_count: normalizeCount(inquiry.unread_count),
        }))
      : [],
  };
}

export function useChatUnreadCount(initialCount = 0, enabled = true): number {
  const [unreadCount, setUnreadCount] = useState(() => normalizeCount(initialCount));

  useEffect(() => {
    setUnreadCount(normalizeCount(initialCount));
  }, [initialCount]);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;

    const refresh = async () => {
      if (document.visibilityState === 'hidden') return;

      try {
        const payload = await fetchChatUnreadCounts();
        if (!cancelled) setUnreadCount(payload.unread_count);
      } catch {
        // Keep the last known count during a temporary network failure.
      }
    };

    const handleFocus = () => void refresh();
    const timer = window.setInterval(() => void refresh(), 15000);
    window.addEventListener('focus', handleFocus);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
    };
  }, [enabled]);

  return unreadCount;
}

export default function ChatUnreadBadge({ count }: { count: number }) {
  const normalizedCount = normalizeCount(count);

  if (normalizedCount === 0) return null;

  return (
    <span className="chat-unread-badge" aria-hidden="true">
      {normalizedCount > 99 ? '99+' : normalizedCount}
    </span>
  );
}
