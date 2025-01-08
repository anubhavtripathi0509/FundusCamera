import { useContext } from "react";
import { ToastContext } from "../context/ToastProvider";

const useToast = () => {
  const { setToast } = useContext(ToastContext);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return {
    showToast,
  };
};

export default useToast;
