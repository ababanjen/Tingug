import useOnSelectPlay from "../hooks/useOnSelectPlay";
import { useTYPlayerStore } from "../store/YTP";

const ReservedList = () => {
  const { queues } = useTYPlayerStore();
  const onSelectPlay = useOnSelectPlay();
  
  return (
    <div className="flex flex-col gap-4 border">
      <span>Reserved</span>
      <ul>
        {queues?.map((queue: any, key: number) => (
          <li
            key={key}
            className="flex flex-col border-b mb-2"
            onClick={() => onSelectPlay({ ...queue, queue: key })}
          >
            <span className="font-semibold text-base">{queue.title}</span>
            <span className="text-gray-400 italic">{queue.singer}</span>
            {!key && (
              <span className="text-gray-400 italic text-sm">
                Now playing...
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservedList;
