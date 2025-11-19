"use client";

import { useState } from "react";
import Head from "next/head";
import {
  Ticket,
  Users,
  Wrench,
  ClipboardList,
  Mail,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { setAuthToken, setUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Define a URL da API - usa variável de ambiente ou fallback
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const response = await axios.post(
        `${apiUrl}/usuario/login`,
        { email, senha },
        {
          timeout: 10000, // 10 segundos de timeout
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { token, user } = response.data;

      // Salva token e usuário no localStorage
      setAuthToken(token);
      setUser(user);

      // Redireciona para o dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      
      // Tratamento mais específico de erros
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
        setError("Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 3001.");
      } else if (err.response) {
        // Erro da API
        const status = err.response.status;
        const message = err.response.data?.mensagem || err.response.data?.message;
        
        if (status === 500) {
          setError("Erro interno do servidor. Verifique se o banco de dados está conectado.");
        } else if (status === 401) {
          setError("Email ou senha incorretos.");
        } else if (message) {
          setError(message);
        } else {
          setError(`Erro ${status}: Falha na comunicação com o servidor.`);
        }
      } else if (err.request) {
        setError("Sem resposta do servidor. Verifique sua conexão de internet.");
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Zelos - Login</title>
        <meta
          name="description"
          content="Plataforma de Gerenciamento de Chamados SENAI"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex font-inter">
        {/* Lado Esquerdo - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-green-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-900"></div>

          {/* Elementos decorativos */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-sky-400/20 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-20 h-20 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-sky-400/25 rounded-full"></div>

          <div className="relative z-10 flex flex-col justify-center items-start px-16 py-20">
            <div className="mb-12 flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Ticket className="text-green-700 text-xl" />
              </div>
              <div>
                <h1 className="text-white text-3xl font-bold">Zelos</h1>
                <p className="text-green-200 text-sm">
                  Plataforma de Chamados SENAI
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Funcionalidades */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Gerenciamento de Usuários
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Cadastre alunos e técnicos, organize permissões e controle
                    o acesso ao sistema.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Ticket className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Abertura de Chamados
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Alunos registram solicitações para consertar equipamentos ou
                    objetos do SENAI.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Atendimento Técnico
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Técnicos recebem e aceitam chamados para iniciar o
                    atendimento.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Apontamentos Técnicos
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Registre observações, diagnósticos e andamento do chamado
                    durante o processo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Logo mobile */}
            <div className="lg:hidden flex justify-center items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                  <Ticket className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-green-700 text-2xl font-bold">Zelos</h1>
                  <p className="text-gray-500 text-xs">
                    Plataforma de Chamados SENAI
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-gray-900 text-2xl font-semibold mb-2">
                Bem-vindo de volta
              </h2>
              <p className="text-gray-600 text-sm">
                Faça login para acessar o painel de chamados
              </p>
            </div>

            {error && (
              <p className="text-red-500 mb-4 text-center">{error}</p>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Endereço de e-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-500"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Mail className="text-gray-400 text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-500"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePassword}
                  >
                    {passwordVisible ? (
                      <Eye className="text-gray-400 text-sm hover:text-gray-600 transition duration-200" />
                    ) : (
                      <EyeOff className="text-gray-400 text-sm hover:text-gray-600 transition duration-200" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
