import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Memory } from "../types/Memory";

type CartContextType = {
  memories: Memory[];
  setMemories: (memories: Memory[]) => void;
  getMemoryById: (id: number) => Memory | undefined;
  getMemoriesByTag: (tag: string) => Memory[];
  getAllMemories: () => Memory[];

  deleteMemoryById: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  const getMemoryById = (id: number) => memories.find((m) => m.id === id);

  const getMemoriesByTag = (tag: string) =>
    memories.filter((m) => m.tags.includes(tag));

  const getAllMemories = () => memories;

  const deleteMemoryById = (id: number) => {
    setMemories((prev) => prev.filter((memory) => memory.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        memories,
        setMemories,
        getMemoryById,
        getMemoriesByTag,
        getAllMemories,
        deleteMemoryById
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};