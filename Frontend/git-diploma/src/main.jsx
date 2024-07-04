import React from 'react'
import ReactDOM from 'react-dom/client'
import WrappedApp from './App.jsx'
import './index.css'
import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';
import StudentDashboard from './widget/studentDashboard.jsx';
import ProjectDetails from './widget/projectDetails.jsx';
import Login from './widget/loginPage.jsx'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'


const router = createBrowserRouter([
  {
    path: "/",
    element: <WrappedApp />,
    children: [
      {
        path: "/",
        element: <StudentDashboard />,
      },
      {
        path: "project/:projectId",
        element: <ProjectDetails />
      },
      {
        path: "Login",
        element: <Login />
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
    <ReactKeycloakProvider authClient={keycloak}>
      <RouterProvider router={router} />
    </ReactKeycloakProvider>
)
