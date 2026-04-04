import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function Footer() {
  const numero = "5511999999999";

  return (
    <footer className="bg-primary text-white p-10">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">
          Pedacinho de Felicidade
        </h2>

        <a
          href={`https://wa.me/${numero}`}
          className="flex items-center gap-2 text-green-400 hover:text-green-500"
        >
          <FaWhatsapp /> WhatsApp
        </a>

        <div className="flex gap-6 text-3xl">
          <a href="#" className="hover:text-secondary">
            <FaInstagram />
          </a>

          <a href="#" className="hover:text-secondary">
            <FaFacebook />
          </a>

          <a href="#" className="hover:text-secondary">
            <FaYoutube />
          </a>

          <a href="#" className="hover:text-secondary">
            <FaTiktok />
          </a>

          <a href="#" className="hover:text-secondary">
            <FiX />
          </a>
        </div>
      </div>

      <div className="border-t border-white/20 mt-8 pt-4 text-center text-gray-200">
        © {new Date().getFullYear()} Pedacinho de Felicidade - Todos os direitos reservados
      </div>
    </footer>
  );
}
