import React, { useState } from "react"
import DNSidebar from "../layouts/DNSidebar"
import DNHeader from "../layouts/DNHeader"
import DNDonationRecordTable from "../components/DNDonationRecordTable"

const DonationTransactionRecord = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        // const RetailersLists = ({ isLogin }) => {
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="fized">
                <DNSidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <DNHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* Manufacturers RetailerTable component is included */}
                    <div className="w-11/12">
                        <DNDonationRecordTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonationTransactionRecord
