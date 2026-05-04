export function getProdutosVitrine(produtos, categoria) {
  return produtos.flatMap(c =>
    c.itens.filter(item =>
      item.vitrine && item.vitrineCategoria === categoria
    )
  );
}