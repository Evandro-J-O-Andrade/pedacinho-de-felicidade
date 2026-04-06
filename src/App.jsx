import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Produtos from "./components/Produtos";
import KitFesta from "./components/KitFesta";
import Cardapio from "./components/Cardapio";
import Depoimentos from "./components/Depoimentos";
import Eventos from "./components/Eventos";
import Contato from "./components/Contato";
import Carrinho from "./components/Carrinho";
import Footer from "./components/Footer";
import MonteSeuKit from "./components/MonteSeuKit";
import WhatsApp from "./components/WhatsApp";
import ProdutosPage from "./components/ProdutosPage";

export default function App() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const isMonteSeuKitPage = pathname === "/monte-seu-kit" || pathname === "/monte-seu-kit/";
  const isProdutosPage = pathname === "/produtos" || pathname === "/produtos/";

  if (isMonteSeuKitPage) {
    return (
      <>
        <style>{`body { background-color: #fef2f5; margin: 0; }`}</style>
        <Navbar />
        <MonteSeuKit />
        <WhatsApp />
        <Carrinho />
        <Footer />
      </>
    );
  }

  if (isProdutosPage) {
    return (
      <>
        <style>{`body { background-color: #fef2f5; margin: 0; }`}</style>
        <Navbar />
        <ProdutosPage />
        <WhatsApp />
        <Carrinho />
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{`body { background-color: #fef2f5; margin: 0; }`}</style>
      <Navbar />
      <Hero />
      <Produtos />
      <KitFesta />
      <Cardapio />
      <Eventos />
      <Contato />
      <WhatsApp />
      <Carrinho />
      <Depoimentos />
      <Footer />
    </>
  );
}