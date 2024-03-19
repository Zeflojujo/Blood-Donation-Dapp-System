import { useState } from 'react'
import Sidebar from "../layouts/TPSidebar"
import DashboardHeader from "../layouts/TPHeader"
import TransportTransactionTable from '../components/TransportTransactionTable'

const TransferedDonationTransaction = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    //  const handleAddDoonorModel = () => {
    //  setGlobalState('modal', 'scale-100')
    // }

    return (
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="relative">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-auto w-full">
                    {/* Manufacturers Header component is included */}
                    <div className="w-11/12">
                        <TransportTransactionTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferedDonationTransaction



