import Image from "./Image";

export default function Depoimentos() {
  const cards = [
    { texto: "Melhor bolo que já pedi! Minha festa ficou perfeita!", autor: "Cliente Satisfeita", imagem: "/img/depoimentos/cliente1.svg" },
    { texto: "Doces maravilhosos e atendimento incrível!", autor: "Maria Silva", imagem: "/img/depoimentos/cliente2.svg" },
    { texto: "Entrega no prazo e tudo fresquinho. Super recomendo!", autor: "João Santos", imagem: "/img/depoimentos/cliente3.svg" }
  ];

  return (
    <>
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
                  gap: "16px",
                  alignItems: "flex-start"
                }}
              >
                <Image
                  src={c.imagem}
                  alt={c.autor}
                  categoria="depoimentos"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    border: "3px solid #ec4899"
                  }}
                />
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
    </>
  );
}
