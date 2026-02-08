import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Tuote',
      links: [
        { label: 'Ominaisuudet', href: '/ominaisuudet' },
        { label: 'Ratkaisut', href: '/ratkaisut' },
        { label: 'Turvallisuus', href: '/turvallisuus-ja-saavutettavuus' },
        { label: 'Aloita', href: '/aloita' },
      ],
    },
    {
      title: 'Yritys',
      links: [{ label: 'Yhteystiedot', href: '/yhteystiedot' }],
    },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span>SmartFlow</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-secondary-foreground/80">
              Markkinoiden paras sähköisen asioinnin alusta julkisille organisaatioille ja
              yrityksille. Tarjoa saavutettavia, turvallisia ja yhdenmukaisia digipalveluja
              asiakkaillesi.
            </p>
            <p className="mt-4 text-sm font-medium text-primary">SmartFlow, Powered by Antesto</p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-secondary-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="inline-block py-2 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-secondary-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-secondary-foreground/60">
            &copy; {currentYear} SmartFlow. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex gap-6">
            <Link
              to="/turvallisuus-ja-saavutettavuus"
              className="inline-block py-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
            >
              Tietosuoja
            </Link>
            <Link
              to="/turvallisuus-ja-saavutettavuus"
              className="inline-block py-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
            >
              Saavutettavuus
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
