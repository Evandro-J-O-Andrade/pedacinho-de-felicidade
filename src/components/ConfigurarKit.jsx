import { useState } from "react";

export default function ConfigurarKit({ kit, onConfirmar, onFechar }) {
  const [selecoes, setSelecoes] = useState({});

  const PASSO = 25;

  function getSelecionados(tipo) {
    return selecoes[tipo] || [];
  }

  function getSoma(tipo) {
    return getSelecionados(tipo).reduce((sum, item) => sum + item.quantidade, 0);
  }

  function encontrarItem(tipo, opcao) {
    return getSelecionados(tipo).find((item) => item.opcao === opcao);
  }

  function toggleCheckbox(tipo, opcao) {
    const atual = getSelecionados(tipo);
    const existe = encontrarItem(tipo, opcao);
    const cfg = kit.configuracoes.find((c) => c.tipo === tipo);
    const maxTipos = cfg && cfg.maxEscolhas !== undefined ? cfg.maxEscolhas : Infinity;
    const quantidadeTotal = cfg && cfg.quantidadeTotal !== undefined ? cfg.quantidadeTotal : Infinity;

    if (existe) {
      const novaLista = atual.filter((item) => item.opcao !== opcao);
      setSelecoes({ ...selecoes, [tipo]: novaLista });
    } else {
      if (atual.length >= maxTipos) return;
      const restante = quantidadeTotal - getSoma(tipo);
      const quantidadeInicial = (tipo === "bolo" || tipo === "decoracao") ? 1 : Math.min(PASSO, restante);
      if (quantidadeInicial <= 0) return;
      const novaLista = [...atual, { opcao, quantidade: quantidadeInicial }];
      setSelecoes({ ...selecoes, [tipo]: novaLista });
    }
  }

  function alterarQuantidade(tipo, opcao, delta) {
    const atual = getSelecionados(tipo);
    const index = atual.findIndex((item) => item.opcao === opcao);

    if (index === -1) return;

    const item = atual[index];
    const novaQtd = item.quantidade + delta;

    if (novaQtd <= 0) {
      const novaLista = atual.filter((i) => i.opcao !== opcao);
      setSelecoes({ ...selecoes, [tipo]: novaLista });
      return;
    }

    const cfg = kit.configuracoes.find((c) => c.tipo === tipo);
    const quantidadeTotal = cfg && cfg.quantidadeTotal !== undefined ? cfg.quantidadeTotal : Infinity;
    const somaAtual = getSoma(tipo);
    const novaSoma = somaAtual - item.quantidade + novaQtd;

    if (novaSoma > quantidadeTotal) return;

    const novaLista = atual.map((i) =>
      i.opcao === opcao ? { ...i, quantidade: novaQtd } : i
    );
    setSelecoes({ ...selecoes, [tipo]: novaLista });
  }

  function podeConfirmar() {
    return kit.configuracoes.every((cfg) => {
      const soma = getSoma(cfg.tipo);
      return soma === cfg.quantidadeTotal;
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
          const soma = getSoma(cfg.tipo);
          const quantidadeTotal = cfg.quantidadeTotal;
          const restante = quantidadeTotal - soma;
          const podeAdicionarMais = (cfg.tipo === "bolo" || cfg.tipo === "decoracao") ? restante >= 1 : restante >= PASSO;

          return (
            <div key={cfg.tipo} style={{ marginBottom: "18px" }}>
              <strong style={{ display: "block", color: "#4a3728", marginBottom: "8px" }}>
                {cfg.titulo}
              </strong>
              <p style={{ margin: "0 0 8px", color: "#9ca3af", fontSize: "13px", fontWeight: 600 }}>
                {cfg.quantidade} • Escolha até {cfg.maxEscolhas !== undefined ? cfg.maxEscolhas : "∞"} {cfg.maxEscolhas === 1 ? "opção" : "opções"}
              </p>

              <div style={{ display: "grid", gap: "8px" }}>
                {cfg.opcoes.map((op) => {
                  const selecionado = encontrarItem(cfg.tipo, op);
                  const limiteTipos = cfg.maxEscolhas !== undefined && getSelecionados(cfg.tipo).length >= cfg.maxEscolhas && !selecionado;
                  const podeClicarCheckbox = !limiteTipos && !selecionado && podeAdicionarMais;

                  return (
                    <label
                      key={op}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: selecionado ? "2px solid #ec4899" : "1px solid #fbcfe8",
                        background: selecionado ? "#fdf2f8" : "#fff7f9",
                        opacity: limiteTipos || (!selecionado && !podeAdicionarMais) ? 0.5 : 1,
                        cursor: "pointer"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                        <input
                          type="checkbox"
                          checked={!!selecionado}
                          disabled={limiteTipos || (!selecionado && !podeAdicionarMais)}
                          onChange={() => toggleCheckbox(cfg.tipo, op)}
                        />
                        <span style={{ fontWeight: 600 }}>{op}</span>
                      </div>

                      {selecionado && cfg.tipo !== "bolo" && cfg.tipo !== "decoracao" && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); alterarQuantidade(cfg.tipo, op, -PASSO); }}
                            disabled={selecionado.quantidade <= PASSO}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              border: "1px solid #ddd",
                              background: "#fff",
                              cursor: selecionado.quantidade <= PASSO ? "not-allowed" : "pointer",
                              fontWeight: "bold",
                              color: "#333"
                            }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: "32px", textAlign: "center", fontWeight: 700 }}>
                            {selecionado.quantidade}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); alterarQuantidade(cfg.tipo, op, +PASSO); }}
                            disabled={soma >= quantidadeTotal}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              border: "1px solid #ddd",
                              background: soma >= quantidadeTotal ? "#f3f4f6" : "#fff",
                              cursor: soma >= quantidadeTotal ? "not-allowed" : "pointer",
                              fontWeight: "bold",
                              color: soma >= quantidadeTotal ? "#ccc" : "#333"
                            }}
                          >
                            +
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleCheckbox(cfg.tipo, op); }}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              border: "none",
                              background: "transparent",
                              color: "#ef4444",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "16px"
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>

              {getSelecionados(cfg.tipo).length > 0 && cfg.tipo !== "bolo" && cfg.tipo !== "decoracao" && (
                <p style={{ margin: "8px 0 0", color: "#ec4899", fontSize: "13px", fontWeight: 600 }}>
                  Total: {soma} / {quantidadeTotal} • Restam {restante}
                </p>
              )}
            </div>
          );
        })}

        <button
          disabled={!podeConfirmar()}
          onClick={() => {
            const selecoesFormatadas = {};
            for (const tipo in selecoes) {
              selecoesFormatadas[tipo] = selecoes[tipo].map(item => item.opcao);
            }
            onConfirmar(selecoesFormatadas);
          }}
          style={{
            width: "100%",
            padding: "14px",
            background: podeConfirmar() ? "#ec4899" : "#f9a8d4",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: 800,
            cursor: podeConfirmar() ? "pointer" : "not-allowed",
            fontSize: "16px",
            opacity: podeConfirmar() ? 1 : 0.7
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
