import { useState, useEffect } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import { produtos } from "../data/produtos";
import Lightbox from "./Lightbox";
import Carrossel3D from "./Carrossel3D";
import Image from "./Image";
import { getImagemProduto } from "../utils/imagemUtils";
import { getProdutosVitrine } from "../utils/vitrineUtils";

export default function Produtos() {
  const { adicionar } = useCarrinho();
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  
  const categoriasFixas = ["Bolos", "Doces", "Salgados", "Bebidas", "Complementos"];
  const produtosFiltrados = produtos.filter(c => categoriasFixas.includes(c.categoria));
  const todos = produtosFiltrados.flatMap((c) => c.itens);
  const Destaques = todos.filter((p) => p.destaque);
  const kits = getProdutosVitrine(produtos, "kits");
  const maisVendidos = getProdutosVitrine(produtos, "mais_vendidos");
  const queridinhos = getProdutosVitrine(produtos, "queridinhos");
  const produtosEscolhidos = [...kits.slice(0, 4), ...maisVendidos.slice(0, 4), ...queridinhos.slice(0, 4)].slice(0, 8);

  useEffect(() => {
    function handleBuscaGlobal(e) {
      const termo = e.detail.termo.toLowerCase();
      
      const resultadosDestaques = Destaques.filter((item) => 
        item.nome.toLowerCase().includes(termo)
      );
      
      if (resultadosDestaques.length > 0) {
        setTimeout(() => {
          document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
      
      const palavrasKit = ["kit", "festa", "básico", "médio", "premium", "20 pessoas", "50 pessoas", "100 pessoas"];
      const temPalavraKit = palavrasKit.some(palavra => termo.includes(palavra));
      
      if (temPalavraKit) {
        setTimeout(() => {
          document.getElementById("kit-festa")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
      
      window.location.hash = "cardapio";
    }

    window.addEventListener("busca-global", handleBuscaGlobal);
    return () => window.removeEventListener("busca-global", handleBuscaGlobal);
  }, []);

  const formatPreco = (preco, tipo) => `R$ ${preco.toFixed(2).replace(".", ",")} / ${tipo}`;

  const adicionarAoCarrinho = (item) => {
    adicionar({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao || "",
      preco: item.preco,
      imagem: getImagemProduto(item),
      tipo: item.tipo
    });
  };

  const renderItem = (item) => (
    <div style={{
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
      background: "#fff",
      cursor: "pointer"
    }}>
      <Image 
        src={getImagemProduto(item)} 
        alt={item.nome} 
        style={{ width: "100%", height: "220px", objectFit: "cover" }}
        onClick={() => {
            setImagemAmpliada(getImagemProduto(item));
            setItemSelecionado(item);
          }}
      />
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#ec4899", marginBottom: "4px" }}>
          {item.nome}
        </h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px", minHeight: "36px" }}>
          {item.descricao}
        </p>
        <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "20px", marginBottom: "12px" }}>
          {formatPreco(item.preco, item.tipo)}
        </p>
        <button
          onClick={() => adicionarAoCarrinho(item)}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ec4899",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          Adicionar ao Carrinho 🛒
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section id="produtos" style={{ padding: "60px 20px", backgroundColor: "#fff7f9" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "32px", textAlign: "center", color: "#ec4899" }}>
          Destaques 💖
        </h2>

        {Destaques.length > 0 ? (
          <Carrossel3D items={Destaques} renderItem={renderItem} autoPlay={true} interval={4000} />
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>Nenhum produto em destaque</p>
        )}

        {/* Vitrine - Grid sem carrossel */}
        {(kits.length > 0 || maisVendidos.length > 0 || queridinhos.length > 0) && (
          <>
            <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px", textAlign: "center", color: "#ec4899" }}>
              💖 Escolhidos para você
            </h2>
            <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
              Os favoritos dos nossos clientes para festas incríveis 🎉
            </p>
            <style>{`
              .home-marquee-rail {
                overflow: hidden;
                position: relative;
                width: 100vw;
                margin-left: calc(50% - 50vw);
                padding: 8px 24px 18px;
                box-sizing: border-box;
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .home-marquee-rail::-webkit-scrollbar { display: none; }
              .home-marquee-rail::before,
              .home-marquee-rail::after {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                width: 56px;
                z-index: 1;
                pointer-events: none;
              }
              .home-marquee-rail::before {
                left: 0;
                background: linear-gradient(90deg, rgba(255,247,249,0.98), rgba(255,247,249,0));
              }
              .home-marquee-rail::after {
                right: 0;
                background: linear-gradient(270deg, rgba(255,247,249,0.98), rgba(255,247,249,0));
              }
              .home-marquee-track {
                display: flex;
                gap: 20px;
                width: max-content;
                padding-right: 28px;
                animation: home-marquee 28s linear infinite;
              }
              .home-marquee-track:hover { animation-play-state: paused; }
              .home-scroll-item {
                flex: 0 0 auto;
                width: 280px;
                min-width: 280px;
              }
              @keyframes home-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @media (max-width: 768px) {
                .home-scroll-item { width: 220px; min-width: 220px; }
              }
            `}</style>
            <div className="home-marquee-rail">
              <div className="home-marquee-track">
                {[...produtosEscolhidos, ...produtosEscolhidos].map((item, index) => (
                  <div className="home-scroll-item" key={`${item.id}-${index}`}>
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a href="/produtos" style={{ color: "#ec4899", fontWeight: "600", fontSize: "16px" }}>
              Ver todos os produtos →
            </a>
          </div>
      </section>

      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} item={itemSelecionado} onClose={() => { setImagemAmpliada(null); setItemSelecionado(null); }} />
      )}
    </>
  );
}