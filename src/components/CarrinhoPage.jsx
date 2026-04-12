import { useCarrinho } from "../context/CarrinhoContext";
import { useEffect, useState } from "react";

export default function CarrinhoPage() {
  const {
    carrinho,
    totalValor,
    totalComFrete,
    gerarMensagemWhatsApp,
    remover,
    disminuir,
    adicionar,
    nomeCliente,
    setNomeCliente,
    telefoneCliente,
    setTelefoneCliente,
    cep,
    setCep,
    bairro,
    cidade,
    rua,
    numero,
    setNumero,
    complemento,
    setComplemento,
    valorFrete,
    buscarCep,
    freightAplicado,
    freightGratis,
    FRETE_GRATIS_MINIMO,
    enderecoValido
  } = useCarrinho();

  const [navHeight, setNavHeight] = useState(120);
  const numeroZap = "5511971914833";

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

  function handleCepChange(e) {
    const valor = e.target.value.replace(/\D/g, "").slice(0, 8);
    const formatado = valor.length > 5 ? valor.replace(/(\d{5})(\d+)/, "$1-$2") : valor;
    setCep(valor);
    if (valor.length === 8) {
      buscarCep(formatado);
    }
  }

  function finalizar() {
    if (!nomeCliente.trim()) {
      alert("Por favor, insira seu nome!");
      return;
    }
    if (!telefoneCliente.trim()) {
      alert("Por favor, insira seu telefone!");
      return;
    }
    if (!enderecoValido) {
      alert("Por favor, insira um CEP válido!");
      return;
    }
    window.open(`https://wa.me/${numeroZap}?text=${gerarMensagemWhatsApp()}`);
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #fce7f3",
    marginBottom: "12px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s",
    backgroundColor: "#fafafa"
  };

  return (
    <div style={{ 
      paddingTop: `${navHeight}px`, 
      padding: "20px", 
      maxWidth: "100%", 
      margin: "0 auto", 
      minHeight: "100vh", 
      paddingBottom: "120px",
      background: "linear-gradient(180deg, #fff0f5 0%, #fff 100%)"
    }}>
      <style>{`
        .carrinho-container {
          max-width: 600px;
          margin: 0 auto;
        }
        @media (min-width: 769px) {
          .carrinho-container {
            max-width: 700px;
          }
          .carrinho-item-img {
            width: 180px !important;
            height: 180px !important;
          }
        }
        .carrinho-btn-acao {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #fce7f3;
          background: #fff0f5;
          color: #ec4899;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .carrinho-btn-acao:hover {
          background: #fbcfe8;
          transform: scale(1.1);
        }
        @media (min-width: 769px) {
          .carrinho-item-img {
            width: 160px !important;
            height: 160px !important;
          }
        }
      `}</style>

      <h2 style={{ 
        textAlign: "center", 
        marginBottom: "8px", 
        color: "#ec4899", 
        fontWeight: "800", 
        fontSize: "32px" 
      }}>
        🛒 Confira seu Pedido
      </h2>

      <p style={{ 
        textAlign: "center", 
        color: "#6b7280", 
        fontSize: "16px",
        marginBottom: "24px"
      }}>
        Boas compras! 💜
      </p>

      {carrinho.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          color: "#666", 
          fontSize: "18px", 
          marginTop: "60px",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>
          <span style={{ fontSize: "60px", display: "block", marginBottom: "16px" }}>🛒</span>
          Seu carrinho está vazio
        </div>
      ) : (
        <>
          {/* LISTA DE PRODUTOS */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "16px",
            marginBottom: "24px"
          }}>
            {carrinho.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 4px 15px rgba(236,72,153,0.08)",
                    display: "flex",
                    gap: "14px",
                    position: "relative"
                  }}
                >
                  <img
                    src={item.imagem || "/img/produtos/bolo.png"}
                    alt={item.nome}
                    className="carrinho-item-img"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      backgroundColor: "#f0f0f0"
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div>
                      <h3 style={{ fontWeight: "700", fontSize: "16px", color: "#333" }}>
                        {item.nome}
                      </h3>
                      {item.descricao && (
                        <p style={{ 
                          fontSize: "13px", 
                          color: "#6b7280", 
                          marginTop: "6px",
                          backgroundColor: "#fef3c7",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px dashed #f59e0b"
                        }}>
                          📝 {item.descricao}
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px"
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <button 
                          className="carrinho-btn-acao"
                          onClick={() => item.quantidade > 1 ? diminuir(item.id) : remover(item.id)}
                        >
                          −
                        </button>

                        <span style={{ fontWeight: "600", minWidth: "24px", textAlign: "center", fontSize: "16px" }}>
                          {item.quantidade}
                        </span>

                        <button 
                          className="carrinho-btn-acao"
                          onClick={() => adicionar(item)}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontWeight: "700", color: "#22c55e", fontSize: "16px" }}>
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => remover(item.id)} 
                    style={{ 
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "none", 
                      border: "none", 
                      color: "#f43f5e",
                      cursor: "pointer",
                      fontSize: "18px",
                      padding: "4px"
                    }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* DADOS DO CLIENTE */}
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "16px", 
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(236,72,153,0.08)"
          }}>
            <h3 style={{ color: "#ec4899", fontWeight: "700", marginBottom: "16px", fontSize: "18px" }}>
              👤 Seus Dados
            </h3>
            
            <input
              placeholder="Seu nome completo"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Telefone (WhatsApp)"
              value={telefoneCliente}
              onChange={(e) => setTelefoneCliente(e.target.value)}
              style={inputStyle}
              type="tel"
            />
          </div>

          {/* ENDEREÇO */}
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "16px", 
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(236,72,153,0.08)"
          }}>
            <h3 style={{ color: "#ec4899", fontWeight: "700", marginBottom: "16px", fontSize: "18px" }}>
              📦 Endereço de Entrega
            </h3>
            
            <input
              placeholder="Digite seu CEP"
              value={cep}
              onChange={handleCepChange}
              style={inputStyle}
            />

            {enderecoValido && (
              <div style={{ 
                backgroundColor: "#ecfdf5", 
                padding: "12px", 
                borderRadius: "8px",
                marginTop: "8px"
              }}>
                <p style={{ fontSize: "14px", color: "#065f46", fontWeight: "500" }}>
                  📍 {rua}, {bairro} - {cidade}
                </p>
              </div>
            )}

            {enderecoValido && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
                <input
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  style={inputStyle}
                />
                <input
                  placeholder="Complemento (apt, sala, etc)"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  style={inputStyle}
                />
              </div>
            )}
          </div>

          {/* TOTAL */}
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "16px", 
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(236,72,153,0.08)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#6b7280", fontSize: "16px" }}>
              <span>Subtotal</span>
              <span>R$ {totalValor.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", color: "#6b7280", fontSize: "16px" }}>
              <span>Frete</span>
              {freightGratis ? (
                <span style={{ color: "#22c55e", fontWeight: "600" }}>🎉 Grátis</span>
              ) : (
                <span style={{ color: "#f59e0b", fontWeight: "600" }}>
                  {enderecoValido ? `R$ ${freightAplicado.toFixed(2)}` : "Calculando..."}
                </span>
              )}
            </div>

            {!freightGratis && totalValor < FRETE_GRATIS_MINIMO && (
              <div style={{ 
                backgroundColor: "#fef3c7", 
                padding: "12px", 
                borderRadius: "8px",
                marginBottom: "16px",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "14px", color: "#92400e", margin: 0 }}>
                  🚚 Compra acima de <strong>R$ {(FRETE_GRATIS_MINIMO - totalValor).toFixed(2)}</strong> você ganha Frete Grátis!
                </p>
              </div>
            )}

            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              fontSize: "24px", 
              fontWeight: "800", 
              borderTop: "2px solid #fce7f3", 
              paddingTop: "16px" 
            }}>
              <span>Total</span>
              <span style={{ color: "#22c55e" }}>R$ {totalComFrete.toFixed(2)}</span>
            </div>
          </div>

          {/* BOTÃO FINALIZAR */}
          <button 
            onClick={finalizar}
            style={{ 
              width: "100%", 
              background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)", 
              color: "white", 
              padding: "20px", 
              borderRadius: "16px", 
              border: "none", 
              fontSize: "20px", 
              fontWeight: "700", 
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(34,197,94,0.35)",
              transition: "transform 0.2s"
            }}
          >
            💬 Finalizar Pedido
          </button>

          <button 
            onClick={() => window.location.href = "/"}
            style={{ 
              width: "100%", 
              backgroundColor: "transparent", 
              color: "#ec4899", 
              padding: "16px", 
              borderRadius: "16px", 
              border: "2px solid #ec4899", 
              fontSize: "16px", 
              fontWeight: "600", 
              cursor: "pointer",
              marginTop: "12px"
            }}
          >
            ← Continuar Comprando
          </button>
        </>
      )}
    </div>
  );
}