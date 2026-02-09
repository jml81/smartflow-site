import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { useLocalePath } from '@/hooks/use-locale-path';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = (): React.ReactNode => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <Layout>
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-7xl font-bold text-primary animate-glitch sm:text-8xl md:text-9xl">
              404
            </p>
            <AnimatedSection delay={0.2}>
              <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t('notFound.title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="mt-4 text-lg text-muted-foreground">{t('notFound.description')}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={lp('home')}>
                    <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                    {t('notFound.goHome')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={lp('contact')}>
                    <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                    {t('notFound.goContact')}
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
