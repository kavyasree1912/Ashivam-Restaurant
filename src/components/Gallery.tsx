import { galleryImages } from '@/data/gallery';

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#0d0b08] py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#e0a82e] text-xs uppercase tracking-[0.4em] mb-4">A Look Inside</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#f3ead7]">Gallery</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[220px] sm:auto-rows-[260px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group cursor-pointer ${
                img.span === 'wide'
                  ? 'sm:col-span-2'
                  : img.span === 'tall'
                  ? 'row-span-2'
                  : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0d0b08]/0 group-hover:bg-[#0d0b08]/40 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
