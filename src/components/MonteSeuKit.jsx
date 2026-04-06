import { useState } from "react";
import { produtos } from "../data/produtos";
import { useCarrinho } from "../context/CarrinhoContext";
import Lightbox from "./Lightbox";

export default function MonteSeuKit() {
  const { adicionar } = useCarrinho();

  const [selecionados, setSelecionados] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  const categorias = ["todos", ...produtos.map((c) => c.categoria)];

  function toggleItem(item) {
    setSelecionados((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id, delta) {
    setSelecionados((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantidade: Math.max(0, i.quantidade + delta) } : i
        )
        .filter((i) => i.quantidade > 0)
    );
  }

  function removerItem(id) {
    setSelecionados((prev) => prev.filter((i) => i.id !== id));
  }

  function getTotal() {
    return selecionados.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function adicionarKit() {
    const nomeKit = `Kit Personalizado (${selecionados.map((i) => i.nome).join(", ")})`;

    adicionar({
      id: Date.now(),
      nome: nomeKit,
      descricao: selecionados
        .map((i) => `${i.quantidade}x ${i.nome}`)
        .join(", "),
      preco: getTotal(),
      tipo: "un"
    });

    setSelecionados([]);
  }

  const todasOpcoes = produtos.flatMap((c) => c.itens);
  const itensFiltrados = produtos
    .filter((c) => categoria === "todos" || c.categoria === categoria)
    .flatMap((c) => c.itens)
    .filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <section id="monte-seu-kit" style={{ paddingTop: "100px", paddingBottom: "60px", backgroundColor: "#fff7f9", minHeight: "100vh" }}>

      {/* VOLTAR */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 12px auto" }}>
        <a
          href="/"
          style={{ color: "#ec4899", fontWeight: "700", textDecoration: "none" }}
        >
          ← Voltar para a página inicial
        </a>
      </div>

      {/* TÍTULO */}
      <div style={{ textAlign: "center", marginBottom: "30px", padding: "0 20px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#ec4899", marginBottom: "8px" }}>
          🎉 Monte seu Kit de Festa
        </h2>
        <p
          style={{
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
          Escolha os melhores produtos para sua festa!
        </p>
      </div>

      {/* MONTE SEU KIT PERSONALIZADO */}
      <h2 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "12px", color: "#ec4899" }}>
        ✨ Monte do seu jeito (itens avulsos)
      </h2>

      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px", fontSize: "16px", fontWeight: "500" }}>
        Selecione itens avulsos e montamos o kit exatamente como você quiser
      </p>

      {/* BUSCA E CATEGORIAS */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 20px auto", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Buscar itens..."
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
                padding: "10px 16px",
                borderRadius: "9999px",
                border: "1px solid #ec4899",
                backgroundColor: categoria === cat ? "#ec4899" : "#fff",
                color: categoria === cat ? "#fff" : "#ec4899",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: 600
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUTOS - 5 COLUNAS */}
      <style>{`
        .kit-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          padding: 0 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        @media (max-width: 1200px) {
          .kit-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .kit-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .kit-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <div className="kit-grid">
        {itensFiltrados.map((item) => {
          const selecionado = selecionados.find((s) => s.id === item.id);

          return (
            <div
              key={item.id}
              onClick={(e) => { if (!selecionado) toggleItem(item); }}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: selecionado ? "0 0 0 3px #ec4899" : "0 4px 12px rgba(0,0,0,0.1)",
                cursor: selecionado ? "default" : "pointer",
                textAlign: "center",
                transition: "all 0.3s ease",
                overflow: "hidden"
              }}
            >
              <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
                <img
                  src={item.imagem}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0px", cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); setImagemAmpliada(item.imagem); }}
                />
              </div>

              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{item.nome}</h3>
                  {selecionado && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removerItem(item.id); }}
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px", padding: "2px" }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <p style={{ color: "#22c55e", fontWeight: "bold", fontSize: "16px", marginTop: "12px" }}>
                  {formatar(item.preco)}
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "8px", alignItems: "center", marginTop: "12px" }}>
                  {selecionado ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alterarQuantidade(item.id, -1);
                      }}
                      style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: "20px", textAlign: "center", fontWeight: "700" }}>
                      {selecionado.quantidade}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alterarQuantidade(item.id, 1);
                      }}
                      style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}
                    >
                      +
                    </button>
                  </>
                ) : (
                  <span style={{ color: "#ec4899", fontSize: "14px" }}>Clique para adicionar</span>
                )}
              </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TOTAL */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
          Total: {formatar(getTotal())}
        </p>

        <button
          onClick={adicionarKit}
          disabled={selecionados.length === 0}
          style={{
            backgroundColor: selecionados.length === 0 ? "#ccc" : "#ec4899",
            color: "white",
            padding: "16px 40px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            cursor: selecionados.length === 0 ? "not-allowed" : "pointer"
          }}
        >
          Adicionar ao Carrinho
        </button>
      </div>

      {/* LIGHTBOX */}
      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
      )}

    </section>
  );
}
