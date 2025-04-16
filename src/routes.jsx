import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Batalhas from './pages/Batalhas';
import Estatisticas from './pages/Estatisticas';
import Jogadores from './pages/Jogadores';
import ConsultaPorcentagem from './components/ConsultaPorcetagem';
import ConsultaDecksVitoriosos from './pages/ConsultaDecksVitoriosos';
import ConsultaDerrotasCombo from './pages/ConsultaDerrotasCombo';
import ConsultaCombosEficientes from './pages/ConsultaCombosEficientes';

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/batalhas',
    element: <Batalhas />
  },
  {
    path: '/estatisticas',
    element: <Estatisticas />
  },

  {
    path: '/jogadores',
    element: <Jogadores />
  },

  {
    path: '/consultas/porcentagem',
    element: <ConsultaPorcentagem />
  },

  {
     path: '/consultas/decksvitoriosos', 
    element: <ConsultaDecksVitoriosos /> 
  },

  {
    path: '/consultas/derrotas-combo',
    element: <ConsultaDerrotasCombo />
  },

  {
    path: '/consultas/combos-eficientes',
    element: <ConsultaCombosEficientes />
  }

]);
