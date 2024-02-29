import { useEffect } from "react";

const useOutsideClick = (
  onHandleClick: (event: any) => void,
  ref: any,
  dependency?: any
) => {
  useEffect(() => {
    window.addEventListener("mousedown", onHandleClick);

    return () => {
      window.removeEventListener("mousedown", onHandleClick);
    };
  }, [ref, dependency]);
};

export default useOutsideClick;
