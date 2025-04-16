import CardDashboard from '../components/CardDashboard';
import { FaCrown, FaChartBar, FaUsers, FaSearch, FaBolt, FaLayerGroup, FaSkull, FaMedal } from 'react-icons/fa';
import { TbPlayCardStarFilled } from "react-icons/tb";


export default function Home() {
  return (
    <div
      className="min-h-screen bg-[url('/clashT.png')] bg-cover bg-center relative flex items-center justify-center p-8 text-white"
      
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-[#1e1e2f]/60 bg-opacity-80 z-0"></div>

      {/* Conteúdo acima da overlay */}
      <div className="w-full relative z-10">
        <h1 className="text-5xl font-bold mb-6 text-center">🏰 Painel Clash Royale</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <CardDashboard title="Batalhas" icon={<FaCrown />} to="/batalhas" />
          <CardDashboard title="Jogadores" icon={<FaUsers />} to="/jogadores" />
          <CardDashboard title="Cartas: Vitória/Derrota" icon={<TbPlayCardStarFilled />} to="/consultas/porcentagem" />
          <CardDashboard title="Decks Vitoriosos" icon={<FaMedal />} to="/consultas/decks-vitoriosos" />
          <CardDashboard title="Derrotas com Combo" icon={<FaSkull />} to="/consultas/derrotas-combo" />
          <CardDashboard title="Combos Eficientes" icon={<FaLayerGroup />} to="/consultas/combos-eficientes" />
        </div>
      </div>
    </div>
  );
}
