import YouTube from "react-youtube";
import { isNumber } from "lodash";
import { useTYPlayerStore } from "../store/YTP";

const TYPlayer = () => {
  const { currentPlaying, setCurrentPlaying, queues, setQueues } =
    useTYPlayerStore();

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
    if (nextQueue) {
      const nextQueued: any = queues
        ? queues?.find((_, key) => key === nextQueue)
        : null;
      console.log({ nextQueued });
      setCurrentPlaying({ ...nextQueued, queue: nextQueue });
    }
    setQueues(newQueues);
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
    <div>
      {currentPlaying && (
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
