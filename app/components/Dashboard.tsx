"use client";
import Header from "./Header";
import PlayerContainer from "./PlayerContainer";
import ScoreBoard from "./ScoreBoard";
import SearhContainer from "./SearchContainer";
import SuccessAlert from "./SuccessAlert";

const Dashboard = () => {

  return (
    <main className="flex flex-col overflow-hidden relative">
      <ScoreBoard />
      <SuccessAlert />
      <Header />
      <div className="flex gap-2 m-4">
        <PlayerContainer />
        <SearhContainer />
      </div>
    </main>
  );
};

export default Dashboard;
