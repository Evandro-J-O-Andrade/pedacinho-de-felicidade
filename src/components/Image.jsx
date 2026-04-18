import { useState, useEffect } from "react";

const FALLBACK_ABSOLUTO = "/img/produtos/default.svg";

export default function Image({ src, alt, categoria, ...props }) {
  const [fonteAtual, setFonteAtual] = useState(FALLBACK_ABSOLUTO);
  const [tentouLoad, setTentouLoad] = useState(false);

  useEffect(() => {
    if (src && src !== "undefined" && src !== "null" && src !== "") {
      setFonteAtual(src);
      setTentouLoad(true);
    } else {
      setFonteAtual(FALLBACK_ABSOLUTO);
    }
  }, [src]);

  const handleError = () => {
    setFonteAtual(FALLBACK_ABSOLUTO);
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