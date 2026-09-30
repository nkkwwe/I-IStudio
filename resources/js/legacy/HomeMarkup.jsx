import ChatUnreadBadge from '../Components/ChatUnreadBadge';
import StartupLanding from '../Components/StartupLanding';
import { localizedUrl } from '../content/siteLanguage';

function Logo({ href = '#hero' }) {
  return (
    <a href={href} className="logo">
      <span className="logo-symbol">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x={2} y={2} width={20} height={20} rx={6} fill="#09090b" />
          <path d="M7 7V17M17 7V17M10.5 13.5C11.2 12.8 12.8 11.2 13.5 10.5" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
          <circle cx={12} cy={12} r="1.5" fill="#ffffff" />
        </svg>
      </span>
      <span className="logo-text">I&amp;I<span className="logo-sub">Studio</span></span>
    </a>
  );
}

function LanguageSwitcher({ mobile = false }) {
  return (
    <div className={'language-switcher' + (mobile ? ' mobile-language-switcher' : '')} data-i18n-aria-label="aria_languages" data-i18n-tooltip="aria_languages" data-tooltip="Language selection" aria-label="Language selection">
      <button type="button" className="language-trigger" aria-haspopup="listbox" aria-expanded="false">
        <span className="language-current">EN</span>
        <svg className="language-chevron" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <div className="language-menu" role="listbox" data-i18n-aria-label="aria_languages" aria-label="Available languages">
        <button type="button" className="language-option active" data-language="en" role="option" aria-selected="true">English <span>EN</span></button>
        <button type="button" className="language-option" data-language="uk" role="option" aria-selected="false">Українська <span>UA</span></button>
        <button type="button" className="language-option" data-language="ro" role="option" aria-selected="false">Română <span>RO</span></button>
      </div>
    </div>
  );
}

function Header({ isAuthenticated, signInLabel, unreadChatCount, userName }) {
  return (
    <header className="site-header">
      <div className="container header-container">
        <Logo />
        <nav className="nav-menu" id="navMenu">
          <a href="#hero" className="nav-link" data-i18n="nav_home">Main</a>
          <a href="#services" className="nav-link" data-i18n="nav_services">Services</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#process" className="nav-link" data-i18n="nav_process">How We Work</a>
          <a href="#advantages" className="nav-link" data-i18n="nav_about">About</a>
          <a href="#inquiry" className="nav-link" data-i18n="nav_contact">Contact</a>
          <LanguageSwitcher mobile />
        </nav>
        <div className="header-actions">
          {isAuthenticated ? (
            <a href={localizedUrl('/account')} className="account-header-link" data-i18n-aria-label="aria_account" data-i18n-tooltip="aria_account" aria-label="Account" data-tooltip="Account">
              <span className="account-header-initial" aria-hidden="true">{userName?.trim()?.charAt(0)?.toLocaleUpperCase() || 'A'}</span>
              <ChatUnreadBadge count={unreadChatCount} />
            </a>
          ) : (
            <a href={localizedUrl('/login')} className="account-header-link account-sign-in-link" aria-label={signInLabel} title={signInLabel}>{signInLabel}</a>
          )}
          <button type="button" id="themeToggle" className="theme-toggle" data-i18n-aria-label="aria_theme" aria-label="Toggle theme">
            <svg className="theme-icon theme-icon-sun" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx={12} cy={12} r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.4 4.4l1.4 1.4M18.2 18.2l1.4 1.4M2.5 12h2M19.5 12h2M4.4 19.6l1.4-1.4M18.2 5.8l1.4-1.4" /></svg>
            <svg className="theme-icon theme-icon-moon" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z" /></svg>
          </button>
          <LanguageSwitcher />
          <button className="mobile-toggle" id="mobileToggle" data-i18n-aria-label="aria_menu" data-i18n-tooltip="aria_menu" data-tooltip="Toggle menu" aria-label="Toggle menu"><span /><span /><span /></button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-container">
        <div className="footer-top"><Logo /></div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} I&amp;I Studio</span>
          <nav className="footer-nav">
            <a href="#hero" data-i18n="nav_home">Main</a>
            <a href="#services" data-i18n="nav_services">Services</a>
            <a href="#faq">FAQ</a>
            <a href="#inquiry" data-i18n="nav_contact">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function HomeMarkup({ isAuthenticated = false, signInLabel = 'Sign in', unreadChatCount = 0, userName = '', reviews = /** @type {import('../Components/ClientReviews').PublicReview[]} */ ([]) }) {
  return (
    <div className="react-page-root">
      <Header isAuthenticated={isAuthenticated} signInLabel={signInLabel} unreadChatCount={unreadChatCount} userName={userName} />
      <main>
        <StartupLanding reviews={reviews} />
      </main>
      <Footer />
    </div>
  );
}
