import { useState } from "react";
import Image from "./Image";
import Lightbox from "./Lightbox";
import "./Depoimentos.css";

export default function Depoimentos() {
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  
  const cards = [
    { texto: "Melhor bolo que já pedi! Minha festa ficou perfeita com os docinhos encantadores. Todos elogiaram muito a qualidade e o sabor! Recomendo demais!", autor: "Ana Clara", imagem: "/img/depoimentos/cliente1.png" },
    { texto: "Doces maravilhosos e atendimento incrível! A entrega foi pontual e tudo arrivedou fresquinho. Com certeza vou pedir mais vezes!", autor: "Maria Silva", imagem: "/img/depoimentos/cliente2.png" },
    { texto: "Entrega no prazo e tudo fresquinho. Super recomendo! O atendimento foi excepcional desde o primeiro contato.", autor: "João Santos", imagem: "/img/depoimentos/cliente3.png" },
    { texto: "Fiquei encantada com a qualidade dos produtos. O bolo de aniversário da minha filha foi um sucesso! Obrigada pelo carinho.", autor: "Carla Oliveira", imagem: "/img/depoimentos/cliente4.png" },
    { texto: "Nuncavi docinhos tão bem feitos! A apresentação é impecável e o sabor é indescritível. Já estou planejando meu próximo evento!", autor: "Patrícia Lima", imagem: "/img/depoimentos/cliente5.png" },
    { texto: "Serviço excelente do início ao fim. A equipe é muito atenciosa e os produtos são de primeira qualidade. Parabéns!", autor: "Roberto Alves", imagem: "/img/depoimentos/cliente6.png" }
  ];

  const cardsVisiveis = mostrarTodos ? cards : cards.slice(0, 2);

  return (
    <>
      <section id="depoimentos" className="depoimentos-section">
        <div className="depoimentos-container">
          <h2 className="depoimentos-title">O que nossos clientes dizem 💬</h2>

          <div className="depoimentos-grid">
            {cardsVisiveis.map((c, idx) => (
              <article
                key={idx}
                className="depoimento-card"
                onClick={() => {
                  setImagemAmpliada(c.imagem);
                  setItemSelecionado({ nome: c.autor, descricao: c.texto });
                }}
              >
                <div className="depoimento-image">
                  <Image
                    src={c.imagem}
                    alt={c.autor}
                    categoria="depoimentos"
                  />
                </div>
                <div className="depoimento-content">
                  <p className="depoimento-label">Depoimento real</p>
                  <strong className="depoimento-author">{c.autor}</strong>
                  <blockquote className="depoimento-text">
                    “{c.texto.length > 140 ? c.texto.substring(0, 140) + "..." : c.texto}”
                  </blockquote>
                </div>
              </article>
            ))}
          </div>

          {cards.length > 2 && (
            <div className="depoimentos-toggle">
              <button onClick={() => setMostrarTodos(!mostrarTodos)}>
                {mostrarTodos ? "Ver menos depoimentos" : "Veja outros depoimentos"}
              </button>
            </div>
          )}
        </div>
      </section>

      {imagemAmpliada && (
        <Lightbox
          src={imagemAmpliada}
          item={itemSelecionado}
          showAddButton={false}
          onClose={() => {
            setImagemAmpliada(null);
            setItemSelecionado(null);
          }}
        />
      )}
    </>
  );
}
