import { useState, useEffect, useRef, useMemo } from "react";
import { produtos } from "../data/produtos";
import Image from "./Image";
import { buscarProdutos } from "../utils/buscaUtils";

export default function Navbar() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [maisAberto, setMaisAberto] = useState(false);
  const [paginaAtiva, setPaginaAtiva] = useState("/");
  const menuRef = useRef();
  const toggleRef = useRef();
  const todos = useMemo(() => produtos.flatMap((c) => c.itens), []);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setPaginaAtiva(window.location.pathname + window.location.hash);
  }, []);

  useEffect(() => {
    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) && toggleRef.current && !toggleRef.current.contains(e.target)) {
        setMenuAberto(false);
        setMaisAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleBusca(e) {
    const valor = e.target.value;
    setBusca(valor);
    
    if (valor.length > 1) {
      const resultado = buscarProdutos(produtos, valor);
      setResultados(resultado);
    } else {
      setResultados([]);
    }
  }

  function disparaBuscaGlobal(valor) {
    window.dispatchEvent(new CustomEvent("busca-global", {
      detail: { termo: valor, tipo: "termo" }
    }));
  }

  function handleBuscaKeyDown(e) {
    if (e.key === "Enter" && busca.length > 0) {
      // Sempre dispara o evento global primeiro
      // Cada página verifica se tem o produto e filtra localmente
      disparaBuscaGlobal(busca);
      setBusca("");
      setResultados([]);
    }
  }

  function handleResultadoClick(e, item) {
    e.preventDefault();
    // Sempre dispara o evento global primeiro
    // A página atual verifica se tem o produto
    disparaBuscaGlobal(item.nome);
    setBusca("");
    setResultados([]);
  }

  function handleInputBlur() {
    setTimeout(() => {
      setResultados([]);
    }, 200);
  }

  return (
    <nav
      id="navbar"
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "16px 16px 20px",
        zIndex: 100,
        backdropFilter: "blur(5px)"
      }}
    >
      <style>{`
        .navbar {
          background: linear-gradient(180deg, rgba(107,83,68,0.92) 0%, rgba(139,115,85,0.92) 30%, rgba(107,83,68,0.92) 60%, rgba(92,61,46,0.95) 80%, rgba(74,55,40,0.98) 100%);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 15px rgba(74,55,40,0.4);
        }
        .nav-links a {
          color: #f5f5f5;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 600;
          font-size: 15px;
        }
        .nav-logo-text {
          display: inline-flex;
          align-items: baseline;
          gap: 9px;
          font-family: 'Poppins', sans-serif;
          font-size: 36px;
          font-weight: 900;
          letter-spacing: 0.2px;
          line-height: 1;
          white-space: nowrap;
          text-shadow: 0 3px 8px rgba(0,0,0,0.32);
        }
        .nav-logo-main {
          color: #fff7ed;
        }
        .nav-logo-accent {
          color: #f9a8d4;
        }
        .nav-more {
          position: relative;
        }
        .nav-more-button {
          color: #f5f5f5;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 7px 12px;
          font-weight: 700;
          cursor: pointer;
          font-size: 15px;
        }
        .nav-more-menu {
          display: none;
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 190px;
          padding: 10px;
          border-radius: 14px;
          background: rgba(74,55,40,0.98);
          box-shadow: 0 16px 34px rgba(0,0,0,0.28);
          border: 1px solid rgba(232,220,200,0.18);
          z-index: 90;
        }
        .nav-more.open .nav-more-menu {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nav-more-menu a {
          padding: 8px 10px;
          border-radius: 10px;
        }
        .nav-more-menu a:hover {
          background: rgba(255,255,255,0.08);
        }
        .nav-links a:hover,
        .nav-links a:active {
          color: #ffffff;
          text-shadow: 0 0 12px rgba(255,255,255,0.6);
        }
        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: #ffffff;
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .navbar {
            background: linear-gradient(180deg, rgba(92,61,46,0.92) 0%, rgba(74,55,40,0.95) 100%);
            backdrop-filter: blur(12px);
            box-shadow: 0 2px 15px rgba(74,55,40,0.4);
            padding: 14px 12px 16px !important;
          }
          .navbar .nav-logo-img {
            width: 95px !important;
            height: 95px !important;
          }
          .navbar .nav-logo-text {
            font-size: 18px !important;
            gap: 5px;
          }
          .nav-links a {
            color: #f5f5f5 !important;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
            transition: color 0.3s ease;
          }
          .nav-links a:hover,
          .nav-links a:active {
            color: #ffffff !important;
            text-shadow: 0 0 12px rgba(255,255,255,0.6);
          }
          .nav-links a.active::after {
            display: none;
          }
        }
        .nav-links { display: flex; align-items: center; font-size: 16px; }
        .nav-toggle { display: none; }

        @media (max-width: 768px) {
          .nav-container { flex-direction: column; align-items: stretch; gap: 12px; }
          .nav-row { width: 100%; justify-content: space-between; gap: 12px; display: flex; align-items: center; }
          .nav-search { width: 100%; }
          .nav-toggle { display: inline-flex !important; }
          .nav-links {
            display: none;
            flex-direction: column;
            gap: 12px;
            background: rgba(50,50,50,0.7);
            border: none;
            border-radius: 12px;
            padding: 12px;
            align-items: flex-start;
            width: 220px;
            position: absolute;
            top: 100%;
            left: 16px;
            z-index: 60;
          }
          .nav-links.open { display: flex; }
          .nav-more {
            width: 100%;
          }
          .nav-more-button {
            width: 100%;
            text-align: left;
            border-radius: 10px;
            background: rgba(255,255,255,0.06);
          }
          .nav-more-menu {
            position: static;
            min-width: 0;
            width: 100%;
            margin-top: 8px;
            background: rgba(255,255,255,0.06);
            box-shadow: none;
          }
        }
        @media (min-width: 769px) {
          .nav-container { flex-direction: row; align-items: center; justify-content: space-between; }
          .nav-links { display: flex; font-size: 16px; }
          .nav-links a { color: #f5f5f5 !important; }
        }
      `}</style>

      <div className="nav-container" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      {/* LOGO */}
        <div 
          className="nav-row" 
          style={{ display: "flex", alignItems: "center", gap: "0px", cursor: "pointer" }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image className="nav-logo-img" src="/img/logo.png" style={{ width: "150px", height: "150px", objectFit: "contain" }} alt="Logo da Pedacinhos de Felicidade, confeitaria artesanal de bolos, doces e salgados" />
          <span className="nav-logo-text">
            <span className="nav-logo-main">Pedacinhos</span>
            <span className="nav-logo-accent">de Felicidade</span>
          </span>
          <button
            ref={toggleRef}
            onClick={(e) => {
              e.stopPropagation();
              setMenuAberto(!menuAberto);
              setMaisAberto(false);
            }}
            aria-label="Menu"
            className="nav-toggle"
            style={{
              marginLeft: "auto",
              background: "#6b4e3d",
              color: "#e8dcc8",
              border: "none",
              borderRadius: "8px",
              padding: "10px 12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "none"
            }}
          >
            {menuAberto ? "✕" : "☰"}
          </button>
        </div>

        {/* BUSCA */}
        <div className="nav-search" style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Buscar..."
            value={busca}
            onChange={handleBusca}
            onKeyDown={handleBuscaKeyDown}
            onBlur={handleInputBlur}
            style={{
              maxWidth: "320px",
              padding: "8px 12px",
              border: "2px solid #6b4e3d",
              borderRadius: "8px",
              outline: "none",
              width: "100%",
              backgroundColor: "#f5f5f5",
              color: "#4a3728",
              fontWeight: 600
            }}
          />
          {resultados.length > 0 && (
            <div style={{
              position: "absolute",
              top: "100%",
              marginTop: "4px",
              width: "320px",
              maxHeight: "400px",
              overflowY: "auto",
              backgroundColor: "#4a3728",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              borderRadius: "8px",
              zIndex: 200
            }}>
              {resultados.map((item) => (
                <a 
                  key={item.id} 
                  href="#cardapio" 
                  onClick={(e) => handleResultadoClick(e, item)}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderBottom: "1px solid rgba(255,255,255,0.2)", color: "#e8dcc8", textDecoration: "none", cursor: "pointer" }}
                >
                  <img 
                    src={item.imagem || "/img/produtos/default.svg"} 
                    alt={`${item.nome} - ${item.descricao || "produto artesanal da Pedacinhos de Felicidade"}`}
                    onError={(e) => { e.target.src = "/img/produtos/default.svg"; }}
                    style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontWeight: 600, fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nome}</div>
                    {item.descricao && <div style={{ fontSize: "12px", opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.descricao}</div>}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* MENU */}
        <div ref={menuRef} className={`nav-links ${menuAberto ? "open" : ""}`} style={{ gap: "18px", fontSize: "16px", fontWeight: "600", marginTop: menuAberto ? "8px" : "0" }}>
          <a href="/" className={paginaAtiva === "/" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/"); }}>Home</a>
          <a href="/#cardapio" className={paginaAtiva.includes("cardapio") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/#cardapio"); }}>Cardápio</a>
          <a href="/#kit-festa" className={paginaAtiva.includes("kit-festa") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/#kit-festa"); }}>Kit-Pronto</a>
          <a href="/produtos" className={paginaAtiva === "/produtos" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/produtos"); }}>Produtos</a>
          <a href="/monte-seu-kit" className={paginaAtiva === "/monte-seu-kit" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/monte-seu-kit"); }}>Personalize Seu Kit</a>
          <div className={`nav-more ${maisAberto ? "open" : ""}`}>
            <button
              type="button"
              className="nav-more-button"
              onClick={(e) => {
                e.stopPropagation();
                setMaisAberto(!maisAberto);
              }}
            >
              Mais ▾
            </button>
            <div className="nav-more-menu">
              <a href="/sobre-nos" className={paginaAtiva === "/sobre-nos" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/sobre-nos"); }}>Sobre Nós</a>
              <a href="/sazonal" className={paginaAtiva === "/sazonal" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/sazonal"); }}>Temporada</a>
              <a href="/#eventos" className={paginaAtiva.includes("eventos") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/#eventos"); }}>Eventos</a>
              <a href="/#contato" className={paginaAtiva.includes("contato") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setMaisAberto(false); setPaginaAtiva("/#contato"); }}>Contato</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
