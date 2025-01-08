import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { logo } from "../../assets";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="flex items-center px-4 bg-gray-800 text-white fixed w-full top-0 left-0 z-10 border-b">
      <button onClick={toggleSidebar} className="lg:hidden text-2xl">
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      <img className="h-16 m-auto object-contain" src={logo} />
    </header>
  );
};

export default Header;
