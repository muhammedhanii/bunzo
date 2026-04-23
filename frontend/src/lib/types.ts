export type Category = "signature" | "classic" | "vegan" | "sides" | "drinks";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  rating: number;
  image: string;
  featured?: boolean;
}
