"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser } from "../../utils/auth";
import { chamadoAPI } from "../../utils/api"; // supondo que você vai expor apontamentos aqui tbm

export default function MeusApontamentos() {
  const [apontamentos, setApontamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    const userData = getUser();
    setUser(userData);
    fetchApontamentos(userData.id_usuario);
  }, [router]);

  const fetchApontamentos = async (idUsuario) => {
    try {
      const data = await chamadoAPI.listarApontamentos(idUsuario);
      setApontamentos(data);
    } catch (err) {
      setError("Erro ao carregar apontamentos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("pt-BR");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700 flex items-center justify-center">
        <div className="text-white text-xl">Carregando apontamentos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-200 mb-4">{error}</p>
          <button
            onClick={() => fetchApontamentos(user?.id_usuario)}
            className="px-4 py-2 bg-white text-green-800 rounded-lg hover:bg-gray-100"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Apontamentos - {user?.nome}
            </h1>
            <p className="text-green-100 mt-2">
              Você possui {apontamentos.length} apontamento(s) registrado(s) nos
              seus chamados
            </p>
          </div>
        </div>

        {apontamentos.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-50 border-b">
              <h3 className="text-lg font-semibold text-blue-800">
                Seus Apontamentos
              </h3>
              <p className="text-blue-600 text-sm">
                Histórico de retornos feitos pelos técnicos
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Chamado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Apontamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Técnico
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Início
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duração (segundos)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apontamentos.map((ap) => (
                    <tr key={ap.id_apontamentos} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ap.id_chamado}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs">
                          <p className="truncate" title={ap.apontamento}>
                            {ap.apontamento}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ap.tecnico_responsavel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(ap.comeco)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(ap.fim)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ap.duracao ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-white text-xl">
            Nenhum apontamento encontrado nos seus chamados.
          </div>
        )}
      </div>
    </div>
  );
}
