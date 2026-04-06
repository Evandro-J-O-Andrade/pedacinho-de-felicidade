import { useState } from "react";
import { produtos } from "../data/produtos";
import ProdutoCard from "./ProdutoCard";
import Lightbox from "./Lightbox";

export default function Cardapio() {
  const [categoria, setCategoria] = useState(produtos[0].categoria);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  const atual = produtos.find((c) => c.categoria === categoria);
  const produtosVisiveis = atual.itens.slice(0, 5);

  return (
    <>
      <section
        id="cardapio"
        style={{
          padding: "80px 20px",
          backgroundColor: "white"
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center", marginBottom: "32px", color: "#ec4899" }}>
          Cardápio
        </h2>

        <div style={{ display: "flex", gap: "24px", flexDirection: "column", alignItems: "stretch", maxWidth: "1400px", margin: "0 auto" }}>
          {/* CATEGORIAS */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", paddingBottom: "8px" }}>
            {produtos.map((c) => (
              <button
                key={c.categoria}
                onClick={() => setCategoria(c.categoria)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "9999px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: categoria === c.categoria ? "#ec4899" : "#f4f4f5",
                  color: categoria === c.categoria ? "#fff" : "#333",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontWeight: 600
                }}
              >
                {c.categoria}
              </button>
            ))}
          </div>

          {/* PRODUTOS - 5 POR LINHA */}
          <div className="cardapio-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "24px",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%"
          }}>
            <style>{`
              @media (max-width: 1200px) {
                .cardapio-grid { grid-template-columns: repeat(3, 1fr) !important; }
              }
              @media (max-width: 768px) {
                .cardapio-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 480px) {
                .cardapio-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
{produtosVisiveis.map((item) => (
              <ProdutoCard 
                key={item.id} 
                item={item}
                onImageClick={setImagemAmpliada}
              />
            ))}
          </div>

          {/* VER MAIS */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <a
              href="/produtos"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#ec4899",
                color: "#fff",
                borderRadius: "9999px",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
            >
              Ver mais produtos →
            </a>
          </div>
        </div>
      </section>

      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
      )}
    </>
  );
}
