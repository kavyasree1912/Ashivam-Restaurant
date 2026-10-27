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
  return (
    <div className="min-h-screen bg-[#0d0b08] text-[#d9ccb0]">
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
        <AdminDashboard />
      </main>
      <Footer />
      <AIConcierge />
    </div>
  );
}

export default App;
