import { useCarrinho } from "../context/CarrinhoContext";
import { useEffect, useRef, useState } from "react";

export default function Carrinho() {
  const {
    carrinho,
    aberto,
    setAberto,
    adicionar,
    disminuir,
    remover,
    totalItens,
    totalValor,
    totalComFrete,
    buscarCep,
    cep,
    bairro,
    cidade,
    freteAplicado,
    freteGratis,
    FRETE_GRATIS_MINIMO,
    rua,
    valorFrete,
    gerarMensagemWhatsApp
  } = useCarrinho();

  const ref = useRef();
  const [itemAberto, setItemAberto] = useState(null);
  const [navHeight, setNavHeight] = useState(80);

  const numero = "5511971914833";

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

  function finalizar() {
    window.open(`https://wa.me/${numero}?text=${gerarMensagemWhatsApp()}`);
  }

  const totalGeral = freteGratis ? totalValor : totalComFrete;

  return (
    <>
      <style>{`
        .carrinho-btn {
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Poppins', sans-serif;
        }
        .carrinho-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .carrinho-btn:active {
          transform: translateY(0);
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
          transition: all 0.2s ease;
        }
        .carrinho-control:hover {
          background: #fbcfe8;
        }
        .carrinho-remove {
          background: none;
          border: none;
          color: #f43f5e;
          cursor: pointer;
          font-size: 14px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .carrinho-remove:hover {
          opacity: 1;
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
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease"
        }}
      >
        <span style={{ fontSize: "18px" }}>🛒</span>
        <span>{totalItens} {totalItens === 1 ? "item" : "itens"}</span>
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
          opacity: 0.05,
          pointerEvents: "none",
          zIndex: 0
        }}>
          <img 
            src="/img/logo.png" 
            alt="" 
            style={{ width: "250px", height: "250px", objectFit: "contain" }}
          />
        </div>

        {/* HEADER */}
        <div style={{ 
          padding: "20px 16px", 
          borderBottom: "1px solid #fce7f3", 
          position: "relative",
          background: "linear-gradient(135deg, #fff0f5 0%, #fdf2f8 100%)",
          zIndex: 1
        }}>
          <h2 style={{ 
            textAlign: "center", 
            color: "#ec4899",
            fontWeight: "700",
            fontSize: "22px",
            margin: 0,
            fontFamily: "'Poppins', sans-serif"
          }}>
            ✨ Seu Pedido
          </h2>
          <button
            onClick={() => setAberto(false)}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "22px",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#9ca3af"
            }}
          >
            ✕
          </button>
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
                borderBottom: "1px solid #fce7f3", 
                paddingBottom: "14px",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "12px",
                padding: "12px"
              }}>
                
                {/* LINHA PRINCIPAL */}
                <div style={{ display: "flex", gap: "12px" }}>
                  
                  {/* IMAGEM */}
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

                  {/* INFO */}
                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() => setItemAberto(abertoItem ? null : item.id)}
                      style={{ 
                        fontWeight: "600", 
                        cursor: "pointer",
                        color: "#4b5563",
                        fontSize: "14px",
                        lineHeight: "1.3"
                      }}
                    >
                      {item.nome}
                    </div>

                    <span style={{ color: "#22c55e", fontWeight: "700", fontSize: "15px", display: "block", marginTop: "4px" }}>
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>

                    {/* CONTROLES */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                      <button 
                        className="carrinho-control"
                        onClick={() => diminuir(item.id)}
                      >
                        −
                      </button>
                      <span style={{ fontWeight: "600", minWidth: "24px", textAlign: "center", color: "#4b5563" }}>
                        {item.quantidade}
                      </span>
                      <button 
                        className="carrinho-control"
                        onClick={() => adicionar(item)}
                      >
                        +
                      </button>
                      <button 
                        className="carrinho-remove"
                        onClick={() => remover(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>

                {/* DESCRIÇÃO */}
                {abertoItem && (
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#9ca3af", 
                    marginTop: "10px",
                    backgroundColor: "#fff5f8",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    lineHeight: "1.4"
                  }}>
                    📝 {item.descricao}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER FIXO */}
        <div style={{
          padding: "16px",
          borderTop: "1px solid #fce7f3",
          background: "linear-gradient(180deg, #fff5f8 0%, #fff0f5 100%)",
          position: "relative",
          zIndex: 1
        }}>
          
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
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #fce7f3",
              marginBottom: "10px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "white",
              color: "#4b5563"
            }}
          />

          {/* ENDEREÇO */}
          {bairro && (
            <p style={{ fontSize: "12px", textAlign: "center", color: "#9ca3af", marginBottom: "8px" }}>
              📍 {bairro} - {cidade}
            </p>
          )}

          {/* FRETE GRÁTIS INFO */}
          {totalValor < FRETE_GRATIS_MINIMO && (
            <p style={{ fontSize: "11px", textAlign: "center", color: "#f472b6", marginTop: "4px" }}>
              🚚 Frete grátis para compras acima de R$ {FRETE_GRATIS_MINIMO.toFixed(2)}
            </p>
          )}
          {freteGratis && (
            <p style={{ fontSize: "11px", textAlign: "center", color: "#22c55e", fontWeight: "600", marginTop: "4px" }}>
              🎉 Frete grátis aplicado!
            </p>
          )}

          {/* TOTAL */}
          <div style={{ 
            textAlign: "center", 
            fontWeight: "700", 
            marginTop: "12px",
            fontSize: "20px",
            color: "#ec4899"
          }}>
            Total: R$ {totalGeral.toFixed(2)}
          </div>

          {/* BOTÕES */}
          <button
            onClick={finalizar}
            className="carrinho-btn"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
              color: "white",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              marginTop: "12px",
              fontWeight: "600",
              fontSize: "16px"
            }}
          >
            💬 Finalizar no WhatsApp
          </button>

          <button
            onClick={() => window.location.href = "/carrinho"}
            className="carrinho-btn"
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "12px",
              border: "2px solid #fce7f3",
              backgroundColor: "white",
              color: "#ec4899",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            📋 Ver carrinho completo
          </button>

          <button
            onClick={() => setAberto(false)}
            className="carrinho-btn"
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              backgroundColor: "white",
              color: "#6b7280",
              fontWeight: "500",
              fontSize: "14px"
            }}
          >
            ← Continuar comprando
          </button>
        </div>
      </div>
    </>
  );
}