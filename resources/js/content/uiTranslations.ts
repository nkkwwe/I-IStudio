import { useEffect, useState } from 'react';
import { getSiteLanguageFromDocument, isSiteLanguage, type SiteLanguage } from './siteLanguage';

import type { UiCopy } from './ui/types';
import en from './ui/en';
import uk from './ui/uk';
import ro from './ui/ro';

export type { SiteLanguage } from './siteLanguage';

export const uiTranslations: Record<SiteLanguage, UiCopy> = { en, uk, ro };

export function getSiteLanguage(): SiteLanguage {
  return getSiteLanguageFromDocument();
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
