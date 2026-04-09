import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocationContextProvider } from './context/LocationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </StrictMode>,
)
