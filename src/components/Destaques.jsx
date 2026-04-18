import { produtos } from "../data/produtos";
import { getEventoAtivo } from "../utils/sazonalUtils";
import Image from "./Image";
import { getImagemProduto } from "../utils/imagemUtils";

const formatPreco = (preco, tipo) => `R$ ${preco.toFixed(2).replace(".", ",")} / ${tipo}`;

export default function Destaques() {
  const evento = getEventoAtivo();
  
  // Categorias fixas (não sazonais)
  const categoriasFixas = ["Bolos", "Doces", "Salgados", "Bebidas", "Complementos"];
  
  // Filtra categorias: se não tem evento ativo, mostra só as fixas
  const produtosFiltrados = evento 
    ? produtos 
    : produtos.filter(c => categoriasFixas.includes(c.categoria));
  
  const todos = produtosFiltrados.flatMap((cat) => cat.itens);
  const destaques = todos.filter((p) => p.destaque).slice(0, 5);

  return (
    <section
      id="destaques"
      style={{ padding: "70px 20px", backgroundColor: "#fff", textAlign: "center" }}
    >
      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px", color: "#ec4899" }}>
        Nossos Queridinhos 💖
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "16px",
        maxWidth: "1100px",
        margin: "0 auto 24px auto"
      }}>
        {destaques.map((item) => (
          <div key={item.id} style={{
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            background: "#fff"
          }}>
            <Image src={getImagemProduto(item)} alt={item.nome} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
            <div style={{ padding: "12px" }}>
              <h3 style={{ fontWeight: "bold", fontSize: "15px", color: "#ec4899", marginBottom: "4px" }}>{item.nome}</h3>
              <p style={{ color: "#16a34a", fontWeight: 700 }}>{formatPreco(item.preco, item.tipo)}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="#cardapio"
        style={{
          display: "inline-block",
          backgroundColor: "#ec4899",
          color: "#fff",
          padding: "12px 28px",
          borderRadius: "9999px",
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 6px 14px rgba(236,72,153,0.22)"
        }}
      >
        Ver mais
      </a>
    </section>
  );
}
