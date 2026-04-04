import { produtos } from "../data/produtos";

const formatPreco = (preco, tipo) => {
  return `R$ ${preco.toFixed(2).replace(".", ",")} / ${tipo}`;
};

export default function Destaques() {
  const todos = produtos.flatMap((cat) => cat.itens);
  const destaques = todos.filter((p) => p.destaque).slice(0, 5);
  const maisPedidos = todos.filter((p) => p.maisPedido);

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12 text-primary">
        Nossos Queridinhos 💖
      </h2>

      <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto px-6 mb-16">

        {destaques.map((item) => (
          <div key={item.id} className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img src={item.imagem} alt={item.nome} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-primary">{item.nome}</h3>
              <p className="text-green-600 font-semibold">
                {formatPreco(item.preco, item.tipo)}
              </p>
            </div>
          </div>
        ))}

      </div>

      <a
        href="#cardapio"
        className="inline-block mt-8 bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
      >
        Ver mais
      </a>

      {maisPedidos.length > 0 && (
        <>
          <h3 className="text-2xl font-bold mb-8 text-primary">
            Mais Pedidos 🔥
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto px-6">
            {maisPedidos.map((item) => (
              <div key={item.id} className="bg-pink-50 p-4 rounded-xl">
                <p className="font-bold text-primary">{item.nome}</p>
                <p className="text-green-600 font-semibold">
                  {formatPreco(item.preco, item.tipo)}
                </p>
              </div>
            ))}
          </div>
          <a href="#cardapio" className="mt-6 inline-block text-pink-500">
            Ver mais →
          </a>
        </>
      )}
    </section>
  );
}