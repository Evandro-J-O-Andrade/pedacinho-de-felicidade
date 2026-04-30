import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import { fretes, fretesUf, FRETE_GRATIS_MINIMO } from "../data/fretes";
import { getImagemProduto, IMAGEM_FALLBACK } from "../utils/imagemUtils";

const CarrinhoContext = createContext();

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
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [enderecoValido, setEnderecoValido] = useState(false);

  const [ultimoItemAdicionado, setUltimoItemAdicionado] = useState(null);
  const [timestampAdicao, setTimestampAdicao] = useState(0);
  const [mensagemToast, setMensagemToast] = useState(null);
  const [timestampToast, setTimestampToast] = useState(0);

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
    const descricaoCompleta = produto.itens?.length
      ? `${produto.descricao || ""}${produto.descricao ? "\n" : ""}Inclui: ${produto.itens.join(", ")}`
      : produto.descricao || "";

    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
                descricao: descricaoCompleta || item.descricao,
                itens: produto.itens || item.itens || []
              }
            : item
        );
      }

      return [
        ...prev,
        {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: getImagemProduto(produto) || IMAGEM_FALLBACK,
          descricao: descricaoCompleta,
          itens: produto.itens || [],
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
    const totalItenslimpados = carrinho.reduce((acc, i) => acc + i.quantidade, 0);
    setCarrinho([]);
    if (totalItenslimpados > 0) {
      setMensagemToast("Carrinho limpo com sucesso! 💜");
      setTimestampToast(Date.now());
    }
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

const gerarMensagemWhatsApp = useCallback(() => {
    const saudacao = () => {
      const hora = new Date().getHours();
      if (hora < 12) return "Bom dia";
      if (hora < 18) return "Boa tarde";
      return "Boa noite";
    };

    const itens = carrinho.map((i, index) => {
      const descricao = i.descricao ? `\n   ✨ ${i.descricao}` : "";

      return `${index + 1}. ${i.quantidade}x ${i.nome}
   💰 R$ ${(i.preco * i.quantidade).toFixed(2).replace(".", ",")}${descricao}`;
    });

    const textoFrete = freightGratis
      ? "🚚 *FRETE GRÁTIS* 🎉"
      : `🚚 Frete: R$ ${freightAplicado.toFixed(2).replace(".", ",")}`;

    const enderecoCompleto = numero
      ? `${rua}, ${numero}${complemento ? ` - ${complemento}` : ""}, ${bairro}`
      : `${rua}, ${bairro}`;

    const mensagem =
`🍰 *PEDIDO - PEDACINHOS DE FELICIDADE* 💜

${saudacao()} ${nomeCliente} 💜

👤 *Cliente:* ${nomeCliente}
📱 *WhatsApp:* ${telefoneCliente}

🛒 *Olha só o que você escolheu:* 😍
${itens.join("\n\n")}

📍 *Endereço de entrega:*
${enderecoCompleto}
${cidade} - CEP: ${cep}

${textoFrete}

💵 *Total do seu pedido:* R$ ${totalComFrete.toFixed(2).replace(".", ",")}

💳 *Formas de pagamento disponíveis:*
• Pix com chave, link ou QR Code enviado pelo WhatsApp
• Transferência bancária
• Cartão de débito
• Cartão de crédito
• Dinheiro em espécie na entrega ou retirada

📌 _A forma de pagamento pode ser combinada por aqui. Se escolher Pix ou cartão, enviamos os dados/link com segurança pelo WhatsApp._

💖 _Seu pedido foi recebido com muito carinho!_
👩‍🍳 _Já vamos começar a preparar tudo fresquinho pra você._

✨ _Se quiser ajustar algo ou tiver algum detalhe especial, é só me falar aqui!_

🙏 _Obrigada pela preferência e confiança!_ 💕`;

    return mensagem;
  }, [carrinho, nomeCliente, telefoneCliente, rua, numero, complemento, bairro, cidade, cep, freightGratis, freightAplicado, totalComFrete]);

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
        numero,
        setNumero,
        complemento,
        setComplemento,
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
        timestampAdicao,
        mensagemToast,
        timestampToast
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);
