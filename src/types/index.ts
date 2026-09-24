export type Category = 
  | 'T-Shirts'
  | 'Shirts'
  | 'Trousers'
  | 'Outerwear'
  | 'Knitwear'
  | 'Dresses'
  | 'Tops'
  | 'Sets';

export type Gender = 'men' | 'women' | 'unisex';

export type CollectionSlug = 'essentials' | 'after-dark' | 'everyday-form' | 'the-summer-edit';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  gender: Gender;
  price: number;
  compareAtPrice?: number;
  description: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  unavailableSizes?: string[];
  material: string;
  fit: string;
  care: string;
  featured: boolean;
  newArrival: boolean;
  collection: CollectionSlug;
  details: string[];
  badge?: string;
}

export interface CartItem {
  id: string; // unique item cart identifier (e.g. `${productId}-${size}-${color}`)
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  gender: Gender;
}

export interface CollectionInfo {
  id: string;
  slug: CollectionSlug;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  season: string;
}
