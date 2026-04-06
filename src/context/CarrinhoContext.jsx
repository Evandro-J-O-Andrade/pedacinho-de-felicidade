import { createContext, useContext, useState, useMemo } from "react";
import { fretes, fretesUf } from "../data/fretes";

const CarrinhoContext = createContext();
const FRETE_GRATIS_MINIMO = 500;

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [aberto, setAberto] = useState(false);

  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [enderecoValido, setEnderecoValido] = useState(false);

  const normalize = (str) =>
    (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  async function buscarCep(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, "").slice(0, 8);
    setCep(cepLimpo);

    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setValorFrete(0);
        setBairro("");
        setCidade("");
        return;
      }

      const bairroApi = normalize(data.bairro);

      setBairro(data.bairro || "");
      setRua(data.logradouro || "");
      setCidade(data.localidade || "");

      const fretesNormalizados = fretes.map((f) => ({
        ...f,
        chave: normalize(f.bairro)
      }));

      let encontrado = fretesNormalizados.find(
        (f) => bairroApi.includes(f.chave) || f.chave.includes(bairroApi)
      );

      // fallback: detect palavras-chave de zona no nome do bairro
      if (!encontrado) {
        if (bairroApi.includes("leste")) {
          encontrado = fretesNormalizados.find((f) => f.chave.includes("leste"));
        } else if (bairroApi.includes("oeste")) {
          encontrado = fretesNormalizados.find((f) => f.chave.includes("oeste"));
        } else if (bairroApi.includes("norte")) {
          encontrado = fretesNormalizados.find((f) => f.chave.includes("norte"));
        } else if (bairroApi.includes("sul")) {
          encontrado = fretesNormalizados.find((f) => f.chave.includes("sul"));
        } else if (bairroApi.includes("centro")) {
          encontrado = fretesNormalizados.find((f) => f.chave.includes("centro"));
        }
      }

      let valor = 0;

      if (encontrado) {
        valor = encontrado.valor;
      } else {
        const uf = (data.uf || "").toUpperCase();
        if (uf && fretesUf[uf] !== undefined) {
          valor = fretesUf[uf];
        } else if (fretesUf.default !== undefined) {
          valor = fretesUf.default;
        }
      }

      setValorFrete(valor);
    } catch {
      setValorFrete(0);
      setRua("");
    }
  }

  function adicionar(produto) {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...prev, { ...produto, quantidade: 1 }];
    });

    setAberto(true);
  }

  function diminuir(id) {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function remover(id) {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  }

  function limpar() {
    setCarrinho([]);
  }

  const totalItens = useMemo(
    () => carrinho.reduce((acc, i) => acc + i.quantidade, 0),
    [carrinho]
  );

  const totalValor = useMemo(
    () => carrinho.reduce((acc, i) => acc + i.preco * i.quantidade, 0),
    [carrinho]
  );

  const freteAplicado = useMemo(
    () => (totalValor >= FRETE_GRATIS_MINIMO ? 0 : Number(valorFrete)),
    [totalValor, valorFrete]
  );

  const totalComFrete = useMemo(
    () => Number(totalValor) + freteAplicado,
    [totalValor, freteAplicado]
  );

  const freteGratis = totalValor >= FRETE_GRATIS_MINIMO;

  function gerarMensagemWhatsApp() {
    const itens = carrinho.map(
      (i) =>
        `• ${i.nome} (x${i.quantidade}) - R$ ${
          i.preco * i.quantidade
        }`
    );

    const textoFrete = freteGratis
      ? `Frete: R$ 0,00 (grátis a partir de R$ ${FRETE_GRATIS_MINIMO})`
      : `Frete: R$ ${freteAplicado.toFixed(2)}`;

    return encodeURIComponent(
      `Pedido:\n\n${itens.join(
        "\n"
      )}\n\nRua: ${rua}\nCEP: ${cep}\nBairro: ${bairro}\nCidade: ${cidade}\n${textoFrete}\nTotal: R$ ${totalComFrete.toFixed(
        2
      )}`
    );
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionar,
        diminuir,
        remover,
        limpar,

        aberto,
        setAberto,

        cep,
        setCep,
        bairro,
        setBairro,
        cidade,
        setCidade,
        valorFrete,
        buscarCep,
        fretes,
        rua,
        freteAplicado,
        freteGratis,
        FRETE_GRATIS_MINIMO,

        totalItens,
        totalValor,
        totalComFrete,

        gerarMensagemWhatsApp
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);
