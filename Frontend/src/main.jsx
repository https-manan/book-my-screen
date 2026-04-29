import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocationContextProvider } from './context/LocationContext.jsx'
import { Provider } from 'react-redux'
import { appStore } from './redux/store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocationContextProvider>
        <Provider store={appStore}>
          <App />
        </Provider>
    </LocationContextProvider>
  </StrictMode>,
)
