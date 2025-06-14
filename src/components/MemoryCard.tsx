import { IconContext } from "react-icons/lib";
import type { Memory } from "../types/Memory";
import { useCart } from "../hooks/CartContext";

import { FaTrashCan } from "react-icons/fa6";

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard = ({ memory }: MemoryCardProps) => {
  const { deleteMemoryById } = useCart();
  return (
    <div className="bg-[#e8bdc7] rounded-2xl flex flex-row mx-3 p-2">
      <div className="h-20 w-30 overflow-hidden rounded-2xl mr-auto">
        <img src={memory.image} className="w-full h-full object-cover" />
      </div>
      <button
        onClick={() => {
          deleteMemoryById(memory.id);
        }}
      >
        <IconContext.Provider
          value={{ color: "#e8bdc7"}}
        >
          <FaTrashCan size={24} />
        </IconContext.Provider>
      </button>
    </div>
  )
}

export default MemoryCard;