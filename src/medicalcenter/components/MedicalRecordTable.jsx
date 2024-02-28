import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { truncate, useGlobalState } from '../../store'


const MedicalRecordTable = () => {
  const [medicalRecords] = useGlobalState("medicalRecords");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allMedicalRecords, setAllMedicalRecords] = useState([])
  const [end, setEnd] = useState(6)


  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getMedicalRecords = () => {
    return medicalRecords.slice(0, end)
  }

  useEffect(() => {
    setAllMedicalRecords(getMedicalRecords())
    console.log(medicalRecords)
  }, [medicalRecords, end])

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Blood Testing Records</h1>
      </div>

      <div className="p-4">

      <div className="shadow-md overflow-x-auto" style={{zIndex: '-999'}}>
        <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
          <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
            <tr className='border-none'>
              <th className="py-2 px-4 border-b text-start text-lg">S/N</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">MedicalRecord_ID</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Medical Center</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Blood Pressure</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Haemoglobin</th>
              <th className="py-2 px-4 border-b text-start text-lg uppercase">Blood Test Result</th>

              <th className="py-2 px-4 border-b text-start text-lg flex col-span-2 justify-center uppercase">Actions</th>
              <th className="py-2 px-4 border-b text-start"></th>
            </tr>
          </thead>
          <tbody>
            {allMedicalRecords.map((medicalRecord, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index+1}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{medicalRecord.medicalRecordID.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(medicalRecord.medicalStaff, 7, 5, 15)}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{medicalRecord.bloodPressure.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{medicalRecord.hemoglobinLevel.toString()}</td>
                <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{medicalRecord.bloodTestResult}</td>

                <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td>
                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </>
    
  );
};

export default MedicalRecordTable;