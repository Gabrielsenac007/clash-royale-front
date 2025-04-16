import CardDashboard from '../components/CardDashboard';
import { FaCrown, FaChartBar, FaUsers } from 'react-icons/fa';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <CardDashboard title="Batalhas" icon={<FaCrown />} to="/batalhas" />
          <CardDashboard title="Estatísticas" icon={<FaChartBar />} to="/estatisticas" />
          <CardDashboard title="Jogadores" icon={<FaUsers />} to="/jogadores" />
        </div>
      </div>
    </div>
  );
}
