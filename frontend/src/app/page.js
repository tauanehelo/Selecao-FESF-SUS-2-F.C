'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [pacientes, setPacientes] = useState([]);
  const [nome, setNome] = useState('');
  const [cns, setCns] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [mensagem, setMensagem] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/pacientes';

  // Buscar pacientes da API
  const carregarPacientes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  // Enviar novo paciente para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cns.length !== 15) {
      alert("O CNS (Cartão SUS) deve ter exatamente 15 dígitos.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cns, sintomas }),
      });

      if (response.ok) {
        setMensagem('Paciente cadastrado com sucesso na triagem!');
        setNome('');
        setCns('');
        setSintomas('');
        carregarPacientes(); // Atualiza a lista
        setTimeout(() => setMensagem(''), 4000);
      } else {
        setMensagem('Erro ao cadastrar paciente. Verifique os dados.');
      }
    } catch (error) {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-700">Seleção FESF-SUS – 2 F.C.</h1>
          <p className="text-gray-600">Sistema de Triagem de Pacientes - Atenção Primária</p>
        </header>

        {mensagem && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded font-medium">
            {mensagem}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Nova Triagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input required type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full rounded border-gray-300 p-2 ring-1 ring-gray-300 text-gray-900 placeholder:text-gray-500" placeholder="Nome do paciente" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CNS (Cartão SUS)</label>
                <input required type="text" maxLength={15} value={cns} onChange={(e) => setCns(e.target.value.replace(/\D/g, ''))} className="mt-1 block w-full rounded border-gray-300 p-2 ring-1 ring-gray-300 text-gray-900 placeholder:text-gray-500" placeholder="Apenas os 15 números" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sintomas / Queixa Principal</label>
                <textarea required rows={3} value={sintomas} onChange={(e) => setSintomas(e.target.value)} className="mt-1 block w-full rounded border-gray-300 p-2 ring-1 ring-gray-300 text-gray-900 placeholder:text-gray-500" placeholder="Ex: Febre alta e dor de cabeça"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium">
                Registrar Triagem
              </button>
            </form>
          </div>

          {/* Listagem */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Fila de Espera / Triados</h2>
            {pacientes.length === 0 ? (
              <p className="text-gray-500 italic">Nenhum paciente aguardando no momento.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">CNS</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sintomas</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pacientes.map((p) => (
                      <tr key={p.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{p.id}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{p.nome}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{p.cns}</td>
                        <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{p.sintomas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}