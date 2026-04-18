// ============================================
// 🎯 UTILITÁRIO DE IMAGENS - PEDACINHOS DE FELICIDADE
// Sistema robusto para nunca quebrar imagens
// ============================================

// Imagem fallback padrão
export const IMAGEM_FALLBACK = "/img/produtos/default.svg";

// ============================================
// 📌 FUNÇÃO PRINCIPAL: getImagemProduto
// ============================================
// Retorna caminho da imagem - nunca undefined
export function getImagemProduto(produto) {
  // Sem produto
  if (!produto) {
    return IMAGEM_FALLBACK;
  }
  
  // Se não tem imagem
  if (!produto.imagem) {
    return getImagemPorCategoria(produto.categoria);
  }
  
  // Se é URL externa
  if (produto.imagem.startsWith('http')) {
    return produto.imagem;
  }
  
  return produto.imagem;
}

// ============================================
// ⚠️ FUNÇÃO: handleImagemErro
// ============================================
// Chamar no onError da tag <img>
// Exemplo: <img onError={handleImagemErro} />
export function handleImagemErro(e) {
  e.target.src = IMAGEM_FALLBACK;
}

// ============================================
// 📁 FUNÇÃO: getImagemPorCategoria
// ============================================
// Retorna imagem genérica por categoria
export function getImagemPorCategoria(categoria) {
  if (!categoria) return IMAGEM_FALLBACK;
  
  const cat = categoria.toLowerCase().replace(/\s+/g, '');
  
  const mapaCategorias = {
    // Categorias fixas
    'bolos': '/img/produtos/bolos/bolo-generico.svg',
    'doces': '/img/produtos/doces/doce-generico.svg',
    'salgados': '/img/produtos/salgados/salgado-generico.svg',
    'bebidas': '/img/produtos/bebidas/bebida-generica.svg',
    'complementos': '/img/produtos/complementos/complemento-generico.svg',
    // Sazonais
    'pascoa': '/img/sazonal/pascoa/pascoa-generico.svg',
    'natal': '/img/sazonal/natal/natal-generico.svg',
    'festaJunina': '/img/sazonal/junina/junina-generico.svg',
    'diadospais': '/img/sazonal/pais/pais-generico.svg',
    'diasmaes': '/img/sazonal/maes/maes-generico.svg',
    'namorados': '/img/sazonal/namorados/namorados-generico.svg',
    'professor': '/img/sazonal/professor/professor-generico.svg',
    'mulheres': '/img/sazonal/mulheres/mulheres-generico.svg',
    'anonovo': '/img/sazonal/anonovo/anonovo-generico.svg',
    'carnaval': '/img/sazonal/carnaval/carnaval-generico.svg',
  };
  
  return mapaCategorias[cat] || IMAGEM_FALLBACK;
}

// ============================================
// 🔧 FUNÇÃO: normalizarNomeImagem
// ============================================
// Transforma nome em caminho automático
// Exemplo: "Bolo de Chocolate" -> "/img/produtos/bolos/bolo-de-chocolate.png"
export function normalizarNomeImagem(nome, categoria = 'produtos') {
  if (!nome) return IMAGEM_FALLBACK;
  
  const slug = nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `/img/produtos/${categoria.toLowerCase()}/${slug}.svg`;
}

// ============================================
// 🏭 FUNÇÃO FACTORY: criarSrcImagem
// ============================================
// Cria src para img automaticamente
export function criarSrcImagem(produto) {
  const imagem = getImagemProduto(produto);
  
  return {
    src: imagem,
    onError: handleImagemErro
  };
}

// ============================================
// 📦 EXTRA: validarImagem
// ============================================
// Valida se imagem existe (para debugging)
export function validarImagem(imagem) {
  if (!imagem) return { valida: false, motivo: 'vazio' };
  if (imagem.startsWith('http')) return { valida: true, tipo: 'externa' };
  if (imagem.includes('default.svg') || imagem.includes('fallback')) return { valida: true, tipo: 'fallback' };
  return { valida: true, tipo: 'local' };
}