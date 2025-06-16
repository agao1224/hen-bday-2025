import { useEffect, useState } from "react";
import { useAPI } from "../hooks/APIContext";
import { useCart } from "../hooks/CartContext";
import type { Memory } from "../types/Memory";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface EventProps {
  storeName: string;
  tags: string[];
}

const Event = ({ storeName, tags }: EventProps) => {
  const { fetchByTags } = useAPI();
  const { memories: cartMemories, setMemories, deleteMemoryById } = useCart();

  const [filteredMemories, setFilteredMemories] = useState<Memory[]>([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const results = await fetchByTags(tags);
  
      const convertedResults = results.map((memory) => ({
        ...memory,
        tags: memory.tags.split(",").map(tag => tag.trim()),
      }));
  
      setFilteredMemories(convertedResults);
    };
  
    fetch();
  }, [tags, fetchByTags]);

  const isInCart = (id: number) =>
    cartMemories.find((memory) => memory.id === id) !== undefined;

  const handleToggle = (memory: Memory) => {
    if (isInCart(memory.id)) {
      deleteMemoryById(memory.id);
    } else {
      setMemories([...cartMemories, memory]);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="relative">
          <button className="absolute top-0 left-0"
            onClick={() => navigate("/")}
          >
          <IconContext.Provider value={{
            color: "#b18984"
          }}>
            <MdArrowBack size={36} />
          </IconContext.Provider>
        </button>
        <h1 className="sprinkle text-7xl sm:text-9xl text-[#7B4B3A] m-auto text-center">
          {storeName}
        </h1>
      </div>
      {filteredMemories.map((memory) => (
        <div key={memory.id} className="flex flex-col items-center border p-4 rounded-xl bg-white shadow-md relative">
          <img src={memory.image_url} alt={`memory ${memory.id}`} className="w-full max-w-xs rounded-lg" />
          <button
            onClick={() => handleToggle(memory)}
            className={`text-white rounded-lg hover:brightness-110 active:scale-95 transition-all absolute bottom-6 right-6 ${
              isInCart(memory.id) ? 'bg-[#b18984] px-1 py-0.5' : ''
            }`}
          >
            <IconContext.Provider
              value={{
                color: isInCart(memory.id)
                  ? "white"
                  : isMobile
                  ? "white"
                  : "#7B4B3A",
                size: "2em",
              }}
            >
              {isInCart(memory.id) ? (
                <span>Remove from Cart</span>
              ) : (
                <IoIosAddCircleOutline />
              )}
            </IconContext.Provider>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Event;