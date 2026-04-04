import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cardapio from "./components/Cardapio";
import Eventos from "./components/Eventos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cardapio />
      <Eventos />
      <Contato />
      <Footer />
    </>
  );
}