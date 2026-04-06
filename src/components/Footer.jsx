import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const numero = "5511971914833";
  const nome = "Esmeralda";

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #6b5344 0%, #8b7355 30%, #6b5344 60%, #5c3d2e 80%, #4a3728 100%)",
        color: "#f5f5f5",
        padding: "16px 16px",
        marginTop: "28px",
        borderTop: "2px solid #8b7355"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "0.1px", display: "flex", alignItems: "center", gap: "6px", color: "#f5f5f5" }}>
          <span aria-hidden>🎂</span> Pedacinho de Felicidade
        </h2>

        <p style={{ color: "#e8dcc8", fontWeight: 600, fontSize: "13px" }}>
          {nome} - (11) 97191-4833
        </p>

        <a
          href={`https://wa.me/${numero}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#5c3d2e",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "14px",
            backgroundColor: "#e8dcc8",
            padding: "6px 12px",
            borderRadius: "8px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.18)"
          }}
        >
          <FaWhatsapp /> Fale com {nome} no WhatsApp
        </a>

        <p style={{ margin: "2px 0", color: "#e8dcc8", fontWeight: 700, fontSize: "13px" }}>
          Me siga nas redes sociais
        </p>

        <div style={{ display: "flex", gap: "10px", fontSize: "22px" }}>
          {[
            { Icon: FaInstagram, color: "#e8dcc8", hoverColor: "#ff69b4", glowColor: "rgba(255,105,180,0.8)" },
            { Icon: FaFacebook, color: "#e8dcc8", hoverColor: "#4267B2", glowColor: "rgba(66,103,178,0.8)" },
            { Icon: FaYoutube, color: "#e8dcc8", hoverColor: "#ff0000", glowColor: "rgba(255,0,0,0.8)" },
            { Icon: FaTiktok, color: "#e8dcc8", hoverColor: "#ff69b4", glowColor: "rgba(255,105,180,0.8)" },
            { Icon: FaXTwitter, color: "#e8dcc8", hoverColor: "#1DA1F2", glowColor: "rgba(29,161,242,0.8)" }
          ].map(({ Icon, color, hoverColor, glowColor }, idx) => (
            <a
              key={idx}
              href="#"
              style={{
                color: color,
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = hoverColor;
                e.currentTarget.style.transform = "scale(1.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(107,78,61,0.45)", marginTop: "12px", paddingTop: "8px", textAlign: "center", color: "#c4b5a5", fontSize: "12px", fontWeight: 600 }}>
        © {new Date().getFullYear()} Pedacinho de Felicidade - Todos os direitos reservados
      </div>
    </footer>
  );
}
