import { useCarrinho } from "../context/CarrinhoContext";
import { useEffect, useState } from "react";

export default function CarrinhoPage() {
  const { carrinho, totalValor, totalComFrete, gerarMensagemWhatsApp, remover, diminuir, adicionar } = useCarrinho();
  const [navHeight, setNavHeight] = useState(120);
  const [itemAberto, setItemAberto] = useState(null);
  const numero = "5511971914833";

  useEffect(() => {
    function updateNav() {
      const nav = typeof document !== "undefined" ? document.getElementById("navbar") : null;
      const altura = nav?.offsetHeight || 120;
      setNavHeight(altura + 20);
    }
    updateNav();
    window.addEventListener("resize", updateNav);
    return () => window.removeEventListener("resize", updateNav);
  }, []);

  function finalizar() {
    window.open(`https://wa.me/${numero}?text=${gerarMensagemWhatsApp()}`);
  }

  return (
    <div style={{ paddingTop: `${navHeight}px`, padding: "20px", maxWidth: "800px", margin: "0 auto", minHeight: "100vh", paddingBottom: "100px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#ec4899", fontWeight: "bold", fontSize: "28px" }}>Seu Pedido 🛒</h1>

      {carrinho.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", fontSize: "18px", marginTop: "40px" }}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {carrinho.map((item) => {
              const itemExpansivel = itemAberto === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #eee",
                    paddingBottom: "12px",
                    marginBottom: "12px",
                    display: "flex",
                    gap: "12px"
                  }}
                >
                  <img
                    src={item.imagem || "/img/produtos/bolo.png"}
                    alt={item.nome}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      backgroundColor: "#f0f0f0"
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() =>
                        setItemAberto(itemExpansivel ? null : item.id)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <h3 style={{ fontWeight: "600", fontSize: "14px" }}>
                        {item.nome}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "6px"
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <button onClick={() => item.quantidade > 1 ? diminuir(item.id) : remover(item.id)}>
                          -
                        </button>

                        <span>{item.quantidade}</span>

                        <button onClick={() => adicionar(item)}>+</button>
                      </div>

                      <span style={{ fontWeight: "bold", color: "#22c55e" }}>
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>

                    {itemExpansivel && (
                      <p style={{ fontSize: "12px", color: "#888", marginTop: "6px" }}>
                        {item.descricao}
                      </p>
                    )}
                  </div>

                  <button onClick={() => remover(item.id)} style={{ color: "red" }}>
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#555" }}>
              <span>Subtotal</span>
              <span>R$ {totalValor.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", color: "#555" }}>
              <span>Frete</span>
              <span>Calculado no checkout</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "bold", borderTop: "1px solid #eee", paddingTop: "16px" }}>
              <span>Total</span>
              <span style={{ color: "#22c55e" }}>R$ {totalComFrete.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={finalizar}
            style={{ marginTop: "24px", width: "100%", backgroundColor: "#22c55e", color: "white", padding: "16px", borderRadius: "12px", border: "none", fontSize: "18px", fontWeight: "600", cursor: "pointer" }}
          >
            Finalizar no WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
