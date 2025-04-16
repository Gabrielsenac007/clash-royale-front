import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ConsultaDecksVitoriosos() {
  const [limite, setLimite] = useState(5);
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (limite) params.append('limite', limite);
      if (inicio) params.append('inicio', inicio);
      if (fim) params.append('fim', fim);

      const response = await axios.get(`http://localhost:3000/batalhas/decks-vitoriosos?${params}`);
      setDecks(response.data);
    } catch (error) {
      console.error('Erro ao buscar os decks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#1b1b2f] to-[#2a2a40] text-white">
      <h1 className="text-4xl font-bold text-center mb-8">🔥 Decks Vitoriosos 🔥</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="number"
          placeholder="Limite (%)"
          value={limite}
          onChange={(e) => setLimite(e.target.value)}
          className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={fim}
          onChange={(e) => setFim(e.target.value)}
          className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchDecks}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md shadow-lg"
        >
          🔍 Buscar
        </button>
      </div>

      {loading ? (
        <p className="text-center text-xl animate-pulse">⏳ Carregando...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {decks.map((deck, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#2e2e4d] rounded-xl p-6 shadow-xl border border-blue-500/30"
            >
              <h2 className="text-2xl font-bold mb-2">🎯 Deck {index + 1}</h2>
              <p className="text-lg mb-1">🏆 Vitórias: <span className="font-semibold text-green-400">{deck.vitorias}</span></p>
              <p className="text-lg mb-4">📊 Porcentagem de Vitórias: <span className="font-semibold text-yellow-300">{deck.porcentagem}%</span></p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deck.deck.map((carta, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-3 bg-opacity-20 border ${
                      carta.raridade === 'legendary'
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : carta.raridade === 'epic'
                        ? 'border-purple-500 bg-purple-500/10'
                        : carta.raridade === 'rare'
                        ? 'border-blue-400 bg-blue-400/10'
                        : 'border-gray-400 bg-gray-400/10'
                    }`}
                  >
                    <p className="font-bold text-lg">{carta.nome}</p>
                    <p>Nível: {carta.nivel}</p>
                    <p className="capitalize">Raridade: {carta.raridade}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
