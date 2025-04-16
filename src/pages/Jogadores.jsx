import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTrophy, FaUserAlt, FaLevelUpAlt, FaClock } from 'react-icons/fa';

export default function Jogadores() {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const response = await axios.get('https://clash-royale-80o9.onrender.com/jogadores');
        setJogadores(response.data);
      } catch (error) {
        console.error('Erro ao buscar jogadores:', error);
      }
    };

    fetchJogadores();
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      {/* 🔲 Imagem de fundo */}
      <div className="absolute inset-0 bg-[url('/jogadores.jpg')] bg-cover bg-center z-0"></div>
  
      {/* 🔲 Overlay escura */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
  
      {/* 🔲 Conteúdo */}
      <div className="relative z-10 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">🎮 Jogadores Cadastrados</h1>
  
        {jogadores.length === 0 ? (
          <p className="text-center text-lg text-gray-300">Nenhum jogador encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {jogadores.map((jogador, index) => (
              <motion.div
                key={jogador._id}
                className="bg-[#2f2f46] rounded-2xl p-6 shadow-md border border-[#3f3f5c]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaUserAlt className="text-2xl text-blue-400" />
                  <h2 className="text-xl font-semibold">{jogador.nickname}</h2>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FaLevelUpAlt className="text-green-400" />
                    <span>Nível: {jogador.nivel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-400" />
                    <span>Troféus: {jogador.trofeus}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    <span>Tempo de Jogo: {jogador.tempo_jogo ?? 'Não informado'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
}
