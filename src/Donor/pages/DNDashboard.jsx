import React, { useState } from "react"
import DSSidebar from "../layouts/DNSidebar"
import DSHeader from "../layouts/DNHeader"

const DNDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({
        publicAddress: '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',
        Name: 'James Adam',
        phoneNumber: '0629066657',
        bloodType: 'O+',
        // Add more user-related data as needed
      });

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
                        <h1 className="hidden md:flex text-2xl text-gradient justify-center md:text-3xl lg:text-4xl font-bold mb-4">
                            Welcome to the Donor Dashboard
                        </h1>
                    </div>
                    <div className="w-3/4 mx-auto px-4 py-8">
                        <div className="bg-white shadow-md rounded px-8 py-6 mb-4 dark:bg-[#212936] dark:text-gray-300 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                            <h2 className="text-2xl font-bold mb-2">Donor Information</h2>
                            <hr className="mt-4 mb-4 h-4"/>
                            <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 text-xl">Public Address:</p>
                                <p className="font-bold text-lg">{userInfo.publicAddress}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-xl">Name:</p>
                                <p className="font-bold text-lg">{userInfo.Name}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-xl">Phone Number:</p>
                                <p className="font-bold text-lg">{userInfo.phoneNumber}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-xl">BloodType:</p>
                                <p className="font-bold text-lg">{userInfo.bloodType}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DNDashboard
