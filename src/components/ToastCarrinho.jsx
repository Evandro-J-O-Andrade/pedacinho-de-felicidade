import { useCarrinho } from "../context/CarrinhoContext";
import { useState, useEffect } from "react";

export default function ToastCarrinho() {
  const { ultimoItemAdicionado } = useCarrinho();
  const [visivel, setVisivel] = useState(false);
  const [itemAtual, setItemAtual] = useState("");

  useEffect(() => {
    if (ultimoItemAdicionado) {
      setItemAtual(ultimoItemAdicionado);
      setVisivel(true);
      
      const timer = setTimeout(() => {
        setVisivel(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [ultimoItemAdicionado]);

  if (!visivel) return null;

  return (
    <div style={{
      position: "fixed",
      top: "100px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#22c55e",
      color: "white",
      padding: "12px 20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "600",
      animation: "fadeInDown 0.3s ease"
    }}>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
      <span style={{ fontSize: "20px" }}>✓</span>
      <span>{itemAtual} adicionado ao carrinho</span>
    </div>
  );
}