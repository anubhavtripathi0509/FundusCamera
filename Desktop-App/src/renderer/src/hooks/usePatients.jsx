import axios from "axios";
import useToast from "./useToast";

const usePatients = () => {
  const { showToast } = useToast();

  const addPatient = async (patient) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/patients/add",
        {
          patient: patient,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        showToast("Patient added successfully!", "success");
      } else {
        showToast("There was an error adding the patient!", "error");
        return;
      }
    } catch (error) {
      showToast("There was an error adding the patient!", "error");
    }
  };

  async function fetchPatient(id) {
    try {
      const response = await axios.get(`http://localhost:5000/patients/get`, {
        params: {
          patient_id: id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const [doctorResponse, imagesResponse] = await Promise.all([
        axios.get(`http://localhost:5000/doctors/get`, {
          params: {
            doc_id: response.data.result.doc_id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }),

        axios.get(`http://localhost:5000/images/all`, {
          params: {
            patient_id: id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);

      return {
        patient: response.data.result,
        doctor: doctorResponse.data.result,
        images: imagesResponse.data.result,
      };
    } catch (error) {
      showToast("There was an error fetching the patient!", "error");
    }
  }

  const addImage = async (image, id) => {
    axios
      .post(
        `http://localhost:5000/upload/image`,
        {
          patient_id: id,
          image: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(() => {
        showToast("Image added successfully!", "success");
      })
      .catch(() => {
        showToast("There was an error adding the image!", "error");
      });
  };

  const searchPatients = async (searchQuery) => {
    try {
      let response;
      if (searchQuery.trim() === "") {
        response = await axios.get("http://localhost:5000/patients/all", {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await axios.get("http://localhost:5000/patients/search", {
          params: {
            patient_name: searchQuery,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      return response.data.result;
    } catch (error) {
      showToast("There was an error fetching the patients!", "error");
    }
  };

  const deletePatient = async (id) => {
    try {
      let response = await axios.delete(
        "http://localhost:5000/patients/delete",
        {
          params: {
            patient_id: id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        showToast("Patient deleted successfully!", "success");
      } else {
        showToast("There was an error deleting the patient!", "error");
      }
    } catch (error) {
      showToast("There was an error deleting the patient!", "error");
    }
  };

  const fetchImage = async (patient_id, image_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/images/get`, {
        params: {
          patient_id: patient_id,
          image_id: image_id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.result;
    } catch (error) {
      showToast("There was an error fetching the image!", "error");
    }
  };

  return {
    fetchPatient,
    searchPatients,
    addImage,
    deletePatient,
    addPatient,
    fetchImage,
  };
};

export default usePatients;
