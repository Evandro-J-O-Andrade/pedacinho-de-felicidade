export default function Depoimentos() {
  return (
    <section className="py-20 text-center bg-white">
      <h2 className="text-4xl font-bold mb-10 text-primary">
        O que nossos clientes dizem 💬
      </h2>

      <div className="max-w-4xl mx-auto space-y-6 px-6">

        <div className="bg-[#fff7f9] p-6 rounded-2xl shadow">
          <p className="text-lg text-gray-700 mb-3">"Melhor bolo que já pedi! Minha festa ficou perfeita!"</p>
          <strong className="text-primary">- Cliente Satisfeita</strong>
        </div>

        <div className="bg-[#fff7f9] p-6 rounded-2xl shadow">
          <p className="text-lg text-gray-700 mb-3">"Doces maravilhosos e atendimento incrível!"</p>
          <strong className="text-primary">- Maria Silva</strong>
        </div>

        <div className="bg-[#fff7f9] p-6 rounded-2xl shadow">
          <p className="text-lg text-gray-700 mb-3">"Entrega no prazo e tudo fresquinho. Super recomendo!"</p>
          <strong className="text-primary">- João Santos</strong>
        </div>

      </div>
    </section>
  );
}