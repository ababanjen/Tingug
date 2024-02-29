import { useTYPlayerStore } from "../../store/YTP";

const SuccessAlert = () => {
  const { successReservation } = useTYPlayerStore();
  if (!successReservation) return;
  return (
    <span className="z-20 rounded right-4 bottom-4  p-2 text-sm fixed bg-black text-white bg-opacity-80">
      Reserved!{" "}
      <span
        className="font-semibold italic"
        dangerouslySetInnerHTML={{ __html: successReservation?.snippet.title }}
      />
    </span>
  );
};

export default SuccessAlert;
