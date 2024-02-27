// import {
//     useGlobalState,
//     setGlobalState,
//     setLoadingMsg,
//     setAlert,
//   } from '../../../store'
//   import { useState } from 'react'
//   import Laboratory from "../../../assets/laboratory.jpg"

//   const CPLogin = () => {
//     const [modal] = useGlobalState('modal')
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [description, setDescription] = useState('')
//     const [fileUrl, setFileUrl] = useState('')
//     const [imgBase64, setImgBase64] = useState(null)
  
//     // const handleSubmit = async (e) => {
//     //   e.preventDefault()
  
//     //   if (!title || !price || !description) return
  
//     //   setGlobalState('modal', 'scale-0')
//     //   setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' })
  
//     //   try {
//     //     const created = await client.add(fileUrl)
//     //     const metadataURI = `https://ipfs.io/ipfs/${created.path}`
//     //     const nft = { title, price, description, metadataURI }
  
//     //     setLoadingMsg('Intializing transaction...')
//     //     setFileUrl(metadataURI)
//     //     await mintNFT(nft)
  
//     //     resetForm()
//     //     setAlert('Minting completed...', 'green')
//     //     window.location.reload()
//     //   } catch (error) {
//     //     console.log('Error uploading file: ', error)
//     //     setAlert('Minting failed...', 'red')
//     //   }
//     // }
  
//     const closeModal = () => {
//       setGlobalState('modal', 'scale-0')
//       resetForm()
//     }
  
//     const resetForm = () => {
//       setUsername('')
//       setPassword('')
//     }
  
//     return (
//       <div
//         className={`fixed top-0 left-0 w-screen h-screen flex items-center
//           justify-center bg-black bg-opacity-50 transform
//           transition-transform duration-300 scale-100`}
//       >
//         <div className="bg-[#151c25] shadow-xl shadow-[#3229e3] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
//           <form className="flex flex-col">
//             <div className="flex flex-row justify-center items-center">
//               <p className="font-semibold text-2xl text-gray-400">CP Authentication</p>
//             </div>
  
//             <div className="flex flex-row justify-center items-center rounded-xl mt-5">
//               <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
//                 <img
//                   alt="NFT"
//                   className="h-full w-full object-cover cursor-pointer"
//                   src={Laboratory}
//                 />
//               </div>
//             </div>
  
//             <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
//               <input
//                 className="block w-full text-sm
//                   text-slate-500 bg-transparent border-0
//                   focus:outline-none focus:ring-0"
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//                 required
//               />
//             </div>
  
//             <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
//               <input
//                 className="block w-full text-sm
//                   text-slate-500 bg-transparent border-0
//                   focus:outline-none focus:ring-0"
//                 type="password"
//                 step={0.01}
//                 min={0.01}
//                 name="password"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//               />
//             </div>
  
//             <button
//               type="submit"
//               // onClick={handleSubmit}
//               className="flex flex-row justify-center items-center
//                 w-full text-white text-md bg-[#e32970]
//                 hover:bg-[#bd255f] py-2 px-5 rounded-full
//                 drop-shadow-xl border border-transparent
//                 hover:bg-transparent hover:text-[#e32970]
//                 hover:border hover:border-[#bd255f]
//                 focus:outline-none focus:ring mt-5"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     )
//   }
  
//   export default CPLogin
  

import { useNavigate } from 'react-router-dom';
import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../../store'
  import { useState } from 'react'
  import Laboratory from "../../../assets/laboratory.jpg"
import { systemOwnerLogin } from '../../../BlockchainService'
import Alert from '../../../+homedirectory/components/Alert';
import Loading from '../../../+homedirectory/components/Loding';

  const CPLogin = () => {
    const navigate = useNavigate();
    const [publicAddress, setPublicAddress] = useState('')
    const [password, setPassword] = useState('') 

    const handleCollectionPointLogin = async (e) => {
      e.preventDefault();

      setGlobalState('loading', { show: true, msg: 'Blood checking...' })
  
      try {
          const sysOwnerCredentials = { publicAddress, password }
      
          setLoadingMsg('Intializing transaction...')
          const result = await systemOwnerLogin(sysOwnerCredentials)
          console.log(result)
          
          if(result){
              setAlert('Login successfully...', 'green')
              setTimeout(() => {
                navigate('/damu-salama/dashboard');
              // window.location.href="/damu-salama/dashboard"
              }, 2000);
              resetForm()
          }else {
              throw Error
          }

  } catch (error) {
        console.log('Error registering donor: ', error)
        setAlert('Invalid publicAddress or password...', 'red')
      }
    }
  
  
    const resetForm = () => {
      setPublicAddress("")
      setPassword("")
    }
  
    return (
      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 scale-100`}
      >
        <div className="bg-[#151c25] shadow-xl shadow-[#3229e3] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
          <Alert />
          <Loading />
          <form className="flex flex-col" onSubmit={handleCollectionPointLogin}>
            <div className="flex flex-row justify-center items-center">
              <p className="font-semibold text-2xl text-gray-400">Damu Salama Authentication</p>
            </div>
  
            <div className="flex flex-row justify-center items-center rounded-xl mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                <img
                  alt="NFT"
                  className="h-full w-full object-cover cursor-pointer"
                  src={Laboratory}
                />
              </div>
            </div>
  
            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="text"
                name="publicAddress"
                placeholder="publicAddress"
                onChange={(e) => setPublicAddress(e.target.value)}
                value={publicAddress}
                required
              />
            </div>
  
            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <input
                className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                type="password"
                step={0.01}
                min={0.01}
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
  
            <button
              type="submit"
              className="flex flex-row justify-center items-center
                w-full text-white text-base md:text-lg bg-[#e32970]
                hover:bg-[#bd255f] py-2 px-5 rounded-lg
                drop-shadow-xl border border-transparent
                hover:bg-transparent hover:text-[#e32970]
                hover:border hover:border-[#bd255f]
                focus:outline-none focus:ring mt-5"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
  
  export default CPLogin
  