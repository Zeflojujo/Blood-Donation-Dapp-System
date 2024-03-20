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

    const handleConvertSupplyStatus = (enumValue) => {
        // Define your enum mappings
        const enumMappings = {
            0: 'Available',
            1: 'Requested',
            2: 'Approved'
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Transfer</h1>
            </div>

            <div className="py-2">
                <div className="hidden lg:block shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
                    <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
                        <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
                            <tr className='border-none'>
                                <th className="py-2 px-4 border-b text-center text-lg">S/N</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">TransactionID</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Supplier</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Requester</th>
                                {/* <th className="py-2 px-4 border-b text-center text-lg uppercase">Medical Center</th> */}
                                {/* <th className="py-2 px-4 border-b text-center text-lg uppercase">Donor</th> */}
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Transporter</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">BloodType</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Vol.(in ML)</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">Supply-Status</th>
                                <th className="py-2 px-4 border-b text-center text-lg uppercase">TestResult</th>

                                <th className="py-2 px-4 text-center text-lg uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTransferedTransaction.length === 0 ? (
                                <tr className='flex justify-center items-center'>
                                    <td colSpan="8" className="w-full flex justify-center items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
                                        No Data Found
                                    </td>
                                </tr>
                            ) : (

                                allTransferedTransaction.map((bloodSupplied, index) => (
                                    <tr
                                        key={index}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.transactionID.toString()}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.medicalCenterName}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(bloodSupplied.requester, 7, 5, 15)}</td>
                                        {/* <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.medicalStaff}</td> */}
                                        {/* <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.donorName}</td> */}
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(bloodSupplied.transporterPublicAddress, 7, 5, 15)}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.bloodType}</td>
                                        <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.donatedVolume.toString()}</td>
                                        {/* <td className={`py-2 px-4 text-gray-700 text-sm border-b  text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><span className={`rounded-full py-1 px-2.5  ${bloodSupplied.status.toString() === "0" ? 'bg-yellow-200' : bloodSupplied.status.toString() === "1" ? 'bg-green-200' : 'bg-red-400'}`}>{handleConvertTransactionStatus(bloodSupplied.status.toString())}</span></td> */}
                                        <td className={`py-2 px-4 text-gray-700 text-sm border-b  text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><span className={`rounded-full py-1 px-2.5  ${bloodSupplied.supplyStatus.toString() === "0" ? 'bg-yellow-200' : bloodSupplied.supplyStatus.toString() === "1" ? 'bg-green-200' : 'bg-red-400'}`}>{handleConvertSupplyStatus(bloodSupplied.supplyStatus.toString())}</span></td>
                                        <td className={`py-2 px-4 text-gray-700 text-base border-b text-center dark:text-gray-500 uppercase ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{bloodSupplied.bloodTestResult}</td>

                                        {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                                        {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{connectedAccount.toUpperCase() !== bloodSupplied.medicalStaff.toUpperCase() ? (<button onClick={() => completeRequestBloodSupplied(bloodSupplied.transactionID.toString(), bloodSupplied.medicalStaff)} className={`flex items-center gap-1 border border-solid bg-pink-400 hover:bg-pink-600 active:bg-pink-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-pink-400 rounded-sm ${bloodSupplied.supplyStatus.toString() !== "0" ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`} disabled={bloodSupplied.supplyStatus.toString() !== "0"}><FaCodePullRequest size={17} />Request</button>) : */}
                                        {/* (<button onClick={() => completeApprovalBloodSupplied(bloodSupplied.transactionID.toString())} className={`flex gap-1 items-center border border-solid rounded-sm bg-orange-400 hover:bg-orange-600 active:bg-orange-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-pink-400 rounded-sm ${bloodSupplied.supplyStatus.toString() !== "1" ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`} disabled={bloodSupplied.supplyStatus.toString() !== "1"}><IoMdCheckboxOutline size={17} />Approve</button>)}</td> */}

                                        {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => completeRequestBloodSupplied(bloodSupplied.transactionID.toString())} className='border border-solid bg-pink-400 hover:bg-pink-600 active:bg-pink-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-pink-400 rounded-sm'>Request</button></td> */}
                                        {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base text-center border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => completeApprovalBloodSupplied(bloodSupplied.transactionID.toString())} className='border border-solid bg-pink-400 hover:bg-pink-600 active:bg-pink-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-pink-400 rounded-sm'>Approve</button></td> */}
                                        {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                                        {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>

                {allTransferedTransaction.map((bloodSupplied, index) => (
                    <div className="lg:hidden w-full mx-auto px-4 py-4">
                        <div className="bg-white shadow-md rounded px-4 py-6 mb-4 dark:bg-[#212936] dark:text-gray-300 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                            <h2 className="text-2xl font-bold mb-2">Task: {index + 1}</h2>
                            <hr className="mt-4 mb-4 h-4" />
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="flex gap-1 text-gray-600 text-xl"><span className="font-bold">TransactionID:</span><span>{bloodSupplied.transactionID.toString()}</span></p>
                                </div>
                                <div>
                                    <p className="flex text-gray-600 text-xl gap-3"><span className="font-bold">Blood Type:</span><span>{bloodSupplied.bloodType}</span></p>
                                </div>
                                <div>
                                    <p className="flex text-gray-600 text-xl gap-3"><span className="font-bold">Supplier:</span><span>{bloodSupplied.medicalCenterName}</span></p>
                                </div>
                                <div>
                                    <p className="flex gap-3 text-gray-600 text-xl"><span className="font-bold">Requester:</span><span>{truncate(bloodSupplied.requester, 7, 5, 15)}</span></p>
                                </div>
                                <div>
                                    <p className="flex gap-3 text-gray-600 text-xl"><span className="font-bold">Donated Volume:</span><span>{bloodSupplied.donatedVolume.toString()}</span></p>
                                </div>
                                <div>
                                    <p className="flex text-gray-600 text-xl gap-3"><span className="font-bold">Supply Status:</span><span className={`rounded-full py-1 px-2 text-sm text-white ${bloodSupplied.supplyStatus.toString() === "0" ? 'bg-yellow-200' : bloodSupplied.supplyStatus.toString() === "1" ? 'bg-green-200' : 'bg-red-400'}`}>{handleConvertSupplyStatus(bloodSupplied.supplyStatus.toString())}</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                )).reverse()}


            </div>
        </>

    );
};

export default TransportTransactionTable;