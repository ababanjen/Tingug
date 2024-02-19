import YouTube from "react-youtube";
import { isNumber } from "lodash";
import { useTYPlayerStore } from "../store/YTP";
import useScore from "../hooks/useScore";
import MusicIcon from "./icons/music";

const TYPlayer = () => {
  const {
    currentPlaying,
    setCurrentPlaying,
    queues,
    setQueues,
    rScores,
    setRScores,
    setFinalScore,
  } = useTYPlayerStore();
  const onRollScoreBoard = useScore();

  const onReady = (event: any) => {
    // Access the player instance
    const player = event.target;
    // For example, you can automatically play the video
    player.playVideo();
  };

  const onEnd = () => {
    const nextQueue = isNumber(currentPlaying?.queue)
      ? currentPlaying?.queue + 1
      : null;
    const newQueues: any = queues?.filter(
      (item) => item.queue !== currentPlaying?.queue
    );
    onRollScoreBoard();
    setTimeout(() => {
      if (nextQueue) {
        const nextQueued: any = queues
          ? queues?.find((_, key) => key === nextQueue)
          : null;
        setCurrentPlaying({ ...nextQueued, queue: nextQueue });
      }
      setQueues(newQueues);
      setRScores(0);
      setFinalScore(false);
    }, 15000);
  };

  const opts = {
    height: "690",
    width: "900",
    playerVars: {
      autoplay: 1,
    },
  };

  const onError = (error: any) => {
    console.error("YouTube Player Error:", error);
    const removeErrorQueue: any = queues?.filter(
      (item) => item.queue !== currentPlaying?.queue
    );
    setQueues(removeErrorQueue);
    setCurrentPlaying(null);
  };

  return (
    <div className="w-full px-4">
      {currentPlaying && rScores <= 0 ? (
        <YouTube
          videoId={currentPlaying.videoId}
          onReady={onReady}
          onError={onError}
          onEnd={onEnd}
          opts={opts}
        />
      ) : (
        <div className="flex w-full justify-center flex-col">
          <span className="flex justify-center opacity-[0.9]">
            <MusicIcon />
          </span >
          <span className="italic text-base flex justify-center text-gray-500">Nothing to play...</span>
        </div>
      )}
    </div>
  );
};

export default TYPlayer;
