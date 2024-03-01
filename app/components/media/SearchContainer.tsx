import { useEffect, useRef, useState } from "react";
import { useTYPlayerStore } from "../../store/YTP";
import ItemCard from "./ItemCard";
import clsx from "clsx";
import Input from "../common/formComponents/Input";
import SearchIcon from "../icons/search";
import LogoBlack from "../icons/logo-b";
import useOnSearch from "@/app/hooks/useOnSearch";
import { getLocalFavorites } from "@/app/helpers/localStorage";

const SearchContainer = () => {
  const {
    searchValue: search,
    setSearchValue: setSearch,
    list,
    setList,
    favorites,
    setFavorites,
    focusInput,
    setFocusInput,
  } = useTYPlayerStore();
  const [searched, setSearched] = useState<boolean>(false);
  const [viewList, setViewList] = useState<boolean>(true);

  const searchInputRef: any = useRef();

  const fetchYT = useOnSearch();

  useEffect(() => {
    const localFav = getLocalFavorites();
    if (localFav.length > 0 && !list) {
      setFavorites(localFav);
      setViewList(false)
    }

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

  const submit = () => {
    const searchResults = fetchYT(search);
    setSearched(true);
    setViewList(true);
  };

  const handleChange = ({ target: { value } }: any) => {
    setSearch(value);
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
      <div className="flex w-full h-full">
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
      <div className="flex justify-between gap-5 flex-col  h-[100vh]">
        <div className="flex flex-col overflow-auto ">
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
        <div className="w-full flex justify-center">
          <LogoBlack />
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
