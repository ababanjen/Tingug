import { useEffect, useRef, useState } from "react";
import { useTYPlayerStore } from "../../store/YTP";
import ItemCard from "./ItemCard";
import axios from "axios";
import clsx from "clsx";
import { isEmpty } from "lodash";
import { searchAPI } from "@/app/helpers/api";
import Input from "../common/formComponents/Input";
import SearchIcon from "../icons/search";

const SearchContainer = () => {
  const { list, setList, favorites, setFavorites, focusInput, setFocusInput } =
    useTYPlayerStore();
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [viewList, setViewList] = useState<boolean>(true);

  const searchInputRef: any = useRef();

  useEffect(() => {
    const localFavQueues = JSON.parse(
      localStorage.getItem("favQueues") || '""'
    );

    const fav = isEmpty(localFavQueues) ? null : localFavQueues;
    if (fav) setViewList(false);
    setFavorites(fav);

    return () => {
      setFocusInput(false);
    };
  }, []);

  useEffect(() => {
    if (focusInput) {
      searchInputRef?.current.focus();
    }
  }, [focusInput]);

  useEffect(() => {
    if (favorites && !list) setList(favorites);
  }, [favorites]);

  const fetchYT = async () => {
    const res = await axios({
      method: "GET",
      url: searchAPI(search),
    });
    setList(res.data.items);
    setViewList(true);
  };

  const handleChange = ({ target: { value } }: any) => {
    setSearch(value);
  };

  const submit = () => {
    fetchYT();
    setSearched(true);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      submit();
      return;
    }
    setSearched(false);
    return;
  };

  const handleChangeTab = (tab: string) => setViewList(tab === "list");

  const filterView = (item: any) => {
    if (viewList) return true;
    return (
      favorites?.some((f: any) => f.id.videoId === item.id.videoId) || false
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 p-4">
        <span className="text-xs font-semibold">
          Look for your favorite song!
        </span>
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            autoFocus
            ref={searchInputRef}
            placeholder="Search your favorite karaoke song "
            className="text-xs w-full"
          />
          <a
            onClick={submit}
            className="cursor-pointer flex justify-center items-center z-30"
          >
            <SearchIcon />
          </a>
        </div>
        {list && searched && search && (
          <span className="text-[#615E5E] text-xs">
            Results for <span className="font-semibold italic">{search}</span>
          </span>
        )}
      </div>
      <div className="flex w-full">
        <span
          className={clsx({
            "w-full text-sm cursor-pointer flex  py-1 justify-center uppercase font-semibold":
              true,
            "bg-main text-white": viewList,
            "bg-[#E6E6E6] text-[#615E5E]": !viewList,
          })}
          onClick={() => handleChangeTab("list")}
        >
          LIST
        </span>
        <span
          className={clsx({
            "text-sm w-full cursor-pointer flex py-1 justify-center uppercase font-semibold":
              true,
            "bg-main text-white": !viewList,
            "bg-[#E6E6E6] text-[#615E5E]": viewList,
          })}
          onClick={() => handleChangeTab("favorites")}
        >
          Favorites
        </span>
      </div>
      <div className="flex flex-col overflow-auto h-[100vh] ">
        {!list && !favorites && (
          <span className="text-[#615E5E] italic my-4 mx-2 text-xs">
            Search song titles...
          </span>
        )}
        {list?.map(
          (item: any, key: number) =>
            filterView(item) && <ItemCard key={key} item={item} />
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
