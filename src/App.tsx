import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LocaleRedirect } from '@/components/layout/LocaleRedirect';
import { LocaleLayout } from '@/components/layout/LocaleLayout';
import Index from './pages/Index';
import Ominaisuudet from './pages/Ominaisuudet';
import Ratkaisut from './pages/Ratkaisut';
import TurvallisuusJaSaavutettavuus from './pages/TurvallisuusJaSaavutettavuus';
import Aloita from './pages/Aloita';
import Yhteystiedot from './pages/Yhteystiedot';
import NotFound from './pages/NotFound';

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = (): React.ReactNode => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      {/* Root → detect language and redirect */}
      <Route index element={<LocaleRedirect />} />

      {/* Finnish routes */}
      <Route path="fi" element={<LocaleLayout />}>
        <Route index element={<Index />} />
        <Route path="ominaisuudet" element={<Ominaisuudet />} />
        <Route path="ratkaisut" element={<Ratkaisut />} />
        <Route path="turvallisuus-ja-saavutettavuus" element={<TurvallisuusJaSaavutettavuus />} />
        <Route path="palvelu" element={<Aloita />} />
        <Route path="yhteystiedot" element={<Yhteystiedot />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* English routes */}
      <Route path="en" element={<LocaleLayout />}>
        <Route index element={<Index />} />
        <Route path="features" element={<Ominaisuudet />} />
        <Route path="solutions" element={<Ratkaisut />} />
        <Route path="security-and-accessibility" element={<TurvallisuusJaSaavutettavuus />} />
        <Route path="service" element={<Aloita />} />
        <Route path="contact" element={<Yhteystiedot />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Catch-all → redirect to locale */}
      <Route path="*" element={<LocaleRedirect />} />
    </Routes>
    <Toaster position="top-right" richColors />
  </BrowserRouter>
);

export default App;
