export interface Addon {
  addonId: string;
  name: string;
  price: number;
}

export interface Product {
  productId: string;
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
  cartId?: string;    
  productId: string;
  quantity: number;
  addons?: Addon[];
}
