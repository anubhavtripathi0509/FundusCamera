import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useDoctor from "../hooks/useDoctor";
import LoadingOverlay from "../components/Common/LoadingOverlay";

const AddDoctorPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    speciality: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);

  const { addDoctor } = useDoctor();

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await addDoctor(formData);
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay message="Adding Doctor..." />;
  }

  return (
    <div className="m-4 p-4 bg-white rounded-md shadow-md">
      <div className="flex flex-row">
        <Link to="/" className="flex items-center gap-2">
          <ArrowBackIcon />
        </Link>
        <h1 className="text-2xl ml-2">Add Doctor</h1>
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
              htmlFor="speciality"
              className="block text-sm font-medium text-gray-700"
            >
              Speciality
            </label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
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
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-gray-700 text-white rounded-md"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctorPage;
