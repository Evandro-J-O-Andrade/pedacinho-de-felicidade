import { useCarrinho } from "../context/CarrinhoContext";
import Image from "./Image";
import { getImagemProduto, handleImagemErro, criarSrcImagem } from "../utils/imagemUtils";

export default function ProdutoCard({ item, onImageClick }) {
  const { adicionar } = useCarrinho();

  const imgProps = criarSrcImagem(item);

  const handleImageClick = (e) => {
    if (onImageClick) {
      e.stopPropagation();
      onImageClick(getImagemProduto(item));
    }
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", transition: "all 0.3s ease" }}>
      <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
        <Image 
          src={imgProps.src} 
          alt={item.nome}
          categoria={item.categoria?.toLowerCase().replace(/ /g, '')}
          onError={handleImagemErro}
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            transition: "transform 0.3s ease",
            cursor: onImageClick ? "pointer" : "default"
          }} 
          onClick={handleImageClick}
          onMouseOver={(e) => e.target.style.transform = "scale(1.08)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        />
      </div>

      <div style={{ padding: "16px" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "16px", color: "#ec4899" }}>{item.nome}</h3>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "4px", marginBottom: "12px" }}>{item.descricao}</p>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#16a34a", fontWeight: "bold", fontSize: "18px", display: "block", marginBottom: "12px" }}>
            R$ {item.preco.toFixed(2).replace(".", ",")} / {item.tipo}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              adicionar(item);
            }}
            style={{ 
              backgroundColor: "#ec4899", 
              color: "white", 
              padding: "12px 20px", 
              borderRadius: "10px", 
              border: "none", 
              cursor: "pointer", 
              fontWeight: "bold",
              fontSize: "14px",
              width: "100%",
              transition: "all 0.3s ease"
            }}
          >
            Adicionar ao Carrinho 🛒
          </button>
        </div>
      </div>
    </div>
  );
}