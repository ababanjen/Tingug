import useOnSelectPlay from "../hooks/useOnSelectPlay";
import { useTYPlayerStore } from "../store/YTP";
import Search from "./Search";
import SearchIcon from "./icons/search";

const ReservedList = () => {
  const { queues, setShowSearch, currentPlaying } = useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();

  return (
    <div className="flex overflow-auto h-[40rem] max-h-[40rem] w-full max-w-[30rem] flex-col gap-4 border p-2 relative ">
      <div className="flex justify-between">
        <span className="font-semibold text-xl italic">Reserved songs</span>
        <span
          className="cursor-pointer italic text-sm flex gap-2"
          onClick={() => setShowSearch(true)}
        >
          Search titles
          <span>
            <SearchIcon />
          </span>
        </span>
        <Search />
      </div>
      <ul>
        {queues?.map((queue: any, key: number) => (
          <li
            key={key}
            className="flex flex-col border-b mb-2 hover:bg-gray-300 p-2"
            onClick={() => onSelectPlay({ ...queue, queue: key })}
          >
            <span className="font-semibold text-base">{queue.title}</span>
            <span className="text-gray-400 italic">{queue.singer}</span>
            {currentPlaying?.queue == key && (
              <span className="text-gray-400 italic text-sm">
                Now playing...
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservedList;
