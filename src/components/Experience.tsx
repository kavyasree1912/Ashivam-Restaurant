import { Clock, Users, Flame } from 'lucide-react';

const experiences = [
  {
    icon: Flame,
    title: 'The Chef\'s Fire Table',
    text: 'Six seats beside the open flame. A multi-course tasting, plated in front of you, with optional wine pairings.',
    detail: 'Tues–Sat · 2 seatings nightly',
  },
  {
    icon: Users,
    title: 'The Stone Room',
    text: 'A private dining space for 8–16 guests. Custom set menu, dedicated server, and a welcome cocktail on arrival.',
    detail: 'Book 14 days ahead',
  },
  {
    icon: Clock,
    title: 'Saffron Hour',
    text: 'Late-afternoon bar menu: small plates, discounted pours, and a rotating spritz built around tonight\'s spice.',
    detail: 'Daily 4–6pm',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-24 px-6">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/38539264/pexels-photo-38539264.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
          alt="Chef creating flames"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d0b08]/88" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#e0a82e] text-xs uppercase tracking-[0.4em] mb-4">Beyond the Menu</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#f3ead7]">The Experience</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((e) => (
            <div
              key={e.title}
              className="group bg-[#13100b]/80 backdrop-blur-sm border border-[#2a241c] p-8 hover:border-[#e0a82e]/50 transition-all duration-500 hover:-translate-y-1"
            >
              <e.icon className="text-[#e0a82e] mb-5" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-2xl text-[#f3ead7] mb-3">{e.title}</h3>
              <p className="text-[#9a8a6c] text-sm leading-relaxed mb-5">{e.text}</p>
              <p className="text-[#e0a82e] text-xs uppercase tracking-[0.18em] border-t border-[#2a241c] pt-4">
                {e.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
