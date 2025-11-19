"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    funcao: "",
    id_pool: "",
  });

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const { nome, email, senha, funcao, id_pool } = form;

      let payload = { nome, email, senha, funcao };
      let url = "";

      if (funcao === "tecnico") {
        // Se for técnico → rota de técnico
        payload.id_pool = id_pool;
        url = "http://localhost:3001/usuario/createTechnician";
      } else {
        // Se for aluno ou adm → rota normal
        url = "http://localhost:3001/usuario/cadastro";
      }

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      setMensagem("✅ Usuário cadastrado com sucesso!");
      setForm({ nome: "", email: "", senha: "", funcao: "", id_pool: "" });
    } catch (error) {
      console.error("Erro ao cadastrar:", error.response?.data || error.message);
      setMensagem(
        "❌ " + (error.response?.data?.mensagem || "Erro ao cadastrar usuário.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Cadastro de Usuário
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Digite o nome completo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="exemplo@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <p className="text-xs text-gray-500 mt-1">
              Aceito apenas: @gmail, @hotmail, @outlook ou @exemplo
            </p>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              placeholder="6 a 8 caracteres com pelo menos 1 número"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          {/* Função */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Função
            </label>
            <select
              name="funcao"
              value={form.funcao}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-800"
            >
              <option value="">Selecione</option>
              <option value="aluno">Aluno</option>
              <option value="tecnico">Técnico</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          {/* id_pool só aparece se for técnico */}
          {form.funcao === "tecnico" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área do Técnico
              </label>
              <select
                name="id_pool"
                value={form.id_pool}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-800"
              >
                <option value="">Selecione a área</option>
                <option value="1">Manutenção</option>
                <option value="2">Externo</option>
                <option value="3">Apoio Técnico</option>
                <option value="4">Limpeza</option>
              </select>
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {mensagem && (
          <p
            className={`mt-4 text-center font-medium ${
              mensagem.includes("sucesso") ? "text-green-700" : "text-red-600"
            }`}
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}
