import { useEffect, useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext";
import Image from "./Image";
import "./Lightbox.css";

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
  const hasPrice = item?.preco != null && item?.tipo != null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <Image
        src={src}
        alt={item?.nome || "Ampliada"}
        className="lightbox-image"
      />
      {item && (
        <div className="lightbox-details" onClick={(e) => e.stopPropagation()}>
          <h3 className="lightbox-title">{item.nome}</h3>
          {item.descricao && <p className="lightbox-description">{item.descricao}</p>}
          {hasPrice && (
            <p className="lightbox-price">
              R$ {item.preco.toFixed(2).replace(".", ",")} / {item.tipo}
            </p>
          )}
          {!showAddButton && (
            <p className="lightbox-note">
              Esse é um preview do item. Para montar o kit completo, finalize sua seleção no fim da página e use o botão principal para adicionar o kit ao carrinho.
            </p>
          )}
          {showAddButton && !adicionado && (
            <button className="lightbox-add-button" onClick={handleAdicionar}>
              Adicionar ao Carrinho 🛒
            </button>
          )}
          {adicionado && <div className="lightbox-success">✅ Adicionado com sucesso ao carrinho!</div>}
        </div>
      )}
      
      <span className="lightbox-close">✕</span>
    </div>
  );
}