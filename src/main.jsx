import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from './layout/Root';
import Error from './pages/Error';
import Home from './pages/Home/Home';
import Jobdetails from './pages/Surveydetails';
import Allsurvey from './pages/survey/Allsurvey';
import AuthProvider from './components/provider/AuthProvider';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Surveydetails from './pages/Surveydetails';
import Dashboard from './layout/Dashboard';
import Surveyorboard from './pages/dashboard/surveyor/Surveyorboard';
import SurveyForm from './components/form/SurveyForm';
import Users from './pages/dashboard/admin/Users';
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import Pricing from './pages/Pricing';
import Payment from './pages/payment/Payment';
import Userpaymentinfo from './pages/payment/Userpaymentinfo';
import Userspayment from './pages/dashboard/admin/Userspayment';
import Alluser from './pages/dashboard/admin/Alluser';
import Surveyresponse from './pages/dashboard/admin/Surveyresponse';
import Surveystatus from './pages/dashboard/admin/Surveystatus';
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>

      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path:'/payment',
        element:<Payment></Payment>
      },
      {
        path:'/price',
        element:<Pricing></Pricing>
      },
      {
        path: '/allsurvey',
        element: <Allsurvey></Allsurvey>,
        loader: () => fetch('http://localhost:5000/allcreatedsurvey')

      },
      {
        path: '/surveydetails/:id',
        element: <Surveydetails></Surveydetails>,
        loader: () => fetch('http://localhost:5000/allcreatedsurvey')
      },
      {
        path:'/surveyresult'
      }

    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'surveyor',
        element: <SurveyForm></SurveyForm>
      },
      {
        path: 'users',
        element: <Users></Users>
      },
      {
        path:'alluser',
        element:<Alluser></Alluser>
      },
      {
        path: 'userpayinfo',
        element: <Userpaymentinfo></Userpaymentinfo>
      },
      {
        path:'userspayment',
        element:<Userspayment></Userspayment>
      },
      {
        path:'surveyresponse',
        element:<Surveyresponse></Surveyresponse>
      },
      {
        path:'surveystatus',
        element:<Surveystatus></Surveystatus>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
           <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
