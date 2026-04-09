import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {
    const fetchLocData = async (lat, long) => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
        )
        const city = res.data.address.city || res.data.address.state
        setLocation(city)
      } catch (err) {
        setError("Failed to fetch location")
      }
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const long = pos.coords.longitude
        fetchLocData(lat, long)
      },
      (err) => {
        setError("Location access denied")
        console.log(err)
      }
    )
  }, [])
  return (
    <LocationContext.Provider value={{ location, error }}>
      {children}
    </LocationContext.Provider>
  )
}