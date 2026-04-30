export const kits = [
  {
    id: 1001,
    nome: "Kit Festa Básico",
    descricao: "Serve até 20 pessoas",
    preco: 250,
    tipo: "kit",
    categoria: "Kit Festa",
    sazonal: [],
    imagem: "/img/produtos/bolo.png",
    itens: ["Bolo 2kg", "100 doces", "100 salgados"],
    configuracoes: [
      { id: "bolo-basico", tipo: "bolo", titulo: "Escolha o sabor do bolo", maxEscolhas: 1, quantidade: "1 bolo de 2kg", quantidadeTotal: 1, opcoes: ["Chocolate", "Ninho", "Morango", "Prestígio"] },
      { id: "doces-basico", tipo: "doces", titulo: "Escolha os doces", quantidadeTotal: 100, quantidade: "100 doces", opcoes: ["Brigadeiro", "Beijinho", "Brigadeiro branco", "Cajuzinho"] },
      { id: "salgados-basico", tipo: "salgados", titulo: "Escolha os salgados", quantidadeTotal: 100, quantidade: "100 salgados", opcoes: ["Coxinha", "Kibe", "Bolinha de queijo", "Rissole"] }
    ]
  },
  {
    id: 1002,
    nome: "Kit Festa Médio",
    descricao: "Serve até 50 pessoas",
    preco: 450,
    tipo: "kit",
    categoria: "Kit Festa",
    sazonal: [],
    imagem: "/img/produtos/bolo3.png",
    itens: ["Bolo 3kg", "100 doces", "100 salgados"],
    configuracoes: [
      { id: "bolo-medio", tipo: "bolo", titulo: "Escolha o sabor do bolo", maxEscolhas: 1, quantidade: "1 bolo de 3kg", quantidadeTotal: 1, opcoes: ["Chocolate", "Red Velvet", "Ninho", "Morango", "Prestígio"] },
      { id: "doces-medio", tipo: "doces", titulo: "Escolha os doces", quantidadeTotal: 100, quantidade: "100 doces", opcoes: ["Brigadeiro", "Beijinho", "Camafeu", "Trufa", "Bombom de morango"] },
      { id: "salgados-medio", tipo: "salgados", titulo: "Escolha os salgados", quantidadeTotal: 100, quantidade: "100 salgados", opcoes: ["Coxinha", "Kibe", "Esfiha", "Bolinha de queijo", "Mini pizza"] }
    ]
  },
  {
    id: 1003,
    nome: "Kit Festa Premium",
    descricao: "Serve até 100 pessoas",
    preco: 850,
    tipo: "kit",
    categoria: "Kit Festa",
    sazonal: [],
    imagem: "/img/produtos/bolo4.jpeg",
    itens: ["Bolo 5kg", "200 doces", "200 salgados", "Decoração"],
    configuracoes: [
      { id: "bolo-premium", tipo: "bolo", titulo: "Escolha o sabor do bolo", maxEscolhas: 1, quantidade: "1 bolo de 5kg", quantidadeTotal: 1, opcoes: ["Chocolate", "Red Velvet", "Ninho", "Morango", "Prestígio", "Floresta Negra"] },
      { id: "doces-premium", tipo: "doces", titulo: "Escolha os doces", quantidadeTotal: 200, quantidade: "200 doces", opcoes: ["Brigadeiro", "Beijinho", "Camafeu", "Trufa", "Bombom de morango", "Pé de moça"] },
      { id: "salgados-premium", tipo: "salgados", titulo: "Escolha os salgados", quantidadeTotal: 200, quantidade: "200 salgados", opcoes: ["Coxinha", "Kibe", "Esfiha", "Bolinha de queijo", "Mini pizza", "Empadinha"] },
      { id: "decoracao-premium", tipo: "decoracao", titulo: "Escolha a decoração", maxEscolhas: 1, quantidade: "1 decoração", quantidadeTotal: 1, opcoes: ["Tema infantil", "Tema feminino", "Tema masculino", "Tema personalizado"] }
    ]
  }
];
