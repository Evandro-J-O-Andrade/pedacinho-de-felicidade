import { useState } from "react";
import Galeria from "./Galeria";

export default function Eventos() {
  const numero = "5511971914833";
  const nome = "Esmeralda";
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "aniversarios",
      icon: "🎈",
      label: "Aniversários",
      description: "Decorações temáticas e deliciosos sabores",
      images: [
        "/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png",
        "/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png",
        "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png"
      ]
    },
    {
      id: "casamentos",
      icon: "💒",
      label: "Casamentos",
      description: "Doces gourmet e bolo perfeito",
      images: [
        "/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png",
        "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png",
        "/img/Gemini_Generated_Image_9l2i459l2i459l2i.png"
      ]
    },
    {
      id: "formaturas",
      icon: "🎓",
      label: "Formaturas",
      description: "Kit completo para sua festa",
      images: [
        "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png",
        "/img/Gemini_Generated_Image_9l2i459l2i459l2i.png",
        "/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png"
      ]
    }
  ];

  const selectedImages = selectedCategory ? selectedCategory.images : null;
  const galleryTitle = selectedCategory ? `Momentos ${selectedCategory.label}` : "Momentos Especiais ✨";

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

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "20px",
          maxWidth: "700px",
          margin: "0 auto 20px"
        }}>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              style={{ 
                backgroundColor: selectedCategory?.id === category.id ? "#fdf2f8" : "white",
                padding: "20px", 
                borderRadius: "16px",
                boxShadow: selectedCategory?.id === category.id ? "0 8px 30px rgba(236,72,153,0.18)" : "0 4px 15px rgba(236,72,153,0.1)",
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
            >
              <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>{category.icon}</span>
              <h3 style={{ color: "#ec4899", fontSize: "16px", margin: "0 0 8px" }}>{category.label}</h3>
              <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>{category.description}</p>
            </div>
          ))}
        </div>

        <p style={{ marginBottom: "28px", color: "#666", fontSize: "15px" }}>
          Clique em um tema para abrir o carrossel de imagens desse tipo de evento.
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
        <Galeria embedded images={selectedImages} title={galleryTitle} />
      </div>
    </section>
  );
}