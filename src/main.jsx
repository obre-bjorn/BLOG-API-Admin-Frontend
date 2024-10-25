import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


import { AuthProvider } from './utils/authContext.jsx'
import App from './App.jsx'
import './index.css'
import { Protected } from './routes/Protected.jsx'
import Homepage from './pages/Homepage'
import LoginPage  from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import BlogDetailPage from './pages/BlogDetailPage'
import PostsPage from './pages/PostsPage'
import ErrorPage from './pages/ErrorPage'


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
