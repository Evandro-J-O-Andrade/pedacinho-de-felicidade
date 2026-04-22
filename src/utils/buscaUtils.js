import { eventosSazonais } from "../data/sazonais";

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isProdutoDisponivel(produto) {
  if (!produto.sazonal) return true;
  
  const hoje = new Date();
  const evento = eventosSazonais.find(e => e.id === produto.sazonal);
  
  if (!evento) return true;
  if (!evento.ativo) return false;
  
  const inicio = new Date(evento.inicio);
  const fim = new Date(evento.fim);
  
  return hoje >= inicio && hoje <= fim;
}

export function buscarProdutos(produtos, termo) {
  if (!termo) return [];

  const t = normalizar(termo);

  const todos = produtos.flatMap(c => c.itens);

  return todos
    .filter(p => isProdutoDisponivel(p))
    .map(p => {
      const nome = normalizar(p.nome);
      const descricao = normalizar(p.descricao || "");

      let score = 0;

      if (nome.startsWith(t)) score += 10;
      if (nome.includes(t)) score += 6;
      if (descricao.includes(t)) score += 3;

      if (p.destaque) score += 2;

      return { ...p, score };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}