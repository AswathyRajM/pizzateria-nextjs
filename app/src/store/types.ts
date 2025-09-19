export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: number;
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
  id: number;
  quantity: number;
  addons?: Addon[];
}
