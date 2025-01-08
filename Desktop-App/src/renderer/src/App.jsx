import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

import HomePage from "./pages/HomePage";
import CheckRecordsPage from "./pages/CheckRecordsPage";
import AddPatientPage from "./pages/AddPatientPage";
import CameraPage from "./pages/CameraPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import OutputPage from "./pages/OutputPage";
import UserManualPage from "./pages/UserManualPage";
import AboutUsPage from "./pages/AboutUsPage";
import AddDoctorPage from "./pages/AddDoctorPage";

import Sidebar from "./components/Common/Sidebar";
import Toast from "./components/Common/Toast";
import Header from "./components/Common/Header";

import { ToastProvider } from "./context/ToastProvider";

import "./index.css";

const ContextWrapper = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

ContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="flex">
        <ContextWrapper>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <div
            className={`flex flex-col flex-grow transition-transform 
            ${isSidebarOpen ? "ml-56" : "ml-0"} lg:ml-56`}
          >
            <Header
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <Toast />
            <div className="flex-grow mt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/patients" element={<CheckRecordsPage />} />
                <Route path="/add-patient" element={<AddPatientPage />} />
                <Route path="/add-doctor" element={<AddDoctorPage />} />
                <Route path="/camera/:id" element={<CameraPage />} />
                <Route
                  path="/patient-details/:id"
                  element={<PatientDetailsPage />}
                />
                <Route path="/output/:id/:image" element={<OutputPage />} />
                <Route path="/user-manual" element={<UserManualPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
              </Routes>
            </div>
          </div>
        </ContextWrapper>
      </div>
    </BrowserRouter>
  );
};

export default App;
