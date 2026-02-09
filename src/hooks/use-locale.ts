import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isLocale, defaultLocale, type Locale } from '@/i18n/routes';

/** Returns the current locale from URL params, falling back to defaultLocale. */
export function useLocale(): Locale {
  const { locale } = useParams<{ locale: string }>();
  return locale && isLocale(locale) ? locale : defaultLocale;
}

/** Returns the t function scoped to a namespace, plus the current locale. */
export function useLocaleTranslation(ns?: string): {
  t: ReturnType<typeof useTranslation>['t'];
  i18n: ReturnType<typeof useTranslation>['i18n'];
  ready: boolean;
  locale: Locale;
} {
  const locale = useLocale();
  const { t, i18n, ready } = useTranslation(ns as Parameters<typeof useTranslation>[0]);
  return { t, i18n, ready, locale };
}
