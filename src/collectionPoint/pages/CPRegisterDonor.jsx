import Sidebar from "../layouts/CPSidebar"
import DashboardHeader from "../layouts/CPHeader"
import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../store'
  import { useState } from 'react'
  import { FaTimes } from 'react-icons/fa'
//   import { create } from 'ipfs-http-client'
  import { addDonor } from '../../BlockchainService'
  import Donate from "../../assets/blood-donation.jpg"
import DonorTable from "../components/DonorTable"
// import { Link } from "react-router-dom"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loding"

  
  const CPRegisterDonor = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [modal] = useGlobalState('modal')
    const [publicAddress, setPublicAddress] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleAddDonorModel = () => {
      setGlobalState('modal', 'scale-100')
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (!publicAddress || !name || !age || !gender || !phoneNumber) return
  
      setGlobalState('modal', 'scale-0')
      setGlobalState('loading', { show: true, msg: 'Registering donor...' })
  
      try {
  
        setLoadingMsg('Intializing transaction...')
        const password = "12345678"
        const result = await addDonor({publicAddress, name, age, gender, phoneNumber, password})
        
        if(result){
            resetForm()
            setAlert('Registration completed...', 'green')
            window.location.reload()

        }else {
            throw Error
        }
        
      } catch (error) {
        console.log('Error uploading file: ', error)
        setAlert('Donor Registration failed...', 'red')
      }
    }

  
    const closeModal = () => {
      setGlobalState('modal', 'scale-0')
      resetForm()
    }
  
    const resetForm = () => {
      setPublicAddress('')
      setName('')
      setAge("")
      setGender("")
      setPhoneNumber('')
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

                     <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* Manufacturers RetailerTable component is included */}
                    <div className="w-4/5">
                        <button
                            onClick={handleAddDonorModel}
                            className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                        >
                            Add Donor
                        </button>
                        <DonorTable />
                        <Alert />
                        <Loading />
                    </div>

                    {/* <RetailerTable data={data} className="dark:bg-gray-900" /> */}
                </div>





      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${modal}`}
      >
        <div className="shadow-xl rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#151c25] dark:shadow-[#e32970]">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between items-center">
              <p className="font-semibold text-gray-400">Register Donor</p>
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
                type="number"
                name="age"
                placeholder="age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
                required
              />
            </div>

            {/* <div className="mt-4">
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="gender"
                placeholder="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                required
              />
            </div> */}

            <div className="mt-4">
                <select
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    required
                >
                    <option value="" disabled>Select donor gender</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                <svg className="absolute right-0 top-0 h-full w-10 text-gray-600 pointer-events-none" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
  
  export default CPRegisterDonor
  
