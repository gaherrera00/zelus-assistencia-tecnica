"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

export default function GerenUser() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Buscar usuários da API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // token de autenticação
      const response = await axios.get("http://localhost:3001/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ordena usuários alfabeticamente pelo nome
      const sortedUsers = response.data.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para alternar status do usuário
  const handleStatusChange = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = user.status === "ativo" ? "inativo" : "ativo";
      await axios.patch(
        `http://localhost:3001/usuario/status/${user.id_usuario}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Atualiza status localmente
      setUsers((prev) =>
        prev.map((u) =>
          u.id_usuario === user.id_usuario ? { ...u, status: newStatus } : u
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // Função para excluir usuário
  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este usuário?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user.id_usuario !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // Redirecionar para cadastro
  const handleAddUser = () => {
    router.push("/cadastro"); // Ajuste para a rota real do seu formulário
  };

  // Filtrar usuários pelo search
  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 p-6 bg-gray-50 flex flex-col">
  {/* Cabeçalho */}
  <div className="flex justify-between items-center mb-4">
    <button
      onClick={handleAddUser}
      className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
    >
      <Plus className="w-5 h-5 mr-2" />
      Adicionar Usuário
    </button>
    <input
      type="text"
      placeholder="Pesquisar usuários..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 text-gray-800 placeholder-gray-600"
    />
  </div>

  {/* Tabela de usuários */}
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto flex-1">
    <table className="w-full">
      <thead className="bg-gray-50 sticky top-0">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nome</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Função</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {filteredUsers.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
              Nenhum usuário encontrado
            </td>
          </tr>
        ) : (
          filteredUsers.map((user) => (
            <tr key={user.id_usuario} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.nome}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.funcao}</td>
              <td className="px-6 py-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.status === "ativo"}
                    onChange={() => handleStatusChange(user)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-900"></div>
                </label>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(user.id_usuario)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  );
}
