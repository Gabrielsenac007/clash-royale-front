import { useEffect, useState } from 'react';
import axios from 'axios'; // ou fetch

export default function Batalhas() {
  const [batalhas, setBatalhas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatalhas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/batalhas');
        console.log(response.data);
        setBatalhas(response.data);
      } catch (error) {
        console.error('Erro ao carregar as batalhas', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBatalhas();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-[url('/bat.png')] text-white p-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-yellow-400 drop-shadow-md">
        📊 Histórico de Batalhas
      </h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {batalhas.map((batalha) => (
          <div key={batalha._id} className="bg-[#2c2c3e] rounded-2xl shadow-lg p-6 border border-[#3f3f5a] hover:scale-[1.02] transition-transform">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-2">
              {batalha.jogador_1.nome} vs {batalha.jogador_2.nome}
            </h2>
            <p className="text-sm text-gray-400 mb-1">🗓️ {new Date(batalha.data).toLocaleString()}</p>
            <p className="text-sm mb-2">🏟️ <strong>{batalha.arena}</strong> | 🎮 <strong>{batalha.modo}</strong></p>
            <p className="mb-4">🏆 Resultado: <span className="text-yellow-300 font-bold">{batalha.resultado}</span></p>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[batalha.jogador_1, batalha.jogador_2].map((jogador, i) => (
                <div key={i} className="bg-[#1e1e2f] p-4 rounded-lg border border-[#3a3a50]">
                  <h3 className="text-lg font-semibold text-pink-400">{jogador.nome}</h3>
                  <p className="text-sm">🎯 Troféus Iniciais: {jogador.trofeus_inicio}</p>
                  <p className="text-sm mb-2">📈 Alteração: {jogador.trofeus_change > 0 ? '+' : ''}{jogador.trofeus_change}</p>
                  <div>
                    <h4 className="font-medium text-sm mb-1 mt-2">🃏 Deck:</h4>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-300">
                      {jogador.deck.map((carta, index) => (
                        <li key={index} className="flex justify-between bg-[#33334a] px-2 py-1 rounded">
                          {carta.nome} <span className="text-xs text-blue-300">Nv {carta.nivel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
