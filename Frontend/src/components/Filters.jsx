import React from "react"
import { filters, languages } from "../utils/constants"

const Filters = () => {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md h-fit">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Languages</h3>
          <span className="text-red-500 text-sm cursor-pointer hover:underline">Clear</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm border rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition">
              {lang}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Genres</h3>
          <span className="text-red-500 text-sm cursor-pointer hover:underline">Clear</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Action", "Drama", "Comedy", "Horror"].map((g, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm border rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition">
              {g}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Format</h3>
          <span className="text-red-500 text-sm cursor-pointer hover:underline">Clear</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm border rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters