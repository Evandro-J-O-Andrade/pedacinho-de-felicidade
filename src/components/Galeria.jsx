import { useState } from "react";
import Lightbox from "./Lightbox";
import Image from "./Image";

export default function Galeria({ embedded = false }) {
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  
  const Wrapper = embedded ? "div" : "section";
  const wrapperStyle = embedded
    ? { marginTop: "24px" }
    : { padding: "60px 20px", backgroundColor: "#fff7f9", textAlign: "center" };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#ec4899",
    textAlign: "center"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: embedded ? "0" : "0 12px"
  };

  const imgStyle = {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "14px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease",
    cursor: "pointer"
  };

  const imagens = [
    "/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png",
    "/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png",
    "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png",
    "/img/Gemini_Generated_Image_9l2i459l2i459l2i.png"
  ];

  return (
    <>
      <Wrapper style={wrapperStyle}>
        <h2 style={titleStyle}>Momentos Especiais ✨</h2>
        <div style={gridStyle}>
          {imagens.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`Evento ${idx + 1}`}
              style={imgStyle}
              onClick={() => setImagemAmpliada(src)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          ))}
        </div>
      </Wrapper>

      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
      )}
    </>
  );
}
