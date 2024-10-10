import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


import { AuthProvider } from './utils/authContext.jsx'
import App from './App.jsx'
import './index.css'
import Homepage from './pages/Homepage.jsx'
import LoginPage  from './pages/LoginPage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path:'/',
        element: <Homepage/>,
      },
      {
        path: '/login',
        element: <LoginPage/>
      }


    ]
  }]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
  </StrictMode>,
)
