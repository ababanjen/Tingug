"use client";

import TYPlayer from "./TYPlayer";
import Stop from "../icons/stop";
import ReservedCard from "./ReservedCard";
import { useTYPlayerStore } from "../../store/YTP";
import { useEffect } from "react";
import PlusIcon from "../icons/plus";

const PlayerContainer = () => {
  const {
    queues,
    currentPlaying,
    setQueues,
    setCurrentPlaying,
    setFocusInput,
  } = useTYPlayerStore();

  useEffect(() => {
    if (!queues) {
      const localQueues = JSON.parse(localStorage.getItem("queues") || '""');
      if (localQueues?.length) {
        setQueues(localQueues);
        setCurrentPlaying(localQueues[0]);
      }
    }
  }, []);

  const handleStopSong = () => {
    const newQueues: any = queues
      ?.filter((item) => item.queue !== currentPlaying?.queue)
      .map((i: any, key: any) => ({ ...i, queue: key }));
    const isEmpty = newQueues.length <= 0;
    setQueues(isEmpty ? null : newQueues);
    setCurrentPlaying(isEmpty ? null : newQueues[0]);
    localStorage.setItem("queues", JSON.stringify(newQueues));
  };

  const onScollTop = () => {
    window.scrollTo(0, 0);
    setFocusInput(true);
  };
  return (
    <div className="flex flex-col w-full gap-4">
      <div className=" border">
        <TYPlayer />
      </div>
      {queues && queues.length ? (
        <>
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
          <div className="bg-[#F7F7F7] lg:max-w-[68rem] shadow flex w-full px-4 py-2 rounded gap-2">
            {queues && (
              <>
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
              </>
            )}
          </div>
        </>
      ) : (
        <div
          onClick={onScollTop}
          className="w-full bg-[#D9D9D9] flex gap-2 px-6 py-8 justify-center items-center uppercase text-md  cursor-pointer hover:bg-[#c4c3c3]"
        >
          <span>
            <PlusIcon />
          </span>
          <span className="flex items-center text-[#7b7b7b]">
            Add reservation!
          </span>
        </div>
      )}
    </div>
  );
};

export default PlayerContainer;
