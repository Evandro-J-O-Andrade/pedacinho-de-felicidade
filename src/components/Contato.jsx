export default function Contato() {
  const numero = "5511999999999";

  return (
    <section id="contato" className="p-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">Contato</h2>

      <p className="mb-4">
        Fale conosco pelo WhatsApp
      </p>

      <a
        href={`https://wa.me/${numero}`}
        className="btn btn-whatsapp"
      >
        WhatsApp
      </a>
    </section>
  );
}