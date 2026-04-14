import { eventosSazonais } from "../data/sazonais";

function parseData(dataStr) {
  const [ano, mes, dia] = dataStr.split("-");
  return new Date(ano, mes - 1, dia, 0, 0, 0);
}

const nomesSazonais = {
  pascoa: "Páscoa",
  natal: "Natal",
  diadospais: "Dia dos Pais",
  diasmaes: "Dia das Mães",
  namorados: "Dia dos Namorados",
  professor: "Dia do Professor",
  mulheres: "Dia das Mulheres",
  junina: "Festa Junina",
  anonovo: "Ano Novo",
  carnival: "Carnaval",
  blackfriday: "Black Friday"
};

export function getNomeSazonal(id) {
  return nomesSazonais[id] || id;
}

export function getEventoAtivo() {
  const hoje = new Date();

  return eventosSazonais.find(evento => {
    if (!evento.ativo) return false;

    const inicio = new Date(evento.inicio);
    const fim = new Date(evento.fim);

    return hoje >= inicio && hoje <= fim;
  });
}

export function getTodosEventosAtivos() {
  const hoje = new Date();

  return eventosSazonais.filter(evento => {
    if (!evento.ativo) return false;

    const inicio = new Date(evento.inicio);
    const fim = new Date(evento.fim);

    return hoje >= inicio && hoje <= fim;
  });
}

export function getEventoDestaque() {
  const hoje = new Date();

  return eventosSazonais.find(evento => {
    if (!evento.ativo) return false;

    const destaque = new Date(evento.destaqueInicio);
    const inicio = new Date(evento.inicio);
    const fim = new Date(evento.fim);

    const diasOK = hoje >= destaque && hoje <= fim;

    return diasOK;
  });
}

export function getTodosEventos() {
  return eventosSazonais.filter(evento => evento.ativo);
}

export function getProximoEvento() {
  const hoje = new Date();
  
  const eventosOrdenados = [...eventosSazonais]
    .filter(e => e.ativo)
    .sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
  
  for (const evento of eventosOrdenados) {
    const inicio = new Date(evento.inicio);
    if (inicio > hoje) {
      return evento;
    }
  }
  
  return null;
}

export function getDiasAteEvento(evento) {
  if (!evento) return null;
  const hoje = new Date();
  const inicio = new Date(evento.inicio);
  const diffTime = inicio - hoje;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}