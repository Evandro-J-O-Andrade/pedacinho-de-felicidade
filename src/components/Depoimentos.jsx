export default function Depoimentos() {
  const cards = [
    { texto: "Melhor bolo que já pedi! Minha festa ficou perfeita!", autor: "Cliente Satisfeita" },
    { texto: "Doces maravilhosos e atendimento incrível!", autor: "Maria Silva" },
    { texto: "Entrega no prazo e tudo fresquinho. Super recomendo!", autor: "João Santos" }
  ];

  const cores = ["#f9a8d4", "#fcd34d", "#a7f3d0"];

  return (
    <section
      id="depoimentos"
      style={{
        padding: "60px 20px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "100%", maxWidth: "1000px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "18px", color: "#ec4899", textAlign: "center" }}>
          O que nossos clientes dizem 💬
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
          {cards.map((c, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#fff7f9",
                padding: "16px",
                borderRadius: "14px",
                boxShadow: "0 6px 16px rgba(236,72,153,0.12)",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start"
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: cores[idx % cores.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "#4b164c"
                }}
              >
                {c.autor.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "15px", color: "#444", marginBottom: "8px", lineHeight: 1.5 }}>
                  “{c.texto}”
                </p>
                <strong style={{ color: "#d81b78", fontSize: "14px" }}>— {c.autor}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
