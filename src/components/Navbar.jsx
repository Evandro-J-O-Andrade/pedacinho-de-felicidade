import { useState } from "react";
import { produtos } from "../data/produtos";

export default function Navbar() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const todos = produtos.flatMap((c) => c.itens);

  function handleBusca(e) {
    const valor = e.target.value;
    setBusca(valor);
    if (valor.length > 0) {
      const filtro = todos.filter((item) =>
        item.nome.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtro.slice(0, 5));
    } else {
      setResultados([]);
    }
  }

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(5px)",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      padding: "12px 24px",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src="/img/logo.png" style={{ width: "70px", height: "70px", objectFit: "contain" }} alt="logo" />
        <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#ec4899" }}>Pedacinho de Felicidade</h1>
      </div>

      {/* BUSCA */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={busca}
          onChange={handleBusca}
          style={{
            width: "200px",
            padding: "8px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            outline: "none"
          }}
        />
        {resultados.length > 0 && (
          <div style={{
            position: "absolute",
            top: "100%",
            marginTop: "4px",
            width: "200px",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "8px"
          }}>
            {resultados.map((item) => (
              <a key={item.id} href="#cardapio" style={{ display: "block", padding: "12px", borderBottom: "1px solid #f9f9f9" }}>
                {item.nome}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* MENU */}
      <div style={{ display: "flex", gap: "24px", fontSize: "14px", fontWeight: "500" }}>
        <a href="#home" style={{ color: "#374151" }}>Home</a>
        <a href="#monte-seu-kit" style={{ color: "#ec4899" }}>Kit Festa</a>
        <a href="#cardapio" style={{ color: "#374151" }}>Cardápio</a>
        <a href="#eventos" style={{ color: "#374151" }}>Eventos</a>
        <a href="#contato" style={{ color: "#374151" }}>Contato</a>
      </div>
    </nav>
  );
}