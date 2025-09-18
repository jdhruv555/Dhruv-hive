import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Todos from './pages/Todos.tsx'
import Workout from './pages/Workout.tsx'
import Bookshelf from './pages/Bookshelf.tsx'
import Projects from './pages/Projects.tsx'
import { registerSW } from 'virtual:pwa-register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'todos', element: <Todos /> },
      { path: 'workout', element: <Workout /> },
      { path: 'bookshelf', element: <Bookshelf /> },
      { path: 'projects', element: <Projects /> },
    ],
  },
])

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
