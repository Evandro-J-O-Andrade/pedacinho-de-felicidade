import { produtos } from "../data/produtos";

export default function Cardapio() {
  const numero = "5511999999999";

  return (
    <section id="cardapio" className="py-20 px-6 bg-[#fff7f9]">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Nosso Cardápio
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {produtos.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >

              {/* IMAGEM */}
              <div className="h-56 overflow-hidden">
                <img
                  src={p.imagem}
                  alt={p.nome}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTEÚDO */}
              <div className="p-5">

                <span className="text-xs text-pink-500 font-semibold">
                  {p.categoria}
                </span>

                <h3 className="text-xl font-bold mt-1">
                  {p.nome}
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  {p.descricao}
                </p>

                <div className="flex justify-between items-center mt-4">

                  <span className="text-green-600 font-bold">
                    {p.preco}
                  </span>

                  <a
                    href={`https://wa.me/${numero}?text=Quero pedir ${p.nome}`}
                    className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition"
                  >
                    Pedir
                  </a>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
