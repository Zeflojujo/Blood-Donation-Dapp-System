import React from "react"
// import { FaAngleLeft } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import { FaWineBottle } from "react-icons/fa"
import { BsDatabaseFillAdd } from "react-icons/bs"
import { IoIosArrowForward } from "react-icons/io"
import { FaKeycdn } from "react-icons/fa6"
import { NavLink } from "react-router-dom"
import { MdBloodtype } from "react-icons/md";

import "./CPSidebar.css"

const CPSidebar = ({ isOpen, toggleSidebar }) => {
    // const [open, setOpen] = useState(true);
    // const [selected, setSelected] = useState(true);

    const Menus = [
        { title: "Dashboard", link: "/collection-point/dashboard", icon: <MdDashboard /> },
        { title: "Register Donor", link: "/collection-point/register-donor", icon: <BsDatabaseFillAdd /> },
        // { title: "View Donors", link: "/collection-point/view-donor", icon: <FaUser /> },
        { title: "Donation Transaction", link: "/collection-point/donation-transaction", icon: <FaKeycdn /> },
    ]

    return (
        <div className="flex relative m-h-screen max-h-full">
            <div
                className={`self-start sticky32 top-0 inset-y-0 left-0 ${
                    isOpen ? "w-72" : "w-20"
                } text-lg font-semibold h-screen duration-300 pt-8 bg-blue-600 dark:bg-[#212936] dark:shadow-md dark:shadow-gray-600`}
            >
                <div className="flex items-center border-b-2 border-b-gray-300 pb-3 border-opacity-35">
                    <span>
                        <MdBloodtype
                            className={`cursor-pointer mx-5 duration-500 text-4xl text-red-800`}
                        />
                    </span>
                    <h1
                        className={`text-white origin-left font-medium text-2xl duration-300 ${
                            !isOpen && "scale-0"
                        } dark:text-gray-300`}
                    >
                        Damu Salama
                    </h1>
                </div>
                <ul className="pt-6 mr-0">
                    {Menus.map((menu, index) => (
                        <li
                            className={`text-gray-300 text-md flex items-center gap-x-4 hover:font-semibold hover:text-purple-800
                    cursor-pointer py-1 rounded-md ${
                        menu.gap ? "mt-9" : "mt-2"
                    } dark:text-gray-500`}
                            key={index}
                        >
                            <NavLink
                                to={`${menu.link}`}
                                className={` flex w-full gap-x-4 items-center text-gray-200 px-5 py-3 dark:text-gray-400 hover:text-blue-600 hover:font-semibold origin-left duration-300`}
                            >
                                <span className="text-2xl ">{menu.icon}</span>
                                <span className={`${!isOpen && "hidden"}`}>{menu.title}</span>
                                {menu.dropdown ? (
                                    <div className={`${!isOpen ? "" : "pl-20"}`}>
                                        <IoIosArrowForward />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CPSidebar
