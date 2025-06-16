import { useNavigate } from "react-router-dom";
import type { EventStore } from "../types/EventStore";

interface EventStoreProps {
  store: EventStore;
}

const EventStoreCard = ({store}: EventStoreProps) => {
  const navigate = useNavigate();

  const handleNavigateStore = () => {
    const tagCombos = [
      ["san", "2024"],
      ["gan", "2025"],
      ["sso", "2025"],
      ["retreat", "2024"],
      ["retreat", "2025"],
    ];
  
    const normalizedStoreTags = store.tags.map((tag) => tag.toLowerCase());
  
    for (const combo of tagCombos) {
      const [a, b] = combo;
      if (
        normalizedStoreTags.includes(a) &&
        normalizedStoreTags.includes(b)
      ) {
        const path = `/${a}-${b}`;
        navigate(path);
        return;
      }
    }
  
    console.warn("No matching tag combo found for navigation.");
  };
  
  return (
    <button className="bg-[#e8bdc7] rounded-2xl flex flex-col gap-2 mx-3 my-2 p-3" key={store.id}
      onClick={handleNavigateStore}
    >
      <h3 className="text-2xl sprinkle text-[#7B4B3A] mr-auto">
        {store.storeName}
      </h3>
      <div className="overflow-hidden w-full h-60 rounded-2xl">
        <img src={store.previewImg} className="object-cover h-full w-full" />
      </div>
    </button>
  )
}

export default EventStoreCard;