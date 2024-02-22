import { useState } from "react";
import { useTYPlayerStore } from "../store/YTP";
import ItemCard from "./ItemCard";
import axios from "axios";
import clsx from "clsx";
import { isEmpty } from "lodash";

const SearhContainer = () => {
  const { list, setList } = useTYPlayerStore();
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [viewList, setViewList] = useState<boolean>(true);

  const localFavQueues = JSON.parse(localStorage.getItem("favQueues") || '""');
  const favQueues = isEmpty(localFavQueues) ? null : localFavQueues;

  const fetchYT = async () => {
    const res = await axios({
      method: "GET",
      url: `${process.env.API}?part=snippet&q=${search} karaoke&maxResults=50&key=${process.env.APIKEY}`,
    });
    setList(res.data.items);
    setViewList(true);
  };

  const handleChange = ({ target: { value } }: any) => {
    setSearch(value);
  };

  const onKeyDown = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === 13) {
      fetchYT();
      setSearched(true);
      return;
    }
    setSearched(false);
    return;
  };

  const handleChangeTab = (tab: string) => setViewList(tab === "list");

  const filterView = (item: any) => {
    console.log({ viewList });
    if (viewList) return true;
    if (favQueues)
      return favQueues.some((f: any) => f.id.videoId === item.id.videoId);
    return false;
  };

  return (
    <div className="bg-[#F7F7F7] h-64 md:h-96 lg:h-[50rem] lg:max-h-[50rem] overflow-hidden shadow rounded flex flex-col lg:w-[25rem]">
      <div className="px-4 py-2 flex flex-col gap-1">
        <input
          type="text"
          placeholder="Search title or singer"
          className="border border[#C4C4C4] text-sm text-[#615E5E] rounded p-2 italic"
          value={search}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
        {list && searched && (
          <span className="text-[#615E5E] text-xs">
            Results for <span className="font-semibold italic">{search}</span>
          </span>
        )}
      </div>
      <div className="flex w-full">
        <span
          className={clsx({
            "w-full cursor-pointer flex  py-1 justify-center uppercase font-semibold":
              true,
            "bg-[#D9D9D9]": viewList,
            "bg-[#E6E6E6] text-[#615E5E]": !viewList,
          })}
          onClick={() => handleChangeTab("list")}
        >
          LIST
        </span>
        <span
          className={clsx({
            "w-full cursor-pointer flex py-1 justify-center uppercase font-semibold":
              true,
            "bg-[#D9D9D9]": !viewList,
            "bg-[#E6E6E6] text-[#615E5E]": viewList,
          })}
          onClick={() => handleChangeTab("favorites")}
        >
          Favorites
        </span>
      </div>
      <div className="flex flex-col gap-1 overflow-auto ">
        {!list && !favQueues && (
          <span className="text-[#615E5E] italic my-4 mx-2">
            Search song titles...
          </span>
        )}
        {(list || favQueues)?.map(
          (item: any, key: number) =>
            filterView(item) && <ItemCard key={key} item={item} />
        )}
      </div>
    </div>
  );
};

export default SearhContainer;
