import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StaggeredChildren, StaggeredItem } from '@/components/ui/staggered-children';
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
    <div className="flex gap-4">
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

const TurvallisuusJaSaavutettavuus = (): React.ReactNode => {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
      title: 'ISO27001-sertifioitu tietoturva',
      description: 'SmartFlow täyttää kansainvälisen ISO27001-tietoturvastandardin vaatimukset.',
    },
    {
      icon: <Lock className="h-6 w-6" aria-hidden="true" />,
      title: 'GDPR-yhteensopivuus',
      description: 'Kaikki henkilötiedot käsitellään EU:n tietosuoja-asetuksen mukaisesti.',
    },
    {
      icon: <Eye className="h-6 w-6" aria-hidden="true" />,
      title: 'Tietojen läpinäkyvyys',
      description: 'Käyttäjille kerrotaan selkeästi, mihin tarkoitukseen tietoja käytetään.',
    },
    {
      icon: <FileCheck className="h-6 w-6" aria-hidden="true" />,
      title: 'Turvallinen tiedonsiirto',
      description: 'Kaikki tiedonsiirto tapahtuu salatun yhteyden kautta.',
    },
  ];

  const accessibilityFeatures = [
    {
      icon: <Users2 className="h-6 w-6" aria-hidden="true" />,
      title: 'WCAG 2.1 AA -tuki',
      description: 'SmartFlow täyttää lakisääteiset saavutettavuusvaatimukset.',
    },
    {
      icon: <Contrast className="h-6 w-6" aria-hidden="true" />,
      title: 'Riittävä kontrasti',
      description: 'Kaikki tekstit ja interaktiiviset elementit täyttävät kontrastivaatimukset.',
    },
    {
      icon: <Keyboard className="h-6 w-6" aria-hidden="true" />,
      title: 'Näppäimistökäytettävyys',
      description: 'Kaikki toiminnot ovat käytettävissä näppäimistöllä.',
    },
    {
      icon: <Monitor className="h-6 w-6" aria-hidden="true" />,
      title: 'Ruudunlukijayhteensopivuus',
      description: 'Semanttinen HTML ja aria-attribuutit varmistavat yhteensopivuuden.',
    },
    {
      icon: <ListChecks className="h-6 w-6" aria-hidden="true" />,
      title: 'Selkeä rakenne',
      description: 'Looginen otsikkohierarkia ja selkeästi merkityt elementit.',
    },
    {
      icon: <FileText className="h-6 w-6" aria-hidden="true" />,
      title: 'Vaihtoehtoiset tekstit',
      description: 'Kaikilla informatiivisilla kuvilla on vaihtoehtoiset tekstit.',
    },
  ];

  return (
    <Layout>
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Turvallisuus ja saavutettavuus
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              SmartFlow on rakennettu korkeimpien tietoturva- ja saavutettavuusstandardien
              mukaisesti.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection className="mb-12 text-center">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                {/* Radial glow behind icon */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ boxShadow: 'var(--glow-blue)' }}
                  aria-hidden="true"
                />
                <ShieldCheck className="h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Tietoturva</h2>
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

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection className="mb-12 text-center">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {/* Radial glow behind icon */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ boxShadow: 'var(--glow-orange)' }}
                  aria-hidden="true"
                />
                <Users2 className="h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Saavutettavuus</h2>
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

      <section className="section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
              <Lock className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-bold">Tietosuojalupaus</h2>
              <p className="mt-4 text-muted-foreground">
                SmartFlow-alustalla henkilötietoja ei yhdistetä tarpeettomasti muuhun dataan.
                Käytämme pseudonymisointia ja erillisiä tietokantoja oletusarvoisina periaatteina.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default TurvallisuusJaSaavutettavuus;
