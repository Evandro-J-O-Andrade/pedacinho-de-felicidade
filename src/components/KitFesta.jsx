import { useState, useEffect } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import Lightbox from "./Lightbox";
import Image from "./Image";
import { getImagemProduto } from "../utils/imagemUtils";

export default function KitFesta() {
  const { adicionar } = useCarrinho();
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  const kitsProntos = [
    {
      id: 1001,
      nome: "Kit Festa Básico",
      descricao: "Serve até 20 pessoas",
      preco: 250,
      imagem: "/img/produtos/bolo.png",
      itens: ["Bolo 2kg", "50 doces", "50 salgados"]
    },
    {
      id: 1002,
      nome: "Kit Festa Médio",
      descricao: "Serve até 50 pessoas",
      preco: 450,
      imagem: "/img/produtos/bolo3.png",
      itens: ["Bolo 3kg", "100 doces", "100 salgados"]
    },
    {
      id: 1003,
      nome: "Kit Festa Premium",
      descricao: "Serve até 100 pessoas",
      preco: 850,
      imagem: "/img/produtos/bolo4.jpeg",
      itens: ["Bolo 5kg", "200 doces", "200 salgados", "Decoração"]
    }
  ];

  function formatar(v) {
    return v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  // Escutar evento global de busca
  useEffect(() => {
    function handleBuscaGlobal(e) {
      const termo = e.detail.termo.toLowerCase();
      
      // Verifica se tem nos Kits (por nome ou descrição)
      const resultadosKits = kitsProntos.filter((kit) => 
        kit.nome.toLowerCase().includes(termo) || 
        kit.descricao.toLowerCase().includes(termo)
      );
      
      // Se encontrou nos Kits ou tem palavra-chave de kit, vai para esta seção
      const palavrasKit = ["kit", "festa", "básico", "basico", "médio", "medio", "premium", "20", "50", "100"];
      const temPalavraKit = palavrasKit.some(palavra => termo.includes(palavra));
      
      if (resultadosKits.length > 0 || temPalavraKit) {
        setTimeout(() => {
          document.getElementById("kit-festa")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    window.addEventListener("busca-global", handleBuscaGlobal);
    return () => window.removeEventListener("busca-global", handleBuscaGlobal);
  }, []);

  return (
    <section id="kit-festa" style={{ padding: "60px 20px", backgroundColor: "#fff7f9" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#ec4899", marginBottom: "12px" }}>
          Kit Festa Rápido 🎉
        </h1>
        <p style={{ color: "#666" }}>
          Kits prontos para comprar na hora
        </p>
      </div>

      {/* KITS PRONTOS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {kitsProntos.map((kit) => (
          <div key={kit.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
              <Image 
                src={getImagemProduto(kit)} 
                alt={kit.nome}
                style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                onClick={() => setImagemAmpliada(getImagemProduto(kit))}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "6px" }}>{kit.nome}</h3>
              <p style={{ color: "#666", marginBottom: "10px" }}>{kit.descricao}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px 0", color: "#444", fontSize: "14px" }}>
                {kit.itens.map((i, idx) => (
                  <li key={idx}>• {i}</li>
                ))}
              </ul>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ec4899", marginBottom: "12px" }}>{formatar(kit.preco)}</p>
              <button
                onClick={() =>
                  adicionar({
                    id: kit.id,
                    nome: kit.nome,
                    descricao: `${kit.descricao} - ${kit.itens.join(", ")}`,
                    preco: kit.preco,
                    imagem: kit.imagem,
                    tipo: "un"
                  })
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#ec4899",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <a
          href="/monte-seu-kit"
          style={{ display: "inline-block", color: "#ec4899", fontWeight: "700", textDecoration: "underline" }}
        >
          Quero montar meu kit do zero →
        </a>
      </div>

      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
      )}
    </section>
  );
}
