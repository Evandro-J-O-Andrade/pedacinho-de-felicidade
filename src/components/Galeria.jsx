import { useState } from "react";
import Lightbox from "./Lightbox";
import Carrossel3D from "./Carrossel3D";
import Image from "./Image";

export default function Galeria({ embedded = false, images = null, title = "Momentos Especiais ✨" }) {
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

  const imgStyle = {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    transition: "transform 0.2s ease",
    cursor: "pointer"
  };

  const defaultImages = [
    "/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png",
    "/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png",
    "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png",
    "/img/Gemini_Generated_Image_9l2i459l2i459l2i.png"
  ];

  const imagens = images && images.length > 0 ? images : defaultImages;

  const renderItem = (src, index) => (
    <figure style={{ borderRadius: "20px", overflow: "hidden", background: "#fff", boxShadow: "0 14px 28px rgba(0,0,0,0.12)", cursor: "pointer", margin: 0 }}>
      <Image
        key={index}
        src={src}
        alt={`Imagem de evento especial ${index + 1} - Momentos felizes e doces`}
        categoria="galeria"
        draggable={false}
        style={imgStyle}
        onClick={() => setImagemAmpliada(src)}
        onDragStart={(e) => e.preventDefault()}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <figcaption style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", color: "#fff", padding: "12px", fontSize: "14px", fontWeight: "500", borderRadius: "0 0 20px 20px" }}>
        Momento Especial #{index + 1}
      </figcaption>
    </figure>
  );

  return (
    <>
      <Wrapper style={wrapperStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <div style={{ padding: embedded ? "0" : "0 20px" }}>
          <Carrossel3D items={imagens} renderItem={renderItem} autoPlay={true} interval={5000} />
        </div>
      </Wrapper>

      {imagemAmpliada && (
        <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
      )}
    </>
  );
}
