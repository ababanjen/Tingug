"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { isNull } from "lodash";
import { useTYPlayerStore } from "../store/YTP";
import TYPlayer from "./TYPlayer";

//TODO: SET UP ENV VARIABLES
const API = "https://www.googleapis.com/youtube/v3/search";
const APIKEY = "AIzaSyDxNlnB2RukSM4etQud12BETJgR0d-QGKE";

const Dashboard = () => {
  const { list, setList, setCurrentPlaying, queues, setQueues } =
    useTYPlayerStore();
  const [search, setSearch] = useState<string>("");

  const fetchYT = async () => {
    const res = await axios({
      method: "GET",
      url: `${API}?part=snippet&q=${search} karaoke&maxResults=10&key=${APIKEY}`,
    });
    setList(res.data.items);
  };

  const handleChange = ({ target: { value } }: any) => {
    setSearch(value);
  };

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

  const onSelectPlay = (item: {
    videoId: string;
    title: string;
    queue: number;
  }) => {
    const newReserved = { ...item, singer: "unknown" };
    setCurrentPlaying(newReserved);
    return;
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
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

        <TYPlayer />
      </div>
      <div className="flex flex-col gap-4 border">
        <span>Reserved</span>
        <ul>
          {queues?.map((queue: any, key) => (
            <li
              key={key}
              className="flex flex-col border-b mb-2"
              onClick={() => onSelectPlay({ ...queue, queue: key })}
            >
              <span className="font-semibold text-base">{queue.title}</span>
              <span className="text-gray-400 italic">{queue.singer}</span>
              {!key && (
                <span className="text-gray-400 italic text-sm">
                  Now playing...
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
