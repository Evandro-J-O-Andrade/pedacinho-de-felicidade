import { useCarrinho } from "../context/CarrinhoContext";
import { useEffect, useRef, useState } from "react";

export default function Carrinho() {
  const {
    carrinho,
    aberto,
    setAberto,
    adicionar,
    diminuir,
    remover,
    totalItens,
    totalValor
  } = useCarrinho();

  const ref = useRef();
  const [itemAberto, setItemAberto] = useState(null);
  const [navHeight, setNavHeight] = useState(80);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function updateNav() {
      const nav = document.getElementById("navbar");
      const altura = nav?.offsetHeight || 80;
      setNavHeight(altura + 8);
    }
    updateNav();
    window.addEventListener("resize", updateNav);
    return () => window.removeEventListener("resize", updateNav);
  }, []);

  return (
    <>
      <style>{`
        .carrinho-btn {
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .carrinho-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .carrinho-control {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #fce7f3;
          background: #fff0f5;
          color: #ec4899;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .carrinho-control:hover {
          background: #fbcfe8;
        }
      `}</style>

      {/* BOTÃO FLUTUANTE */}
      <div
        onClick={() => setAberto(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
          color: "white",
          padding: "14px 24px",
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(236, 72, 153, 0.35)",
          cursor: "pointer",
          zIndex: 40,
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        🛒 {totalItens} {totalItens === 1 ? "item" : "itens"}
      </div>

      {/* BACKDROP */}
      {aberto && (
        <div
          style={{
            position: "fixed",
            top: navHeight,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: 40,
            backdropFilter: "blur(3px)"
          }}
        />
      )}

      {/* CARRINHO */}
      <div
        ref={ref}
        style={{
          position: "fixed",
          top: navHeight,
          right: 0,
          bottom: 0,
          width: "380px",
          background: "linear-gradient(180deg, #fffafc 0%, #fff5f8 100%)",
          boxShadow: "-8px 0 30px rgba(236, 72, 153, 0.15)",
          zIndex: 50,
          transform: aberto ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* FUNDO MARCA D'ÁGUA */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.18,
          pointerEvents: "none",
          zIndex: 0
        }}>
          <img 
            src="/img/logo.png" 
            alt="" 
            style={{ width: "380px", height: "380px", objectFit: "contain" }}
          />
        </div>

        {/* HEADER */}
        <div style={{ 
          padding: "20px 16px", 
          borderBottom: "1px solid #fce7f3", 
          textAlign: "center",
          background: "linear-gradient(135deg, #fff0f5 0%, #fdf2f8 100%)",
          position: "relative",
          zIndex: 1
        }}>
          <h2 style={{ color: "#ec4899", fontWeight: "700", fontSize: "22px", margin: 0 }}>
            ✨ Seu Pedido
          </h2>
        </div>

        {/* LISTA */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", position: "relative", zIndex: 1 }}>
          {carrinho.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <span style={{ fontSize: "50px", display: "block", marginBottom: "16px" }}>🛒</span>
              <p style={{ color: "#9ca3af", fontSize: "16px" }}>
                Seu carrinho está vazio
              </p>
              <p style={{ color: "#f472b6", fontSize: "14px" }}>
                Adicione nossos deliciosos produtos!
              </p>
            </div>
          )}

          {carrinho.map((item) => {
            const abertoItem = itemAberto === item.id;

            return (
              <div key={item.id} style={{ 
                marginBottom: "14px",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "12px",
                padding: "12px"
              }}>
                <div style={{ display: "flex", gap: "12px" }}>
                  
                  <div style={{ position: "relative" }}>
                    <img
                      src={item.imagem || "/img/produtos/bolo.png"}
                      alt={item.nome}
                      style={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        border: "2px solid #fce7f3"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      backgroundColor: "#ec4899",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold"
                    }}>
                      {item.quantidade}
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() => setItemAberto(abertoItem ? null : item.id)}
                      style={{ fontWeight: "600", cursor: "pointer", color: "#4b5563" }}
                    >
                      {item.nome}
                    </div>

                    <span style={{ color: "#22c55e", fontWeight: "700", fontSize: "15px" }}>
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>

                    <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                      <button className="carrinho-control" onClick={() => diminuir(item.id)}>−</button>
                      <span style={{ fontWeight: "600", minWidth: "24px", textAlign: "center" }}>{item.quantidade}</span>
                      <button className="carrinho-control" onClick={() => adicionar(item)}>+</button>
                      <button 
                        onClick={() => remover(item.id)} 
                        style={{ background: "none", border: "none", color: "#f43f5e", cursor: "pointer", fontSize: "14px" }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>

                {abertoItem && (
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#9ca3af", 
                    marginTop: "10px",
                    backgroundColor: "#fff5f8",
                    padding: "8px 12px",
                    borderRadius: "8px"
                  }}>
                    📝 {item.descricao}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div style={{ 
          padding: "16px", 
          borderTop: "1px solid #fce7f3",
          background: "linear-gradient(180deg, #fff5f8 0%, #fff0f5 100%)",
          position: "relative",
          zIndex: 1
        }}>
          <p style={{ 
            textAlign: "center", 
            fontWeight: "700", 
            marginTop: "12px", 
            fontSize: "20px", 
            color: "#ec4899" 
          }}>
            Subtotal: R$ {totalValor.toFixed(2)}
          </p>

          <button
            onClick={() => window.location.href = "/carrinho"}
            className="carrinho-btn"
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "14px",
              background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "16px"
            }}
          >
            💰 Finalizar Compra
          </button>

          <button
            onClick={() => setAberto(false)}
            className="carrinho-btn"
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "10px",
              border: "1px dashed #fce7f3",
              borderRadius: "20px",
              backgroundColor: "transparent",
              color: "#ec4899",
              fontWeight: "500",
              fontSize: "13px",
              letterSpacing: "0.5px"
            }}
          >
            ← Continuar compras
          </button>
        </div>
      </div>
    </>
  );
}