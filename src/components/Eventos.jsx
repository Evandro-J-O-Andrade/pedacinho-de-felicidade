import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Galeria from "./Galeria";
import Image from "./Image";
import { eventosEspeciais, getImagensEventoEspecial } from "../data/eventosEspeciais";

export default function Eventos() {
  const numero = "5511971914833";
  const nome = "Esmeralda";
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setSelectedCategory(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = eventosEspeciais.map((evento) => ({
    id: evento.id,
    icon: evento.icon,
    label: evento.nome,
    description: evento.descricao,
    images: getImagensEventoEspecial(evento.id)
  }));

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
        <style>{`
          .eventos-categorias-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 20px;
            max-width: 980px;
            margin: 0 auto 20px;
          }
          .evento-card {
            background: white;
            padding: 20px;
            border-radius: 16px;
            border: 1px solid #fbcfe8;
            box-shadow: 0 6px 20px rgba(236,72,153,0.12);
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            min-height: 190px;
          }
          .evento-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(236,72,153,0.22);
            border-color: #f9a8d4;
          }
          .evento-card.active {
            background-color: #fdf2f8;
            box-shadow: 0 12px 32px rgba(236,72,153,0.24);
            border-color: #f472b6;
          }
          .evento-card-cta {
            margin-top: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #be185d;
            background: #fce7f3;
            border: 1px solid #f9a8d4;
            border-radius: 999px;
            padding: 8px 12px;
            font-weight: 700;
          }

          @media (max-width: 900px) {
            .eventos-categorias-grid {
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              max-width: 700px;
            }
          }
        `}</style>

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

        <div className="eventos-categorias-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() =>
                setSelectedCategory((prev) => (prev?.id === category.id ? null : category))
              }
              className={`evento-card ${selectedCategory?.id === category.id ? "active" : ""}`}
            >
              <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>{category.icon}</span>
              <h3 style={{ color: "#ec4899", fontSize: "16px", margin: "0 0 8px" }}>{category.label}</h3>
              <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>{category.description}</p>
              <span className="evento-card-cta">Clique para ver inspiracao</span>
            </div>
          ))}
        </div>

        <p style={{ marginBottom: "28px", color: "#666", fontSize: "15px" }}>
          Clique em um tema para abrir a imagem desse tipo de evento. Clique fora para fechar.
        </p>

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
        <Galeria embedded title="Momentos Especiais ✨" />
      </div>
      <div style={{ marginTop: "14px", textAlign: "center" }}>
        <Link
          to="/eventos-especiais"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid #f9a8d4",
            backgroundColor: "white",
            color: "#be185d",
            fontWeight: 700,
            textDecoration: "none"
          }}
        >
          Ver pagina completa de eventos →
        </Link>
      </div>

      {selectedCategory && (
        <div
          onClick={() => setSelectedCategory(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.72)",
            zIndex: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1200px, 96vw)",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <h3 style={{ margin: 0, color: "#fff", fontSize: "22px", textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}>
              {selectedCategory.icon} {selectedCategory.label}
            </h3>
            <Image
              src={selectedCategory.images[0]}
              alt={selectedCategory.label}
              style={{
                width: "100%",
                maxHeight: "86vh",
                objectFit: "contain",
                borderRadius: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 18px 45px rgba(0,0,0,0.35)"
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
