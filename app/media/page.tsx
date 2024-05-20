"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ScoreBoard from "../components/media/ScoreBoard";
import SuccessAlert from "../components/common/SuccessAlert";
import TYPlayer from "../components/media/TYPlayer";
import ReservedContainer from "../components/media/ReservedContainer";
import Search from "../components/media/Search";
import { useTYPlayerStore } from "../store/YTP";
import SearchContainer from "../components/media/v2/SearchContainer";
import useOutsideClick from "../hooks/useOutsideClick";

const Media = () => {
  const searchRef: any = useRef();
  const [showList, setShowList] = useState(false);

  // useOutsideClick(
  //   (e) => {
  //     console.log({ showList, test: !searchRef.current?.contains(e.target),sample:searchRef.current?.contains(e.target) });
  //     if (!searchRef.current?.contains(e.target) && showList) {
  //       setShowList(false);
  //     }
  //   },
  //   searchRef,
  //   showList
  // );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, [showList]);

  const handleKeyDown = ({ keyCode }: { keyCode: number }) => {
    if ([75, 27].some((n) => n === keyCode)) {
      handleShowHideList();
    }
  };

  const handleShowHideList = () => {
    setShowList(!showList);
  };

  return (
    <main className="flex flex-col relative" onKeyUp={handleKeyDown}>
      <ScoreBoard />
      <SuccessAlert />
      <div className="flex flex-col relative">
        {!showList ? (
          <span
            className="absolute right-2 top-2 cursor-pointer text-white bg-[#FF4A64] hover:bg-[#ed455e] rounded w-max p-2"
            onClick={handleShowHideList}
          >
            Search song
          </span>
        ) : (
          <SearchContainer />
        )}
        <div className="rounded overflow-hidden bg-red-500 h-screen">
          <TYPlayer />
        </div>
      </div>
      {/* <Header />
      <div className="flex flex-col gap-2 py-4 px-6">
        <div className="rounded overflow-hidden">
          <TYPlayer />
        </div>
        <ReservedContainer />
        <Search />
      </div> */}
      <Footer />
    </main>
  );
};

export default Media;
