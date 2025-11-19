"use client";
import { useState } from "react";

export default function CriarChamado() {
  const [nome, setNome] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [idPool, setIdPool] = useState("1"); // default: manutenção
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chamado`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ nome, detalhes, id_pool: idPool }), // 👈 agora envia id_pool
      });

      if (response.ok) {
        setSuccess("Chamado criado com sucesso!");
        setNome("");
        setDetalhes("");
        setIdPool("1"); // resetar para manutenção
      } else {
        setError("Erro ao criar chamado");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-24 mb-24 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Criar Chamado</h2>
      {success && <p className="mb-4 text-green-600">{success}</p>}
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ex: Impressora não funciona"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          placeholder="Detalhes do problema"
          value={detalhes}
          onChange={(e) => setDetalhes(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={4}
          required
        />
        <select
          value={idPool}
          onChange={(e) => setIdPool(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="1">Manutenção</option>
          <option value="2">Externo</option>
          <option value="3">Apoio Técnico</option>
          <option value="4">Limpeza</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition"
        >
          {loading ? "Enviando..." : "Enviar Chamado"}
        </button>
      </form>
    </section>
  );
}
