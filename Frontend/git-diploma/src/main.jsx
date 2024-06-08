import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';
import StudentDashboard from './widget/studentDashboard.jsx';
import ProjectDetails from './widget/projectDetails.jsx';
import Login from './widget/loginPage.jsx'
import TutorDashboard from './widget/tutorDashboard.jsx';
import CourseDetails from './widget/courseDetails.jsx';
import AddCourse from './widget/addCourse.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      },
      {
        path: "tutorDashboard",
        element: <TutorDashboard />
      },
      {
        path: "courses/:code",
        element: <CourseDetails />
      },
      {
        path: "tutorDashboard/addCourse",
        element: <AddCourse />
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
