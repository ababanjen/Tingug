"use client";

import ReservedCard from "./ReservedCard";
import { useTYPlayerStore } from "../../store/YTP";
import { useEffect } from "react";
import Switch from "../common/formComponents/Switch";
import NextIcon from "../icons/next";

const ReservedContainer = () => {
  const {
    queues,
    currentPlaying,
    setQueues,
    setCurrentPlaying,
    skipScore,
    setSkipScore,
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

  const toggleScore = () => setSkipScore(!skipScore);

  return (
    <div className="bg-white  rounded py-2 px-4">
      {queues?.length ? (
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-2 md:flex-row w-full justify-between items-center border-b border-black py-2">
            {typeof currentPlaying?.title === "string" && (
              <span className="text-xs w-full">
                Currently playing{" "}
                <span
                  className="font-semibold italic text-xs"
                  dangerouslySetInnerHTML={{
                    __html: currentPlaying?.title || <></>,
                  }}
                />
              </span>
            )}
            <div className="flex gap-2 w-full justify-end">
              <Switch
                onChange={toggleScore}
                checked={skipScore}
                label="Skip score"
              />
              <span className="cursor-pointer" onClick={handleStopSong}>
                <NextIcon />
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 py-2 overflow-hidden">
            <div className="flex flex-col gap-2 border-b md:border-b-0 pb-2 md:pb-0 lg:border-r border-black pr-2">
              <span className="uppercase text-xs">next song</span>
              {queues[1] ? (
                <ReservedCard item={queues ? queues[1] : null} idx={0} />
              ) : (
                <span className="text-xs italic opacity-20">
                  no upcoming song
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full h-full">
              <span className="uppercase text-xs">Reserved</span>
              <div className="flex flex-col md:flex-row gap-2 overflow-auto">
                {queues[1] ? (
                  queues?.map(
                    (item: any, key: number) =>
                      key > 1 && (
                        <div key={key} className="flex items-center">
                          <ReservedCard item={item} idx={key} />
                        </div>
                      )
                  )
                ) : (
                  <span className="text-xs italic opacity-20">
                    no reserved songs
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyQueuesPlaceholder />
      )}
    </div>
  );
};

export default ReservedContainer;

export const EmptyQueuesPlaceholder = () => {
  return (
    <div className="w-full flex p-4 justify-center opacity-30">
      <span className="text-xs italic">
        Looks like you haven&#x27;t added any song...
      </span>
    </div>
  );
};
