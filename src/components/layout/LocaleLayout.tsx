import { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  isLocale,
  defaultLocale,
  supportedLocales,
  localePath,
  slugToRouteKey,
} from '@/i18n/routes';

/** Validates the locale from the URL path, syncs i18n, sets html lang and injects hreflang links. */
export function LocaleLayout(): React.ReactNode {
  const { i18n } = useTranslation();
  const location = useLocation();

  const segment = location.pathname.split('/')[1];
  const validLocale = segment && isLocale(segment) ? segment : null;

  // Sync i18n language when locale changes
  useEffect(() => {
    if (validLocale && i18n.language !== validLocale) {
      void i18n.changeLanguage(validLocale);
    }
  }, [validLocale, i18n]);

  // Set html lang and persist choice
  useEffect(() => {
    if (validLocale) {
      document.documentElement.lang = validLocale;
      localStorage.setItem('brightflow-lang', validLocale);
    }
  }, [validLocale]);

  // Inject hreflang and canonical link tags
  useEffect(() => {
    if (!validLocale) return;

    // Get current slug from path
    const pathParts = location.pathname.split('/').filter(Boolean);
    // pathParts: [locale] or [locale, slug]
    const currentSlug = pathParts[1] ?? '';
    const routeKey = slugToRouteKey(currentSlug);

    // Clean up old hreflang/canonical tags
    document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());

    if (routeKey) {
      // Add hreflang for each locale
      for (const lang of supportedLocales) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        link.setAttribute('href', `https://brightflow.antesto.fi${localePath(lang, routeKey)}`);
        link.setAttribute('data-hreflang', 'true');
        document.head.appendChild(link);
      }

      // x-default hreflang
      const xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      xDefault.setAttribute('href', `https://brightflow.antesto.fi${localePath('fi', routeKey)}`);
      xDefault.setAttribute('data-hreflang', 'true');
      document.head.appendChild(xDefault);

      // Canonical
      const canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute(
        'href',
        `https://brightflow.antesto.fi${localePath(validLocale, routeKey)}`,
      );
      canonical.setAttribute('data-hreflang', 'true');
      document.head.appendChild(canonical);
    }

    return (): void => {
      document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());
    };
  }, [validLocale, location.pathname]);

  // Invalid locale → redirect to default
  if (!validLocale) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  return <Outlet />;
}
