import Sidebar from "../layouts/DSSidebar"
import DashboardHeader from "../layouts/DSHeader"
import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../store'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { registerTransporter } from '../../BlockchainService'
import Donate from "../../assets/ambulance.jpg"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loding"
import TransporterTable from "../components/TransporterTable"
  
const DSRegisterTransporter = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [modal] = useGlobalState('modal')
    const [publicAddress, setPublicAddress] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleRegisterTransporterModel = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!publicAddress || !name || !phoneNumber) return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Registering transporter...' })

        try {

        setLoadingMsg('Intializing transaction...')
        const password = name
        const result = await registerTransporter({publicAddress, name, phoneNumber, password})
        
        if(result){
            resetForm()
            setAlert('Transporter registration completed...', 'green')
            window.location.reload()

        }else {
            throw Error
        }
        
        } catch (error) {
        console.log('Error uploading file: ', error)
        setAlert('Transporter registration failed...', 'red')
        }
    }


    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setPublicAddress('')
        setName('')
        setPhoneNumber('')
    }

    return (
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
                {/* Sidebar component is included */}
                <div className="relative">
                    <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>
                <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                    <div className="mb-16">
                        {/* Header component is included */}
                        <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                    </div>

                    {/* ViewTransporter page should be created here */}
                    <div className="flex flex-col justify-center items-center mx-auto w-full">
                        {/* Header component is included */}

                        <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* TransporterTable component is included */}
                    <div className="w-4/5">
                        <button
                            onClick={handleRegisterTransporterModel}
                            className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                        >
                            Add Transporter
                        </button>
                        <TransporterTable />
                        <Alert />
                        <Loading />
                    </div>
                </div>

                <div
                className={`fixed top-0 left-0 w-screen h-screen flex items-center
                    justify-center bg-black bg-opacity-50 transform
                    transition-transform duration-300 ${modal}`}
                >
                {/* ${modal} */}
                <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                    <form className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-semibold text-gray-400">Register Transporter</p>
                        <button
                        type="button"
                        onClick={closeModal}
                        className="border-0 bg-transparent focus:outline-none"
                        >
                        <FaTimes className="text-gray-400" />
                        </button>
                    </div>

                    <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                        <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                        <img
                            alt="NFT"
                            className="h-full w-full object-cover cursor-pointer"
                            src={Donate}
                        />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                        <input
                        className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0"
                        type="text"
                        name="publicAddress"
                        placeholder="publicAddress"
                        onChange={(e) => setPublicAddress(e.target.value)}
                        value={publicAddress}
                        required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                        <input
                        className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0"
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                        <input
                        className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0"
                        type="text"
                        name="phoneNumber"
                        placeholder="phoneNumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex flex-row justify-center items-center
                        w-full text-white text-xs bg-[#e32970]
                        hover:bg-[#bd255f] py-2 px-5 rounded-full
                        drop-shadow-xl border border-transparent
                        hover:bg-transparent hover:text-[#e32970]
                        hover:border hover:border-[#bd255f]
                        focus:outline-none focus:ring mt-5"
                    >
                        Register
                    </button>
                    </form>
                </div>
                </div>

            </div>
        </div>
        </div>
    )
}

export default DSRegisterTransporter

