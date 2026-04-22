import { useState, useEffect, useMemo } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import { produtos } from "../data/produtos";
import { getEventoAtivo } from "../utils/sazonalUtils";
import ProdutoCard from "./ProdutoCard";
import Lightbox from "./Lightbox";
import Image from "./Image";
import { buscarProdutos } from "../utils/buscaUtils";

export default function ProdutosPage() {
  const { adicionar } = useCarrinho();
  const [categoria, setCategoria] = useState("Bolos");
  const [busca, setBusca] = useState("");
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const evento = getEventoAtivo();
  
  const categoriasFixas = ["Bolos", "Doces", "Salgados", "Bebidas", "Complementos"];
  const categoriaEvento = evento ? evento.nome : null;
  const categoriasPermitidas = useMemo(() => {
    const permitidas = [...categoriasFixas];
    if (categoriaEvento) {
      permitidas.push(categoriaEvento);
    }
    return permitidas;
  }, [categoriaEvento]);
  
  const produtosFiltrados = useMemo(() => 
    produtos.filter(c => categoriasPermitidas.includes(c.categoria)),
    [categoriasPermitidas]
  );
  
  const categorias = useMemo(() => 
    ["todos", "Bolos", ...produtosFiltrados.map((c) => c.categoria).filter(c => c !== "Bolos")],
    [produtosFiltrados]
  );

  // Ler parametro de busca da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const buscaParam = params.get("busca");
    if (buscaParam) {
      setBusca(buscaParam);
    }
  }, []);

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
          const elemento = document.getElementById("produtos-grid");
          if (elemento) {
            elemento.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            window.scrollTo({ top: 300, behavior: "smooth" });
          }
        }, 100);
        return;
      }
      
      setBusca("");
      setCategoria("todos");
    }

    window.addEventListener("busca-global", handleBuscaGlobal);
    return () => window.removeEventListener("busca-global", handleBuscaGlobal);
  }, [produtosFiltrados]);

  // Filtra itens por busca
  const filtrarPorBusca = (itens) => {
    if (!busca) return itens;
    const termoNormalizado = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return itens.filter(item => {
      const nomeNormalizado = item.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return nomeNormalizado.includes(termoNormalizado);
    });
  };

  // Lista de categorias ativas para renderizar seções
  const categoriasAtivas = categoria === "todos" 
    ? produtosFiltrados 
    : produtosFiltrados.filter(c => c.categoria === categoria);

  function formatar(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <>
      <div
        style={{
          paddingTop: "180px",
          paddingBottom: "60px",
          minHeight: "100vh",
          backgroundColor: "#fff7f9"
        }}
      >
        {/* BANNER */}
        <div style={{ marginBottom: "26px" }}>
          <Image 
            src="/img/produtos/bannerprodutos/bannerprodutos.png" 
            alt="Nossos Produtos"
            style={{ 
              width: "100%", 
              height: "auto", 
              objectFit: "contain", 
              objectPosition: "center center", 
              display: "block"
            }}
          />
        </div>

        <style>{`
          @media only screen and (min-width: 350px) and (max-width: 1024px) {
            .produtos-page { paddingTop: 130px !important; }
          }
          @media only screen and (max-width: 349px) {
            .produtos-page { paddingTop: 120px !important; }
          }
          .produtos-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 20px;
            max-width: 1100px;
            margin: 0 auto;
          }
          @media only screen and (min-width: 901px) and (max-width: 1100px) {
            .produtos-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media only screen and (min-width: 601px) and (max-width: 900px) {
            .produtos-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media only screen and (min-width: 350px) and (max-width: 600px) {
            .produtos-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; padding: 10px !important; }
          }
          @media only screen and (max-width: 349px) {
            .produtos-grid { grid-template-columns: 1fr !important; gap: 10px !important; padding: 10px !important; }
          }
          .sessao-titulo {
            font-size: 28px;
            color: #ec4899;
            text-align: center;
            margin: 30px 0 15px;
            padding: 0 20px;
          }
        `}</style>

        {/* HEADER */}
        <div className="produtos-page" style={{ textAlign: "center", marginBottom: "30px", padding: "0 20px" }}>
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
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          <input
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: "12px",
              border: "2px solid #fce7f3",
              marginBottom: "16px",
              fontSize: "16px",
              outline: "none"
            }}
          />

          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoria(cat);
                  setBusca("");
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "25px",
                  border: cat === categoria ? "none" : "1px solid #fce7f3",
                  backgroundColor: cat === categoria ? "#ec4899" : "white",
                  color: cat === categoria ? "white" : "#5c3d2e",
                  fontWeight: "600",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {cat === "todos" ? "Todos" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID POR CATEGORIA */}
        {categoriasAtivas.map(cat => {
const itens = filtrarPorBusca(cat.itens);
          
          if (itens.length === 0) return null;

          return (
            <div key={cat.categoria}>
              <h2 className="sessao-titulo" id="produtos-grid">{cat.categoria}</h2>
              <div className="produtos-grid">
                {itens.map(item => (
                  <ProdutoCard key={item.id} item={item} onImageClick={(img) => { setImagemAmpliada(img); setItemSelecionado(item); }} />
                ))}
              </div>
            </div>
          );
        })}

        {categoriasAtivas.every(cat => filtrarPorBusca(cat.itens).length === 0) && (
          <p style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>
            Nenhum produto encontrado 😢
          </p>
        )}
      </div>

      {/* LIGHTBOX */}
      {imagemAmpliada && (
        <Lightbox
          src={imagemAmpliada}
          item={itemSelecionado}
          onClose={() => { setImagemAmpliada(null); setItemSelecionado(null); }}
        />
      )}
    </>
  );
}