import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { isNumber } from "lodash";
import { useTYPlayerStore } from "../../store/YTP";
import useScore from "../../hooks/useScore";
import MusicIcon from "../icons/music";
import TroubleIcon from "../icons/trouble";
import clsx from "clsx";

const TYPlayer = () => {
  const [error, setError] = useState<any>(null);
  const [opts, setOpts] = useState({});
  const {
    currentPlaying,
    setCurrentPlaying,
    queues,
    setQueues,
    rScores,
    setRScores,
    setFinalScore,
    expandSearchBar,
    setExpandSearch,
    skipScore,
  } = useTYPlayerStore();
  const onRollScoreBoard = useScore();

  const onReady = (event: any) => {
    // Access the player instance
    const player = event.target;
    player.playVideo();
  };

  const onEnd = () => {
    window.scrollTo(0, 0);
    const timeOut = skipScore ? 1000 : 20000;
    const nextQueue = isNumber(currentPlaying?.queue)
      ? currentPlaying?.queue + 1
      : null;
    const newQueues: any = queues
      ?.filter((item) => item.queue !== currentPlaying?.queue)
      .map((i: any, key: any) => ({ ...i, queue: key }));
    !skipScore && onRollScoreBoard();
    setTimeout(() => {
      setQueues(newQueues);
      setRScores(0);
      setFinalScore(false);
      localStorage.setItem("queues", JSON.stringify(newQueues));
      if (nextQueue) {
        setCurrentPlaying(newQueues[0]);
      }
    }, timeOut);
  };

  useEffect(() => {
    setOpts({
      playerVars: {
        autoplay: 1,
      },
    });
  }, []);

  const onError = (error: any) => setError(error);

  const playNext = () => {
    const removeErrorQueue: any = queues
      ?.filter((item) => item.queue !== currentPlaying?.queue)
      .map((i: any, key: any) => ({ ...i, queue: key }));
    setQueues(removeErrorQueue);
    setCurrentPlaying(removeErrorQueue[0]);
    setError(null);
  };

  const handleExpand = () => {
    !error && setExpandSearch(true);
  };

  return (
    <div className="w-full">
      {currentPlaying && rScores <= 0 && !error ? (
        <YouTube
          videoId={currentPlaying.videoId}
          onReady={onReady}
          onError={onError}
          onEnd={onEnd}
          opts={opts}
          iframeClassName="w-full lg:h-[40rem]"
        />
      ) : (
        <div
          className={clsx({
            "flex w-full justify-center flex-col p-14 lg:h-[40rem] bg-white rounded":
              true,
            "cursor-pointer": expandSearchBar,
          })}
          onClick={handleExpand}
        >
          <span className="flex justify-center opacity-[0.5] w-full">
            {error ? <TroubleIcon /> : <MusicIcon />}
          </span>
          <span className="italic text-base flex justify-center py-6">
            {error ? (
              <span className="flex flex-col justify-center gap-2">
                <span className=" opacity-15 uppercase text-xs">{`OH NO! LOOKS LIKE WE'RE HAVING TROUBLE PLAYING...`}</span>
                <span className="flex gap-2 justify-center">
                  <span
                    onClick={playNext}
                    className="px-4 text-xs py-2 font-light flex justify-center text-white mb-3 rounded bg-main  hover:bg-blue-600 cursor-pointer"
                  >
                    Play next song
                  </span>
                </span>
              </span>
            ) : (
              <span className="text-xs flex font-light justify-center uppercase opacity-15">
                {`Looks like you haven't reserved any song`}
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default TYPlayer;
