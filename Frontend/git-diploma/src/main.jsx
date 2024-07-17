import React from 'react'
import ReactDOM from 'react-dom/client'
import WrappedApp from './App.jsx'
import './index.css'
import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';
import DashboardBody from './widget/Dashboard/dashboardBody.jsx'
import Login from './widget/loginPage.jsx'
import CourseDetails from './widget/courseDetails.jsx';
import AddCourse from './widget/addCourse.jsx';
import CourseSelection from './widget/CourseSelection.jsx';
import TeamBody from './widget/Team/TeamBody.jsx';

import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'

const router = createBrowserRouter([
  {
    path: "/",
    element: <WrappedApp />,
    children: [
      {
        path: "/",
        element: <DashboardBody />,
      },
      {
        path: "Login",
        element: <Login />
      },
      {
        path: "courses/:code",
        element: <CourseDetails />
      },
      {
        path: "tutorDashboard/addCourse",
        element: <AddCourse />
      },
      {
         path: "equipe",
         element: <CourseSelection />
      },
      {
         path: "student/teamBody/:sigle",
         element: <TeamBody />
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
    <ReactKeycloakProvider authClient={keycloak}>
      <RouterProvider router={router} />
    </ReactKeycloakProvider>
)
