import { Search } from "lucide-react"
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { LocationContext } from "../../context/LocationContext"
import { useSelector } from "react-redux"

const Header = () => {
    const { location } = useContext(LocationContext);
    const [state, setState] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    return (
        <header className="w-full border-b">

            <div className="flex justify-between items-center px-6 py-3">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <Link to='/'>
                        <img src={logo} alt="logo" className="w-32" />
                    </Link>

                    <div className="flex items-center border border-gray-300 rounded-md w-[400px] overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            className="flex-1 px-3 py-2 text-sm outline-none bg-white"
                        />
                        <button className="border-l border-gray-200 px-2 hover:bg-gray-100">
                            <Search color="#555" size={18} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="relative">
                        <select
                            value={state || location}
                            onChange={(e) => setState(e.target.value)}
                            className="appearance-none text-sm pl-3 pr-8 py-1.5 border border-gray-300 rounded-md outline-none cursor-pointer bg-white text-gray-700">
                            <option value="" disabled>Select City</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                            <option value="bangalore">Bangalore</option>
                        </select>
                    </div>
                    {!isAuthenticated && (
                        <button
                            onClick={() => navigate('/authLogin')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">
                            Sign In
                        </button>
                    )}
                    {isAuthenticated && (
                        <button
                            onClick={() => navigate(`/profile/${user._id}`)}  
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition">
                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                👤
                            </div>
                            <span className="text-sm font-medium text-gray-800">
                                {user?.name}
                            </span>
                        </button>
                    )}
                    <div className="cursor-pointer text-gray-500 hover:text-gray-800 text-lg px-1">
                        ☰
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center px-6 py-1.5 text-sm bg-white border-t border-gray-200">

                <div className="flex gap-0">
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Movies</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Stream</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Events</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Plays</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Sports</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Activities</span>
                </div>
                <div className="flex gap-0">
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">List Your Show</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Corporates</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Offers</span>
                    <span className="px-3 py-2 hover:text-red-500 cursor-pointer">Gift Cards</span>
                </div>

            </div>
        </header>
    )
}

export default Header