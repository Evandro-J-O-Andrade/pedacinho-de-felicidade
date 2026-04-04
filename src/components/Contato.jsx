export default function Contato() {
  const numero = "5511999999999";

  return (
    <section id="contato" className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4 text-primary">Contato</h2>

      <p className="mb-4 text-gray-600">
        Fale conosco pelo WhatsApp
      </p>

      <a
        href={`https://wa.me/${numero}`}
        className="bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 inline-block"
      >
        WhatsApp
      </a>
    </section>
  );
}