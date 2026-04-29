import { Search } from "lucide-react"
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { LocationContext } from "../../context/LocationContext"

const Header = () => {
    const {location} = useContext(LocationContext);
    const [state,setState]= useState("");
    
  return (
    <header className="w-full border-b">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-4">
          <Link to='/'><img src={logo} alt="logo" className="w-32" /></Link>
          <div className="flex items-center border border-gray-300 rounded-md w-[400px] overflow-hidden">
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              className="flex-1 px-3 py-2 text-sm outline-none bg-white"
            />
            <button className="border-l border-gray-200 px-2 hover:bg-gray-100">
              <Search color="#555" size={18} strokeWidth={1.5} className="cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
        <div className="relative">
        <select value={state||location} onChange={(e)=>{setState(e.target.value)}} className="appearance-none text-sm pl-3 pr-8 py-1.5 border border-gray-300 rounded-md outline-none cursor-pointer hover:border-gray-400 bg-white text-gray-700">
            <option value="" disabled>Select City</option>
            <optgroup label="Maharashtra">
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
            <option value="nagpur">Nagpur</option>
            <option value="nashik">Nashik</option>
            </optgroup>

            <optgroup label="Delhi NCR">
            <option value="delhi">New Delhi</option>
            <option value="noida">Noida</option>
            <option value="gurgaon">Gurgaon</option>
            <option value="faridabad">Faridabad</option>
            </optgroup>

            <optgroup label="Karnataka">
            <option value="bangalore">Bangalore</option>
            <option value="mysore">Mysore</option>
            <option value="mangalore">Mangalore</option>
            </optgroup>

            <optgroup label="Tamil Nadu">
            <option value="chennai">Chennai</option>
            <option value="coimbatore">Coimbatore</option>
            <option value="madurai">Madurai</option>
            </optgroup>

            <optgroup label="Telangana">
            <option value="hyderabad">Hyderabad</option>
            <option value="warangal">Warangal</option>
            </optgroup>

            <optgroup label="West Bengal">
            <option value="kolkata">Kolkata</option>
            <option value="siliguri">Siliguri</option>
            </optgroup>

            <optgroup label="Gujarat">
            <option value="ahmedabad">Ahmedabad</option>
            <option value="surat">Surat</option>
            <option value="vadodara">Vadodara</option>
            </optgroup>

            <optgroup label="Punjab & Chandigarh">
            <option value="chandigarh">Chandigarh</option>
            <option value="amritsar">Amritsar</option>
            <option value="ludhiana">Ludhiana</option>
            </optgroup>

            <optgroup label="Rajasthan">
            <option value="jaipur">Jaipur</option>
            <option value="jodhpur">Jodhpur</option>
            <option value="udaipur">Udaipur</option>
            </optgroup>

            <optgroup label="Kerala">
            <option value="kochi">Kochi</option>
            <option value="thiruvananthapuram">Thiruvananthapuram</option>
            <option value="kozhikode">Kozhikode</option>
            </optgroup>
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
        </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
            Sign In
          </button>
          <div className="cursor-pointer text-gray-500 hover:text-gray-800 text-lg px-1">☰</div>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 py-1.5 text-sm bg-white border-t border-gray-200">
        <div className="flex gap-0">
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Movies</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Stream</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Events</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Plays</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Sports</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Activities</span>
        </div>

        <div className="flex gap-0">
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">List Your Show</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Corporates</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Offers</span>
          <span className="text-gray-700 hover:text-red-500 cursor-pointer px-3 py-2 text-sm font-normal">Gift Cards</span>
        </div>
      </div>
    </header>
  )
}

export default Header