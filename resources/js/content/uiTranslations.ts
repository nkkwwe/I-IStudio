import { useEffect, useState } from 'react';

export type SiteLanguage = 'en' | 'uk' | 'ro';

type CommonCopy = {
  nav: {
    solutions: string;
    services: string;
    cases: string;
    process: string;
    about: string;
    contact: string;
  };
  discussProject: string;
  homeMetaDescription: string;
  projectBrief: string;
  projectBriefDescription: string;
  account: string;
  availableLanguages: string;
  toggleMenu: string;
  enableLightTheme: string;
  enableDarkTheme: string;
  signOut: string;
  closeDialog: string;
  close: string;
  cancel: string;
  saveName: string;
  saving: string;
  deleteAccount: string;
  deleting: string;
  deletePermanently: string;
};

type AuthCopy = {
  pageSignIn: string;
  pageCreateAccount: string;
  privateWorkspace: string;
  welcomeBack: string;
  createYourAccount: string;
  signInDescription: string;
  createAccountDescription: string;
  inquiryRequiresAuth: string;
  continueWithGoogle: string;
  noPasswordNote: string;
};

type AdminCopy = {
  area: string;
  workspace: string;
  accessPrefix: string;
  profile: string;
  openSite: string;
  sections: string;
  projectBriefs: string;
  registeredUsers: string;
  workQueue: string;
  people: string;
  total: string;
  noProjectBriefs: string;
  newTasks: string;
  contact: string;
  budget: string;
  client: string;
  date: string;
  description: string;
  briefDetails: string;
  noDescription: string;
  noUsers: string;
  unnamedUser: string;
  registered: string;
  statuses: Record<string, string>;
};

type AccountCopy = {
  pageTitle: string;
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
  profileUpdated: string;
  accountLabel: string;
  workspaceTitle: string;
  workspaceDescription: string;
  profileLabel: string;
  name: string;
  email: string;
  signIn: string;
  google: string;
  editName: string;
  adminPanel: string;
  adminPanelDescription: string;
  accountControl: string;
  leaveStudio: string;
  leaveStudioDescription: string;
  changeName: string;
  changeNameDescription: string;
  signOutTitle: string;
  signOutDescription: string;
  signingOut: string;
  deleteTitle: string;
  deleteDescription: string;
  deleteConfirmationLabel: string;
  deleteConfirmationPlaceholder: string;
  deleteConfirmationError: string;
};

type ChatCopy = {
  title: string;
  openChat: string;
  studio: string;
  empty: string;
  loading: string;
  loadError: string;
  placeholder: string;
  addImage: string;
  removeImage: string;
  imageAlt: string;
  imageError: string;
  send: string;
  close: string;
};

type UiCopy = {
  common: CommonCopy;
  auth: AuthCopy;
  admin: AdminCopy;
  account: AccountCopy;
  chat: ChatCopy;
  services: Record<string, string>;
};

