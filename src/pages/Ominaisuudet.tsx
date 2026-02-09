import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StaggeredChildren, StaggeredItem } from '@/components/ui/staggered-children';
import { SectionDivider } from '@/components/ui/section-divider';
import { useLocalePath } from '@/hooks/use-locale-path';
import { usePageMeta } from '@/hooks/use-page-meta';
import {
  Palette,
  Workflow,
  ShieldCheck,
  KeyRound,
  Link2,
  CreditCard,
  MessageSquare,
  Blocks,
  Layers,
  Globe,
  ArrowRight,
} from 'lucide-react';

interface FeatureDetailProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureDetail({ icon, title, description }: FeatureDetailProps): React.ReactNode {
  return (
    <div className="group relative h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg overflow-hidden">
      {/* Top accent line that scales on hover */}
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:rounded-lg group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

const coreIcons = [
  <Palette className="h-6 w-6" aria-hidden="true" />,
  <Workflow className="h-6 w-6" aria-hidden="true" />,
  <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
  <KeyRound className="h-6 w-6" aria-hidden="true" />,
  <Link2 className="h-6 w-6" aria-hidden="true" />,
  <CreditCard className="h-6 w-6" aria-hidden="true" />,
];

const techIcons = [
  <MessageSquare className="h-6 w-6" aria-hidden="true" />,
  <Blocks className="h-6 w-6" aria-hidden="true" />,
  <Layers className="h-6 w-6" aria-hidden="true" />,
  <Globe className="h-6 w-6" aria-hidden="true" />,
];

const Ominaisuudet = (): React.ReactNode => {
  const { t } = useTranslation('features');
  const lp = useLocalePath();

  usePageMeta({
    title: t('meta.title'),
    description: t('meta.description'),
  });

  const coreFeatures = (
    t('core.items', { returnObjects: true }) as { title: string; description: string }[]
  ).map((item, i) => ({ icon: coreIcons[i], ...item }));

  const technicalFeatures = (
    t('technical.items', { returnObjects: true }) as { title: string; description: string }[]
  ).map((item, i) => ({ icon: techIcons[i], ...item }));

  return (
    <Layout>
      <section className="relative bg-muted/50 py-12 md:py-16 overflow-hidden">
        {/* Strengthened coral radial gradient with indigo base tint */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, hsl(349 75% 63% / 0.10), transparent 60%), linear-gradient(to bottom, hsl(242 40% 25% / 0.03), transparent)',
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
        {/* Subtle coral radial glow behind section heading */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px]"
          style={{
            background: 'radial-gradient(ellipse, hsl(349 75% 63% / 0.05), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="container relative">
          <AnimatedSection>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">{t('core.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              {t('core.subtitle')}
            </p>
          </AnimatedSection>
          <StaggeredChildren
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {coreFeatures.map((feature, index) => (
              <StaggeredItem key={index}>
                <FeatureDetail {...feature} />
              </StaggeredItem>
            ))}
          </StaggeredChildren>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: 'hsl(242 40% 97%)' }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">{t('technical.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              {t('technical.subtitle')}
            </p>
          </AnimatedSection>
          <StaggeredChildren
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
          >
            {technicalFeatures.map((feature, index) => (
              <StaggeredItem key={index}>
                <FeatureDetail {...feature} />
              </StaggeredItem>
            ))}
          </StaggeredChildren>
        </div>
      </section>

      <SectionDivider variant="curve" fill="hsl(var(--secondary))" />

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center text-secondary-foreground">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('cta.title')}</h2>
            <p className="mt-6 text-lg text-secondary-foreground/80">{t('cta.description')}</p>
            <div className="mt-10">
              <Button asChild variant="hero" size="lg">
                <Link to={lp('contact')}>
                  {t('cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Ominaisuudet;
