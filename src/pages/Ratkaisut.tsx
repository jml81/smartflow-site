import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StaggeredChildren, StaggeredItem } from '@/components/ui/staggered-children';
import { SectionDivider } from '@/components/ui/section-divider';
import { useLocalePath } from '@/hooks/use-locale-path';
import { usePageMeta } from '@/hooks/use-page-meta';
import { Building2, Landmark, HeartPulse, Factory, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaHref: string;
}

function SolutionCard({
  icon,
  title,
  description,
  benefits,
  ctaText,
  ctaHref,
}: SolutionCardProps): React.ReactNode {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      {/* Left accent line that grows on hover */}
      <div className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
      <div className="flex-1 p-6 md:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
          {icon}
        </div>
        <h3 className="mt-5 text-xl font-semibold md:text-2xl">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border bg-muted/30 px-6 py-4 md:px-8">
        <Button asChild variant="ghost" className="group/btn -ml-4 text-primary">
          <Link to={ctaHref}>
            {ctaText}
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </div>
    </div>
  );
}

const solutionIcons = [
  <Landmark className="h-7 w-7" aria-hidden="true" />,
  <Building2 className="h-7 w-7" aria-hidden="true" />,
  <HeartPulse className="h-7 w-7" aria-hidden="true" />,
  <Factory className="h-7 w-7" aria-hidden="true" />,
];

const Ratkaisut = (): React.ReactNode => {
  const { t } = useTranslation('solutions');
  const lp = useLocalePath();

  usePageMeta({
    title: t('meta.title'),
    description: t('meta.description'),
  });

  const solutions = (
    t('cards', { returnObjects: true }) as {
      title: string;
      description: string;
      benefits: string[];
    }[]
  ).map((card, i) => ({
    icon: solutionIcons[i],
    ...card,
    ctaText: t('cardCta'),
    ctaHref: lp('contact'),
  }));

  return (
    <Layout>
      <section className="relative bg-muted/50 py-12 md:py-16 overflow-hidden">
        {/* SVG dot grid pattern */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="ratkaisut-dots"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ratkaisut-dots)" />
        </svg>
        <div className="container relative">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{t('hero.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{t('hero.subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <StaggeredChildren className="grid gap-8 lg:grid-cols-2" stagger={0.12}>
            {solutions.map((solution, index) => (
              <StaggeredItem key={index}>
                <SolutionCard {...solution} />
              </StaggeredItem>
            ))}
          </StaggeredChildren>
        </div>
      </section>

      <SectionDivider variant="curve" fill="hsl(var(--secondary))" />

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center text-secondary-foreground">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('bottomSection.title')}</h2>
            <p className="mt-6 text-lg text-secondary-foreground/80">
              {t('bottomSection.description')}
            </p>
            <div className="mt-10">
              <Button asChild variant="hero" size="lg">
                <Link to={lp('contact')}>
                  {t('bottomSection.cta')}
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

export default Ratkaisut;
