import useOnSelectPlay from "../../hooks/useOnSelectPlay";
import { useTYPlayerStore } from "../../store/YTP";
import CloseV1 from "../icons/closev1";

const ReservedCard = ({ item, idx }: { item: any; idx: number }) => {
  const { currentPlaying, queues, setQueues } = useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();

  if (!item) return;

  const handleSelectQueue = () => {
    if (currentPlaying?.queue == idx) return;
    const newQueues =
      queues
        ?.filter((q) => q.queue !== item.queue)
        .map((q, k) => ({ ...q, queue: k })) || [];
    setQueues(newQueues);
    onSelectPlay({ ...item, queue: idx });
  };

  const handleRemoveQueue = (e: any) => {
    e.stopPropagation();
    const newQueues: any = queues
      ?.filter((q) => q.queue !== item.queue)
      .map((q, k) => ({ ...q, queue: k }));
    setQueues(newQueues);
    localStorage.setItem("queues", JSON.stringify(newQueues));
  };

  return (
    <div
      className="flex bg-[#EEEEEE]  p-2 w-[10rem] cursor-pointer"
      onClick={handleSelectQueue}
    >
      <div className="flex flex-col">
        <span
          className="font-semibold line-clamp-1"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
        <span className="text-xs text-[#615E5E] italic">{item.singer}</span>
      </div>
      <span
        className="ml-2 cursor-pointer hover:shadow-sm justify-end"
        onClick={handleRemoveQueue}
      >
        <CloseV1 />
      </span>
    </div>
  );
};

export default ReservedCard;
