export type DietType = 'veg' | 'non-veg' | 'vegan';

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  diet: DietType;
  tags?: string[];
  spicy?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  blurb: string;
  image: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'veg-starters',
    label: 'Veg Starters',
    blurb: 'Tandoor-fired vegetables and crisp bites to begin.',
    image:
      'https://images.pexels.com/photos/29631468/pexels-photo-29631468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        name: 'Chilli Paneer',
        description: 'Charred paneer, bell peppers, soy-chilli glaze, spring onion.',
        price: '340',
        diet: 'veg',
        tags: ['Bestseller'],
        spicy: true,
      },
      {
        name: 'Punjabi Samosa (2 pc)',
        description: 'Flaky pastry, spiced potato & pea, tamarind mint chutney.',
        price: '220',
        diet: 'veg',
      },
      {
        name: 'Paneer Tikka Shaslik',
        description: 'Yogurt-marinated paneer, charred capsicum, onion, mint chutney.',
        price: '360',
        diet: 'veg',
        tags: ['Tandoor'],
      },
      {
        name: 'Hara Bhara Kebab',
        description: 'Spinach, green pea & potato patties, cashew crumble.',
        price: '280',
        diet: 'veg',
      },
      {
        name: 'Tandoori Mushroom',
        description: 'Button mushrooms in smoky yogurt marinade, chaat masala.',
        price: '300',
        diet: 'veg',
        spicy: true,
      },
      {
        name: 'Amritsari Paneer Pakora',
        description: 'Crisp gram-flour paneer fritters, ajwain, mint chutney.',
        price: '290',
        diet: 'veg',
      },
    ],
  },
  {
    id: 'non-veg-starters',
    label: 'Non-Veg Starters',
    blurb: 'Coal-charred kebabs and tandoori classics from the open flame.',
    image:
      'https://images.pexels.com/photos/9646858/pexels-photo-9646858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        name: 'Murgh Malai Tikka',
        description: 'Cream cheese & cardamom marinated chicken, charcoal finish.',
        price: '420',
        diet: 'non-veg',
        tags: ['Signature'],
      },
      {
        name: 'Tandoori Chicken (Half)',
        description: 'Yogurt & red-chili marinade, smoked in the tandoor, mint chutney.',
        price: '460',
        diet: 'non-veg',
        tags: ['Tandoor'],
        spicy: true,
      },
      {
        name: 'Seekh Kebab',
        description: 'Minced lamb skewers, ginger, green chili, grilled over coal.',
        price: '440',
        diet: 'non-veg',
        spicy: true,
      },
      {
        name: 'Chicken Tikka',
        description: 'Six pieces, char-grilled, lemon, onion, coriander chutney.',
        price: '380',
        diet: 'non-veg',
        tags: ['Bestseller'],
      },
      {
        name: 'Fish Amritsari',
        description: 'Batter-fried river fish, carom, lemon, tart pickle.',
        price: '480',
        diet: 'non-veg',
        spicy: true,
      },
      {
        name: 'Tandoori Prawns',
        description: 'Charred prawns, saffron yogurt, lemon, coriander.',
        price: '560',
        diet: 'non-veg',
        tags: ['Chef Pick'],
      }
    ],
  },
  {
    id: 'veg-curries',
    label: 'Veg Curries',
    blurb: 'Slow-simmered, spice-layered, built for bread and rice.',
    image:
      'https://images.pexels.com/photos/29685056/pexels-photo-29685056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        name: 'Paneer Butter Masala',
        description: 'Tomato-cream gravy, fenugreek, cashew, fresh paneer.',
        price: '440',
        diet: 'veg',
        tags: ['Signature'],
      },
      {
        name: 'Dal Tadka',
        description: 'Yellow lentils, tempered cumin, garlic, dried red chili, ghee.',
        price: '340',
        diet: 'veg',
        tags: ['Bestseller'],
      },
      {
        name: 'Kadai Paneer',
        description: 'Paneer & pepper in a roasted kadai spice paste.',
        price: '440',
        diet: 'veg',
        spicy: true,
      },
      {
        name: 'Dal Makhani',
        description: 'Black lentils slow-cooked overnight, butter, cream.',
        price: '380',
        diet: 'veg',
      },
      {
        name: 'Aloo Gobi',
        description: 'Cauliflower & potato, turmeric, ginger, fresh coriander.',
        price: '360',
        diet: 'veg',
      },
    ],
  },
  {
    id: 'non-veg-curries',
    label: 'Non-Veg Curries',
    blurb: 'Rich, deep, and built for a long evening with naan.',
    image:
      'https://images.pexels.com/photos/28674565/pexels-photo-28674565.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        name: 'Butter Chicken',
        description: 'Tandoor chicken in tomato-cream gravy, fenugreek, butter finish.',
        price: '520',
        diet: 'non-veg',
        tags: ['Signature', 'Bestseller'],
      },
      {
        name: 'Mutton Rogan Josh',
        description: 'Kashmiri slow-braised lamb, whole spices, saffron oil.',
        price: '620',
        diet: 'non-veg',
        tags: ['Slow-Cooked'],
        spicy: true,
      },
      {
        name: 'Chicken Tikka Masala',
        description: 'Char-grilled tikka in a smoky onion-tomato masala.',
        price: '500',
        diet: 'non-veg',
        tags: ['Bestseller'],
      },
      {
        name: 'Kadai Chicken',
        description: 'Chicken & pepper in a fiery roasted-spice kadai gravy.',
        price: '500',
        diet: 'non-veg',
        spicy: true,
      },
      {
        name: 'Lamb Vindaloo',
        description: 'Goan-style lamb, vinegar, chili, garlic — the hot one.',
        price: '580',
        diet: 'non-veg',
        tags: ['Extra Hot'],
        spicy: true,
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    blurb: 'Cooling, refreshing, and made to balance the heat.',
    image:
      'https://images.pexels.com/photos/6416553/pexels-photo-6416553.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        name: 'Mango Lassi',
        description: 'Yogurt, Alphonso mango, a pinch of cardamom.',
        price: '180',
        diet: 'veg',
        tags: ['Bestseller'],
      },
      {
        name: 'Sweet / Salted Lassi',
        description: 'Hand-churned yogurt drink, your choice of style.',
        price: '120',
        diet: 'veg',
      },
      {
        name: 'Masala Chai',
        description: 'Black tea, milk, ginger, cardamom, clove.',
        price: '100',
        diet: 'veg',
      },
      {
        name: 'Fresh Orange Mint Cooler',
        description: 'Cold-pressed orange, mint, a touch of black salt.',
        price: '150',
        diet: 'vegan',
      },
      {
        name: 'Rose Falooda',
        description: 'Rose syrup, basil seeds, vermicelli, vanilla ice cream.',
        price: '200',
        diet: 'veg',
        tags: ['Signature'],
      },
    ],
  },
  {
    id: 'ice-creams',
    label: 'Ice Creams & Desserts',
    blurb: 'A cool, sweet close — hand-churned and house-made.',
    image:
      'https://images.pexels.com/photos/29699512/pexels-photo-29699512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    items: [
      {
        name: 'Malai Kulfi',
        description: 'Slow-reduced milk kulfi, pistachio, saffron thread.',
        price: '220',
        diet: 'veg',
        tags: ['Signature'],
      },
      {
        name: 'Gulab Jamun (2 pc)',
        description: 'Warm milk dumplings, cardamom rose syrup.',
        price: '200',
        diet: 'veg',
        tags: ['Bestseller'],
      },
      {
        name: 'Saffron Pistachio Ice Cream',
        description: 'House-churned, Kashmiri saffron, roasted pistachio.',
        price: '220',
        diet: 'veg',
      },
      {
        name: 'Gajar Ka Halwa',
        description: 'Slow-cooked carrot halwa, ghee, khoya, almond.',
        price: '200',
        diet: 'veg',
      },
      {
        name: 'Chocolate Ice Cream Sundae',
        description: 'Dark chocolate, raspberry, crisp pastry, dark plate.',
        price: '240',
        diet: 'veg',
      },
    ],
  },
];
