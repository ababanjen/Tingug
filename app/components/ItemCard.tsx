import Image from "next/image";
import HeartIcon from "./icons/heart";

const ItemCard = () => {
  return (
    <div className="bg-[#EEEEEE] hover:bg-[#D9D9D9] px-4 py-2 gap-2 flex w-full">
      <div className="overflow-hidden  flex w-40">
        <Image
          width={100}
          height={100}
          src="https://i.ytimg.com/vi/4bcJn-Xn580/maxresdefault.jpg"
          alt="thumbnail"
          loader={() => "https://i.ytimg.com/vi/4bcJn-Xn580/maxresdefault.jpg"}
        />
      </div>
      <div className="flex flex-col gap-2 w-[-webkit-fill-available]">
        <span className="flex flex-col">
          <span className="font-semibold text-sm line-clamp-1">
            Just once - Karaoke
          </span>
          <span className="text-xs text-[#615E5E]">A1</span>
        </span>
        <div className="flex items-end justify-between w-full">
          <a className="bg-[#1A3271] px-4 p-1 text-sm cursor-pointer hover:bg-[#162C64] text-white">
            Reserve
          </a>
          <span className="cursor-pointer ">
            <HeartIcon active />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
