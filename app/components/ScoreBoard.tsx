"use client";
import { useTYPlayerStore } from "../store/YTP";
import clsx from "clsx";
import Confetti from "react-confetti";

const ScoreBoard = () => {
  const { rScores, finalScore } = useTYPlayerStore();
  if (!rScores) return null;
  const low = rScores < 50;
  const mid = rScores >= 50 && rScores < 80;
  const high = rScores > 80;

  const voice = low ? "low.m4a" : mid ? "mid.m4a" : "high.m4a";
  return (
    <div className="bg-black z-10 bg-opacity-80 absolute w-full h-max flex justify-center">
      {finalScore && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <span
        className={clsx({
          "text-[20rem] font-semibold  m-[8rem]": true,
          "text-red-500": low,
          "text-blue-500": mid,
          "text-green-500": high,
        })}
      >
        {rScores}
      </span>
      {finalScore && (
        <>
          <audio controls autoPlay className="opacity-0 absolute">
            <source src={`/${voice}`} type="audio/mpeg"></source>
          </audio>
          <audio controls autoPlay className="opacity-0 absolute">
            <source src={'/score.mp3'} type="audio/mpeg"></source>
          </audio>
        </>
      )}
    </div>
  );
};

export default ScoreBoard;
