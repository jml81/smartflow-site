import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { usePageMeta } from '@/hooks/use-page-meta';

function SectionCard({ children }: { children: React.ReactNode }): React.ReactNode {
  return <div className="rounded-xl border border-border bg-card p-6 md:p-8">{children}</div>;
}

const Saavutettavuusseloste = (): React.ReactNode => {
  const { t } = useTranslation('accessibility');

  usePageMeta({
    title: t('meta.title'),
    description: t('meta.description'),
  });

  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, follow');
    return (): void => {
      robotsMeta?.parentNode?.removeChild(robotsMeta);
    };
  }, []);

  const today = new Date().toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const feedback = t('sections.feedback', { returnObjects: true }) as Record<string, string>;
  const authority = t('sections.authority', { returnObjects: true }) as Record<string, string>;

  return (
    <Layout>
      <section className="relative bg-muted/50 py-12 md:py-16 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, hsl(242 40% 25% / 0.06), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container relative">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{t('title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{t('intro')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* 1. Status */}
            <SectionCard>
              <h2 className="text-lg font-semibold">{t('sections.status.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('sections.status.content')}</p>
            </SectionCard>

            {/* 2. Features */}
            <SectionCard>
              <h2 className="text-lg font-semibold">{t('sections.features.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('sections.features.description')}</p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
                {(t('sections.features.items', { returnObjects: true }) as string[]).map(
                  (item, i) => (
                    <li key={i}>{item}</li>
                  ),
                )}
              </ul>
            </SectionCard>

            {/* 3. Known Issues */}
            <SectionCard>
              <h2 className="text-lg font-semibold">{t('sections.knownIssues.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('sections.knownIssues.content')}</p>
            </SectionCard>

            {/* 4. Feedback */}
            <SectionCard>
              <h2 className="text-lg font-semibold">{feedback.title}</h2>
              <p className="mt-3 text-muted-foreground">{feedback.description}</p>
              <dl className="mt-4 space-y-2 text-muted-foreground">
                <div className="flex gap-2">
                  <dt className="font-medium">{feedback.companyLabel}:</dt>
                  <dd>{feedback.company}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium">{feedback.addressLabel}:</dt>
                  <dd>{feedback.address}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium">{feedback.emailLabel}:</dt>
                  <dd>
                    <a href={`mailto:${feedback.email}`} className="text-primary hover:underline">
                      {feedback.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-muted-foreground">{feedback.responseTime}</p>
            </SectionCard>

            {/* 5. Authority */}
            <SectionCard>
              <h2 className="text-lg font-semibold">{authority.title}</h2>
              <p className="mt-3 text-muted-foreground">{authority.description}</p>
              <dl className="mt-4 space-y-2 text-muted-foreground">
                <div className="flex gap-2">
                  <dt className="font-medium">{authority.agencyLabel}:</dt>
                  <dd>{authority.agencyName}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium">{authority.websiteLabel}:</dt>
                  <dd>
                    <a
                      href={authority.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {authority.websiteUrl}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium">{authority.emailLabel}:</dt>
                  <dd>
                    <a href={`mailto:${authority.email}`} className="text-primary hover:underline">
                      {authority.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </SectionCard>

            {/* 6. Update */}
            <SectionCard>
              <h2 className="text-lg font-semibold">{t('sections.update.title')}</h2>
              <p className="mt-3 text-muted-foreground">
                {t('sections.update.content', { date: today })}
              </p>
            </SectionCard>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Saavutettavuusseloste;
