import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import HomeMarkup from '../legacy/HomeMarkup';
import { initLegacyApp } from '../legacy/legacyApp';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import { useChatUnreadCount } from '../Components/ChatUnreadBadge';
import type { PublicReview } from '../Components/ClientReviews';
import { landing, translate } from '../content/startupContent';

type PageProps = {
  reviews?: PublicReview[];
  auth?: {
    user?: { id: number; name?: string | null } | null;
    unread_chat_count?: number;
  };
};

export default function Home() {
  const { auth, reviews = [] } = usePage<PageProps>().props;
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const unreadChatCount = useChatUnreadCount(auth?.unread_chat_count ?? 0, Boolean(auth?.user));

  useEffect(() => {
    document.body.className = '';
    return initLegacyApp();
  }, []);

  return (
    <>
      <Head title="">
        <meta
          name="description"
          content={translate(landing.description, language)}
        />
      </Head>
      <HomeMarkup
        reviews={reviews}
        isAuthenticated={Boolean(auth?.user)}
        userName={auth?.user?.name ?? ''}
        signInLabel={copy.auth.pageSignIn}
        unreadChatCount={unreadChatCount}
      />
    </>
  );
}
