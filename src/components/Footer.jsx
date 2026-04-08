import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const numero = "5511971914833";
  const nome = "Esmeralda";

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, rgba(107,83,68,0.88) 0%, rgba(139,115,85,0.88) 30%, rgba(107,83,68,0.88) 60%, rgba(92,61,46,0.9) 80%, rgba(74,55,40,0.95) 100%)",
        backdropFilter: "blur(10px)",
        color: "#f5f5f5",
        padding: "20px 16px",
        marginTop: "28px",
        borderTop: "1px solid rgba(139,115,85,0.4)"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "8px", color: "#f5f5f5", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
          <span aria-hidden>🎂</span> Pedacinhos de Felicidade
        </h2>

        <p style={{ color: "#e8dcc8", fontWeight: 600, fontSize: "14px", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
          {nome} - (11) 97191-4833
        </p>

        <a
          href={`https://wa.me/${numero}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: "#5c3d2e",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "14px",
            backgroundColor: "#e8dcc8",
            padding: "8px 16px",
            borderRadius: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
          }}
        >
          <FaWhatsapp style={{ fontSize: "18px" }} /> Fale com {nome} no WhatsApp
        </a>

        <p style={{ margin: "4px 0", color: "#e8dcc8", fontWeight: 700, fontSize: "13px" }}>
          💜 Me siga nas redes sociais
        </p>

        <div style={{ display: "flex", gap: "20px", fontSize: "28px" }}>
          <a
            href="https://instagram.com/PEDACINHOS_DE_FELICIDADE70"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#e8dcc8",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff69b4";
              e.currentTarget.style.transform = "scale(1.2) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,105,180,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#e8dcc8";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            style={{
              color: "#e8dcc8",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4267B2";
              e.currentTarget.style.transform = "scale(1.2) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(66,103,178,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#e8dcc8";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            style={{
              color: "#e8dcc8",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff0000";
              e.currentTarget.style.transform = "scale(1.2) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#e8dcc8";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            style={{
              color: "#e8dcc8",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff69b4";
              e.currentTarget.style.transform = "scale(1.2) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,105,180,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#e8dcc8";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaTiktok />
          </a>
          <a
            href="#"
            style={{
              color: "#e8dcc8",
              textDecoration: "none",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1DA1F2";
              e.currentTarget.style.transform = "scale(1.2) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(29,161,242,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#e8dcc8";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaXTwitter />
          </a>
        </div>

        <p style={{ color: "#c4b5a5", fontSize: "12px", fontWeight: 500, marginTop: "4px" }}>
          @PEDACINHOS_DE_FELICIDADE70
        </p>
      </div>

      <div style={{ borderTop: "1px solid rgba(139,115,85,0.35)", marginTop: "14px", paddingTop: "10px", textAlign: "center", color: "#b8a898", fontSize: "12px", fontWeight: 600 }}>
        © {new Date().getFullYear()} Pedacinhos de Felicidade - Todos os direitos reservados
      </div>
    </footer>
  );
}