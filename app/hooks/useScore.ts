import { useState } from "react";
import { useTYPlayerStore } from "../store/YTP";

const useScore = () => {
  const scores = [...Array(100)].map((_, key) => key + 1);
  const { rScores, setRScores, setFinalScore } = useTYPlayerStore();

  const randomScore = () => {
    const rscr = Math.floor(Math.random() * scores.length);
    setRScores(scores[rscr]);
  };

  const setDeceleratingTimeout = (
    callback: () => void,
    factor: number,
    times: number
  ) => {
    var internalCallback = (function (t, counter) {
      return function () {
        if (--t > 0) {
          window.setTimeout(internalCallback, ++counter * factor);
          callback();
        }
      };
    })(times, 0);

    window.setTimeout(internalCallback, factor);
  };

  const onRollScoreBoard = () => {
    setDeceleratingTimeout(
      function () {
        randomScore();
      },
      5,
      50
    );

    setTimeout(function () {
      setFinalScore(true);
    }, 8000);
  };

  return onRollScoreBoard;
};

export default useScore;
