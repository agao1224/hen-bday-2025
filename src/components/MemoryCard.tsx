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
    <div className="bg-[#e8bdc7] rounded-2xl flex flex-row mx-3 p-2 relative">
      <div className="w-[75%] overflow-hidden rounded-2xl mr-auto">
        <img src={memory.image_url} className="w-full h-full object-cover" />
      </div>
      <button
        onClick={() => {
          deleteMemoryById(memory.id);
        }}
        className="absolute bottom-4 right-4"
      >
        <IconContext.Provider
          value={{ color: "#FFFFFF"}}
        >
          <FaTrashCan size={24} />
        </IconContext.Provider>
      </button>
    </div>
  )
}

export default MemoryCard;