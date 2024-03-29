import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { setAlert, setGlobalState, setLoadingMsg, truncate, useGlobalState } from '../../store'
import { FaFillDrip, FaRegTimesCircle, FaTimes } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbAdjustmentsCancel, TbTopologyStar3 } from "react-icons/tb";
import { FcCancel } from "react-icons/fc";
import Alert from '../../+homedirectory/components/Alert';
import Loading from '../../+homedirectory/components/Loding';
import { fullFillBloodToRecipient, completeDonationTransactions, supplyBlood } from '../../BlockchainService';


const TransactionTable = () => {
  const [donationTransaction] = useGlobalState("donationTransactions");
  const [smartcontractError] = useGlobalState("smartcontractError");
  const [transactionId] = useGlobalState("transactionId");
  const [modal] = useGlobalState('modal')
  const [modal2] = useGlobalState('modal2')
  const [modal3] = useGlobalState('modal3')
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allDonationTransaction, setAllDonationTransaction] = useState([])
  const [end, setEnd] = useState(5)

  // const [transactionID, setTransactionID] = useState("")
  const [bloodType, setBloodType] = useState("")
  const [hemoglobinLevel, setHemoglobinLevel] = useState("")
  const [bloodPressure, setBloodPressure] = useState("")
  const [bloodTestResults, setBloodTestResults] = useState("")
  const [HIV, setHIV] = useState("")
  const [liverFever, setLiverFever] = useState("")

  const [recipientPublicAddress, setRecipientPublicAddress] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientBloodType, setRecipientBloodType] = useState("")
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("")

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

  const closeModal2 = () => {
    setGlobalState('modal2', 'scale-0')
    resetForm()
  }

  const closeModal3 = () => {
    setGlobalState('modal3', 'scale-0')
    resetForm()
  }

  const handleCompleteTransaction = async (e) => {
    e.preventDefault()

    if (!transactionId || !bloodType || !HIV || !liverFever || !hemoglobinLevel || !bloodPressure || !bloodTestResults) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Blood Testing...' })

    try {

      setLoadingMsg('Initializing transaction...')
      const result = await completeDonationTransactions({ transactionId, bloodType, HIV, liverFever, bloodPressure, hemoglobinLevel, bloodTestResults })
      console.log("result: ", result)
      if (result) {
        resetForm()
        setAlert('Blood Test is completed...', 'green')
        // window.location.reload()

      } else {
        throw Error
      }

    } catch (error) {
      console.log('Error complete donation transaction: ', error.message)
      setAlert('Blood Test failed...', 'red')
    }
  }

  const handleFullfillBloodToRecipient = async (e) => {
    e.preventDefault()

    if (!transactionId || !recipientPublicAddress || !recipientName || !recipientPhoneNumber || !recipientBloodType) return

    setGlobalState('modal2', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Blood is Fullfilled...' })

    try {

      setLoadingMsg('Initializing transaction...')
      const result = await fullFillBloodToRecipient({ transactionId, recipientPublicAddress, recipientName, recipientPhoneNumber, recipientBloodType })
      console.log("result: ", result)
      if (result) {
        resetForm()
        setAlert('Blood is fullfillied to recipient...!!', 'green')
        // window.location.reload()
      } else {
        throw Error
      }

    } catch (error) {
      console.log('Error blood fullfillied to recipient: ', error.message)
      setAlert('Blood Fullfill failed...', 'red')
    }
  }

  const handleSupplyBlood = async (e) => {
    e.preventDefault()

    if (!transactionId) return

    setGlobalState('modal3', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Blood Supply...' })

    try {

      setLoadingMsg('Initializing transaction...')
      const result = await supplyBlood({ transactionId })
      console.log("result: ", result)
      if (result) {
        resetForm()
        setAlert('Blood is Supplied ...!!', 'green')
        // window.location.reload()

      } else {
        throw Error
      }

    } catch (error) {
      console.log('Error blood Supply: ', error.message)
      setAlert('Blood Supply failed...', 'red')
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
    return donationTransaction.slice(0, end)
  }

  useEffect(() => {
    setAllDonationTransaction(getDonors())
    console.log(donationTransaction)
  }, [donationTransaction, transactionId, end])

  const completeDonationTransaction = async (_transactionID) => {
    setGlobalState('modal', 'scale-100')
    setGlobalState('transactionId', _transactionID)
  }

  const FullFillDonationTransaction = async (_transactionID) => {
    setGlobalState('modal2', 'scale-100')
    setGlobalState('transactionId', _transactionID)
  }

  const supplyBloodTransaction = async (e, _transactionID) => {
    setGlobalState('modal3', 'scale-100')
    setGlobalState('transactionId', _transactionID)
  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Donation Transaction</h1>
      </div>

      <div className="p-4">
        <Alert />
        <Loading />

        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
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

                <th colSpan={2} className="py-2 px-4 text-center text-lg uppercase">Actions</th>
                <th className="py-2 px-4 text-start text-lg uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {allDonationTransaction.length === 0 ? (
                <tr className='flex justify-center items-center'>
                  <td colSpan={8} className="w-full flex justify-center items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
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
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.transactionID.toString()}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donorName}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.transporterPublicAddress, 7, 5, 15)}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.recipientPublicAddress, 7, 5, 15)}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.bloodType}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donatedVolume.toString()}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donationDate.toString()}</td>
                    {/* <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.medicalStaff}</td> */}
                    <td className={`py-2 px-4 text-gray-700 text-sm border-b  text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><span className={`rounded-full py-1 px-2.5  ${donation.status.toString() === "0" ? 'bg-yellow-200' : donation.status.toString() === "1" ? 'bg-green-200' : 'bg-red-400'}`}>{handleConvertTransactionStatus(donation.status.toString())}</span></td>
                    <td className={`py-2 px-4 text-gray-700 text-base border-b text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.bloodTestResult}</td>

                    {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                    <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => completeDonationTransaction(donation.transactionID.toString())} className={`border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-cyan-400 ${donation.status.toString() !== "0" ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`} disabled={donation.status.toString() !== "0"}><IoMdCheckmarkCircleOutline size={17} />Complete</button></td>
                    <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => FullFillDonationTransaction(donation.transactionID.toString())} className={`border border-solid bg-purple-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-purple-400 ${donation.status.toString() !== "1" ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`} disabled={donation.status.toString() !== "1"}><FaFillDrip size={17} />FullFill</button></td>
                    <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={(e) => supplyBloodTransaction(e, donation.transactionID.toString())} className={`border border-solid bg-orange-400 hover:bg-orange-600 active:bg-orange-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-purple-400 ${donation.status.toString() !== "1" ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`} disabled={donation.status.toString() !== "1"}><TbTopologyStar3 size={17} />Supply</button></td>
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
            </div>

            <div className="mt-4">
              <label htmlFor="HIV" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                HIV Test:
              </label>
              <select
                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                name="HIV"
                onChange={(e) => setHIV(e.target.value)}
                value={HIV}
                required
              >
                <option value="" disabled>Select HIV Result</option>
                <option value="positive">ve+</option>
                <option value="negative">ve-</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="liverFever" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Liver Fever:
              </label>
              <select
                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                name="liverFever"
                onChange={(e) => setLiverFever(e.target.value)}
                value={liverFever}
                required
              >
                <option value="" disabled>Select Liver Fever Result</option>
                <option value="positive">ve+</option>
                <option value="negative">ve-</option>
              </select>
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



      {/* Fullfill Blood To Recipient Table */}

      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${modal2}`}
      >
        <div className="shadow-xl rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#151c25] dark:shadow-[#e32970]">

          <form className="flex flex-col" onSubmit={handleFullfillBloodToRecipient}>
            <div className="flex flex-row justify-between items-center">
              {/* <p className="font-semibold text-gray-400">Complete Blood Checking</p> */}
              <h2 className="text-1xl md:text-3xl font-bold mt-4 pt-3">
                Full Fill Blood To Recipient
              </h2>
              <button
                type="button"
                onClick={closeModal2}
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
              <label htmlFor="recipientPublicAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Recipient Public Address:
              </label>
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="recipientPublicAddress"
                placeholder="Recipient PublicAddress (in mmHg)"
                onChange={(e) => setRecipientPublicAddress(e.target.value)}
                value={recipientPublicAddress}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="recipientName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Name
              </label>
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="recipientName"
                placeholder="recipient name (in mmHg)"
                onChange={(e) => setRecipientName(e.target.value)}
                value={recipientName}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="recipientPhoneNumber" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Recipient Phone Number:
              </label>
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="recipientPhoneNumber"
                placeholder="recipientPhoneNumber (in g/dL)"
                onChange={(e) => setRecipientPhoneNumber(e.target.value)}
                value={recipientPhoneNumber}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="recipientBloodType" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Blood Type:
              </label>
              <select
                className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                name="recipientBloodType"
                onChange={(e) => setRecipientBloodType(e.target.value)}
                value={recipientBloodType}
                required
              >
                <option value="" disabled>Select recipient blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <button
              type="submit"
              className="text-white justify-center bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
              py-2.5 text-center me-2 dark:bg-[#e32970] dark:hover:bg-[#bd255f] 
              dark:focus:ring-[#bd255f] inline-flex items-center w-full mt-5"
            >
              Full Fill
            </button>
          </form>

        </div>
      </div>

      {/* Supply Blood */}

      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 ${modal3}`}
      >
        <div className="shadow-xl rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-400 dark:bg-[#151c25] dark:shadow-[#e32970]">

          <form className="flex flex-col" onSubmit={handleSupplyBlood}>
            <div className="flex flex-row justify-between items-center">
              {/* <p className="font-semibold text-gray-400">Complete Blood Checking</p> */}
              <h2 className="flex justify-center mx-auto w-full items-center text-red-500 rounded-full text-1xl md:text-3xl font-bold mt-4 pt-3">
                <FaRegTimesCircle className="text-red-400 text-5xl" />
              </h2>
            </div>

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
              <span className="block text-1xl font-bold text-center font-medium text-gray-600 dark:text-gray-300">
                Are you sure?
              </span>
              <span className="block text-[20px] mt-3 text-center font-medium text-gray-600 dark:text-gray-300">
                You want to supply this blood
              </span>
            </div>

            <div className="flex gap-2">

              <button
                type="submit"
                className="w-3/4 flex gap-1 items-center text-white justify-center bg-blue-500 hover:bg-blue-600 
              focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
              py-2.5 text-center me-2 dark:bg-[#e32970] dark:hover:bg-[#bd255f] 
              dark:focus:ring-[#bd255f] inline-flex items-center w-full mt-5"
              >
                <TbTopologyStar3 size={17} />
                Supply
              </button>
              <button
                type="button"
                onClick={closeModal3}
                className="w-1/4 flex items-center gap-1 text-white justify-center bg-orange-400 hover:bg-orange-500 
              focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-lg px-5 
              py-2.5 text-center me-2 dark:bg-orange-400 dark:hover:bg-orange-500 
              dark:focus:ring-orange-300 inline-flex items-center w-full mt-5"
              >
                <TbAdjustmentsCancel size={17} />
                Cancel
              </button>

            </div>

          </form>

        </div>
      </div>

    </>

  );
};

export default TransactionTable;