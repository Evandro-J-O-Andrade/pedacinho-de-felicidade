import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodosEventos, getNomeSazonal, getProximoEvento, getDiasAteEvento } from "../utils/sazonalUtils";
import { getProdutosSazonais } from "../utils/produtoUtils";
import { produtos } from "../data/produtos";
import ProdutoCard from "./ProdutoCard";
import Lightbox from "./Lightbox";

export default function SazonalPage() {
  const eventos = getTodosEventos();
  const navigate = useNavigate();
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  const [eventoSelecionado, setEventoSelecionado] = useState("todos");
  const [busca, setBusca] = useState("");

  const proximoEvento = getProximoEvento();
  const diasAte = getDiasAteEvento(proximoEvento);

  const opcoesEvento = ["todos", ...eventos.map(e => e.id)];

  const getListaPorEvento = (eventoId) => {
    let lista;
    if (eventoId === "todos") {
      lista = eventos.flatMap(evento => getProdutosSazonais(produtos, evento.id));
    } else {
      lista = getProdutosSazonais(produtos, eventoId);
    }
    if (busca) {
      lista = lista.filter(item => 
        item.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }
    return lista;
  };

  if (!eventos || eventos.length === 0) {
    const todosEventos = getTodosEventos();
    
    return (
      <div 
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
          cursor: "pointer"
        }}
      >
        <div style={{
          maxWidth: "500px",
          width: "100%",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          textAlign: "center",
          padding: "0"
        }}>
          <img 
            src="/img/sazonal/banners/bannertodoseventos.png" 
            alt="Em Breve"
            style={{ width: "100%", height: "250px", objectFit: "cover", display: "block" }}
          />
          
          <div style={{ padding: "20px" }}>
            <span style={{
              background: "#ec4899",
              color: "#fff",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              textTransform: "uppercase"
            }}>
              Em Breve
            </span>
            
            <h2 style={{ margin: "16px 0 12px", fontSize: "22px", color: "#333" }}>
              Próximos Eventos
            </h2>
            
            <div style={{ textAlign: "left", marginBottom: "20px", padding: "0 10px" }}>
              {todosEventos.map(evt => {
                const dias = getDiasAteEvento(evt);
                return (
                  <div key={evt.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                    <span style={{ color: "#333", fontWeight: "500" }}>{evt.nome}</span>
                    <span style={{ color: "#ec4899", fontWeight: "bold" }}>{dias ? `${dias} dias` : "Em breve"}</span>
                  </div>
                );
              })}
            </div>
            
            <button
              onClick={(e) => { e.stopPropagation(); navigate("/"); }}
              style={{
                width: "100%",
                background: "#ec4899",
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ← Voltar para Home
            </button>
          </div>
        </div>
      </div>
    );
}

  const lista = getListaPorEvento(eventoSelecionado);

  return (
    <>
      <div
        style={{
          paddingTop: "180px",
          paddingBottom: "60px",
          minHeight: "100vh",
          backgroundColor: "#fff7f9"
        }}
      >
        <style>{`
          @media only screen and (min-width: 350px) and (max-width: 1024px) {
            .produtos-page { paddingTop: 130px !important; }
          }
          @media only screen and (max-width: 349px) {
            .produtos-page { paddingTop: 120px !important; }
          }
          .produtos-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 20px;
            max-width: 1100px;
            margin: 0 auto;
          }
          @media only screen and (min-width: 901px) and (max-width: 1100px) {
            .produtos-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media only screen and (min-width: 601px) and (max-width: 900px) {
            .produtos-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media only screen and (min-width: 350px) and (max-width: 600px) {
            .produtos-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; padding: 10px !important; }
          }
          @media only screen and (max-width: 349px) {
            .produtos-grid { grid-template-columns: 1fr !important; gap: 10px !important; padding: 10px !important; }
          }
        `}</style>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "30px", padding: "0 20px" }}>
          <h1 style={{ fontSize: "36px", color: "#ec4899" }}>
            Delícias da Temporada
          </h1>

          <p style={{ marginTop: "10px", color: "#5c3d2e", maxWidth: "520px", marginInline: "auto" }}>
            Escolha suas delícias especiais 💜
          </p>
        </div>

        {/* BUSCA */}
        <div style={{ textAlign: "center", marginBottom: "20px", padding: "0 20px" }}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "12px 16px",
              borderRadius: "25px",
              border: "1px solid #e5e7eb",
              fontSize: "16px",
              outline: "none"
            }}
          />
        </div>

        {/* BOTOES DE EVENTO */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px", padding: "0 20px" }}>
          {opcoesEvento.map(opcao => (
            <button
              key={opcao}
              onClick={() => setEventoSelecionado(opcao)}
              style={{
                padding: "12px 24px",
                borderRadius: "25px",
                border: eventoSelecionado === opcao ? "none" : "2px solid #ec4899",
                backgroundColor: eventoSelecionado === opcao ? "#ec4899" : "white",
                color: eventoSelecionado === opcao ? "white" : "#ec4899",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              {opcao === "todos" ? "Todos" : getNomeSazonal(opcao)}
            </button>
          ))}
        </div>

        {/* GRID POR EVENTO */}
        {eventos.map(evento => {
          const produtosDoEvento = getProdutosSazonais(produtos, evento.id);
          const mostrarSessao = eventoSelecionado === "todos" || eventoSelecionado === evento.id;

          if (!mostrarSessao || produtosDoEvento.length === 0) return null;

          return (
            <div key={evento.id} style={{ marginTop: "20px" }}>
              <h2 style={{ textAlign: "center", color: evento.cor || "#ec4899", marginBottom: "10px" }}>
                {evento.titulo}
              </h2>
              <div className="produtos-grid">
                {produtosDoEvento.map(item => (
                  <ProdutoCard
                    key={item.id}
                    item={item}
                    onImageClick={(img) => setImagemAmpliada(img)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {lista.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            Nenhum produto disponível ainda 😢
          </p>
        )}
      </div>

      {/* LIGHTBOX */}
      {imagemAmpliada && (
        <Lightbox
          src={imagemAmpliada}
          onClose={() => setImagemAmpliada(null)}
        />
      )}
    </>
  );
}