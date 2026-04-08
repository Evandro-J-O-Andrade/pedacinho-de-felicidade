import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { fretes, fretesUf } from "../data/fretes";

const CarrinhoContext = createContext();
const FRETE_GRATIS_MINIMO = 500;

function getStorageCarrinho() {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("carrinho");
  return saved ? JSON.parse(saved) : [];
}

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(getStorageCarrinho);
  const [aberto, setAberto] = useState(false);

  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");

  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [enderecoValido, setEnderecoValido] = useState(false);

  const [ultimoItemAdicionado, setUltimoItemAdicionado] = useState(null);
  const [timestampAdicao, setTimestampAdicao] = useState(0);

  const normalize = (str) =>
    (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  async function buscarCep(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, "").slice(0, 8);

    setCep(cepLimpo);

    if (cepLimpo.length !== 8) {
      setEnderecoValido(false);
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setEnderecoValido(false);
        setValorFrete(0);
        return;
      }

      const bairroApi = normalize(data.bairro);

      setBairro(data.bairro || "");
      setRua(data.logradouro || "");
      setCidade(data.localidade || "");
      setEnderecoValido(true);

      const fretesNormalizados = fretes.map((f) => ({
        ...f,
        chave: normalize(f.bairro)
      }));

      let encontrado = fretesNormalizados.find(
        (f) => bairroApi.includes(f.chave) || f.chave.includes(bairroApi)
      );

      if (!encontrado) {
        const zonas = ["leste", "oeste", "norte", "sul", "centro"];
        const zona = zonas.find((z) => bairroApi.includes(z));
        if (zona) {
          encontrado = fretesNormalizados.find((f) =>
            f.chave.includes(zona)
          );
        }
      }

      let valor = 0;

      if (encontrado) {
        valor = encontrado.valor;
      } else {
        const uf = (data.uf || "").toUpperCase();
        valor = fretesUf[uf] ?? fretesUf.default ?? 0;
      }

      setValorFrete(valor);
    } catch {
      setEnderecoValido(false);
      setValorFrete(0);
    }
  }

  function adicionar(produto) {
    const timestamp = Date.now();
    setTimestampAdicao(timestamp);
    setUltimoItemAdicionado(produto.nome);

    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem || "/img/produtos/bolo.png",
          descricao: produto.descricao || "",
          quantidade: 1
        }
      ];
    });
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

  const freightAplicado = useMemo(
    () => (totalValor >= FRETE_GRATIS_MINIMO ? 0 : Number(valorFrete)),
    [totalValor, valorFrete]
  );

  const totalComFrete = useMemo(
    () => Number(totalValor) + freightAplicado,
    [totalValor, freightAplicado]
  );

  const freightGratis = totalValor >= FRETE_GRATIS_MINIMO;

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function pedidoValido() {
    return (
      carrinho.length > 0 &&
      nomeCliente.trim() !== "" &&
      cep.length === 8 &&
      enderecoValido
    );
  }

  function gerarMensagemWhatsApp() {
    const itens = carrinho.map(
      (i) =>
        `• ${i.nome} (x${i.quantidade}) - R$ ${(i.preco * i.quantidade).toFixed(2)}`
    );

    const textoFrete = freightGratis
      ? "Grátis"
      : `R$ ${freightAplicado.toFixed(2)}`;

    return encodeURIComponent(
`🍰 *NOVO PEDIDO - SITE*

👤 *Cliente:* ${nomeCliente}
📞 *Telefone:* ${telefoneCliente}

🛍️ *Itens:*
${itens.join("\n")}

📦 *Entrega:*
${rua}
${bairro} - ${cidade}
CEP: ${cep}

🚚 *Frete:* ${textoFrete}

💰 *Total:* R$ ${totalComFrete.toFixed(2)}
`
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

        nomeCliente,
        setNomeCliente,
        telefoneCliente,
        setTelefoneCliente,

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
        freightAplicado,
        freightGratis,
        FRETE_GRATIS_MINIMO,
        enderecoValido,

        totalItens,
        totalValor,
        totalComFrete,

        gerarMensagemWhatsApp,
        pedidoValido,

        ultimoItemAdicionado,
        setUltimoItemAdicionado,
        timestampAdicao
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);