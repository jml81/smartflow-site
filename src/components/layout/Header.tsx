import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Etusivu', href: '/' },
  { label: 'Ominaisuudet', href: '/ominaisuudet' },
  { label: 'Ratkaisut', href: '/ratkaisut' },
  { label: 'Turvallisuus', href: '/turvallisuus-ja-saavutettavuus' },
  { label: 'Aloita', href: '/aloita' },
  { label: 'Yhteystiedot', href: '/yhteystiedot' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a href="#main-content" className="skip-link">
        Siirry sisältöön
      </a>

      <div className="container flex h-16 items-center justify-between md:h-18">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground transition-opacity hover:opacity-80"
          aria-label="SmartFlow - Etusivu"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="hidden sm:inline">SmartFlow</span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Päänavigaatio">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                location.pathname === item.href
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <Link to="/yhteystiedot">Ota yhteyttä</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background lg:hidden animate-fade-in"
        >
          <nav className="container py-4" aria-label="Mobiilinavigaatio">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                      location.pathname === item.href
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
                <Link to="/yhteystiedot" onClick={closeMobileMenu}>
                  Ota yhteyttä
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
