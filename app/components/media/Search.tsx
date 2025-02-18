import { useRef } from "react";
import HamburgerIcon from "../icons/hamburger";
import clsx from "clsx";
import { useTYPlayerStore } from "@/app/store/YTP";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import SearchContainer from "./SearchContainer";

const Search = () => {
  const { setExpandSearch, expandSearchBar } = useTYPlayerStore();
  const ref: any = useRef(undefined);

  useOutsideClick(
    (e) => {
      if (!ref.current?.contains(e.target) && expandSearchBar) {
        setExpandSearch(false);
      }
    },
    ref,
    expandSearchBar
  );

  const handleExpand = () => setExpandSearch(!expandSearchBar);

  return (
    <div
      ref={ref}
      className={clsx({
        "bg-white absolute top-0 right-0  h-[-webkit-fill-available] shadow z-10":
          true,
        "w-[80%] md:w-[30%]": expandSearchBar,
        "w-0": !expandSearchBar,
      })}
    >
      {expandSearchBar && <SearchContainer />}
      <div
        className="absolute bg-main left-[-19px] md:left-[-28px] top-32 h-[20%] flex items-center cursor-pointer px-1 md:px-2 rounded-l shadow"
        onClick={handleExpand}
      >
        <HamburgerIcon />
      </div>
    </div>
  );
};

export default Search;
