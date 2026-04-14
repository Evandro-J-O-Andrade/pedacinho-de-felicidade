import { useCarrinho } from "../context/CarrinhoContext";
import { useState, useEffect } from "react";

export default function ToastLimparCarrinho() {
  const { mensagemToast, timestampToast } = useCarrinho();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (mensagemToast && timestampToast) {
      setVisivel(true);
      
      const timer = setTimeout(() => {
        setVisivel(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [timestampToast]);

  if (!visivel) return null;

  return (
    <div style={{
      position: "fixed",
      top: "100px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
      color: "white",
      padding: "14px 24px",
      borderRadius: "50px",
      boxShadow: "0 4px 20px rgba(236, 72, 153, 0.3)",
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
        color: "#ec4899", 
        borderRadius: "50%", 
        width: "28px", 
        height: "28px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontWeight: "bold"
      }}>✨</span>
      <span>{mensagemToast}</span>
    </div>
  );
}