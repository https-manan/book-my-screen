import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useGetAllMoviesQuery } from "../redux/api/api"
import { SearchContext } from "../context/SearchContext"
import { LocationContext } from "../context/LocationContext"
import { Loader2 } from "lucide-react"

const SearchResults = () => {
  const { searchTerm } = useContext(SearchContext)
  const { location } = useContext(LocationContext)
  const navigate = useNavigate()
  const { data, isLoading } = useGetAllMoviesQuery()

  const filtered = data?.allMovies?.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-6">
        Search results for "{searchTerm}"
      </h2>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Loader2 className="animate-spin" size={36} />
        </div>
      ) : !filtered || filtered.length === 0 ? (
        <p className="text-gray-500">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((movie) => (
            <div
              key={movie._id}
              onClick={() => navigate(`/movies/${location}/${movie.title}/${movie._id}/ticket`)}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={movie.posterUrl.secure_url}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black px-3 py-1 flex items-center gap-2">
                  <span className="text-yellow-400 text-xs">⭐</span>
                  <span className="text-white text-xs font-semibold">{movie.rating}/10</span>
                  <span className="text-gray-400 text-xs">{movie.votes} Votes</span>
                </div>
              </div>
              <div className="p-2 bg-white">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-gray-500 text-xs truncate">{movie.genre.join("/")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults