"use client";

import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

type ModalProps = {
  openModal: boolean;
  children: React.ReactNode;
  heading: string;
  closeModal: () => void;
};

export default function Modal({
  children,
  heading,
}: ModalProps) {
  const { isModalOpen, setShowModal } = useCartStore((state) => state);

  const closeModal = ()=>{
     setShowModal(false)
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="Modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[998] flex items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <motion.div
            key="Modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={'bg-neutral-900 shadow-lg w-[90%] max-w-sm sm:w-[90%] md:w-[500px] lg:w-[600px] max-h-[90vh] overflow-hidden z-[998]'}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 py-4 px-6 text-xl">
              <h4 className="font-medium">{heading}</h4>
              <button
                className="cursor-pointer p-1 hover:text-red-500"
                onClick={closeModal}
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className=" py-4 px-6 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
