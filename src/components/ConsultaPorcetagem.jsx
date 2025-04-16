import { useState } from 'react';
import axios from 'axios';

export default function ConsultaPorcentagem() {
  const [nomeCarta, setNomeCarta] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarPorcentagens = async () => {
    if (!nomeCarta.trim()) return;

    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      const res = await axios.get(`http://localhost:3000/batalhas/vitorias-derrotas/${nomeCarta}`);
      setResultado(res.data);
    } catch (err) {
      console.error(err);
      setErro('Erro ao buscar os dados. Verifique o nome da carta ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center">
      {/* 🔲 Imagem de fundo */}
      <div className="absolute inset-0 bg-[url('/carta.jpg')] bg-cover bg-center z-0"></div>
  
      {/* 🔲 Overlay escura */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
  
      {/* 🔲 Conteúdo */}
      <div className="relative z-10 p-8 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">📈 Consulta de Porcentagem</h1>
  
        <div className="w-full max-w-md flex gap-2 mb-6">
          <input
            type="text"
            value={nomeCarta}
            onChange={e => setNomeCarta(e.target.value)}
            placeholder="Digite o nome da carta"
            className="flex-1 p-3 rounded-lg bg-[#2c2c3e] text-white placeholder-gray-400 border border-gray-600"
          />
          <button
            onClick={buscarPorcentagens}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
          >
            Buscar
          </button>
        </div>
  
        {loading && <p className="text-gray-300">Carregando...</p>}
  
        {erro && <p className="text-red-500">{erro}</p>}
  
        {resultado && (
          <div className="bg-[#2c2c3e] p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              Resultado para: <span className="text-blue-400">{nomeCarta}</span>
            </h2>
            <p>Total de batalhas: <strong>{resultado.total}</strong></p>
            <p className="text-green-400">✅ Vitórias: {resultado.porcentagemVitorias}%</p>
            <p className="text-red-400">❌ Derrotas: {resultado.porcentagemDerrotas}%</p>
          </div>
        )}
      </div>
    </div>
  );
  
}
