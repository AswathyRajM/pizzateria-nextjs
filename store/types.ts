export interface Addon {
  addon_id: string;
  name: string;
  price: number;
}

export interface Product {
  product_id: string;
  image_url: string;
  name: string;
  description: string;
  original_price: number;
  price: number;
  offer: string | null;
  addons?: Addon[]; // optional relation mapping
}

export interface CartItem {
  cart_item_id?: string;
  cart_id?: string;
  product_id: string;
  quantity: number;
  addons?: Addon[] | null; // stored as jsonb in DB
  created_at?: string;
}
