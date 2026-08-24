import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocationContextProvider } from './context/LocationContext.jsx'
import { SearchContextProvider } from './context/SearchContext.jsx'
import { SeatContextProvider } from './context/SeatContext.jsx'
import { FilterContextProvider } from './context/FilterContext.jsx'
import { Provider } from 'react-redux'
import { appStore } from './redux/store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LocationContextProvider>
        <SearchContextProvider>
          <SeatContextProvider>
            <FilterContextProvider>
              <Provider store={appStore}>
                <App />
              </Provider>
            </FilterContextProvider>
          </SeatContextProvider>
        </SearchContextProvider>
      </LocationContextProvider>
  </StrictMode>,
)