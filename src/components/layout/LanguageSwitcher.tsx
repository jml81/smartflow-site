import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';
import { supportedLocales, switchLocalePath, type Locale } from '@/i18n/routes';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps): React.ReactNode {
  const locale = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSwitch = (targetLocale: Locale): void => {
    if (targetLocale === locale) return;

    // Extract current slug from pathname
    const pathParts = location.pathname.split('/').filter(Boolean);
    const currentSlug = pathParts[1] ?? '';

    const targetPath = switchLocalePath(locale, targetLocale, currentSlug);
    navigate(targetPath);
  };

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label={t('language.switchLabel')}
    >
      <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      {supportedLocales.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => handleSwitch(lang)}
          className={cn(
            'px-2 py-1 text-sm font-medium rounded transition-colors',
            lang === locale
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted',
          )}
          aria-current={lang === locale ? 'true' : undefined}
          aria-label={t(`language.${lang}`)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
