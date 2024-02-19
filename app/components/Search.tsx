"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { isNull } from "lodash";
import { useTYPlayerStore } from "../store/YTP";
import useOnSelectPlay from "../hooks/useOnSelectPlay";

const Search = () => {
  const { list, setList, queues, setQueues } = useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();

  const [search, setSearch] = useState<string>("");

  const addToQueuee = (item: any) => {
    const queue = isNull(queues) ? 0 : queues.length;
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const newReserved = { singer: "unknown", videoId, title, queue };
    const newQueues = queues ? [...queues, newReserved] : [newReserved];
    setQueues(newQueues);
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
      url: `${process.env.API}?part=snippet&q=${search} karaoke&maxResults=10&key=${process.env.APIKEY}`,
    });
    setList(res.data.items);
  };

  return (
    <>
      <div className="flex gap-2">
        <span>Search:</span>
        <input
          className="border"
          type="text"
          value={search}
          onChange={handleChange}
        />
        <button onClick={fetchYT}>Search</button>
      </div>
      <div className="flex flex-col gap-2">
        <ul className="flex gap-2">
          {list?.map((item, key) => (
            <li className="flex flex-col gap-2" key={item.id.videoId + key}>
              <Image
                width={100}
                height={100}
                alt="prev"
                src={item.snippet.thumbnails.default.url}
                loader={() => item.snippet.thumbnails.default.url}
              />
              <span
                className="bg-blue-300 rounded p-2"
                onClick={() => addToQueuee(item)}
              >
                Reserve
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
