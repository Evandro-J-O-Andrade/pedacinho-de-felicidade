import { Routes, Route } from "react-router-dom";
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
import BannerSazonal from "./components/BannerSazonal";
import ProdutosPage from "./components/ProdutosPage";
import CarrinhoPage from "./components/CarrinhoPage";
import SazonalPage from "./components/SazonalPage";
import ToastCarrinho from "./components/ToastCarrinho";
import ToastLimparCarrinho from "./components/ToastLimparCarrinho";

export default function App() {
  return (
    <>
      <style>{`body { background-color: #fef2f5; margin: 0; }`}</style>
      <Navbar />
      <ToastCarrinho />
      <ToastLimparCarrinho />
      <Routes>
        <Route path="/" element={
          <>
            <BannerSazonal />
            <Hero />
            <Produtos />
            <KitFesta />
            <Cardapio />
            <Eventos />
            <Contato />
            <WhatsApp />
            <Carrinho />
            <Depoimentos />
          </>
        } />
        <Route path="/monte-seu-kit" element={
          <>
            <MonteSeuKit />
            <WhatsApp />
            <Carrinho />
          </>
        } />
        <Route path="/produtos" element={
          <>
            <ProdutosPage />
            <WhatsApp />
            <Carrinho />
          </>
        } />
        <Route path="/carrinho" element={
          <>
            <CarrinhoPage />
            <WhatsApp />
          </>
        } />
        <Route path="/sazonal" element={
          <>
            <SazonalPage />
            <WhatsApp />
            <Carrinho />
          </>
        } />
      </Routes>
      <Footer />
    </>
  );
}
