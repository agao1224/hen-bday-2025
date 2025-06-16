import { useEffect, useState } from "react";
import EventStoreCard from "../components/EventStoreCard";
import { useAPI } from "../hooks/APIContext";
import type { EventStore } from "../types/EventStore";

const Home = () => {
  const { fetchByTags } = useAPI();
  const [stores, setStores] = useState<EventStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const tagSets: Array<{ tags: string[]; name: string }> = [
      { tags: ["sso", "2025"], name: "SSO 2025" },
      { tags: ["gan", "2025"], name: "GAN 2025" },
      { tags: ["retreat", "2025"], name: "Retreat 2025" },
      { tags: ["san", "2024"], name: "SAN 2024" },
      { tags: ["retreat", "2024"], name: "Retreat 2024" },
    ];

    const fetchStores = async () => {
      const results: EventStore[] = [];

      for (const [index, { tags, name }] of tagSets.entries()) {
        const memories = await fetchByTags(tags);
        if (memories.length > 0) {
          const memory = memories[0];
          results.push({
            id: index + 1,
            previewImg: memory.image_url,
            storeName: name,
            tags: memory.tags.split(",").map((t) => t.trim()),
          });
        }
      }

      setStores(results);
      setLoading(false);
    };

    fetchStores();
  }, [fetchByTags]);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <p className="sprinkle text-7xl sm:text-9xl text-[#7B4B3A] m-auto text-center">
        <span className="block">Hannah's</span>
        <span className="block">Memories</span>
        {(loading) && <p className="text-center text-[#7B4B3A] mt-8 text-5xl sm:text-2xl sprinkle">Loading{dots}</p>}
      </p>
      {!loading && (
        stores.map((store) => <EventStoreCard key={store.id} store={store} />)
      )}
    </div>
  );
};

export default Home;