import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../../store'
import Donate from "../../assets/donate.jpg"
import ambulance from "../../assets/ambulance.jpg"
import medicalStaff from "../../assets/laboratory.jpg"
import medicalCenter from "../../assets/medical-center.jpg"
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'

const Categories = () => {
  const [donors] = useGlobalState('donors')
  const [end, setEnd] = useState(4)
  // const [count] = useState(4)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return donors.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [donors, end])

  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="flex justify-center text-white text-3xl font-bold uppercase text-gradient">
          Blood Donation Categories
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">

        <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
            <img
              src={medicalStaff}
              alt="blood"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-white font-semibold">Collection Point</h4>
            <p className="text-gray-400 text-xs my-1">Collect blood units from Donors and ship it to the Authorized Medical Center</p>
            <div className="flex justify-center items-center mt-3 text-white">
              <Link
              to="/collection-point/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

          <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
            <img
              src={Donate}
              alt="SystemImage"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-white font-semibold">Blood Donation</h4>
            <p className="text-gray-400 text-xs my-1">Donor who donate blood at the collection point</p>
            <div className="flex justify-center items-center mt-3 text-white">
              <Link
                to="/donor/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

          <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
            <img
              src={ambulance}
              alt="blood"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-white font-semibold">Transportation</h4>
            <p className="text-gray-400 text-xs my-1">Shipping active blood from one medical center to another</p>
            <div className="flex justify-center items-center mt-3 text-white">

              <Link
              to="/transporter/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
              //   onClick={setNFT}
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

          <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
            <img
              src={medicalCenter}
              alt="blood"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-white font-semibold">Medical Center</h4>
            <p className="text-gray-400 text-xs my-1">Collect Blood Samples from the Authorized collection point and use it in need for patients</p>
            <div className="flex justify-center items-center mt-3 text-white">
              <Link
              to="/medical-center/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-black text-white text-sm bg-[#e32970]
                  hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-1"
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Categories
