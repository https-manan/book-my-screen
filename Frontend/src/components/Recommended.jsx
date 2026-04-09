import React from "react"
import { movies } from "../utils/constants"
import { Link } from "react-router-dom"

const Recommended = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">'
    <div className="flex justify-between">
    <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
    <Link to='/movies'><p className="text-red-500 hover:underline cursor-pointer my-2.5">See All</p> </Link>     
    </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={movie.img}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />

            <div className="p-3 flex flex-col gap-1">
              <span className="font-semibold text-sm truncate">
                {movie.title}
              </span>

              <span className="text-yellow-500 text-sm">
                {movie.rating}
              </span>

              <span className="text-gray-500 text-xs">
                {movie.genre}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recommended