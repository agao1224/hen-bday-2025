import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { useCart } from "../hooks/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Album = () => {
  const { memories, setMemories } = useCart();
  const [layouts, setLayouts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { supabase } = useAuth();

  useEffect(() => {
    const initialLayouts = memories.map((memory, index) => ({
      i: memory.id.toString(),
      x: (index * 2) % 12,
      y: Infinity,
      w: 2,
      h: 2,
    }));
    setLayouts(initialLayouts);
  }, [memories]);

  useEffect(() => {
    alert("Drag pictures around, and press & hold the bottom right of pictures to resize them!");
  }, []);

  const handleResizeStop = (_layout: any, _oldItem: any, newItem: any) => {
    setLayouts((prev) =>
      prev.map((item) => (item.i === newItem.i ? newItem : item))
    );
  };

  const handleOrderAgain = () => {
    const confirm = window.confirm("Are you sure you want to place another order? Your current cart will be emptied!");
    if (confirm) {
      setMemories([]);
      navigate("/");
    }
  };

  const handleShare = async () => {
    const album_name = prompt("Enter an album name (alphanumeric only, no spaces or special characters):");
    if (!album_name || /[^a-zA-Z0-9]/.test(album_name)) {
      alert("Invalid album name. Use alphanumeric characters only.");
      return;
    }

    const image_ids = memories.map((m) => m.id).join(",");

    const { error } = await supabase.from("albums").insert([
      {
        layout: layouts,
        album_name,
        image_ids,
      },
    ]);

    if (error) {
      console.error("Error uploading album:", error);
      alert("Failed to share album.");
    } else {
      navigate(`/albums/${album_name}`);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <p className="sprinkle text-5xl sm:text-7xl text-[#7B4B3A] mb-6 text-center">
        My memories
      </p>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layouts }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onResizeStop={handleResizeStop}
        isResizable
        isDraggable
      >
        {memories.map((memory) => (
          <div
            key={memory.id.toString()}
            className="overflow-hidden rounded-xl heart-bg shadow-md flex items-center justify-center"
          >
            <img
              src={memory.image_url}
              alt={`Memory ${memory.id}`}
              className="object-contain w-full h-full"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <button
          className="bg-[#b18984] text-white sprinkle rounded-2xl text-2xl sm:text-3xl py-3 px-6 hover:-translate-y-2 transition duration-100 shadow-xl"
          onClick={handleShare}
        >
          Share!
        </button>
        <button
          className="bg-[#b18984] text-white sprinkle rounded-2xl text-2xl sm:text-3xl py-3 px-6 hover:-translate-y-2 transition duration-100 shadow-xl"
          onClick={handleOrderAgain}
        >
          Order Again
        </button>
      </div>
    </div>
  );
};

export default Album;