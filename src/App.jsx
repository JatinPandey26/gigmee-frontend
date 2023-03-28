
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

import Home from './pages/Home/Home'
import Gigs from './pages/Gigs/Gigs'
import Gig from './pages/Gig/Gig'
import AddGig from './pages/Addgig/AddGig'
import MyGigs from './pages/MyGigs/MyGigs'
import Orders from './pages/Orders/Orders'
import Messages from './pages/Messages/Messages'
import Message from './pages/Message/Message'

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import { useCookies } from 'react-cookie'
import Success from './pages/Success/Success'
import Pay from './pages/Pay/Pay'

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      suspense: true
    }
  },);

  const Layout = () => {
    return (

      <QueryClientProvider client={queryClient}>
        <div className='App'>
          <Navbar />
          <Outlet />
          <Footer />
        </div>

      </QueryClientProvider>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/gigs',
          element: <Gigs />
        },
        {
          path: '/gig/:id',
          element: <Gig />
        },
        {
          path: '/orders',
          element: <Orders />
        },
        {
          path: '/mygigs',
          element: <MyGigs /> 
        },
        {
          path: '/add',
          element: <AddGig />
        },
        {
          path: '/messages',
          element: <Messages />
        },
        {
          path: '/message/:id',
          element: <Message />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path : '/pay/:id',
          element : <Pay/>
        },
        {
          path: '/success',
          element: <Success />
        }
      ]
    }
  ]) 

  return <div>
    <RouterProvider router={router} />
  </div>
}

export default App
