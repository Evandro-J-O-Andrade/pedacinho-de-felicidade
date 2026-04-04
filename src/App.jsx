import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeProdutos from "./components/HomeProdutos";
import MonteSeuKit from "./components/MonteSeuKit";
import KitFesta from "./components/KitFesta";
import Cardapio from "./components/Cardapio";
import Carrinho from "./components/Carrinho";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeProdutos />
      <MonteSeuKit />
      <KitFesta />
      <Cardapio />
      <Carrinho />
      <Footer />
    </>
  );
}