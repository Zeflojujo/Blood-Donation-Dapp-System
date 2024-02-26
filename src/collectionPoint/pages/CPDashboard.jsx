import React, { useState } from "react"
import CPSidebar from "../layouts/CPSidebar"
import CPHeader from "../layouts/CPHeader"
import { Link } from "react-router-dom"

const CPDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        // const RetailersLists = ({ isLogin }) => {
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="fized">
                <CPSidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <CPHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* Manufacturers RetailerTable component is included */}
                    <div className="w-3/4 max-h-screen mt-8 py-8 flex flex-col z-0 overflow-hidden items-center justify-center shadow-md bg-white dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                        <h1 className="hidden md:flex text-2xl justify-center md:text-3xl lg:text-4xl font-bold mb-4 text-gradient">
                            Welcome to the C.E.O Dashboard
                        </h1>
                    </div>

                    <div className="w-3/4 px-5 max-h-screen mt-8 py-8 flex flex-col z-0 overflow-hidden items-center justify-center shadow-md bg-white dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400">


                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">

                            <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                                <h4 className="text-white font-semibold">Collection Point</h4>
                                <p className="text-gray-400 text-xs my-1">The Place where the blood is collected from the donor then send to the medical center</p>
                                <div className="flex justify-center items-center mt-3 text-white">
                                <Link
                                to="/collection-point/login"
                                    className="shadow-lg shadow-black text-white text-sm bg-[#e32970]
                                    hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                                >
                                    Sign In
                                </Link>
                                </div>
                            </div>

                            <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                                <h4 className="text-white font-semibold">Blood Donation</h4>
                                <p className="text-gray-400 text-xs my-1">Donor when donate blood at the medical center</p>
                                <div className="flex justify-center items-center mt-3 text-white">
                                <Link
                                    to="/donor/login"
                                    className="shadow-lg shadow-black text-white text-sm bg-[#e32970]
                                    hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                                >
                                    Sign In
                                </Link>
                                </div>
                            </div>

                            <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                                <h4 className="text-white font-semibold">Transportation</h4>
                                <p className="text-gray-400 text-xs my-1">Transfer Blood from one medical Stuff to another</p>
                                <div className="flex justify-center items-center mt-3 text-white">

                                <Link
                                to="/transporter/login"
                                    className="shadow-lg shadow-black text-white text-sm bg-[#e32970]
                                    hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                                //   onClick={setNFT}
                                >
                                    Sign In
                                </Link>
                                </div>
                            </div>

                            <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
                                <h4 className="text-white font-semibold">Medical Center</h4>
                                <p className="text-gray-400 text-xs my-1">Transfer Blood from one medical Stuff to another</p>
                                <div className="flex justify-center items-center mt-3 text-white">
                                <Link
                                to="/medical-center/login"
                                    className="shadow-lg shadow-black text-white text-sm bg-[#e32970]
                                    hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
                                >
                                    Sign In
                                </Link>
                                </div>
                            </div>

                            </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CPDashboard
