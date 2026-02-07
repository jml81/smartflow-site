import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Ominaisuudet from './pages/Ominaisuudet';
import Ratkaisut from './pages/Ratkaisut';
import TurvallisuusJaSaavutettavuus from './pages/TurvallisuusJaSaavutettavuus';
import Aloita from './pages/Aloita';
import Yhteystiedot from './pages/Yhteystiedot';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ominaisuudet" element={<Ominaisuudet />} />
      <Route path="/ratkaisut" element={<Ratkaisut />} />
      <Route path="/turvallisuus-ja-saavutettavuus" element={<TurvallisuusJaSaavutettavuus />} />
      <Route path="/aloita" element={<Aloita />} />
      <Route path="/yhteystiedot" element={<Yhteystiedot />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
