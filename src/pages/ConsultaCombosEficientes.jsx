import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ConsultaCombosEficientes() {
  const [n, setN] = useState('');
  const [y, setY] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarCombos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (n) params.append('n', n);
      if (y) params.append('y', y);
      if (inicio) params.append('inicio', inicio);
      if (fim) params.append('fim', fim);

      const response = await axios.get(`http://localhost:3000/estatisticas/combos?${params}`);
      setCombos(response.data.combos);
    } catch (error) {
      console.error('Erro ao buscar combos eficientes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#1a1a2e] to-[#1f1f3b] text-white">
      <h1 className="text-4xl font-bold text-center mb-10">🎯 Combos com Alta Taxa de Vitória</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="number"
          placeholder="Tamanho do combo (ex: 3)"
          value={n}
          onChange={(e) => setN(e.target.value)}
          className="p-2 w-[220px] rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Vitórias mínimas (%)"
          value={y}
          onChange={(e) => setY(e.target.value)}
          className="p-2 w-[220px] rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
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
          onClick={buscarCombos}
          className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-md shadow-lg"
        >
          🔍 Buscar
        </button>
      </div>

      {loading ? (
        <p className="text-center text-xl animate-pulse">🌀 Carregando combos...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {combos.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#2e2e4d] p-5 rounded-xl shadow-xl border border-green-500/40"
            >
              <h2 className="text-lg font-semibold text-green-300 mb-2">Combo #{index + 1}</h2>
              <ul className="list-disc list-inside mb-2 text-sm space-y-1">
                {item.combo.map((carta, i) => (
                  <li key={i} className="text-white">{carta}</li>
                ))}
              </ul>
              <p className="text-sm mt-2">🎯 <strong>Total:</strong> {item.total}</p>
              <p className="text-sm">🏆 <strong>Vitórias:</strong> {item.vitorias}</p>
              <p className="text-sm text-green-400">📊 <strong>Taxa de Vitória:</strong> {item.taxa_vitoria}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
