import { filters, languages } from "../utils/constants"

const GENRES = ["Action", "Drama", "Comedy", "Horror"]

const Filters = ({selectedLanguages, selectedGenres, selectedFormats, onToggleLanguage,onToggleGenre,onToggleFormat,onClearLanguages,onClearGenres,onClearFormats,}) => {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md h-fit">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Languages</h3>
          <span
            onClick={onClearLanguages}
            className="text-red-500 text-sm cursor-pointer hover:underline">
            Clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, i) => (
            <span
              key={i}
              onClick={() => onToggleLanguage(lang)}
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
            onClick={onClearGenres}
            className="text-red-500 text-sm cursor-pointer hover:underline">
            Clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {GENRES.map((g, i) => (
            <span
              key={i}
              onClick={() => onToggleGenre(g)}
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
            onClick={onClearFormats}
            className="text-red-500 text-sm cursor-pointer hover:underline">
            Clear
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <span
              key={i}
              onClick={() => onToggleFormat(f)}
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