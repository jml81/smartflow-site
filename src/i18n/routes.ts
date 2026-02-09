export const supportedLocales = ['fi', 'en'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'fi';

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

/** Route slugs per locale */
const routeSlugs = {
  fi: {
    home: '',
    features: 'ominaisuudet',
    solutions: 'ratkaisut',
    security: 'turvallisuus-ja-saavutettavuus',
    start: 'aloita',
    contact: 'yhteystiedot',
  },
  en: {
    home: '',
    features: 'features',
    solutions: 'solutions',
    security: 'security-and-accessibility',
    start: 'get-started',
    contact: 'contact',
  },
} as const;

export type RouteKey = keyof (typeof routeSlugs)['fi'];

/** Build a locale-prefixed path: localePath('fi', 'features') → '/fi/ominaisuudet' */
export function localePath(locale: Locale, route: RouteKey): string {
  const slug = routeSlugs[locale][route];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

/** Map a slug in any locale back to its RouteKey (or undefined) */
export function slugToRouteKey(slug: string): RouteKey | undefined {
  for (const locale of supportedLocales) {
    for (const [key, value] of Object.entries(routeSlugs[locale])) {
      if (value === slug) return key as RouteKey;
    }
  }
  return undefined;
}

/** Get the equivalent path for a different locale */
export function switchLocalePath(
  _currentLocale: Locale,
  targetLocale: Locale,
  currentSlug: string,
): string {
  const routeKey = slugToRouteKey(currentSlug);
  if (!routeKey) return `/${targetLocale}`;
  return localePath(targetLocale, routeKey);
}

/** Navigation items for a given locale */
export function getNavItems(locale: Locale): { label: string; href: string; key: RouteKey }[] {
  return [
    { label: '', href: localePath(locale, 'home'), key: 'home' },
    { label: '', href: localePath(locale, 'features'), key: 'features' },
    { label: '', href: localePath(locale, 'solutions'), key: 'solutions' },
    { label: '', href: localePath(locale, 'security'), key: 'security' },
    { label: '', href: localePath(locale, 'start'), key: 'start' },
    { label: '', href: localePath(locale, 'contact'), key: 'contact' },
  ];
}
