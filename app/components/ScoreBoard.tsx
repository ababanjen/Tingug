"use client";
import { useTYPlayerStore } from "../store/YTP";
import clsx from "clsx";
import Confetti from "react-confetti";

const ScoreBoard = () => {
  const { rScores, finalScore } = useTYPlayerStore();
  if (!rScores) return null;
  return (
    <div className="bg-black z-10 bg-opacity-40 absolute w-full h-max flex justify-center">
      {finalScore && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <span
        className={clsx({
          "text-[20rem] font-semibold  m-[8rem]": true,
          "text-red-500": rScores < 50,
          "text-blue-500": rScores >= 50 && rScores < 80,
          "text-green-500": rScores > 80,
        })}
      >
        {rScores}
      </span>
      <span></span>
    </div>
  );
};

export default ScoreBoard;
