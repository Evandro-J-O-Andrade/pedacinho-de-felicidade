import Galeria from "./Galeria";

export default function Eventos() {
  const numero = "5511971914833";
  const nome = "Esmeralda";

  return (
    <section
      id="eventos"
      style={{
        padding: "80px 20px",
        textAlign: "center",
        background: "linear-gradient(180deg, #fff7f9 0%, #fff0f5 100%)",
        position: "relative"
      }}
    >
      <div style={{
        position: "absolute",
        top: "10%",
        right: "8%",
        opacity: 0.06,
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "100px" }}>🎉</span>
      </div>
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "5%",
        opacity: 0.06,
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "70px" }}>🎂</span>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ 
          fontSize: "38px", 
          fontWeight: "bold", 
          marginBottom: "16px", 
          color: "#ec4899",
          textShadow: "0 2px 8px rgba(236,72,153,0.15)"
        }}>
          ✨ Eventos Especiais
        </h2>

        <p style={{ 
          marginBottom: "28px", 
          maxWidth: "600px", 
          marginInline: "auto", 
          color: "#666", 
          lineHeight: 1.7,
          fontSize: "16px"
        }}>
          Transforme seu evento em um momento <strong style={{ color: "#ec4899" }}>inesquecível</strong>! 
          <br />
          Decoração encantadora, doces e salgados fresquinhos, tudo pensado com <em style={{ color: "#f472b6" }}>muito carinho</em> para você e seus convidados.
        </p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "20px",
          maxWidth: "700px",
          margin: "0 auto 32px"
        }}>
          <div style={{ 
            backgroundColor: "white", 
            padding: "20px", 
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(236,72,153,0.1)"
          }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>🎈</span>
            <h3 style={{ color: "#ec4899", fontSize: "16px", margin: "0 0 8px" }}>Aniversários</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>Decorações temáticas e deliciosos sabores</p>
          </div>

          <div style={{ 
            backgroundColor: "white", 
            padding: "20px", 
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(236,72,153,0.1)"
          }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>💒</span>
            <h3 style={{ color: "#ec4899", fontSize: "16px", margin: "0 0 8px" }}>Casamentos</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>Doces gourmet e bolo perfeito</p>
          </div>

          <div style={{ 
            backgroundColor: "white", 
            padding: "20px", 
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(236,72,153,0.1)"
          }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>🎓</span>
            <h3 style={{ color: "#ec4899", fontSize: "16px", margin: "0 0 8px" }}>Formaturas</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>Kit completo para sua festa</p>
          </div>
        </div>

        <a
          href={`https://wa.me/${numero}?text=Olá ${nome}, gostaria de fazer um orçamento para meu evento!`}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: "50px",
            fontWeight: 700,
            fontSize: "16px",
            textDecoration: "none",
            boxShadow: "0 8px 25px rgba(236,72,153,0.35)",
            transition: "all 0.3s ease"
          }}
        >
          💖 Solicitar orçamento
        </a>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Galeria embedded />
      </div>
    </section>
  );
}