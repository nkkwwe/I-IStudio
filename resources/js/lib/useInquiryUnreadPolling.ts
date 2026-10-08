import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { fetchChatUnreadCounts } from '../Components/ChatUnreadBadge';
import type { Inquiry } from './inquiries';

export default function useInquiryUnreadPolling(
  setInquiries: Dispatch<SetStateAction<Inquiry[]>>,
  endpoint: string,
) {
  useEffect(() => {
    let disposed = false;
    const refresh = async () => {
      if (document.visibilityState === 'hidden') return;
      try {
        const payload = await fetchChatUnreadCounts(endpoint);
        if (disposed) return;
        const counts = new Map((payload.inquiries ?? []).map((item) => [item.id, item]));
        setInquiries((current) => {
          let changed = false;
          const next = current.map((inquiry) => {
            const count = counts.get(inquiry.id);
            const unreadCount = count?.unread_count ?? 0;
            const status = count?.status ?? inquiry.status;
            if (inquiry.unread_count === unreadCount && inquiry.status === status) return inquiry;
            changed = true;
            return { ...inquiry, unread_count: unreadCount, status };
          });
          return changed ? next : current;
        });
      } catch {
        // Preserve the previous counts during a temporary network failure.
      }
    };
    const onFocus = () => void refresh();
    const timer = window.setInterval(onFocus, 15000);
    window.addEventListener('focus', onFocus);
    return () => {
      disposed = true;
      window.clearInterval(timer);
      window.removeEventListener('focus', onFocus);
    };
  }, [setInquiries, endpoint]);
}
