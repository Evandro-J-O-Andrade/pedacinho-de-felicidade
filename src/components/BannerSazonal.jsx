import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventoDestaque } from "../utils/sazonalUtils";

export default function BannerSazonal() {
  const evento = getEventoDestaque();
  const navigate = useNavigate();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    setVisivel(true);
    
    const timer = setTimeout(() => {
      setVisivel(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (!evento || !visivel) return null;

  const handleFechar = () => {
    setVisivel(false);
  };

  const handleIrSazonal = () => {
    navigate("/sazonal");
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(5px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "20px",
      animation: "fadeIn 0.5s ease"
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{
        position: "relative",
        maxWidth: "620px",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
        background: "#fff",
        animation: "slideUp 0.5s ease"
      }}>
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
<div style={{ position: "relative" }}>
          <style>{`
            @media (max-width: 480px) {
              .banner-sazonal-img {
                height: 220px !important;
              }
            }
          `}</style>
          <img
            src={evento.banner}
            alt={evento.titulo}
            className="banner-sazonal-img"
            style={{
              width: "100%",
              height: "380px",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
          
          <button
            onClick={handleFechar}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(255,255,255,0.95)",
              border: "none",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "24px 28px 28px", textAlign: "center" }}>
          <span style={{ 
            display: "inline-block", 
            background: evento.cor || "#ec4899", 
            color: "#fff", 
            padding: "6px 16px", 
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "12px"
          }}>
            {evento.nome}
          </span>
          
          <h2 style={{ margin: "0 0 8px", fontSize: "26px", color: "#333", fontWeight: "700" }}>
            {evento.titulo}
          </h2>
          <p style={{ margin: "0 0 24px", fontSize: "15px", color: "#666", lineHeight: "1.5" }}>
            {evento.descricao}
          </p>
          
          <button
            onClick={handleIrSazonal}
            style={{
              width: "100%",
              background: evento.cor || "#8b5cf6",
              border: "none",
              padding: "16px",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
              transition: "transform 0.2s, boxShadow 0.2s"
            }}
          >
            🐰 Ver Ofertas Especiais
          </button>
          <button
            onClick={handleFechar}
            style={{
              width: "100%",
              marginTop: "14px",
              background: "#f3f4f6",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              color: "#666",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Continuar Comprando ✨
          </button>
        </div>
      </div>
    </div>
  );
}