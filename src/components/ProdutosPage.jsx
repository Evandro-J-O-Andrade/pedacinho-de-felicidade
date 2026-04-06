import { useState } from "react";
import { produtos } from "../data/produtos";
import ProdutoCard from "./ProdutoCard";
import Lightbox from "./Lightbox";

export default function ProdutosPage() {
  const [categoria, setCategoria] = useState("todos");
  const [busca, setBusca] = useState("");
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  const categorias = ["todos", ...produtos.map((c) => c.categoria)];

  const produtosFiltrados = produtos
    .filter((c) => categoria === "todos" || c.categoria === categoria)
    .flatMap((c) => c.itens)
    .filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "60px",
          minHeight: "100vh",
          backgroundColor: "#fff7f9"
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "30px", padding: "0 20px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#ec4899"
            }}
          >
            Escolha seus produtos favoritos 🧁
          </h1>

          <p
            style={{
              marginTop: "16px",
              fontSize: "18px",
              color: "#5c3d2e",
              maxWidth: "520px",
              marginInline: "auto",
              lineHeight: "1.6",
              fontWeight: "500",
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              padding: "16px 24px",
              borderRadius: "16px",
              border: "1px solid rgba(236, 72, 153, 0.2)"
            }}
          >
            Monte seu pedido do jeito que quiser. Temos bolos, doces e salgados
            fresquinhos,feitos com muito carinho 💖
          </p>

          <p
            style={{
              marginTop: "16px",
              fontSize: "15px",
              color: "#8b7355",
              fontWeight: "600",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <span style={{ backgroundColor: "rgba(236, 72, 153, 0.12)", padding: "8px 14px", borderRadius: "20px", border: "1px solid rgba(236, 72, 153, 0.2)" }}>✔ Produção sob encomenda</span>
            <span style={{ backgroundColor: "rgba(236, 72, 153, 0.12)", padding: "8px 14px", borderRadius: "20px", border: "1px solid rgba(236, 72, 153, 0.2)" }}>✔ Ingredientes selecionados</span>
            <span style={{ backgroundColor: "rgba(236, 72, 153, 0.12)", padding: "8px 14px", borderRadius: "20px", border: "1px solid rgba(236, 72, 153, 0.2)" }}>✔ Atendimento rápido</span>
          </p>
        </div>

        {/* BUSCA E CATEGORIAS */}
        <div style={{ maxWidth: "1100px", margin: "0 auto 20px auto", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "14px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              marginBottom: "12px",
              outline: "none"
            }}
          />

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "9999px",
                  border: "2px solid #ec4899",
                  backgroundColor: categoria === cat ? "#ec4899" : "#fff",
                  color: categoria === cat ? "#fff" : "#ec4899",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "14px",
                  transition: "all 0.3s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MICROCOPY */}
        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#777",
            fontSize: "14px"
          }}
        >
          Clique no produto para ver maior ou adicionar ao carrinho 👇
        </p>

        {/* GRID PRODUTOS - 5 COLUNAS */}
        <style>{`
          .produtos-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            padding: 0 20px;
            max-width: 1400px;
            margin: 0 auto;
          }
          @media (max-width: 1200px) {
            .produtos-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media (max-width: 900px) {
            .produtos-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 600px) {
            .produtos-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div className="produtos-grid">
          {produtosFiltrados.map((item) => (
            <ProdutoCard
              key={item.id}
              item={item}
              onImageClick={setImagemAmpliada}
            />
          ))}
        </div>

        {/* CTA KIT FESTA */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a
            href="/monte-seu-kit"
            style={{
              background: "#ec4899",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "999px",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(236,72,153,0.4)",
              display: "inline-block"
            }}
          >
            🎉 Montar Kit Festa
          </a>
        </div>
      </div>

      {/* LIGHTBOX */}
      {imagemAmpliada && (
        <Lightbox
          src={imagemAmpliada}
          onClose={() => setImagemAmpliada(null)}
        />
      )}
    </>
  );
}