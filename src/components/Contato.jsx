export default function Contato() {
  const numero = "5511971914833";
  const nome = "Esmeralda";

  return (
    <section
      id="contato"
      style={{
        padding: "100px 20px",
        background: "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
        textAlign: "center",
        position: "relative"
      }}
    >
      <div style={{
        position: "absolute",
        top: "15%",
        left: "3%",
        opacity: 0.08,
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "100px" }}>🎀</span>
      </div>
      <div style={{
        position: "absolute",
        top: "30%",
        right: "5%",
        opacity: 0.06,
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "80px" }}>🧁</span>
      </div>
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "8%",
        opacity: 0.06,
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "60px" }}>✨</span>
      </div>
      <div style={{
        position: "absolute",
        bottom: "25%",
        right: "3%",
        opacity: 0.08,
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "90px" }}>💕</span>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 style={{ 
          fontSize: "42px", 
          fontWeight: "800", 
          marginBottom: "20px", 
          color: "#ec4899",
          letterSpacing: "1px"
        }}>
          💕 Vamos conversar?
        </h2>

        <p style={{ color: "#7c3aed", marginBottom: "36px", fontSize: "18px", maxWidth: "550px", marginInline: "auto", lineHeight: "1.7" }}>
          Estou sempre pronta para transformar seu evento em um momento <strong style={{ color: "#db2777" }}>mágico</strong> e <strong style={{ color: "#db2777" }}>inesquecível</strong>!
        </p>

        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "36px"
        }}>
          <div style={{ 
            backgroundColor: "rgba(255,255,255,0.85)", 
            borderRadius: "24px", 
            padding: "32px", 
            boxShadow: "0 10px 40px rgba(236,72,153,0.15)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontSize: "40px" }}>👩‍🍳</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: "700", margin: 0, color: "#ec4899", fontSize: "18px" }}>{nome}</p>
                <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>Criadora de doces mágicos</p>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#4b5563" }}>
              <span style={{ fontSize: "28px" }}>📱</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: "600", margin: 0, fontSize: "16px" }}>(11) 97191-4833</p>
                <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>WhatsApp</p>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: "rgba(255,255,255,0.85)", 
            borderRadius: "24px", 
            padding: "32px", 
            boxShadow: "0 10px 40px rgba(236,72,153,0.15)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", color: "#4b5563" }}>
              <span style={{ fontSize: "28px" }}>📍</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: "600", margin: 0, fontSize: "16px" }}>São Paulo - SP</p>
                <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Entregamos na região</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#4b5563" }}>
              <span style={{ fontSize: "28px" }}>🕐</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: "600", margin: 0, fontSize: "16px" }}>Atendemos sob encomenda</p>
                <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Feitos com amor 💖</p>
              </div>
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/${numero}`}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#fff",
            padding: "18px 40px",
            borderRadius: "50px",
            fontWeight: "700",
            fontSize: "18px",
            textDecoration: "none",
            boxShadow: "0 10px 30px rgba(34,197,94,0.35)",
            transition: "all 0.3s ease"
          }}
        >
          💬 Mandar mensagem agora
        </a>

        <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "24px" }}>
          Respondemos rapidinho! ✨
        </p>
      </div>
    </section>
  );
}