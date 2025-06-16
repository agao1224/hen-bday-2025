import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WidthProvider, Responsive } from "react-grid-layout";
import { useAuth } from "../hooks/AuthContext";
import { useAPI } from "../hooks/APIContext";
import type { Memory } from "../types/Memory";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const SharedAlbum = () => {
  const { album_name } = useParams();
  const { supabase } = useAuth();
  const { fetchByIds } = useAPI();

  const [memories, setMemories] = useState<Memory[]>([]);
  const [layouts, setLayouts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!album_name) return;

      const { data, error } = await supabase
        .from("albums")
        .select("layout, image_ids")
        .eq("album_name", album_name)
        .single();

      if (error || !data) {
        console.error("Error fetching album:", error);
        return;
      }

      try {
        const imageIds = data.image_ids
          .split(",")
          .map((id: string) => parseInt(id.trim()))
          .filter((id: number) => !isNaN(id));

          const memoryResults = await fetchByIds(imageIds);

          const convertedResults = memoryResults.map((memory) => ({
            ...memory,
            tags: memory.tags.split(",").map((tag) => tag.trim()),
          }));
          
          setMemories(convertedResults);
          setLayouts(data.layout);
      } catch (e) {
        console.error("Failed to process album data:", e);
      }
    };

    fetchAlbum();
  }, [album_name, supabase, fetchByIds]);

  return (
    <div className="p-4 min-h-screen">
      <p className="sprinkle text-5xl sm:text-7xl text-[#7B4B3A] mb-6 text-center">
        {album_name}
      </p>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layouts }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        isResizable={false}
        isDraggable={false}
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
    </div>
  );
};

export default SharedAlbum;