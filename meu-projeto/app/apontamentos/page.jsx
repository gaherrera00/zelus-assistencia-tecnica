"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { chamadoAPI } from "../../utils/api";
import { getUser } from "../../utils/auth";

export default function NovoApontamento() {
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = getUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    setLoading(true);
    try {
      await chamadoAPI.criarApontamento({
        id_usuario: user.id_usuario,
        apontamento: descricao,
      });
      setDescricao("");
      router.push("/meus-apontamentos"); // redireciona depois de salvar
    } catch (err) {
      alert("Erro ao salvar apontamento: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#084438] to-green-700 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Novo Apontamento
        </h1>

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição do apontamento..."
          className="w-full p-3 border rounded-lg mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
          rows="4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar Apontamento"}
        </button>
      </form>
    </div>
  );
}
