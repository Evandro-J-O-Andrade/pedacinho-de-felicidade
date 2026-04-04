export default function Galeria() {
  return (
    <section className="py-20 bg-[#fff7f9] text-center">
      <h2 className="text-4xl font-bold mb-10 text-primary">
        Momentos Especiais ✨
      </h2>

      <div className="grid md:grid-cols-4 gap-4 px-6 max-w-6xl mx-auto">
        <img src="/img/Gemini_Generated_Image_l4ap8ql4ap8ql4ap.png" alt="Festa 1" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition-transform" />
        <img src="/img/Gemini_Generated_Image_f8hzg2f8hzg2f8hz.png" alt="Festa 2" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition-transform" />
        <img src="/img/Gemini_Generated_Image_1oyb7b1oyb7b1oyb.png" alt="Festa 3" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition-transform" />
        <img src="/img/Gemini_Generated_Image_9l2i459l2i459l2i.png" alt="Festa 4" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition-transform" />
      </div>
    </section>
  );
}