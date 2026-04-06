export default function Contato() {
  const numero = "5511999999999";

  return (
    <section
      id="contato"
      style={{
        padding: "70px 20px",
        backgroundColor: "#fff",
        textAlign: "center"
      }}
    >
      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px", color: "#ec4899" }}>
        Contato
      </h2>

      <p style={{ color: "#555", marginBottom: "20px" }}>
        Fale conosco pelo WhatsApp
      </p>

      <a
        href={`https://wa.me/${numero}`}
        style={{
          display: "inline-block",
          backgroundColor: "#22c55e",
          color: "#fff",
          padding: "14px 26px",
          borderRadius: "9999px",
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 6px 16px rgba(34,197,94,0.25)"
        }}
      >
        Abrir WhatsApp
      </a>
    </section>
  );
}
