export const FRETE_GRATIS_MINIMO = 500;

export const fretes = [
  { bairro: "Centro", valor: 5 },
  { bairro: "Vila Nova", valor: 7 },
  { bairro: "Jardim América", valor: 7 },
  { bairro: "Zona Centro", valor: 5 },
  { bairro: "Zona Oeste", valor: 8 },
  { bairro: "Zona Norte", valor: 8 },
  { bairro: "Zona Sul", valor: 10 },
  { bairro: "Zona Leste", valor: 10 }
];

// fallback por estado (UF) quando não houver match de bairro/zona
export const fretesUf = {
  SP: 30,
  RJ: 30,
  RS: 50,
  SC: 50,
  PR: 50,
  default: 70
};
