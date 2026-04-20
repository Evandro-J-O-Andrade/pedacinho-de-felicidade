import { produtos } from "../data/produtos";
import { getEventoAtivo } from "../utils/sazonalUtils";
import Image from "./Image";
import { getImagemProduto } from "../utils/imagemUtils";
import Carrossel3D from "./Carrossel3D";

const formatPreco = (preco, tipo) => `R$ ${preco.toFixed(2).replace(".", ",")} / ${tipo}`;

export default function Destaques() {
  const evento = getEventoAtivo();
  
  const categoriasFixas = ["Bolos", "Doces", "Salgados", "Bebidas", "Complementos"];
  
  const categoriaEvento = evento ? evento.nome : null;
  
  const categoriasPermitidas = [...categoriasFixas];
  if (categoriaEvento) {
    categoriasPermitidas.push(categoriaEvento);
  }
  
  const produtosFiltrados = produtos.filter(c => categoriasPermitidas.includes(c.categoria));
  
  const todos = produtosFiltrados.flatMap((cat) => cat.itens);
  const highlights = todos.filter((p) => p.destaque).slice(0, 7);

  const renderItem = (item) => (
    <div style={{
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
      background: "#fff"
    }}>
      <Image 
        src={getImagemProduto(item)} 
        alt={item.nome} 
        style={{ width: "100%", height: "200px", objectFit: "cover" }} 
      />
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "16px", color: "#ec4899", marginBottom: "6px" }}>
          {item.nome}
        </h3>
        <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "18px" }}>
          {formatPreco(item.preco, item.tipo)}
        </p>
      </div>
    </div>
  );

  return (
    <section
      id="destaques"
      style={{ padding: "70px 20px", backgroundColor: "#fff", textAlign: "center" }}
    >
      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px", color: "#ec4899" }}>
        Nossos Queridinhos 💖
      </h2>

      {highlights.length > 0 && (
        <Carrossel3D items={highlights} renderItem={renderItem} autoPlay={true} interval={4000} />
      )}

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
          boxShadow: "0 6px 14px rgba(236,72,153,0.22)",
          marginTop: "40px"
        }}
      >
        Ver Cardápio Completo
      </a>
    </section>
  );
}