import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

import useDoctor from "../hooks/useDoctor";
import usePatients from "../hooks/usePatients";
import LoadingOverlay from "../components/Common/LoadingOverlay";

const AddPatientPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    contact: "",
    exam_code: "",
    doc_id: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { fetchDoctors } = useDoctor();
  const { addPatient } = usePatients();

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDoctors();
      setDoctors(data);
    };

    fetchData();
  }, [fetchDoctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await addPatient(formData);
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay message={"Adding Patient..."} />;
  }

  return (
    <div className="m-4 p-4 bg-white rounded-md shadow-md">
      <div className="flex flex-row">
        <Link to="/" className="flex items-center gap-2">
          <ArrowBackIcon />
        </Link>
        <h1 className="text-2xl ml-2">Add Patient</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="number"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="exam_code"
              className="block text-sm font-medium text-gray-700"
            >
              Exam Code
            </label>
            <input
              type="number"
              id="exam_code"
              name="exam_code"
              value={formData.exam_code}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="doc_id"
              className="block text-sm font-medium text-gray-700"
            >
              Prescribing Doctor
            </label>
            <select
              id="doc_id"
              name="doc_id"
              value={formData.doc_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {doctors &&
                doctors.map((doctor) => (
                  <option key={doctor.doc_id} value={doctor.doc_id}>
                    {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-gray-700 text-white rounded-md"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatientPage;
