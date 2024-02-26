import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { setGlobalState, truncate, useGlobalState } from '../../store'
import { FaTimes } from 'react-icons/fa';


const TransactionTable = () => {
  const [donationTransaction] = useGlobalState("donationTransactions");
  const [modal] = useGlobalState('modal')
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allDonationTransaction, setAllDonationTransaction] = useState([])
  const [end, setEnd] = useState(5)

  const [transactionID, setTransactionID] = useState("")
    const [hemoglobinLevel, setHemoglobinLevel] = useState("")
    const [medicalCenter, setMedicalCenter] = useState("")
    const [bloodPressure, setBloodPressure] = useState("")
    const [bloodTestResults, setBloodTestResults] = useState("")


  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const closeModal = () => {
    setGlobalState('modal', 'scale-0')
    resetForm()
  }

  const handleConvertTransactionStatus = (enumValue) => {
      // Define your enum mappings
      const enumMappings = {
        0: 'Pending',
        1: 'Completed',
      };
      // Return the string representation of the enum value
      return enumMappings[enumValue];
  
  }

  const resetForm = () => {
    setMedicalCenter("")
    setBloodPressure("")
    setHemoglobinLevel("")
    setBloodTestResults("")
  }

  const getDonors = () => {
    return donationTransaction.slice(0, end)
  }

  useEffect(() => {
    setAllDonationTransaction(getDonors())
    console.log(donationTransaction)
  }, [donationTransaction, end])

  const completeDonationTransaction = async (_transactionID) => {
    setGlobalState('modal', 'scale-100')
    setTransactionID(_transactionID)
  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Donation Transaction</h1>
      </div>

      <div className="p-4">

      

      {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}
      

      <div className="shadow-md overflow-x-auto" style={{zIndex: '-999'}}>
        <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
          <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
            <tr className='border-none'>
              <th className="py-2 px-4 border-b text-start text-lg">ID</th>
              <th className="py-2 px-4 border-b text-start text-lg">TransactionID</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Donor</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Transporter</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Recipient</th>                                      
              <th className="py-2 px-4 border-b text-start text-lg uppercase">BloodType</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Vol.(in ML)</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Donat Date</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Medical Center</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Status</th>

              <th className="py-2 px-4 border-b text-start text-lg flex col-span-2 justify-center uppercase">Actions</th>
              <th className="py-2 px-4 border-b text-start"></th>
            </tr>
          </thead>
          <tbody>
            {allDonationTransaction.map((donation, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index+1}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.transactionID.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.donorPublicAddress, 7,5,15)}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.transporterPublicAddress, 7,5,15)}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.recipientPublicAddress, 7,5,15)}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.bloodType.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donatedVolume.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donationDate.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.medicalCenter}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{handleConvertTransactionStatus(donation.status.toString())}</td>

                <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td>
                <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => completeDonationTransaction(donation.transactionID.toString())} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Complete</button></td>
                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
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
              {/* <p className="font-semibold text-gray-400">Complete Blood Checking</p> */}
              <h2 className="text-1xl md:text-3xl font-bold mt-4 pt-3">
                  Complete Blood Checking
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="border-0 bg-transparent focus:outline-none"
              >
                <FaTimes className="text-gray-400" />
              </button>
            </div>

            <hr className="w-full dark:border-gray-500 dark:h-1 mt-6 mb-3" />
  
            {/* <div className="flex flex-row justify-center items-center rounded-xl mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                <img
                  alt="NFT"
                  className="h-full w-full object-cover cursor-pointer"
                  src={Donate}
                />
              </div>
            </div> */}
  
            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <input
                className="block w-full text-sm
                  text-slate-500 bg-transparent border-0
                  focus:outline-none focus:ring-0"
                type="text"
                name="transactionID"
                onChange={(e) => setTransactionID(e.target.value)}
                value={transactionID}
                disabled
                required
              />
            </div>

            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
                className="block w-full text-sm
                  text-slate-500 bg-transparent border-0
                  focus:outline-none focus:ring-0"
                type="text"
                name="medicalCenter"
                placeholder="medicalCenter"
                onChange={(e) => setMedicalCenter(e.target.value)}
                value={medicalCenter}
                required
              />
            </div>
  
            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <input
                className="block w-full text-sm
                  text-slate-500 bg-transparent border-0
                  focus:outline-none focus:ring-0"
                type="number"
                name="bloodPressure"
                placeholder="bloodPressure (in mmHg)"
                onChange={(e) => setBloodPressure(e.target.value)}
                value={bloodPressure}
                required
              />
            </div>

            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <input
                className="block w-full text-sm
                  text-slate-500 bg-transparent border-0
                  focus:outline-none focus:ring-0"
                type="number"
                name="hemoglobinLevel"
                placeholder="hemoglobinLevel (in g/dL)"
                onChange={(e) => setHemoglobinLevel(e.target.value)}
                value={hemoglobinLevel}
                required
              />
            </div>

            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <input
                className="block w-full text-sm
                  text-slate-500 bg-transparent border-0
                  focus:outline-none focus:ring-0"
                type="text"
                name="bloodTestResults"
                placeholder="bloodTestResults"
                onChange={(e) => setBloodTestResults(e.target.value)}
                value={bloodTestResults}
                required
              />
            </div>

            
  
  
            <button
              type="submit"
              // onClick={handleSubmit}
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
    
    </>
    
  );
};

export default TransactionTable;