export function getProdutosSazonais(produtos, sazonal) {
  return produtos.flatMap(categoria =>
    categoria.itens.filter(item => {
      if (!item.sazonal) return false;

      if (Array.isArray(item.sazonal)) {
        return item.sazonal.includes(sazonal);
      }

      return item.sazonal === sazonal;
    })
  );
}