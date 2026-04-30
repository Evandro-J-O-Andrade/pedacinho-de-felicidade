import { useState } from "react";

export default function ConfigurarKit({ kit, onConfirmar, onFechar }) {
  const [selecoes, setSelecoes] = useState({});

  function toggleOpcao(tipo, opcao, max) {
    const atual = selecoes[tipo] || [];
    const novaLista = atual.includes(opcao)
      ? atual.filter((o) => o !== opcao)
      : atual.length >= max
        ? atual
        : [...atual, opcao];

    setSelecoes({ ...selecoes, [tipo]: novaLista });
  }

  function podeConfirmar() {
    return kit.configuracoes.every((cfg) => {
      const selecionados = selecoes[cfg.tipo] || [];
      return selecionados.length > 0;
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "18px"
      }}
      onClick={onFechar}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "18px",
          width: "min(100%, 560px)",
          maxHeight: "calc(100vh - 36px)",
          overflowY: "auto",
          boxShadow: "0 24px 70px rgba(0,0,0,0.35)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: "0 0 6px", color: "#ec4899", fontSize: "24px", fontWeight: 900 }}>
          {kit.nome}
        </h2>
        <p style={{ margin: "0 0 18px", color: "#6b4e3d", fontWeight: 600 }}>
          {kit.descricao}
        </p>

        {kit.configuracoes.map((cfg) => {
          const selecionados = selecoes[cfg.tipo] || [];

          return (
            <div key={cfg.tipo} style={{ marginBottom: "18px" }}>
              <strong style={{ display: "block", color: "#4a3728", marginBottom: "8px" }}>
                {cfg.titulo}
              </strong>
              <p style={{ margin: "0 0 8px", color: "#9ca3af", fontSize: "13px", fontWeight: 600 }}>
                {cfg.quantidade ? `${cfg.quantidade} • ` : ""}
                Escolha até {cfg.maxEscolhas} {cfg.maxEscolhas === 1 ? "opção" : "opções"}
              </p>

              <div style={{ display: "grid", gap: "8px" }}>
                {cfg.opcoes.map((op) => {
                  const selecionado = selecionados.includes(op);
                  const limiteAtingido = selecionados.length >= cfg.maxEscolhas && !selecionado;

                  return (
                    <label
                      key={op}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: selecionado ? "2px solid #ec4899" : "1px solid #fbcfe8",
                        background: selecionado ? "#fdf2f8" : "#fff7f9",
                        color: limiteAtingido ? "#9ca3af" : "#4b5563",
                        cursor: limiteAtingido ? "not-allowed" : "pointer",
                        fontWeight: 600
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selecionado}
                        disabled={limiteAtingido}
                        onChange={() => toggleOpcao(cfg.tipo, op, cfg.maxEscolhas)}
                      />
                      {op}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          disabled={!podeConfirmar()}
          onClick={() => onConfirmar(selecoes)}
          style={{
            width: "100%",
            padding: "14px",
            background: podeConfirmar() ? "#ec4899" : "#f9a8d4",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: 800,
            cursor: podeConfirmar() ? "pointer" : "not-allowed",
            fontSize: "16px"
          }}
        >
          Confirmar e adicionar
        </button>

        <button
          onClick={onFechar}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "12px",
            background: "#f3f4f6",
            color: "#6b7280",
            border: "none",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
