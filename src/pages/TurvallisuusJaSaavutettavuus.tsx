import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StaggeredChildren, StaggeredItem } from '@/components/ui/staggered-children';
import { SectionDivider } from '@/components/ui/section-divider';
import { usePageMeta } from '@/hooks/use-page-meta';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileCheck,
  Users2,
  Keyboard,
  Monitor,
  Contrast,
  ListChecks,
  FileText,
} from 'lucide-react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function InfoCard({ icon, title, description }: InfoCardProps): React.ReactNode {
  return (
    <div className="flex h-full gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

const securityIcons = [
  <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
  <Lock className="h-6 w-6" aria-hidden="true" />,
  <Eye className="h-6 w-6" aria-hidden="true" />,
  <FileCheck className="h-6 w-6" aria-hidden="true" />,
];

const a11yIcons = [
  <Users2 className="h-6 w-6" aria-hidden="true" />,
  <Contrast className="h-6 w-6" aria-hidden="true" />,
  <Keyboard className="h-6 w-6" aria-hidden="true" />,
  <Monitor className="h-6 w-6" aria-hidden="true" />,
  <ListChecks className="h-6 w-6" aria-hidden="true" />,
  <FileText className="h-6 w-6" aria-hidden="true" />,
];

const TurvallisuusJaSaavutettavuus = (): React.ReactNode => {
  const { t } = useTranslation('security');

  usePageMeta({
    title: t('meta.title'),
    description: t('meta.description'),
  });

  const securityFeatures = (
    t('securityItems', { returnObjects: true }) as { title: string; description: string }[]
  ).map((item, i) => ({ icon: securityIcons[i], ...item }));

  const accessibilityFeatures = (
    t('accessibilityItems', { returnObjects: true }) as { title: string; description: string }[]
  ).map((item, i) => ({ icon: a11yIcons[i], ...item }));

  return (
    <Layout>
      <section className="relative bg-muted/50 py-12 md:py-16 overflow-hidden">
        {/* Subtle indigo gradient overlay — trust/security theme */}
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
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{t('hero.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative section-padding overflow-hidden">
        {/* Faint sky-blue radial wash behind section */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[700px]"
          style={{
            background: 'radial-gradient(ellipse, hsl(195 85% 62% / 0.05), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="container relative">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection className="mb-12 text-center">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                {/* Radial glow behind icon */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ boxShadow: 'var(--glow-sky)' }}
                  aria-hidden="true"
                />
                <ShieldCheck className="h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t('securityTitle')}</h2>
            </AnimatedSection>
            <StaggeredChildren className="grid gap-8 md:grid-cols-2" stagger={0.1}>
              {securityFeatures.map((feature, index) => (
                <StaggeredItem key={index}>
                  <InfoCard {...feature} />
                </StaggeredItem>
              ))}
            </StaggeredChildren>
          </div>
        </div>
      </section>

      <section className="relative bg-muted/30 py-16 md:py-24 overflow-hidden">
        {/* Faint coral radial glow behind accessibility section */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px]"
          style={{
            background: 'radial-gradient(ellipse, hsl(349 75% 63% / 0.04), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="container relative">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection className="mb-12 text-center">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {/* Radial glow behind icon */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ boxShadow: 'var(--glow-coral)' }}
                  aria-hidden="true"
                />
                <Users2 className="h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t('accessibilityTitle')}</h2>
            </AnimatedSection>
            <StaggeredChildren className="grid gap-8 md:grid-cols-2" stagger={0.1}>
              {accessibilityFeatures.map((feature, index) => (
                <StaggeredItem key={index}>
                  <InfoCard {...feature} />
                </StaggeredItem>
              ))}
            </StaggeredChildren>
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" fill="hsl(var(--secondary))" />

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center text-secondary-foreground">
            <Lock className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-bold">{t('privacyPromise.title')}</h2>
            <p className="mt-4 text-secondary-foreground/80">{t('privacyPromise.description')}</p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default TurvallisuusJaSaavutettavuus;
