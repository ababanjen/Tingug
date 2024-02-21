"use client";
import Header from "./Header";
import PlayerContainer from "./PlayerContainer";
import SearhContainer from "./SearchContainer";

const Dashboard = () => {
  return (
    <main className="flex flex-col">
      <Header />
      <div className="flex gap-2 m-4">
        <PlayerContainer />
        <SearhContainer />
      </div>
    </main>
  );
};

export default Dashboard;
