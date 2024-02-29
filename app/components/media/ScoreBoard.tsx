/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect } from "react";
import { useTYPlayerStore } from "../../store/YTP";
import clsx from "clsx";
import Confetti from "react-confetti";

const ScoreBoard = () => {
  const { rScores, finalScore } = useTYPlayerStore();
  if (!rScores) return null;
  const low = rScores < 50;
  const mid = rScores >= 50 && rScores < 80;
  const high = rScores > 80;

  const voice = low ? "low.mp3" : mid ? "high.mp3" : "high.mp3";
  const espVoiceOver = high ? "xhigh.mp3" : rScores === 69 ? "yamete.mp3" : false;
  
  useEffect(()=>{
    window.addEventListener('load', function () {
      var audioCtx = new (window.AudioContext || window.AudioContext)();
      var source = audioCtx.createBufferSource();
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'audio-autoplay.wav');
      xhr.responseType = 'arraybuffer';
      xhr.addEventListener('load', function (r) {
          audioCtx.decodeAudioData(
                  xhr.response, 
                  function (buffer) {
                      source.buffer = buffer;
                      source.connect(audioCtx.destination);
                      source.loop = false;
                  });
          source.start(0);
      });
      xhr.send();
  });
  },[])


  return (
    <div className="bg-black z-20 bg-opacity-80 absolute w-full h-max flex justify-center">
      {finalScore && (
        <>
          {espVoiceOver && (
            <audio controls autoPlay className="opacity-0 absolute">
              <source src={`/${espVoiceOver}`} type="audio/mpeg"></source>
            </audio>
          )}
          <audio controls autoPlay className="opacity-0 absolute">
            <source src={`/${voice}`} type="audio/mpeg"></source>
          </audio>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </>
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
    </div>
  );
};

export default ScoreBoard;
