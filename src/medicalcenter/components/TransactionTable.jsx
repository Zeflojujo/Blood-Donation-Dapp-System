import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { setAlert, setGlobalState, setLoadingMsg, truncate, useGlobalState } from '../../store'
import { FaTimes } from 'react-icons/fa';
import Alert from '../../+homedirectory/components/Alert';
import Loading from '../../+homedirectory/components/Loding';
import { completeDonationTransactions } from '../../BlockchainService';


const TransactionTable = () => {
  const [donationTransaction] = useGlobalState("donationTransactions");
  const [smartcontractError] = useGlobalState("smartcontractError");
  const [transactionId] = useGlobalState("transactionId");
  const [modal] = useGlobalState('modal')
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allDonationTransaction, setAllDonationTransaction] = useState([])
  const [end, setEnd] = useState(5)

  // const [transactionID, setTransactionID] = useState("")
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

  const handleCompleteTransaction = async (e) => {
    e.preventDefault()

    if (!transactionId || !hemoglobinLevel || !medicalCenter || !bloodPressure || !bloodTestResults) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Blood Testing...' })

    try {

      console.log(transactionId)
      console.log(hemoglobinLevel)
      console.log(bloodPressure)
      console.log(bloodTestResults)

      setLoadingMsg('Intializing transaction...')
      const result = await completeDonationTransactions({transactionId, medicalCenter, bloodPressure, hemoglobinLevel, bloodTestResults })
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
  }, [donationTransaction, transactionId, end])

  const completeDonationTransaction = async (_transactionID) => {
    setGlobalState('modal', 'scale-100')
    setGlobalState('transactionId', _transactionID)
    // setTransactionID(_transactionID)
  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Donation Transaction</h1>
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
          {allDonationTransaction.length === 0 ? (
              <tr className='flex justify-center items-center'>
                <td colSpan="8" className="w-full flex justify-center items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
                  No Data Found
                </td>
              </tr>
            ) : (

            allDonationTransaction.map((donation, index) => (
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
                {/* <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.medicalCenter}</td> */}
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{handleConvertTransactionStatus(donation.status.toString())}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.bloodTestResult}</td>

                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => completeDonationTransaction(donation.transactionID.toString())} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Complete</button></td>
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
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="transactionID"
                // onChange={(e) => setTransactionID(e.target.value)}
                value={transactionId}
                disabled
                required
              />
            </div>

            <div className="mt-4">
            <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="medicalCenter"
                placeholder="medicalCenter"
                onChange={(e) => setMedicalCenter(e.target.value)}
                value={medicalCenter}
                required
              />
            </div>
  
            <div className="mt-4">
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

            <div className="mt-4">
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
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

export default TransactionTable;