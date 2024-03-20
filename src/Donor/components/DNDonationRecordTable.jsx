import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { truncate, useGlobalState } from '../../store'


const DNDonationRecordTable = () => {
  const [donorTransactionHistory] = useGlobalState("donorTransactionHistory");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allDonationTransaction, setAllDonationTransaction] = useState([])
  const [end, setEnd] = useState(5)

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

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


  const getDonors = () => {
    return donorTransactionHistory.slice(0, end)
  }

  useEffect(() => {
    setAllDonationTransaction(getDonors())
    console.log(donorTransactionHistory)
  }, [donorTransactionHistory, end])


  return (
    <>

      <div className="mb-2 lg:mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Donation Transaction</h1>
      </div>

      <div className="py-4">

        <div className="hidden lg:block shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
                <th className="py-2 px-4 border-b text-center text-lg">ID</th>
                <th className="py-2 px-4 border-b text-center text-lg">TransactionID</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Donor</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">BloodType</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Vol.(in ML)</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Donat Date</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Status</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Blood Test Result:</th>
              </tr>
            </thead>
            <tbody>
              {donorTransactionHistory.map((donation, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.transactionID.toString()}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.donorPublicAddress, 7, 5, 15)}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.bloodType.toString()}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donatedVolume.toString()}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donationDate.toString()}</td>
                  <td className={`py-2 px-4 text-gray-700 text-sm border-b  text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><span className={`rounded-full py-1 px-2.5  ${donation.status.toString() === "0" ? 'bg-yellow-200' : donation.status.toString() === "1" ? 'bg-green-200' : 'bg-red-400'}`}>{handleConvertTransactionStatus(donation.status.toString())}</span></td>
                  <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.bloodTestResult.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {donorTransactionHistory.map((donation, index) => (
          <div className="lg:hidden w-full mx-auto px-4 py-4">
            <div className="bg-white shadow-md rounded px-4 py-6 mb-4 dark:bg-[#212936] dark:text-gray-300 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
              <h2 className="text-2xl font-bold mb-2">Transaction: {index + 1}</h2>
              <hr className="mt-4 mb-4 h-4" />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="flex gap-1 text-gray-600 text-xl"><span className="font-bold">TransactionID:</span><span>{donation.transactionID.toString()}</span></p>
                </div>
                <div>
                  <p className="flex text-gray-600 text-xl gap-3"><span className="font-bold">Donor Address:</span><span>{truncate(donation.donorPublicAddress, 7, 5, 15)}</span></p>
                </div>
                <div>
                  <p className="flex text-gray-600 text-xl gap-3"><span className="font-bold">Blood Type:</span><span>{donation.bloodType.toString()}</span></p>
                </div>
                <div>
                  <p className="flex gap-3 text-gray-600 text-xl"><span className="font-bold">Donated Volume:</span><span>{donation.donatedVolume.toString()}</span></p>
                </div>
                <div>
                  <p className="flex text-gray-600 text-xl gap-3"><span className="font-bold">Status:</span><span className={`rounded-full py-1 px-2 text-sm text-gray-700 ${donation.status.toString() === "0" ? 'bg-yellow-200' : donation.status.toString() === "1" ? 'bg-green-200' : 'bg-red-400'}`}>{handleConvertTransactionStatus(donation.status.toString())}</span></p>
                </div>
                <div>
                  <p className="flex text-gray-600 text-xl gap-3"><span className="font-bold">Blood Test Result:</span><span className={`rounded-full py-1 px-2 text-sm text-gray-700`}>{donation.bloodTestResult.toString()}</span></p>
                </div>

              </div>
            </div>
          </div>
        )).reverse()}

      </div>
    </>

  );
};

export default DNDonationRecordTable;