import { createContext, useContext, useState } from "react"

export const FilterContext = createContext()

const toggleInArray = (setter) => (value) => {
  setter((prev) =>
    prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
  )
}

export const FilterContextProvider = ({ children }) => {
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedFormats, setSelectedFormats] = useState([])

  const value = {
    selectedLanguages,
    selectedGenres,
    selectedFormats,
    toggleLanguage: toggleInArray(setSelectedLanguages),
    toggleGenre: toggleInArray(setSelectedGenres),
    toggleFormat: toggleInArray(setSelectedFormats),
    clearLanguages: () => setSelectedLanguages([]),
    clearGenres: () => setSelectedGenres([]),
    clearFormats: () => setSelectedFormats([]),
    clearAllFilters: () => {
      setSelectedLanguages([])
      setSelectedGenres([])
      setSelectedFormats([])
    },
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)