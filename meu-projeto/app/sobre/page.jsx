"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function SobreNos() {
  const [activeTab, setActiveTab] = useState('historia');

  const estatisticas = [
    { numero: "500+", descricao: "Computadores Consertados" },
    { numero: "3", descricao: "Anos de Experiência" },
    { numero: "100%", descricao: "Clientes Satisfeitos" },
    { numero: "24h", descricao: "Tempo de Resposta" }
  ];

  const valores = [
    {
      icone: "🔧",
      titulo: "Excelência Técnica",
      descricao: "Comprometimento com a qualidade em cada reparo e manutenção realizada."
    },
    {
      icone: "🤝",
      titulo: "Confiança",
      descricao: "Construímos relacionamentos duradouros baseados na transparência e honestidade."
    },
    {
      icone: "💡",
      titulo: "Inovação",
      descricao: "Sempre buscamos as melhores soluções e tecnologias para nossos clientes."
    },
    {
      icone: "❤️",
      titulo: "Paixão",
      descricao: "Amamos o que fazemos e isso se reflete na qualidade do nosso trabalho."
    }
  ];

  const equipe = [
    {
      nome: "Gabriel",
      cargo: "Especialista em Hardware",
      foto: "/gabriel.jpg",
      descricao: "Mestre dos componentes e improvisos criativos. Já resolveu problemas com uma colher e orgulha-se disso!",
      especialidades: ["Hardware", "Manutenção", "Improvisos"]
    },
    {
      nome: "Richard",
      cargo: "Comunicador Criativo",
      foto: "/richard.jpg",
      descricao: "Transforma problemas técnicos complexos em linguagem simples e divertida. O cara das ideias!",
      especialidades: ["Comunicação", "Suporte", "Inovação"]
    },
    {
      nome: "Gustavo",
      cargo: "Técnico Detalhista",
      foto: "/gustavo.jpg",
      descricao: "Viciado em organização e sistemas otimizados. Se há um cabo fora do lugar, ele encontra!",
      especialidades: ["Sistemas", "Organização", "Otimização"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white -m-4 lg:-m-6">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-r from-[#084438] to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            SOBRE <span className="text-yellow-300">NÓS</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Uma história de paixão, tecnologia e muito café nos corredores do SENAI
          </p>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white opacity-20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white opacity-20 rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 border border-white opacity-20 rotate-45"></div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {estatisticas.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-[#084438] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.numero}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.descricao}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Nossa <span className="text-[#084438]">História</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                De uma ideia simples nos corredores do SENAI até uma assistência técnica reconhecida
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#084438] mb-4">🎯 O Início</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Tudo começou com <strong>Gabriel</strong>, <strong>Gustavo</strong> e{" "}
                    <strong>Richard</strong> — três amigos apaixonados por tecnologia que se conheceram 
                    nos corredores do SENAI. No início, consertávamos os computadores da escola, 
                    os notebooks dos professores e até os controles da televisão da sala de vídeo.
                  </p>
                </div>
                <div className="w-full md:w-80 h-48 bg-gradient-to-br from-[#084438] to-green-600 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">💻</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#084438] mb-4">🚀 A Ideia</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Foi num desses momentos — tentando reviver um computador que só dava tela azul 
                    e apitava como micro-ondas — que surgiu a ideia:{" "}
                    <em className="text-[#084438] font-semibold">
                      "E se a gente abrisse nossa própria assistência técnica?"
                    </em>
                  </p>
                </div>
                <div className="w-full md:w-80 h-48 bg-gradient-to-br from-green-600 to-[#084438] rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">💡</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#084438] mb-4">🏆 A Zelus</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Assim nasceu a <strong className="text-[#084438]">Zelus</strong>. O nome foi ideia do Richard, 
                    que queria algo com impacto. "Zelus" parecia nome de herói digital — e ninguém sabia 
                    exatamente o que significava, então ficou sofisticado. Desde então, crescemos, aprendemos 
                    e nos especializamos em oferecer suporte técnico de qualidade.
                  </p>
                </div>
                <div className="w-full md:w-80 h-48 bg-gradient-to-br from-[#084438] to-green-600 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nossos <span className="text-[#084438]">Valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam cada decisão e ação da nossa equipe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {valor.icone}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {valor.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nossa <span className="text-[#084438]">Equipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça os especialistas que fazem a Zelus acontecer todos os dias
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {equipe.map((membro, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={membro.foto}
                    alt={membro.nome}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{membro.nome}</h3>
                    <p className="text-sm opacity-90">{membro.cargo}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {membro.descricao}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {membro.especialidades.map((especialidade, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#084438] text-white text-xs rounded-full font-medium"
                      >
                        {especialidade}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-20 bg-[#084438] text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-3xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-lg leading-relaxed opacity-90">
                Oferecer soluções técnicas acessíveis, ágeis e de confiança, 
                com um toque humano e criativo que transforma problemas em oportunidades.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-6">🔮</div>
              <h3 className="text-3xl font-bold mb-4">Nossa Visão</h3>
              <p className="text-lg leading-relaxed opacity-90">
                Ser a assistência técnica mais confiável e inovadora do SENAI, 
                reconhecida pela excelência técnica e pelo relacionamento próximo com nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-[#084438] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Precisa de Ajuda Técnica?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Nossa equipe está pronta para resolver seus problemas com computadores e dispositivos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/formularioUser">
              <button className="px-8 py-4 bg-white text-[#084438] font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Abrir Chamado
              </button>
            </Link>
            <Link href="/">
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#084438] transition-colors duration-300">
                Voltar ao Início
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
