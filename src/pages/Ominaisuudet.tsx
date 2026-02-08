import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StaggeredChildren, StaggeredItem } from '@/components/ui/staggered-children';
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
} from 'lucide-react';

interface FeatureDetailProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureDetail({ icon, title, description }: FeatureDetailProps): React.ReactNode {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg overflow-hidden">
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

const Ominaisuudet = (): React.ReactNode => {
  const coreFeatures = [
    {
      icon: <Palette className="h-6 w-6" aria-hidden="true" />,
      title: 'Hallintaportaali',
      description:
        'Muokkaa sisältöä, ulkoasua, palveluita ja työnkulkuja helposti visuaalisella hallintaportaalilla.',
    },
    {
      icon: <Workflow className="h-6 w-6" aria-hidden="true" />,
      title: 'Työnkulkujen automatisointi',
      description:
        'Rakenna automatisoituja prosesseja, jotka nopeuttavat asiointia ja vähentävät manuaalista työtä.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
      title: 'WCAG AA -saavutettavuus',
      description:
        'Täytä lakisääteiset saavutettavuusvaatimukset ja tarjoa esteettömät palvelut kaikille.',
    },
    {
      icon: <KeyRound className="h-6 w-6" aria-hidden="true" />,
      title: 'Monipuolinen tunnistautuminen',
      description:
        'Tuki sekä kevyelle että vahvalle tunnistautumiselle organisaation tarpeiden mukaan.',
    },
    {
      icon: <Link2 className="h-6 w-6" aria-hidden="true" />,
      title: 'Käyttäjähallintaintegraatio',
      description: 'Kytke alusta olemassa olevaan käyttäjähallintajärjestelmään saumattomasti.',
    },
    {
      icon: <CreditCard className="h-6 w-6" aria-hidden="true" />,
      title: 'Maksupalveluintegraatiot',
      description:
        'Valmiit kytkennät yleisimpiin maksupalveluihin turvallisen verkkomaksamisen mahdollistamiseksi.',
    },
  ];

  const technicalFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6" aria-hidden="true" />,
      title: 'Viestintäominaisuudet',
      description: 'Lähetä tekstiviestejä ja sähköposteja suoraan alustalta asiakasviestintään.',
    },
    {
      icon: <Blocks className="h-6 w-6" aria-hidden="true" />,
      title: 'Click-and-go-integraatiot',
      description: 'Valmiit liitännät keskeisiin SaaS-palveluihin nopeuttavat käyttöönottoa.',
    },
    {
      icon: <Layers className="h-6 w-6" aria-hidden="true" />,
      title: 'Modulaarinen arkkitehtuuri',
      description: 'Skaalautuva ja joustava rakenne, joka sopii monen kokoisille organisaatioille.',
    },
    {
      icon: <Globe className="h-6 w-6" aria-hidden="true" />,
      title: 'Verkkosivuintegraatio',
      description:
        'Upota SmartFlow saumattomasti olemassa oleviin verkkosivuihin brändin mukaisesti.',
    },
  ];

  return (
    <Layout>
      <section className="relative bg-muted/50 py-12 md:py-16 overflow-hidden">
        {/* Soft radial gradient background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, hsl(17 84% 62% / 0.06), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container relative">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Ominaisuudet</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              SmartFlow tarjoaa kattavan valikoiman ominaisuuksia modernin digitaalisen asioinnin
              rakentamiseen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Keskeiset ominaisuudet</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Kaikki mitä tarvitset sähköisen asioinnin rakentamiseen ja hallintaan.
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

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Tekniset vahvuudet</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Moderni teknologia ja laaja integroitavuus helpottavat käyttöönottoa.
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
    </Layout>
  );
};

export default Ominaisuudet;
