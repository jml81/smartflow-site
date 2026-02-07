import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
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

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="card-elevated rounded-xl border border-border p-6 md:p-8">
      <div className="feature-icon">{icon}</div>
      <h3 className="mt-5 text-lg font-semibold md:text-xl">{title}</h3>
      <p className="mt-3 text-muted-foreground">{description}</p>
    </div>
  );
}

interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
}

function BenefitItem({ icon, text }: BenefitItemProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="text-secondary-foreground/90">{text}</span>
    </li>
  );
}

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" aria-hidden="true" />,
      title: 'Erinomainen saavutettavuus',
      description:
        'WCAG AA -tason mukainen saavutettavuus varmistaa, että kaikki käyttäjät voivat asioida sujuvasti.',
    },
    {
      icon: <Users className="h-6 w-6" aria-hidden="true" />,
      title: 'Huippuluokan käyttäjäkokemus',
      description:
        'Intuitiivinen ja helppokäyttöinen käyttöliittymä, joka on suunniteltu loppukäyttäjää ajatellen.',
    },
    {
      icon: <Zap className="h-6 w-6" aria-hidden="true" />,
      title: 'Moderni teknologia',
      description:
        'Valmiit click-and-go-integraatiot keskeisiin SaaS-palveluihin nopeuttavat käyttöönottoa.',
    },
    {
      icon: <Lock className="h-6 w-6" aria-hidden="true" />,
      title: 'Korkea tietoturva',
      description: 'ISO27001-sertifioitu tietoturva ja GDPR-yhteensopivuus takaavat tietosuojan.',
    },
  ];

  const organizationBenefits = [
    {
      icon: <Settings className="h-4 w-4" aria-hidden="true" />,
      text: 'Hallintaportaalin sisällön, ulkoasun, palveluiden ja työnkulkujen muokkaamiseen',
    },
    {
      icon: <Fingerprint className="h-4 w-4" aria-hidden="true" />,
      text: 'Kevyen tai vahvan tunnistautumisen',
    },
    {
      icon: <UserCog className="h-4 w-4" aria-hidden="true" />,
      text: 'Kytkeytymisen asiakkaan käyttäjähallintaan',
    },
    {
      icon: <CreditCard className="h-4 w-4" aria-hidden="true" />,
      text: 'Kytkeytymisen yleisimpiin maksupalveluihin',
    },
    {
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
      text: 'Tekstiviestien ja sähköpostien lähetyksen alustalta',
    },
  ];

  const customerBenefits = [
    {
      icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
      text: 'Helppokäyttöiset ja yhdenmukaiset digitaaliset palvelut',
    },
    {
      icon: <Eye className="h-4 w-4" aria-hidden="true" />,
      text: 'Mahdollisuuden omien tietojen tarkasteluun ja päivittämiseen',
    },
    {
      icon: <History className="h-4 w-4" aria-hidden="true" />,
      text: 'Näkymän omaan asiointihistoriaan',
    },
    {
      icon: <Clock className="h-4 w-4" aria-hidden="true" />,
      text: 'Omien keskeneräisten asioiden tilan seurannan',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold leading-tight text-secondary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              SmartFlow – markkinoiden paras{' '}
              <span className="text-gradient">sähköisen asioinnin</span> alusta
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-foreground/80 md:text-xl">
              Tarjoa asiakkaillesi sujuvia, saavutettavia ja turvallisia digitaalisia palveluja
              yhdenmukaisella käyttäjäkokemuksella.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <Link to="/yhteystiedot">
                  Varaa demo
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/ominaisuudet">Lue lisää ominaisuuksista</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="section-padding bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Saumaton integraatio nykyisiin järjestelmiin
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              SmartFlow integroituu saumattomasti olemassa oleviin verkkosivuihin ja
              taustajärjestelmiin. Tarjoa yhdenmukainen asiointikokemuksen palvelusta riippumatta ja
              tue yhtenäistä brändi-ilmettä läpi koko asiointipolun.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Miksi valita SmartFlow?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Rakennettu vastaamaan nykyaikaisen digitaalisen asioinnin vaatimuksia.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">
                Asiakkaanamme saat
              </h2>
              <ul className="mt-8 space-y-4">
                {organizationBenefits.map((benefit, index) => (
                  <BenefitItem key={index} {...benefit} />
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">
                Asiakkaasi saavat
              </h2>
              <ul className="mt-8 space-y-4">
                {customerBenefits.map((benefit, index) => (
                  <BenefitItem key={index} {...benefit} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-muted p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Valmis aloittamaan?</h2>
            <p className="mt-4 text-muted-foreground">
              Ota yhteyttä ja selvitetään yhdessä, miten SmartFlow voi tehostaa organisaatiosi
              digitaalista asiointia.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/yhteystiedot">
                  Ota yhteyttä
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/aloita">Katso hinnoittelu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
