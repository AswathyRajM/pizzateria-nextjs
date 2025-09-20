// src/components/shared/Toast.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "../../store/toast";
import { AiFillCheckSquare ,AiFillCloseSquare ,AiOutlineInfo } from "react-icons/ai";

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 space-y-3 z-[1000]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-1 px-4 py-2 shadow-md text-white cursor-pointer border bg-gray-900 text-sm
              ${
                toast.type === "success"
                  ? "border-green-500"
                  : toast.type === "error"
                  ? "border-red-500"
                  : "border-yellow-500"
              }`}
            onClick={() => removeToast(toast.id)}
          >
            {toast.type === "success" ? (
              <AiFillCheckSquare className="text-green-500" />
            ) : toast.type === "error" ? (
              <AiFillCloseSquare className="text-red-500" />
            ) : (
              <AiOutlineInfo className="text-black bg-yellow-500" />
            )}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
