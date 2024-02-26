import React, { useState } from "react"
import Sidebar from "../layouts/Sidebar"
import DashboardHeader from "../layouts/DashboardHeader"

const MCDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        // const RetailersLists = ({ isLogin }) => {
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="fized">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* Manufacturers RetailerTable component is included */}
                    <div className="w-3/4 max-h-screen mt-8 py-8 flex flex-col z-0 overflow-hidden items-center justify-center shadow-md bg-white dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                        <h1 className="hidden md:flex text-2xl justify-center md:text-3xl lg:text-4xl font-bold mb-4">
                            Welcome to the Medical Center Dashboard
                        </h1>

                        {/* <div className="w-3/4 rounded-md p-0 pb-4 mb-6 shadow-md">
                            <span className="flex space-x-1 text-lg md:text-lg lg:text-xl text-gray-500 font-semibold ">
                                <span className="hidden md:block">Fill This Form inorder to </span>
                                <span> Register Manufacturer</span>
                            </span>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MCDashboard
