import { produtos } from "../data/produtos";
import ProdutoCard from "./ProdutoCard";

export default function HomeProdutos() {
  const todos = produtos.flatMap((c) => c.itens);
  const destaques = todos.filter((p) => p.destaque).slice(0, 5);

  return (
    <section style={{ padding: "60px 20px", backgroundColor: "#fff7f9" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "32px", textAlign: "center", color: "#ec4899" }}>
        Destaques 💖
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
        {destaques.map((item) => (
          <ProdutoCard key={item.id} item={item} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a href="#cardapio" style={{ color: "#ec4899", fontWeight: "600" }}>
          Ver mais →
        </a>
      </div>
    </section>
  );
}