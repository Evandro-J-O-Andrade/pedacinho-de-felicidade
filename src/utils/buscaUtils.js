import { eventosSazonais } from "../data/sazonais";
import { kits } from "../data/kits";
import { produtos } from "../data/produtos";

function normalizar(texto = "") {
  return String(texto)
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

export function getProdutosVitrine(produtos) {
  return produtos.flatMap(categoria =>
    categoria.itens.filter(item => item.vitrine && isProdutoDisponivel(item))
  );
}

export function buscarProdutos(produtos, termo) {
  if (!termo || !termo.trim()) return [];

  const t = normalizar(termo);
  const palavras = t.split(/\s+/).filter(Boolean);

  const todos = produtos.flatMap(categoria =>
    categoria.itens.map(item => ({
      ...item,
      categoria: categoria.categoria,
      subcategoria: item.subcategoria || item.tipo || "",
      tags: [item.tipo || "", item.sazonal || "", categoria.categoria || ""].join(" ")
    }))
  );

  return todos
    .filter(p => isProdutoDisponivel(p))
    .map(p => {
      const nome = normalizar(p.nome || "");
      const descricao = normalizar(p.descricao || "");
      const categoria = normalizar(p.categoria || "");
      const subcategoria = normalizar(p.subcategoria || "");
      const tags = normalizar(p.tags || "");
      const haystack = `${nome} ${descricao} ${categoria} ${subcategoria} ${tags}`.trim();

      const coincide = palavras.every(palavra => haystack.includes(palavra));
      if (!coincide) return { ...p, score: 0 };

      let score = 0;
      if (nome.startsWith(t)) score += 18;
      if (nome.includes(t)) score += 12;
      if (descricao.includes(t)) score += 8;
      if (categoria.includes(t)) score += 7;
      if (subcategoria.includes(t)) score += 5;
      if (tags.includes(t)) score += 4;
      if (p.destaque) score += 2;

      return { ...p, score };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}

export function buscarKits(termo) {
  if (!termo || !termo.trim()) return [];

  const t = normalizar(termo);
  const palavras = t.split(/\s+/).filter(Boolean);

  return kits
    .map(kit => {
      const nome = normalizar(kit.nome || "");
      const descricao = normalizar(kit.descricao || "");
      const categoria = normalizar(kit.categoria || "");
      const itens = normalizar((kit.itens || []).join(" "));
      const haystack = `${nome} ${descricao} ${categoria} ${itens}`.trim();

      const coincide = palavras.every(palavra => haystack.includes(palavra));
      if (!coincide) return { ...kit, score: 0 };

      let score = 0;
      if (nome.startsWith(t)) score += 18;
      if (nome.includes(t)) score += 10;
      if (descricao.includes(t)) score += 8;
      if (categoria.includes(t)) score += 6;
      if (itens.includes(t)) score += 5;

      return { ...kit, score };
    })
    .filter(kit => kit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export function buscarGlobal(termo) {
  const produtosEncontrados = buscarProdutos(produtos, termo).map(item => ({
    ...item,
    tipo: "produto"
  }));
  const kitsEncontrados = buscarKits(termo).map(kit => ({
    ...kit,
    tipo: "kit"
  }));

  return [...produtosEncontrados, ...kitsEncontrados].sort((a, b) => b.score - a.score);
}