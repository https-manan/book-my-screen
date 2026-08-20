import { Link, useNavigate } from "react-router-dom"
import { useGetRecommendedMoviesQuery } from "../redux/api/api";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { LocationContext } from "../context/LocationContext";

const Recommended = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetRecommendedMoviesQuery();
  const {location} = useContext(LocationContext);
  useEffect(() => {
    if (error) toast.error("Failed to load movies")
  }, [error])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
        <Link to='/movies'>
          <p className="text-red-500 hover:underline cursor-pointer my-2.5">See All</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          data?.movies?.map((movie) => (
          <div
            onClick={() => navigate(`/movies/${location}/${movie.title}/${movie._id}/ticket`)}
            key={movie._id}
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
          ))
        )}
      </div>
    </div>
  )
}

export default Recommended


{/* To yahi pr ek kaam kario that when search bar mai ek bhi shabd enter hoga we gonna remove the banner and start giving movies with that name only  */}