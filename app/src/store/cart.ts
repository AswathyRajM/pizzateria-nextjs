import { create } from "zustand";
import { CartItem } from "./types";

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
   getCart: () => CartItem[];
}

export const useCartStore = create<CartState>((set,get) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((p) => p.id === item.id);

      if (existing) {
        return {
          cart: state.cart.map((p) =>
            p.id === item.id
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          ),
        };
      }

      return { cart: [...state.cart, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  getCart: () => get().cart,
}));
