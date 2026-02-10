import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { usePageMeta } from '@/hooks/use-page-meta';

interface SectionWithContentProps {
  title: string;
  content: string;
}

interface SectionWithItemsProps {
  title: string;
  description: string;
  items: string[];
  footer?: string;
}

function SectionCard({ children }: { children: React.ReactNode }): React.ReactNode {
  return <div className="rounded-xl border border-border bg-card p-6 md:p-8">{children}</div>;
}

function ContentSection({ title, content }: SectionWithContentProps): React.ReactNode {
  return (
    <SectionCard>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-3 text-muted-foreground" dangerouslySetInnerHTML={{ __html: content }} />
    </SectionCard>
  );
}

function ItemsSection({
  title,
  description,
  items,
  footer,
}: SectionWithItemsProps): React.ReactNode {
  return (
    <SectionCard>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {footer && <p className="mt-4 text-muted-foreground">{footer}</p>}
    </SectionCard>
  );
}

const Tietosuoja = (): React.ReactNode => {
  const { t } = useTranslation('privacy');

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

  const sectionOrder = [
    'controller',
    'purpose',
    'data',
    'sources',
    'disclosure',
    'retention',
    'rights',
    'security',
  ] as const;

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
            <p className="mt-4 text-sm text-muted-foreground">{t('updated')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6">
            {sectionOrder.map((key) => {
              const section = t(`sections.${key}`, { returnObjects: true }) as Record<
                string,
                unknown
              >;
              if ('items' in section) {
                return (
                  <ItemsSection
                    key={key}
                    title={section.title as string}
                    description={section.description as string}
                    items={section.items as string[]}
                    footer={section.footer as string | undefined}
                  />
                );
              }
              return (
                <ContentSection
                  key={key}
                  title={section.title as string}
                  content={section.content as string}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tietosuoja;
