import { produtos } from "../data/produtos";

// Cores por categoria
const coresCategoria = {
  "Bolos": { cor1: "#8B4513", cor2: "#D2691E", texto: "Bolo" },
  "Doces": { cor1: "#FF69B4", cor2: "#FF1493", texto: "Doce" },
  "Salgados": { cor1: "#CD853F", cor2: "#8B4513", texto: "Salgado" },
  "Bebidas": { cor1: "#32CD32", cor2: "#228B22", texto: "Bebida" },
  "Complementos": { cor1: "#9370DB", cor2: "#8A2BE2", texto: "Complemento" },
  "Páscoa": { cor1: "#FFB6C1", cor2: "#FF69B4", texto: "Páscoa" },
  "Natal": { cor1: "#228B22", cor2: "#006400", texto: "Natal" },
  "Dia dos Pais": { cor1: "#4169E1", cor2: "#0000CD", texto: "Dia dos Pais" },
  "Dia das Mães": { cor1: "#FF69B4", cor2: "#FF1493", texto: "Dia das Mães" },
  "Dia dos Namorados": { cor1: "#DC143C", cor2: "#B22222", texto: "Namorados" },
  "Dia do Professor": { cor1: "#DAA520", cor2: "#B8860B", texto: "Professor" },
  "Dia das Mulheres": { cor1: "#DA70D6", cor2: "#800080", texto: "Mulheres" },
  "Festa Junina": { cor1: "#FF8C00", cor2: "#FF4500", texto: "Festa Junina" },
  "Ano Novo": { cor1: "#FFD700", cor2: "#DAA520", texto: "Ano Novo" },
  "Carnaval": { cor1: "#9400D3", cor2: "#8B008B", texto: "Carnaval" },
};

// Gerar SVG para um produto
function gerarSVG(categoria, nome, descricao, preco, tipo) {
  const cores = coresCategoria[categoria] || { cor1: "#863BFF", cor2: "#FF6B9D", texto: "Produto" };
  const nomeSlug = nome.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${cores.cor1}"/>
      <stop offset="100%" style="stop-color:${cores.cor2}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <!-- Icone decorativo -->
  <circle cx="200" cy="80" r="30" fill="white" opacity="0.2"/>
  <text x="200" y="90" font-family="Arial" font-size="40" fill="white" text-anchor="middle" opacity="0.3">★</text>
  <!-- Nome do produto -->
  <text x="200" y="140" font-family="Arial" font-size="22" font-weight="bold" fill="white" text-anchor="middle">${nome}</text>
  <!-- Descricao -->
  <text x="200" y="175" font-family="Arial" font-size="14" fill="white" text-anchor="middle" opacity="0.9">${descricao}</text>
  <!-- Preco -->
  <text x="200" y="230" font-family="Arial" font-size="26" font-weight="bold" fill="#FFD700" text-anchor="middle">R$ ${preco},00/${tipo}</text>
  <!-- Categoria -->
  <text x="200" y="270" font-family="Arial" font-size="14" fill="white" text-anchor="middle" opacity="0.7">${cores.texto}</text>
</svg>`;
}

// Gerar todos os SVGs
function gerarTodosSVGs() {
  let output = "";
  
  for (const cat of produtos) {
    const pasta = cat.categoria === "Pascimento" ? "pascoa" : 
                 cat.categoria.toLowerCase().replace(/ /g, "-");
    
    for (const item of cat.itens) {
      const svg = gerarSVG(cat.categoria, item.nome, item.descricao, item.preco, item.tipo);
      output += `<!-- ${item.nome} - ${cat.categoria} -->\n`;
      output += `path: /img/produtos/${pasta}/${item.nome.toLowerCase().replace(/ /g, "-")}.svg\n`;
    }
  }
  
  return output;
}

export default gerarTodosSVGs;