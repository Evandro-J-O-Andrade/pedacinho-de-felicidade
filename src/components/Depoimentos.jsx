import { useState } from "react";
import Image from "./Image";
import Lightbox from "./Lightbox";

export default function Depoimentos() {
  const [depoimentoAmpliado, setDepoimentoAmpliado] = useState(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  
  const cards = [
    { texto: "Melhor bolo que já pedi! Minha festa ficou perfeita com os docinhos encantadores. Todos elogiaram muito a qualidade e o sabor! Recomendo demais!", autor: "Ana Clara", imagem: "/img/depoimentos/cliente1.svg" },
    { texto: "Doces maravilhosos e atendimento incrível! A entrega foi pontual e tudo arrivedou fresquinho. Com certeza vou pedir mais vezes!", autor: "Maria Silva", imagem: "/img/depoimentos/cliente2.svg" },
    { texto: "Entrega no prazo e tudo fresquinho. Super recomendo! O atendimento foi excepcional desde o primeiro contato.", autor: "João Santos", imagem: "/img/depoimentos/cliente3.svg" },
    { texto: "Fiquei encantada com a qualidade dos produtos. O bolo de aniversário da minha filha foi um sucesso! Obrigada pelo carinho.", autor: "Carla Oliveira", imagem: "/img/depoimentos/cliente4.svg" },
    { texto: "Nuncavi docinhos tão bem feitos! A apresentação é impecável e o sabor é indescritível. Já estou planejando meu próximo evento!", autor: "Patrícia Lima", imagem: "/img/depoimentos/cliente5.svg" },
    { texto: "Serviço excelente do início ao fim. A equipe é muito atenciosa e os produtos são de primeira qualidade. Parabéns!", autor: "Roberto Alves", imagem: "/img/depoimentos/cliente6.svg" }
  ];

  const cardsVisiveis = mostrarTodos ? cards : cards.slice(0, 4);

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
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "18px", color: "#ec4899", textAlign: "center" }}>
            O que nuestros clientes dicen 💬
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: cards.length > 4 ? "20px" : "0" }}>
            {cardsVisiveis.map((c, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#fff7f9",
                  padding: "16px",
                  borderRadius: "14px",
                  boxShadow: "0 6px 16px rgba(236,72,153,0.12)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  cursor: "pointer"
                }}
              >
                <div 
                  onClick={() => setDepoimentoAmpliado(c)}
                  style={{ flexShrink: 0 }}
                >
                  <Image
                    src={c.imagem}
                    alt={c.autor}
                    categoria="depoimentos"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center",
                      border: "3px solid #ec4899",
                      cursor: "pointer"
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", color: "#444", marginBottom: "8px", lineHeight: 1.5 }}>
                    "{c.texto.length > 60 ? c.texto.substring(0, 60) + "..." : c.texto}"
                  </p>
                  <strong style={{ color: "#d81b78", fontSize: "13px" }}>— {c.autor}</strong>
                </div>
              </div>
            ))}
          </div>

          {cards.length > 4 && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
                onClick={() => setMostrarTodos(!mostrarTodos)}
                style={{
                  backgroundColor: "#ec4899",
                  color: "#fff",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "25px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(236,72,153,0.3)"
                }}
              >
                {mostrarTodos ? "Ver menos 💬" : "Veja o que estão falando aquí! 💬"}
              </button>
            </div>
          )}
        </div>
      </section>

      {depoimentoAmpliado && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px"
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setDepoimentoAmpliado(null);
          }}
        >
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px", maxWidth: "500px", width: "100%", position: "relative" }}>
            <button
              onClick={() => setDepoimentoAmpliado(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "#ec4899",
                color: "#fff",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ✕
            </button>
            <div style={{ textAlign: "center" }}>
              <Image
                src={depoimentoAmpliado.imagem}
                alt={depoimentoAmpliado.autor}
                categoria="depoimentos"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                  border: "4px solid #ec4899",
                  marginBottom: "16px"
                }}
              />
              <h3 style={{ color: "#ec4899", fontSize: "22px", marginBottom: "12px" }}>{depoimentoAmpliado.autor}</h3>
              <p style={{ color: "#444", fontSize: "16px", lineHeight: 1.6 }}>
                "{depoimentoAmpliado.texto}"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
