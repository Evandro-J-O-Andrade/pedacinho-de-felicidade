import { useEffect } from "react";
import Galeria from "./Galeria";
import Image from "./Image";
import { eventosEspeciais, getImagensEventoEspecial } from "../data/eventosEspeciais";

export default function EventosEspeciaisPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="eventos-especiais-page"
      style={{
        paddingTop: "185px",
        paddingBottom: "70px",
        background: "linear-gradient(180deg, #fff7f9 0%, #fff0f5 100%)",
        minHeight: "100vh"
      }}
    >
      <style>{`
        .eventos-especiais-page {
          width: 100%;
          position: relative;
        }
        .eventos-especiais-watermark {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
          opacity: 0.05;
        }
        .eventos-especiais-watermark img {
          width: min(860px, 72vw);
          height: auto;
          object-fit: contain;
          filter: grayscale(1);
        }
        .eventos-especiais-page-content {
          position: relative;
          z-index: 1;
        }
        .eventos-banner-principal {
          width: 100%;
          height: auto;
          overflow: visible;
          margin-bottom: 26px;
        }
        .eventos-banner-principal-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: center center;
          display: block;
        }
        .eventos-especiais-head {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .eventos-especiais-carousel-block {
          width: 100%;
          margin: 0 0 34px;
        }
        @media only screen and (max-width: 1024px) {
          .eventos-especiais-page {
            padding-top: 170px !important;
          }
          .eventos-banner-principal {
            height: 300px;
            margin-bottom: 20px;
            overflow: hidden;
          }
          .eventos-banner-principal-img {
            height: 100%;
            object-fit: cover;
            object-position: center top;
          }
          .eventos-especiais-head h1 {
            font-size: 30px !important;
          }
        }
        @media only screen and (max-width: 600px) {
          .eventos-banner-principal {
            height: auto;
          }
          .eventos-banner-principal-img {
            height: auto;
            aspect-ratio: 16/9;
          }
          .eventos-especiais-watermark img {
            width: min(520px, 88vw);
          }
          .eventos-especiais-head h1 {
            font-size: 26px !important;
          }
        }
      `}</style>

      <div className="eventos-especiais-watermark" aria-hidden="true">
        <img src="/img/logo.png" alt="" />
      </div>

      <div className="eventos-especiais-page-content">
        <div className="eventos-banner-principal">
          <Image
            src="/img/eventos-especiais/banners/bannereventosespeciais.png"
            alt="Banner Eventos Especiais"
            categoria="eventos"
            className="eventos-banner-principal-img"
          />
        </div>

        <div className="eventos-especiais-head">
          <h1
            style={{
              textAlign: "center",
              color: "#ec4899",
              fontSize: "36px",
              margin: "0 0 12px",
              fontWeight: 800
            }}
          >
            Eventos Especiais
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              margin: "0 auto 30px",
              maxWidth: "760px",
              fontSize: "16px",
              lineHeight: 1.7
            }}
          >
            Inspiracoes reais dos nossos eventos para voce navegar com calma. Em breve, esta pagina
            tambem vai ter reels e videos dos eventos feitos.
          </p>
        </div>

        <div>
          {eventosEspeciais.map((evento) => (
            <div
              key={evento.id}
              id={`evento-${evento.id}`}
              className="eventos-especiais-carousel-block"
            >
              <Galeria
                embedded
                title={`Momentos ${evento.nome}`}
                images={getImagensEventoEspecial(evento.id)}
              />
            </div>
          ))}
        </div>

        <div className="eventos-especiais-head">
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: "16px",
              border: "1px solid #fbcfe8",
              padding: "18px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(236,72,153,0.12)"
            }}
          >
            <h3 style={{ margin: "0 0 8px", color: "#ec4899" }}>Reels e Videos (em breve)</h3>
            <p style={{ margin: 0, color: "#666" }}>
              Estamos organizando um espaco especial para videos curtos dos bastidores e eventos entregues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
