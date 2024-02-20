import { useState } from "react";
import YouTube from "react-youtube";
import { isNumber } from "lodash";
import { useTYPlayerStore } from "../store/YTP";
import useScore from "../hooks/useScore";
import MusicIcon from "./icons/music";
import TroubleIcon from "./icons/trouble";

const TYPlayer = () => {
  const [error, setError] = useState<any>(null);
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
    const newQueues: any = queues
      ?.filter((item) => item.queue !== currentPlaying?.queue)
      .map((i: any, key: any) => ({ ...i, queue: key }));
    onRollScoreBoard();
    setTimeout(() => {
      setQueues(newQueues);
      setRScores(0);
      setFinalScore(false);
      if (nextQueue) {
        setCurrentPlaying(newQueues[0]);
      }
    }, 23000);
  };

  const opts = {
    height: "690",
    width: "900",
    playerVars: {
      autoplay: 1,
    },
  };

  const onError = (error: any) => setError(error);

  const playNext = () => {
    const removeErrorQueue: any = queues
      ?.filter((item) => item.queue !== currentPlaying?.queue)
      .map((i: any, key: any) => ({ ...i, queue: key }));
    setQueues(removeErrorQueue);
    setCurrentPlaying(removeErrorQueue[0]);
    setError(null);
  };

  return (
    <div className="w-full px-4">
      {currentPlaying && rScores <= 0 && !error ? (
        <YouTube
          videoId={currentPlaying.videoId}
          onReady={onReady}
          onError={onError}
          onEnd={onEnd}
          opts={opts}
        />
      ) : (
        <div className="flex w-full justify-center flex-col">
          <span className="flex justify-center opacity-[0.9] w-full">
            {error ? <TroubleIcon /> : <MusicIcon />}
          </span>
          <span className="italic text-base flex justify-center text-gray-500">
            {error ? (
              <span className="flex flex-col justify-center">
                {`OH NO! LOOKS LIKE WE'RE HAVING TROUBLE PLAYING...`}
                <span className="flex gap-2 justify-center">
                  <span
                    onClick={playNext}
                    className="px-4 py-2 flex justify-center rounded bg-blue-950 text-white hover:bg-blue-600 cursor-pointer"
                  >
                    Play next song
                  </span>
                </span>
              </span>
            ) : (
              "Nothing to play..."
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default TYPlayer;
