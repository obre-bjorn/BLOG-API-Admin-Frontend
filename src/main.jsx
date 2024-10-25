import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


import { AuthProvider } from './utils/authContext.jsx'
import App from './App.jsx'
import './index.css'
import { Protected } from './routes/Protected.jsx'

import Homepage from '/src/pages/Homepage'
import LoginPage  from '/src/pages/LoginPage'
import UsersPage from '/src/pages/UsersPage'
import BlogDetailPage from '/src/pages/BlogDetailPage'
import PostsPage from '/src/pages/PostsPage'
import ErrorPage from '/src/pages/ErrorPage'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:'/',
        element: <Protected/>,
        children: [{
          path:'/',
          element:<Homepage/>,
          children: [
            {
              path: '/',
              element: <PostsPage/>
            },
            {
              path: '/users',
              element: <UsersPage/> 
            },
            {  
              path : '/post/:postId',
              element: <BlogDetailPage/>
            }
          ]
        }
      ]
      },
      {
        path: '/login',
        element: <LoginPage/>
      }
    ]
  }],
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
