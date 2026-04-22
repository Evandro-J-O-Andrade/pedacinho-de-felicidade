import { useEffect, useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import Image from "./Image";

export default function Lightbox({ src, item, onClose, showAddButton = true }) {
  const { adicionar } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleAdicionar = () => {
    adicionar(item);
    setAdicionado(true);
    setTimeout(() => {
      onClose();
    }, 3000); // Fecha após 3 segundos
  };

  if (!src) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "pointer",
        animation: "fadeIn 0.3s ease",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes successPulse {
          0% { transform: scale(0.9); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      <Image 
        src={src} 
        alt={item?.nome || "Ampliada"}
        style={{ 
          maxWidth: "100%", 
          maxHeight: "60vh", 
          objectFit: "contain",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(236,72,153,0.6)"
        }}
      />
      
      {item && (
        <div 
          style={{ 
            textAlign: "center", 
            marginTop: "20px",
            color: "#fff",
            maxWidth: "600px"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#ec4899", marginBottom: "8px" }}>
            {item.nome}
          </h3>
          {item.descricao && (
            <p style={{ fontSize: "16px", color: "#ddd", marginBottom: "12px" }}>
              {item.descricao}
            </p>
          )}
          <p style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e", marginBottom: "16px" }}>
            R$ {item.preco.toFixed(2).replace(".", ",")} / {item.tipo}
          </p>
          {!showAddButton && (
            <p style={{ fontSize: "15px", color: "#f9a8d4", marginBottom: "16px", lineHeight: 1.6 }}>
              Esse é um preview do item. Para montar o kit completo, finalize sua seleção no fim da página e use o botão principal para adicionar o kit ao carrinho.
            </p>
          )}
          {showAddButton && !adicionado && (
            <button
              onClick={handleAdicionar}
              style={{
                backgroundColor: "#ec4899",
                color: "white",
                padding: "14px 28px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              Adicionar ao Carrinho 🛒
            </button>
          )}
          {adicionado && (
            <div style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "14px 28px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              animation: "successPulse 0.5s ease"
            }}>
              ✅ Adicionado com sucesso ao carrinho!
            </div>
          )}
        </div>
      )}
      
      <span 
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          color: "#fff",
          fontSize: "32px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >✕</span>
    </div>
  );
}