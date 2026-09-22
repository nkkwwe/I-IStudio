import { useEffect, useRef, useState } from 'react';
import { getUiCopy, useSiteLanguage } from '../content/uiTranslations';

type AccountSiteHeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
};

export default function AccountSiteHeader({ isDark, onToggleTheme, onLogout }: AccountSiteHeaderProps) {
  const [languageOpen, setLanguageOpen] = useState(false);
  const language = useSiteLanguage();
  const copy = getUiCopy(language);
  const languageLabels = { en: 'EN', uk: 'UK', ro: 'RO' } as const;
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!languageOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [languageOpen]);

  const selectLanguage = (nextLanguage: string) => {
    setLanguageOpen(false);
    window.localStorage.setItem('ii_studio_language', nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new CustomEvent('ii_studio_language_change', { detail: nextLanguage }));
  };

  return (
    <header className="site-header account-site-header">
      <div className="container header-container">
        <a href="/#hero" className="logo">
          <span className="logo-symbol">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x={2} y={2} width={20} height={20} rx={6} fill="#09090b" />
              <path d="M7 7V17M17 7V17M10.5 13.5C11.2 12.8 12.8 11.2 13.5 10.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
              <circle cx={12} cy={12} r="1.5" fill="#ffffff" />
            </svg>
          </span>
          <span className="logo-text">I&amp;I<span className="logo-sub">Studio</span></span>
        </a>

        <div className="header-actions">
          <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label={isDark ? copy.common.enableLightTheme : copy.common.enableDarkTheme}>
            <svg className="theme-icon theme-icon-sun" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4" /></svg>
            <svg className="theme-icon theme-icon-moon" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg>
          </button>

          <div ref={switcherRef} className={`language-switcher account-language-switcher${languageOpen ? ' open' : ''}`}>
            <button type="button" className="language-trigger" onClick={() => setLanguageOpen((open) => !open)} aria-haspopup="listbox" aria-expanded={languageOpen} aria-label={`${copy.common.availableLanguages}: ${languageLabels[language]}`}>
              <span className="language-current">{languageLabels[language]}</span>
              <svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className="language-menu" role="listbox" aria-label={copy.common.availableLanguages}>
              <button type="button" className={`language-option${language === 'en' ? ' active' : ''}`} onClick={() => selectLanguage('en')} role="option" aria-selected={language === 'en'}>English <span>EN</span></button>
              <button type="button" className={`language-option${language === 'uk' ? ' active' : ''}`} onClick={() => selectLanguage('uk')} role="option" aria-selected={language === 'uk'}>Українська <span>UK</span></button>
              <button type="button" className={`language-option${language === 'ro' ? ' active' : ''}`} onClick={() => selectLanguage('ro')} role="option" aria-selected={language === 'ro'}>Română <span>RO</span></button>
            </div>
          </div>

          <button type="button" className="account-logout" onClick={onLogout} aria-label={copy.common.signOut} title={copy.common.signOut}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 5H6.75A1.75 1.75 0 0 0 5 6.75v10.5A1.75 1.75 0 0 0 6.75 19H10" /><path d="M13 12h7" /><path d="m17 8 4 4-4 4" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
