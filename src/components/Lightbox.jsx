import { useEffect } from "react";
import Image from "./Image";

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!src) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "pointer",
        animation: "fadeIn 0.3s ease"
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <Image 
        src={src} 
        alt="Ampliada"
        style={{ 
          maxWidth: "90%", 
          maxHeight: "90%", 
          objectFit: "contain",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(236,72,153,0.6)"
        }}
      />
      <span style={{
        position: "absolute",
        top: "20px",
        right: "30px",
        color: "#fff",
        fontSize: "32px",
        fontWeight: "bold",
        cursor: "pointer"
      }}>✕</span>
    </div>
  );
}