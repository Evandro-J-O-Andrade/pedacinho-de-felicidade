import { useState, useEffect } from "react";
import { produtos } from "../data/produtos";
import ProdutoCard from "./ProdutoCard";
import Lightbox from "./Lightbox";

export default function Produtos() {
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  
  const todos = produtos.flatMap((c) => c.itens);
  const Destaques = todos.filter((p) => p.destaque);

  // Escutar evento global de busca
  useEffect(() => {
    function handleBuscaGlobal(e) {
      const termo = e.detail.termo.toLowerCase();
      
      // 1º: Verifica nos Destaques
      const resultadosDestaques = Destaques.filter((item) => 
        item.nome.toLowerCase().includes(termo)
      );
      
      if (resultadosDestaques.length > 0) {
        setTimeout(() => {
          document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
      
      // 2º: Verifica se o termo tem a ver com Kit Festa
      const palavrasKit = ["kit", "festa", "básico", "médio", "premium", "20 pessoas", "50 pessoas", "100 pessoas"];
      const temPalavraKit = palavrasKit.some(palavra => termo.includes(palavra));
      
      if (temPalavraKit) {
        // Rola até a seção Kit Festa (mesma página)
        setTimeout(() => {
          document.getElementById("kit-festa")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
      
      // 3º: Não encontrou, vai para Cardápio
      window.location.hash = "cardapio";
    }

    window.addEventListener("busca-global", handleBuscaGlobal);
    return () => window.removeEventListener("busca-global", handleBuscaGlobal);
  }, []);

return (
    <>
      <section id="produtos" style={{ padding: "60px 20px", backgroundColor: "#fff7f9" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "32px", textAlign: "center", color: "#ec4899" }}>
          Destaques 💖
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {Destaques.length > 0 ? (
            Destaques.map((item) => (
              <ProdutoCard key={item.id} item={item} onImageClick={setImagemAmpliada} />
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", color: "#666" }}>
              Nenhum produto encontrado
            </p>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
            <a href="#cardapio" style={{ color: "#ec4899", fontWeight: "600" }}>
              Ver mais →
            </a>
          </div>
      </section>

      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
      )}
    </>
  );
}
