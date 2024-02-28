"use client";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import PlayerContainer from "../components/media/PlayerContainer";
import ScoreBoard from "../components/media/ScoreBoard";
import SearhContainer from "../components/media/SearchContainer";
import SuccessAlert from "../components/common/SuccessAlert";

const Media = () => {
  return (
    <main className="flex flex-col overflow-hidden relative">
      <ScoreBoard />
      <SuccessAlert />
      <Header />
      <div className="flex flex-col lg:flex-row gap-2 m-4">
        <PlayerContainer />
        <SearhContainer />
      </div>
      <Footer />
    </main>
  );
};

export default Media;
