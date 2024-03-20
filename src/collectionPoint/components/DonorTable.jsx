import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { useGlobalState } from '../../store'
import swal from 'sweetalert';
import { deleteDonor } from '../../BlockchainService';
import { MdDelete } from 'react-icons/md';


const DonorTable = () => {
  const [donors] = useGlobalState("donors");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allDonors, setAllDonors] = useState([])
  const [end, setEnd] = useState(6)


  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getDonors = () => {
    return donors.slice(0, end)
  }

  useEffect(() => {
    setAllDonors(getDonors())
    console.log(donors)
  }, [donors, end])

  const deleteDonorHandler = async (publicAddress) => {
    console.log("donor deleted public address is: ", publicAddress)

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          const result = await deleteDonor({ publicAddress })

          if (result) {
            window.location.reload()
          } else {
            throw Error
          }
          console.log("donor deleted public address is: ", publicAddress)
        } else {
          swal("Your imaginary file is safe!", {
            icon: 'info'
          });
        }
      });

  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">List of Donors</h1>
      </div>

      <div className="p-4">



        {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
                <th className="py-2 px-4 border-b text-center text-lg">S/N</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Public Address</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Name</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Age</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Weight</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Gender</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Phone Number</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Blood-Type</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Volume (in ML)</th>

                <th className="py-2 px-4 border-b text-center text-lg flex col-span-2 justify-center uppercase">Actions</th>
                <th className="py-2 px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {allDonors.length === 0 ? (
                <tr>
                  <td colSpan={9} className="flex justify-center col-span-8 items-center mx-auto py-4 px-4 text-gray-700 text-base border-b dark:text-gray-500">
                    No Record Found
                  </td>
                </tr>
              ) : (

                allDonors.map((donor, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.publicAddress}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.name}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.age.toString()}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.weight.toString()}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.gender}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.phoneNumber}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.bloodType}</td>
                    <td className={`py-2 px-4 text-gray-700 text-base text-center border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{donor.donatedVolume.toString()}</td>

                    <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteDonorHandler(donor.publicAddress)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>
                    {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                    {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </>

  );
};

export default DonorTable;