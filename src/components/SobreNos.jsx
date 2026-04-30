import Image from "./Image";

export default function SobreNos() {
  const numero = "5511971914833";

  return (
    <main className="sobre-page">
      <style>{`
        .sobre-page {
          padding: 185px 20px 70px;
          min-height: 100vh;
          background:
            radial-gradient(circle at 8% 18%, rgba(236, 72, 153, 0.14), transparent 28%),
            radial-gradient(circle at 92% 26%, rgba(139, 92, 246, 0.12), transparent 26%),
            linear-gradient(180deg, #fff7f9 0%, #fdf2f8 48%, #fff 100%);
          color: #4a3728;
          overflow: hidden;
        }

        .sobre-wrap {
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        .sobre-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
          gap: 36px;
          align-items: center;
          margin-bottom: 42px;
        }

        .sobre-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(236, 72, 153, 0.12);
          color: #db2777;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .sobre-title {
          margin: 18px 0 16px;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.04;
          color: #ec4899;
          font-weight: 900;
        }

        .sobre-lead {
          margin: 0;
          max-width: 660px;
          color: #6b4e3d;
          font-size: 18px;
          line-height: 1.75;
          font-weight: 600;
        }

        .sobre-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .sobre-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 13px 22px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 800;
          border: 0;
        }

        .sobre-btn-primary {
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          color: #fff;
          box-shadow: 0 14px 30px rgba(236, 72, 153, 0.24);
        }

        .sobre-btn-secondary {
          background: rgba(255, 255, 255, 0.78);
          color: #7c3aed;
          border: 1px solid rgba(124, 58, 237, 0.18);
        }

        .sobre-photo {
          position: relative;
          display: grid;
          place-items: center;
        }

        .sobre-photo::before {
          content: "";
          position: absolute;
          width: 86%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.28), transparent 66%);
          filter: blur(10px);
        }

        .sobre-logo-card {
          position: relative;
          width: min(360px, 100%);
          aspect-ratio: 1;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(236, 72, 153, 0.18);
          box-shadow: 0 24px 60px rgba(236, 72, 153, 0.18);
          display: grid;
          place-items: center;
          backdrop-filter: blur(12px);
        }

        .sobre-logo-card img {
          width: 82%;
          height: 82%;
          object-fit: contain;
        }

        .sobre-section-title {
          margin: 0 0 18px;
          text-align: center;
          color: #ec4899;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 900;
        }

        .sobre-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin: 28px 0 44px;
        }

        .sobre-card {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(236, 72, 153, 0.13);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 14px 34px rgba(236, 72, 153, 0.1);
        }

        .sobre-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: #fce7f3;
          display: grid;
          place-items: center;
          font-size: 24px;
          margin-bottom: 16px;
        }

        .sobre-card h2,
        .sobre-card h3 {
          margin: 0 0 10px;
          color: #4a3728;
          font-size: 20px;
          font-weight: 900;
        }

        .sobre-card p {
          margin: 0;
          color: #6b4e3d;
          line-height: 1.65;
          font-size: 15px;
          font-weight: 500;
        }

        .sobre-process {
          background: rgba(255, 255, 255, 0.72);
          border-radius: 24px;
          border: 1px solid rgba(236, 72, 153, 0.12);
          padding: 30px;
          box-shadow: 0 18px 46px rgba(107, 83, 68, 0.08);
          margin-bottom: 42px;
        }

        .sobre-steps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-top: 20px;
        }

        .sobre-step {
          padding: 18px;
          border-radius: 16px;
          background: linear-gradient(180deg, #fff7f9 0%, #fff 100%);
          border: 1px solid rgba(236, 72, 153, 0.12);
        }

        .sobre-step strong {
          display: block;
          color: #ec4899;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .sobre-step p {
          margin: 0;
          color: #6b4e3d;
          line-height: 1.55;
          font-size: 14px;
          font-weight: 600;
        }

        .sobre-final {
          text-align: center;
          width: min(760px, 100%);
          margin: 0 auto;
        }

        .sobre-final p {
          color: #6b4e3d;
          font-size: 17px;
          line-height: 1.75;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .sobre-page {
            padding-top: 170px;
          }

          .sobre-hero {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .sobre-lead {
            margin-inline: auto;
          }

          .sobre-actions {
            justify-content: center;
          }

          .sobre-grid,
          .sobre-steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .sobre-page {
            padding: 150px 14px 56px;
          }

          .sobre-hero {
            gap: 24px;
          }

          .sobre-lead {
            font-size: 16px;
          }

          .sobre-actions {
            flex-direction: column;
          }

          .sobre-btn {
            width: 100%;
          }

          .sobre-logo-card {
            width: min(280px, 86vw);
            border-radius: 22px;
          }

          .sobre-grid,
          .sobre-steps {
            grid-template-columns: 1fr;
          }

          .sobre-card,
          .sobre-process {
            padding: 20px;
          }
        }
      `}</style>

      <div className="sobre-wrap">
        <section className="sobre-hero">
          <div>
            <span className="sobre-kicker">Feito por pessoas, para pessoas</span>
            <h1 className="sobre-title">Sobre Nós</h1>
            <p className="sobre-lead">
              A Pedacinhos de Felicidade nasceu do cuidado em transformar encomendas em lembranças. Cada pedido passa por conversa, atenção aos detalhes e preparo artesanal, porque por trás de cada bolo, doce ou kit existe uma comemoração importante.
            </p>

            <div className="sobre-actions">
              <a className="sobre-btn sobre-btn-primary" href={`https://wa.me/${numero}`}>
                Conversar no WhatsApp
              </a>
              <a className="sobre-btn sobre-btn-secondary" href="/produtos">
                Ver nossos produtos
              </a>
            </div>
          </div>

          <div className="sobre-photo" aria-hidden="true">
            <div className="sobre-logo-card">
              <Image src="/img/logo.png" alt="" />
            </div>
          </div>
        </section>

        <section aria-labelledby="sobre-especialistas">
          <h2 id="sobre-especialistas" className="sobre-section-title">
            Especialistas no doce e no atendimento
          </h2>

          <div className="sobre-grid">
            <article className="sobre-card">
              <div className="sobre-card-icon">👩‍🍳</div>
              <h3>Produção com experiência</h3>
              <p>
                Trabalhamos com encomendas planejadas, sabores equilibrados e acabamento pensado para valorizar aniversários, festas, presentes e eventos.
              </p>
            </article>

            <article className="sobre-card">
              <div className="sobre-card-icon">💬</div>
              <h3>Atendimento próximo</h3>
              <p>
                O cliente conversa com gente de verdade. Tiramos dúvidas, orientamos quantidades e ajudamos a escolher opções que fazem sentido para cada ocasião.
              </p>
            </article>

            <article className="sobre-card">
              <div className="sobre-card-icon">🎀</div>
              <h3>Cuidado nos detalhes</h3>
              <p>
                Do preparo à apresentação, cada item recebe atenção para chegar bonito, fresco e com aquele carinho que faz diferença na mesa.
              </p>
            </article>
          </div>
        </section>

        <section className="sobre-process" aria-labelledby="sobre-como-fazemos">
          <h2 id="sobre-como-fazemos" className="sobre-section-title">
            Como cuidamos do seu pedido
          </h2>

          <div className="sobre-steps">
            <div className="sobre-step">
              <strong>1. Conversa</strong>
              <p>Entendemos o evento, a quantidade de pessoas e o que você quer transmitir.</p>
            </div>
            <div className="sobre-step">
              <strong>2. Orientação</strong>
              <p>Indicamos produtos, combinações e formatos adequados para sua comemoração.</p>
            </div>
            <div className="sobre-step">
              <strong>3. Produção</strong>
              <p>Preparamos tudo sob encomenda, com organização e atenção ao acabamento.</p>
            </div>
            <div className="sobre-step">
              <strong>4. Entrega</strong>
              <p>Combinamos os detalhes para seu pedido chegar pronto para encantar.</p>
            </div>
          </div>
        </section>

        <section className="sobre-final">
          <h2 className="sobre-section-title">Nosso jeito de trabalhar</h2>
          <p>
            A gente acredita que comida de festa precisa ter sabor, beleza e confiança. Por isso tratamos cada cliente com escuta, clareza e responsabilidade, como quem entende que aquele pedido faz parte de uma história.
          </p>
        </section>
      </div>
    </main>
  );
}
