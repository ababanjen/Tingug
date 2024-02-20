"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isNull } from "lodash";
import { useTYPlayerStore } from "../store/YTP";
import useOnSelectPlay from "../hooks/useOnSelectPlay";

const Search = () => {
  const { list, setList, queues, setQueues, showSearch, setShowSearch } =
    useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();

  const [search, setSearch] = useState<string>("");
  const [reservedSuccess, setReservedSuccess] = useState<any>(null);

  useEffect(() => {
    if (reservedSuccess) {
      setTimeout(() => setReservedSuccess(null), 3000);
    }
  }, [reservedSuccess]);

  const addToQueuee = (item: any) => {
    const queue = isNull(queues) ? 0 : queues.length;
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const newReserved = { singer: "unknown", videoId, title, queue };
    const newQueues = queues ? [...queues, newReserved] : [newReserved];
    setQueues(newQueues);
    setReservedSuccess(item);
    if (!queues) {
      onSelectPlay({ videoId, title, queue });
      return;
    }
  };

  const handleChange = ({ target: { value } }: any) => {
    setSearch(value);
  };

  const fetchYT = async () => {
    const res = await axios({
      method: "GET",
      url: `${process.env.API}?part=snippet&q=${search} karaoke&maxResults=50&key=${process.env.APIKEY}`,
    });
    setList(res.data.items);
  };

  const handleBack = () => setShowSearch(false);

  if (!showSearch) return null;

  return (
    <div className="flex flex-col gap-2 p-4 justify-center bg-black absolute w-full">
      {reservedSuccess && (
        <span className="rounded right-4 top-4 p-2 text-sm fixed bg-green-200 border-green-300 text-gray-600">
          Reserved!{" "}
          <span className="font-semibold italic">
            {reservedSuccess?.snippet.title}
          </span>
        </span>
      )}
      <span
        className="text-sm hover:underline cursor-pointer w-max"
        onClick={handleBack}
      >
        back
      </span>
      <div className="flex gap-2 w-full top-0">
        <input
          className="border w-full p-2 rounded text-black"
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search title"
        />
        <button
          type="submit"
          onClick={fetchYT}
          className="px-4 py-2 rounded bg-blue-950 text-white hover:bg-blue-600 cursor-pointer"
        >
          Search
        </button>
      </div>
      <ul className="flex p-4 gap-2 items-start flex-col justify-center w-full  overflow-scroll">
        {list?.map((item, key) => (
          <li key={item.id.videoId + key} className="py-2 hover:bg-[#e18a02] border-b">
            <div className="flex gap-2 justify-start items-center overflow-hidden">
              <div className="overflow-hidden rounded w-20">
                <Image
                  width={100}
                  height={50}
                  alt="prev"
                  src={item.snippet.thumbnails.default.url}
                  loader={() => item.snippet.thumbnails.default.url}
                />
              </div>
              <div className="flex flex-col w-[20rem]">
                <span className="break-words font-semibold text-sm">
                  {item.snippet.title}
                </span>
                <span
                  className="text-sm p-2 w-min rounded bg-blue-950 text-white hover:bg-blue-600 cursor-pointer"
                  onClick={() => addToQueuee(item)}
                >
                  Reserve
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
