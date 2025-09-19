export interface Addon {
  id: string;
  name?: string;
  price?: number;
}

export interface Product {
  id: string;
  img: string;
  alt: string;
  name: string;
  desc: string;
  originalPrice: string;
  price: string;
  offer: string;
  addons: Addon[];
}

export interface CartItem {
  id: string;
  quantity: number;
  addons?: string[];
}
