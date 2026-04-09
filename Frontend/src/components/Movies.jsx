import { allMovies, languages } from "../utils/constants"
import Banner from "./Banner"
import Filters from "./Filters"

const Movies = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <div className="w-1/4">
          <Filters />
        </div>
        <div className="w-3/4">
          <div className="flex flex-wrap gap-2 mb-6">
            {languages.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white rounded-full text-sm shadow cursor-pointer hover:bg-red-500 hover:text-white transition"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 cursor-pointer">
            {allMovies.map((movie, id) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">
                    {movie.title}
                  </h3>

                  <p className="text-gray-500 text-xs">
                    ⭐ {movie.rating || "8.5"}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Movies