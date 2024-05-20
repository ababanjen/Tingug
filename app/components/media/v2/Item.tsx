import useOnSearch from "@/app/hooks/useOnSearch";
import { useTYPlayerStore } from "@/app/store/YTP";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../../common/formComponents/Button";
import { isNull, lowerCase } from "lodash";
import {
  getLocalFavorites,
  setLocalFavorites,
  setLocalQueues,
} from "@/app/helpers/localStorage";
import useOnSelectPlay from "@/app/hooks/useOnSelectPlay";
import HeartIcon from "../../icons/heart";

const Item = ({ item }: any) => {
  const {
    list,
    setList,
    queues,
    setQueues,
    setFavorites,
    setSuccessReservation,
    successReservation,
    favorites,
  } = useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    if (successReservation) {
      setTimeout(() => setSuccessReservation(null), 3000);
    }
  }, [successReservation]);

  useEffect(() => {
    const localFav = getLocalFavorites();
    if (!favorites) {
      setFavorites(localFav);
    } else {
      setIsFav(favorites.some((f: any) => f.id.videoId === item.id.videoId));
    }
  }, [favorites]);

  const addToQueuee = (e: any) => {
    e.stopPropagation();
    const queue = isNull(queues) ? 0 : queues.length;
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const newReserved = { singer: "unknown", videoId, title, queue };
    const newQueues = queues ? [...queues, newReserved] : [newReserved];
    setLocalQueues(newQueues);
    setQueues(newQueues);
    setSuccessReservation(item);
    if (!queues) {
      onSelectPlay({ videoId, title, queue });
      return;
    }
  };

  const addAsFavorite = () => {
    const favQueues = getLocalFavorites();
    let newFav = favQueues;
    if (isFav)
      newFav = newFav.filter((fav: any) => fav.id.videoId !== item.id.videoId);
    else newFav = [...newFav, item];
    setFavorites(newFav);
    setLocalFavorites(newFav);
  };

  return (
    <div className=" gap-2 flex w-max ">
      <span className="cursor-pointer" onClick={addAsFavorite}>
        <HeartIcon active={isFav} />
      </span>
      <div className="overflow-hidden rounded-sm">
        <Image
          width={100}
          height={100}
          src={item.snippet.thumbnails.high.url}
          alt="thumbnail"
          loader={() => item.snippet.thumbnails.high.url}
        />
      </div>
      <span className="flex flex-col">
        <span
          className="font-semibold text-sm line-clamp-1"
          dangerouslySetInnerHTML={{ __html: item.snippet.title }}
        />
        <span
          className="text-xs line-clamp-1"
          dangerouslySetInnerHTML={{
            __html: item.snippet.channelTitle,
          }}
        />
        <span>
          <Button
            onClick={addToQueuee}
            labelClassName="flex items-center py-2"
            label="Reserve"
          />
        </span>
      </span>
    </div>
  );
};

export default Item;
