import { useCallback } from 'react';
import { useLocale } from './use-locale';
import { localePath, type RouteKey, type Locale } from '@/i18n/routes';

/** Returns a function that builds locale-prefixed paths using the current locale. */
export function useLocalePath(): (route: RouteKey) => string {
  const locale = useLocale();
  return useCallback((route: RouteKey) => localePath(locale, route), [locale]);
}

/** Returns a function that builds locale-prefixed paths for a specific locale. */
export function useLocalePathFor(targetLocale: Locale): (route: RouteKey) => string {
  return useCallback((route: RouteKey) => localePath(targetLocale, route), [targetLocale]);
}
