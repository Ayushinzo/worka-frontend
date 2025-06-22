import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContextProviderFunction from './Context/ContextProvider.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import User from './pages/User.jsx'
import Loader from './components/Loader.jsx'
import ProtectRoute from './ProtectRoute/ProtectRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Setting from './pages/Setting.jsx'
import CreateProject from './pages/CreateProject.jsx'
import Project from './pages/Project.jsx'
import Members from './pages/Members.jsx'
import Kanban from './pages/Kanban.jsx'
import Invitation from './pages/Invitation.jsx'
import NotFound from './pages/NotFound.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <App />
      </ProtectRoute>
    ),
    loader: Loader
  },
  {
    path: "/user",
    element: (
      <ProtectRoute>
        <User />
      </ProtectRoute>
    ),
    loader: Loader,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: Loader
      },
      {
        path: 'setting',
        element: <Setting />,
        loader: Loader
      },
      {
        path: 'project/create-project',
        element: <CreateProject />,
        loader: Loader
      },
      {
        path: 'project/:id',
        element: <Project />,
        loader: Loader
      },
      {
        path: 'members',
        element: <Members />,
        loader: Loader
      },
      {
        path: 'kanban-board',
        element: <Kanban />,
        loader: Loader
      },
      {
        path: "*",
        element: (
          <ProtectRoute>
            <NotFound />
          </ProtectRoute>
        ),
        loader: Loader
      }
    ]
  },
  {
    path: "/invitation",
    element: (
      <ProtectRoute>
        <Invitation />
      </ProtectRoute>
    ),
    loader: Loader
  },
  {
    path: "*",
    element: (
      <ProtectRoute>
        <NotFound />
      </ProtectRoute>
    ),
    loader: Loader
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Auth0Provider
    domain="dev-zb6btotxjimf4zdj.us.auth0.com"
    clientId="baBOVrv0UbFTRNreIiXwsuaVy2mxeOl0"
    authorizationParams={{
      redirect_uri: `${import.meta.env.VITE_FRONTEND_URL}/user/dashboard`
    }}
    cacheLocation="localstorage"
    useRefreshTokens={true}
  >
    <ContextProviderFunction>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ContextProviderFunction>
  </Auth0Provider>
  // </StrictMode>,
)
