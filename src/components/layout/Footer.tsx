import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '@/hooks/use-locale-path';

export function Footer(): React.ReactNode {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const lp = useLocalePath();

  const footerLinks = [
    {
      title: t('footer.product'),
      links: [
        { label: t('nav.features'), href: lp('features') },
        { label: t('nav.solutions'), href: lp('solutions') },
        { label: t('nav.security'), href: lp('security') },
        { label: t('nav.start'), href: lp('start') },
      ],
    },
    {
      title: t('footer.company'),
      links: [{ label: t('nav.contact'), href: lp('contact') }],
    },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to={lp('home')} className="inline-flex items-center gap-2 text-xl font-bold">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  {t('header.brandLetter')}
                </span>
              </div>
              <span>{t('header.brandName')}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-secondary-foreground/80">
              {t('footer.description')}
            </p>
            <p className="mt-4 text-sm font-medium text-primary">{t('footer.poweredBy')}</p>
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
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex gap-6">
            <Link
              to={lp('security')}
              className="inline-block py-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              to={lp('security')}
              className="inline-block py-2 text-sm text-secondary-foreground/60 transition-colors hover:text-primary"
            >
              {t('footer.accessibility')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
