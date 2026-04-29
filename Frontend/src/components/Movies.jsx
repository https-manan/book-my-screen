import {  useNavigate } from "react-router-dom"
import Banner from "./Banner"
import Filters from "./Filters"
import { useContext, useEffect } from "react"
import { useGetAllMoviesQuery } from "../redux/api/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { LocationContext } from "../context/LocationContext"


const Movies = () => {
  const {location} = useContext(LocationContext);
  const navigate = useNavigate();
  const handler = (id,movieName) => {
    navigate(`/movies/${location}/${movieName}/${id}/ticket`)
  }
  const { data, isLoading, error } = useGetAllMoviesQuery();

  useEffect(() => {
    if (error) toast.error("Error in loading movies")
  }, [error])

  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <div className="w-1/4">
          <Filters/>
        </div>
        <div className="w-3/4">
          <h2 className="text-lg font-semibold mb-4">Now Showing</h2>
          {isLoading ? (
            <div className="flex justify-center mt-10">
              <Loader2 className="animate-spin" size={36} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {data?.allMovies?.map((movie) => (
                <div
                  key={movie._id}
                  onClick={() => handler(movie._id,movie.title)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={movie.posterUrl.secure_url}
                      alt={movie.title}
                      className="w-full h-[260px] object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded">
                      {movie.certification}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <span className="text-red-500 mr-1">★</span>
                      <span className="font-medium">{movie.rating}/10</span>
                      <span className="ml-1 text-gray-400">{movie.votes} Votes</span>
                    </div>
                    <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {movie.genre.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Movies