import axios from "axios";
import Input from "../common/formComponents/Input";
import { searchAPI } from "@/app/helpers/api";
import { useEffect, useState } from "react";
import Image from "next/image";

const Section2 = () => {
  const [top3, setTop3] = useState<any[] | null>(null);

  const fetchYT = async () => {
    const res = await axios({
      method: "GET",
      url: searchAPI("most played", 3),
    });
    setTop3(res.data.items);
  };

  useEffect(() => {
    fetchYT();
  }, []);

  return (
    <section className="bg-faded-gray bg-opacity-20  px-4 py-4 lg:px-10 lg:py-8">
      <div className="flex flex-col gap-4">
        <div className="flex  lg:px-32 ">
          <Input
            placeholder="Search your favorite karaoke song"
            value={""}
            className="w-full rounded-full"
            onChange={() => null}
          />
        </div>
        <div className="flex flex-col gap-4  lg:px-32">
          <span className="font-semibold flex justify-center text-based capitalize">
            Top 3 most played
          </span>
          <div className="flex gap-8 justify-center">
            {top3?.map((item) => (
              <div key={item.etag} className="overflow-hidden rounded w-60  hover:shadow-inner">
                <Image
                  width={100}
                  height={100}
                  className="w-full"
                  loader={() => item.snippet.thumbnails.default.url}
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
