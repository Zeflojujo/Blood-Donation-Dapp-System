import { useState } from 'react'
import Sidebar from "../layouts/TPSidebar"
import DashboardHeader from "../layouts/TPHeader"
import {
    // useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../store'
import { initiateDonationTransaction } from '../../BlockchainService'
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loding"
  
  
  const InitiateTransportation = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    // const [modal] = useGlobalState('modal')
    const [publicAddress, setPublicAddress] = useState('')
    const [donatedVolume, setDonatedVolume] = useState('')

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    //  const handleAddDoonorModel = () => {
    //  setGlobalState('modal', 'scale-100')
    // }
  

    const handleDonationTransaction = async (e) => {
        e.preventDefault()

        if (!publicAddress || !donatedVolume) return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Blood donating...' })

    
        try {
    
            setLoadingMsg('Intializing transaction...')
            const result = await initiateDonationTransaction({ publicAddress, donatedVolume })
    
            if(result){
            resetForm()
            setAlert('Blood Donated Successfully!!...', 'green')
            }else{
                throw Error
            }

        //   window.location.reload()
        } catch (error) {
        //   console.log('Error registering donor: ', error)
            setAlert('Donation failed...', 'red')
        }
    }
  
    const resetForm = () => {
      setPublicAddress('')
      setDonatedVolume('')
    }
  
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
                     <Alert />
                     <Loading />

                     <div className={`w-4/5  md:w-3/4 lg:w-1/2 shadow-xl shadow-blue-600 mt-8 flex-col items-center justify-center bg-gray-100 dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400`}>
                         <h2 className="text-1xl flex justify-center md:text-3xl font-bold text-gray-800 dark:text-gray-400 mt-4 pt-3">
                             Initiate Transportation
                         </h2>
                         <hr className="hidden dark:block w-full dark:border-gray-500 dark:h-1 mt-6" />

                         <div className=" w-full rounded-md px-0 py-4 md:px-6 md:py-8 mt-4 bg-white dark:bg-transparent dark:text-gray-300">
                            <form className="flex flex-col" onSubmit={handleDonationTransaction}>
                    
                                <div className="mt-4">
                                <label
                                    htmlFor="publicAddress"
                                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                >
                                    Public Address:
                                </label>
                                <input
                                    className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                    type="text"
                                    name="publicAddress"
                                    placeholder="publicAddress"
                                    onChange={(e) => setPublicAddress(e.target.value)}
                                    value={publicAddress}
                                    required
                                />
                                </div>

                                <div className="mt-4">
                                <label
                                    htmlFor="donatedVolume"
                                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                                >
                                    Donated Volume (in ML):
                                </label>
                                <input
                                    className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                    type="text"
                                    name="donatedVolume"
                                    placeholder="donatedVolume"
                                    onChange={(e) => setDonatedVolume(e.target.value)}
                                    value={donatedVolume}
                                    required
                                />
                                </div>
                    
                    
                                <button
                                type="submit"
                                className="flex flex-row justify-center items-center text-lg text-white p-2 rounded-md
                                    w-full bg-blue-600 hover:bg-blue-700 py-2 px-5 drop-shadow-xl border border-transparent
                                    hover:border hover:border-blue-700 focus:outline-none focus:ring mt-5 hover:active:bg-blue-800"
                                    // disabled={isSubmitting}

                                >
                                    {/* {isSubmitting ? "Processing..." : "Register"} */}Register

                                </button>
                            </form>
                            <Alert />
                            <Loading />

                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default InitiateTransportation
  

