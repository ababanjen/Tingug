import clsx from "clsx";
import useOnSelectPlay from "../hooks/useOnSelectPlay";
import { useTYPlayerStore } from "../store/YTP";
import Search from "./Search";
import SearchIcon from "./icons/search";
import CloseIcon from "./icons/close";
import { useEffect } from "react";

const ReservedList = () => {
  const { queues, setQueues, setShowSearch, currentPlaying, showSearch } =
    useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();

  const handleRemoveQueue = (e: any, queue: any) => {
    e.stopPropagation();
    const newQueues: any = queues?.filter((q, k) => k !== queue.key);
    setQueues(newQueues);
  };

  const handleSelectQueue = (queue: any, key: number) => {
    if (currentPlaying?.queue == key) return;
    onSelectPlay({ ...queue, queue: key });
  };

  return (
    <div className="flex overflow-auto h-[40rem] max-h-[40rem] w-full lg:max-w-[30rem] flex-col gap-4 border relative rounded">
      <div className="flex justify-between p-2">
        <span className="font-semibold text-xl italic">{`Reserved songs (${queues?.length ?? 0})`}</span>
        <span
          className="cursor-pointer italic text-sm flex gap-2"
          onClick={() => setShowSearch(true)}
        >
          Search titles
          <span>
            <SearchIcon />
          </span>
        </span>
        {showSearch && <Search />}
      </div>
      {!showSearch && (
        <ul>
          {queues?.map((queue: any, key: number) => (
            <li
              key={key}
              className={clsx({
                "flex flex-col border-b mb-2 p-2": true,
                "bg-[#e18a02]": currentPlaying?.queue === key,
                "cursor-pointer hover:bg-gray-300 hover:text-black": currentPlaying?.queue != key,
              })}
              onClick={() => handleSelectQueue(queue, key)}
            >
              <span className="font-semibold text-base">{queue.title}</span>
              <div className="flex gap-2 justify-between items-center">
                <div className="flex flex-col gap-2">
                  <span className=" italic">{queue.singer}</span>
                  {currentPlaying?.queue === key && (
                    <span className=" italic text-sm">Now playing...</span>
                  )}
                </div>
                {currentPlaying?.queue != key && (
                  <span
                    className="text-xs cursor-pointer text-red-300 hover:text-red-500"
                    onClick={(e) => handleRemoveQueue(e, { ...queue, key })}
                  >
                    <CloseIcon />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservedList;
