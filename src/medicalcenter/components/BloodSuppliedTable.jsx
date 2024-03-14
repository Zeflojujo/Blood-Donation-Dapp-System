import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { setAlert, setGlobalState, setLoadingMsg, truncate, useGlobalState } from '../../store'
import { FaTimes } from 'react-icons/fa';
import Alert from '../../+homedirectory/components/Alert';
import Loading from '../../+homedirectory/components/Loding';
import { completeDonationTransactions } from '../../BlockchainService';


const BloodSuppliedTable = () => {
  const [bloodSupplied] = useGlobalState("bloodSupplied");
  const [smartcontractError] = useGlobalState("smartcontractError");
  const [transactionId] = useGlobalState("transactionId");
  const [modal] = useGlobalState('modal')
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allBloodSupplied, setAllBloodSupplied] = useState([])
  const [end, setEnd] = useState(5)

  // const [transactionID, setTransactionID] = useState("")
  const [bloodType, setBloodType] = useState("")
  const [hemoglobinLevel, setHemoglobinLevel] = useState("")
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

  const handleCompleteTransaction = async (e) => {
    e.preventDefault()

    if (!transactionId || !bloodType || !hemoglobinLevel || !bloodPressure || !bloodTestResults) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Blood Testing...' })

    try {

      setLoadingMsg('Initializing transaction...')
      const result = await completeDonationTransactions({transactionId, bloodType, bloodPressure, hemoglobinLevel, bloodTestResults })
      console.log("result: ", result)
      if(result){
          resetForm()
          setAlert('Blood Test is completed...', 'green')
          window.location.reload()

      }else {
          throw Error
      }
      
    } catch (error) {
      console.log('Error complete donation transaction: ', error.message)
      setAlert('Blood Test failed...', 'red')
    }
  }

  const handleConvertTransactionStatus = (enumValue) => {
      // Define your enum mappings
      const enumMappings = {
        0: 'Shipped',
        1: 'Active',
        2: 'Fullfilled'
      };
      // Return the string representation of the enum value
      return enumMappings[enumValue];
  }

  const resetForm = () => {
    setBloodPressure("")
    setHemoglobinLevel("")
    setBloodTestResults("")
  }

  const getDonors = () => {
    return bloodSupplied.slice(0, end)
  }

  useEffect(() => {
    setAllBloodSupplied(getDonors())
    console.log(bloodSupplied)
  }, [bloodSupplied, transactionId, end])

  const completeBloodSupplied = async (_transactionID) => {
    setGlobalState('modal', 'scale-100')
    setGlobalState('transactionId', _transactionID)
    // setTransactionID(_transactionID)
  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Supplied Transactions</h1>
      </div>

      <div className="p-4">
        <Alert />
        <Loading />

      <div className="shadow-md overflow-x-auto" style={{zIndex: '-999'}}>
        <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
          <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
            <tr className='border-none'>
              <th className="py-2 px-4 border-b text-start text-lg">S/N</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">TransactionID</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Donor</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Transporter</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Recipient</th>                                      
              <th className="py-2 px-4 border-b text-start text-lg uppercase">BloodType</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Vol.(in ML)</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Donat Date</th>
              {/* <th className="py-2 px-4 border-b text-start text-lg uppercase">Medical Center</th> */}
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Status</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">BloodTestResult</th>

              <th className="py-2 px-4 text-start text-lg uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
          {allBloodSupplied.length === 0 ? (
              <tr className='flex justify-center items-center'>
                <td colSpan="8" className="w-full flex justify-center items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
                  No Data Found
                </td>
              </tr>
            ) : (

              allBloodSupplied.map((bloodSupplied, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.transactionID.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(bloodSupplied.donorPublicAddress, 7,5,15)}</td>
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(bloodSupplied.transporterPublicAddress, 7,5,15)}</td>
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(bloodSupplied.recipientPublicAddress, 7,5,15)}</td>
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index+1}</td>
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.bloodType}</td>
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.donatedVolume.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.donationDate.toString()}</td>
                {/* <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.medicalCenter}</td> */}
                <td className={`py-2 px-4 text-gray-700 text-sm border-b  text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><span className={`rounded-full py-1 px-2.5  ${bloodSupplied.status.toString()=== "0"? 'bg-yellow-200':bloodSupplied.status.toString()==="1"? 'bg-green-200': 'bg-red-400'}`}>{handleConvertTransactionStatus(bloodSupplied.status.toString())}</span></td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.bloodTestResult}</td>

                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => completeBloodSupplied(bloodSupplied.transactionID.toString())} className='border border-solid bg-pink-400 hover:bg-pink-600 active:bg-pink-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-pink-400 rounded-sm'>Request</button></td>
                <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => completeBloodSupplied(bloodSupplied.transactionID.toString())} className='border border-solid bg-pink-400 hover:bg-pink-600 active:bg-pink-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-pink-400 rounded-sm'>Approve</button></td>
                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
              </tr>
            )))}
          </tbody>
        </table>
      </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${modal}`}
      >
        <div className="shadow-xl rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#151c25] dark:shadow-[#e32970]">
          
          <form className="flex flex-col" onSubmit={handleCompleteTransaction}>
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

            <hr className="w-full dark:border-gray-500 border-t-6 border-gray-600 text-black dark:h-1 mt-6 mb-3" />
  
            <div className="mt-4">
              <input
                className="hidden mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="transactionID"
                // onChange={(e) => setTransactionID(e.target.value)}
                value={transactionId}
                disabled
                required
              />
            </div>

            <div className="mt-4">
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Blood Type:
                </label>
                <select
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                    name="bloodType"
                    onChange={(e) => setBloodType(e.target.value)}
                    value={bloodType}
                    required
                >
                    <option value="" disabled>Select donor blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <svg className="absolute right-0 top-0 h-full w-10 text-gray-600 pointer-events-none" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
  
            <div className="mt-4">
                <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Blood Pressure
                </label>
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="number"
                name="bloodPressure"
                placeholder="bloodPressure (in mmHg)"
                onChange={(e) => setBloodPressure(e.target.value)}
                value={bloodPressure}
                required
              />
            </div>

            <div className="mt-4">
                <label htmlFor="hemoglobinLevel" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  HemoglobinLevel
                </label>
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="number"
                name="hemoglobinLevel"
                placeholder="hemoglobinLevel (in g/dL)"
                onChange={(e) => setHemoglobinLevel(e.target.value)}
                value={hemoglobinLevel}
                required
              />
            </div>

            {/* <div className="mt-4">
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="bloodTestResults"
                placeholder="bloodTestResults"
                onChange={(e) => setBloodTestResults(e.target.value)}
                value={bloodTestResults}
                required
              />
            </div> */}

            <div className="mt-4">
                <label htmlFor="bloodTestResults" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Blood Test Results:
                </label>
                <select
                    className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                    name="bloodTestResults"
                    onChange={(e) => setBloodTestResults(e.target.value)}
                    value={bloodTestResults}
                    required
                >
                    <option value="" disabled>Select Blood Test Result</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
                <svg className="absolute right-0 top-0 h-full w-10 text-gray-600 pointer-events-none" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            
            <button
              type="submit"
              className="text-white justify-center bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
              py-2.5 text-center me-2 dark:bg-[#e32970] dark:hover:bg-[#bd255f] 
              dark:focus:ring-[#bd255f] inline-flex items-center w-full mt-5"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    
    </>
    
  );
};

export default BloodSuppliedTable;