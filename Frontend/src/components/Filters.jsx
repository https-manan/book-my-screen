import { filters, languages } from "../utils/constants"
import { useFilterContext } from "../context/FilterContext"

const GENRES = ["Action", "Drama", "Comedy", "Horror"]

const Filters = () => {
  const {selectedLanguages,selectedGenres,selectedFormats,toggleLanguage,toggleGenre,toggleFormat,clearLanguages,clearGenres,clearFormats,} = useFilterContext()

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md h-fit">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Languages</h3>
          <span
            onClick={clearLanguages}
            className="text-red-500 text-sm cursor-pointer hover:underline">
            Clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, i) => (
            <span
              key={i}
              onClick={() => toggleLanguage(lang)}
              className={`px-3 py-1 text-sm border rounded-full cursor-pointer transition ${
                selectedLanguages.includes(lang)
                  ? "bg-red-500 text-white border-red-500"
                  : "hover:bg-red-500 hover:text-white"
              }`}>
              {lang}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Genres</h3>
          <span
            onClick={clearGenres}
            className="text-red-500 text-sm cursor-pointer hover:underline">
            Clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {GENRES.map((g, i) => (
            <span
              key={i}
              onClick={() => toggleGenre(g)}
              className={`px-3 py-1 text-sm border rounded-full cursor-pointer transition ${
                selectedGenres.includes(g)
                  ? "bg-red-500 text-white border-red-500"
                  : "hover:bg-red-500 hover:text-white"
              }`}>
              {g}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Format</h3>
          <span
            onClick={clearFormats}
            className="text-red-500 text-sm cursor-pointer hover:underline">
            Clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <span
              key={i}
              onClick={() => toggleFormat(f)}
              className={`px-3 py-1 text-sm border rounded-full cursor-pointer transition ${
                selectedFormats.includes(f)
                  ? "bg-red-500 text-white border-red-500"
                  : "hover:bg-red-500 hover:text-white"
              }`}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters