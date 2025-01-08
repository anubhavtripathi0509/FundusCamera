import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import Title from "../components/Common/Title";
import usePatients from "../hooks/usePatients";
import LoadingOverlay from "../components/Common/LoadingOverlay";

const PatientDetailsPage = () => {
  const navigate = useNavigate();
  const id = useParams().id;

  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  const { fetchPatient } = usePatients();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPatient(id);
      setPatient(data.patient);
      setDoctor(data.doctor);
      setImages(data.images);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddImageClick = () => {
    navigate(`/camera/${id}`);
  };

  const handleImageClick = (image) => {
    const imageTimestamp = image.slice(0, -5);
    navigate(`/output/${id}/${imageTimestamp}`);
  };

  const convertTimeStampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
  };

  if (loading) {
    return <LoadingOverlay message={"Loading Patient..."} />;
  }

  return (
    <section className="m-4 p-4 bg-white rounded-md shadow-md flex flex-col">
      {patient ? (
        <>
          <Title title="Patient Details" />
          <h2 className="text-xl mt-4">
            {patient.first_name} {patient.last_name}
          </h2>
          <span className="text-md mt-2">
            {patient.dob} / {patient.gender}
          </span>
          <div className="flex flex-row py-4 border-b">
            <span className="text-md w-1/2">{patient.exam_code}</span>
            <h1 className="text-md w-1/2 text-end">
              {doctor ? `${doctor.first_name} ${doctor.last_name}` : ""}
            </h1>
          </div>
          <span className="text-md mt-4 font-bold">Images</span>
          <div className="grid grid-cols-3 gap-1 mt-2">
            <div
              className="flex flex-col h-60 w-60 items-center justify-center bg-gray-300 rounded cursor-pointer"
              onClick={handleAddImageClick}
            >
              <AddAPhotoIcon fontSize="large" className="text-gray-600" />
              <span className="text-md mt-2">Add Image</span>
            </div>
            {Object.keys(images).map((image) => {
              const imageTimestamp = image.slice(0, -5); // Remove the '.jpeg' extension
              const formattedDate = convertTimeStampToDate(Number(imageTimestamp));
              return (
                <div
                  key={image}
                  className="flex flex-col h-60 w-60 items-center justify-center bg-gray-300 rounded cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={images[image]}
                    alt="Patient"
                    className="h-60 w-60 object-cover rounded-t"
                  />
                  <span className="text-md my-2">{formattedDate}</span>
                </div>
              );
            })}
          </div>
          <hr className="my-4" />
          <div className="flex flex-row gap-4">
            <span className="text-md">Some Text</span>
          </div>
          <hr className="my-4" />
          <div className="flex flex-row gap-4">
            <span className="text-md">Some Text</span>
          </div>
          <hr className="my-4" />
          <div className="flex flex-row gap-4">
            <span className="text-md">Some Text</span>
          </div>
        </>
      ) : (
        <Title title="No Patient Selected" />
      )}
    </section>
  );
};

export default PatientDetailsPage;
