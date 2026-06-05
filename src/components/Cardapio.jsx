import { useState, useEffect } from "react";
import { produtos } from "../data/produtos";
import { getEventoAtivo } from "../utils/sazonalUtils";
import ProdutoCard from "./ProdutoCard";
import Lightbox from "./Lightbox";
import { buscarProdutos } from "../utils/buscaUtils";
import { eventosSazonais } from "../data/sazonais";

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
  
   const categorias = ["todos", "Bolos", ...produtosFiltrados.map((c) => c.categoria).filter(c => c !== "Bolos")];

   const [categoria, setCategoria] = useState("todos");
   const [busca, setBusca] = useState("");
   const [imagemAmpliada, setImagemAmpliada] = useState(null);
   const [itemSelecionado, setItemSelecionado] = useState(null);

  function filtrarPorBusca(itens) {
    if (!busca || !busca.trim()) return itens;

    const idsEncontrados = new Set(
      buscarProdutos(produtos, busca)
        .map((item) => item.id)
    );

    return itens.filter((item) => idsEncontrados.has(item.id));
  }

   // Função para obter top 5 produtos mais vendidos para uma lista de categorias
   function getTopVendidosPorCategorias(categorias) {
     try {
       const carrinhoStorage = JSON.parse(localStorage.getItem("carrinho") || "[]");
       
       // Contar vendas por produto
       const contagem = {};
       
       carrinhoStorage.forEach(item => {
         contagem[item.id] = (contagem[item.id] || 0) + (item.quantidade || 1);
       });
       
       // Para cada categoria, obter os top 5 produtos
       const resultado = {};
       
       categorias.forEach(categoria => {
         const categoriaObj = produtosFiltrados.find(c => c.categoria === categoria);
         if (!categoriaObj) {
           resultado[categoria] = [];
           return;
         }
         
         // Filtrar apenas produtos disponíveis (considerando sazonais)
         const produtosDisponiveis = categoriaObj.itens.filter(item => {
           // Verifica se produto sazonal está ativo
           if (item.sazonal) {
             const hoje = new Date();
             const evento = eventosSazonais.find(e => e.id === item.sazonal);
             if (!evento || !evento.ativo) return false;
             const inicio = new Date(evento.inicio);
             const fim = new Date(evento.fim);
             return hoje >= inicio && hoje <= fim;
           }
           return true;
         });
         
         // Ordenar por vendas e pegar top 5
         const top5 = produtosDisponiveis
           .map(item => ({
             ...item,
             vendas: contagem[item.id] || 0
           }))
           .sort((a, b) => b.vendas - a.vendas)
           .slice(0, 5);
         
         resultado[categoria] = top5;
       });
       
       return resultado;
     } catch (error) {
       console.error("Erro ao calcular top vendidos por categorias:", error);
       // Fallback: retorna os primeiros 5 produtos de cada categoria
       const fallback = {};
       categorias.forEach(categoria => {
         const categoriaObj = produtosFiltrados.find(c => c.categoria === categoria);
         if (categoriaObj) {
           fallback[categoria] = categoriaObj.itens.slice(0, 5);
         } else {
           fallback[categoria] = [];
         }
       });
       return fallback;
     }
   }

  const categoriasAtivas = categoria === "todos" ? categoriasFixas : [categoria];

  const itensFiltradosPorBusca = (itens) => {
    if (!busca || !busca.trim()) return itens.slice(0, 5);

    const idsEncontrados = new Set(
      buscarProdutos(produtos, busca).map((item) => item.id)
    );

    return itens.filter((item) => idsEncontrados.has(item.id)).slice(0, 5);
  };

  const secoesExibidas = produtosFiltrados
    .filter((grupo) => categoriasAtivas.includes(grupo.categoria))
    .map((grupo) => ({
      ...grupo,
      itens: itensFiltradosPorBusca(grupo.itens)
    }));

  // Escutar evento global de busca
  useEffect(() => {
    function handleBuscaGlobal(e) {
      const termo = e.detail.termo;
      
      const resultados = buscarProdutos(produtos, termo);
      
      if (resultados.length > 0) {
        const categoriasEncontradas = [...new Set(resultados.map(item => {
          const cat = produtosFiltrados.find(c => c.itens.some(i => i.id === item.id));
          return cat ? cat.categoria : null;
        }).filter(Boolean))];
        
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
      const temPalavraKit = palavrasKit.some(palavra => termo.toLowerCase().includes(palavra));
      
      if (temPalavraKit) {
        window.location.hash = "kit-festa";
        return;
      }
      
      // Não encontrou no cardápio, vai para Monte Seu Kit
      window.location.href = "/monte-seu-kit";
    }
    
    window.addEventListener("busca-global", handleBuscaGlobal);
    return () => window.removeEventListener("busca-global", handleBuscaGlobal);
  }, [produtosFiltrados]);

   const topVendidosPorCategoria = getTopVendidosPorCategorias(categoriasFixas);

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
           <div
             className="category-scroll-container"
             style={{
               display: "flex",
               gap: "12px",
               justifyContent: "center",
               alignItems: "center",
               flexWrap: "wrap",
               overflowX: "auto",
               paddingBottom: "8px",
               scrollBehavior: "smooth",
               WebkitOverflowScrolling: "touch"
             }}
           >
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
                   fontWeight: 600,
                   flexShrink: 0
                 }}
               >
                 {cat === "todos" ? "Todos" : cat}
               </button>
             ))}
           </div>
          
          {/* PRODUTOS - Top 5 por categoria com scroll horizontal */}
          <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
            <style>{`
              .cardapio-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 24px;
                width: 100%;
              }
              .sessao-titulo {
                font-size: 28px;
                color: #ec4899;
                text-align: center;
                margin: 30px 0 15px;
                padding: 0 20px;
              }
              @media (max-width: 1200px) {
                .cardapio-grid { grid-template-columns: repeat(3, 1fr) !important; }
              }
              @media (max-width: 768px) {
                .cardapio-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 480px) {
                .cardapio-grid { grid-template-columns: 1fr !important; }
              }
              .category-scroll-container {
                width: 100%;
                max-width: 1100px;
                margin: 0 auto;
              }
              .category-scroll-container::-webkit-scrollbar {
                display: none;
              }
              .marquee-rail {
                overflow: hidden;
                position: relative;
                width: 100vw;
                margin-left: calc(50% - 50vw);
                padding: 8px 24px 18px;
                box-sizing: border-box;
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .marquee-rail::-webkit-scrollbar {
                display: none;
              }
              .marquee-rail::before,
              .marquee-rail::after {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                width: 56px;
                z-index: 1;
                pointer-events: none;
              }
              .marquee-rail::before {
                left: 0;
                background: linear-gradient(90deg, rgba(255,255,255,0.98), rgba(255,255,255,0));
              }
              .marquee-rail::after {
                right: 0;
                background: linear-gradient(270deg, rgba(255,255,255,0.98), rgba(255,255,255,0));
              }
              .marquee-track {
                display: flex;
                gap: 20px;
                width: max-content;
                padding-right: 28px;
                animation: cardapio-marquee 28s linear infinite;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
              .scroll-item {
                flex: 0 0 auto;
                width: 280px;
                min-width: 280px;
              }
              @keyframes cardapio-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @media (max-width: 768px) {
                .scroll-item {
                  width: 220px;
                }
              }
            `}</style>
            
            {secoesExibidas.map((grupo) => {
              const destaque = busca.trim()
                ? grupo.itens
                : (topVendidosPorCategoria[grupo.categoria] || []).slice(0, 5);

              if (destaque.length === 0) return null;

              return (
                <div key={grupo.categoria} style={{ marginBottom: 32 }}>
                  <h3 className="sessao-titulo">{grupo.categoria}</h3>

                  <div className="marquee-rail">
                    <div className="marquee-track">
                      {[...destaque, ...destaque].map((item, index) => (
                        <div className="scroll-item" key={`${item.id}-${index}`}>
                          <ProdutoCard
                            item={item}
                            onImageClick={(img) => {
                              setImagemAmpliada(img);
                              setItemSelecionado(item);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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
        <Lightbox src={imagemAmpliada} item={itemSelecionado} onClose={() => { setImagemAmpliada(null); setItemSelecionado(null); }} />
      )}
    </>
  );
}