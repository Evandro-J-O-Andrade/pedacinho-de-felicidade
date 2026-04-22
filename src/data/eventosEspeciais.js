const EVENTOS_BASE_PATH = "/img/eventos-especiais";

function gerarMidiasImagem({ eventoId, total, tags = [], seeds = [] }) {
  return Array.from({ length: total }, (_, idx) => {
    const numero = String(idx + 1).padStart(3, "0");
    const srcSeed = seeds[idx];
    return {
      id: `${eventoId}-${numero}`,
      tipo: "imagem",
      src: srcSeed || `${EVENTOS_BASE_PATH}/${eventoId}/imagens/${eventoId}-${numero}.jpg`,
      tags: [...tags, `foto-${numero}`]
    };
  });
}

export const eventosEspeciais = [
  {
    id: "aniversarios",
    nome: "Aniversarios",
    icon: "🎈",
    descricao: "Decoracoes tematicas e deliciosos sabores",
    tags: ["festa", "aniversario", "decoracao"],
    midias: gerarMidiasImagem({
      eventoId: "aniversarios",
      total: 12,
      tags: ["bolo", "mesa"],
      seeds: [
        "/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png",
        "/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png",
        "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png"
      ]
    })
  },
  {
    id: "casamentos",
    nome: "Casamentos",
    icon: "💒",
    descricao: "Doces gourmet e bolo perfeito",
    tags: ["casamento", "noivos", "mesa"],
    midias: gerarMidiasImagem({
      eventoId: "casamentos",
      total: 12,
      tags: ["gourmet", "decoracao"],
      seeds: [
        "/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png",
        "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png",
        "/img/Gemini_Generated_Image_9l2i459l2i459l2i.png"
      ]
    })
  },
  {
    id: "formaturas",
    nome: "Formaturas",
    icon: "🎓",
    descricao: "Kit completo para sua festa",
    tags: ["formatura", "evento", "celebracao"],
    midias: gerarMidiasImagem({
      eventoId: "formaturas",
      total: 12,
      tags: ["kit", "festa"],
      seeds: [
        "/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png",
        "/img/Gemini_Generated_Image_9l2i459l2i459l2i.png",
        "/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png"
      ]
    })
  },
  {
    id: "cha-de-bebe",
    nome: "Cha de Bebe",
    icon: "🍼",
    descricao: "Tema delicado com doces personalizados",
    tags: ["cha-de-bebe", "personalizado", "decoracao"],
    midias: gerarMidiasImagem({
      eventoId: "cha-de-bebe",
      total: 12,
      tags: ["baby", "delicado"],
      seeds: [
        "/img/Gemini_Generated_Image_9l2i459l2i459l2i.png",
        "/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png",
        "/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png"
      ]
    })
  }
];

export function getImagensEventoEspecial(eventoId) {
  const evento = eventosEspeciais.find((e) => e.id === eventoId);
  if (!evento) return [];

  return evento.midias
    .filter((midia) => midia.tipo === "imagem")
    .map((midia) => midia.src);
}
