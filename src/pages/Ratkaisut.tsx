import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Building2, Landmark, HeartPulse, Factory, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

function SolutionCard({ icon, title, description, benefits }: SolutionCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      <div className="p-6 md:p-8">
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
          <Link to="/yhteystiedot">
            Keskustellaan tarpeistanne
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

const Ratkaisut = () => {
  const solutions = [
    {
      icon: <Landmark className="h-7 w-7" aria-hidden="true" />,
      title: 'Kunnat ja kaupungit',
      description:
        'Tarjoa kuntalaisille yhtenäinen digitaalinen asiointikokemus kaikissa kunnan palveluissa.',
      benefits: [
        'Yhtenäinen asiointialusta kaikille kunnan palveluille',
        'Lupahakemusten ja ilmoitusten sähköinen käsittely',
        'Asukkaiden tietojen hallinta ja päivitys',
        'Maksujen vastaanotto suoraan alustalla',
      ],
    },
    {
      icon: <Building2 className="h-7 w-7" aria-hidden="true" />,
      title: 'Virastot ja viranomaiset',
      description: 'Digitalisoi viranomaispalvelut turvallisesti ja saavutettavasti.',
      benefits: [
        'Vahvan tunnistautumisen integraatiot',
        'ISO27001-tason tietoturva',
        'Täysi WCAG AA -saavutettavuus',
        'Automaattiset työnkulut ja ilmoitukset',
      ],
    },
    {
      icon: <HeartPulse className="h-7 w-7" aria-hidden="true" />,
      title: 'Hyvinvointialueet',
      description: 'Rakenna sujuva digitaalinen asiointipolku sosiaali- ja terveyspalveluihin.',
      benefits: [
        'Ajanvaraus ja jonotusnumeroiden hallinta',
        'Asiointihistorian seuranta',
        'Turvallinen tiedonsiirto ja viestintä',
        'Integraatiot potilastietojärjestelmiin',
      ],
    },
    {
      icon: <Factory className="h-7 w-7" aria-hidden="true" />,
      title: 'Yritykset ja palveluorganisaatiot',
      description: 'Paranna asiakaskokemusta ja tehosta digitaalista palvelua.',
      benefits: [
        'Asiakasportaali omien tietojen hallintaan',
        'Tilausten ja laskujen seuranta',
        'Tukipyyntöjen ja palautteiden käsittely',
        'Integraatiot CRM- ja ERP-järjestelmiin',
      ],
    },
  ];

  return (
    <Layout>
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Ratkaisut eri toimialoille
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              SmartFlow sopii julkisille organisaatioille ja yrityksille, joilla on tiukat
              vaatimukset tietoturvalle ja saavutettavuudelle.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {solutions.map((solution, index) => (
              <SolutionCard key={index} {...solution} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center text-secondary-foreground">
            <h2 className="text-2xl font-bold sm:text-3xl">Kenelle SmartFlow on tarkoitettu?</h2>
            <p className="mt-6 text-lg text-secondary-foreground/80">
              SmartFlow on suunniteltu organisaatioille, jotka haluavat tarjota asiakkailleen
              yhdenmukaisen, helppokäyttöisen ja turvallisen digitaalisen asiointikokemuksen.
            </p>
            <div className="mt-10">
              <Button asChild variant="hero" size="lg">
                <Link to="/yhteystiedot">
                  Ota yhteyttä
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ratkaisut;
