import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../../../store'
  import { useState } from 'react'
  import Laboratory from "../../../assets/laboratory.jpg"

  const MDLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
  
  
    const resetForm = () => {
      setUsername('')
      setPassword('')
    }
  
    return (
      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center
          justify-center bg-black bg-opacity-50 transform
          transition-transform duration-300 scale-100`}
      >
        <div className="bg-[#151c25] shadow-xl shadow-[#3229e3] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
          <form className="flex flex-col">
            <div className="flex flex-row justify-center items-center">
              <p className="font-semibold text-2xl text-gray-400">BDBS Authentication</p>
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
                className="block w-full text-sm
                  text-slate-500 bg-transparent border-0
                  focus:outline-none focus:ring-0"
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
  
            <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
              <input
                className="block w-full text-sm
                  text-slate-500 bg-transparent border-0
                  focus:outline-none focus:ring-0"
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
              // onClick={handleSubmit}
              className="flex flex-row justify-center items-center
                w-full text-white text-md bg-[#e32970]
                hover:bg-[#bd255f] py-2 px-5 rounded-full
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
  
  export default MDLogin
  