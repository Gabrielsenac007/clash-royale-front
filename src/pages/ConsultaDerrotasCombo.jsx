import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ConsultaDerrotasCombo() {
  const [cartas, setCartas] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarDerrotas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cartas) params.append('cartas', cartas);
      if (inicio) params.append('inicio', inicio);
      if (fim) params.append('fim', fim);

      const response = await axios.get(`http://localhost:3000/batalhas/derrotas-combo?${params}`);
      setResultado(response.data);
    } catch (error) {
      console.error('Erro ao buscar derrotas do combo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* 🔲 Background com imagem */}
      <div className="absolute inset-0 bg-[url('/comboD.png')] bg-cover bg-center z-0"></div>
  
      {/* 🔲 Overlay escura */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
  
      {/* 🔲 Conteúdo */}
      <div className="relative z-10 px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">💥 Derrotas por Combo de Cartas</h1>
  
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Cartas (ex: Valkyrie,Mini P.E.K.K.A)"
            value={cartas}
            onChange={(e) => setCartas(e.target.value)}
            className="p-2 w-[300px] rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
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
            onClick={buscarDerrotas}
            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md shadow-lg"
          >
            🔍 Buscar
          </button>
        </div>
  
        {loading ? (
          <p className="text-center text-xl animate-pulse">⏳ Carregando...</p>
        ) : resultado && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2f2f4f] mx-auto max-w-xl p-6 rounded-xl shadow-2xl border border-red-500/40"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">📉 Resultado</h2>
            <p className="mb-2">
              🧩 <strong>Combo:</strong>{' '}
              <span className="text-blue-300">{resultado.combo.join(', ')}</span>
            </p>
            <p className="text-lg">
              ❌ <strong>Derrotas:</strong>{' '}
              <span className="text-red-400 text-2xl font-bold">{resultado.derrotas}</span>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
  
}
