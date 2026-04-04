import { useCarrinho } from "../context/CarrinhoContext";

export default function ProdutoCard({ item }) {
  const { adicionar } = useCarrinho();

  return (
    <div style={{ backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", transition: "all 0.3s" }}>
      <img src={item.imagem} style={{ width: "100%", height: "160px", objectFit: "cover" }} />

      <div style={{ padding: "16px" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "16px" }}>{item.nome}</h3>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>{item.descricao}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
          <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: "16px" }}>
            R$ {item.preco} / {item.tipo}
          </span>

          <button
            onClick={() => adicionar(item)}
            style={{ backgroundColor: "#ec4899", color: "white", padding: "8px 16px", borderRadius: "9999px", border: "none", cursor: "pointer", fontWeight: "600" }}
          >
            + Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}