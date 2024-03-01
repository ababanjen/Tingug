"use client";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";

export type HomepageTypes = {
  top3Search: any[];
};
const Homepage = ({ top3Search }: HomepageTypes) => {

  return (
    <main className="realtive bg-[url('/bg.png')] bg-no-repeat bg-cover">
      <Header />
      <div className="flex flex-col">
        <Section1 />
        <Section2 top3Search={top3Search} />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
      <Footer />
    </main>
  );
};

export default Homepage;
