import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0"><img src="https://images.pexels.com/photos/29222614/pexels-photo-29222614.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920" alt="Warm Saffron & Stones dining room" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-b from-[#0d0b08]/85 via-[#0d0b08]/55 to-[#0d0b08]" /></div>
      <div className="absolute inset-4 sm:inset-8 lg:inset-12 z-[1] border border-[#e0a82e]/20 pointer-events-none" />
      <div className="absolute left-4 sm:left-8 lg:left-12 top-1/2 h-24 w-1 -translate-y-1/2 bg-[#e0a82e] shadow-[0_0_30px_rgba(224,168,46,0.8)]" />
      <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 h-24 w-1 -translate-y-1/2 bg-[#e0a82e] shadow-[0_0_30px_rgba(224,168,46,0.8)]" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="animate-fade-up text-[#e0a82e] text-xs sm:text-sm uppercase tracking-[0.5em] mb-6">A Modern Indian Kitchen · Agra</p>
        <h1 className="animate-fade-up delay-1 text-5xl md:text-7xl font-serif text-[#f3e7d1] leading-[1.02] mb-7">
  Saffron <span className="text-[#e0a82e]">Spice ✨</span>
</h1>
        <p className="animate-fade-up-delay2 text-[#d9ccb0] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">Bold Indian flavors, tandoor-fired classics, and long-table evenings made for sharing.</p>
        <div className="animate-fade-up-delay3 flex flex-col sm:flex-row items-center justify-center gap-4"><a href="#reserve" className="px-8 py-3.5 bg-[#e0a82e] text-[#0d0b08] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#f0c248] transition-colors">Reserve a Table</a><a href="#menu" className="px-8 py-3.5 border border-[#d9ccb0]/40 text-[#d9ccb0] text-sm uppercase tracking-[0.2em] hover:border-[#e0a82e] hover:text-[#e0a82e] transition-all">View the Menu</a></div>
      </div>
      <a href="#story" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#d9ccb0] hover:text-[#e0a82e] transition-colors animate-bounce-slow" aria-label="Scroll down"><ChevronDown size={28} /></a>
    </section>
  );
}
