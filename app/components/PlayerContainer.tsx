"use client";
import TYPlayer from "./TYPlayer";
import Stop from "./icons/stop";
import ReservedCard from "./ReservedCard";
import { useTYPlayerStore } from "../store/YTP";
import { useEffect } from "react";

const PlayerContainer = () => {
  const { queues, currentPlaying, setQueues, setCurrentPlaying } =
    useTYPlayerStore();

  useEffect(() => {
    if (!queues) {
      const localQueues = JSON.parse(localStorage.getItem("queues") || '""');
      setQueues(localQueues);
      setCurrentPlaying(localQueues[0]);
    }
  }, [queues]);

  const handleStopSong = () => {
    const newQueues: any = queues
      ?.filter((q) => q.queue !== currentPlaying?.queue)
      .map((q, k) => ({ ...q, k }));
    setCurrentPlaying(newQueues[0]);
    setQueues(newQueues);
  };

  return (
    <div className="flex flex-col w-[71%]">
      <div className=" border">
        <TYPlayer />
      </div>
      {currentPlaying && (
        <div className="flex items-center">
          <span className="text-base w-full">
            Currently playing{" "}
            <span
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: currentPlaying.title }}
            />
          </span>
          <span
            className="flex justify-end cursor-pointer"
            onClick={handleStopSong}
          >
            <Stop />
          </span>
        </div>
      )}
      {queues && (
        <div className="bg-[#F7F7F7] shadow flex w-full px-4 py-2 rounded gap-2">
          <div className="flex flex-col gap-2">
            <span className="uppercase">next song:</span>
            <ReservedCard item={queues ? queues[1] : null} idx={0} />
          </div>
          <div className="h-full border-l border-r-0 border-[#615E5E] opacity-15" />
          <div className="flex flex-col gap-2 overflow-auto relative">
            <span className="uppercase italic">Reserved songs</span>
            <div className="flex gap-2">
              {queues?.map(
                (item: any, key: number) =>
                  key > 1 && (
                    <div key={key} className="flex items-center">
                      <ReservedCard item={item} idx={key} />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerContainer;
