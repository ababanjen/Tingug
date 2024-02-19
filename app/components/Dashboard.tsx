"use client";
import TYPlayer from "./TYPlayer";
import Search from "./Search";
import ReservedList from "./ReservedList";
import { useTYPlayerStore } from "../store/YTP";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import ScoreBoard from "./ScoreBoard";

const Dashboard = () => {
  const { rScores } = useTYPlayerStore();
  return (
    <div className="flex gap-2 relative">
      <ScoreBoard />
      <div className="flex flex-col gap-2">
        <Search />
        <TYPlayer />
      </div>
      <ReservedList />
    </div>
  );
};

export default Dashboard;
