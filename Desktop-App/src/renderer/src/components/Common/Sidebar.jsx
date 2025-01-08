import { NavLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = ({ isSidebarOpen, onClose }) => {
  return (
    <section
      className={`fixed top-0 left-0 w-56 h-screen bg-gray-800 text-white transition-transform
        ${isSidebarOpen ? "block" : "hidden"} lg:block border-r`}
    >
      <div className="flex flex-col h-full bg-gray-800 text-white">
        <div className="flex justify-between items-center p-4 bg-gray-800">
          <h1 className="text-3xl font-bold">NetraX</h1>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        <ul className="mt-10 space-y-3">
          <li>
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex cursor-pointer space-x-2 py-4 px-10 ${isActive ? "text-light" : "text-gray-300"
                } hover:bg-slate-600`
              }
            >
              <HomeIcon className="h-6 w-6 mb-2" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/patients"
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex cursor-pointer space-x-2 py-4 px-10 ${isActive ? "text-light" : "text-gray-300"
                } hover:bg-slate-600`
              }
            >
              <ContactPageIcon className="h-6 w-6 mb-2" />
              <span>Patients</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-manual"
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex cursor-pointer space-x-2 py-4 px-10 ${isActive ? "text-light" : "text-gray-300"
                } hover:bg-slate-600`
              }
            >
              <HelpCenterIcon className="h-6 w-6 mb-2" />
              <span>User Manual</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex cursor-pointer space-x-2 py-4 px-10 ${isActive ? "text-light" : "text-gray-300"
                } hover:bg-slate-600`
              }
            >
              <SettingsIcon className="h-6 w-6 mb-2" />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex cursor-pointer space-x-2 py-4 px-10 ${isActive ? "text-light" : "text-gray-300"
                } hover:bg-slate-600`
              }
            >
              <InfoIcon className="h-6 w-6 mb-2" />
              <span>About</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
