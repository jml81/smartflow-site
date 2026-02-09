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
  Rocket,
  MessageSquare,
  Settings,
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Cog,
} from 'lucide-react';

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function StepCard({ number, icon, title, description }: StepCardProps): React.ReactNode {
  return (
    <div className="relative flex h-full flex-col items-center text-center">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          {icon}
        </div>
        {/* Pulse ring behind icon */}
        <div
          className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse-ring"
          aria-hidden="true"
        />
        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
          {number}
        </span>
      </div>
      <h3 className="mt-6 text-lg font-semibold md:text-xl">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

function ProcessConnector(): React.ReactNode {
  return (
    <>
      {/* Desktop: horizontal connector line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-8 hidden lg:block"
        aria-hidden="true"
      >
        <svg className="mx-auto w-full max-w-3xl" viewBox="0 0 800 4" fill="none">
          <line
            x1="80"
            y1="2"
            x2="720"
            y2="2"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.3"
          />
        </svg>
      </div>
      {/* Mobile: vertical connector line between steps */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-px sm:hidden"
        aria-hidden="true"
      >
        <svg className="h-full w-1" viewBox="0 0 2 400" preserveAspectRatio="none" fill="none">
          <line
            x1="1"
            y1="40"
            x2="1"
            y2="360"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.3"
          />
        </svg>
      </div>
    </>
  );
}

const stepIcons = [
  <MessageSquare className="h-7 w-7" aria-hidden="true" />,
  <Settings className="h-7 w-7" aria-hidden="true" />,
  <Rocket className="h-7 w-7" aria-hidden="true" />,
  <Sparkles className="h-7 w-7" aria-hidden="true" />,
];

const Aloita = (): React.ReactNode => {
  const { t } = useTranslation('start');
  const lp = useLocalePath();

  usePageMeta({
    title: t('meta.title'),
    description: t('meta.description'),
  });

  const steps = (
    t('steps', { returnObjects: true }) as { title: string; description: string }[]
  ).map((step, i) => ({
    number: i + 1,
    icon: stepIcons[i],
    ...step,
  }));

  const includedItems = t('includedItems', { returnObjects: true }) as string[];

  return (
    <Layout>
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{t('hero.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">{t('processTitle')}</h2>
          </AnimatedSection>
          <div className="relative mt-12">
            <ProcessConnector />
            <StaggeredChildren className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
              {steps.map((step) => (
                <StaggeredItem key={step.number}>
                  <StepCard {...step} />
                </StaggeredItem>
              ))}
            </StaggeredChildren>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" fill="hsl(var(--secondary))" />

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection className="text-center text-secondary-foreground">
              <h2 className="text-2xl font-bold sm:text-3xl">{t('includedTitle')}</h2>
            </AnimatedSection>
            <StaggeredChildren
              as="ul"
              className="mt-10 grid gap-4 text-secondary-foreground sm:grid-cols-2"
              stagger={0.06}
            >
              {includedItems.map((item, index) => (
                <StaggeredItem key={index} as="li">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                </StaggeredItem>
              ))}
            </StaggeredChildren>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" fill="hsl(var(--background))" flip />

      <section className="section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
              <h2 className="text-2xl font-bold">{t('pricing.title')}</h2>
              <p className="mt-4 text-muted-foreground">{t('pricing.description')}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={lp('contact')}>
                    <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                    {t('pricing.ctaDemo')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={lp('contact')}>{t('pricing.ctaQuote')}</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <StaggeredChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            <StaggeredItem>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <Users className="h-10 w-10 text-primary animate-float-slow" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{t('support.training.title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('support.training.description')}</p>
              </div>
            </StaggeredItem>
            <StaggeredItem>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <Cog
                  className="h-10 w-10 text-primary animate-float-slow-reverse"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold">{t('support.technical.title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('support.technical.description')}</p>
              </div>
            </StaggeredItem>
            <StaggeredItem>
              <div className="h-full rounded-xl border border-border bg-card p-6 md:col-span-2 lg:col-span-1">
                <Sparkles
                  className="h-10 w-10 text-primary animate-float-slow-alt"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold">{t('support.development.title')}</h3>
                <p className="mt-2 text-muted-foreground">{t('support.development.description')}</p>
              </div>
            </StaggeredItem>
          </StaggeredChildren>
        </div>
      </section>
    </Layout>
  );
};

export default Aloita;
