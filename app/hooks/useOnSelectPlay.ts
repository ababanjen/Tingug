import { useTYPlayerStore } from "../store/YTP";

export type onSelectPlayTypes = {
  videoId: string;
  title: string;
  queue: number;
};
const useOnSelectPlay = () => {
  const { setCurrentPlaying } = useTYPlayerStore();
  const onSelectPlay = (item: onSelectPlayTypes) => {
    const newReserved = { ...item, singer: "unknown" };
    setCurrentPlaying(newReserved);
  };
  return onSelectPlay;
};

export default useOnSelectPlay;
