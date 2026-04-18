import { useState, useEffect } from "react";

const FALLBACK_ABSOLUTO = "/img/produtos/default.svg";

const FALLBACK_POR_CATEGORIA = {
  'bolos': '/img/produtos/bolos/bolo-generico.svg',
  'doces': '/img/produtos/doces/doce-generico.svg',
  'salgados': '/img/produtos/salgados/salgado-generico.svg',
  'bebidas': '/img/produtos/bebidas/bebida-generica.svg',
  'complementos': '/img/produtos/complementos/complemento-generico.svg',
  'galeria': '/img/galeria/galeria-generico.svg',
  'eventos': '/img/eventos/evento-generico.svg',
  'depoimentos': '/img/depoimentos/depoimento-generico.svg',
};

function getFallbackCategoria(cat) {
  if (!cat) return FALLBACK_ABSOLUTO;
  const key = cat.toLowerCase().replace(/ /g, '').replace(/\s+/g, '');
  return FALLBACK_POR_CATEGORIA[key] || FALLBACK_ABSOLUTO;
}

export default function Image({ src, alt, categoria, ...props }) {
  const [fonteAtual, setFonteAtual] = useState(FALLBACK_ABSOLUTO);
  const [tentouLoad, setTentouLoad] = useState(false);

  useEffect(() => {
    const fallbackCat = getFallbackCategoria(categoria);
    
    if (src && src !== "undefined" && src !== "null" && src !== "") {
      setFonteAtual(src);
      setTentouLoad(true);
    } else if (categoria) {
      setFonteAtual(fallbackCat);
    } else {
      setFonteAtual(FALLBACK_ABSOLUTO);
    }
  }, [src, categoria]);

  const handleError = () => {
    const fallbackCat = getFallbackCategoria(categoria);
    setFonteAtual(fallbackCat);
  };

  return (
    <img
      src={fonteAtual}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}

export function resolverImagem(src) {
  if (!src || src === "undefined" || src === "null" || src === "") {
    return FALLBACK_ABSOLUTO;
  }
  return src;
}