import { useState } from "react";
import { produtos } from "../data/produtos";
import { useCarrinho } from "../context/CarrinhoContext";

export default function KitFesta() {
  const { adicionar } = useCarrinho();

  const [selecionados, setSelecionados] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");

  const MIN_ITENS = 3;

  const categorias = ["todos", ...produtos.map((c) => c.categoria)];

  const itensFiltrados = produtos
    .filter((c) => categoria === "todos" || c.categoria === categoria)
    .flatMap((c) => c.itens)
    .filter((item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase())
    );

  function toggleItem(item) {
    setSelecionados((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  }

  const total = selecionados.reduce((acc, i) => acc + i.preco, 0) * quantidade;

  function formatar(v) {
    return v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function adicionarKit() {
    adicionar({
      id: Date.now(),
      nome: "Kit Personalizado",
      descricao: selecionados.map((i) => i.nome).join(", "),
      preco: total,
      tipo: "un"
    });

    setSelecionados([]);
    setQuantidade(1);
  }

  return (
    <section id="kit-festa" style={{ padding: "60px 20px", backgroundColor: "#fff7f9" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#ec4899", marginBottom: "12px" }}>
          Monte seu Kit 🎉
        </h1>
        <p style={{ color: "#666" }}>
          Crie o kit perfeito para sua festa
        </p>
      </div>

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar produtos..."
        style={{ width: "100%", padding: "14px", border: "1px solid #e5e7eb", borderRadius: "10px", marginBottom: "16px", outline: "none" }}
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* CATEGORIAS */}
      <div style={{ display: "flex", gap: "12px", overflowX: "auto", marginBottom: "24px", paddingBottom: "8px" }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            style={{
              padding: "10px 16px",
              borderRadius: "9999px",
              border: "1px solid #e5e7eb",
              background: categoria === cat ? "#ec4899" : "#fff",
              color: categoria === cat ? "#fff" : "#333",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontSize: "14px"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {itensFiltrados.map((item) => {
          const selecionado = selecionados.find((s) => s.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item)}
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: selecionado ? "0 0 0 2px #ec4899" : "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer"
              }}
            >
              <img
                src={item.imagem}
                style={{ width: "100%", height: "96px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }}
              />
              <h3 style={{ fontSize: "14px", fontWeight: "600" }}>{item.nome}</h3>
              <p style={{ color: "#22c55e", fontWeight: "bold", fontSize: "14px" }}>{formatar(item.preco)}</p>
            </div>
          );
        })}
      </div>

      {/* RESUMO */}
      <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "24px" }}>

        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>🧾 Seu Kit</h2>

        {selecionados.length === 0 && (
          <p style={{ color: "#666" }}>Nenhum item selecionado</p>
        )}

        {selecionados.map((i) => (
          <p key={i.id} style={{ marginBottom: "4px" }}>• {i.nome}</p>
        ))}

        {/* QUANTIDADE */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px" }}>
          <button
            onClick={() => setQuantidade((prev) => Math.max(1, prev - 1))}
            style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}
          >
            -
          </button>

          <span style={{ fontSize: "24px", fontWeight: "bold" }}>{quantidade}</span>

          <button
            onClick={() => setQuantidade((prev) => prev + 1)}
            style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}
          >
            +
          </button>
        </div>

        {/* TOTAL */}
        <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "16px" }}>Total: {formatar(total)}</p>

        {/* VALIDAÇÃO */}
        {selecionados.length < MIN_ITENS && (
          <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "8px" }}>
            Selecione pelo menos {MIN_ITENS} itens
          </p>
        )}

        {/* BOTÃO */}
        <button
          onClick={adicionarKit}
          disabled={selecionados.length < MIN_ITENS}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "16px",
            borderRadius: "12px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            cursor: selecionados.length < MIN_ITENS ? "not-allowed" : "pointer",
            backgroundColor: selecionados.length < MIN_ITENS ? "#ccc" : "#ec4899"
          }}
        >
          Adicionar ao Carrinho
        </button>
      </div>

    </section>
  );
}