export const uiTranslations: Record<SiteLanguage, UiCopy> = {
  en: {
    common: {
      nav: { solutions: 'Solutions', services: 'Services', cases: 'Cases', process: 'How We Work', about: 'About', contact: 'Contact' },
      discussProject: 'Discuss Project',
      homeMetaDescription: 'We build high-converting landing pages, functional business websites, modern website redesigns, and high-ROI ad campaigns.',
      projectBrief: 'Project Brief',
      projectBriefDescription: 'Tell I&I Studio about your project.',
      account: 'Account',
      availableLanguages: 'Available languages',
      toggleMenu: 'Toggle menu',
      enableLightTheme: 'Enable light theme',
      enableDarkTheme: 'Enable dark theme',
      signOut: 'Sign out',
      closeDialog: 'Close dialog',
      close: 'Close',
      cancel: 'Cancel',
      saveName: 'Save name',
      saving: 'Saving…',
      deleteAccount: 'Delete account',
      deleting: 'Deleting…',
      deletePermanently: 'Delete permanently',
    },
    auth: {
      pageSignIn: 'Sign in',
      pageCreateAccount: 'Create account',
      privateWorkspace: 'PRIVATE WORKSPACE',
      welcomeBack: 'Welcome back',
      createYourAccount: 'Create your account',
      signInDescription: 'Sign in with Google to access your personal workspace.',
      createAccountDescription: 'Register with Google to send your project brief and access your workspace.',
      inquiryRequiresAuth: 'Create or sign in to your account first. Your project brief will be ready when you return.',
      continueWithGoogle: 'Continue with Google',
      noPasswordNote: 'No password required. A new Google account is registered automatically.',
    },
    admin: {
      area: 'ADMIN AREA',
      workspace: 'Workspace control',
      accessPrefix: 'Admin access is active for',
      profile: 'Profile',
      openSite: 'Open site',
      sections: 'Admin sections',
      projectBriefs: 'Project briefs',
      registeredUsers: 'Registered users',
      workQueue: 'WORK QUEUE',
      people: 'PEOPLE',
      total: 'total',
      noProjectBriefs: 'No project briefs yet',
      newTasks: 'New tasks sent through the project form will appear here.',
      contact: 'Social networks',
      budget: 'Budget',
      client: 'Client',
      date: 'Date',
      description: 'Description',
      briefDetails: 'Project brief details',
      noDescription: 'No description provided.',
      noUsers: 'No users registered yet',
      unnamedUser: 'Unnamed user',
      registered: 'Registered',
      statuses: {
        new: 'Awaiting review',
        ready_to_start: 'Ready to start',
        in_progress: 'In progress',
        completed: 'Completed',
      },
    },
    account: {
      pageTitle: 'Account',
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
      profileUpdated: 'Profile name updated.',
      accountLabel: 'ACCOUNT',
      workspaceTitle: 'Your workspace is ready.',
      workspaceDescription: 'Use this space to keep your project brief, conversations and next steps connected to your account.',
      profileLabel: 'PROFILE',
      name: 'Name',
      email: 'Email',
      signIn: 'Sign-in',
      google: 'Google',
      editName: 'Edit name',
      adminPanel: 'Admin panel',
      adminPanelDescription: 'Manage the studio workspace and upcoming administrative tools from here.',
      accountControl: 'ACCOUNT CONTROL',
      leaveStudio: 'Leave I&I Studio',
      leaveStudioDescription: 'Sign out on this device or permanently remove your workspace and account data.',
      changeName: 'Change your name',
      changeNameDescription: 'Choose the name that should appear in your personal workspace.',
      signOutTitle: 'Sign out?',
      signOutDescription: 'You can sign in again with Google whenever you want to return to your workspace.',
      signingOut: 'Signing out…',
      deleteTitle: 'Delete account?',
      deleteDescription: 'This permanently removes your workspace and account data. This action cannot be undone.',
      deleteConfirmationLabel: 'Type DELETE to confirm',
      deleteConfirmationPlaceholder: 'DELETE',
      deleteConfirmationError: 'Type DELETE to confirm.',
    },
    chat: {
      title: 'Project chat',
      openChat: 'Open chat',
      studio: 'I&I Studio',
      empty: 'No messages yet. Start the conversation.',
      loading: 'Loading conversation…',
      loadError: 'We couldn’t load this conversation.',
      placeholder: 'Write a message…',
      addImage: 'Add image',
      removeImage: 'Remove image',
      imageAlt: 'Attached image',
      imageError: 'Choose a JPG, PNG, GIF, or WEBP image up to 5 MB.',
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
    common: {
      nav: { solutions: 'Рішення', services: 'Послуги', cases: 'Кейси', process: 'Як ми працюємо', about: 'Про нас', contact: 'Контакти' },
      discussProject: 'Обговорити проєкт',
      homeMetaDescription: 'Ми створюємо конверсійні лендинги, функціональні сайти для бізнесу, сучасний редизайн і результативні рекламні кампанії.',
      projectBrief: 'Бриф проєкту',
      projectBriefDescription: 'Розкажіть I&I Studio про ваш проєкт.',
      account: 'Акаунт',
      availableLanguages: 'Доступні мови',
      toggleMenu: 'Відкрити меню',
      enableLightTheme: 'Увімкнути світлу тему',
      enableDarkTheme: 'Увімкнути темну тему',
      signOut: 'Вийти',
      closeDialog: 'Закрити діалогове вікно',
      close: 'Закрити',
      cancel: 'Скасувати',
      saveName: 'Зберегти імʼя',
      saving: 'Збереження…',
      deleteAccount: 'Видалити акаунт',
      deleting: 'Видалення…',
      deletePermanently: 'Видалити назавжди',
    },
    auth: {
      pageSignIn: 'Увійти',
      pageCreateAccount: 'Створити акаунт',
      privateWorkspace: 'ОСОБИСТИЙ ПРОСТІР',
      welcomeBack: 'Раді вас бачити',
      createYourAccount: 'Створіть свій акаунт',
      signInDescription: 'Увійдіть через Google, щоб відкрити особистий простір.',
      createAccountDescription: 'Зареєструйтеся через Google, щоб надіслати бриф проєкту та відкрити свій простір.',
      inquiryRequiresAuth: 'Спочатку створіть акаунт або увійдіть. Після повернення ваш бриф проєкту буде готовий.',
      continueWithGoogle: 'Продовжити через Google',
      noPasswordNote: 'Пароль не потрібен. Новий акаунт Google зареєструється автоматично.',
    },
    admin: {
      area: 'АДМІН-ПАНЕЛЬ',
      workspace: 'Керування робочим простором',
      accessPrefix: 'Доступ адміністратора активний для',
      profile: 'Профіль',
      openSite: 'Відкрити сайт',
      sections: 'Розділи адмін-панелі',
      projectBriefs: 'Завдання проєкту',
      registeredUsers: 'Зареєстровані користувачі',
      workQueue: 'ЧЕРГА РОБОТИ',
      people: 'КОРИСТУВАЧІ',
      total: 'всього',
      noProjectBriefs: 'Завдань поки немає',
      newTasks: 'Нові завдання з форми проєкту зʼявляться тут.',
      contact: 'Соцмережі',
      budget: 'Бюджет',
      client: 'Клієнт',
      date: 'Дата',
      description: 'Опис',
      briefDetails: 'Деталі завдання',
      noDescription: 'Опис відсутній.',
      noUsers: 'Зареєстрованих користувачів поки немає',
      unnamedUser: 'Користувач без імені',
      registered: 'Зареєстровано',
      statuses: {
        new: 'Очікує перевірки',
        ready_to_start: 'Готово до старту',
        in_progress: 'У роботі',
        completed: 'Завершено',
      },
    },
    account: {
      pageTitle: 'Акаунт',
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
      profileUpdated: 'Імʼя профілю оновлено.',
      accountLabel: 'АКАУНТ',
      workspaceTitle: 'Ваш простір готовий.',
      workspaceDescription: 'Зберігайте тут бриф проєкту, листування та наступні кроки, повʼязані з вашим акаунтом.',
      profileLabel: 'ПРОФІЛЬ',
      name: 'Імʼя',
      email: 'Email',
      signIn: 'Вхід',
      google: 'Google',
      editName: 'Змінити імʼя',
      adminPanel: 'Адмін-панель',
      adminPanelDescription: 'Керуйте робочим простором студії та майбутніми адміністративними інструментами.',
      accountControl: 'КЕРУВАННЯ АКАУНТОМ',
      leaveStudio: 'Вийти з I&I Studio',
      leaveStudioDescription: 'Вийдіть на цьому пристрої або назавжди видаліть свій простір і дані акаунта.',
      changeName: 'Змінити ваше імʼя',
      changeNameDescription: 'Оберіть імʼя, яке відображатиметься у вашому особистому просторі.',
      signOutTitle: 'Вийти?',
      signOutDescription: 'Ви зможете знову увійти через Google, коли захочете повернутися до свого простору.',
      signingOut: 'Вихід…',
      deleteTitle: 'Видалити акаунт?',
      deleteDescription: 'Це назавжди видалить ваш простір і дані акаунта. Дію неможливо скасувати.',
      deleteConfirmationLabel: 'Введіть DELETE для підтвердження',
      deleteConfirmationPlaceholder: 'DELETE',
      deleteConfirmationError: 'Введіть DELETE для підтвердження.',
    },
    chat: {
      title: 'Чат проєкту',
      openChat: 'Відкрити чат',
      studio: 'I&I Studio',
      empty: 'Повідомлень ще немає. Почніть розмову.',
      loading: 'Завантаження чату…',
      loadError: 'Не вдалося завантажити цей чат.',
      placeholder: 'Напишіть повідомлення…',
      addImage: 'Додати зображення',
      removeImage: 'Видалити зображення',
      imageAlt: 'Прикріплене зображення',
      imageError: 'Оберіть зображення JPG, PNG, GIF або WEBP розміром до 5 МБ.',
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
    common: {
      nav: { solutions: 'Soluții', services: 'Servicii', cases: 'Studii de caz', process: 'Cum lucrăm', about: 'Despre noi', contact: 'Contact' },
      discussProject: 'Discută proiectul',
      homeMetaDescription: 'Construim landing pages cu conversie ridicată, site-uri funcționale, redesignuri moderne și campanii de publicitate eficiente.',
      projectBrief: 'Brief-ul proiectului',
      projectBriefDescription: 'Spune-i studioului I&I despre proiectul tău.',
      account: 'Cont',
      availableLanguages: 'Limbi disponibile',
      toggleMenu: 'Deschide meniul',
      enableLightTheme: 'Activează tema luminoasă',
      enableDarkTheme: 'Activează tema întunecată',
      signOut: 'Deconectare',
      closeDialog: 'Închide dialogul',
      close: 'Închide',
      cancel: 'Anulează',
      saveName: 'Salvează numele',
      saving: 'Se salvează…',
      deleteAccount: 'Șterge contul',
      deleting: 'Se șterge…',
      deletePermanently: 'Șterge definitiv',
    },
    auth: {
      pageSignIn: 'Autentificare',
      pageCreateAccount: 'Creează cont',
      privateWorkspace: 'SPAȚIU PERSONAL',
      welcomeBack: 'Bine ai revenit',
      createYourAccount: 'Creează-ți contul',
      signInDescription: 'Autentifică-te cu Google pentru a accesa spațiul personal.',
      createAccountDescription: 'Înregistrează-te cu Google pentru a trimite brief-ul proiectului și a accesa spațiul personal.',
      inquiryRequiresAuth: 'Creează mai întâi un cont sau autentifică-te. Brief-ul proiectului va fi gata când revii.',
      continueWithGoogle: 'Continuă cu Google',
      noPasswordNote: 'Nu este necesară o parolă. Un cont Google nou este înregistrat automat.',
    },
    admin: {
      area: 'PANOU ADMIN',
      workspace: 'Controlul spațiului de lucru',
      accessPrefix: 'Accesul de administrator este activ pentru',
      profile: 'Profil',
      openSite: 'Deschide site-ul',
      sections: 'Secțiuni admin',
      projectBriefs: 'Solicitări de proiect',
      registeredUsers: 'Utilizatori înregistrați',
      workQueue: 'COADA DE LUCRU',
      people: 'UTILIZATORI',
      total: 'în total',
      noProjectBriefs: 'Nu există solicitări încă',
      newTasks: 'Solicitările noi trimise prin formular vor apărea aici.',
      contact: 'Rețele sociale',
      budget: 'Buget',
      client: 'Client',
      date: 'Data',
      description: 'Descriere',
      briefDetails: 'Detalii solicitare',
      noDescription: 'Nu a fost furnizată nicio descriere.',
      noUsers: 'Nu există utilizatori înregistrați încă',
      unnamedUser: 'Utilizator fără nume',
      registered: 'Înregistrat',
      statuses: {
        new: 'În așteptarea verificării',
        ready_to_start: 'Gata de începere',
        in_progress: 'În lucru',
        completed: 'Finalizat',
      },
    },
    account: {
      pageTitle: 'Cont',
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
      profileUpdated: 'Numele profilului a fost actualizat.',
      accountLabel: 'CONT',
      workspaceTitle: 'Spațiul tău este pregătit.',
      workspaceDescription: 'Păstrează aici brief-ul proiectului, conversațiile și pașii următori conectați la contul tău.',
      profileLabel: 'PROFIL',
      name: 'Nume',
      email: 'Email',
      signIn: 'Autentificare',
      google: 'Google',
      editName: 'Editează numele',
      adminPanel: 'Panou admin',
      adminPanelDescription: 'Gestionează spațiul studioului și viitoarele instrumente administrative de aici.',
      accountControl: 'CONTROLUL CONTULUI',
      leaveStudio: 'Părăsește I&I Studio',
      leaveStudioDescription: 'Deconectează-te de pe acest dispozitiv sau elimină definitiv spațiul și datele contului.',
      changeName: 'Schimbă-ți numele',
      changeNameDescription: 'Alege numele care va apărea în spațiul tău personal.',
      signOutTitle: 'Deconectare?',
      signOutDescription: 'Te poți autentifica din nou cu Google oricând vrei să revii în spațiul tău.',
      signingOut: 'Se deconectează…',
      deleteTitle: 'Ștergi contul?',
      deleteDescription: 'Acest lucru elimină definitiv spațiul și datele contului. Acțiunea nu poate fi anulată.',
      deleteConfirmationLabel: 'Tastează DELETE pentru confirmare',
      deleteConfirmationPlaceholder: 'DELETE',
      deleteConfirmationError: 'Tastează DELETE pentru confirmare.',
    },
    chat: {
      title: 'Chatul proiectului',
      openChat: 'Deschide chatul',
      studio: 'I&I Studio',
      empty: 'Nu există mesaje. Începe conversația.',
      loading: 'Se încarcă conversația…',
      loadError: 'Conversația nu a putut fi încărcată.',
      placeholder: 'Scrie un mesaj…',
      addImage: 'Adaugă o imagine',
      removeImage: 'Elimină imaginea',
      imageAlt: 'Imagine atașată',
      imageError: 'Alege o imagine JPG, PNG, GIF sau WEBP de maximum 5 MB.',
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
