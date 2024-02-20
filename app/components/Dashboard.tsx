"use client";
import TYPlayer from "./TYPlayer";
import ReservedList from "./ReservedList";
import ScoreBoard from "./ScoreBoard";

const Dashboard = () => {
  return (
    <div className="relative">
      <ScoreBoard />
      <div className="flex gap-2 flex-col lg:flex-row justify-between p-5">
        <TYPlayer />
        <ReservedList />
      </div>
    </div>
  );
};

export default Dashboard;
