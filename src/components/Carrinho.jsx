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
      {/* BOTÃO FLUTUANTE */}
      <div
        onClick={() => setAberto(true)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          backgroundColor: "#ec4899",
          color: "white",
          padding: "12px 18px",
          borderRadius: "9999px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
          zIndex: 40,
          fontWeight: "600"
        }}
      >
        🛒 {totalItens}
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
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 40
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
          width: "360px",
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
        <div style={{ padding: "16px", borderBottom: "1px solid #eee", position: "relative" }}>
          <h2 style={{ textAlign: "center", color: "#ec4899" }}>Seu Pedido</h2>
          <button
            onClick={() => setAberto(false)}
            style={{
              position: "absolute",
              right: "16px",
              top: "12px",
              fontSize: "20px",
              border: "none",
              background: "none",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        {/* LISTA */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
          {carrinho.length === 0 && (
            <p style={{ textAlign: "center", color: "#777" }}>
              Carrinho vazio
            </p>
          )}

          {carrinho.map((item) => {
            const abertoItem = itemAberto === item.id;

            return (
              <div key={item.id} style={{ marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                
                {/* LINHA PRINCIPAL */}
                <div style={{ display: "flex", gap: "10px" }}>
                  
                  {/* IMAGEM */}
                  <img
                    src={item.imagem || "/img/produtos/bolo.png"}
                    alt={item.nome}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      backgroundColor: "#f0f0f0"
                    }}
                  />

                  {/* INFO */}
                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() => setItemAberto(abertoItem ? null : item.id)}
                      style={{ fontWeight: "600", cursor: "pointer" }}
                    >
                      {item.nome}
                    </div>

                    <span style={{ color: "#22c55e", fontWeight: "bold" }}>
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>

                    {/* CONTROLES */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                      <button onClick={() => diminuir(item.id)}>-</button>
                      <span>{item.quantidade}</span>
                      <button onClick={() => adicionar(item)}>+</button>
                      <button onClick={() => remover(item.id)} style={{ color: "red" }}>
                        x
                      </button>
                    </div>
                  </div>
                </div>

                {/* DESCRIÇÃO */}
                {abertoItem && (
                  <div style={{ fontSize: "12px", color: "#777", marginTop: "6px" }}>
                    {item.descricao}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER FIXO */}
        <div style={{
          padding: "14px",
          borderTop: "1px solid #eee",
          background: "#fff"
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
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "6px"
            }}
          />

          {/* ENDEREÇO */}
          {bairro && (
            <p style={{ fontSize: "12px", textAlign: "center" }}>
              📍 {bairro} - {cidade}
            </p>
          )}

          {/* FRETE GRÁTIS INFO */}
          {totalValor < FRETE_GRATIS_MINIMO && (
            <p style={{ fontSize: "11px", textAlign: "center", color: "#888", marginTop: "4px" }}>
              Frete grátis para compras acima de R$ {FRETE_GRATIS_MINIMO.toFixed(2)}
            </p>
          )}
          {freteGratis && (
            <p style={{ fontSize: "11px", textAlign: "center", color: "#22c55e", marginTop: "4px" }}>
              Frete grátis aplicado!
            </p>
          )}

          {/* TOTAL */}
          <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "6px" }}>
            Total: R$ {totalGeral.toFixed(2)}
          </p>

          {/* BOTÕES */}
          <button
            onClick={finalizar}
            style={{
              width: "100%",
              backgroundColor: "#22c55e",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              marginTop: "8px",
              fontWeight: "600"
            }}
          >
            Finalizar no WhatsApp
          </button>

          <button
            onClick={() => window.location.href = "/carrinho"}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          >
            Ver carrinho completo
          </button>

          <button
            onClick={() => setAberto(false)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              backgroundColor: "#f9fafb"
            }}
          >
            Continuar comprando
          </button>
        </div>
      </div>
    </>
  );
}