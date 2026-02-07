import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '/': 'Etusivu',
  '/ominaisuudet': 'Ominaisuudet',
  '/ratkaisut': 'Ratkaisut',
  '/turvallisuus-ja-saavutettavuus': 'Turvallisuus ja saavutettavuus',
  '/aloita': 'Aloita',
  '/yhteystiedot': 'Yhteystiedot',
};

export function Breadcrumb() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === '/') {
    return null;
  }

  const currentLabel = routeLabels[currentPath] ?? 'Sivu';

  return (
    <nav aria-label="Murupolku" className="container py-4">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 rounded-sm px-1 py-1 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Etusivu"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Etusivu</span>
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        </li>
        <li>
          <span className="font-medium text-foreground" aria-current="page">
            {currentLabel}
          </span>
        </li>
      </ol>
    </nav>
  );
}
