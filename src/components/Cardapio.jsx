import { useState } from "react";
import { produtos } from "../data/produtos";
import ProdutoCard from "./ProdutoCard";

export default function Cardapio() {
  const [categoria, setCategoria] = useState(produtos[0].categoria);

  const atual = produtos.find((c) => c.categoria === categoria);

  return (
    <section id="cardapio" className="py-20 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Cardápio
      </h2>

      <div className="flex gap-6 flex-col md:flex-row">

        {/* CATEGORIAS */}
        <div className="flex md:flex-col gap-3 overflow-x-auto">
          {produtos.map((c) => (
            <button
              key={c.categoria}
              onClick={() => setCategoria(c.categoria)}
              className={`px-4 py-2 rounded-full ${
                categoria === c.categoria
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {c.categoria}
            </button>
          ))}
        </div>

        {/* PRODUTOS */}
        <div className="grid md:grid-cols-3 gap-6 flex-1">
          {atual.itens.map((item) => (
            <ProdutoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}