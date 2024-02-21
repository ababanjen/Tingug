"use client";
import TYPlayer from "./TYPlayer";
import Stop from "./icons/stop";
import ReservedCard from "./ReservedCard";

const PlayerContainer = () => {
  return (
    <div className="flex flex-col w-[71%]">
      <div className=" border">
        <TYPlayer />
      </div>
      <div className="flex items-center">
        <span className="text-base w-full">
          Currently playing{" "}
          <span className="font-semibold">
            The lazy song - Bruno mars Karaoke
          </span>
        </span>
        <span className="flex justify-end w-full">
          <Stop />
        </span>
      </div>
      <div className="bg-[#F7F7F7] shadow flex w-full px-4 py-2 rounded gap-2">
        <div className="flex flex-col gap-2">
          <span className="uppercase">next song:</span>
          <ReservedCard />
        </div>
        <div className="h-full border-l border-r-0 border-[#615E5E] opacity-15" />
        <div className="flex flex-col gap-2 overflow-auto relative">
          <span className="uppercase italic">Reserved songs</span>
          <div className="flex gap-2">
            {[...Array(15)].map((_, key) => (
              <div key={key} className="flex items-center">
                <ReservedCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
