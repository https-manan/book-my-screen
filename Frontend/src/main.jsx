import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocationContextProvider } from './context/LocationContext.jsx'
import { SearchContextProvider } from './context/SearchContext.jsx'
// import {SeatContextProvider} from './context/SeatContext.jsx'
import { Provider } from 'react-redux'
import { appStore } from './redux/store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LocationContextProvider>
        <SearchContextProvider>
          <Provider store={appStore}>
            {/* <SeatContextProvider> */}
             <App />
            {/* </SeatContextProvider> */}
          </Provider>
        </SearchContextProvider>
      </LocationContextProvider>
  </StrictMode>,
)