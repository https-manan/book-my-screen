import { Search } from "lucide-react"
import logo from '../../assets/logo.png'
import { Link, useNavigate, useLocation as useRouterLocation } from "react-router-dom"
import { useContext } from "react"
import { LocationContext } from "../../context/LocationContext"
import { SearchContext } from "../../context/SearchContext"
import { useSelector } from "react-redux"

// Matches the city values actually stored on theaters (see seed-theater.ts)
const CITIES = ["New Delhi", "Mumbai", "Bangalore", "Noida", "Chennai"]

const Header = () => {
    const { location: city, setLocation } = useContext(LocationContext)
    const { searchTerm, setSearchTerm } = useContext(SearchContext)
    const navigate = useNavigate()
    const routerLocation = useRouterLocation()
    const { isAuthenticated, user } = useSelector((state) => state.auth)

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        if (value && routerLocation.pathname !== "/") {
            navigate("/")
        }
    }

    return (
        <header className="w-full border-b">
            <div className="flex justify-between items-center px-6 py-3">
                <div className="flex items-center gap-4">
                    <Link to='/'>
                        <img src={logo} alt="logo" className="w-32" />
                    </Link>

                    <div className="flex items-center border border-gray-300 rounded-md w-[400px] overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            value={searchTerm}
                            onChange={handleSearchChange}
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
                            value={city}
                            onChange={(e) => setLocation(e.target.value)}
                            className="appearance-none text-sm pl-3 pr-8 py-1.5 border border-gray-300 rounded-md outline-none cursor-pointer bg-white text-gray-700">
                            {CITIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
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
                </div>
            </div>
        </header>
    )
}

export default Header