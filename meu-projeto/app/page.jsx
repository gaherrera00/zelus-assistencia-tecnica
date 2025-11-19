import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-secondary text-black -m-4 lg:-m-6">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center ">
        {/* Vídeo de fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover blur-md"
        >
          <source src="video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>
        <div className="container z-30 bg-trasparent h-135 w-110 rounded-xl ml-50 mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-white">
          {/* Texto */}
          <div className="max-w-lg ">
            <h1 className="text-3xl md:text-5xl font-bold">
              ASSISTÊNCIA TÉCNICA <span className="text-primary">ONLINE</span>{" "}
              PARA ESTUDANTES
              <br />
              <span className="text-primary">DO SENAI</span>
            </h1>
            <p className="mt-4 text-lg">Precisa de ajuda? Contate-nos</p>
            <div className="mt-8 space-y-4">
              <Link
                href="/login"
                className="inline-block w-full max-w-xs bg-gradient-to-r from-[#084438] to-green-700 p-3 rounded-md font-bold text-white text-center"
              >
                ACESSAR SISTEMA
              </Link>
              <Link
                href="/formularioUser"
                className="inline-block w-full max-w-xs bg-white text-green-800 p-3 rounded-md font-bold text-center border-2 border-green-700"
              >
                FAZER CHAMADO
              </Link>
            </div>
          </div>

          {/* Imagem */}
          <div className="mt-8 md:mt-0">
            <img src="wrench.mp4" alt="" className="max-w-sm" />
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-gradient-to-r from-[#084438] to-green-700 py-12 text-secondary mt-20">
        <div className="container mx-auto grid md:grid-cols-4 gap-6">
          {[
            {
              icon: "location.png",
              title: "Atendimento no local",
              desc: "Atendimento realizado no local, sem custos adicionais.",
            },
            {
              icon: "wrench.png",
              title: "Profissionais Qualificados",
              desc: "Equipe com mais de 80 anos de experiência.",
            },
            {
              icon: "dollar.png",
              title: "Preços Justos",
              desc: "Pagamentos facilitados e preços acessíveis.",
            },
            {
              icon: "verify.png",
              title: "Garantia",
              desc: "Garantia de até 1 ano na manutenção.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-secondary p-6 rounded-lg text-white text-center"
            >
              <div className="w-15 ml-32 mb-7">
                <img src={b.icon} />
              </div>
              <h3 className="mt-3 font-bold">{b.title}</h3>
              <p className="mt-2 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE / INSTITUCIONAL */}
      <section className="bg-secondary py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ASSISTÊNCIA TÉCNICA{" "}
            <span className="text-primary">ESPECIALISTA</span> EM{" "}
            <span className="text-primary">MANUTENÇÃO</span>
          </h2>
          <p className="mb-6">
            Cansado(a) de ter seu equipamento quebrado e não saber concerta-lo?
            Nós resolvemos rápido e com garantia.
          </p>
          <button className="w-100 bg-gradient-to-r from-[#084438] to-green-700 p-3 rounded-md font-bold text-white">
                SOLICITE SEU CHAMADO
              </button>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-8">
            O que os clientes falam sobre{" "}
            <span className="text-primary">nós</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Caio",
                photo: "caio.png",
                text: "Galera, veloz pela agilidade no atendimento, técnico super gente boa.",
              },
              {
                name: "Taina",
                photo: "taina.png",
                text: "Deu tudo certo com a minha máquina, muito obrigada pelo atendimento.",
              },
              {
                name: "Thais",
                photo: "thais.png",
                text: "Atendimento super rápido e eficaz, obrigada pela atenção.",
              },
            ].map((d, i) => (
              <div
                key={i}
                className="bg-white shadow-xl/10 text-secondary p-6 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={d.photo}
                    alt={d.name}
                    className="w-10 h-10 mb-3 rounded-full object-cover"
                  />
                  <strong>{d.name}</strong>
                </div>
                <p className="mb-4 italic">"{d.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
