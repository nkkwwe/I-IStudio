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
        setInquiries((current) => current.map((inquiry) => ({
          ...inquiry, unread_count: counts.get(inquiry.id)?.unread_count ?? 0,
          status: counts.get(inquiry.id)?.status ?? inquiry.status,
        })));
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
