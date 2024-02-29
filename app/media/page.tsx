"use client";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ScoreBoard from "../components/media/ScoreBoard";
import SuccessAlert from "../components/common/SuccessAlert";
import TYPlayer from "../components/media/TYPlayer";
import ReservedContainer from "../components/media/ReservedContainer";
import Search from "../components/media/Search";

const Media = () => {
  return (
    <main className="flex flex-col relative">
      <ScoreBoard />
      <SuccessAlert />
      <Header />
      <div className="flex flex-col gap-2 py-4 px-6">
        <div className="rounded overflow-hidden">
          <TYPlayer />
        </div>
        <ReservedContainer />
        <Search />
      </div>
      <Footer />
    </main>
  );
};

export default Media;
