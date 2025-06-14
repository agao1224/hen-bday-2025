import type { EventStore } from "../types/EventStore";

interface EventStoreProps {
  store: EventStore;
}

const EventStoreCard = ({store}: EventStoreProps) => {
  return (
    <button className="bg-[#e8bdc7] rounded-2xl flex flex-col gap-2 mx-3 my-2 p-3" key={store.id}>
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