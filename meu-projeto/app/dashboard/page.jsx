"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser } from "../../utils/auth";
import { chamadoAPI } from "../../utils/api";

const poolMap = {
  1: "manutenção",
  2: "externo",
  3: "apoio técnico",
  4: "limpeza",
};

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
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
    fetchChamados();
  }, [router]);

  const fetchChamados = async () => {
    try {
      setLoading(true);
      const data = await chamadoAPI.listar(); // deve retornar todos os chamados
      setChamados(data);
    } catch (err) {
      setError("Erro ao carregar chamados: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAceitarChamado = async (id_chamado) => {
    if (user?.funcao === "tecnico") {
      const chamadoAtual = chamados.find(
        (c) => c.status === "em andamento" && c.id_tecnico === user.id_usuario
      );
      if (chamadoAtual && chamadoAtual.id_chamado !== id_chamado) {
        alert(
          "Você já tem um chamado em andamento. Finalize o atual antes de aceitar outro."
        );
        return;
      }
    }

    try {
      await chamadoAPI.atualizar(id_chamado, {
        status: "em andamento",
        id_tecnico: user.id_usuario,
      });
      await fetchChamados();
      alert("Chamado aceito com sucesso!");
    } catch (err) {
      alert("Erro ao aceitar chamado: " + err.message);
    }
  };

  const handleAlterarStatus = async (id_chamado, novoStatus) => {
    try {
      await chamadoAPI.atualizar(id_chamado, {
        status: novoStatus,
        fim: novoStatus === "concluído" ? new Date().toISOString() : null,
      });
      await fetchChamados();
      alert(`Status alterado para "${novoStatus}" com sucesso!`);
    } catch (err) {
      alert("Erro ao alterar status: " + err.message);
    }
  };

  const handleExcluirChamado = async (id_chamado) => {
    if (!confirm("Deseja realmente excluir este chamado?")) return;

    try {
      await chamadoAPI.deletar(id_chamado);
      await fetchChamados();
      alert("Chamado excluído com sucesso!");
    } catch (err) {
      alert("Erro ao excluir chamado: " + err.message);
    }
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleString("pt-BR") : "-";

  if (loading) return <div className="text-white text-xl">Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Filtrar chamados para o aluno
  const chamadosVisiveis =
    user?.funcao === "aluno"
      ? chamados.filter((c) => c.criado_por === user.id_usuario)
      : chamados;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Dashboard - {user?.nome} ({user?.funcao})
      </h1>

      {chamadosVisiveis.length === 0 ? (
        <p className="text-white">Nenhum chamado encontrado.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Detalhes</th>
                <th>Status</th>
                <th>Área</th>
                <th>Criado por</th>
                <th>Técnico</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Duração (s)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chamadosVisiveis.map((c) => (
                <tr key={c.id_chamado} className="hover:bg-gray-50">
                  <td>{c.id_chamado}</td>
                  <td>{c.nome}</td>
                  <td>{c.detalhes || "Sem detalhes"}</td>
                  <td>{c.status}</td>
                  <td>{poolMap[c.id_pool]}</td>
                  <td>{c.criado_por}</td>
                  <td>{c.id_tecnico || "Não atribuído"}</td>
                  <td>{formatDate(c.comeco)}</td>
                  <td>{formatDate(c.fim)}</td>
                  <td>{c.duracao || "-"}</td>
                  <td className="flex flex-col gap-1">
                    {user?.funcao === "tecnico" && c.status === "pendente" && (
                      <button
                        onClick={() => handleAceitarChamado(c.id_chamado)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Aceitar
                      </button>
                    )}
                    {(user?.funcao === "tecnico" || user?.funcao === "administrador") &&
                      c.status === "em andamento" && (
                        <button
                          onClick={() =>
                            handleAlterarStatus(c.id_chamado, "concluído")
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Finalizar
                        </button>
                      )}
                    {user?.funcao === "administrador" &&
                      c.status === "em andamento" && (
                        <button
                          onClick={() => handleExcluirChamado(c.id_chamado)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Excluir
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
