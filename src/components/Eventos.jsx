export default function Eventos() {
  const numero = "5511999999999";

  return (
    <section id="eventos" className="py-20 px-6 text-center bg-[#fff7f9]">
      <h2 className="text-3xl font-bold mb-6 text-primary">Eventos</h2>

      <p className="mb-6 max-w-2xl mx-auto text-gray-600">
        Organizamos sua festa completa com decoração, doces e muito mais.
      </p>

      <a
        href={`https://wa.me/${numero}?text=Quero orçamento para evento`}
        className="bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 inline-block"
      >
        Solicitar Orçamento
      </a>
    </section>
  );
}