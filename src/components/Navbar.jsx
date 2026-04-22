import { useState, useEffect, useRef, useMemo } from "react";
import { produtos } from "../data/produtos";
import Image from "./Image";

export default function Navbar() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [paginaAtiva, setPaginaAtiva] = useState("/");
  const menuRef = useRef();
  const toggleRef = useRef();
  const todos = useMemo(() => produtos.flatMap((c) => c.itens), []);

  useEffect(() => {
    setPaginaAtiva(window.location.pathname + window.location.hash);
  }, []);

  useEffect(() => {
    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) && toggleRef.current && !toggleRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  function handleBusca(e) {
    const valor = e.target.value;
    setBusca(valor);
    if (valor.length > 0) {
      const filtro = todos.filter((item) =>
        item.nome.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtro.slice(0, 42));
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
        .nav-links { display: flex; font-size: 16px; }
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
          <Image className="nav-logo-img" src="/img/logo.png" style={{ width: "150px", height: "150px", objectFit: "contain" }} alt="logo" />
          <span className="nav-logo-text"
            style={{
              fontSize: "38px",
              fontWeight: 900,
              letterSpacing: "0.8px",
              background: "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pedacinhos de Felicidade
          </span>
          <button
            ref={toggleRef}
            onClick={(e) => {
              e.stopPropagation();
              setMenuAberto(!menuAberto);
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
              width: "300px",
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
                  style={{ display: "block", padding: "12px", borderBottom: "1px solid rgba(255,255,255,0.2)", color: "#e8dcc8", textDecoration: "none", cursor: "pointer" }}
                >
                  {item.nome}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* MENU */}
        <div ref={menuRef} className={`nav-links ${menuAberto ? "open" : ""}`} style={{ gap: "18px", fontSize: "16px", fontWeight: "600", alignItems: "flex-start", marginTop: menuAberto ? "8px" : "0" }}>
          <a href="/" className={paginaAtiva === "/" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/"); }}>Home</a>
          <a href="/#kit-festa" className={paginaAtiva.includes("kit-festa") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/#kit-festa"); }}>Kit Festa Rápido</a>
          <a href="/#cardapio" className={paginaAtiva.includes("cardapio") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/#cardapio"); }}>Cardápio</a>
          <a href="/produtos" className={paginaAtiva === "/produtos" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/produtos"); }}>Produtos</a>
          <a href="/monte-seu-kit" className={paginaAtiva === "/monte-seu-kit" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/monte-seu-kit"); }}>Monte seu kit</a>
          <a href="/sazonal" className={paginaAtiva === "/sazonal" ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/sazonal"); }}>Delícias de Temporada</a>
          <a href="/#eventos" className={paginaAtiva.includes("eventos") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/#eventos"); }}>Eventos</a>
          <a href="/#contato" className={paginaAtiva.includes("contato") ? "active" : ""} style={{ color: "inherit" }} onClick={(e) => { e.stopPropagation(); setMenuAberto(false); setPaginaAtiva("/#contato"); }}>Contato</a>
        </div>
      </div>
    </nav>
  );
}