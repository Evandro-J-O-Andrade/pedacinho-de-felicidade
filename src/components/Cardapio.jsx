import { useState, useEffect } from "react";
import { produtos } from "../data/produtos";
import { getEventoAtivo } from "../utils/sazonalUtils";
import ProdutoCard from "./ProdutoCard";
import Lightbox from "./Lightbox";

export default function Cardapio() {
  const evento = getEventoAtivo();
  
  // Categorias fixas (não sazonais)
  const categoriasFixas = ["Bolos", "Doces", "Salgados", "Bebidas", "Complementos"];
  
  // Se tem evento ativo, pega só a categoria dele
  const categoriaEvento = evento ? evento.nome : null;
  
  // Filtra categorias: sempre mostra as fixas, + evento ativo se houver
  const categoriasPermitidas = [...categoriasFixas];
  if (categoriaEvento) {
    categoriasPermitidas.push(categoriaEvento);
  }
  
  const produtosFiltrados = produtos.filter(c => categoriasPermitidas.includes(c.categoria));
  
  const categorias = ["todos", ...produtosFiltrados.map((c) => c.categoria)];
  
const [categoria, setCategoria] = useState("todos");
  const [busca, setBusca] = useState("");
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  const produtosVisiveis = categoria === "todos"
    ? produtosFiltrados.flatMap((c) => c.itens).filter(item => 
        busca ? item.nome.toLowerCase().includes(busca.toLowerCase()) : true
      )
    : (produtosFiltrados.find((c) => c.categoria === categoria)?.itens || []).filter(item => 
        busca ? item.nome.toLowerCase().includes(busca.toLowerCase()) : true
      );
  
  // Escutar evento global de busca
  useEffect(() => {
    function handleBuscaGlobal(e) {
      const termo = e.detail.termo.toLowerCase();
      
      // Verifica se tem no cardápio
      const todosProdutos = produtosFiltrados.flatMap((c) => c.itens);
      const resultados = todosProdutos.filter((item) => {
        return item.nome.toLowerCase().includes(termo);
      });
      
      if (resultados.length > 0) {
        // Detectar qual categoria tem mais resultados ou pegar a primeira
        const categoriasEncontradas = [...new Set(resultados.map(item => {
          const cat = produtosFiltrados.find(c => c.itens.some(i => i.id === item.id));
          return cat ? cat.categoria : null;
        }).filter(Boolean))];
        
        // Se só tem produtos de uma categoria, vai pra ela. Senão fica em "todos"
        const categoriaAlvo = categoriasEncontradas.length === 1 ? categoriasEncontradas[0] : "todos";
        
        setBusca(termo);
        setCategoria(categoriaAlvo);
        setTimeout(() => {
          document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
      
      // Verifica se o termo tem a ver com Kit Festa
      const palavrasKit = ["kit", "festa", "básico", "basico", "médio", "medio", "premium", "20", "50", "100", "pessoas"];
      const temPalavraKit = palavrasKit.some(palavra => termo.includes(palavra));
      
      if (temPalavraKit) {
        // Volta para a seção Kit Festa na home
        window.location.hash = "kit-festa";
        return;
      }
      
      // Não encontrou no cardápio, vai para Monte Seu Kit
      window.location.href = "/monte-seu-kit";
    }

    window.addEventListener("busca-global", handleBuscaGlobal);
    return () => window.removeEventListener("busca-global", handleBuscaGlobal);
}, [produtosFiltrados]);

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
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoria(cat);
                  setBusca("");
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "9999px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: categoria === cat ? "#ec4899" : "#f4f4f5",
                  color: categoria === cat ? "#fff" : "#333",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontWeight: 600
                }}
              >
                {cat === "todos" ? "Todos" : cat}
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
