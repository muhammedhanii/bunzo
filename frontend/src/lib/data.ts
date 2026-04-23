import type { Product } from "@/lib/types";

export const categories = ["all", "signature", "classic", "vegan", "sides", "drinks"] as const;

export const products: Product[] = [
  {
    id: 1,
    name: "Neon Truffle Stack",
    description: "Double wagyu, truffle aioli, smoked cheddar, crispy shallots.",
    price: 18.9,
    category: "signature",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "Blue Flame Classic",
    description: "Angus patty, brioche bun, house pickles, midnight sauce.",
    price: 14.5,
    category: "classic",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 3,
    name: "Volt Veg Supreme",
    description: "Plant-based patty, avocado cream, crunchy lettuce, neon slaw.",
    price: 15.2,
    category: "vegan",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Plasma Fries",
    description: "Triple-cooked fries with roasted garlic glow dust.",
    price: 6.4,
    category: "sides",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Crimson Fizz",
    description: "House berry soda with citrus ice pearls.",
    price: 4.9,
    category: "drinks",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Midnight Melt",
    description: "Black garlic beef, molten jack, caramelized onion jam.",
    price: 16.8,
    category: "signature",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1200&q=80",
  },
];
