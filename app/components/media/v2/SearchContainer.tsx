import { useState, forwardRef } from "react";
import useOnSearch from "@/app/hooks/useOnSearch";
import { useTYPlayerStore } from "@/app/store/YTP";
import Item from "./Item";
import { lowerCase } from "lodash";

const SearchContainer = () => {
  const { list, setList } = useTYPlayerStore();
  const fetchYT = useOnSearch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (e: any, val?: string) => {
    e.preventDefault();
    const res: any = await fetchYT(val ?? searchValue);
    setList(res?.data?.items);
  };

  const handleChange = (e: any) => setSearchValue(e.target.value);
  const filterErrorVid = (channelTitle: string) =>
    ["Sing King"].some((ct) => lowerCase(ct) !== lowerCase(channelTitle));

  return (
    <>
      <div className="absolute w-full px-4 gap-2 py-2 bg-black bg-opacity-[0.6] h-auto flex rounded flex-col">
        <div className="flex gap-2">
          <form onSubmit={handleSearch} className="w-max">
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full rounded bg-white p-2 italic text-sm"
                placeholder="Search song title/singer"
                value={searchValue}
                onChange={handleChange}
              />
            </div>
          </form>
          <span
            onClick={(e) => handleSearch(e, "latest")}
            className="cursor-pointer rounded w-max px-4 py-2 uppercase text-white bg-[#162C64] hover:bg-[#1c1664]"
          >
            see list
          </span>
        </div>
        <div className="w-full bg-opacity-[0.6] bg-white rounded shadow p-4">
          {list ? (
            <ul className="flex flex-col gap-2 overflow-auto max-h-64 w-full">
              {list?.map((item) =>
                filterErrorVid(item.snippet.channelTitle) ? (
                  <li key={item.etag} className="hover:bg-gray-200 p-2">
                    <Item item={item} />
                  </li>
                ) : null
              )}
            </ul>
          ) : (
            <span className="italic text-sm">See list</span>
          )}
        </div>
      </div>
    </>
  );
};

export default forwardRef(SearchContainer);
