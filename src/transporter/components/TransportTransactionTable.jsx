import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { truncate, useGlobalState } from '../../store'

const TransportTransactionTable = () => {
    const [transporterTransactionHistory] = useGlobalState("transporterTransactionHistory");
    const [hoveredRow, setHoveredRow] = useState(null);
    const [allTransferedTransaction, setAllTransferedTransaction] = useState([])
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


    const getTransporters = () => {
        return transporterTransactionHistory.slice(0, end)
    }

    useEffect(() => {
        setAllTransferedTransaction(getTransporters())
        console.log(transporterTransactionHistory)
    }, [transporterTransactionHistory, end])


    return (
        <>

            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Donation Transaction</h1>
            </div>

            <div className="p-4">

                <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
                    <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
                        <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
                            <tr className='border-none'>
                                <th className="py-2 px-4 border-b text-center text-lg">ID</th>
                                <th className="py-2 px-4 border-b text-center text-lg">TransactionID</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Donor</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Transporter</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Recipient</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">BloodType</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Vol.(in ML)</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Donat Date</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Medical Center</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTransferedTransaction.map((donation, index) => (
                                <tr
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.transactionID.toString()}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.donorPublicAddress, 7, 5, 15)}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.transporterPublicAddress, 7, 5, 15)}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(donation.recipientPublicAddress, 7, 5, 15)}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.bloodType.toString()}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donatedVolume.toString()}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.donationDate.toString()}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donation.medicalCenter}</td>
                                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{handleConvertTransactionStatus(donation.status.toString())}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default TransportTransactionTable;