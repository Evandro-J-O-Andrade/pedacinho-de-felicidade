import { useCarrinho } from "../context/CarrinhoContext";
import { useEffect, useRef, useState } from "react";

export default function Carrinho() {
  const {
    carrinho,
    aberto,
    setAberto,
    adicionar,
    diminuír,
    remover,
    totalItens,
    totalValor,
    totalComFrete,
    buscarCep,
    bairro,
    cidade,
    valorFrete,
    gerarMensagemWhatsApp
  } = useCarrinho();

  const ref = useRef();
  const [itemAberto, setItemAberto] = useState(null);
  const numero = "5511999999999";

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function finalizar() {
    window.open(`https://wa.me/${numero}?text=${gerarMensagemWhatsApp()}`);
  }

  const temFreteGratis = totalComFrete >= 500;
  const totalGeral = temFreteGratis ? totalValor : totalComFrete;

  return (
    <>
      {/* BOTÃO FLUTUANTE */}
      <div
        onClick={() => setAberto(true)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          backgroundColor: "#ec4899",
          color: "white",
          padding: "12px 20px",
          borderRadius: "9999px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
          zIndex: 40
        }}
      >
        🛒 ({totalItens})
      </div>

      {aberto && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 40 }}></div>
      )}

      <div
        ref={ref}
        style={{
          position: "fixed",
          top: "95px",
          right: 0,
          height: "calc(100% - 95px)",
          width: "340px",
          backgroundColor: "white",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          zIndex: 50,
          transform: aberto ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* HEADER */}
        <div style={{ padding: "20px", borderBottom: "1px solid #eee", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontWeight: "bold", fontSize: "20px", color: "#ec4899" }}>Seu Pedido</h2>
          <button onClick={() => setAberto(false)} style={{ position: "absolute", right: "16px", top: "16px", fontSize: "20px", border: "none", background: "none", cursor: "pointer" }}>✕</button>
        </div>

        {/* ITENS */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {carrinho.length === 0 && (
            <p style={{ textAlign: "center", color: "#666", padding: "40px 0" }}>Carrinho vazio</p>
          )}

          {carrinho.map((item) => {
            const itemExpansivel = itemAberto === item.id;

            return (
              <div key={item.id} style={{ borderBottom: "1px solid #eee", paddingBottom: "12px", marginBottom: "12px" }}>
                <div
                  onClick={() => setItemAberto(itemExpansivel ? null : item.id)}
                  style={{ cursor: "pointer" }}
                >
                  <h3 style={{ fontWeight: "600", fontSize: "15px" }}>{item.nome}</h3>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <button onClick={() => item.quantidade > 1 ? diminuír(item.id) : remover(item.id)} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #ddd", backgroundColor: "#fff", cursor: "pointer" }}>-</button>
                    <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "600" }}>{item.quantidade}</span>
                    <button onClick={() => adicionar(item)} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #ddd", backgroundColor: "#fff", cursor: "pointer" }}>+</button>
                  </div>
                  <span style={{ fontWeight: "bold", color: "#22c55e" }}>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                  <button onClick={() => remover(item.id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>x</button>
                </div>

                {itemExpansivel && (
                  <div style={{ marginTop: "8px", fontSize: "12px", color: "#888", fontStyle: "italic" }} className="fade-in">
                    {item.descricao || "Sem descrição"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RODAPÉ */}
        <div style={{ padding: "16px", borderTop: "1px solid #eee", marginTop: "auto" }}>
          {/* TOTAL */}
          <p style={{ fontWeight: "bold", fontSize: "18px", textAlign: "center", marginBottom: "8px" }}>
            Total: R$ {totalGeral.toFixed(2)}
          </p>

          {/* ENDEREÇO */}
          {bairro && (
            <p style={{ fontSize: "14px", textAlign: "center", color: "#666", marginBottom: "8px" }}>
              📍 {bairro} - {cidade}
            </p>
          )}

          {/* CEP */}
          <input
            type="text"
            placeholder="Digite seu CEP"
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, "").slice(0, 8);
              const formatado = valor.length > 5 ? valor.replace(/(\d{5})(\d+)/, "$1-$2") : valor;
              e.target.value = formatado;
              buscarCep(formatado);
            }}
            style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "10px", outline: "none", marginBottom: "8px" }}
          />

          {/* FRETE */}
          <p style={{ fontSize: "14px", textAlign: "center", marginBottom: "12px" }}>
            🚚 Frete: R$ {valorFrete.toFixed(2)}
          </p>

          {/* BOTÃO FINALIZAR */}
          <button
            onClick={finalizar}
            style={{ width: "100%", backgroundColor: "#22c55e", color: "white", padding: "14px", borderRadius: "12px", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginBottom: "8px" }}
          >
            Finalizar Pedido
          </button>

          <button
            onClick={() => setAberto(false)}
            style={{ width: "100%", border: "1px solid #e5e7eb", padding: "12px", borderRadius: "12px", backgroundColor: "#fff", cursor: "pointer" }}
          >
            Continuar comprando
          </button>
        </div>
      </div>
    </>
  );
}
