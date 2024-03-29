import { useEffect, useState } from "react";
import Image from "next/image";
import { useTYPlayerStore } from "../../store/YTP";
import useOnSelectPlay from "../../hooks/useOnSelectPlay";
import { isNull } from "lodash";
import HeartIcon from "../icons/heart";
import Button from "../common/formComponents/Button";
import {
  getLocalFavorites,
  setLocalFavorites,
  setLocalQueues,
} from "@/app/helpers/localStorage";

const ItemCard = ({ item }: { item: any }) => {
  const [isFav, setIsFav] = useState<boolean>(false);
  const {
    setSuccessReservation,
    successReservation,
    queues,
    setQueues,
    setFavorites,
    favorites,
  } = useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();

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

  const addToQueuee = () => {
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
    <div className="bg-light hover:bg-[#D9D9D9] px-4 py-2 gap-2 border-b flex w-full">
      <div className="overflow-hidden  flex w-40 rounded-sm">
        <Image
          width={100}
          height={100}
          src={item.snippet.thumbnails.high.url}
          alt="thumbnail"
          loader={() => item.snippet.thumbnails.high.url}
        />
      </div>
      <div className="flex flex-col gap-2 w-[-webkit-fill-available]">
        <span className="flex flex-col">
          <span
            className="font-semibold text-sm line-clamp-1"
            dangerouslySetInnerHTML={{ __html: item.snippet.title }}
          />
        </span>
        <div className="flex items-end justify-between w-full">
          <Button
            onClick={addToQueuee}
            labelClassName="flex items-center py-2"
            label="Reserve"
          />
          <span className="cursor-pointer" onClick={addAsFavorite}>
            <HeartIcon active={isFav} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
