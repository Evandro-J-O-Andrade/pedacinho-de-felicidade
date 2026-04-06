import { FaWhatsapp } from "react-icons/fa";

const numero = "5511999999999";

export default function WhatsApp() {
  return (
    <a
      href={`https://wa.me/${numero}`}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: "#22c55e",
        color: "#fff",
        width: "54px",
        height: "54px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        boxShadow: "0 8px 18px rgba(34,197,94,0.35)",
        zIndex: 60,
        textDecoration: "none",
        transition: "transform 0.15s ease, box-shadow 0.15s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 22px rgba(34,197,94,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 18px rgba(34,197,94,0.35)";
      }}
    >
      <FaWhatsapp />
    </a>
  );
}
