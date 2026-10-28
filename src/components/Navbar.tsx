import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#fffaf0]/95 backdrop-blur-md border-b border-[#e7dac3] py-3' : 'bg-transparent py-5'}`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group"><img src="/images/company_logo.jpeg" alt="Ashivam Technologies" className="h-11 w-28 rounded bg-white object-contain px-1 transition-transform duration-500 group-hover:scale-105" /><span className="hidden sm:block leading-tight"><span className="block font-serif text-lg tracking-wide text-[#2f261a]">Saffron <span className="text-[#e0a82e]">&amp;</span> Stones</span><span className="block text-[9px] uppercase tracking-[0.25em] text-[#7c6a50]">Fire · Spice · Stone</span></span></a>
        <ul className="hidden lg:flex items-center gap-8">{links.map((link) => <li key={link.href}><a href={link.href} className="text-xs uppercase tracking-[0.16em] text-[#5c4b35] hover:text-[#e0a82e] transition-colors">{link.label}</a></li>)}</ul>
        <a href="#reserve" className="hidden lg:inline-flex px-5 py-2.5 bg-[#e0a82e] text-[#2f261a] text-xs uppercase tracking-[0.18em] hover:bg-[#f0c248] transition-colors">Reserve Table</a>
        <button className="lg:hidden text-[#2f261a]" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X size={26} /> : <Menu size={26} />}</button>
      </nav>
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-96 mt-4' : 'max-h-0'}`}><ul className="px-6 pb-6 flex flex-col gap-4 bg-[#fffaf0]/95 backdrop-blur-md">{links.map((link) => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className="block text-sm uppercase tracking-[0.16em] text-[#5c4b35] hover:text-[#e0a82e] py-1">{link.label}</a></li>)}<li><a href="#reserve" onClick={() => setOpen(false)} className="inline-flex px-5 py-2.5 border border-[#e0a82e]/60 text-[#e0a82e] text-sm uppercase tracking-[0.16em]">Reserve Table</a></li></ul></div>
    </header>
  );
}
