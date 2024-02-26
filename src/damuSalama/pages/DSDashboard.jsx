import React, { useState } from "react"
import DSSidebar from "../layouts/DSSidebar"
import DSHeader from "../layouts/DSHeader"
import { Link } from "react-router-dom"

const DSDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        // const RetailersLists = ({ isLogin }) => {
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="fized">
                <DSSidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <DSHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* Manufacturers RetailerTable component is included */}
                    <div className="w-3/4 max-h-screen mt-8 py-8 flex flex-col z-0 overflow-hidden items-center justify-center shadow-md bg-white dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                        <h1 className="hidden md:flex text-2xl justify-center md:text-3xl lg:text-4xl font-bold mb-4 text-gradient">
                            Welcome to the System Admin Dashboard
                        </h1>
                    </div>

                    <div className="w-full px-5 max-h-screen mt-8 py-8 flex flex-col z-0 overflow-hidden items-center justify-center shadow-md bg-white dark:bg-transparent">


                        <div className=" w-3/4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-14 py-2.5">

                            <div className="flex flex-col justify-center items-center w-full shadow-lg bg-gray-100 shadow-blue-600 dark:shadow-black rounded-md overflow-hidden dark:bg-gray-800 my-2 p-6">
                                <h4 className="text-white text-2xl font-semibold text-gradient">Collection Point</h4>
                                <p className="text-[#bd255f] font-semibold text-xl my-1">56 Places</p>
                            </div>

                            <div className="flex flex-col justify-center items-center w-full shadow-lg bg-gray-100 shadow-blue-600 dark:shadow-black rounded-md overflow-hidden dark:bg-gray-800 my-2 p-6">
                                <h4 className="text-white text-2xl font-semibold text-gradient">Donors</h4>
                                <p className="text-[#bd255f] font-semibold text-xl my-1">3452</p>
                            </div>

                            <div className="flex flex-col justify-center items-center w-full shadow-lg bg-gray-100 shadow-blue-600 dark:shadow-black rounded-md overflow-hidden dark:bg-gray-800 my-2 p-6">
                                <h4 className="text-white text-2xl font-semibold text-gradient">Medical Center</h4>
                                <p className="text-[#bd255f] font-semibold text-xl my-1">21</p>
                            </div>

                            <div className="flex flex-col justify-center items-center w-full shadow-lg bg-gray-100 shadow-blue-600 dark:shadow-black rounded-md overflow-hidden dark:bg-gray-800 my-2 p-6">
                                <h4 className="text-white text-2xl font-semibold text-gradient">Transporters</h4>
                                <p className="text-[#bd255f] font-semibold text-xl my-1">35</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DSDashboard
