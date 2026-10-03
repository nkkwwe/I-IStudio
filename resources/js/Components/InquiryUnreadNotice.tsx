import ChatUnreadBadge from './ChatUnreadBadge';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';

export default function InquiryUnreadNotice({ count = 0 }: { count?: number }) {
  const copy = getUiCopy(useSiteLanguage());
  if (count <= 0) return null;

  return (
    <span className="inquiry-unread-notice" aria-label={`${copy.chat.newMessages}: ${count}`}>
      <span>{copy.chat.newMessages}</span>
      <ChatUnreadBadge count={count} />
    </span>
  );
}
