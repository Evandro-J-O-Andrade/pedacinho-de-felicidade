import { createContext, useContext, useState, useMemo } from "react";
import { fretes } from "../data/fretes";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [aberto, setAberto] = useState(false);

  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [enderecoValido, setEnderecoValido] = useState(false);

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

      const bairroApi = data.bairro?.toLowerCase() || "";

      setBairro(data.bairro || "");
      setCidade(data.localidade || "");

      const encontrado = fretes.find((f) =>
        bairroApi.includes(f.bairro.toLowerCase())
      );

      setValorFrete(encontrado ? encontrado.valor : 0);
    } catch {
      setValorFrete(0);
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

  const totalComFrete = useMemo(() => {
    return Number(totalValor) + Number(valorFrete);
  }, [totalValor, valorFrete]);

  function gerarMensagemWhatsApp() {
    const itens = carrinho.map(
      (i) =>
        `• ${i.nome} (x${i.quantidade}) - R$ ${
          i.preco * i.quantidade
        }`
    );

    return encodeURIComponent(
      `Pedido:\n\n${itens.join("\n")}\n\nCEP: ${cep}\nBairro: ${bairro}\nCidade: ${cidade}\nFrete: R$ ${valorFrete}\nTotal: R$ ${totalComFrete}`
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