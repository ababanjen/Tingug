import axios from "axios";
import { useTYPlayerStore } from "../store/YTP";
import { searchAPI } from "../helpers/api";

const useOnSearch = () => {
  const { setList } = useTYPlayerStore();
  const fetchYT = async (search: string, limit?: number) => {
    try {
      const res = await axios({
        method: "GET",
        url: searchAPI(search, limit ?? 50),
      });
      setList(res.data.items);
      return res;
    } catch (err) {
      return err;
    }
  };

  return fetchYT;
};

export default useOnSearch;
