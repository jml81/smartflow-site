import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { HeroBackground } from '@/components/ui/hero-background';
import { SectionDivider } from '@/components/ui/section-divider';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StaggeredChildren, StaggeredItem } from '@/components/ui/staggered-children';
import { GlowCard } from '@/components/ui/glow-card';
import { useLocalePath } from '@/hooks/use-locale-path';
import { usePageMeta } from '@/hooks/use-page-meta';
import {
  Shield,
  Users,
  Zap,
  Lock,
  CheckCircle2,
  ArrowRight,
  Settings,
  Fingerprint,
  UserCog,
  CreditCard,
  Mail,
  Eye,
  History,
  Clock,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps): React.ReactNode {
  return (
    <GlowCard>
      <div className="feature-icon transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold md:text-xl">{title}</h3>
      <p className="mt-3 text-muted-foreground">{description}</p>
    </GlowCard>
  );
}

interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
}

function BenefitItem({ icon, text }: BenefitItemProps): React.ReactNode {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="text-secondary-foreground/90">{text}</span>
    </div>
  );
}

const featureIcons = [
  <Shield className="h-6 w-6" aria-hidden="true" />,
  <Users className="h-6 w-6" aria-hidden="true" />,
  <Zap className="h-6 w-6" aria-hidden="true" />,
  <Lock className="h-6 w-6" aria-hidden="true" />,
];

const orgBenefitIcons = [
  <Settings className="h-4 w-4" aria-hidden="true" />,
  <Fingerprint className="h-4 w-4" aria-hidden="true" />,
  <UserCog className="h-4 w-4" aria-hidden="true" />,
  <CreditCard className="h-4 w-4" aria-hidden="true" />,
  <Mail className="h-4 w-4" aria-hidden="true" />,
];

const custBenefitIcons = [
  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
  <Eye className="h-4 w-4" aria-hidden="true" />,
  <History className="h-4 w-4" aria-hidden="true" />,
  <Clock className="h-4 w-4" aria-hidden="true" />,
];

const Index = (): React.ReactNode => {
  const { t } = useTranslation('home');
  const lp = useLocalePath();

  usePageMeta({
    title: t('meta.title'),
    description: t('meta.description'),
  });

  const features = (
    t('features.items', { returnObjects: true }) as { title: string; description: string }[]
  ).map((item, i) => ({
    icon: featureIcons[i],
    ...item,
  }));

  const orgBenefits = (t('benefits.orgItems', { returnObjects: true }) as string[]).map(
    (text, i) => ({
      icon: orgBenefitIcons[i],
      text,
    }),
  );

  const custBenefits = (t('benefits.customerItems', { returnObjects: true }) as string[]).map(
    (text, i) => ({
      icon: custBenefitIcons[i],
      text,
    }),
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-hero py-16 md:py-24 lg:py-32 overflow-hidden">
        <HeroBackground />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedSection direction="up">
              <h1 className="text-3xl font-bold leading-tight text-secondary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                {t('hero.title')}{' '}
                <span className="text-gradient-shimmer">{t('hero.titleHighlight')}</span>{' '}
                {t('hero.titleEnd')}
              </h1>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-foreground/80 md:text-xl">
                {t('hero.subtitle')}
              </p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild variant="hero" size="lg">
                  <Link to={lp('contact')}>
                    {t('hero.ctaDemo')}
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="lg">
                  <Link to={lp('features')}>{t('hero.ctaFeatures')}</Link>
                </Button>
              </div>
            </AnimatedSection>
            {/* Decorative flow graphic */}
            <div className="mx-auto mt-12 max-w-md" aria-hidden="true">
              <svg
                viewBox="0 0 400 60"
                className="w-full text-secondary-foreground/10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M0,30 Q100,5 200,30 T400,30" strokeDasharray="6 4" />
                <circle cx="50" cy="22" r="3" fill="currentColor" className="animate-pulse-ring" />
                <circle
                  cx="200"
                  cy="30"
                  r="3"
                  fill="currentColor"
                  className="animate-pulse-ring [animation-delay:0.5s]"
                />
                <circle
                  cx="350"
                  cy="22"
                  r="3"
                  fill="currentColor"
                  className="animate-pulse-ring [animation-delay:1s]"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="section-padding bg-muted/50">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{t('integration.title')}</h2>
            <p className="mt-6 text-lg text-muted-foreground">{t('integration.description')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{t('features.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t('features.subtitle')}</p>
          </AnimatedSection>
          <StaggeredChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <StaggeredItem key={index}>
                <FeatureCard {...feature} />
              </StaggeredItem>
            ))}
          </StaggeredChildren>
        </div>
      </section>

      <SectionDivider variant="wave" fill="hsl(var(--secondary))" />

      {/* Benefits */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">
                {t('benefits.orgTitle')}
              </h2>
              <StaggeredChildren as="ul" className="mt-8 space-y-4" stagger={0.08}>
                {orgBenefits.map((benefit, index) => (
                  <StaggeredItem key={index} as="li">
                    <BenefitItem {...benefit} />
                  </StaggeredItem>
                ))}
              </StaggeredChildren>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <h2 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">
                {t('benefits.customerTitle')}
              </h2>
              <StaggeredChildren as="ul" className="mt-8 space-y-4" stagger={0.08}>
                {custBenefits.map((benefit, index) => (
                  <StaggeredItem key={index} as="li">
                    <BenefitItem {...benefit} />
                  </StaggeredItem>
                ))}
              </StaggeredChildren>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" fill="hsl(var(--background))" flip />

      {/* CTA */}
      <section className="section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-muted p-8 text-center md:p-12">
              {/* Radial glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, hsl(349 75% 63% / 0.15), transparent 70%)',
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <h2 className="text-2xl font-bold sm:text-3xl">{t('cta.title')}</h2>
                <p className="mt-4 text-muted-foreground">{t('cta.description')}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link to={lp('contact')}>
                      {t('cta.contact')}
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to={lp('start')}>{t('cta.pricing')}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
