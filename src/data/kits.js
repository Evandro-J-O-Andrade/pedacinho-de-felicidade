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
    itens: ["Bolo 2kg", "50 doces", "50 salgados"],
    configuracoes: [
      { tipo: "bolo", titulo: "Escolha o sabor do bolo", maxEscolhas: 1, quantidade: "1 bolo de 2kg", opcoes: ["Chocolate", "Ninho", "Morango", "Prestígio"] },
      { tipo: "doces", titulo: "Escolha os doces", maxEscolhas: 2, quantidade: "50 doces", opcoes: ["Brigadeiro", "Beijinho", "Brigadeiro branco", "Cajuzinho"] },
      { tipo: "salgados", titulo: "Escolha os salgados", maxEscolhas: 2, quantidade: "50 salgados", opcoes: ["Coxinha", "Kibe", "Bolinha de queijo", "Rissole"] }
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
      { tipo: "bolo", titulo: "Escolha o sabor do bolo", maxEscolhas: 1, quantidade: "1 bolo de 3kg", opcoes: ["Chocolate", "Red Velvet", "Ninho", "Morango", "Prestígio"] },
      { tipo: "doces", titulo: "Escolha os doces", maxEscolhas: 3, quantidade: "100 doces", opcoes: ["Brigadeiro", "Beijinho", "Camafeu", "Trufa", "Bombom de morango"] },
      { tipo: "salgados", titulo: "Escolha os salgados", maxEscolhas: 3, quantidade: "100 salgados", opcoes: ["Coxinha", "Kibe", "Esfiha", "Bolinha de queijo", "Mini pizza"] }
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
      { tipo: "bolo", titulo: "Escolha o sabor do bolo", maxEscolhas: 1, quantidade: "1 bolo de 5kg", opcoes: ["Chocolate", "Red Velvet", "Ninho", "Morango", "Prestígio", "Floresta Negra"] },
      { tipo: "doces", titulo: "Escolha os doces", maxEscolhas: 4, quantidade: "200 doces", opcoes: ["Brigadeiro", "Beijinho", "Camafeu", "Trufa", "Bombom de morango", "Pé de moça"] },
      { tipo: "salgados", titulo: "Escolha os salgados", maxEscolhas: 4, quantidade: "200 salgados", opcoes: ["Coxinha", "Kibe", "Esfiha", "Bolinha de queijo", "Mini pizza", "Empadinha"] },
      { tipo: "decoracao", titulo: "Escolha a decoração", maxEscolhas: 1, quantidade: "1 decoração", opcoes: ["Tema infantil", "Tema feminino", "Tema masculino", "Tema personalizado"] }
    ]
  }
];
