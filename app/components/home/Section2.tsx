import Image from "next/image";
import { useRouter } from "next/navigation";
import useOnSearch from "@/app/hooks/useOnSearch";
import Input from "../common/formComponents/Input";
import { HomepageTypes } from "./Homepage";
import { useTYPlayerStore } from "@/app/store/YTP";
import { getLocalQueues, setLocalQueues } from "@/app/helpers/localStorage";
import { useEffect, useRef } from "react";

type Section2Types = {} & HomepageTypes;

const Section2 = ({ top3Search }: Section2Types) => {
  const {
    searchValue,
    setSearchValue,
    setCurrentPlaying,
    setQueues,
    focusInput,
  } = useTYPlayerStore();
  const { push } = useRouter();
  const fetchYT = useOnSearch();
  const searchRef: any = useRef(undefined);

  useEffect(() => {
    if (focusInput && searchRef) {
      searchRef?.current.focus();
    }
  }, [focusInput]);

  const onChangeSearch = ({ target: { value } }: any) => setSearchValue(value);

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      fetchYT(searchValue);
      push("/media");
      return;
    }
    return;
  };

  const handleOnClickPlay = async (item: any) => {
    const selectedItem = {
      queue: 0,
      singer: "unknown",
      title: item.snippet.title,
      videoId: "gRj18Tk0j_Q",
    };
    const localQueues: any = getLocalQueues();
    localQueues.splice(0, 0, selectedItem);
    setLocalQueues(localQueues);
    setQueues(localQueues);
    setCurrentPlaying(selectedItem);
    push("/media");
  };

  return (
    <section className="bg-faded-gray bg-opacity-20  px-4 py-4 lg:px-10 lg:py-8">
      <div className="flex flex-col gap-4">
        <div className="flex  lg:px-32 ">
          <Input
            ref={searchRef}
            placeholder="Search your favorite karaoke song"
            value={searchValue}
            onKeyDown={onKeyDown}
            className="w-full rounded-full"
            onChange={onChangeSearch}
          />
        </div>
        <div className="flex flex-col gap-4  lg:px-32">
          <span className="font-semibold flex justify-center text-based capitalize">
            Top 3 most played
          </span>
          <div className="flex gap-8 justify-center">
            {top3Search?.map((item) => (
              <div
                key={item.etag}
                className="overflow-hidden rounded w-60  hover:shadow-2xl cursor-pointer "
                onClick={() => handleOnClickPlay(item)}
              >
                <Image
                  width={100}
                  height={100}
                  className="w-full"
                  loader={() => item.snippet.thumbnails.default.url}
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
