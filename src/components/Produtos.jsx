import { useState, useEffect } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import { produtos } from "../data/produtos";
import Lightbox from "./Lightbox";
import Carrossel3D from "./Carrossel3D";
import Image from "./Image";
import { getImagemProduto } from "../utils/imagemUtils";

export default function Produtos() {
  const { adicionar } = useCarrinho();
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  
  const todos = produtos.flatMap((c) => c.itens);
  const Destaques = todos.filter((p) => p.destaque);

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
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        onClick={() => setImagemAmpliada(getImagemProduto(item))}
      />
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "16px", color: "#ec4899", marginBottom: "6px" }}>
          {item.nome}
        </h3>
        <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "18px", marginBottom: "12px" }}>
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
            cursor: "pointer"
          }}
        >
          Adicionar 🛒
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

        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a href="#cardapio" style={{ color: "#ec4899", fontWeight: "600", fontSize: "16px" }}>
              Ver todos os produtos →
            </a>
          </div>
      </section>

      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
      )}
    </>
  );
}