import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InquiryMarkup from '../legacy/InquiryMarkup';
import { initLegacyApp } from '../legacy/legacyApp';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';
import { useChatUnreadCount } from '../Components/ChatUnreadBadge';

const serviceKeys = ['landing', 'corporate', 'redesign', 'ads', 'consultation', 'other'] as const;

type ServiceKey = (typeof serviceKeys)[number];

type PageProps = {
  auth?: {
    user?: { id: number; name?: string | null } | null;
    unread_chat_count?: number;
  } | null;
  flash?: {
    inquiry_submitted?: boolean;
    inquiry_ticket?: string;
    inquiry_service?: ServiceKey;
    inquiry_budget?: string | null;
  };
};

function getInitialService(): ServiceKey {
  const requestedService = new URLSearchParams(window.location.search).get('service');

  return serviceKeys.includes(requestedService as ServiceKey)
    ? (requestedService as ServiceKey)
    : 'landing';
}

export default function Inquiry() {
  const { auth, flash = {} } = usePage<PageProps>().props;
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const unreadChatCount = useChatUnreadCount(auth?.unread_chat_count ?? 0, Boolean(auth?.user));
  const [activeService, setActiveService] = useState<ServiceKey>(getInitialService);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('ii_studio_theme', nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  useEffect(() => {
    document.body.className = 'inquiry-page-body inquiry-form-only-body';
    initLegacyApp();

    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <Head title={copy.common.projectBrief}>
        <meta name="description" content={copy.common.projectBriefDescription} />
      </Head>
      <InquiryMarkup
        activeService={activeService}
        onServiceChange={setActiveService}
        language={language}
        isAuthenticated={Boolean(auth?.user)}
        userName={auth?.user?.name ?? ''}
        signInLabel={copy.auth.pageSignIn}
        inquirySubmitted={Boolean(flash.inquiry_submitted)}
        inquiryTicket={flash.inquiry_ticket ?? ''}
        inquiryServiceLabel={flash.inquiry_service ? copy.services[flash.inquiry_service] : ''}
        inquiryBudget={flash.inquiry_budget ?? ''}
        unreadChatCount={unreadChatCount}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    </>
  );
}
