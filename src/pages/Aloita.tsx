import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
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

function StepCard({ number, icon, title, description }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          {icon}
        </div>
        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
          {number}
        </span>
      </div>
      <h3 className="mt-6 text-lg font-semibold md:text-xl">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

const Aloita = () => {
  const steps = [
    {
      number: 1,
      icon: <MessageSquare className="h-7 w-7" aria-hidden="true" />,
      title: 'Keskustellaan',
      description: 'Kartoitamme organisaatiosi tarpeet ja tavoitteet.',
    },
    {
      number: 2,
      icon: <Settings className="h-7 w-7" aria-hidden="true" />,
      title: 'Räätälöidään',
      description: 'Suunnittelemme ratkaisun juuri teidän prosesseihinne.',
    },
    {
      number: 3,
      icon: <Rocket className="h-7 w-7" aria-hidden="true" />,
      title: 'Käyttöönotto',
      description: 'Autamme alustan käyttöönotossa ja integroinnissa.',
    },
    {
      number: 4,
      icon: <Sparkles className="h-7 w-7" aria-hidden="true" />,
      title: 'Tuotantoon',
      description: 'SmartFlow on valmis palvelemaan asiakkaitanne.',
    },
  ];

  const includedItems = [
    'Täysi WCAG AA -saavutettavuus',
    'ISO27001-tason tietoturva',
    'GDPR-yhteensopiva tietojenkäsittely',
    'Hallintaportaali sisällön ja työnkulkujen muokkaamiseen',
    'Kevyt ja vahva tunnistautuminen',
    'Integraatiot käyttäjähallintaan ja maksupalveluihin',
    'Viestintäominaisuudet (SMS, sähköposti)',
    'Tekninen tuki ja koulutus',
  ];

  return (
    <Layout>
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Miten aloitamme?</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              SmartFlow-alustan käyttöönotto on suoraviivainen prosessi.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Käyttöönottoprosessi</h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="text-center text-secondary-foreground">
              <h2 className="text-2xl font-bold sm:text-3xl">Mitä SmartFlow sisältää?</h2>
            </div>
            <ul className="mt-10 grid gap-4 text-secondary-foreground sm:grid-cols-2">
              {includedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold">Hinnoittelu räätälöidään tarpeisiinne</h2>
            <p className="mt-4 text-muted-foreground">
              Hinnoittelu perustuu organisaationne kokoon, käyttäjämäärään ja tarvittaviin
              integraatioihin.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/yhteystiedot">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  Varaa demo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/yhteystiedot">Pyydä tarjous</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <Users className="h-10 w-10 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">Koulutus</h3>
              <p className="mt-2 text-muted-foreground">
                Koulutamme henkilöstönne käyttämään alustaa tehokkaasti.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Cog className="h-10 w-10 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">Tekninen tuki</h3>
              <p className="mt-2 text-muted-foreground">
                Asiantuntijatiimimme on käytettävissänne.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 md:col-span-2 lg:col-span-1">
              <Sparkles className="h-10 w-10 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">Jatkuva kehitys</h3>
              <p className="mt-2 text-muted-foreground">
                Uudet ominaisuudet tulevat käyttöönne automaattisesti.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Aloita;
