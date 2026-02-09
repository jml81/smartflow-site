import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';
import { useLocalePath } from '@/hooks/use-locale-path';
import { slugToRouteKey, type RouteKey } from '@/i18n/routes';

export function Breadcrumb(): React.ReactNode {
  const location = useLocation();
  const { t } = useTranslation();
  const locale = useLocale();
  const lp = useLocalePath();

  // Extract slug from path: /fi/ominaisuudet → 'ominaisuudet'
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSlug = pathParts[1] ?? '';

  // Hide on home page (no slug or just locale)
  if (!currentSlug) {
    return null;
  }

  const routeKey: RouteKey | undefined = slugToRouteKey(currentSlug);
  const currentLabel = routeKey ? t(`nav.${routeKey}`) : t('breadcrumb.page');

  // Special case: security page uses shorter nav label, show full breadcrumb label
  const breadcrumbLabel =
    routeKey === 'security'
      ? locale === 'fi'
        ? 'Turvallisuus ja saavutettavuus'
        : 'Security & Accessibility'
      : currentLabel;

  return (
    <nav aria-label={t('breadcrumb.ariaLabel')} className="container py-4">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            to={lp('home')}
            className="flex items-center gap-1 rounded-sm px-1 py-1 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={t('breadcrumb.home')}
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t('breadcrumb.home')}</span>
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        </li>
        <li>
          <span className="font-medium text-foreground" aria-current="page">
            {breadcrumbLabel}
          </span>
        </li>
      </ol>
    </nav>
  );
}
