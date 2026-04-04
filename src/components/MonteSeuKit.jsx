import { useState } from "react";
import { produtos } from "../data/produtos";
import { useCarrinho } from "../context/CarrinhoContext";

export default function MonteSeuKit() {
  const { adicionar } = useCarrinho();

  const [selecionados, setSelecionados] = useState([]);
  const [quantidade, setQuantidade] = useState(1);

  const kitsProntos = [
    {
      id: 1001,
      nome: "Kit Festa Básico",
      descricao: "20 pessoas",
      preco: 250,
      itens: ["Bolo 2kg", "50 doces", "50 salgados"]
    },
    {
      id: 1002,
      nome: "Kit Festa Médio",
      descricao: "50 pessoas",
      preco: 450,
      itens: ["Bolo 3kg", "100 doces", "100 salgados"]
    },
    {
      id: 1003,
      nome: "Kit Festa Premium",
      descricao: "100 pessoas",
      preco: 850,
      itens: ["Bolo 5kg", "200 doces", "200 salgados", "Decoração"]
    }
  ];

  function toggleItem(item) {
    setSelecionados((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  }

  function getTotal() {
    return selecionados.reduce((acc, item) => acc + item.preco, 0) * quantidade;
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
      descricao: `${quantidade}x kit personalizado`,
      preco: getTotal(),
      tipo: "un"
    });

    setSelecionados([]);
    setQuantidade(1);
  }

  function adicionarKitPronto(kit) {
    adicionar({
      id: kit.id,
      nome: kit.nome,
      descricao: kit.descricao,
      preco: kit.preco,
      tipo: "un"
    });
  }

  const todasOpcoes = produtos.flatMap((c) => c.itens);

  return (
    <section id="monte-seu-kit" style={{ padding: "80px 20px", backgroundColor: "#fff7f9", minHeight: "100vh" }}>

      {/* TÍTULO */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#ec4899", marginBottom: "8px" }}>
          🎉 Monte seu Kit de Festa
        </h2>
        <p style={{ color: "#666", fontSize: "18px" }}>
          Escolha os melhores produtos para sua festa!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "60px" }}>
        {kitsProntos.map((kit) => (
          <div key={kit.id} style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 8px 24px rgba(236,72,153,0.15)", textAlign: "center", transition: "transform 0.3s" }}>

            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{kit.nome}</h3>
            <p style={{ color: "#666", marginBottom: "12px" }}>{kit.descricao}</p>

            <ul style={{ fontSize: "14px", marginBottom: "16px", listStyle: "none" }}>
              {kit.itens.map((i, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>• {i}</li>
              ))}
            </ul>

            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#ec4899", marginBottom: "16px" }}>
              {formatar(kit.preco)}
            </p>

            <button
              onClick={() => adicionarKitPronto(kit)}
              style={{
                width: "100%",
                backgroundColor: "#ec4899",
                color: "white",
                padding: "12px",
                borderRadius: "9999px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer"
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      {/* MONTE SEU KIT */}
      <h2 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "16px", color: "#ec4899" }}>
        ✨ Monte seu Kit
      </h2>

      <p style={{ textAlign: "center", color: "#666", marginBottom: "32px" }}>
        Escolha os itens para montar seu kit personalizado
      </p>

      {/* PRODUTOS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {todasOpcoes.map((item) => {
          const selecionado = selecionados.find((s) => s.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item)}
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: selecionado ? "0 0 0 3px #ec4899" : "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s"
              }}
            >
              <img
                src={item.imagem}
                style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }}
              />

              <h3 style={{ fontSize: "14px", fontWeight: "600" }}>{item.nome}</h3>

              <p style={{ color: "#22c55e", fontWeight: "bold", fontSize: "14px" }}>
                {formatar(item.preco)}
              </p>

              {selecionado && (
                <span style={{ color: "#ec4899", fontSize: "12px" }}>✓ selecionado</span>
              )}
            </div>
          );
        })}
      </div>

      {/* QUANTIDADE */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
        <button
          onClick={() => setQuantidade((prev) => Math.max(1, prev - 1))}
          style={{ width: "40px", height: "40px", border: "1px solid #ddd", borderRadius: "50%", background: "#fff" }}
        >
          -
        </button>

        <span style={{ fontSize: "28px", fontWeight: "bold" }}>{quantidade}</span>

        <button
          onClick={() => setQuantidade((prev) => prev + 1)}
          style={{ width: "40px", height: "40px", border: "1px solid #ddd", borderRadius: "50%", background: "#fff" }}
        >
          +
        </button>
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

    </section>
  );
}