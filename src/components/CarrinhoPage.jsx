import { useCarrinho } from "../context/CarrinhoContext";
import { useEffect, useState } from "react";
import Image from "./Image";
import { getImagemProduto } from "../utils/imagemUtils";

export default function CarrinhoPage() {
const {
    carrinho,
    totalValor,
    totalComFrete,
    gerarMensagemWhatsApp,
    remover,
    diminuir,
    adicionar,
    limpar,
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
    buscarCep,
    freightAplicado,
freightGratis,
    enderecoValido
  } = useCarrinho();

  const FRETE_GRATIS_MINIMO = 500;
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
    const telefoneLimpo = telefoneCliente.replace(/\D/g, "");

    if (!nomeCliente.trim() || nomeCliente.trim().length < 3) {
      alert("Por favor, insira seu nome completo!");
      return;
    }

    if (!telefoneLimpo || telefoneLimpo.length < 10) {
      alert("Por favor, insira um telefone válido!");
      return;
    }

    if (!enderecoValido) {
      alert("Por favor, insira um CEP válido!");
      return;
    }

    if (!numero || !numero.trim()) {
      alert("Por favor, informe o número da casa!");
      return;
    }

    const texto = gerarMensagemWhatsApp();

    window.open(
      `https://api.whatsapp.com/send?phone=${numeroZap}&text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #f472b6",
    marginBottom: "12px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(236, 72, 153, 0.1)"
  };

  return (
    <div style={{ 
      paddingTop: "185px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingBottom: "120px",
      maxWidth: "100%", 
      margin: "0 auto", 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #fff0f5 0%, #fff 100%)",
      position: "relative"
    }}>
      {/* Banner */}
      <div className="page-banner" style={{ "--banner-ratio": "1840 / 576" }}>
        <Image 
          src="/img/carrinhopagina/bannercarrinho.png"
          alt="Carrinho"
          className="page-banner-img"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            objectPosition: "center center",
            display: "block"
          }}
        />
      </div>
      <img 
        src="/img/logo.png" 
        alt=""
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "350px",
          opacity: 0.15,
          pointerEvents: "none",
          zIndex: 0
        }}
      />
      <div className="carrinho-container" style={{ position: "relative", zIndex: 1 }}>
      <style>{`
        .carrinho-container {
          max-width: 700px;
          margin: 0 auto;
        }
.carrinho-item-img {
          width: 120px !important;
          height: 120px !important;
        }
        .carrinho-btn-acao {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #fce7f3;
          background: linear-gradient(135deg, #fff0f5 0%, #fdf2f8 100%);
          color: #ec4899;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.15);
        }
        .carrinho-btn-acao:hover {
          background: linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.25);
        }
        .carrinho-btn-acao:active {
          transform: scale(0.95);
        }
        @media (min-width: 769px) {
          .carrinho-container {
            max-width: 1000px;
          }
          .carrinho-item-img {
            width: 180px !important;
            height: 180px !important;
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
        🛒 Confira o seu Pedido
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
                  <Image
                    src={getImagemProduto(item)}
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
                          border: "1px dashed #f59e0b",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word"
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
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                  {enderecoValido ? `R$ ${freightAplicado.toFixed(2)}` : "Digite o CEP"}
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
                  🚚 Compra acima de <strong>R$ 500,00</strong> você ganha Frete Grátis!
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

          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "16px", 
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(236,72,153,0.08)",
            border: "1px solid #fce7f3"
          }}>
            <h3 style={{ color: "#ec4899", fontWeight: "700", marginBottom: "10px", fontSize: "18px" }}>
              💳 Formas de Pagamento
            </h3>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.6, margin: "0 0 14px" }}>
              A forma de pagamento é combinada no WhatsApp após o envio do pedido.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "10px"
            }}>
              {[
                { icon: "⚡", titulo: "Pix", texto: "Chave, link ou QR Code pelo WhatsApp" },
                { icon: "💳", titulo: "Cartão", texto: "Débito ou crédito via link/maquininha" },
                { icon: "🏦", titulo: "Transferência", texto: "Dados enviados com segurança" },
                { icon: "💵", titulo: "Dinheiro", texto: "Em espécie na entrega ou retirada" }
              ].map((forma) => (
                <div
                  key={forma.titulo}
                  style={{
                    background: "#fff7f9",
                    border: "1px solid #fbcfe8",
                    borderRadius: "12px",
                    padding: "12px",
                    minHeight: "104px"
                  }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "6px" }}>{forma.icon}</div>
                  <strong style={{ display: "block", color: "#9d174d", fontSize: "14px", marginBottom: "4px" }}>
                    {forma.titulo}
                  </strong>
                  <span style={{ color: "#6b7280", fontSize: "12px", lineHeight: 1.45 }}>
                    {forma.texto}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "14px",
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: "#ecfdf5",
              border: "1px solid #bbf7d0",
              color: "#15803d",
              fontSize: "13px",
              lineHeight: 1.55
            }}>
              🔒 Para sua segurança, links de pagamento e QR Code Pix são enviados somente na conversa do WhatsApp da Pedacinhos de Felicidade.
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            {carrinho.length > 0 && (
              <button 
                onClick={() => {
                  limpar();
                }}
                style={{ 
                  flex: 1, 
                  backgroundColor: "#fee2e2", 
                  color: "#dc2626", 
                  padding: "14px", 
                  borderRadius: "16px", 
                  border: "2px solid #dc2626", 
                  fontSize: "14px", 
                  fontWeight: "600", 
                  cursor: "pointer"
                }}
              >
                🗑️ Limpar
              </button>
            )}
            <button 
              onClick={() => window.location.href = "/"}
              style={{ 
                flex: 1, 
                backgroundColor: "transparent", 
                color: "#ec4899", 
                padding: "14px", 
                borderRadius: "16px", 
                border: "2px solid #ec4899", 
                fontSize: "14px", 
                fontWeight: "600", 
                cursor: "pointer"
              }}
            >
              ← Continuar
            </button>
          </div>

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

          <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
            <h3 style={{ color: "#16a34a", fontSize: "16px", marginBottom: "12px" }}>🚚 Informações de Entrega</h3>
            <ul style={{ color: "#15803d", fontSize: "13px", paddingLeft: "16px", lineHeight: 1.8 }}>
              <li>Entregamos em toda a região de Poá e entorno</li>
              <li>Frete grátis para pedidos acima de R$ 500</li>
              <li>Pedidos com antecedência mínima de 48h</li>
            </ul>
          </div>

          <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#fef3c7", borderRadius: "12px", border: "1px solid #fcd34d" }}>
            <h3 style={{ color: "#d97706", fontSize: "16px", marginBottom: "12px" }}>❓ Perguntas Frequentes</h3>
            <div style={{ color: "#92400e", fontSize: "13px", lineHeight: 1.8 }}>
              <p><strong>Qual o prazo?</strong><br/>48h de antecedência</p>
              <p style={{ marginTop: "8px" }}><strong>Como pago?</strong><br/>Pix com QR Code/link, transferência, cartão de débito/crédito ou dinheiro em espécie</p>
              <p style={{ marginTop: "8px" }}><strong>Posso personalizar?</strong><br/>Sim! Escreva no pedido</p>
              <p style={{ marginTop: "8px" }}><strong>Vocês entregam?</strong><br/>Sim, em Poá e região</p>
              <p style={{ marginTop: "8px" }}><strong>Posso buscar?</strong><br/>Sim, sem custo</p>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
