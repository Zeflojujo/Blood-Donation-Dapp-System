// import timelessLogo from '../assets/timeless.png'
import { Link } from 'react-router-dom'
import { connectWallet } from '../../BlockchainService'
import { useGlobalState, truncate } from '../../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        {/* <img */}
          {/* className="w-32 cursor-pointer"
          src={timelessLogo}
          alt="Timeless Logo"
        /> */}
      </div>

      <ul
        className="md:flex-[0.5] text-white md:flex
        hidden list-none flex-row justify-center gap-8 
        items-center flex-initial"
      >
        <li className="mx-4 cursor-pointer"><Link className='text-white font-semibold hover:text-blue-700' to="/collection-point/login">Collection Point</Link></li>
        <li className="mx-4 cursor-pointer"><Link className='text-white font-semibold hover:text-blue-700' to="/medical-center/login">Medical Center</Link></li>
        <li className="mx-4 cursor-pointer"><Link className='text-white font-semibold hover:text-blue-700' to="/transporter/login">Transporters</Link></li>
        <li className="mx-4 cursor-pointer"><Link className='text-white font-semibold hover:text-blue-700' to="/donor/login">Donor</Link></li>
      </ul>

      {connectedAccount ? (
        <button
          className="shadow-xl shadow-black text-white
        bg-[#e32970] hover:bg-[#bd255f] md:text-xs py-2 px-4
          rounded-full cursor-pointer"
        >
          {truncate(connectedAccount, 4, 5, 12)}
        </button>
      ) : (
        <button
          className="shadow-xl shadow-black text-white
        bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2
          rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  )
}

export default Header
