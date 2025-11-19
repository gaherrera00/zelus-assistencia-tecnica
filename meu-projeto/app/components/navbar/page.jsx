"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser, logout } from '../../../utils/auth';
import { authAPI } from '../../../utils/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    }
  }, []);

  // Fechar menu do usuário quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      logout();
      setUser(null);
      setLoading(false);
      setIsUserMenuOpen(false);
      router.push('/');
    }
  };

  return (
    <nav className="bg-gray-100 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#084438] font-family:'Roboto' ">Zelus</span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center space-x-3">
              {/* Menu do usuário */}
              <div className="relative user-menu-container">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-[#084438] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#084438] focus:ring-opacity-50 rounded-lg px-3 py-2"
                >
                  <div className="w-8 h-8 bg-[#084438] rounded-full flex items-center justify-center text-white font-semibold">
                    {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden md:block font-medium">
                    {user.nome}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* Cabeçalho do usuário */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#084438] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.nome}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {user.funcao && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#084438] text-white capitalize">
                                {user.funcao === 'aluno' ? 'Aluno' : 
                                 user.funcao === 'tecnico' ? 'Técnico' : 
                                 user.funcao === 'gerente' ? 'Administrador' : user.funcao}
                              </span>
                            )}
                            {user.funcao === 'aluno' && user.ra && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                RA: {user.ra}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Opções do menu */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          router.push('/dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                        </svg>
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          router.push('/chamadosEnviados');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Meus Chamados</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          router.push('/apontamentos');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Apontamentos</span>
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>{loading ? 'Saindo...' : 'Sair'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <a href="/login">
              <button
                type="button"
                className="text-white bg-[#084438] hover:bg-[#A8B8B5] hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-[#a8b8b5] font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Login
              </button>
            </a>
          )}
          {/* Botão de hambúguer para telas menores */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleMenu}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Abrir menu</span>
            {/* Ícone de hambúguer */}
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Menu de navegação */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'
            }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100 md:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-[#084438] rounded-sm md:bg-transparent md:text-[#084438] md:p-0 md:hover:text-[#A8B8B5]"
                aria-current="page"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/sobre"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A8B8B5] md:p-0"
              >
                Sobre
              </a>
            </li>
            {user && (
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A8B8B5] md:p-0"
                >
                  Dashboard
                </a>
              </li>
            )}
            <li>
              <a
                href="/criarChamado"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A8B8B5] md:p-0"
              >
                Chamados
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}