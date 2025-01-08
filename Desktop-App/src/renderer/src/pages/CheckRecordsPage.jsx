import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Title from "../components/Common/Title";
import usePatients from "../hooks/usePatients";
import LoadingOverlay from "../components/Common/LoadingOverlay";

const CheckRecordsPage = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const { searchPatients, deletePatient } = usePatients();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchPatients(searchQuery);
      setPatients(data);
      setLoading(false);
    };

    fetchData();
  }, [searchQuery]);

  const handlePatientClick = (patient) => {
    navigate(`/patient-details/${patient.id}`);
  };

  if (loading) {
    return <LoadingOverlay message={"Loading Patients..."} />;
  }

  return (
    <div className="m-4 p-4 bg-white rounded-md shadow-md">
      <Title title="Patient Records" />
      <div className="flex items-center my-4 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-3/4"
        />
        <Link
          to="/add-patient"
          className="p-2 bg-gray-300 text-black rounded-md w-1/4"
        >
          Add Patient
        </Link>
      </div>
      {!patients || patients.length === 0 ? (
        <p>No patient records found.</p>
      ) : (
        <div className="space-y-4">
          {patients.map((patient, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm flex items-center justify-between cursor-pointer"
              onClick={() => handlePatientClick(patient)}
            >
              <div className="w-1/3">
                <h3 className="text-lg font-semibold">
                  {patient.first_name} {patient.last_name}
                </h3>
                <p className="text-sm text-gray-500">{patient.exam_code}</p>
                <p className="text-sm text-gray-500">
                  {patient.prescribing_doctor}
                </p>
              </div>
              <div className="text-sm text-gray-500 w-1/3">
                <p>{new Date(patient.dob).toLocaleDateString()}</p>
                <p>{patient.gender}</p>
              </div>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await deletePatient(patient.id);
                  setPatients(patients.filter((p) => p.id !== patient.id));
                }}
                className="p-2 bg-red-500 w-1/5 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckRecordsPage;
