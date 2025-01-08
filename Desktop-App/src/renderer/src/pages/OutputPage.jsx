import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import usePatients from "../hooks/usePatients";
import Title from "../components/Common/Title";
import LoadingOverlay from "../components/Common/LoadingOverlay";

const OutputPage = () => {
  const id = useParams().id;
  const image = useParams().image;

  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState(null);

  const { fetchImage } = usePatients();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchImage(id, image);
      setOutput(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const convertTimeStampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
};

  if (loading) {
    return <LoadingOverlay message={"Loading Output..."} />;
  }

  return (
    <div className="m-4 p-4 bg-white rounded-md shadow-md flex flex-col">
      <Title title="Output" />
      <div className="flex flex-row mt-4 py-1 w-1/2">
        <span className="text-md w-1/2">Patinet MRN:</span>
        <h1 className="text-md w-1/2 text-start">1212313</h1>
      </div>
      <div className="flex flex-row py-1 w-1/2">
        <span className="text-md w-1/2">Patinet Name:</span>
        <h1 className="text-md w-1/2 text-start">Some Name</h1>
      </div>
      <div className="flex flex-row py-1 w-1/2">
        <span className="text-md w-1/2">Date:</span>
        <h1 className="text-md w-1/2 text-start">
          {convertTimeStampToDate(Number(image))}
        </h1>
      </div>
      <div className="flex flex-row items-center py-1 w-1/2 my-4">
        <div className="h-3 w-3 bg-red-600 rounded-full" />
        <h1 className="text-xl font-bold text-center ml-2">Output</h1>
      </div>
      <div className="flex flex-col h-40 w-40 items-center justify-center bg-gray-300 rounded">
        <img src={output} alt="output" className="h-40 w-40" />
      </div>
      <button className="bg-blue-500 mt-6 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        See Full Report
      </button>
      <span className="text-md my-4 text-center">
        Warning: This is a sample output. Please consult a doctor for accurate
        diagnosis.
      </span>
      <div className="flex flex-col h-40 w-full items-center justify-center bg-gray-300 rounded">
        <span className="text-md mt-2">Some Text</span>
      </div>
    </div>
  );
};

export default OutputPage;
