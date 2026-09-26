import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import HomeMarkup from '../legacy/HomeMarkup';
import { initLegacyApp } from '../legacy/legacyApp';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import { useChatUnreadCount } from '../Components/ChatUnreadBadge';

type PageProps = {
  auth?: {
    user?: { id: number; name?: string | null } | null;
    unread_chat_count?: number;
  };
};

export default function Home() {
  const { auth } = usePage<PageProps>().props;
  const copy = getUiCopy(useSiteLanguage());
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
          content={copy.common.homeMetaDescription}
        />
      </Head>
      <HomeMarkup
        isAuthenticated={Boolean(auth?.user)}
        userName={auth?.user?.name ?? ''}
        signInLabel={copy.auth.pageSignIn}
        unreadChatCount={unreadChatCount}
      />
    </>
  );
}
