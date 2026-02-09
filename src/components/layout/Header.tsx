import { useState, useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useLocale } from '@/hooks/use-locale';
import { useLocalePath } from '@/hooks/use-locale-path';
import { getNavItems } from '@/i18n/routes';
import { cn } from '@/lib/utils';

export function Header(): ReactNode {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const locale = useLocale();
  const lp = useLocalePath();

  const navItems = getNavItems(locale).map((item) => ({
    ...item,
    label: t(`nav.${item.key}`),
  }));

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return (): void => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string): boolean => {
    // Exact match for home, startsWith for others
    if (href === lp('home')) {
      return location.pathname === href || location.pathname === `${href}/`;
    }
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a href="#main-content" className="skip-link">
        {t('header.skipToContent')}
      </a>

      <div className="container flex h-16 items-center justify-between md:h-18">
        <Link
          to={lp('home')}
          className="flex items-center gap-2 text-xl font-bold text-foreground transition-opacity hover:opacity-80"
          aria-label={t('header.brandAriaLabel')}
        >
          <img src="/logo-icon.png" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="hidden sm:inline">{t('header.brandName')}</span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label={t('header.mainNav')}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive(item.href)
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <LanguageSwitcher />
          <Button asChild>
            <Link to={lp('contact')}>{t('header.contactCta')}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden border-t border-border backdrop-blur-sm bg-background/98 lg:hidden"
          >
            <nav className="container py-4" aria-label={t('header.mobileNav')}>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-lg transition-colors min-h-[44px] flex items-center',
                        isActive(item.href)
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 px-4">
                <Button asChild className="w-full">
                  <Link to={lp('contact')} onClick={closeMobileMenu}>
                    {t('header.contactCta')}
                  </Link>
                </Button>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
