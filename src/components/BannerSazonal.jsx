import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventoDestaque } from "../utils/sazonalUtils";
import Image from "./Image";

export default function BannerSazonal() {
  const evento = getEventoDestaque();
  const navigate = useNavigate();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
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
    <div 
      onClick={handleFechar}
      className="banner-sazonal-overlay"
    >
      <style>{`
        .banner-sazonal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          cursor: pointer;
          animation: fadeIn 0.5s ease;
          overflow-y: auto;
        }

        .banner-sazonal-modal {
          position: relative;
          max-width: min(620px, calc(100vw - 32px));
          width: 100%;
          max-height: calc(100dvh - 40px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(0,0,0,0.4);
          background: #fff;
          animation: slideUp 0.5s ease;
          cursor: auto;
        }

        .banner-sazonal-image-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .banner-sazonal-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .banner-sazonal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255,255,255,0.95);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .banner-sazonal-overlay {
            align-items: flex-start;
            padding: 12px;
          }

          .banner-sazonal-modal {
            max-width: 100%;
            max-height: calc(100dvh - 24px);
            overflow-y: auto;
            border-radius: 16px;
          }

          .banner-sazonal-img {
            width: 100%;
            max-height: 42dvh;
            object-fit: contain;
          }
        }

        @media (max-width: 380px) {
          .banner-sazonal-overlay {
            padding: 8px;
          }

          .banner-sazonal-modal {
            max-height: calc(100dvh - 16px);
          }

          .banner-sazonal-img {
            max-height: 36dvh;
          }
        }
      `}</style>
      <div className="banner-sazonal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="banner-sazonal-image-wrapper">
          <Image
            src={evento.banner}
            alt={evento.titulo}
            className="banner-sazonal-img"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
          
          <button
            onClick={handleFechar}
            className="banner-sazonal-close"
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
