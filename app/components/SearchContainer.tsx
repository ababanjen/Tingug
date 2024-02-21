import ItemCard from "./ItemCard";

const SearhContainer = () => {
  return (
    <div className="bg-[#F7F7F7] h-[44rem] overflow-hidden shadow rounded flex flex-col lg:w-[25rem]">
      <div className="px-4 py-2 flex flex-col gap-1">
        <input
          type="text"
          placeholder="Search title or singer"
          className="border border[#C4C4C4] text-sm text-[#615E5E] rounded p-2 italic"
        />
        <span className="text-[#615E5E] text-xs">
          Results for <span className="font-semibold italic">Just once</span>
        </span>
      </div>
      <div className="flex w-full">
        <span className="w-full cursor-pointer flex  py-1 justify-center uppercase font-semibold bg-[#D9D9D9]">
          LIST
        </span>
        <span className="w-full   cursor-pointer flex py-1 justify-center uppercase font-semibold bg-[#E6E6E6] text-[#615E5E]">
          Favorites
        </span>
      </div>
      <div className="flex flex-col gap-1 overflow-auto ">
        {[...Array(50)].map((_, key) => (
          <ItemCard key={key} />
        ))}
      </div>
    </div>
  );
};

export default SearhContainer;
