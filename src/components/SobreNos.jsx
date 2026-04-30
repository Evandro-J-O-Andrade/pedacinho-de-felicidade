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
          line-height: 1.08;
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
            <span className="sobre-kicker">
              Doces personalizados em Poá SP • Feito por pessoas, para pessoas
            </span>

            <h1 className="sobre-title">
              Doces Personalizados e Bolos Sob Encomenda em Poá SP
            </h1>

            <p className="sobre-lead">
              A <strong>Pedacinhos de Felicidade</strong> transforma momentos especiais em experiências inesquecíveis através de <strong>doces personalizados, bolos sob encomenda e kits para festas em Poá e região leste de São Paulo</strong>.
              <br />
              <br />
              Cada pedido é feito com cuidado artesanal, atenção aos detalhes e foco total em encantar — no sabor, na apresentação e na experiência.
              <br />
              <br />
              Aqui, não vendemos apenas doces. Criamos lembranças que fazem parte de momentos importantes da sua vida.
            </p>

            <div className="sobre-actions">
              <a className="sobre-btn sobre-btn-primary" href={`https://wa.me/${numero}`}>
                👉 Fazer pedido no WhatsApp agora
              </a>
              <a className="sobre-btn sobre-btn-secondary" href="/produtos">
                Ver doces e bolos disponíveis
              </a>
            </div>
          </div>

          <div className="sobre-photo" aria-hidden="true">
            <div className="sobre-logo-card">
              <Image src="/img/logo.png" alt="Confeitaria artesanal em Poá SP com doces personalizados e bolos sob encomenda" />
            </div>
          </div>
        </section>

        <section aria-labelledby="sobre-especialistas">
          <h2 id="sobre-especialistas" className="sobre-section-title">
            Por que escolher a Pedacinhos de Felicidade
          </h2>

          <div className="sobre-grid">
            <article className="sobre-card">
              <div className="sobre-card-icon">👩‍🍳</div>
              <h3>Produção artesanal com qualidade</h3>
              <p>
                Trabalhamos com <strong>doces personalizados e bolos sob encomenda em Poá SP</strong>, sempre com sabores equilibrados e acabamento pensado para impressionar em qualquer evento.
              </p>
            </article>

            <article className="sobre-card">
              <div className="sobre-card-icon">💬</div>
              <h3>Atendimento rápido e direto</h3>
              <p>
                Fale com a gente no WhatsApp e resolva tudo rápido. Orientamos quantidades, combinações e ajudamos você a escolher o melhor para sua festa.
              </p>
            </article>

            <article className="sobre-card">
              <div className="sobre-card-icon">🎀</div>
              <h3>Cuidado em cada detalhe</h3>
              <p>
                Cada pedido é preparado para chegar bonito, fresco e pronto para encantar — do sabor à apresentação final.
              </p>
            </article>
          </div>
        </section>

        <section className="sobre-process" aria-labelledby="sobre-como-fazemos">
          <h2 id="sobre-como-fazemos" className="sobre-section-title">
            Como funciona seu pedido
          </h2>

          <div className="sobre-steps">
            <div className="sobre-step">
              <strong>1. Chamada rápida</strong>
              <p>Você entra em contato pelo WhatsApp e explica o que precisa.</p>
            </div>
            <div className="sobre-step">
              <strong>2. Orientação</strong>
              <p>Sugerimos os melhores doces, bolos e kits personalizados para sua ocasião.</p>
            </div>
            <div className="sobre-step">
              <strong>3. Produção artesanal</strong>
              <p>Preparamos tudo sob encomenda, com qualidade e atenção aos detalhes.</p>
            </div>
            <div className="sobre-step">
              <strong>4. Entrega</strong>
              <p>Seu pedido chega pronto para encantar sua comemoração.</p>
            </div>
          </div>
        </section>

        <section className="sobre-final">
          <h2 className="sobre-section-title">Mais do que doces, criamos experiências</h2>
          <p>
            Acreditamos que uma boa confeitaria vai além do sabor. Por isso, unimos <strong>qualidade, apresentação e atendimento próximo</strong>, garantindo confiança em cada pedido.
            <br />
            <br />
            Atendemos <strong>Poá (SP)</strong> e toda a <strong>região leste de São Paulo</strong>, levando doces que fazem parte de momentos especiais.
            <br />
            <br />
            Cada cliente é único, e cada encomenda também.
          </p>
        </section>
      </div>
    </main>
  );
}
