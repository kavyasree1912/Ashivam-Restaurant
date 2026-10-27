import { UtensilsCrossed, ChefHat, Award, Users } from 'lucide-react';

const stats = [
  { icon: UtensilsCrossed, value: '60+', label: 'Dishes on the Menu' },
  { icon: ChefHat, value: '14', label: 'Years of Craft' },
  { icon: Award, value: '4.9', label: 'Average Guest Rating' },
  { icon: Users, value: '50k+', label: 'Happy Guests Served' },
];

export default function Stats() {
  return <section className="bg-[#13100b] border-y border-[#2a241c] py-14 px-6"><div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">{stats.map((stat) => <div key={stat.label} className="text-center group"><stat.icon className="text-[#e0a82e] mx-auto mb-3 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} /><div className="font-serif text-4xl sm:text-5xl text-[#f3ead7] leading-none mb-2">{stat.value}</div><div className="text-xs uppercase tracking-[0.18em] text-[#8e8268]">{stat.label}</div></div>)}</div></section>;
}
