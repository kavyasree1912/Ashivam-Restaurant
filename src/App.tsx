import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedDishes from '@/components/FeaturedDishes';
import About from '@/components/About';
import MenuSection from '@/components/MenuSection';
import Gallery from '@/components/Gallery';
import Events from '@/components/Events';
import Testimonials from '@/components/Testimonials';
import Reservation from '@/components/Reservation';
import AdminDashboard from '@/components/AdminDashboard';
import Footer from '@/components/Footer';
import AIConcierge from '@/components/AIConcierge';

function App() {
  const isDashboardView = window.location.pathname === '/dashboard' || window.location.pathname === '/admin';

  if (isDashboardView) {
    return <div className="min-h-screen bg-[#0d0b08]"><a href="/" className="fixed top-5 left-6 z-[70] text-xs uppercase tracking-[0.16em] text-[#d9ccb0] hover:text-[#e0a82e]">Back to website</a><AdminDashboard /></div>;
  }

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#5c4b35]">
      <Navbar />
      <main>
        <Hero />
        <FeaturedDishes />
        <Stats />
        <About />
        <MenuSection />
        <Gallery />
        <Events />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
      <AIConcierge />
    </div>
  );
}

export default App;
