import { useEffect, useState } from 'react';

export type SiteLanguage = 'en' | 'uk' | 'ro';

type AdminCopy = {
  area: string;
  workspace: string;
  accessPrefix: string;
  profile: string;
  openSite: string;
  projectBriefs: string;
  registeredUsers: string;
  workQueue: string;
  people: string;
  total: string;
  noProjectBriefs: string;
  newTasks: string;
  contact: string;
  budget: string;
  noUsers: string;
  registered: string;
  statuses: Record<string, string>;
};

type AccountCopy = {
  personalWorkspace: string;
  projectHistory: string;
  myProjectBriefs: string;
  openEveryTask: string;
  viewAllBriefs: string;
  submittedBriefs: string;
  allTasks: string;
  backToAccount: string;
  startNewBrief: string;
  noProjectBriefs: string;
  noProjectBriefsDescription: string;
};

type ChatCopy = {
  title: string;
  openChat: string;
  studio: string;
  empty: string;
  loading: string;
  loadError: string;
  placeholder: string;
  send: string;
  close: string;
};

type UiCopy = {
  admin: AdminCopy;
  account: AccountCopy;
  chat: ChatCopy;
  services: Record<string, string>;
};

export const uiTranslations: Record<SiteLanguage, UiCopy> = {
  en: {
    admin: {
      area: 'ADMIN AREA',
      workspace: 'Workspace control',
      accessPrefix: 'Admin access is active for',
      profile: 'Profile',
      openSite: 'Open site',
      projectBriefs: 'Project briefs',
      registeredUsers: 'Registered users',
      workQueue: 'WORK QUEUE',
      people: 'PEOPLE',
      total: 'total',
      noProjectBriefs: 'No project briefs yet',
      newTasks: 'New tasks sent through the project form will appear here.',
      contact: 'Contact',
      budget: 'Budget',
      noUsers: 'No users registered yet',
      registered: 'Registered',
      statuses: {
        new: 'Awaiting review',
        ready_to_start: 'Ready to start',
        in_progress: 'In progress',
        completed: 'Completed',
      },
    },
    account: {
      personalWorkspace: 'PERSONAL WORKSPACE',
      projectHistory: 'PROJECT HISTORY',
      myProjectBriefs: 'My project briefs',
      openEveryTask: 'Open every task you have sent to I&I Studio from this account.',
      viewAllBriefs: 'View all briefs',
      submittedBriefs: 'Submitted briefs',
      allTasks: 'All tasks you have sent to I&I Studio from this account.',
      backToAccount: 'Back to account',
      startNewBrief: 'Start new brief',
      noProjectBriefs: 'No project briefs yet',
      noProjectBriefsDescription: 'Your submitted tasks will appear here after you send the project form.',
    },
    chat: {
      title: 'Project chat',
      openChat: 'Open chat',
      studio: 'I&I Studio',
      empty: 'No messages yet. Start the conversation.',
      loading: 'Loading conversation…',
      loadError: 'We couldn’t load this conversation.',
      placeholder: 'Write a message…',
      send: 'Send',
      close: 'Close',
    },
    services: {
      landing: 'Landing Page',
      corporate: 'Business Website',
      redesign: 'Website Redesign',
      ads: 'Advertising',
      consultation: 'Consultation',
      other: 'Other',
    },
  },
  uk: {
    admin: {
      area: 'АДМІН-ПАНЕЛЬ',
      workspace: 'Керування робочим простором',
      accessPrefix: 'Доступ адміністратора активний для',
      profile: 'Профіль',
      openSite: 'Відкрити сайт',
      projectBriefs: 'Завдання проєкту',
      registeredUsers: 'Зареєстровані користувачі',
      workQueue: 'ЧЕРГА РОБОТИ',
      people: 'КОРИСТУВАЧІ',
      total: 'всього',
      noProjectBriefs: 'Завдань поки немає',
      newTasks: 'Нові завдання з форми проєкту зʼявляться тут.',
      contact: 'Контакт',
      budget: 'Бюджет',
      noUsers: 'Зареєстрованих користувачів поки немає',
      registered: 'Зареєстровано',
      statuses: {
        new: 'Очікує перевірки',
        ready_to_start: 'Готово до старту',
        in_progress: 'У роботі',
        completed: 'Завершено',
      },
    },
    account: {
      personalWorkspace: 'ОСОБИСТИЙ ПРОСТІР',
      projectHistory: 'ІСТОРІЯ ПРОЄКТІВ',
      myProjectBriefs: 'Мої завдання',
      openEveryTask: 'Відкрийте всі завдання, які ви надіслали I&I Studio з цього акаунта.',
      viewAllBriefs: 'Відкрити всі завдання',
      submittedBriefs: 'Надіслані завдання',
      allTasks: 'Усі завдання, які ви надіслали I&I Studio з цього акаунта.',
      backToAccount: 'До акаунта',
      startNewBrief: 'Нове завдання',
      noProjectBriefs: 'Завдань поки немає',
      noProjectBriefsDescription: 'Надіслані завдання зʼявляться тут після відправки форми.',
    },
    chat: {
      title: 'Чат проєкту',
      openChat: 'Відкрити чат',
      studio: 'I&I Studio',
      empty: 'Повідомлень ще немає. Почніть розмову.',
      loading: 'Завантаження чату…',
      loadError: 'Не вдалося завантажити цей чат.',
      placeholder: 'Напишіть повідомлення…',
      send: 'Надіслати',
      close: 'Закрити',
    },
    services: {
      landing: 'Лендінг',
      corporate: 'Бізнес-сайт',
      redesign: 'Редизайн сайту',
      ads: 'Реклама',
      consultation: 'Консультація',
      other: 'Інше',
    },
  },
  ro: {
    admin: {
      area: 'PANOU ADMIN',
      workspace: 'Controlul spațiului de lucru',
      accessPrefix: 'Accesul de administrator este activ pentru',
      profile: 'Profil',
      openSite: 'Deschide site-ul',
      projectBriefs: 'Solicitări de proiect',
      registeredUsers: 'Utilizatori înregistrați',
      workQueue: 'COADA DE LUCRU',
      people: 'UTILIZATORI',
      total: 'în total',
      noProjectBriefs: 'Nu există solicitări încă',
      newTasks: 'Solicitările noi trimise prin formular vor apărea aici.',
      contact: 'Contact',
      budget: 'Buget',
      noUsers: 'Nu există utilizatori înregistrați încă',
      registered: 'Înregistrat',
      statuses: {
        new: 'În așteptarea verificării',
        ready_to_start: 'Gata de începere',
        in_progress: 'În lucru',
        completed: 'Finalizat',
      },
    },
    account: {
      personalWorkspace: 'SPAȚIU PERSONAL',
      projectHistory: 'ISTORICUL PROIECTELOR',
      myProjectBriefs: 'Solicitările mele',
      openEveryTask: 'Deschide toate solicitările trimise către I&I Studio din acest cont.',
      viewAllBriefs: 'Vezi toate solicitările',
      submittedBriefs: 'Solicitări trimise',
      allTasks: 'Toate solicitările trimise către I&I Studio din acest cont.',
      backToAccount: 'Înapoi la cont',
      startNewBrief: 'Solicitare nouă',
      noProjectBriefs: 'Nu există solicitări încă',
      noProjectBriefsDescription: 'Solicitările trimise vor apărea aici după expedierea formularului.',
    },
    chat: {
      title: 'Chatul proiectului',
      openChat: 'Deschide chatul',
      studio: 'I&I Studio',
      empty: 'Nu există mesaje. Începe conversația.',
      loading: 'Se încarcă conversația…',
      loadError: 'Conversația nu a putut fi încărcată.',
      placeholder: 'Scrie un mesaj…',
      send: 'Trimite',
      close: 'Închide',
    },
    services: {
      landing: 'Landing page',
      corporate: 'Site de companie',
      redesign: 'Redesign site',
      ads: 'Publicitate',
      consultation: 'Consultație',
      other: 'Altele',
    },
  },
} as const;

function isSiteLanguage(value: string | null): value is SiteLanguage {
  return value === 'en' || value === 'uk' || value === 'ro';
}

export function getSiteLanguage(): SiteLanguage {
  if (typeof window !== 'undefined' && isSiteLanguage(window.localStorage.getItem('ii_studio_language'))) {
    return window.localStorage.getItem('ii_studio_language') as SiteLanguage;
  }

  return 'en';
}

export function getUiCopy(language: SiteLanguage = getSiteLanguage()) {
  return uiTranslations[language];
}

export function useSiteLanguage(): SiteLanguage {
  const [language, setLanguage] = useState<SiteLanguage>(getSiteLanguage);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<string>).detail;
      if (isSiteLanguage(nextLanguage)) setLanguage(nextLanguage);
    };

    window.addEventListener('ii_studio_language_change', handleLanguageChange);

    return () => window.removeEventListener('ii_studio_language_change', handleLanguageChange);
  }, []);

  return language;
}
