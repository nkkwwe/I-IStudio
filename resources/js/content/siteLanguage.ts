export type SiteLanguage = 'en' | 'uk' | 'ro';
export type SiteLocale = 'en' | 'ua' | 'ro';

const languageToLocale: Record<SiteLanguage, SiteLocale> = {
  en: 'en',
  uk: 'ua',
  ro: 'ro',
};

const localeToLanguage: Record<SiteLocale, SiteLanguage> = {
  en: 'en',
  ua: 'uk',
  ro: 'ro',
};

export function isSiteLanguage(value: string | null | undefined): value is SiteLanguage {
  return value === 'en' || value === 'uk' || value === 'ro';
}

export function isSiteLocale(value: string | null | undefined): value is SiteLocale {
  return value === 'en' || value === 'ua' || value === 'ro';
}

export function getSiteLanguageFromDocument(): SiteLanguage {
  if (typeof document === 'undefined') return 'en';

  const htmlLanguage = document.documentElement.lang.toLowerCase();
  if (htmlLanguage === 'uk' || htmlLanguage === 'ua') return 'uk';
  if (htmlLanguage === 'ro') return 'ro';

  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
  if (isSiteLocale(firstSegment)) return localeToLanguage[firstSegment];

  return 'en';
}

export function getSiteLocale(language: SiteLanguage = getSiteLanguageFromDocument()): SiteLocale {
  return languageToLocale[language];
}

export function localizedUrl(path: string, language: SiteLanguage = getSiteLanguageFromDocument()): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path;

  const url = new URL(path, window.location.origin);
  const segments = url.pathname.split('/').filter(Boolean);
  const currentLocale = segments[0];

  if (isSiteLocale(currentLocale)) segments.shift();

  const suffix = segments.length > 0 ? `/${segments.join('/')}` : '';

  return `/${getSiteLocale(language)}${suffix}${url.search}${url.hash}`;
}

export function localizedCurrentUrl(language: SiteLanguage): string {
  return localizedUrl(
    `${window.location.pathname}${window.location.search}${window.location.hash}`,
    language,
  );
}
