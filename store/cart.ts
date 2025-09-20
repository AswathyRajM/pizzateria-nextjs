import { create } from "zustand";
import { CartItem } from "./types";

interface CartState {
  cart: CartItem[];
  shouldShowCart: boolean;
  setShowCart: (value: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCart: () => CartItem[];
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  shouldShowCart: false,

  setShowCart: (value) => set({ shouldShowCart: value }),

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((product) => product.productId === item.productId);

      if (existing) {
        return {
          cart: state.cart.map((product) =>
            product.productId === item.productId    
              ? { ...product, quantity: product.quantity + item.quantity }
              : product
          ),
        };
      }

      return { cart: [...state.cart, item] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.productId !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  getCart: () => get().cart,
}));
