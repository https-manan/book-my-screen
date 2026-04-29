import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Profile from './components/Profile'
import Movies from './components/Movies'
import MainLayout from './components/common/MainLayout'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import BookingHistory from './components/BookingHistory'
import SeatLayout from './components/SeatLayout'
import CheckOutpage from './components/CheckOutpage'


const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
      {
        index:true, //Index id true means this is the default children  
        element:<Home/>
      },
      {
        path:'profile/:id',
        element:<Profile/>
      },
      {
        path:'movies',
        element:<Movies/>
      },
      {
        path:'movies/:state/:movieName/:id/ticket',
        element:<MovieDetails/>
      },
      {
        path:'order-history/:id',
        element:<BookingHistory/>
      },
      {
        path:'movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout',
        element:<SeatLayout/>
      },{
        path:'show/:showId/:state/checkout',
        element:<CheckOutpage/>
      }
    ]
  }
])


function App() {
  return (
    <RouterProvider router={appRouter}></RouterProvider>
  )
}

export default App
