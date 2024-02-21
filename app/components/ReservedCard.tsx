import CloseV1 from "./icons/closev1";

const ReservedCard = () => {
  return (
    <div className="flex bg-[#EEEEEE]  p-2 w-[10rem]">
      <div className="flex flex-col">
        <span className="font-semibold">Caught in the middle</span>
        <span className="text-sm text-[#615E5E]">AI</span>
      </div>
      <span className="ml-2 cursor-pointer hover:shadow-sm justify-end">
        <CloseV1 />
      </span>
    </div>
  );
};

export default ReservedCard;
