export interface AddonType {
  addon_id: string;
  name: string;
  price: number;
}

export interface ProductType {
  product_id: string;
  image_url: string;
  name: string;
  description: string;
  original_price: number;
  price: number;
  offer: string | null;
  addons?: AddonType[]; // optional relation mapping
}

export interface CartItemType {
  cart_item_id?: string;
  cart_id?: string;
  product: ProductType;
  quantity: number;
  addons?: AddonType[] | null; // stored as jsonb in DB
  created_at?: string;
}

export interface AddToCartType {
  product_id?: string;
  quantity: number;
  addons?: AddonType[] | null; // stored as jsonb in DB
}

export interface UserType {
  user_id: string;
  name?: string;
  email?: string;
  role: string;
  cart_count: number;
}

export interface CartIdAndCountType {
  cartId: string | null;
  cartCount: number;
}
