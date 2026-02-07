import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-6xl font-bold text-primary">404</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Sivua ei löytynyt</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Valitettavasti etsimääsi sivua ei ole olemassa tai se on siirretty.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                  Etusivulle
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/yhteystiedot">
                  <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                  Ota yhteyttä
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
