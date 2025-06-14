import { useCart } from "../hooks/CartContext";

import MemoryCard from "../components/MemoryCard";

const Cart = () => {
  const { memories } = useCart();

  return (
    <div className="relative min-h-screen"> {/* Add padding bottom to prevent content being hidden */}
      <h4 className="sprinkle text-5xl text-[#7B4B3A] mr-auto font-extrabold">Your cart</h4>
      <div className="flex flex-col gap-2">
        {memories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)}
      </div>

      <button
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#b18984] text-white sprinkle rounded-2xl text-3xl py-3 px-6
          hover:-translate-y-2 hover:cursor-pointer transition duration-100 shadow-xl z-50"
      >
        Checkout!
      </button>
    </div>
  );
};

export default Cart;