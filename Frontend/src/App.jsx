import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Profile from './components/Profile'
import Movies from './components/Movies'
import MainLayout from './components/MainLayout'
import Home from './components/Home'

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
