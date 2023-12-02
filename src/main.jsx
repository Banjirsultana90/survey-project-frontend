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

import Allsurvey from './pages/survey/Allsurvey';
import AuthProvider from './components/provider/AuthProvider';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Surveydetails from './pages/Surveydetails';
import Dashboard from './layout/Dashboard';
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
import Surveyresult from './pages/survey/Surveyresult';
import Update from './pages/survey/Update';
import Feedback from './pages/survey/Feedback';
import Adminhome from './pages/dashboard/admin/Adminhome';
import Surveyorhome from './pages/dashboard/surveyor/Surveyorhome';
import Userhome from './pages/User/Userhome';
import Acess from './components/acess/Acess';
import Adminroute from './routes/Adminroute';
import Privateroute from './routes/Privateroute'
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
        path:'/access',
        element:<Acess></Acess>
      },
      {
        path:'/payment',
        element:<Privateroute><Payment></Payment></Privateroute>
      },
      {
        path:'/price',
        element:<Pricing></Pricing>
      },
      {
        path: '/allsurvey',
        element: <Allsurvey></Allsurvey>,
        loader: () => fetch('https://survey-project-server-xi.vercel.app/allcreatedsurvey')

      },
      {
        path: '/surveydetails/:id',
        element: <Surveydetails></Surveydetails>,
        loader: () => fetch('https://survey-project-server-xi.vercel.app/allcreatedsurvey')
      },
      {
        path:'/surveyresult',
        element:<Surveyresult></Surveyresult>
      },
      {
        path:'/update/:id',
        element:<Update></Update>,
        loader: ({params}) => fetch(`https://survey-project-server-xi.vercel.app/allcreatedsurvey/${params.id}`)
      },

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
        element:<Adminroute><Alluser></Alluser></Adminroute>
      },
      {
        path: 'userpayinfo',
        element: <Userpaymentinfo></Userpaymentinfo>
      },
      {
        path:'userspayment',
        element:<Adminroute><Userspayment></Userspayment></Adminroute>
      },
      {
        path:'surveyresponse',
        element:<Surveyresponse></Surveyresponse>,
       
      },
      
      {
        path:'surveystatus',
        element:<Surveystatus></Surveystatus>
      },
      {
        path:'feedback',
        element:<Feedback></Feedback>
      },
      {
        path:'adminhome',
        element:<Adminhome></Adminhome>
      },
      {
        path:'surveyorhome',
        element:<Surveyorhome></Surveyorhome>
      },
      {
        path:'userhome',
        element:<Userhome></Userhome>
      },
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-7xl mx-auto bg-base-200'>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
           <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    </div>
  </React.StrictMode>,
)
