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
import { registerCollectionPoint } from '../../BlockchainService'
import medicalCenter from "../../assets/donate.jpg"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loding"
import CollectionPointTable from "../components/CollectionPointTable"
  
const DSRegisterCollectionPoint = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [modal] = useGlobalState('modal')
    const [publicAddress, setPublicAddress] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleCollectionPointModel = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!publicAddress || !name || !phoneNumber) return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Registering medical center...' })

        try {

        setLoadingMsg('Intializing transaction...')
        const password = "12345678"
        const result = await registerCollectionPoint({publicAddress, name, phoneNumber, password})
        console.log(result)
        
        if(result){
            resetForm()
            setAlert('Collection point registration completed...', 'green')
            window.location.reload()

        }else {
            throw Error
        }
        
        } catch (error) {
            console.log('Error registering medical center file: ', error)
            setAlert('MedicalCenter registration failed...', 'red')
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

                    {/* ViewFakeProduct page should be created here */}
                    <div className="flex flex-col justify-center items-center mx-auto w-full">
                        {/* Header component is included */}

                        <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* MedicalCenterTable component is included */}
                    <div className="w-4/5">
                        <button
                            onClick={handleCollectionPointModel}
                            className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                        >
                            Add Collection Point
                        </button>
                        <CollectionPointTable />
                        <Alert />
                        <Loading />
                    </div>
                </div>

                <div
                className={`fixed top-0 left-0 w-screen h-screen flex items-center
                    justify-center bg-black bg-opacity-50 transform
                    transition-transform duration-300 ${modal}`}
                >
                <div className="shadow-xl rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#151c25] dark:shadow-[#e32970]">
                    <form className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-semibold text-gray-400">Register Collection Point</p>
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
                            alt="medicalCenter"
                            className="h-full w-full object-cover cursor-pointer"
                            src={medicalCenter}
                        />
                        </div>
                    </div>

                    <div className="mt-4">
                        <input
                        className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                        type="text"
                        name="publicAddress"
                        placeholder="publicAddress"
                        onChange={(e) => setPublicAddress(e.target.value)}
                        value={publicAddress}
                        required
                        />
                    </div>

                    <div className="mt-4">
                        <input
                        className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        />
                    </div>

                    <div className="mt-4">
                        <input
                        className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
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
                        w-full text-white text-base md:text-lg bg-blue-700 dark:bg-[#e32970]
                        hover:bg-[#bd255f] py-2 px-5 rounded-lg
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

export default DSRegisterCollectionPoint

