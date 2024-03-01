import Homepage from "./components/home/Homepage";
import { searchAPI } from "@/app/helpers/api";

export const getData = async () => {
  try {
    const res = await fetch(searchAPI("", 3));
    return res.json();
  } catch (err) {
    return err;
  }
};

const Home = async () => {
  const top3 = await getData();

  return <Homepage top3Search={top3.items} />;
};
export default Home;
