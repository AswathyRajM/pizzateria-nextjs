import { create } from "zustand";
import {
  AddToCartType,
  CartIdAndCountType,
  CartItemType,
} from "../utils/types";
import { fetchCartItems } from "@/actions/cart";

interface CartState {
  cart: CartItemType[];
  cartCount: number;
  cartId: string | null;
  shouldShowCart: boolean;
  isModalOpen: boolean;
  initialized: boolean; // to track if cart was loaded
  setShowCart: (value: boolean) => void;
  addToCart: (item: AddToCartType) => void;
  removeFromCart: (item: AddToCartType) => void;
  clearCart: () => void;
  setCart: (cart: CartItemType[]) => void;
  setShowModal: (value: boolean) => void;
  setCartCount: (cart: CartIdAndCountType) => void;
  refreshCart: () => void;
  decreaseCartCount: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  shouldShowCart: false,
  initialized: false,
  cartCount: 0,
  cartId: null,
  isModalOpen: false,
  setCartCount: (cart) =>
    set({ cartCount: cart.cartCount, cartId: cart.cartId }),

  setShowCart: (value) => {
    set({ shouldShowCart: value, isModalOpen: false });
  },
  setShowModal: (value) => {
    set({ isModalOpen: value, shouldShowCart: false });
  },

  setCart: (cart) => set({ cart }),

  addToCart: (item) => {},

  removeFromCart: (item) => {},

  refreshCart: async () => {
    const state = get();
    const newCart: any = await fetchCartItems(state.cartId!);
    if (newCart) {
      set({ cart: newCart, cartCount: newCart.length });
    }
  },

  decreaseCartCount: () => {
    set((state) => ({ cartCount: state.cartCount - 1 }));
  },

  clearCart: () => set({ cart: [] }),
}));
