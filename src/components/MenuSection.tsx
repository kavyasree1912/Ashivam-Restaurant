import { Flame, Leaf, Drumstick, ArrowUpRight } from 'lucide-react';
import { menuCategories, type DietType } from '@/data/menu';

const itemImages: Record<string, string> = {
  'Chilli Paneer': 'https://images.pexels.com/photos/29631468/pexels-photo-29631468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Punjabi Samosa (2 pc)': 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Paneer Tikka Shaslik': 'https://images.pexels.com/photos/19081131/pexels-photo-19081131.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Hara Bhara Kebab': 'https://images.pexels.com/photos/29631461/pexels-photo-29631461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Tandoori Mushroom': 'https://images.pexels.com/photos/30203314/pexels-photo-30203314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Amritsari Paneer Pakora': 'https://images.pexels.com/photos/8585763/pexels-photo-8585763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Murgh Malai Tikka': 'https://images.pexels.com/photos/16423838/pexels-photo-16423838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Tandoori Chicken (Half)': 'https://images.pexels.com/photos/29699526/pexels-photo-29699526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Seekh Kebab': 'https://images.pexels.com/photos/37198642/pexels-photo-37198642.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Chicken Tikka': 'https://images.pexels.com/photos/9646858/pexels-photo-9646858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Fish Amritsari': 'https://images.pexels.com/photos/24206909/pexels-photo-24206909.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Tandoori Prawns': 'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Paneer Butter Masala': 'https://images.pexels.com/photos/29685056/pexels-photo-29685056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Dal Tadka': 'https://images.pexels.com/photos/30203314/pexels-photo-30203314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Kadai Paneer': 'https://images.pexels.com/photos/29684993/pexels-photo-29684993.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Dal Makhani': 'https://images.pexels.com/photos/20446382/pexels-photo-20446382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Aloo Gobi': 'https://images.pexels.com/photos/7593267/pexels-photo-7593267.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Butter Chicken': 'https://images.pexels.com/photos/29685054/pexels-photo-29685054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Mutton Rogan Josh': 'https://images.pexels.com/photos/28674565/pexels-photo-28674565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Chicken Tikka Masala': 'https://images.pexels.com/photos/29684985/pexels-photo-29684985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Kadai Chicken': 'https://images.pexels.com/photos/29684989/pexels-photo-29684989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Lamb Vindaloo': 'https://images.pexels.com/photos/29685045/pexels-photo-29685045.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Mango Lassi': 'https://images.pexels.com/photos/15823268/pexels-photo-15823268.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Sweet / Salted Lassi': 'https://images.pexels.com/photos/11857929/pexels-photo-11857929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Masala Chai': 'https://images.pexels.com/photos/2633403/pexels-photo-2633403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Fresh Orange Mint Cooler': 'https://images.pexels.com/photos/6416553/pexels-photo-6416553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Rose Falooda': 'https://images.pexels.com/photos/5041474/pexels-photo-5041474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Malai Kulfi': 'https://images.pexels.com/photos/29699512/pexels-photo-29699512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Gulab Jamun (2 pc)': 'https://images.pexels.com/photos/9951856/pexels-photo-9951856.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Saffron Pistachio Ice Cream': 'https://images.pexels.com/photos/31815432/pexels-photo-31815432.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Gajar Ka Halwa': 'https://images.pexels.com/photos/28438607/pexels-photo-28438607.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Chocolate Ice Cream Sundae': 'https://images.pexels.com/photos/35546720/pexels-photo-35546720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};
function DietBadge({ diet }: { diet: DietType }) {
  const isVeg = diet !== 'non-veg';
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 shrink-0 border ${
        isVeg ? 'border-green-500' : 'border-red-500'
      }`}
      title={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
    </span>
  );
}

export default function MenuSection() {
  return (
    <section id="menu" className="relative bg-[#13100b] py-20 sm:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#e0a82e] text-xs uppercase tracking-[0.4em] mb-4">The Saffron Table</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#f3ead7] mb-4">Our Menu</h2>
          <p className="text-[#8e8268] max-w-2xl mx-auto leading-relaxed">
            Classic Indian comfort and tandoor-fired favorites, made fresh to order.
            All prices are in Indian rupees.
          </p>
        </div>

        <nav className="sticky top-[72px] z-20 -mx-6 px-6 py-3 mb-16 bg-[#13100b]/95 backdrop-blur-md border-y border-[#2a241c] overflow-x-auto">
          <div className="flex justify-center gap-2 min-w-max">
            {menuCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 rounded-full border border-[#2a241c] text-[#b7ac94] text-xs uppercase tracking-[0.12em] hover:border-[#e0a82e] hover:text-[#e0a82e] transition-colors"
              >
                {category.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-20">
          {menuCategories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-36">
              <div className="flex items-end justify-between gap-5 border-b border-[#e0a82e]/40 pb-4 mb-7">
                <div>
                  <p className="text-[#e0a82e] text-[10px] uppercase tracking-[0.35em] mb-2">
                    {category.items.length} selections
                  </p>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f3ead7]">{category.label}</h3>
                  <p className="text-[#8e8268] italic font-serif text-lg mt-1">{category.blurb}</p>
                </div>
                <a
                  href="#menu"
                  className="hidden sm:flex items-center gap-1 text-[#9a8a6c] text-xs uppercase tracking-[0.12em] hover:text-[#e0a82e] transition-colors"
                >
                  Back to menu <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.items.map((item, index) => (
                  <article
                    key={item.name}
                    className="group bg-[#0d0b08] border border-[#2a241c] overflow-hidden hover:border-[#e0a82e]/60 hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 45}ms` }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={itemImages[item.name] ?? category.image}
                        alt={`${item.name} from ${category.label}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="bg-[#0d0b08]/90 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[#d9ccb0]">
                          {item.diet === 'non-veg' ? 'Non-Veg' : 'Veg'}
                        </span>
                        <DietBadge diet={item.diet} />
                      </div>
                      {item.spicy && <Flame className="absolute top-3 right-3 text-red-400" size={17} />}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-serif text-xl text-[#f3ead7] group-hover:text-[#e0a82e] transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-serif text-xl text-[#e0a82e] whitespace-nowrap">₹{item.price}</span>
                      </div>
                      <p className="text-sm text-[#8e8268] leading-relaxed min-h-10">{item.description}</p>
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[9px] uppercase tracking-[0.15em] px-2 py-1 border border-[#e0a82e]/40 text-[#e0a82e]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 text-xs text-[#8e8268]">
          <span className="flex items-center gap-2"><Leaf size={14} className="text-green-500" /> Vegetarian</span>
          <span className="flex items-center gap-2"><Drumstick size={14} className="text-red-500" /> Non-vegetarian</span>
          <span className="flex items-center gap-2"><Flame size={14} className="text-red-400" /> Spicy</span>
        </div>
      </div>
    </section>
  );
}
