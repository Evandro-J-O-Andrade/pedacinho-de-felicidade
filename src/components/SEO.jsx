import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { produtos } from "../data/produtos";

const SITE_URL = "https://pedacinhosdefelicidade.netlify.app";
const BRAND = "Pedacinhos de Felicidade";
const PHONE = "+5511971914833";
const WHATSAPP = "https://wa.me/5511971914833";
const DEFAULT_IMAGE = `${SITE_URL}/img/logo.png`;

const serviceRegions = [
  "Poá",
  "São Paulo",
  "Zona Leste de São Paulo",
  "Suzano",
  "Ferraz de Vasconcelos",
  "Itaquaquecetuba",
  "Mogi das Cruzes",
  "Alto Tietê",
  "região de Poá"
];

const coreKeywords = [
  "confeitaria artesanal em Poá",
  "confeitaria artesanal em São Paulo",
  "bolos por encomenda em Poá",
  "bolo de aniversário em Poá",
  "bolo de aniversário Zona Leste",
  "doces gourmet para festa",
  "brigadeiro gourmet por cento",
  "beijinho tradicional para festa",
  "salgados para festa em Poá",
  "coxinha para festa",
  "kit festa pronto",
  "personalize seu kit festa",
  "doces e salgados para aniversário",
  "bolo caseiro sob encomenda",
  "delivery de doces e bolos",
  "confeiteira artesanal Esmeralda",
  "Pedacinhos de Felicidade"
];

const pageData = {
  "/": {
    title: `${BRAND} | Bolos, Doces e Salgados Artesanais em Poá e Região`,
    description:
      "Confeitaria artesanal com bolos, doces gourmet, salgados e kits festa sob encomenda. Atendimento humano em Poá, Zona Leste de São Paulo e região.",
    image: `${SITE_URL}/img/banner.png`,
    keywords: ["confeitaria em Poá", "bolo delivery Poá", "kit festa Poá"]
  },
  "/produtos": {
    title: `Produtos | Bolos, Doces Gourmet e Salgados para Festa | ${BRAND}`,
    description:
      "Veja bolos, doces, salgados, bebidas e complementos para festas. Produtos artesanais sob encomenda para Poá, São Paulo e região.",
    image: `${SITE_URL}/img/produtos/bannerprodutos/bannerprodutos.png`,
    keywords: ["cardápio de bolos", "doces por cento", "salgados por cento"]
  },
  "/monte-seu-kit": {
    title: `Personalize Seu Kit Festa | ${BRAND}`,
    description:
      "Monte seu kit festa personalizado com bolo, doces, salgados e complementos. Ideal para aniversários, eventos e comemorações.",
    image: `${SITE_URL}/img/monteseukit/bannermonteseukit.png`,
    keywords: ["personalizar kit festa", "monte seu kit festa", "kit aniversário personalizado"]
  },
  "/sazonal": {
    title: `Delícias de Temporada | Páscoa, Natal e Datas Especiais | ${BRAND}`,
    description:
      "Produtos sazonais artesanais para Páscoa, Natal, Dia das Mães, Dia dos Namorados, Festa Junina e outras datas especiais.",
    image: `${SITE_URL}/img/sazonal/banner-sazonal/bannersazonal.png`,
    keywords: ["ovos de páscoa gourmet", "panetone trufado", "doces de temporada"]
  },
  "/eventos-especiais": {
    title: `Eventos Especiais | Doces, Bolos e Salgados para Comemorações | ${BRAND}`,
    description:
      "Encomendas artesanais para eventos especiais, aniversários, festas familiares e comemorações com atendimento próximo e cuidadoso.",
    image: `${SITE_URL}/img/eventos-especiais/banners/bannereventosespeciais.png`,
    keywords: ["doces para eventos", "bolo para evento", "salgados para comemoração"]
  },
  "/sobre-nos": {
    title: `Doces Personalizados e Bolos Sob Encomenda em Poá SP | ${BRAND}`,
    description:
      "Conheça a Pedacinhos de Felicidade: doces personalizados, bolos sob encomenda e kits para festas em Poá SP e região leste de São Paulo.",
    image: DEFAULT_IMAGE,
    keywords: ["doces personalizados em Poá SP", "bolos sob encomenda em Poá", "kits para festas em Poá", "confeitaria artesanal Poá"]
  },
  "/carrinho": {
    title: `Carrinho e Encomenda | ${BRAND}`,
    description:
      "Finalize sua encomenda de bolos, doces, salgados e kits festa com atendimento pelo WhatsApp.",
    image: `${SITE_URL}/img/carrinhopagina/bannercarrinho.png`,
    keywords: ["encomendar bolo", "pedido pelo whatsapp", "finalizar kit festa"]
  }
};

function getPage(pathname) {
  return pageData[pathname] || pageData["/"];
}

function setMeta(selector, attrs) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
}

function setLink(rel, href, extra = {}) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
  Object.entries(extra).forEach(([key, value]) => element.setAttribute(key, value));
}

function setJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function productJsonLd() {
  return produtos
    .flatMap((categoria) =>
      categoria.itens.slice(0, 8).map((item) => ({
        "@type": "Product",
        name: item.nome,
        description: `${item.descricao}. Produto artesanal da categoria ${categoria.categoria}.`,
        image: item.imagem?.startsWith("http") ? item.imagem : `${SITE_URL}${item.imagem}`,
        brand: { "@type": "Brand", name: BRAND },
        category: categoria.categoria,
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: String(item.preco),
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/produtos`
        }
      }))
    )
    .slice(0, 32);
}

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Bakery", "LocalBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: BRAND,
    alternateName: "Pedacinhos de Felicidade Confeitaria Artesanal",
    description:
      "Confeitaria artesanal especializada em bolos sob encomenda, doces gourmet, salgados para festa, kit festa pronto e kit festa personalizado.",
    url: SITE_URL,
    telephone: PHONE,
    priceRange: "R$",
    image: DEFAULT_IMAGE,
    logo: DEFAULT_IMAGE,
    founder: {
      "@type": "Person",
      name: "Esmeralda",
      jobTitle: "Confeiteira artesanal"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Poá",
      addressRegion: "SP",
      addressCountry: "BR"
    },
    areaServed: serviceRegions.map((name) => ({ "@type": "City", name })),
    servesCuisine: ["Confeitaria brasileira", "Bolos artesanais", "Doces gourmet", "Salgados para festa"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bolos por encomenda" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Doces gourmet para festas" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Salgados para festa" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kit festa pronto" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kit festa personalizado" } }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "Atendimento ao cliente",
      availableLanguage: "pt-BR",
      url: WHATSAPP
    },
    sameAs: ["https://instagram.com/PEDACINHOS_DE_FELICIDADE70"],
    potentialAction: {
      "@type": "OrderAction",
      target: WHATSAPP,
      name: "Fazer encomenda pelo WhatsApp"
    }
  };
}

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND,
    url: SITE_URL,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#localbusiness` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/produtos?busca={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

function breadcrumbJsonLd(pathname) {
  const labels = {
    "/": "Início",
    "/produtos": "Produtos",
    "/monte-seu-kit": "Personalize Seu Kit",
    "/sazonal": "Temporada",
    "/eventos-especiais": "Eventos Especiais",
    "/sobre-nos": "Sobre Nós",
    "/carrinho": "Carrinho"
  };

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: `${SITE_URL}/`
      },
      ...(pathname === "/"
        ? []
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: labels[pathname] || "Página",
              item: `${SITE_URL}${pathname}`
            }
          ])
    ]
  };
}

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Vocês fazem bolos por encomenda?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Trabalhamos com bolos artesanais sob encomenda para aniversários, festas, eventos e comemorações familiares."
        }
      },
      {
        "@type": "Question",
        name: "Vocês vendem doces e salgados para festa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Temos doces gourmet, brigadeiros, beijinhos, trufas e salgados como coxinha, kibe, esfiha, mini pizza e bolinha de queijo."
        }
      },
      {
        "@type": "Question",
        name: "Quais regiões vocês atendem?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Atendemos Poá e região, com possibilidade de entrega para cidades próximas e regiões de São Paulo conforme disponibilidade e frete."
        }
      },
      {
        "@type": "Question",
        name: "Como faço uma encomenda?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Você pode escolher produtos no site, montar um kit personalizado ou chamar a Pedacinhos de Felicidade diretamente pelo WhatsApp."
        }
      }
    ]
  };
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getPage(pathname);
    const url = `${SITE_URL}${pathname}`;
    const keywords = [...coreKeywords, ...serviceRegions, ...page.keywords].join(", ");

    document.documentElement.lang = "pt-BR";
    document.title = page.title;

    setMeta('meta[name="description"]', { name: "description", content: page.description });
    setMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    setMeta('meta[name="author"]', { name: "author", content: "Esmeralda - Pedacinhos de Felicidade" });
    setMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" });
    setMeta('meta[name="geo.region"]', { name: "geo.region", content: "BR-SP" });
    setMeta('meta[name="geo.placename"]', { name: "geo.placename", content: "Poá, São Paulo" });
    setMeta('meta[name="theme-color"]', { name: "theme-color", content: "#ec4899" });

    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: BRAND });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "pt_BR" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="og:image"]', { property: "og:image", content: page.image });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: `${BRAND} - ${page.title}` });

    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: page.image });

    setLink("canonical", url);
    setLink("alternate", url, { hreflang: "pt-BR" });

    setJsonLd("seo-local-business", localBusinessJsonLd());
    setJsonLd("seo-website", websiteJsonLd());
    setJsonLd("seo-breadcrumbs", breadcrumbJsonLd(pathname));
    setJsonLd("seo-products", {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Produtos artesanais Pedacinhos de Felicidade",
      itemListElement: productJsonLd().map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item
      }))
    });
    setJsonLd("seo-faq", faqJsonLd());
  }, [pathname]);

  return null;
}
