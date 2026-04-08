import { useCarrinho } from "../context/CarrinhoContext";
import { useState, useEffect } from "react";

export default function ToastCarrinho() {
  const { ultimoItemAdicionado, timestampAdicao } = useCarrinho();
  const [visivel, setVisivel] = useState(false);
  const [itemAtual, setItemAtual] = useState("");

  useEffect(() => {
    if (ultimoItemAdicionado && timestampAdicao) {
      setItemAtual(ultimoItemAdicionado);
      setVisivel(true);
      
      const timer = setTimeout(() => {
        setVisivel(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [timestampAdicao]);

  if (!visivel) return null;

  return (
    <div style={{
      position: "fixed",
      top: "100px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#22c55e",
      color: "white",
      padding: "14px 24px",
      borderRadius: "50px",
      boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontWeight: "600",
      fontSize: "15px",
      animation: "toastSlideIn 0.4s ease"
    }}>
      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
      `}</style>
      <span style={{ 
        backgroundColor: "white", 
        color: "#22c55e", 
        borderRadius: "50%", 
        width: "28px", 
        height: "28px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontWeight: "bold"
      }}>✓</span>
      <span>"{itemAtual}" adicionado ao carrinho</span>
    </div>
  );
}