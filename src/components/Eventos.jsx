export default function Eventos() {
  const numero = "5511999999999";

  return (
    <section id="eventos" className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-6">Eventos</h2>

      <p className="mb-6">
        Organizamos sua festa completa com decoração, doces e muito mais.
      </p>

      <a
        href={`https://wa.me/${numero}?text=Quero orçamento para evento`}
        className="btn btn-whatsapp"
      >
        Solicitar Orçamento
      </a>
    </section>
  );
}