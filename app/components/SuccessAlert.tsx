import { useTYPlayerStore } from "../store/YTP";

const SuccessAlert = () => {
  const { successReservation } = useTYPlayerStore();
  if (!successReservation) return;
  return (
    <span className="rounded right-4 top-4 p-2 text-sm fixed bg-green-200 border-green-300 text-gray-600">
      Reserved!{" "}
      <span
        className="font-semibold italic"
        dangerouslySetInnerHTML={{ __html: successReservation?.snippet.title }}
      />
    </span>
  );
};

export default SuccessAlert;
