import Galeria from "./Galeria";

export default function Eventos() {
  const numero = "5511999999999";

  return (
    <section
      id="eventos"
      style={{
        padding: "80px 20px",
        textAlign: "center",
        backgroundColor: "#fff7f9"
      }}
    >
      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px", color: "#ec4899" }}>
        Eventos
      </h2>

      <p style={{ marginBottom: "20px", maxWidth: "640px", marginInline: "auto", color: "#555", lineHeight: 1.5 }}>
        Organizamos sua festa completa com decoração, doces, salgados e tudo que você precisa para receber bem.
      </p>

      <a
        href={`https://wa.me/${numero}?text=Quero orçamento para evento`}
        style={{
          display: "inline-block",
          backgroundColor: "#ec4899",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "9999px",
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 6px 16px rgba(236,72,153,0.25)"
        }}
      >
        Solicitar orçamento
      </a>

      <Galeria embedded />
    </section>
  );
}
