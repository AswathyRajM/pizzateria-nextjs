// src/store/toast.ts
"use client";

import { create } from "zustand";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, type = "info") => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000); // auto-remove after 3s
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
