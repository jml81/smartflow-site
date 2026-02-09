import { Navigate } from 'react-router-dom';
import { defaultLocale, isLocale, type Locale } from '@/i18n/routes';

function detectLocale(): Locale {
  // Check localStorage first
  const stored = localStorage.getItem('brightflow-lang');
  if (stored && isLocale(stored)) return stored;

  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang && isLocale(browserLang)) return browserLang;

  return defaultLocale;
}

/** Redirects `/` to `/:locale/` based on stored preference or browser language. */
export function LocaleRedirect(): React.ReactNode {
  const locale = detectLocale();
  return <Navigate to={`/${locale}`} replace />;
}
