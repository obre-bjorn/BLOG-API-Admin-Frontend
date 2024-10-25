import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


import { AuthProvider } from './utils/authContext.jsx'
import App from './App.jsx'
import './index.css'
import { Protected } from './routes/Protected.jsx'
import HomePage from './pages/Homepage.jsx'
import LoginPage  from './pages/LoginPage.jsx'
import UsersPage from './pages/UsersPage'
import BlogDetailPage from './pages/BlogDetailPage.jsx'
import PostsPage from './pages/PostsPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'


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
          element:<HomePage/>,
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
