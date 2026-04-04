export default function Hero() {
  return (
    <section
      className="h-screen flex items-center"
      style={{
        backgroundImage: "url('/img/banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl ml-10 max-w-xl shadow-lg">

        <h1 className="text-5xl font-bold mb-4">
          Pedacinho de Felicidade
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Sua festa a um passo de ser conto de fadas ✨
        </p>

        <a
          href="#cardapio"
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
        >
          Ver Cardápio
        </a>
      </div>
    </section>
  );
}
