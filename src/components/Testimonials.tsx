import { Quote, Star } from 'lucide-react';

const reviews = [
  { name: 'Ananya Rao', role: 'Dined in · Saturday', text: 'The butter chicken, warm naan, and the service were all outstanding. Saffron & Stones is now our favorite dinner spot in Agra.' },
  { name: 'Vikram Singh', role: 'Family celebration', text: 'The private hall was beautiful and the staff handled every detail perfectly. The food arrived hot, fragrant, and generous.' },
  { name: 'Meera Kapoor', role: 'Regular guest', text: 'From the chilli paneer to the saffron kulfi, every dish feels thoughtful. It is the kind of restaurant where you want to linger.' },
];

export default function Testimonials() {
  return <section className="bg-[#0d0b08] py-20 sm:py-24 px-6"><div className="max-w-6xl mx-auto"><div className="text-center mb-14"><p className="text-[#e0a82e] text-xs uppercase tracking-[0.4em] mb-4">Guest Words</p><h2 className="font-serif text-4xl sm:text-5xl text-[#f3ead7]">What People Say</h2></div><div className="grid md:grid-cols-3 gap-6">{reviews.map((review) => <figure key={review.name} className="bg-[#13100b] border border-[#2a241c] p-8 flex flex-col hover:border-[#e0a82e]/40 transition-colors"><Quote className="text-[#e0a82e]/50 mb-5" size={32} strokeWidth={1.5} /><blockquote className="text-[#c8bda3] leading-relaxed text-sm flex-1 mb-6">“{review.text}”</blockquote><div className="flex gap-1 mb-3">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} className="text-[#e0a82e] fill-[#e0a82e]" />)}</div><figcaption className="mt-auto"><span className="block font-serif text-lg text-[#f3ead7]">{review.name}</span><span className="block text-xs text-[#8e8268] mt-1">{review.role}</span></figcaption></figure>)}</div></div></section>;
}
