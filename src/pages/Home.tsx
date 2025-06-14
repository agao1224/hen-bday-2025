import { stores } from "../mock-data/stores";

import EventStoreCard from "../components/EventStoreCard";

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="sprinkle text-7xl sm:text-9xl text-[#7B4B3A] m-auto text-center">
        <span className="block">Hannah's</span>
        <span className="block">Memories</span>
      </p>
      {(stores).map((store) => <EventStoreCard store={store} />)}
    </div>
  )
}

export default Home;