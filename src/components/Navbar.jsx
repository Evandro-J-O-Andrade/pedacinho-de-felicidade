import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const numero = "5511999999999";

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO + NOME */}
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="logo" className="w-10 h-10 object-contain" />
          
          <div>
            <h1 className="text-lg font-semibold tracking-wide">
              Pedacinho de Felicidade
            </h1>
            <p className="text-xs text-gray-500">
              sua festa a um passo de ser conto de fadas
            </p>
          </div>
        </div>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li><a href="#home" className="hover:text-pink-500">Home</a></li>
          <li><a href="#cardapio" className="hover:text-pink-500">Cardápio</a></li>
          <li><a href="#eventos" className="hover:text-pink-500">Eventos</a></li>
          <li><a href="#contato" className="hover:text-pink-500">Contato</a></li>
        </ul>

        {/* BOTÃO */}
        <a
          href={`https://wa.me/${numero}`}
          className="hidden md:block bg-pink-500 text-white px-5 py-2 rounded-full text-sm hover:bg-pink-600 transition"
        >
          WhatsApp
        </a>

        {/* MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm">
          <a href="#home">Home</a>
          <a href="#cardapio">Cardápio</a>
          <a href="#eventos">Eventos</a>
          <a href="#contato">Contato</a>
        </div>
      )}
    </nav>
  );
}
