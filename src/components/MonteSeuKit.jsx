import { useState } from "react";
import { produtos } from "../data/produtos";
import { useCarrinho } from "../context/CarrinhoContext";
import { getEventoAtivo } from "../utils/sazonalUtils";
import Lightbox from "./Lightbox";
import Image from "./Image";
import { getImagemProduto } from "../utils/imagemUtils";

export default function MonteSeuKit() {
  const { adicionar } = useCarrinho();

  const [selecionados, setSelecionados] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  const evento = getEventoAtivo();
  
  // Categorias fixas (não sazonais)
  const categoriasFixas = ["Bolos", "Doces", "Salgados", "Bebidas", "Complementos"];
  
  // Se tem evento ativo, pega só a categoria dele
  const categoriaEvento = evento ? evento.nome : null;
  
  // Filtra categorias: sempre mostra as fixas, + evento ativo se houver
  const categoriasPermitidas = [...categoriasFixas];
  if (categoriaEvento) {
    categoriasPermitidas.push(categoriaEvento);
  }
  
  const produtosFiltrados = produtos.filter(c => categoriasPermitidas.includes(c.categoria));
  
  const categorias = ["todos", ...produtosFiltrados.map((c) => c.categoria)];

  // Filtra itens por busca
  const filtrarPorBusca = (itens) => {
    if (!busca) return itens;
    return itens.filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()));
  };

  // Lista de categorias ativas para renderizar seções
  const categoriasAtivas = categoria === "todos" 
    ? produtosFiltrados 
    : produtosFiltrados.filter(c => c.categoria === categoria);

  function toggleItem(item) {
    setSelecionados((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id, delta) {
    setSelecionados((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantidade: Math.max(0, i.quantidade + delta) } : i
        )
        .filter((i) => i.quantidade > 0)
    );
  }

  function removerItem(id) {
    setSelecionados((prev) => prev.filter((i) => i.id !== id));
  }

  function getTotal() {
    return selecionados.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function adicionarKit() {
    const nomeKit = `Kit Personalizado (${selecionados.map((i) => i.nome).join(", ")})`;
    const imagemKit = selecionados.length > 0 ? selecionados[0].imagem : "/img/produtos/bolo.png";

    adicionar({
      id: Date.now(),
      nome: nomeKit,
      descricao: selecionados
        .map((i) => `${i.quantidade}x ${i.nome}`)
        .join(", "),
      preco: getTotal(),
      imagem: imagemKit,
      tipo: "un"
    });

    setSelecionados([]);
  }

  return (
    <div style={{ paddingTop: "150px", minHeight: "100vh", backgroundColor: "#fff7f9" }}>
      <style>{`
        .monte-kit-container {
          padding-top: 20px;
        }
        @media only screen and (min-width: 350px) and (max-width: 1024px) {
          .monte-kit-container {
            padding-top: 20px !important;
          }
        }
        @media only screen and (max-width: 349px) {
          .monte-kit-container {
            padding-top: 10px !important;
          }
        }
      `}</style>
      <section className="monte-kit-container" id="monte-seu-kit" style={{ paddingBottom: "60px", paddingInline: "16px" }}>

        {/* VOLTAR - SÓ MOSTRA NO MOBILE */}
        <div style={{ maxWidth: "1100px", margin: "0 auto 12px auto", padding: "0 16px" }}>
          <style>{`
            @media (min-width: 769px) {
              .voltar-link { display: none !important; }
            }
          `}</style>
          <a
            href="/"
            className="voltar-link"
            style={{ color: "#ec4899", fontWeight: "700", textDecoration: "none", display: "inline-block", paddingTop: "10px" }}
          >
            ← Voltar para a página inicial
          </a>
        </div>

        {/* TÍTULO */}
        <div style={{ textAlign: "center", marginBottom: "30px", padding: "0 20px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#ec4899", marginBottom: "8px" }}>
            🎉 Monte seu Kit de Festa
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#5c3d2e",
              maxWidth: "520px",
              marginInline: "auto",
              lineHeight: "1.6",
              fontWeight: "500",
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              padding: "16px 24px",
              borderRadius: "16px",
              border: "1px solid rgba(236, 72, 153, 0.2)"
            }}
          >
            Escolha os melhores produtos para sua festa!
          </p>
        </div>

        <h2 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "12px", color: "#ec4899" }}>
          ✨ Monte do seu jeito (itens avulsos)
        </h2>

        <div style={{
          backgroundColor: "#fef3c7",
          border: "1px solid #f59e0b",
          borderRadius: "12px",
          padding: "12px 20px",
          marginBottom: "16px",
          maxWidth: "90%",
          marginInline: "auto",
          display: "block"
        }}>
          <p style={{ color: "#92400e", fontSize: "14px", fontWeight: "600", margin: 0, textAlign: "center" }}>
            💡 Selecione seus itens e vá até o final da página para adicionar ao carrinho!
          </p>
        </div>

        {/* BUSCA E CATEGORIAS */}
        <div style={{ maxWidth: "1100px", margin: "0 auto 20px auto", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Buscar itens..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "14px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              marginBottom: "12px",
              outline: "none"
            }}
          />

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "9999px",
                  border: "1px solid #ec4899",
                  backgroundColor: categoria === cat ? "#ec4899" : "#fff",
                  color: categoria === cat ? "#fff" : "#ec4899",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontWeight: 600
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <style>{`
          .kit-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            padding: 0 20px;
            max-width: 1400px;
            margin: 0 auto;
          }
          @media only screen and (min-width: 901px) and (max-width: 1200px) {
            .kit-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media only screen and (min-width: 601px) and (max-width: 900px) {
            .kit-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media only screen and (min-width: 350px) and (max-width: 600px) {
            .kit-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media only screen and (max-width: 349px) {
            .kit-grid { grid-template-columns: 1fr !important; }
          }
          .sessao-titulo {
            font-size: 28px;
            color: #ec4899;
            text-align: center;
            margin: 30px 0 15px;
            padding: 0 20px;
          }
        `}</style>

        {categoriasAtivas.map(cat => {
          const itensCat = filtrarPorBusca(cat.itens);
          
          if (!evento && (cat.categoria === "Páscoa" || cat.categoria === "Natal")) {
            return null;
          }

          if (itensCat.length === 0) return null;

          return (
            <div key={cat.categoria}>
              <h2 className="sessao-titulo">{cat.categoria}</h2>
              <div className="kit-grid">
                {itensCat.map((item) => {
                  const selecionado = selecionados.find((s) => s.id === item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => { if (!selecionado) toggleItem(item); }}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        boxShadow: selecionado ? "0 0 0 3px #ec4899" : "0 4px 12px rgba(0,0,0,0.1)",
                        cursor: selecionado ? "default" : "pointer",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        overflow: "hidden"
                      }}
                    >
                      <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
                        <Image
                          src={getImagemProduto(item)}
                          alt={item.nome}
                          style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                          onClick={(e) => { e.stopPropagation(); setImagemAmpliada(getImagemProduto(item)); }}
                        />
                      </div>

                      <div style={{ padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px" }}>
                          <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{item.nome}</h3>
                          {selecionado && (
                            <button
                              onClick={(e) => { e.stopPropagation(); removerItem(item.id); }}
                              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px" }}
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {item.descricao && (
                          <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "8px", lineHeight: "1.4" }}>
                            {item.descricao}
                          </p>
                        )}

                        <p style={{ color: "#22c55e", fontWeight: "bold", fontSize: "16px", marginTop: "12px" }}>
                          {formatar(item.preco)}
                        </p>

                        <div style={{ display: "flex", justifyContent: "center", gap: "8px", alignItems: "center", marginTop: "12px" }}>
                          {selecionado ? (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); alterarQuantidade(item.id, -1); }}
                                style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}
                              >
                                -
                              </button>
                              <span style={{ minWidth: "20px", textAlign: "center", fontWeight: "700" }}>
                                {selecionado.quantidade}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); alterarQuantidade(item.id, 1); }}
                                style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}
                              >
                                +
                              </button>
                            </>
                          ) : (
                            <span style={{ color: "#ec4899", fontSize: "14px" }}>Clique para adicionar</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* TOTAL NO FINAL DA PÁGINA */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
            Total: {formatar(getTotal())}
          </p>

          <button
            onClick={adicionarKit}
            disabled={selecionados.length === 0}
            style={{
              backgroundColor: selecionados.length === 0 ? "#ccc" : "#ec4899",
              color: "white",
              padding: "16px 40px",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              cursor: selecionados.length === 0 ? "not-allowed" : "pointer",
              transition: "transform 0.2s"
            }}
          >
            Adicionar ao Carrinho
          </button>
        </div>

        {imagemAmpliada && (
          <Lightbox src={imagemAmpliada} onClose={() => setImagemAmpliada(null)} />
        )}

      </section>
    </div>
  );
}