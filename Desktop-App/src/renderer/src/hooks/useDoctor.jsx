import axios from "axios";
import useToast from "./useToast";

const useDoctor = () => {
  const { showToast } = useToast();

  const addDoctor = async (doctor) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/doctors/add",
        {
          doctor: doctor,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        showToast("Doctor added successfully!", "success");
      } else {
        showToast("There was an error adding the doctor!", "error");
        return;
      }
    } catch (error) {
      showToast("There was an error adding the doctor!", "error");
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors/all");

      if (response.status === 200) {
        return response.data.result;
      }
    } catch (error) {
      showToast("There was an error fetching the doctors!", "error");
    }
  };

  return {
    addDoctor,
    fetchDoctors,
  };
};

export default useDoctor;
