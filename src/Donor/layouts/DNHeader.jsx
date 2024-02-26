import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState, truncate } from "../../store";
import { connectWallet } from "../../BlockchainService";

// React icons used in header of manufacturers dashboard
import { IoMenuSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdLightMode, MdLogout } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
// import { IoSettingsSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const DNHeader = ({ isOpen, toggleSidebar, isAuth }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.theme);
  const themeColor = theme === "dark" ? "light" : "dark";
  const darken = theme === "dark" ? true : false;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(themeColor);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [themeColor, theme]);

  const toggleLight = () => {
    const root = window.document.documentElement;
    root.classList.remove(themeColor);
    root.classList.add(theme);
    setTheme(themeColor);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    // Manufacturer Header start
    <header
      className={`bg-gray-100 shadow-md text-gray-900 p-4 transition-all ease-in-out duration-300 dark:bg-[#212936] dark:text-blue-500`}
    >
      {/* // <header className={`bg-gray-100 shadow-md text-gray-900 p-4 transition-transform transform ease-in-out duration-300 dark:bg-[#212936] dark:text-blue-500`}> */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4 items-center">
          <button onClick={toggleSidebar} className="text-blue-600">
            {!isOpen ? <IoMenuSharp /> : <RxCross2 />}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {darken ? (
            <MdLightMode
              onClick={toggleLight}
              className="cursor-pointer"
              size={25}
            />
          ) : (
            <FaMoon onClick={toggleLight} className="corso-pointer" size={25} />
          )}

          {connectedAccount ? (
            <button
              className="hidden md:block px-4 py-1.5 bg-blue-600 font-medium text-sm md:text-xs text-white leading-tight uppercase rounded-full shadow-md shadow-gray-400
            hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 
            dark:bg-transparent dark:shadow-transparent dark:active:bg-blue-500 dark:active:text-white dark:hover:text-gray-300"
            >
              {truncate(connectedAccount, 4, 5, 12)}
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="hidden md:block px-4 py-1.5 bg-blue-600 font-medium text-sm md:text-xs text-white leading-tight uppercase rounded-full shadow-md shadow-gray-400
          hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 
          dark:bg-transparent dark:shadow-transparent dark:active:bg-blue-500 dark:active:text-white dark:hover:text-gray-300"
            >
              Connect Wallet
            </button>
          )}

          <span className="hidden text-lg md:block">Username</span>
          <IoIosArrowDown
            className={`flex items-center text-2xl text-gray-500`}
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute text-base mt-2 w-32 top-16 right-1 bg-white shadow-sm text-gray-800 border border-gray-300 rounded-md transition-all duration-300 dark:bg-[#212936] dark:text-gray-500 dark:border-gray-700">
              <Link
                to={"/manufacturer/profile"}
                className="flex items-center gap-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-transparent dark:hover:border dark:hover:border-blue-500"
              >
                <FaInfoCircle /> Profile
              </Link>
              <Link
                to="/damu-salama/login"
                className="flex items-center gap-x-2 px-4 py-2 underline-none hover:bg-gray-100 dark:hover:bg-transparent dark:hover:border dark:hover:border-blue-500"
              >
                <MdLogout /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DNHeader;
