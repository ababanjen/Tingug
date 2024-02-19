import YouTube from "react-youtube";
import { isNumber } from "lodash";
import { useTYPlayerStore } from "../store/YTP";
import useScore from "../hooks/useScore";

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
    height: "390",
    width: "640",
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
    <div className="">
      {currentPlaying && rScores <= 0 && (
        <YouTube
          videoId={currentPlaying.videoId}
          onReady={onReady}
          onError={onError}
          onEnd={onEnd}
          opts={opts}
        />
      )}
    </div>
  );
};

export default TYPlayer;
