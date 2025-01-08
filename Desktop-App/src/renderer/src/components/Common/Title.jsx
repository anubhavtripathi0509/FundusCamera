import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Title = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2">
        <ArrowBackIcon />
      </button>
      <h1 className="text-2xl ml-2">{title}</h1>
    </div>
  );
};

export default Title;
