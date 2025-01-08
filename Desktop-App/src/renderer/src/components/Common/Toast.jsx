import { useContext } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import { ToastContext } from "../../context/ToastProvider";

const Toast = () => {
  const { toast } = useContext(ToastContext);

  return (
    <div className="fixed bottom-0 right-0 m-4">
      <Alert
        icon={
          toast.type === "success" ? <CheckIcon fontSize="inherit" /> : null
        }
        severity={toast.type}
        sx={{ width: "300px" }}
      >
        {toast.message}
      </Alert>
    </div>
  );
};

export default Toast;
